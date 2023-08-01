import {  Person } from '../../person/person.model';
import { Endereco } from '../person-endereco.model';

import { PersonService } from '../../person/person.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-person-create',
  templateUrl: './person-create.component.html',
  styleUrls: ['./person-create.component.css']
})


export class PersonCreateComponent {
 
  selectedState = 'RS';
  selectedRoles : number
  
  roles =[
    {value: 0 , viewValue: 'Administrador'},
    {value: 1 , viewValue: 'Funcionario'},
    {value: 2 , viewValue: 'fisioterapeuta'},
    {value: 3 , viewValue: 'Paciente'}
  ]

  person: Person = {
    id: 0,
    nome: '',
    email : '',
    telefone: '',
    cpf : '',
    dataNascimento: '',
    funcoes: [] ,
    idEndereco : 0
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


createPerson(id: any): void {  
        
  console.log('Id recebido'+ id) 
          this.person.idEndereco = id;
          console.log("Pessoa send fora  : "+this.person)

          this.personService.createPerson(this.person).subscribe(() => {
            console.log("Pessoa send : "+this.person)
            this.personService.showMessage('Usuario registrado !')
            this.router.navigate(['/persons'])
          })
}

createAddress(): void {  

          this.personService.createAddress(this.endereco).subscribe( response => {    
            console.log('Id fora do if'+ response)  
            if(response > 0){
                console.log('Id do retorno'+ response)  
                this.createPerson(response);
            }
          })
}



getAddress(cep : any): void{
      this.personService.getAddress(cep).subscribe(resp => {
      this.endereco= resp
    //  console.log(resp)

      if(resp.cidade != null){
        this.selectedState=resp.estado
        this.endereco.cep= cep
        this.personService.showMessage('Endereço obtido com sucesso !')
      }else{
        this.selectedState='RS'
        this.personService.showMessage('Problema ao tentar obter endereço deste CEP!')
      }   
  })
}

  cancel(): void {
    this.router.navigate(['/persons'])
  }

  navigateToListPerson(): void {
    this.router.navigate(['/persons'])
  }



}






