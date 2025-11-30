import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonModal, IonTitle, IonToolbar, ModalController, IonList, IonDatetime, IonAccordion, IonAccordionGroup, IonLabel, IonToggle, IonSelectOption, IonTabButton } from '@ionic/angular/standalone';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/library';

@Component({
  selector: 'app-camscan-modal',
  templateUrl: './camscan-modal.component.html',
  styleUrls: ['./camscan-modal.component.scss'],
  imports: [IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, ZXingScannerModule]
})
export class CamscanModalComponent implements OnInit {

  allowedFormats = [BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.CODE_128, BarcodeFormat.DATA_MATRIX ];
  hasDevices = false;
  hasPermission = false;
  deviceSelected: MediaDeviceInfo | undefined

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() { }

  cerrar() {
    this.modalCtrl.dismiss();
  }

  onScanSuccess(result: string) {
    console.log('QR detectado:', result);

    this.modalCtrl.dismiss(result);
  }

  camarasEncontradas(devices: MediaDeviceInfo[]) {
    this.hasDevices = devices && devices.length > 0;

    if (this.hasDevices) {
      this.deviceSelected = devices[0];
    }

    console.log("Cámaras disponibles:", devices);
  }

  sinCamaras() {
    console.log("No hay cámaras disponibles");
    // Puedes mostrar un alert aquí
  }

}
