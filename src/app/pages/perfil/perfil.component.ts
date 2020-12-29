import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';
import { FileUploadService } from '../../services/file-upload.service';

import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File;
  public imgTemp: any = '';

  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private fileuploadServive: FileUploadService) { 
      this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [ Validators.required, Validators.email ]]
    });
  }

  actualizarPerfil() {
      this.usuarioService
        .actualizarPerfil(this.perfilForm.value)
        .subscribe(
          res => {
            const { nombre, email } = this.perfilForm.value;
            this.usuario.nombre = nombre;
            this.usuario.email = email;
            Swal.fire('Guardado', 'Se actualizo correctamente el perfil.', 'success');
          },
          (err) => {
            Swal.fire('Error', err.error.msg, 'error');
          }
        )
  }

  cambiarImagen( file: File ) {

      this.imagenSubir = file;

      if( !file ) { 
        return this.imgTemp = null; 
      }

      const reader = new FileReader();
      const url64 = reader.readAsDataURL( file );
      reader.onloadend = () => {
        this.imgTemp = reader.result;
      }

  }

  subirImagen(){
    this.fileuploadServive
      .actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid)
      .then( img => {
        img => this.usuario.img = img;
        Swal.fire('Guardado', 'Se actualizo la imagen correctamente', 'success');
      }).catch( err => {
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      });
  }

}
