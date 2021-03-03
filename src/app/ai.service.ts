import { Injectable } from '@angular/core';
import { ReversiService } from './reversi.service';
import { TileCoords } from './ReversiDefinitions';

@Injectable({
  providedIn: 'root'
})
export class AIService {

  constructor(private game: ReversiService) {
  }

  play(): void {
    let max = 0;
    let coords: TileCoords[] = [];
    for(let i=0; i<8; i++) {
        for(let j=0; j<8; j++) {
            const nb = this.game.PionsTakenIfPlayAt(i, j).length;
            if (nb > max) {
                coords = [ [i, j] ];
                max = nb;
            } else if (nb === max) {
                coords.push([i, j]);
            }
        }
    }
    if (coords.length > 0) {
        const c = coords[ Math.floor(Math.random() * coords.length) ];
        this.game.play(...c);
    }
  }

}
