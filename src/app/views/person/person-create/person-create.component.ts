import { Person } from '../../person/person.model';
import { PersonService } from '../../person/person.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-person-create',
  templateUrl: './person-create.component.html',
  styleUrls: ['./person-create.component.css']
})


export class PersonCreateComponent {


  person: Person = {
    nome: '',
    email : '',
    telefone: '',
    cpf : '',
    dataNascimento: '',
    funcao: ''

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


}






