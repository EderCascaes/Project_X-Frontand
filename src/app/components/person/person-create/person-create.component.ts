import { Person } from './../person.model';
import { PersonService } from './../person.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-person-create',
  templateUrl: './person-create.component.html',
  styleUrls: ['./person-create.component.css']
})


export class PersonCreateComponent {


  person: Person = {
    nome: 'Fulano da Silva',
    idade: 102,
    funcao: 'teste'

  }
  constructor(private personService: PersonService,private router: Router) { }

ngOnInit(): void {
  
}


createPerson(): void {
    this.personService.createPerson(this.person).subscribe(() => {
    this.personService.showMessage('Person Register !')
    this.router.navigate(['/persons'])
  })

}
  cancel(): void {
    this.router.navigate(['/person'])
  }


}






