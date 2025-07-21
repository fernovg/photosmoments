import { Component, inject, Input, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/core/services/photo.service';
import { IonContent, IonButton, IonIcon, ModalController, IonImg } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { UserPhoto } from 'src/app/core/models/photos.interface';

@Component({
  selector: 'app-camara-modal',
  templateUrl: './camara-modal.component.html',
  styleUrls: ['./camara-modal.component.scss'],
  imports: [IonImg, IonButton, IonContent, CommonModule],
})
export class CamaraModalComponent implements OnInit {

  private modalCtrl = inject(ModalController);
  @Input() photo!: UserPhoto
  public  photoService = inject(PhotoService);

  constructor() { }

  ngOnInit() { }
  cerrar() {
    this.modalCtrl.dismiss();
  }

  guardar() {
    // console.log('Imagen base64:', this.photo?.base64);
    this.modalCtrl.dismiss(); // Opcional: cerrar modal después de guardar
  }
}
