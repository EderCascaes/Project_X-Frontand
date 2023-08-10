import {  Person } from '../../person/person.model';


import { PersonService } from '../../person/person.service';
import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Address } from '../person-endereco.model';



@Component({
  selector: 'app-person-create',
  templateUrl: './person-create.component.html',
  styleUrls: ['./person-create.component.css']
})


export class PersonCreateComponent implements AfterViewInit {
  @ViewChild('saveButton') 
   private testElement: ElementRef
  
   globalInstance: any; 

  
  selectedState = 'RS';
    
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

  endereco : Address ={
    id : 0,
    cidade  : '',
    estado    : '',
    numero: '',
    logradouro: '',
    complemento: '',
    bairro:'',
    cep : ''       
  }

  constructor(private personService: PersonService,private router: Router,private renderer: Renderer2) { }

  ngOnInit(): void {     
   
}



ngAfterViewInit() {
 
}

enableButton(){
  var address = this.endereco;
  var person = this.person;

    if(
      address.cidade != '' 
      && address.numero !=  "0" 
      && address.logradouro != ''
      && address.bairro != ''
      && address.cep != ''
      && person.nome != ''
      && person.email != ''
      && person.telefone != ''
      && person.cpf != ''
      && person.dataNascimento != ''
      && person.funcoes != null
      )
      { 
        console.log("testando save dentro if false");
        (<HTMLInputElement>document.getElementById("saveButton")).disabled = false;
      }else{
        console.log("testando save dentro if true");
        (<HTMLInputElement>document.getElementById("saveButton")).disabled = true;
      }

}


createPerson(id: any): void {  
        
  console.log('data aniver antes'+ this.person.dataNascimento) 
          this.person.idEndereco = id;   
          this.person.dataNascimento =  this.dateFormater(this.person.dataNascimento);
  console.log('data aniver depois'+ this.person.dataNascimento)              
          this.personService.createPerson(this.person).subscribe(() => {
           // console.log("Pessoa send : "+this.person)
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

  dateFormater(date: string){

    const year = date.substring(4, 8)+'/';
    const month = date.substring(2, 4)+'/';
    const  day = date.substring(0 , 2)+' 23:00:00-00';

    return year+month+day;
  }


}






