import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Medico } from '../../../models/medico.model';

import { BusquedasService } from '../../../services/busquedas.service';
import { MedicoService } from '../../../services/medico.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';


@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  public medicos: Medico[] = [];
  public loading: boolean = true;
  private imgSubs: Subscription;

  constructor(private medicoService: MedicoService,
              private modalImagenService: ModalImagenService,
              private busquedasService: BusquedasService) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarMedico();
    this.imgSubs = this.modalImagenService
    .nuevaImagen
      .pipe( delay(100) )
      .subscribe( img => { this.cargarMedico() });
  }

  cargarMedico() {
    this.loading = true;
    this.medicoService
      .cargarMedicos()
      .subscribe(
          (res: any) => {
              this.loading = false;
              this.medicos = res;
          }
      )
  }

  borrarMedico(medico: Medico) {
    Swal.fire({
      title: 'Esta seguro?',
      text: `Esta a punto de borrar al medico ${ medico.nombre } !`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.medicoService
         .eliminarMedico(medico._id)
         .subscribe(
           (res: any) => {
              Swal.fire('Usuario borrado', `${ medico.nombre } fue eliminado correctamente`, 'success' );
              this.cargarMedico();
           }
         )

      }
    });
  }

  abrirImagen( medico: Medico) {
    this.modalImagenService.abrirModal('medicos', medico._id, medico.img);
  }

  buscar(termino: string) {

    if( termino.length === 0 ) {
      return this.cargarMedico();
    }

    this.busquedasService
      .buscar('medicos', termino)
      .subscribe(
        (res: any) => {
          this.medicos = res;
        }
      )
  }

}
