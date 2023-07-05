import { Router } from '@angular/router';
import { AccountService } from './../../../account/shared/account.service';
import { Component, OnInit } from '@angular/core';
import { Login } from "./authe-login.model";

@Component({
  selector: 'app-authe-login',
  templateUrl: './authe-login.component.html',
  styleUrls: ['./authe-login.component.css']
})
export class AutheLoginComponent implements  OnInit{
  
  login: Login = {
    email: '',
    password: ""

  }
  constructor(private AccountService: AccountService, private router: Router ){ }

  async onSubmit() {
    try{
    const result = await this.AccountService.login(this.login);
      console.log('Login - Ok');
      this.router.navigate(['']);

    }catch(error){
      console.log('Deu merda');

    }
  }

  ngOnInit(): void {
    
  }

}
