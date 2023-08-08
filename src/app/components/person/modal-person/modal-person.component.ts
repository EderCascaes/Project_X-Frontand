import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';

import { PersonService } from 'src/app/views/person/person.service';
import { PersonReadComponent } from '../person-read/person-read.component';
import { Router } from '@angular/router';



@Component({
  selector: 'app-modal-person',
  templateUrl: './modal-person.component.html',
  styleUrls: ['./modal-person.component.css'],
})


export class ModalPersonComponent implements OnInit {

  id: any;

  constructor(
    public dialogRef: MatDialogRef<ModalPersonComponent>,
    private personService : PersonService,
    private router : Router
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }



  delete(){

      this.id = localStorage.getItem('id_deletar')
      this.personService.delete(this.id).subscribe(resp => {       
      localStorage.removeItem('id_deletar');      
      this.onNoClick();
      this.router.navigate([''])
      this.personService.showMessage("Usuário excluido com ** Sucesso** !");
      
    })
  }



  



  ngOnInit(): void {   
  }
 

}