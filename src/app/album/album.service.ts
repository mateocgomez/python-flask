import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Album, ComentarioAlbum} from './album';
import { Cancion } from '../cancion/cancion';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  private backUrl: string = "http://localhost:5000"

  constructor(private http: HttpClient) { }

  getAlbumes(usuario: number, token: string): Observable<Album[]>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`       
    })
    return this.http.get<Album[]>(`${this.backUrl}/usuario/${usuario}/albumes`, {headers: headers})
  }

  getCancionesAlbum(idAlbum: number, token: string): Observable<Cancion[]>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`       
    })
    return this.http.get<Cancion[]>(`${this.backUrl}/album/${idAlbum}/canciones`, {headers: headers})
  }

  crearAlbum(idUsuario: number, token: string, album: Album):Observable<Album>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`       
    })
    return this.http.post<Album>(`${this.backUrl}/usuario/${idUsuario}/albumes`, album, {headers: headers})
  }

  getAlbum(albumId: number): Observable<Album>{
    return this.http.get<Album>(`${this.backUrl}/album/${albumId}`)
  }

  editarAlbum(idUsuario: number, token: string, albumId: number, album: Album): Observable<Album>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`       
    })
    return this.http.put<Album>(`${this.backUrl}/album/${albumId}`, album, {headers: headers})
  }

  eliminarAlbum(idUsuario: number, token: string, albumId: number): Observable<Album>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`       
    })
    return this.http.delete<Album>(`${this.backUrl}/album/${albumId}`, {headers: headers})
  }

  cambiarAccessoAlbum(status: string, idUsuario: number, token: string, albumId: number): Observable<Album>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`       
    })

    const params = {
      "acceso": status
    }
    
    return this.http.patch<Album>(`${this.backUrl}/album/${albumId}`, params, {headers: headers})
  }

  asociarCancion(albumId: number, cancionId: number): Observable<Cancion>{
    return this.http.post<Cancion>(`${this.backUrl}/album/${albumId}/canciones`, {"id_cancion": cancionId})
  }

  crearComentarioAlbum(comentario: ComentarioAlbum, token: string, albumId: number): Observable<ComentarioAlbum>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`       
    })

    // const comentario = {
    //   "texto": content
    // }
    
    return this.http.post<ComentarioAlbum>(`${this.backUrl}/album/${albumId}/comentarios`, comentario, {headers: headers})
  }

}
