import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonToolbar, IonItem, IonInput, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonButton, IonInput, IonItem, IonBackButton, IonButtons, IonContent, IonHeader, IonToolbar, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
