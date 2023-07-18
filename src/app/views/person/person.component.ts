import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Person } from './person.model';
import { PersonService } from './person.service';
import { HttpResponse } from  '../../objectShared/HttpResponse'


@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
 
  httpResponse : HttpResponse
  persons : object[]
  displayedColumns = ['id', 'nome', 'email',  'telefone', 'dataNascimento' ,'action']  

  constructor(private router:Router, private personService : PersonService){
   
  }


 
  ngOnInit(): void{
    this.personService.read().subscribe(resp => {      
      this.persons = resp
      console.log(this.persons)
    })
  }
  navigateToPersonCreate(): void{
    this.router.navigate(['/person/create']);
  }

}




