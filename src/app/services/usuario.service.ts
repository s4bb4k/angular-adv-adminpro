import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';

import { RegisterForm } from '../interfaces/register.form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { CargarUsuario } from '../interfaces/cargar-usuario.interface';

import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;
declare const gapi;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuario: Usuario;

  constructor(private http: HttpClient) { 
    this.googleInit();
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.usuario.uid || '';
  }

  get headers() {
      return {
        headers: {
          'x-token': this.token
        }
      }
  }

  googleInit() {
    return new Promise<void> ( resolve => {
      console.log('google init');
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '786798673943-lhvvpnr96r2ccv7fvc28h75qlffjapev.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        
        resolve();
      });
    });
  }

  logout() {
    localStorage.removeItem('token');
  }

  validarToken(): Observable<boolean> {

      return this.http.get(`${ base_url }/login/refreshToken`, {
        headers: {
          'x-token': this.token
        }
      }).pipe(
        map((res: any) => {
          const { email, google, nombre, role, img = '', uid } = res.usuarioDB;
          this.usuario = new Usuario(nombre, email, '', img, google, role, uid);
          localStorage.setItem('token', res.token);
          return true;
        }),
        catchError(error => of(false))
      );
  }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${ base_url }/usuarios`, formData)
                .pipe(
                  tap( (res: any) => {
                    localStorage.setItem('token', res.token);
                  })
               )
  }

  actualizarPerfil(data: { email: string, nombre: string, role: string }) {
    
    data = {
      ...data,
      role: this.usuario.role
    };

    return this.http.put(`${ base_url }/usuarios/${ this.uid }`, data, this.headers);
  }

  login(formData: LoginForm) {
    return this.http.post(`${ base_url }/login`, formData)
                .pipe(
                   tap( (res: any) => {
                     localStorage.setItem('token', res.token);
                   })
                )
  }

  loginGoogle( token ) {
    return this.http.post(`${ base_url }/login/google`, { token })
                .pipe(
                   tap( (res: any) => {
                     localStorage.setItem('token', res.token);
                   })
                )
  }

  cargarUsuarios( desde: number = 0) {
    const url = `${ base_url }/usuarios?desde=${ desde }`;
    return this.http.get<CargarUsuario>( url, this.headers )
      .pipe(
        map ( res => {
          const usuarios = res.usuarios.map(
              user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid)
          );
          return {
            total: res.total,
            usuarios
          };
        })
      )
  }

  eliminarUsuario( usuario: Usuario ) {
    const url = `${ base_url }/usuarios/${ usuario.uid }`;
    return this.http.delete( url, this.headers )
  }

  guardarUsuario( usuario: Usuario) {
    return this.http.put(`${ base_url }/usuarios/${ usuario.uid }`, usuario, this.headers);
  }

}
