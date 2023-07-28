import {  Person } from '../../person/person.model';
import { Endereco } from '../person-endereco.model';

import { PersonService } from '../../person/person.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery/dist/jquery.slim';


@Component({
  selector: 'app-person-create',
  templateUrl: './person-create.component.html',
  styleUrls: ['./person-create.component.css']
})


export class PersonCreateComponent {
 
  datemask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

  person: Person = {
    id: 0,
    nome: '',
    email : '',
    telefone: '',
    cpf : '',
    dataNascimento: '',
    funcao: ''

  };

  endereco : Endereco ={
    id : 0,
    cidade  : '',
    estado    : '',
    numero: '',
    logradouro: '',
    complemento: '',
    bairro:'',
    cep : ''       
  }

  constructor(private personService: PersonService,private router: Router) { }

  ngOnInit(): void {   
   
}


createPerson(): void {
    this.personService.createPerson(this.person).subscribe(() => {
    this.personService.showMessage('Usuario registrado !')
    this.router.navigate(['/persons'])
  })

}
  cancel(): void {
    this.router.navigate(['/persons'])
  }

  navigateToListPerson(): void {
    this.router.navigate(['/persons'])
  }

   mask(i: any,t: any){
   
    var v = i.value;
    
    if(isNaN(v[v.length-1])){
       i.value = v.substring(0, v.length-1);
       return;
    }
    
    if(t == "data"){
       i.setAttribute("maxlength", "10");
       if (v.length == 2 || v.length == 5) i.value += "/";
    }
 
    if(t == "cpf"){
       i.setAttribute("maxlength", "14");
       if (v.length == 3 || v.length == 7) i.value += ".";
       if (v.length == 11) i.value += "-";
    }
 
    if(t == "cnpj"){
       i.setAttribute("maxlength", "18");
       if (v.length == 2 || v.length == 6) i.value += ".";
       if (v.length == 10) i.value += "/";
       if (v.length == 15) i.value += "-";
    }
 
    if(t == "cep"){
       i.setAttribute("maxlength", "9");
       if (v.length == 5) i.value += "-";
    }
 
    if(t == "tel"){
       if(v[0] == 9){
          i.setAttribute("maxlength", "10");
          if (v.length == 5) i.value += "-";
       }else{
          i.setAttribute("maxlength", "9");
          if (v.length == 4) i.value += "-";
       }
    }
 }

}






