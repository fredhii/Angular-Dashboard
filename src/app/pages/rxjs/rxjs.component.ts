import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { retry, map, filter } from 'rxjs/operators';
import { Subscriber } from 'rxjs/internal/Subscriber';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  suscription: Subscription;

  constructor() {

    // Retry
    // this.returnObservable().pipe(
    //   retry(2)
    // )
    this.suscription = this.returnObservable()
    .subscribe(
      number => console.log( 'Subs', number ),
      error => console.error( 'Error in obs', error),
      () => console.log( 'Observer Finish job!' )
    );
   };

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log( 'The page has been closed');
    this.suscription.unsubscribe();
  }

  returnObservable(): Observable<any> {

    // Create Observable
    return new Observable( (observer: Subscriber<any>) => {

      let counter = 0;

      const interval = setInterval ( () => {

        counter++;

        const exit = {
          value: counter
        };

        observer.next(exit);

        // // Stops Counter
        // if ( counter === 3) {
        //   clearInterval( interval );
        //   //Stops observable
        //   observer.complete();
        // }
        // if (counter === 2) {
        //   // clearInterval( interval );
        //   observer.error('Error test!');
        // }

      }, 1000);
    }).pipe(
      map( resp => resp.value),
      filter( (value, index ) => {

        if ( (value % 2) === 1 ) {
          // impar
          return true;
        } else {
          // par
          return false;
        }

      })
     );
  }

}
