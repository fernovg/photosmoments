import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonActionSheet, IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon, IonSegment, IonSegmentButton, IonSegmentContent, IonSegmentView, IonCard, IonCardHeader, IonCardTitle, ModalController, IonAvatar, IonItem, IonGrid, IonRow, IonCol, IonList, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addCircle, albums, camera, ellipsisHorizontal, grid, heart, people, qrCodeOutline, settings, ellipsisHorizontalOutline } from 'ionicons/icons';
// import {  } from '@ionic/angular';
import { GaleriaModalComponent } from 'src/app/shared/components/galeria-modal/galeria-modal.component';
import { CrearEventoModalComponent } from 'src/app/shared/components/crear-evento-modal/crear-evento-modal.component';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.page.html',
  styleUrls: ['./evento.page.scss'],
  standalone: true,
  imports: [IonLabel, IonItem, IonAvatar, IonList, IonCol, IonRow, IonGrid, IonActionSheet, IonCardTitle, IonCardHeader, IonCard, IonSegmentButton, IonSegment, IonIcon, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, IonSegmentContent, IonSegmentView, CommonModule, FormsModule]
})
export class EventoPage implements OnInit {

  private modalCtrl = inject(ModalController);

  constructor() {
    addIcons({qrCodeOutline,settings,albums,grid,heart,ellipsisHorizontalOutline,addCircle,people,camera,ellipsisHorizontal});
  }

  ngOnInit() {
  }

  //* Action Sheet
  isActionSheetOpen = false;

  public actionSheetButtons = [
    {
      text: 'Guardar',
      data: {
        action: 'save',
      },
    },
    {
      text: 'Borrar',
      role: 'destructive',
      data: {
        action: 'delete',
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
  ]

  setOpen(isOpen: boolean) {
    this.isActionSheetOpen = isOpen;
  }

  //* 
  imagenes = [
    'https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg',
    'https://www.istockphoto.com/resources/images/PhotoFTLP/P1-regional-iStock-1985150440.jpg',
    'https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVyZmlsfGVufDB8fDB8fHww'
  ]

  async abrirGaleria(index: number) {
    const modal = await this.modalCtrl.create({
      component: GaleriaModalComponent,
      componentProps: {
        imagenes: this.imagenes,
        slideIndex: index
      },
      cssClass: 'modal-fullscreen',
      showBackdrop: true
    });
    await modal.present();
  }



}
