import { Injectable } from '@angular/core';
import { URL_SERVICES } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor() { }

  uploadFile( file: File, type: string, id: string ) {

    return new Promise( (resolve, reject) => {

      const formData = new FormData();
      const xhr = new XMLHttpRequest();

      formData.append( 'image', file, file.name );

      xhr.onreadystatechange = () => {
        if ( xhr.readyState === 4 ) {

          if ( xhr.status === 200 ) {
            console.log( 'Image Uploaded');
            resolve( JSON.parse( xhr.response ) );
          } else {
            console.log( 'Image upload Failed!' );
            reject( xhr.response );
          }

        }
      };

      const url = URL_SERVICES + '/upload/' + type + '/' + id;

      xhr.open( 'PUT', url, true );
      xhr.send( formData );

    });

  }

}
