import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {

    

    // promesa.then(
    //   () => console.log('Finish!!'),
    //   () => console.log('Error!'),
    // )
    
    this.countThree().then(
      message => console.log('Finish!!', message),
      )
      .catch( error => console.error('Promise error', error))
    }

  ngOnInit() {
  }

  countThree(): Promise<boolean> {

    return new Promise( (resolve, reject) => {
      
      let counter = 0;

     let interval = setInterval( () =>{
          counter += 1;
          console.log( counter )

          if (counter === 3) {
            resolve( true );
            // reject('Controled error');
            clearInterval(interval);
          }
      }, 1000 );
    });
  }

}
