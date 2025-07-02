import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton, IonIcon, ModalController } from '@ionic/angular/standalone';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';

@Component({
  selector: 'app-galeria-modal',
  templateUrl: './galeria-modal.component.html',
  styleUrls: ['./galeria-modal.component.scss'],
  standalone: true,
  imports: [IonIcon, IonButton, IonContent, CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GaleriaModalComponent  implements AfterViewInit  {
  @Input() imagenes: string[] = [];
  @Input() slideIndex: number = 0;
  @ViewChild('swiperRef', { static: false }) swiperRef!: ElementRef;

  private modalCtrl = inject(ModalController);
  
  constructor() {
    addIcons({ close });
  }

  ngAfterViewInit() {
    const swiperEl = this.swiperRef.nativeElement;
    swiperEl.swiper?.slideTo(this.slideIndex, 0); // sin animación
  }

  cerrar() {
    this.modalCtrl.dismiss();
  }
}
