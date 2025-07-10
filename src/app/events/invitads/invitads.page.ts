import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton, IonIcon, IonActionSheet, IonItemSliding, IonAvatar, IonItemOption, IonList, IonItem, IonItemOptions, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, pin, share, trash } from 'ionicons/icons';

@Component({
  selector: 'app-invitads',
  templateUrl: './invitads.page.html',
  styleUrls: ['./invitads.page.scss'],
  standalone: true,
  imports: [IonLabel, IonItemOptions, IonItem, IonList, IonItemOption, IonAvatar, IonItemSliding, IonIcon, IonButton, IonContent, CommonModule, FormsModule, IonActionSheet]
})
export class InvitadsPage implements OnInit {

  constructor() {
    addIcons({add,pin,share,trash});
  }

  ngOnInit() {
  }

  public actionSheetButtons = [
    {
      text: 'Nombre',
      // role: 'destructive'
    },
    {
      text: 'Fotos'
    },
    {
      text: 'Cancel',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    },
  ];

}
