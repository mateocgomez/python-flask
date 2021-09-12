import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AlbumListComponent } from './album-list/album-list.component';
import { AlbumDetailComponent } from './album-detail/album-detail.component';
import { AlbumCreateComponent } from './album-create/album-create.component';
import { AlbumEditComponent } from './album-edit/album-edit.component';
import { AlbumCommentsComponent } from './album-comments/album-comments.component';
import { AppHeaderModule } from '../app-header/app-header.module';
import { AlbumJoinCancionComponent } from './album-join-cancion/album-join-cancion.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [AlbumListComponent, AlbumDetailComponent, AlbumCreateComponent, AlbumEditComponent, AlbumJoinCancionComponent, AlbumCommentsComponent],
  imports: [
    CommonModule, ReactiveFormsModule, AppHeaderModule, SharedModule
  ],
  exports:[AlbumListComponent, AlbumDetailComponent, AlbumCreateComponent, AlbumEditComponent, AlbumJoinCancionComponent, AlbumCommentsComponent]
})
export class AlbumModule { }
