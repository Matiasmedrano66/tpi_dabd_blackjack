import { Component, OnInit, Input } from '@angular/core';
import { Carta } from '../models/Carta';


@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.component.html',
  styleUrls: ['./mesa.component.css']
})
export class MesaComponent implements OnInit {

 
  @Input() cartasJugador : Carta[] = []
  @Input() cartasCrupier : Carta[] = []
  @Input() nombreJugador : string = ""
  constructor() { }

  ngOnInit(): void {

  }

 

}
