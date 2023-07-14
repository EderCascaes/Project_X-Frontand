import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './../../authentication/authe-login/auth-login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  constructor(
          private loginService: LoginService,
          private router: Router,){ }

  logOut(){
         
          localStorage.removeItem('token_X');   
         // this.router.navigate(['login']);
          this.loginService.mostrarMenuEmitter.emit(false);
           window.location.reload();
          
  }

}