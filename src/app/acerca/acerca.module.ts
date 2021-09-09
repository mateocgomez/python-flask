import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AppHeaderModule } from '../app-header/app-header.module';
import { AcercaDeComponent } from './acerca-de/acerca-de.component';

@NgModule({
  declarations: [AcercaDeComponent],
  imports: [
    CommonModule, ReactiveFormsModule, AppHeaderModule
  ],
  exports:[]
})
export class AcercaModule { }
