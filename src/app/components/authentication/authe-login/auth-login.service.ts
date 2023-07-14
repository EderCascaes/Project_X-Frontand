import { EventEmitter, Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient } from "@angular/common/http";
import { Login } from "./authe-login.model";
import { Observable, EMPTY } from "rxjs";
import { map, catchError } from "rxjs/operators";
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
      duration: 5000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-error"] : ["msg-success"],
    });
  }

    login(login: Login){
       this.http.post<HttpResponse>(this.baseUrl , login)
    .subscribe(
      resp => {    
        
              if(resp.successful == false){      
                    this.showMessage(resp.notifications[0].message);    
                    //window.location.reload();
                    (<HTMLInputElement>document.getElementById('email')).value = '';
                    (<HTMLInputElement>document.getElementById('password')).value = '';   
                             
                    this.router.navigate(['login']);   
                    return false;              
                    
              }else{          
                  
                    localStorage.setItem('token_X', resp.response.token);         
                    this.mostrarMenuEmitter.emit(true); 
                    this.router.navigate(['']);
                    this.showMessage(resp.notifications[0].message);       
                    return false; 
              }     

      },
      erro => {
        if(erro.status == 400) {
           // senha ou usuario errados , cai aqui
            (<HTMLInputElement>document.getElementById('email')).value = '';
            (<HTMLInputElement>document.getElementById('password')).value = '';   
         
          // this.mostrarMenuEmitter.emit(false);         
          //  this.autheLoginComponent.showMsgError = true;  
          // window.location.reload();
             
        }
        return false;    
      }
    );
  }



  errorHandler(e: any): Observable<any> {
    this.showMessage("Ocorreu um erro!", true);
    return EMPTY;
  }
}