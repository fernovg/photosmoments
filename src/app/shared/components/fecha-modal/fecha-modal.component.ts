import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { IonContent, IonDatetime, IonButton, ModalController } from "@ionic/angular/standalone";

@Component({
  selector: 'app-fecha-modal',
  templateUrl: './fecha-modal.component.html',
  styleUrls: ['./fecha-modal.component.scss'],
  imports: [IonContent, IonDatetime, IonButton],
})
export class FechaModalComponent implements OnInit {

  @ViewChild(IonDatetime) datetime?: IonDatetime;

  fecha: string = '';
  hoy: string = new Date().toISOString();
  private modalCtrl = inject(ModalController);

  constructor() { }

  ngOnInit() { }

  seleccionar(ev: any) {
    console.log("fecha seleccionada:", ev.detail);
    this.fecha = ev.detail.value;
  }

  cerrar() {
    const valor = this.fecha || this.datetime?.value || this.hoy;
    this.modalCtrl.dismiss(valor);
  }


}
