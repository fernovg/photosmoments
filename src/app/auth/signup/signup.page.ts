import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonInput, IonItem, IonBackButton, IonButtons, IonContent, IonHeader, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [IonButton, IonInput, IonItem, IonBackButton, IonButtons,IonButtons, IonContent, IonHeader, IonToolbar, CommonModule, FormsModule]
})
export class SignupPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
