import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'blackjack';

  comenzar : boolean = false;
  inicio : boolean = true;
  nombreJugador : string = "";

  comenzarJuego(){
    if(this.nombreJugador == ""){
      Swal.fire({
        title: 'Error!',
        text: "Debe ingresar su nombre para poder comenzar a jugar",
        icon: 'error',
        allowOutsideClick: false,
        confirmButtonColor: '#4E9F3D'
      });
    }
    else{
      this.comenzar = true;
      this.inicio = false;
    }
   
  }
  finalizar(event : boolean){
    this.comenzar = false;
    this.inicio = true;
  }
}
