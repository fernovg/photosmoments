import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonButton, IonIcon, 
          IonChip, IonLabel, IonItem } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { addIcons } from 'ionicons';
import { addCircle, calendar, camera, location, people, qrCode, qrCodeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonItem, IonLabel, IonChip, IonIcon, IonButton, IonContent, IonCard, 
            IonCardContent, IonCardHeader, IonCardTitle, CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePage implements OnInit {

  constructor() {
    addIcons({addCircle,qrCodeOutline,calendar,location,people,camera,qrCode});
  }

  ngOnInit() {
  }

}
