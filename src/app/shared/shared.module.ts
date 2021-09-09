import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormatTimeCancionPipePipe } from './pipes/format-time-cancion-pipe.pipe';


@NgModule({
  providers: [
    DecimalPipe
  ],
  declarations: [
    FormatTimeCancionPipePipe
  ],
  imports: [
    CommonModule,    
  ],
  exports: [
    FormatTimeCancionPipePipe
  ]
})
export class SharedModule { }
