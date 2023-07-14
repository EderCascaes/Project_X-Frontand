import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Login } from "./authe-login.model";
import { LoginService } from './auth-login.service';



@Component({
  selector: 'app-authe-login',
  templateUrl: './authe-login.component.html',
  styleUrls: ['./authe-login.component.css'],
  
})


export class AutheLoginComponent implements  OnInit{ 
  
  showMsgError : boolean = false;
 
  login: Login = {
      email: '',
      password: ""
  }
      
  constructor(
   // private AccountService: AccountService,
     private router: Router,
     private loginService : LoginService 
     ){ }

  async onSubmit() {
    try{
      let response = await this.loginService.login(this.login); 
      console.log('onSubmit : ' + response);

    }catch(error){      
      console.log('Correu um erro : ' + error);
    }
  }

  ngOnInit(): void {
  } 

}