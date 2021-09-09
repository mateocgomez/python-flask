from flaskr.modelos.modelos import Acceso
from flask import request
from ..modelos import db, Cancion, CancionSchema, Usuario, UsuarioSchema, Album, AlbumSchema, AlbumPatchSchema
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity
from sqlalchemy import or_
from sqlalchemy.sql.expression import case
from flask_apispec.views import MethodResource
from flask_apispec import marshal_with, doc, use_kwargs
from marshmallow import fields


cancion_schema = CancionSchema()
usuario_schema = UsuarioSchema()
album_schema = AlbumSchema()

@doc(description='Crear y Leer canciones', tags=['Canciones'])
class VistaCanciones(MethodResource, Resource):
    @marshal_with(CancionSchema, code=201, description='Cancion creada')
    def post(self):
        nueva_cancion = Cancion(titulo=request.json["titulo"], minutos=request.json["minutos"], segundos=request.json["segundos"], interprete=request.json["interprete"])
        db.session.add(nueva_cancion)
        db.session.commit()
        return cancion_schema.dump(nueva_cancion)

    @marshal_with(CancionSchema(many=True), code=200, description='Lista de canciones')
    def get(self):
        return [cancion_schema.dump(ca) for ca in Cancion.query.all()]

@doc(description='Actualizar, Leer y Borrar cancion', tags=['Cancion'])
class VistaCancion(MethodResource, Resource):

    def get(self, id_cancion):
        return cancion_schema.dump(Cancion.query.get_or_404(id_cancion))

    def put(self, id_cancion):
        cancion = Cancion.query.get_or_404(id_cancion)
        cancion.titulo = request.json.get("titulo",cancion.titulo)
        cancion.minutos = request.json.get("minutos",cancion.minutos)
        cancion.segundos = request.json.get("segundos",cancion.segundos)
        cancion.interprete = request.json.get("interprete",cancion.interprete)
        db.session.commit()
        return cancion_schema.dump(cancion)

    def delete(self, id_cancion):
        cancion = Cancion.query.get_or_404(id_cancion)
        db.session.delete(cancion)
        db.session.commit()
        return '',204


@doc(description='Leer los albumes de una cancion', tags=['AlbumesCanciones'])
class VistaAlbumesCanciones(MethodResource, Resource):
    def get(self, id_cancion):
        cancion = Cancion.query.get_or_404(id_cancion)
        return [album_schema.dump(al) for al in cancion.albumes]


@doc(description='Crear nueva cuenta, cambiar contrasena y borrar cuenta', tags=['UsuarioManagement'])
class VistaSignIn(MethodResource, Resource):
    
    def post(self):
        nuevo_usuario = Usuario(nombre=request.json["nombre"], contrasena=request.json["contrasena"])
        db.session.add(nuevo_usuario)
        db.session.commit()
        token_de_acceso = create_access_token(identity = nuevo_usuario.id)
        return {"mensaje":"usuario creado exitosamente", "token":token_de_acceso}


    def put(self, id_usuario):
        usuario = Usuario.query.get_or_404(id_usuario)
        usuario.contrasena = request.json.get("contrasena",usuario.contrasena)
        db.session.commit()
        return usuario_schema.dump(usuario)

    def delete(self, id_usuario):
        usuario = Usuario.query.get_or_404(id_usuario)
        db.session.delete(usuario)
        db.session.commit()
        return '',204


@doc(description='Iniciar sesion en Ionic', tags=['UsuarioLogin'])
class VistaLogIn(MethodResource, Resource):

    def post(self):
        usuario = Usuario.query.filter(Usuario.nombre == request.json["nombre"], Usuario.contrasena == request.json["contrasena"]).first()
        db.session.commit()
        if usuario is None:
            return "El usuario no existe", 404
        else:
            token_de_acceso = create_access_token(identity = usuario.id)
            return {"mensaje":"Inicio de sesión exitoso", "token": token_de_acceso}


@doc(description='Permite al usuario crear un album en su cuenta y tambien ver la lista de sus albumes y albumes publicos', tags=['AlbumUsuario'])
class VistaAlbumsUsuario(MethodResource, Resource):

    @jwt_required()
    @marshal_with(AlbumSchema(), code=200, description='Album creado')
    def post(self, id_usuario):
        nuevo_album = Album(titulo=request.json["titulo"], anio=request.json["anio"], descripcion=request.json["descripcion"], medio=request.json["medio"])
        usuario = Usuario.query.get_or_404(id_usuario)
        usuario.albumes.append(nuevo_album)

        try:
            db.session.commit()
        except IntegrityError:
            db.session.rollback()
            return 'El usuario ya tiene un album con dicho nombre',409

        return album_schema.dump(nuevo_album)

    @jwt_required()
    @marshal_with(AlbumSchema(many=True), code=200, description='Lista de albumes')
    def get(self, id_usuario):
        Usuario.query.get_or_404(id_usuario)
        query = db.session.query(Album, case([(Album.usuario==id_usuario, True)], else_=False).label('pertenece'))\
            .join(Usuario).filter(or_(Usuario.id == id_usuario, Album.acceso == Acceso.PUBLICO))
        
        def dump(album, pertenece):
            album.pertenece = pertenece
            serialized = album_schema.dump(album)
            return serialized
        return [dump(al, pertenece) for al, pertenece in query]


@doc(description='Leer las canciones de un album y asociar una cancion existente o nueva a un album', tags=['CancionesAlbum'])
class VistaCancionesAlbum(MethodResource, Resource):

    def post(self, id_album):
        album = Album.query.get_or_404(id_album)
        
        if "id_cancion" in request.json.keys():
            
            nueva_cancion = Cancion.query.get(request.json["id_cancion"])
            if nueva_cancion is not None:
                album.canciones.append(nueva_cancion)
                db.session.commit()
            else:
                return 'Canción errónea',404
        else: 
            nueva_cancion = Cancion(titulo=request.json["titulo"], minutos=request.json["minutos"], segundos=request.json["segundos"], interprete=request.json["interprete"])
            album.canciones.append(nueva_cancion)
        db.session.commit()
        return cancion_schema.dump(nueva_cancion)
       
    def get(self, id_album):
        album = Album.query.get_or_404(id_album)
        return [cancion_schema.dump(ca) for ca in album.canciones]


@doc(description='Actualizar, Leer y Borrar album', tags=['Album'])
class VistaAlbum(MethodResource, Resource):

    def get(self, id_album):
        return album_schema.dump(Album.query.get_or_404(id_album))

    def put(self, id_album):
        album = Album.query.get_or_404(id_album)
        album.titulo = request.json.get("titulo",album.titulo)
        album.anio = request.json.get("anio", album.anio)
        album.descripcion = request.json.get("descripcion", album.descripcion)
        album.medio = request.json.get("medio", album.medio)
        db.session.commit()
        return album_schema.dump(album)
    
    @marshal_with(None, code=204, description='Se elimino correctamente')
    @jwt_required()
    def delete(self, id_album):
        album = Album.query.get_or_404(id_album)
        db.session.delete(album)
        db.session.commit()
        return '',204

    @doc(description='Permite cambiar el tipo de acceso a un album existente', tags=['Album'])
    @marshal_with(AlbumPatchSchema, code=204, description='Se actualizo correctamente')
    @marshal_with(AlbumPatchSchema, code=404, description='Album no existe')
    @marshal_with(AlbumPatchSchema, code=401, description='Usuario no autenticado')
    @jwt_required()
    def patch(self, id_album):
        album = Album.query.get_or_404(id_album)
        album.acceso = request.json.get("acceso", album.acceso)
        db.session.commit()
        return '',204
