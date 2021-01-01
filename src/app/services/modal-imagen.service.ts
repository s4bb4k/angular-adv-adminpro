import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _ocultarModal: boolean = true;
  public tipo: 'usuarios'|'medicos'|'hospitales';
  public id: string;
  public img: string;

  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();

  get ocultarModal() {
    return this._ocultarModal;
  }

  abrirModal(tipo: 'usuarios'|'medicos'|'hospitales', id: string, img: string = 'no-img') {
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;
    //ttp://localhost:3000/api/uploads/usuarios/e26bc490-39c6-4466-a277-f7a88922a964.jpg
    if( img.includes('https') ) {
      this.img = img;
    } else {
      this.img = `${ base_url }/uploads/${ tipo }/${ img }`;
    }
    //this.img = img;
  }
  
  cerrarModal() {
    this._ocultarModal = true; 
  }

  constructor() { }

}
