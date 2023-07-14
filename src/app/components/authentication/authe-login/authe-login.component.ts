import { Response } from './../../../objectShared/Response';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Login } from "./authe-login.model";
import { LoginService } from './auth-login.service';
import { Observable, Subject } from "rxjs";



@Component({
  selector: 'app-authe-login',
  templateUrl: './authe-login.component.html',
  styleUrls: ['./authe-login.component.css'],
  
})


export class AutheLoginComponent implements  OnInit{   
 
  showMsgError :boolean = false; 
  login: Login = {
      Email: '',
      Password: ""
  }
      
  constructor(
   // private AccountService: AccountService,
     private router: Router,
     private loginService : LoginService 
     ){ }



  onSubmit(): void {
     this.loginService.login(this.login).subscribe(response => {
    
     console.log('Resultado response ok '+response)

          console.log('Resultado response ok '+response)
          localStorage.setItem('token_X','Bearer ' + response.response.token);         
          this.loginService.mostrarMenuEmitter.emit(true); 
          this.router.navigate(['']);
          this.loginService.showMessage(response.notifications[0].message);   
      
        
      
    }, 
        error =>  {
          console.log('Resultado deu ruim '+error);
          (<HTMLInputElement>document.getElementById('email')).value = '';
          (<HTMLInputElement>document.getElementById('password')).value = '';
          this.showMsgError = true;
        })
    }

  ngOnInit(): void {
   
  } 

}