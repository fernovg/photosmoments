import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonModal, IonTitle, IonToolbar, ModalController, IonList, IonDatetime, IonAccordion, IonAccordionGroup, IonLabel, IonToggle, IonSelectOption, IonTabButton } from '@ionic/angular/standalone';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@Component({
  selector: 'app-camscan-modal',
  templateUrl: './camscan-modal.component.html',
  styleUrls: ['./camscan-modal.component.scss'],
  imports: [IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, ZXingScannerModule]
})
export class CamscanModalComponent implements OnInit {

  availableDevices: MediaDeviceInfo[] = [];
  currentDevice: MediaDeviceInfo | undefined;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    this.getDevices();
  }

  cerrar() {
    this.modalCtrl.dismiss();
  }

  async getDevices() {
    this.availableDevices = await navigator.mediaDevices.enumerateDevices();
    this.currentDevice = this.availableDevices.find(d => d.kind === 'videoinput');
  }

  onScanSuccess(result: string) {
    console.log('QR detectado:', result);
    this.modalCtrl.dismiss(result);
  }

}
