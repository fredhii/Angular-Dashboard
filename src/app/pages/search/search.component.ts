import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import { User } from 'src/app/models/user.model';
import { Hospital } from 'src/app/models/hospital.models';
import { Doctor } from 'src/app/models/doctor.models';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  user: User[] = [];
  hospital: Hospital[] = [];
  doctor: Doctor[] = [];

  constructor(
    public activatedRoute: ActivatedRoute,
    public http: HttpClient
  ) {
    activatedRoute.params
                .subscribe( params => {
                  let term = params['term'];
                  this.search( term );
                });
   }

  ngOnInit() {
  }

  // =========================================
  // Get Search
  // =========================================
  search( term: string ) {
    const url = URL_SERVICES + '/search/all/' + term;
    this.http.get(url)
              .subscribe( (response: any) => {
                this.hospital = response.hospital;
                this.doctor = response.doctor;
                this.user = response.user;
              });
  }

}
