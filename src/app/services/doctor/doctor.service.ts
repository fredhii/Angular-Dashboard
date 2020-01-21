import { Injectable } from '@angular/core';
import { Doctor } from 'src/app/models/doctor.models';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  // Variables
  doctor: Doctor;
  token: string;
  totalDoctor = 0;

  constructor(
    public http: HttpClient
  ) { }

  // =====================================================
  // Obtain TOKEN from localStorage
  // =====================================================
  getToken() {
    this.token = localStorage.getItem('token');
    return;
  }
  // =====================================================
  // GET Doctors
  // =====================================================
  getDoctors( from = 0 ) {
    const url = URL_SERVICES + '/doctor?from=' + from;
    return this.http.get(url)
                  .pipe(map((response: any) => {
                    this.totalDoctor = response.total;
                    return response.doctor;
                  }));
  }
  // =====================================================
  // GET Search Doctor
  // =====================================================
  searchDoctor( term: string ) {
    const url = URL_SERVICES + '/search/collection/doctor/' + term;
    return this.http.get( url )
                    .pipe(map((response: any) => response.doctor));
  }
  // =====================================================
  // GET Doctor by ID
  // =====================================================
  getDoctorbyID( id: string ) {
    const url = URL_SERVICES + '/doctor/' + id;
    return this.http.get(url)
                  .pipe(map((response: any) => response.doctor ));
  }
  // =====================================================
  // DEL update doctor
  // =====================================================
  deleteDoctor( id: string ) {
    this.getToken();
    const url = URL_SERVICES + '/doctor/' + id + '?token=' + this.token;
    return this.http.delete( url )
                    .pipe(map( () => {
                      swal('Success', 'Doctor was deleted', 'success');
                      return true;
                    }));
  }
  // =====================================================
  // POST create doctor
  // =====================================================
  saveDoctor( doctor: Doctor ) {
    this.getToken();
    let url = URL_SERVICES + '/doctor';

    if (doctor._id) {
      // Update Doctor
      url += '/' + doctor._id + '?token=' + this.token;
      return this.http.put(url, doctor)
            .pipe(map( (response: any) => {
              swal('Success', 'Doctor Updated', 'success' );
              return response.doctor;
            }));

    } else {
      // Create Doctor
      url += '?token=' + this.token;
      return this.http.post( url, doctor )
              .pipe(map((response: any) => {
                swal('Success', 'Doctor created', 'success' );
                return response.doctor;
              }));
    }

  }
}
