import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonActionSheet, IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon, IonSegment, IonSegmentButton, IonSegmentContent, IonSegmentView, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonAvatar, IonItem, IonGrid, IonRow, IonCol, IonList, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addCircle, albums, calendar, camera, ellipsisHorizontal, grid, heart, people, qrCodeOutline, settings, ellipsisHorizontalOutline } from 'ionicons/icons';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.page.html',
  styleUrls: ['./evento.page.scss'],
  standalone: true,
  imports: [IonLabel, IonItem, IonAvatar, IonList, IonCol, IonRow, IonGrid, IonActionSheet, IonCardTitle, IonCardHeader, IonCard, IonSegmentButton, IonSegment, IonIcon, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, IonSegmentContent, IonSegmentView, CommonModule, FormsModule]
})
export class EventoPage implements OnInit {

  constructor() {
    addIcons({qrCodeOutline,settings,albums,grid,heart,ellipsisHorizontalOutline,addCircle,people,camera,ellipsisHorizontal});
  }

  ngOnInit() {
  }

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

  clic(){
    console.log('clic')
  }
}
