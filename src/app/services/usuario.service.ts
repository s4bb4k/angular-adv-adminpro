import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';

import { RegisterForm } from '../interfaces/register.form.interface';
import { LoginForm } from '../interfaces/login-form.interface';

import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';

const base_url = environment.base_url;
declare const gapi;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;

  constructor(private http: HttpClient) { 
    this.googleInit();
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
      const token = localStorage.getItem('token') || '';
      return this.http.get(`${ base_url }/login/refreshToken`, {
        headers: {
          'x-token': token
        }
      }).pipe(
        tap((res: any) => {
          localStorage.setItem('token', res.token);
        }),
        map( res => true),
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
}
