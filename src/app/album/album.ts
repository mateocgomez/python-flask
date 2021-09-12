export class Album {

    id: number;
    titulo: string;
    anio: number;
    descripcion: string;
    medio: Medio;
    acceso: Acceso;
    pertenece: boolean;
    usuario: number;
    interpretes: Array<string>;
    canciones: Array<Cancion>

    constructor(
        id: number,
        titulo: string,
        anio: number,
        descripcion: string,
        medio: Medio,
        acceso: Acceso,
        pertenece: boolean,
        usuario: number,
        interpretes: Array<string>,
        canciones: Array<Cancion>
    ){
        this.id = id,
        this.titulo = titulo,
        this.anio = anio,
        this.descripcion = descripcion,
        this.medio = medio,
        this.acceso = acceso,
        this.pertenece = pertenece,
        this.usuario = usuario,
        this.interpretes = interpretes,
        this.canciones = canciones
    }
}

export class Medio{
    llave: string;
    valor: number

    constructor(
        llave: string,
        valor:number
    ){
        this.llave = llave,
        this.valor = valor
    }
}

export class Acceso{
    llave: string;
    valor: number

    constructor(
        llave: string,
        valor:number
    ){
        this.llave = llave,
        this.valor = valor
    }
}

export class Cancion{
    id: number;
    titulo: string;
    minutos: number;
    segundos: number;
    interprete: string;

    constructor(
        id: number,
        titulo: string,
        minutos: number,
        segundos: number,
        interprete: string
    ){
        this.id = id,
        this.titulo = titulo,
        this.minutos = minutos,
        this.segundos = segundos,
        this.interprete = interprete
    }
}

export class ComentarioAlbum{
    id: number;
    texto: string;
    created_at: Date;
    usuario: number;
    albumes: Array<Album>

    constructor(
        id: number,
        texto: string,
        created_at: Date,
        usuario: number,
        albumes:  Array<Album>,
    ){
        this.id = id,
        this.texto = texto,
        this.created_at = created_at,
        this.usuario = usuario,
        this.albumes = albumes
    }
}
