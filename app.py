from flask import Flask
from flask_restful import Api
from .modelos import db
from .vistas import VistaCanciones, VistaCancionesCompartidasUsuario, VistaCancion, VistaSignIn, VistaAlbum, \
    VistaAlbumsUsuario, VistaCancionesAlbum, VistaLogIn, VistaAlbumesCanciones, VistaCancionesUsuario, \
    VistaUsuariosCancionCompartida
from flask_jwt_extended import JWTManager
from flask_cors import CORS, cross_origin


def create_app(config_name):
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tutorial_canciones.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = 'frase-secreta'
    app.config['PROPAGATE_EXCEPTIONS'] = True
    return app


app = create_app('default')
app.config['DEBUG'] = True
app_context = app.app_context()
app_context.push()

db.init_app(app)
db.create_all()
cors = CORS(app)

api = Api(app)
api.add_resource(VistaCanciones, '/canciones')
api.add_resource(VistaCancion, '/cancion/<int:id_cancion>')
api.add_resource(VistaAlbumesCanciones, '/cancion/<int:id_cancion>/albumes')
api.add_resource(VistaSignIn, '/signin')
api.add_resource(VistaLogIn, '/logIn')
api.add_resource(VistaAlbumsUsuario, '/usuario/<int:id_usuario>/albumes')
api.add_resource(VistaCancionesUsuario, '/usuario/<int:id_usuario>/canciones')
api.add_resource(VistaAlbum, '/album/<int:id_album>')
api.add_resource(VistaCancionesAlbum, '/album/<int:id_album>/canciones')
api.add_resource(VistaUsuariosCancionCompartida, '/cancion/<int:id_cancion>/usuarios')
api.add_resource(VistaCancionesCompartidasUsuario, '/usuario/<int:id_usuario>/cancionescompartidas')

jwt = JWTManager(app)
