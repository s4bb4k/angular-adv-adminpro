import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusquedasService } from '../../services/busquedas.service';

import { Usuario } from '../../models/usuario.model';
import { Medico } from '../../models/medico.model';
import { Hospital } from '../../models/hospital.model';
import { timestamp } from 'rxjs/operators';

@Component({
  selector: 'app-busquedas',
  templateUrl: './busquedas.component.html',
  styles: [
  ]
})
export class BusquedasComponent implements OnInit {

  public usuarios: Usuario[] = [];
  public medicos: Medico[] = [];
  public hospitales: Hospital[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private busquedasService: BusquedasService) { }

  ngOnInit(): void {
    this.activatedRoute.params
        .subscribe( ({ termino }) => {
            this.busquedaGlobal(termino);
        });
  }

  busquedaGlobal(termino: string) {
      this.busquedasService
        .busquedaGlobal(termino)
        .subscribe(
          (res: any) => {
            this.usuarios   = res.usuarios;
            this.medicos    = res.medicos;
            this.hospitales = res.hospitales;
          }
        ) 
  }

  abrirMedico(medico: Medico) {
    console.log(medico)
  }

}
