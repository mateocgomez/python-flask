import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Album } from '../album';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from "ngx-toastr";

import { AlbumService } from '../album.service';
import { ComentarioAlbum } from '../album';

@Component({
  selector: 'app-album-comments',
  templateUrl: './album-comments.component.html',
  styleUrls: ['./album-comments.component.css']
})
export class AlbumCommentsComponent implements OnInit {
  @Input() album: Album;
  
  userId: number;
  token: string;
  albumCommentForm: FormGroup;

  constructor(
    private routerPath: Router,
    private router: ActivatedRoute,
    private albumService: AlbumService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.userId = parseInt(this.router.snapshot.params.userId)
    this.token = this.router.snapshot.params.userToken
    this.albumCommentForm = this.formBuilder.group({
      texto: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(128)]],
    })
  }

  randomizeUserImage(){
    return Math.floor(Math.random() * (5 - 1)) + 1;
  }

  createComentarioAlbum(newComment: ComentarioAlbum){
    newComment.usuario = this.userId
    this.albumService.crearComentarioAlbum(newComment, this.token, this.album.id)
    .subscribe(album => {
      this.showSuccess()
      this.albumCommentForm.reset()
      this.routerPath.navigate([`/albumes/${this.userId}/${this.token}`])
    },
    error=> {
      if(error.statusText === "UNAUTHORIZED"){
        this.showWarning("Su sesión ha caducado, por favor vuelva a iniciar sesión.")
      }
      else if(error.statusText === "UNPROCESSABLE ENTITY"){
        this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
      }
      else{
        this.showError("Ha ocurrido un error. " + error.message)
      }
    })
  }

  showError(error: string){
    this.toastr.error(error, $localize`Error de autenticación`)
  }

  showWarning(warning: string){
    this.toastr.warning(warning, $localize`Error de autenticación`)
  }

  showSuccess() {
    this.toastr.success(`Su comentario fue agregado correctamente.`, "Comentado agregado");
  }
}
