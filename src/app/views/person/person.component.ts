import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent {

  constructor(private router:Router){}

  ngOnInit(): void{

  }
  navigateToPersonCreate(): void{
    this.router.navigate(['/person/create']);
  }

}
