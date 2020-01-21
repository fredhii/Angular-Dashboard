import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.models';
import { HospitalService } from 'src/app/services/service.index';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

declare var swal: any;


@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styles: []
})
export class HospitalComponent implements OnInit {

  // Variables
  hospitals: Hospital[] = [];
  totalHospitals = 0;
  from = 0;
  showloadingbar = true;

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.getHospital();
    this._modalUploadService.notification
                .subscribe( () => this.getHospital() );
  }

  // =====================================================
  // GET Hospitals
  // =====================================================
  getHospital() {
    this.showloadingbar = true;
    this._hospitalService.getHospitals( this.from )
                        .subscribe((response: any) => {
                          this.totalHospitals = response.total;
                          this.hospitals = response.hospital;
                          this.showloadingbar = false;
                        });
  }
  // =====================================================
  // GET specific search
  // =====================================================
  searchHospital( term: string ) {

    if ( term.length <= 0 ) {
      this.getHospital();
      return;
    }

    this.showloadingbar = true;

    this._hospitalService.searchHospital( term )
                     .subscribe( (hospital: Hospital[]) => {
                      this.hospitals = hospital;
                      this.showloadingbar = false;
                      });
  }
  // =====================================================
  // Paguination
  // =====================================================
  changeFrom( value: number ) {

    const from = this.from + value;

    if ( from >= this.totalHospitals ) {
      return;
    }

    if ( from < 0 ) {
      return;
    }

    this.from += value;
    this.getHospital();

  }
  // =====================================================
  // GET Hospital by ID
  // =====================================================
  getHospitalbyID( hospital: Hospital ) {
    this._hospitalService.getHospitalbyID( hospital._id )
                        .subscribe( response => {
                          console.log(response);
                          this.showloadingbar = false;
                        });
  }

  // =====================================================
  // PUT update hospital
  // =====================================================
  updateHospital( hospital: Hospital ) {
    this._hospitalService.updateHospital( hospital )
                          .subscribe();
  }

  // =====================================================
  // DEL hospital
  // =====================================================
  deleteHospital( hospital: Hospital ) {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover ' + hospital.name,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then(willDelete => {
      if (willDelete) {
        this._hospitalService.deleteHospital( hospital._id )
                        .subscribe( response => {
                          this.getHospital();
                          this.changeFrom(-5);
                        });
      }
    });
  }
  // =====================================================
  // POST hospital
  // =====================================================
  createHospital() {
    swal({
      title: 'New Hospital',
      content: 'input',
      buttons: true,
      dangerMode: true,
    })
    .then(name => {

      if (!name || name.length === 0) {
        return;
      }

      const newhospital = new Hospital(name);
      this._hospitalService.createHospital(newhospital)
                            .subscribe( () => {
                              this.getHospital();
                            });
    });
  }
  // =====================================================
  // PUT update image
  // =====================================================
  showModal( id: string ) {
    this._modalUploadService.showModal( 'hospital', id );
  }

}
