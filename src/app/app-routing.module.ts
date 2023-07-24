import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './views/home/home.component';
import { PersonCreateComponent } from './views/person/person-create/person-create.component';

import { AutheLoginComponent } from './components/authentication/authe-login/authe-login.component';
import { AuthGuard } from './account/shared/auth.guard';
import { PersonReadComponent } from './components/person/person-read/person-read.component';

const routes: Routes = [
  { path:'',  
  component: HomeComponent,        
  canActivate:[AuthGuard]   
},
  {path:'login', 
  component: AutheLoginComponent,                    
},
{path:'persons', 
      component: PersonReadComponent,     
      canActivate:[AuthGuard]                     
},
 { path:'person/create', 
        component: PersonCreateComponent, 
       canActivate:[AuthGuard]                     
 }


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
