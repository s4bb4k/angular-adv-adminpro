import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [{
    titulo: 'Dashboard',
    icono: 'mdi mdi-gauge',
    submenu: [

        {titulo: 'Main', url: '/'},
        {titulo: 'Graficas', url: 'chart'},
        {titulo: 'Rxjs', url: 'rxjs'},
        {titulo: 'Promesas', url: 'promises'},
        {titulo: 'Progress Bar', url: 'progress'},

    ]
  }
  ];

  constructor() { }
}
