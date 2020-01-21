import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/doctor/doctor.service';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.models';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Doctor } from '../../models/doctor.models';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: []
})
export class DoctorComponent implements OnInit {

  // Variables
  hospitals: Hospital[] = [];
  doctor: Doctor = new Doctor('', '', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(
    public _doctorService: DoctorService,
    public _hospitalService: HospitalService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService
  ) {
    activatedRoute.params.subscribe( params => {
      const id = params['id'];

      if ( id !== 'new') {
        this.getDoctorbyID(id);
      }
    });
   }

  ngOnInit() {

    this._hospitalService.getHospitals()
                        .subscribe((response: any) => {
                          this.hospitals = response.hospital;
                        });
    this._modalUploadService.notification
                            .subscribe( response => {
                              this.doctor.image = response.doctor.image;
                            } );
  }
  // =====================================================
  // PUT & POST doctor
  // =====================================================
  updateDoctor(f: NgForm) {
    console.log(f.valid);
    console.log(f.value);
    if ( f.invalid ) {
      return;
    }
    this._doctorService.saveDoctor( this.doctor )
                      .subscribe( doctor => {
                        this.doctor._id = doctor._id;
                        this.router.navigate(['/doctor', doctor._id]);
                      });
  }
  // =====================================================
  // GET select hospital
  // =====================================================
  changeHospital( id: string ) {
    this._hospitalService.getHospitalbyID( id )
                          .subscribe( (response: any) => this.hospital = response.hospital );
  }

  // =====================================================
  // GET doctor by ID
  // =====================================================
  getDoctorbyID( id: string ) {
    this._doctorService.getDoctorbyID(id)
                      .subscribe( doctor => {
                        this.doctor = doctor;
                        if (!doctor.hospital) {
                          this.doctor.hospital = '';
                          return;
                        }
                        this.doctor.hospital = doctor.hospital._id;
                        this.changeHospital( this.doctor.hospital );
                      });
  }
  // =====================================================
  // PUT update doctor Image
  // =====================================================
  updatePicture() {
    this._modalUploadService.showModal( 'doctor', this.doctor._id );
  }

}

