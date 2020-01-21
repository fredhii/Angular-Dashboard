import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/models/doctor.models';
import { DoctorService } from '../../services/doctor/doctor.service';

declare var swal: any;

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: []
})
export class DoctorsComponent implements OnInit {

  // Variables
  doctor: Doctor[] = [];
  from = 0;
  showloadingbar = true;

  constructor(
    public _doctorService: DoctorService
  ) { }

  ngOnInit() {
    this.getDoctors();
  }

  // =====================================================
  // GET Doctors
  // =====================================================
  getDoctors() {
    this.showloadingbar = true;

    this._doctorService.getDoctors( this.from )
                        .subscribe(doctor => {
                          this.doctor = doctor;
                          this.showloadingbar = false;
                        });
  }

  // =====================================================
  // GET specific search
  // =====================================================
  searchDoctor( term: string ) {

    if ( term.length <= 0 ) {
      this.getDoctors();
      return;
    }
    this.showloadingbar = true;
    this._doctorService.searchDoctor( term )
                     .subscribe( (doctor: Doctor[]) => {
                      this.doctor = doctor;
                      this.showloadingbar = false;
                      });
  }

  // =====================================================
  // Paguination
  // =====================================================
  changeFrom( value: number ) {

    const from = this.from + value;

    if ( from >= this._doctorService.totalDoctor ) {
      return;
    }

    if ( from < 0 ) {
      return;
    }

    this.from += value;
    this.getDoctors();

  }

  // =====================================================
  // DEL Doctor
  // =====================================================
  deleteDoctor( doctor: Doctor ) {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover ' + doctor.name,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then(willDelete => {
      if (willDelete) {
        this._doctorService.deleteDoctor( doctor._id )
                        .subscribe( () => {
                          this.getDoctors();
                          this.changeFrom(-5);
                        });
      }
    });
  }

}
