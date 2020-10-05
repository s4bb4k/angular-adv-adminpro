import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// modules
import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';

import { Error404Component } from './error404/error404.component';

const routes: Routes = [

  // path: '/dashboard' PagesRouting
  // path: '/auth' AuthRouting
  // path: '/medicos' MedicosRouting
  // path: '/compras' ComprasRouting
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: Error404Component }
];

@NgModule({
  declarations: [],
  imports: [ 
    RouterModule.forRoot( routes )
  ],
  exports: [ 
    RouterModule, 
    PagesRoutingModule,
    AuthRoutingModule  
  ]
})

export class AppRoutingModule { }
