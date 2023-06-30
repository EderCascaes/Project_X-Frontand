import { HeaderComponent } from './../../components/template/header/header.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, catchError, map } from 'rxjs';
import { Login } from 'src/app/components/authentication/authe-login/login.model';
import { Resposta } from './Resposta';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = "https://localhost:7199/login";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  login(login: Login){
    return new Promise((resolve)=> {

      const r = this.http
      .post<Resposta>(this.baseUrl, login, this._httpOptions);

      console.log('deu OK :'+ r)
      resolve(true);
    }) 
  }


  errorHandler(e: any): any {
    throw new Error('Method not implemented.');
  }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-error"] : ["msg-success"],
    });


  }

  _httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      'Access-Control-Allow-Headers':
        'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
    })
  };

}
