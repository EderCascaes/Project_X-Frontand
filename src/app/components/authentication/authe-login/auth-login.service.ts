import { EventEmitter, Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient, HttpEvent } from "@angular/common/http";
import { Login } from "./authe-login.model";
import { Observable, EMPTY } from "rxjs";
import { map, catchError, defaultIfEmpty } from "rxjs/operators";
import { HttpResponse } from  '../../../objectShared/HttpResponse'
import { Router } from "@angular/router";
import {AutheLoginComponent} from './authe-login.component'

@Injectable({
  providedIn: "root",
})

export class LoginService {
  baseUrl = "https://localhost:443/Autenticacao/login" 
  showMenu : boolean = false;
  mostrarMenuEmitter = new EventEmitter<boolean>();

  constructor(
      private snackBar: MatSnackBar,  
      private http: HttpClient,  
      private router: Router,
    //  private autheLoginComponent : AutheLoginComponent 
    ) {}

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, "X", {
      duration: 4000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-error"] : ["msg-success"],
    });
  }

   

  login(login: Login):Observable<HttpResponse>{  
    return this.http.post<HttpResponse>(this.baseUrl , login);
}


  errorHandler(e: any): Observable<any> {
    this.showMessage("Ocorreu um erro!", true);
    return EMPTY;
  }
}