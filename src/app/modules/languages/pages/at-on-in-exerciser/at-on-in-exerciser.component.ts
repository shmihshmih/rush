import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-at-on-in-exerciser',
  templateUrl: './at-on-in-exerciser.component.html',
  styleUrls: ['./at-on-in-exerciser.component.scss']
})
export class AtOnInExerciserComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }


  nextExercise(): void {

  }

  showAnswer(): void {

  }

  openSettings(): void {

  }

  openHelp(): void {

  }
}


// const MOCK_DATA_ATONIN: IPrepositionExercise = [];

export interface IPrepositionExercise {
  id: string;
  preposition: 'at' | 'on' | 'in'; //
  word: string; // monday
}

const mockPrepositionExercises: IPrepositionExercise[] = [];
