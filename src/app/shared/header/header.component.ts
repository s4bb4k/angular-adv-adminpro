import { Component, OnInit, NgZone } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario.model';

declare const gapi;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public auth2: any;
  public usuario: Usuario;

  constructor(private usuarioService: UsuarioService,
              private router: Router,
              private ngZone: NgZone) { 
                this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    this.googleInit();
  }

  logout() {
    this.usuarioService.logout();
    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      })
    });
  }

  googleInit() {
    gapi.load('auth2', () => {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id: '786798673943-lhvvpnr96r2ccv7fvc28h75qlffjapev.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        // Request scopes in addition to 'profile' and 'email'
        //scope: 'additional_scope'
      });
    });
  }

  buscar(termino: string) {
    if( termino.length == 0 ) {
        return;
    }
    this.router.navigateByUrl(`/dashboard/buscar/${ termino }`);
  }

}
