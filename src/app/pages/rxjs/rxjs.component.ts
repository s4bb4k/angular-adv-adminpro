import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  public intervalSubs: Subscription;

  constructor() { 
    /*this.retornaObservable().pipe(
      retry(1)
    ).subscribe(
      valor => console.log('subs: ', valor),
      error => console.warn('Error: ', error),
      () => console.info('Obs terminado')
    );*/
    this.intervalSubs = this.retornaintervalo().subscribe(console.log)
  }
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  retornaintervalo(): Observable<number> {
    return interval(1000)
    .pipe(
      map( valor => valor + 1 ), // 0 => 1
      filter( valor => ( valor % 2 === 0 ? true: false) ),
      take(4),
    );
  }

  retornaObservable(): Observable<number> {
    let i = -1;

    const obs$ = new Observable<number>( observer => {

      const intervalo = setInterval( () => {
        i++;
        observer.next(i);

        if( i === 4) {
          clearInterval( intervalo );
          observer.complete();
        }
        if( i === 2 ) {
          observer.error();
        }

      }, 1000)
    });
    return obs$;
  }
}
