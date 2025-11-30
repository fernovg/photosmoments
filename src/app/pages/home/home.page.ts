import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonButton, IonIcon,
  IonChip, IonLabel, IonItem, ModalController
} from '@ionic/angular/standalone';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { addIcons } from 'ionicons';
import { addCircle, calendar, camera, location, people, qrCode, qrCodeOutline } from 'ionicons/icons';
import { CrearEventoModalComponent } from 'src/app/shared/components/crear-evento-modal/crear-evento-modal.component';
import { ServiciosService } from 'src/app/core/services/servicios.service';
import { evento } from 'src/app/core/models/general.interface';
import { UserInfoService } from 'src/app/core/services/user-info.service';
import { LoaderComponent } from 'src/app/shared/components/loader/loader.component';
import { CamscanModalComponent } from 'src/app/shared/components/camscan-modal/camscan-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonItem, IonLabel, IonChip, IonIcon, IonButton, IonContent, IonCard,
    IonCardContent, IonCardHeader, IonCardTitle, CommonModule, FormsModule, LoaderComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePage implements OnInit {

  private modalCtrl = inject(ModalController);
  private servicios = inject(ServiciosService);
  private userInfoService = inject(UserInfoService);

  eventos: evento[] = [];
  eventoProximo: evento | null = null;

  user: any;

  isLoading = true;

  constructor() {
    addIcons({ addCircle, qrCodeOutline, calendar, location, people, camera, qrCode });
  }

  ngOnInit() {
    this.isLoading = true;
    this.misEventos();
    this.userInfoService.getUserData().subscribe(data => {
      this.user = data;
      // this.isLoading = false;
    });
    this.userInfoService.getLoading().subscribe(isLoading => {
      // this.isLoading = isLoading;
    });
  }

  misEventos() {
    this.isLoading = true;
    this.servicios.traerDatos('events').subscribe({
      next: (eventos) => {
        this.isLoading = false;
        this.eventos = eventos;
        this.eventoProximo = this.prximoEvento();
      },
      error: (error) => {
        this.isLoading = false;
        console.log(error);
      }
    })
  }

  prximoEvento() {
    const hoy = new Date();
    const eventosValidos = this.eventos?.filter(e => {
      return e.event_date && !isNaN(new Date(e.event_date).getTime()) && new Date(e.event_date) >= hoy;
    });

    if (!eventosValidos || eventosValidos.length === 0) return null;

    return eventosValidos.reduce((prev, curr) => {
      const fechaPrev = new Date(prev.event_date!);
      const fechaCurr = new Date(curr.event_date!);
      return fechaPrev < fechaCurr ? prev : curr;
    });
  }

  async abrirScanner() {
    const modal = await this.modalCtrl.create({
      component: CamscanModalComponent,
      backdropDismiss: false,
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();

    if (data) {
      console.log("QR leído:", data);
      alert(data);
      // this.unirseAEvento(res.data);
      
    }


  }


  async abrirCrearEvento() {
    const modal = await this.modalCtrl.create({
      component: CrearEventoModalComponent,
      cssClass: 'modal-fullscreen',
      showBackdrop: true
    });
    await modal.present();

    const { data, role } = await modal.onDidDismiss();
    if (role === 'confirm') {
      this.ngOnInit();
      // console.log(data, 'evento creado');
    }
  }

}
