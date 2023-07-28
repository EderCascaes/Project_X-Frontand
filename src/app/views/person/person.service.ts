import { Response } from '../../Shared/Response';
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient } from "@angular/common/http";
import { Person } from "./person.model";
import { Observable, EMPTY } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { HttpResponseFront } from  '../../Shared/HttpResponseFront'

@Injectable({
  providedIn: "root",
})

export class PersonService {
  baseUrl = "https://localhost:443/pessoa";

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
    return this.http.post<Person>(this.baseUrl+'/cadastro', person).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  read(): Observable<Person[]> {
    return this.http.get<HttpResponseFront>(this.baseUrl+'/obter').pipe(
      map((obj) => obj.response),
      catchError((e) => this.errorHandler(e))
    );
  }

  readById(id: number): Observable<Person> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Person>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  update(person: Person): Observable<Person> {
    const url = `${this.baseUrl}/${person.id}`;
    return this.http.put<Person>(url, person).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  delete(id: number): Observable<Person> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Person>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage("Ocorreu um erro!", true);
    return EMPTY;
  }
}
