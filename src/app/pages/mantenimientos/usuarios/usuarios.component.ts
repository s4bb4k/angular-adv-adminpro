import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';

import { Usuario } from '../../../models/usuario.model';

import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { UsuarioService } from '../../../services/usuario.service';
import { pipe, Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuario: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];

  public imgSubs: Subscription;
  public desde: number = 0;
  public loading: boolean = true;

  constructor(private usuarioService: UsuarioService, 
              private busquedaService: BusquedasService,
              private modalImagenService: ModalImagenService) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
      this.CargarUsuario();
      this.imgSubs = this.modalImagenService
                          .nuevaImagen
                            .pipe( delay(100) )
                            .subscribe( img => { this.CargarUsuario() });
  }

  CargarUsuario() {
    this.loading = true;
    this.usuarioService.cargarUsuarios(this.desde)
    .subscribe( 
      ({ total, usuarios }) => {
        this.loading = false;
        this.totalUsuario = total;
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
      }
    )
  }

  cambiarPagina( valor: number) {
      this.desde += valor;
      if(this.desde < 0) {
        this.desde = 0;
      } else if ( this.desde >= this.totalUsuario) {
        this.desde -= valor;
      }
      this.CargarUsuario();
  }
  
  buscar(termino: string) {

    if( termino.length === 0 ) {
        return this.usuarios = this.usuariosTemp;
    }

      this.busquedaService
        .buscar('usuarios', termino)
        .subscribe(
          (res: any) => {
            this.usuarios = res;
          }
        )
  }

  eliminarUsuario( usuario: Usuario ) {

    if(usuario.uid == this.usuarioService.uid) {
      return Swal.fire('Error', 'No puede borrarse a si mismo', 'error');
    }

    Swal.fire({
      title: 'Esta seguro?',
      text: `Esta a punto de borrar al usuario ${ usuario.nombre } !`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.usuarioService
         .eliminarUsuario(usuario)
         .subscribe(
           (res: any) => {
              Swal.fire('Usuario borrado', `${ usuario.nombre } fue eliminado correctamente`, 'success' );
              this.CargarUsuario();
           }
         )

      }
    });
  }

  cambiarUsuario(usuario: Usuario) {
    
    this.usuarioService
      .guardarUsuario(usuario)
      .subscribe( 
        (res: any) => {
          console.log(res);
        }
      )

  }

  abrirModal(usuario: Usuario) {
      this.modalImagenService.abrirModal( 'usuarios', usuario.uid, usuario.img );
  }

}
