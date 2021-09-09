import { DecimalPipe } from '@angular/common';
import { Cancion } from 'src/app/album/album';
import { FormatTimeCancionPipePipe } from './format-time-cancion-pipe.pipe';

describe('FormatTimeCancionPipePipe', () => {
  const pipe = new FormatTimeCancionPipePipe(new DecimalPipe('en'));
  
  it('create an instance', () => {    
    expect(pipe).toBeTruthy();
  });

  it('transforms "4:9" to "04:09"', () => {
    const cancion: Cancion = new Cancion(1, 'test', 4, 9, 'test');
    expect(pipe.transform(cancion)).toBe('04:09');
  });
});
