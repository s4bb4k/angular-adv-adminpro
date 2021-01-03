import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedasComponent } from './busquedas/busquedas.component';
import { AdminGuard } from '../guards/admin.guard';


const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
          { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' }},
          { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Theme' }},
          { path: 'buscar/:termino', component: BusquedasComponent, data: { titulo: 'Busquedas' }},
          { path: 'chart', component: Grafica1Component, data: { titulo: 'Gráficas' }},
          { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de usuario' }},
          { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' }},
          { path: 'promises', component: PromesasComponent, data: { titulo: 'Promesas' }},
          { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Rxjs'}},
          
          //Mantenimientos
          { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Matenimientos de Hospitales' }},
          { path: 'medicos', component: MedicosComponent, data: { titulo: 'Matenimientos de Medicos' }},
          { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Matenimientos de Medicos' }},
          
          // Rutas admin
          { path: 'usuarios', canActivate: [ AdminGuard ], component: UsuariosComponent, data: { titulo: 'Matenimientos de Usuarios' }},
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
