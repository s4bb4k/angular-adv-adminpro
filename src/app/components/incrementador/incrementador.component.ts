import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

  // tslint:disable-next-line: no-input-rename
  @Input('valor') progreso: number = 20;
  // tslint:disable-next-line: ban-types
  @Input() btnClass: String = 'btn btn-primary';

  @Output() valorSalida: EventEmitter<number> = new EventEmitter();

  ngOnInit(): void {
    this.btnClass = `btn ${ this.btnClass }`;
  }


  get getPorcentaje() {
    return `${ this.progreso }%`;
  }

  cambiarValor(valor: number) {

    if (this.progreso >= 100 && valor >= 0) {
      this.valorSalida.emit(100);
      return this.progreso = 100;
    }

    if (this.progreso <= 0 && valor < 0) {
      this.valorSalida.emit(0);
      return this.progreso = 0;
    }

    this.progreso = valor + this.progreso;
    this.valorSalida.emit( this.progreso );
  }

  onChange(nuevovalor: number) {
    if (nuevovalor >= 100) {
      this.progreso = 100;
    } else  if (nuevovalor <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = nuevovalor;
    }
    this.valorSalida.emit( this.progreso );
  }
}
