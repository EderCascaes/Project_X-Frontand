import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './../../authentication/authe-login/auth-login.service';
import { MatSidenav } from '@angular/material/sidenav';
import {BreakpointObserver} from '@angular/cdk/layout';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements AfterViewInit {
  @ViewChild(MatSidenav)
  sidenav : MatSidenav ;
 

  constructor(
          private loginService: LoginService,
          private router: Router,
          private observer: BreakpointObserver 
       //   ,private ref: ChangeDetectorRef
          ){
          

           }

  ngOnInit(){   
    //  this.ref.detectChanges();         
  }

  showView(){
    this.ngAfterViewInit();  
  }

  ngAfterViewInit(){

    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
        if(res.matches){
          this.sidenav.mode = 'over';
          this.sidenav.close();
        }else{
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }

    })
  }

  logOut(){
         
          localStorage.removeItem('token_X');   
         // this.router.navigate(['login']);
          this.loginService.mostrarMenuEmitter.emit(false);
          window.location.reload();
          
  }

}