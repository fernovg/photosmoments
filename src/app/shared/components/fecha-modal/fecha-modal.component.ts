import { Component, inject, OnInit } from '@angular/core';
import { IonContent, IonDatetime, IonButton, ModalController } from "@ionic/angular/standalone";

@Component({
  selector: 'app-fecha-modal',
  templateUrl: './fecha-modal.component.html',
  styleUrls: ['./fecha-modal.component.scss'],
  imports: [IonContent, IonDatetime, IonButton],
})
export class FechaModalComponent implements OnInit {

  fecha: any;
  private modalCtrl = inject(ModalController);

  constructor() { }

  ngOnInit() { }

  seleccionar(ev: any) {
    this.fecha = ev.detail.value;
  }

  cerrar() {
    this.modalCtrl.dismiss(this.fecha);
  }


}
