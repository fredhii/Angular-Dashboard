import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import { UploadFileService } from 'src/app/services/service.index';
import { ModalUploadService } from './modal-upload.service';


@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imageUpload: File;
  imageTemp: string | ArrayBuffer;

  constructor(
    // tslint:disable-next-line: variable-name
    public _uploadFileService: UploadFileService,
    public _modalUploadervice: ModalUploadService
  ) {}

  ngOnInit() {
  }

  closeModal() {
    this.imageTemp = null;
    this.imageUpload = null;

    this._modalUploadervice.hideModal();
  }

  uploadImage() {
    this._uploadFileService.uploadFile( this.imageUpload, this._modalUploadervice.type, this._modalUploadervice.id )
                            .then( response => {
                              // console.log( response );
                              this._modalUploadervice.notification.emit( response );
                              this.closeModal();
                            })
                            .catch( response => {
                              console.log('Erros loading image....');
                            });
  }

  selectImage( file: File ) {

    if ( !file ) {
      this.imageUpload = null;
      return;
    }

    // Check if file is image
    if ( file.type.indexOf('image') < 0 ) {
      swal('Inconrrect', 'Please select an image', 'warning');
      this.imageUpload = null;
      return;
    }

    this.imageUpload = file;

    const reader = new FileReader();
    const urlImageTemp = reader.readAsDataURL( file );

    reader.onloadend = () => this.imageTemp = reader.result;

  }

}
