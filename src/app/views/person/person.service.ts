
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient } from "@angular/common/http";
import { Person } from "./person.model";
import { Observable, EMPTY } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { HttpResponseFront } from  '../../Shared/HttpResponseFront'
import { Endereco } from './person-endereco.model';

@Injectable({
  providedIn: "root",
})

export class PersonService {
  baseUrl = "https://localhost:7272";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-error"] : ["msg-success"],
    });
  }

  createPerson(person: Person): Observable<Person> {
    return this.http.post<Person>(this.baseUrl+'/pessoa/cadastro', person).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  createAddress(endereco: Endereco): Observable<number> {
    
      if(endereco.complemento == null){
        endereco.complemento="";
      }
       console.log('comlemento do endereço ' + endereco.complemento )

    return this.http.post<HttpResponseFront>(this.baseUrl+'/endereco/cadastro', endereco).pipe(
      map((obj) => obj.response),
      catchError((e) => this.errorHandler(e))
    );
  }

  read(): Observable<Person[]> {
    return this.http.get<HttpResponseFront>(this.baseUrl+'/pessoa/obter').pipe(
      map((obj) => obj.response),
      catchError((e) => this.errorHandler(e))
    );
  }

  getAddress(cep: string): Observable<Endereco> {
    return this.http.get<HttpResponseFront>(this.baseUrl+'/Endereco/ObterEnderecoPorCep/'+cep).pipe(
      map((obj) => obj.response),
      catchError((e) => this.errorHandler(e))
    );
  }

  getPersonWithFilter(filter: any ): Observable<Person[]> {
    return this.http.get<HttpResponseFront>(this.baseUrl+'/pessoa/obterPorDocOuNome/'+filter).pipe(
      map((obj) => obj.response),
      catchError((e) => this.errorHandler(e))
    );
  }


  readById(id: number): Observable<Person> {
    const url = `${this.baseUrl}/pessoa/${id}`;
    return this.http.get<Person>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  update(person: Person): Observable<Person> {
    const url = `${this.baseUrl}/pessoa/editar/${person.id}`;
    return this.http.put<Person>(url, person).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }


  delete(id: any): Observable<any> {
    
    console.log('entrou no delete service url 2 => ' + `${this.baseUrl}/pessoa/excluir/${id}` )
    return this.http.delete<HttpResponseFront>(`${this.baseUrl}/pessoa/excluir/${id}`).pipe(
      map((obj) => obj.response),
      catchError((e) => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage("Ocorreu um erro!" + e, true);
    console.log('erro =  ' + e )
    return EMPTY;
  }
}
