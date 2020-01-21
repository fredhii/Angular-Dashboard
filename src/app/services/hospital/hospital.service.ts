import { Injectable } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.models';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { UploadFileService } from '../upload-file/upload-file.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  // Variables
  hospital: Hospital;
  token: string;

  constructor(
    public http: HttpClient,
    public _uploadFileService: UploadFileService
  ) { }

  // =====================================================
  // Obtain TOKEN from localStorage
  // =====================================================
  getToken() {
     this.token = localStorage.getItem('token');
     return;
  }
  // =====================================================
  // GET hospitals
  // =====================================================
  getHospitals( from = 0 ) {
    const url = URL_SERVICES + '/hospital?from=' + from;
    return this.http.get(url);
  }
  // =====================================================
  // GET Hospital by ID
  // =====================================================
  getHospitalbyID( id: string ) {
    const url = URL_SERVICES + '/hospital/' + id;
    return this.http.get(url);
  }
  // =====================================================
  // GET Search Hospital
  // =====================================================
  searchHospital( term: string ) {
    const url = URL_SERVICES + '/search/collection/hospital/' + term;
    return this.http.get( url )
                    .pipe(map((response: any) => response.hospital));
  }
  // =====================================================
  // PUT update hospital
  // =====================================================
  updateHospital( hospital: Hospital) {
    this.getToken();
    const url = URL_SERVICES + '/hospital/' + hospital._id + '?token=' + this.token;
    return this.http.put(url, hospital)
                    .pipe(map( ( response: any ) => {
                      // let hospitalBD: Hospital = response.hospital;
                      // this.saveStorage( userBD._id, this.token, userBD );
                      console.log(response);
                      swal('Success', 'Hospital Updated', 'success' );
                      return true;
                    }));
  }
  // =====================================================
  // DEL update hospital
  // =====================================================
  deleteHospital( id: string) {
    this.getToken();
    const url = URL_SERVICES + '/hospital/' + id + '?token=' + this.token;
    return this.http.delete( url )
                    .pipe(map( () => {
                      swal('Success', 'Hospital was deleted', 'success');
                      return true;
                    }));
  }
  // =====================================================
  // POST create hospital
  // =====================================================
  createHospital( hospital: Hospital ) {
    this.getToken();
    const url = URL_SERVICES + '/hospital?token=' + this.token;
    return this.http.post( url, hospital )
                    .pipe(map( () => {
                      swal('Success', 'Hospital created', 'success' );
                      return true;
                    }));
  }

}


