import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonButton, IonIcon,
  IonChip, IonLabel, IonItem, ModalController
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { addIcons } from 'ionicons';
import { addCircle, calendar, camera, location, people, qrCode, qrCodeOutline } from 'ionicons/icons';
import { CrearEventoModalComponent } from 'src/app/shared/components/crear-evento-modal/crear-evento-modal.component';
import { ServiciosService } from 'src/app/core/services/servicios.service';
import { evento } from 'src/app/core/models/general.interface';

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

  private modalCtrl = inject(ModalController);
  private servicios = inject(ServiciosService);

  data: evento[] = [];
  eventoProximo: evento | null = null;

  isLoading = false;

  constructor() {
    addIcons({ addCircle, qrCodeOutline, calendar, location, people, camera, qrCode });
  }

  ngOnInit() {
    this.misEventos();
  }

  misEventos() {
    this.isLoading = true;
    this.servicios.traerDatos('events').subscribe({
      next: (data) => {
        this.isLoading = false;
        this.data = data;
        this.eventoProximo = this.prximoEvento();
        // console.log(data);
      },
      error: (error) => {
        this.isLoading = false;
        // console.log(error);
      }
    })
  }

  prximoEvento() {
    const hoy = new Date();
    const eventosValidos = this.data?.filter(e => {
      return e.event_date && !isNaN(new Date(e.event_date).getTime()) && new Date(e.event_date) >= hoy;
    });

    if (!eventosValidos || eventosValidos.length === 0) return null;

    return eventosValidos.reduce((prev, curr) => {
      const fechaPrev = new Date(prev.event_date!);
      const fechaCurr = new Date(curr.event_date!);
      return fechaPrev < fechaCurr ? prev : curr;
    });
  }




  async abrirCrearEvento() {
    const modal = await this.modalCtrl.create({
      component: CrearEventoModalComponent,
      cssClass: 'modal-fullscreen',
      showBackdrop: true
    });
    await modal.present();
  }
}
