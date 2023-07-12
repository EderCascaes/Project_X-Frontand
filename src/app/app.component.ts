import { Component } from '@angular/core';
import { LoginService } from './components/authentication/authe-login/auth-login.service';

@Component({
  selector: 'app-root',
  templateUrl : 'app.component.html'
})

export class AppComponent {
  title = 'Projeto-X';
  showMenu : boolean = false;

  constructor(private loginService : LoginService){

  }

  ngOnInit(){

    this.loginService.mostrarMenuEmitter.subscribe(
      show => this.showMenu = show
    )

  }

}
