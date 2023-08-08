import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PersonReadDataSource } from './person-read-datasource';
import { Person } from 'src/app/views/person/person.model';
import { PersonService } from 'src/app/views/person/person.service';
import { Router } from '@angular/router';
import { ModalPersonComponent } from '../modal-person/modal-person.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

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
  filter = '';


  // displayedColumns = ['id', 'nome', 'email',  'telefone', 'cpf' , 'dataNascimento', 'action'] 
 displayedColumns = [ 'nome', 'email',  'telefone', 'cpf' ,  'action'] 

  constructor(
    private router: Router,
     private personService : PersonService,
      public dialog: MatDialog,
     // private modalPerson : ModalPersonComponent
      ) {
    
  }

  ngOnInit(): void{
    this.getPersons();
  }

  getPersonWithFilter(){
    
    this.personService.getPersonWithFilter(this.filter).subscribe(resp =>{      
      this.persons = resp
      console.log(resp)
      this.dataSource = new PersonReadDataSource(resp); 
      this.qtd = this.dataSource.data.length;
      (<HTMLInputElement>document.getElementById('filter')).value = ''; 
      this.AfterViewInit(this.dataSource);   
    })
  
  }

  CleanFilter(){
    (<HTMLInputElement>document.getElementById('filter')).value = '';   
   // window.location.reload();
    this.getPersons();
  }


  getPersons(){
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

  deletePersons(id : number){
    this.personService.delete(id).subscribe(() => {      
      this.getPersons();
    })
  }


  openDialog(id : any): void {
    const dialogRef = this.dialog.open(ModalPersonComponent, { })
    localStorage.setItem('id_deletar', id);  
    ;

    dialogRef.afterClosed().subscribe(result => {
    localStorage.removeItem('id_deletar');      
    });
  }
}
