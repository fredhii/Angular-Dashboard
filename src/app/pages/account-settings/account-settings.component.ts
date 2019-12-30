import { Component, OnInit, Inject } from '@angular/core';
import { SettingsService } from 'src/app/services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor( public _settings: SettingsService ) { }

  ngOnInit() {
    this.insertCheck();
  }

  changeColor( theme: string, link: any ) {
    // console.log( theme );
    this.applyCheck( link );

    this._settings.applyTheme( theme );
  }


  applyCheck( link: any ) {
    let selectors: any = document.getElementsByClassName('selector');
    for( let references of selectors ) {
      references.classList.remove('working');
    }

    link.classList.add('working');
  }

  insertCheck() {
    let selectors: any = document.getElementsByClassName('selector');
    let theme = this._settings.settings.theme;

    for( let references of selectors ) {
      if( references.getAttribute('data-theme') === theme ) {
        references.classList.add('working');
        break;
      }
    }
  }
}
