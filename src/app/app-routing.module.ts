import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './views/home/home.component';
import { PersonComponent } from './views/person/person.component';
import { PersonCreateComponent } from './components/person/person-create/person-create.component';

import { AutheLoginComponent } from './components/authentication/authe-login/authe-login.component';
import { AuthGuard } from './account/shared/auth.guard';

const routes: Routes = [
    { path:'',  component: HomeComponent,
        children:[  
          {path: "person", component: PersonComponent},
          {path: "person/create", component: PersonCreateComponent}
          ],
          canActivate:[AuthGuard]   
    },
    {path:'', component: AutheLoginComponent,
                      children:[
                        {path: '' ,redirectTo: 'login' , pathMatch:'full'},
                        {path: 'login',component: AutheLoginComponent}
                      ]      
    }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
