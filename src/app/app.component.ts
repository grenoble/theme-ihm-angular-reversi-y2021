import { Component } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { delay, filter, map, tap } from 'rxjs/operators';
import { AIService } from './ai.service';
import { ReversiService } from './reversi.service';
import { GameState, TileCoords, Turn } from './ReversiDefinitions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  obs: Observable<GameState & {playable: boolean[][], scores: number[], winner: Turn | 'DRAWN' | undefined}>;

  private _ia1On = new BehaviorSubject<boolean>(false);
  get ia1On(): boolean {return this._ia1On.value;}
  set ia1On(v: boolean) {this._ia1On.next(v);}

  private _ia2On = new BehaviorSubject<boolean>(false);
  get ia2On(): boolean {return this._ia2On.value;}
  set ia2On(v: boolean) {this._ia2On.next(v);}

  constructor(private gs: ReversiService, private AI: AIService) {
    this.obs = combineLatest( [gs.gameStateObs, gs.winnerObs]).pipe(
      map( ([g, w]) => ({
        ...g,
        winner: w,
        playable: g.board.map(
          (L, i) => L.map( (C, j) => gs.PionsTakenIfPlayAt(i, j).length > 0 )
        ),
        scores: ['Player1', 'Player2'].map( p => g.board.reduce( (N, L) => N + L.reduce( (n, c) => c === p ? n + 1 : n, 0), 0) )
      } )  )
    );

    combineLatest( [this.obs, this._ia1On, this._ia2On] ).pipe(
      filter( ([G, ia1On, ia2On]) => G.turn === 'Player1' && ia1On || G.turn === 'Player2' && ia2On ),
      delay(1000),
      tap( () => console.log("AI plays") )
    ).subscribe(
      () => AI.play()
    );

  }

  play([i, j]: TileCoords) {
    this.gs.play(i, j);
  }

  restart(): void {
    this.gs.initBoard();
  }
}
