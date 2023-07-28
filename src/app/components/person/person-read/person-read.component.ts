import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PersonReadDataSource } from './person-read-datasource';
import { Person } from 'src/app/views/person/person.model';
import { PersonService } from 'src/app/views/person/person.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-person-read',
  templateUrl: './person-read.component.html',
  styleUrls: ['./person-read.component.css']
})


export class PersonReadComponent  {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Person>;
  dataSource: PersonReadDataSource;
  responsive  = true;
  persons : object[];
  qtd : number

  displayedColumns = ['id', 'nome', 'email',  'telefone', 'cpf' , 'dataNascimento', 'action'] 

  constructor(private router: Router, private personService : PersonService) {
    
  }

  ngOnInit(): void{
    this.personService.read().subscribe(resp => {      
      this.persons = resp
      console.log(resp)
      this.dataSource = new PersonReadDataSource(resp); 
      this.qtd = this.dataSource.data.length;
      this.AfterViewInit(this.dataSource);     
    })
  }

  AfterViewInit(dataSource: PersonReadDataSource): void {
    dataSource.sort = this.sort;
    dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
