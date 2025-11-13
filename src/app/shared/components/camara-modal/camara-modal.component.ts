import { Component, inject, Input, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/core/services/photo.service';
import { IonContent, IonButton, IonIcon, ModalController, IonImg, IonHeader, IonToolbar, IonButtons, IonTitle } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { UserPhoto } from 'src/app/core/models/photos.interface';
import { ServiciosService } from 'src/app/core/services/servicios.service';

@Component({
  selector: 'app-camara-modal',
  templateUrl: './camara-modal.component.html',
  styleUrls: ['./camara-modal.component.scss'],
  imports: [IonTitle, IonButtons, IonToolbar, IonHeader, IonImg, IonButton, IonContent, CommonModule],
})
export class CamaraModalComponent implements OnInit {

  private modalCtrl = inject(ModalController);
  @Input() photo?: UserPhoto;
  @Input() eventoId!: string;
  @Input() eventoNombre!: string;
  public photoService = inject(PhotoService);
  private servicios = inject(ServiciosService);

  isLoading = false;


  constructor() { }

  ngOnInit() { }
  cerrar() {
    this.modalCtrl.dismiss();
  }

  guardar() {
    if (!this.photo?.file || !this.eventoId) {
      console.warn('Falta la imagen o el ID del evento');
      return;
    }

    const payload = {
      event_id: this.eventoId,
      image: this.photo?.file
    };

    const formData = new FormData();
    formData.append('event_id', this.eventoId.toString());
    formData.append('image', this.photo.file);

    this.isLoading = true;
    this.servicios.guardarDatos('guest-photos', formData).subscribe({
      next: (data) => {
        this.isLoading = false;
        console.log(data);
        this.modalCtrl.dismiss(data, 'confirm');
      },
      error: (error) => {
        this.isLoading = false;
        console.log(error);
      }
    })
  }
}
