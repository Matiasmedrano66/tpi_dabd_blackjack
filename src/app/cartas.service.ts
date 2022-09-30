import { Injectable } from '@angular/core';
import { cartas } from './listaCartas';
import { Carta } from './models/Carta';

@Injectable({
  providedIn: 'root'
})
export class CartasService {

  listaCartas : Carta[] = []

  constructor() {
      this.listaCartas = cartas;
   }

  traerCartas(){
    return this.listaCartas; 
  }

  traerCartaPorId(id: number){
    return this.listaCartas[id];
  }
}
