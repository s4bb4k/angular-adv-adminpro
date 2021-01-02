import { Component, OnInit, OnDestroy } from '@angular/core';

import { HospitalesService } from '../../../services/hospitales.service';
import { Hospital } from '../../../models/hospital.model';
import Swal from 'sweetalert2';
import { async } from '@angular/core/testing';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitales: Hospital[] = [];
  public hospitalTemp: Hospital[] = [];

  public loading: boolean = true;
  private imgSubs: Subscription;

  constructor(private hospitalService: HospitalesService,
              private modalImagenService: ModalImagenService,
              private busquedasService: BusquedasService) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarHospitales();

    this.imgSubs = this.modalImagenService
    .nuevaImagen
      .pipe( delay(100) )
      .subscribe( img => { this.cargarHospitales() });
  }

  cargarHospitales() {
    this.loading = true;
      this.hospitalService
        .cargarHospitales()
        .subscribe(
            (res: any) => {
              this.loading = false;
              this.hospitales = res;
            }
        )
  }

  actualizarHospital( hospital: Hospital ) {
    this.hospitalService
      .actualizarHospital(hospital._id, hospital.nombre)
      .subscribe(
        (res: any) => {
          Swal.fire('Actualizado', hospital.nombre, 'success');
        }
      )
  }

  eliminarHospital( hospital: Hospital ) {
      this.hospitalService
        .eliminarHospital(hospital._id)
        .subscribe(
          (res: any) => {
              this.cargarHospitales();
              Swal.fire('Borrado', hospital.nombre, 'success');
          }
        )
  }
  
  async guardarHospital() {

    const { value = '' } = await Swal.fire<string>({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true,
    })
    
    if (value.trim().length > 0) {
        this.hospitalService
          .crearHospital(value)
          .subscribe(
            (res: any) => {
              this.hospitales.push( res.hospital );
            }
          )
    }

  }

  abrirImagen( hospital: Hospital) {
      this.modalImagenService.abrirModal('hospitales', hospital._id, hospital.img);
  }

  buscar(termino: string) {

    if( termino.length === 0 ) {
        return this.cargarHospitales();
    }

    this.busquedasService
      .buscar('hospitales', termino)
      .subscribe(
        (res: any) => {
          this.hospitales = res;
        }
      )
  }

}
