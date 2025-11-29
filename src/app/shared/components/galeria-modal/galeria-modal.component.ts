import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton, IonIcon, ModalController, IonActionSheet } from '@ionic/angular/standalone';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { addIcons } from 'ionicons';
import { close, ellipsisHorizontal } from 'ionicons/icons';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-galeria-modal',
  templateUrl: './galeria-modal.component.html',
  styleUrls: ['./galeria-modal.component.scss'],
  standalone: true,
  imports: [IonIcon, IonButton, IonContent, CommonModule, FormsModule, IonActionSheet],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GaleriaModalComponent implements AfterViewInit {
  @Input() imagenes: any[] = [];
  @Input() slideIndex: number = 0;
  @ViewChild('swiperRef', { static: false }) swiperRef!: ElementRef;

  baseUrl = environment.img_url;

  private modalCtrl = inject(ModalController);

  constructor() {
    addIcons({ close, ellipsisHorizontal });
  }

  ngAfterViewInit() {
    const swiperEl = this.swiperRef.nativeElement;
    swiperEl.swiper?.slideTo(this.slideIndex, 0); // sin animación
  }

  cerrar() {
    this.modalCtrl.dismiss();
  }

  public actionSheetButtons = [
    {
      text: 'Descargar',
      data: {
        action: 'download',
      },
    },
    {
      text: 'Compartir',
      data: {
        action: 'share',
      },
    },
    {
      text: 'Cancel',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    },
  ];

  async onActionSelected(event: any) {
    const action = event.detail.data?.action;
    
    if (action === 'download') {
      console.log('download');
      const img = this.imagenes[this.slideIndex];
      this.descargarImagen(img.image_path);
    }
  }

  descargarImagen(url: string) {
    const link = document.createElement('a');
    link.href = url;
    link.download = 'foto.jpg';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
