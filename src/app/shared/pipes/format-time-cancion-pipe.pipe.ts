import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { Cancion } from 'src/app/album/album';

@Pipe({
  name: 'formatTimeCancionPipe'
})
export class FormatTimeCancionPipePipe implements PipeTransform {

  constructor(private numberPipe: DecimalPipe) {}


  transform(value: Cancion): string {
    if(value)
      return `${this.numberPipe.transform(value.minutos, '2.0')}:${this.numberPipe.transform(value.segundos, '2.0')}`;
    return ''
  }

}
