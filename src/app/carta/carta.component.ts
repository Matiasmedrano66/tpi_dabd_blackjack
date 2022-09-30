import { Component, Input, OnInit } from '@angular/core';
import { Carta } from '../models/Carta';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-carta',
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.css'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(1000, style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate(1000, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class CartaComponent implements OnInit {

  @Input()carta = {} as Carta;



  constructor() { }

  ngOnInit(): void {
   
  }

}
