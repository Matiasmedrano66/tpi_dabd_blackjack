import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CartasService } from '../cartas.service';
import { Carta } from '../models/Carta';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent implements OnInit {

  @Input() nombreJugador : string = "";
  @Output() finalizarJuego = new EventEmitter<boolean>();

  
  listaCartas : number[] = []

  cartasJugador : Carta[] = []

  cartasCrupier : Carta[] = []

  sumaJugada : number = 0

  sumaJugadaCrupier : number = 0

  jugadaJugadorActiva = true

  jugadaCrupierActiva = false

  juegoTerminado = false;

  reproduciendoMusica = true;

  musica = new Audio();

 
  constructor(private servicioCartas : CartasService) { }

  ngOnInit(): void {
    
   this.llenarListaCartas();
   
   this.musica.src = "../../../assets/audio/casino_music.mp3";
   this.musica.load();
   this.playAudio();
   this.elegirCartasCrupier();
  }

  silenciar(){

    if(this.reproduciendoMusica){
      this.reproduciendoMusica = false;
      this.musica.pause();
    }
    else{
      this.reproduciendoMusica = true;
      this.musica.play();
    }
    
  }
  
    playAudio(){
      this.musica.play();      
    }
    
  
  
  llenarListaCartas(){
    for(let i = 0; i < 52 ; i++){
      this.listaCartas.push(i);
    }
  }

  elegirCartaJugador(){
    if(this.juegoTerminado)
    {
      this.limpiarCampos();
      this.juegoTerminado = false;
    }
    if(this.jugadaJugadorActiva)
    {
      let numeroCarta = this.numeroRandom(0, this.listaCartas.length);

      let idCarta = this.listaCartas[numeroCarta]; 

      this.cartasJugador.push(this.servicioCartas.traerCartaPorId(idCarta));

      this.listaCartas.splice(numeroCarta, 1);
      this.sumaJugada = this.sumarCartasJugador();
    }
  }

  terminarJugadaCrupier(){
    while(this.jugadaCrupierActiva)
    {
      this.elegirCartasCrupier();
    }
  }


  elegirCartasCrupier(){
       
      let numeroCarta = this.numeroRandom(0, this.listaCartas.length);     
      let idCarta = this.listaCartas[numeroCarta]; 

      this.cartasCrupier.push(this.servicioCartas.traerCartaPorId(idCarta));

      this.listaCartas.splice(numeroCarta, 1);
      this.sumaJugadaCrupier = this.sumarCartasCrupier();
      if(this.sumaJugadaCrupier >= 17)
      {
        this.jugadaCrupierActiva = false;
        setTimeout(() => {this.informarGanador();}, 1000)       
      } 
  }

  informarGanador(){
    this.jugadaJugadorActiva = false;
    if(this.sumaJugada > 21 && this.sumaJugadaCrupier <= 21)
    {
      Swal.fire({
        title: 'Ganó el crupier',
        text: "Vuelve a intentarlo!",
        icon: 'info',
        confirmButtonText: 'Ok',
        allowOutsideClick: false,
        confirmButtonColor: '#4E9F3D',
        background: 'dark'
      });
      let audio = new Audio();
        audio.src = "../../../assets/audio/loose.mp3";
        audio.load();
        audio.play();
    }
    if(this.sumaJugada <= 21 && this.sumaJugadaCrupier > 21)
    {
      Swal.fire({
        title: 'Ganaste!',
        text: "Felicitaciones!",
        icon: 'success',
        confirmButtonText: 'Ok',
        allowOutsideClick: false,
        confirmButtonColor: '#4E9F3D',
        background: 'dark'
      });
  
        let audio = new Audio();
        audio.src = "../../../assets/audio/win.mp3";
        audio.load();
        audio.play();

    }
    if(this.sumaJugada <= 21 && this.sumaJugadaCrupier <=21)
    {
      if(this.sumaJugada > this.sumaJugadaCrupier)
      {
        Swal.fire({
          title: 'Ganaste!',
          text: "Felicitaciones!",
          icon: 'success',
          confirmButtonText: 'Seguir Jugando',
          allowOutsideClick: false,
          confirmButtonColor: '#4E9F3D',
          background: 'dark'
        });
        let audio = new Audio();
        audio.src = "../../../assets/audio/win.mp3";
        audio.load();
        audio.play();
      }
      else
      {
        Swal.fire({
          title: 'Ganó el crupier',
          text: "Vuelve a intentarlo!",
          icon: 'info',
          confirmButtonText: 'Ok',
          allowOutsideClick: false,
          confirmButtonColor: '#4E9F3D',
          background: 'dark'
        });
        let audio = new Audio();
        audio.src = "../../../assets/audio/loose.mp3";
        audio.load();
        audio.play();
      }
    }
    if((this.sumaJugada > 21 && this.sumaJugadaCrupier > 21) || (this.sumaJugada == 21 && this.sumaJugadaCrupier == 21) || (this.sumaJugada == this.sumaJugadaCrupier))
    {
      Swal.fire({
        title: 'Ha sido un empate',
        text: "Vuelve a intentarlo!",
        icon: 'info',
        confirmButtonText: 'Ok',
        allowOutsideClick: false,
        confirmButtonColor: '#4E9F3D',
        background: 'dark'
      });
    }

    this.juegoTerminado = true;
  }

  sumarCartasJugador(){
    let acumulador = 0;

    for(let carta of this.cartasJugador){
        if(carta.numero == 1)
        {
          if((acumulador + 11) < 21)
            acumulador += 11;
          else
            acumulador += 1;
        }
        else
          acumulador += carta.numero;    
    }
    return acumulador;
  }

  sumarCartasCrupier(){
    let acumulador = 0;
    
    for(let carta of this.cartasCrupier){
        if(carta.numero == 1)
        {
          if((acumulador + 11) < 21)
            acumulador += 11;
          else
            acumulador += 1;
        }
        else
          acumulador += carta.numero;    
    }
    return acumulador;
  }

  plantarse(){
    this.jugadaCrupierActiva = true;
    this.terminarJugadaCrupier();
  }

  seguirJugando(){
    this.limpiarCampos();
    this.elegirCartasCrupier();
    this.juegoTerminado = false;
    this.jugadaJugadorActiva = true;
    this.elegirCartaJugador();
  }

  numeroRandom(min: number, max : number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  limpiarCampos(){
    this.cartasJugador = [];
      this.cartasCrupier = [];
      this.sumaJugada = 0;
      this.sumaJugadaCrupier = 0;
  }

}
