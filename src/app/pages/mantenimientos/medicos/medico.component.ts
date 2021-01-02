import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { HospitalesService } from '../../../services/hospitales.service';
import { CargarUsuario } from '../../../interfaces/cargar-usuario.interface';
import { MedicoService } from '../../../services/medico.service';

import { Hospital } from '../../../models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medicoForm: FormGroup;
  public hospitales: Hospital[] = [];
  public hospitalSeleccionado: Hospital;
  public medicoSeleccionado: Medico;

  constructor(private fb: FormBuilder,
              private hospitalesService: HospitalesService,
              private medicoService: MedicoService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( ({ id }) => {
      this.cargarMedico(id);
    })

    this.medicoForm = this.fb.group({
        nombre: ['', Validators.required],
        hospital: ['', Validators.required]
    })
    this.cargarHospitales();
    this.medicoForm.get('hospital').valueChanges
      .subscribe(
          (res: any) => {
            this.hospitalSeleccionado = this.hospitales.find( hospital => hospital._id === res);
          }
      )
  }

  cargarHospitales() {
    this.hospitalesService
      .cargarHospitales()
      .subscribe(
          (res: any) => {
              this.hospitales = res;
          }
      )
  }

  cargarMedico(id: string) {

      if(id === 'nuevo') {
        return;
      }

      this.medicoService
        .getMedicoById(id)
        .pipe(
          delay(100)
        )
        .subscribe(
            (res: any) => {
                if( !res ) {
                  return this.router.navigateByUrl(`/dashboard/medicos`);
                }
                const { nombre, hospital: { _id } } = res;
                this.medicoSeleccionado = res;
                this.medicoForm.setValue({ nombre, hospital: _id })
            }
        )
  }

  guardarMedico() {
    const { nombre } = this.medicoForm.value;

    if ( this.medicoSeleccionado ) {
      // actualizar
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      }
      this.medicoService.actualizarMedico( data )
        .subscribe( resp => {
          Swal.fire('Actualizado', `${ nombre } actualizado correctamente`, 'success');
        })

    } else {
      // crear
      
      this.medicoService.crearMedico( this.medicoForm.value )
          .subscribe( (resp: any) => {
            Swal.fire('Creado', `${ nombre } creado correctamente`, 'success');
            this.router.navigateByUrl(`/dashboard/medico/${ resp.medico._id }`)
        })
    }
  }

}
