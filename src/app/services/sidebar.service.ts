import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu = [];

  cargarMenu() {
      this.menu = JSON.parse(localStorage.getItem('menu')) || [];
  }

  // menu: any[] = [{
  //   titulo: 'Dashboard',
  //   icono: 'mdi mdi-gauge',
  //   submenu: [

  //       {titulo: 'Main', url: '/'},
  //       {titulo: 'Graficas', url: 'chart'},
  //       {titulo: 'Rxjs', url: 'rxjs'},
  //       {titulo: 'Promesas', url: 'promises'},
  //       {titulo: 'Progress Bar', url: 'progress'},

  //   ] 
  // },
  // {
  //   titulo: 'Mantenimientos',
  //   icono: 'mdi mdi-folder-lock-open',
  //   submenu: [

  //       {titulo: 'Usuarios', url: 'usuarios'},
  //       {titulo: 'Hospitales', url: 'hospitales'},
  //       {titulo: 'Medicos', url: 'medicos'},

  //   ] 
  // }

  // ];


}
