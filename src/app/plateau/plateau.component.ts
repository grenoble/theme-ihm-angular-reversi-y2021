import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Board_RO, emptyBoard, TileCoords, Turn } from '../ReversiDefinitions';

@Component({
  selector: 'app-plateau',
  templateUrl: './plateau.component.html',
  styleUrls: ['./plateau.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlateauComponent implements OnInit {
	@Input() board: Board_RO = emptyBoard();
	@Input() turn: Turn = "Player1";
	@Input() playable: boolean[][] = [];
  @Output() play = new EventEmitter<TileCoords>();

  constructor() { }

  ngOnInit(): void {
  }

  PLAY(i: number, j: number): void {
    this.play.emit( [i, j] );
  }

  trackByIndex(i: number, e: unknown) {
    return i;
  }
}
