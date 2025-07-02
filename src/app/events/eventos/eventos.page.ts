import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonCol, IonRow, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonItem, IonIcon, IonLabel, IonChip, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addCircle, calendar, camera, people, qrCode, qrCodeOutline, location } from 'ionicons/icons';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.page.html',
  styleUrls: ['./eventos.page.scss'],
  standalone: true,
  imports: [IonButton, IonChip, IonLabel, IonIcon, IonItem, IonCardTitle, IonCardHeader, IonCardContent, IonCard, IonRow, IonCol, IonGrid, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class EventosPage implements OnInit {

  constructor() {
    addIcons({ addCircle, qrCodeOutline, calendar, location, people, camera, qrCode });
  }
  
  ngOnInit() {
  }

}
