import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICES } from '../config/config';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform( image: string, type: string = 'user' ): any {

    let url = URL_SERVICES + '/image';

    if ( !image ) {
      return url + '/user/xxx';
    }

    if ( image.indexOf('https') >= 0 ) {
      return image;
    }

    switch ( type ) {

      case 'user':
        url += '/user/' + image;
        break;

      case 'doctor':
        url += '/doctor/' + image;
        break;

      case 'hospital':
        url += '/hospital/' + image;
        break;

      default:
        console.log('type of image doesnt exist in user, doctor, hospital');
        return url + '/user/xxx';
    }

    return url;
  }

}
