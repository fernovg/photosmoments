import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonButton, IonIcon,
  IonChip, IonLabel, IonItem, ModalController, IonAlert
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
import { ToastService } from 'src/app/core/services/toast.service';
import { Router } from '@angular/router';
import { timestamp } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonItem, IonLabel, IonChip, IonIcon, IonButton, IonContent, IonCard,
    IonCardContent, IonCardHeader, IonCardTitle, CommonModule, FormsModule, LoaderComponent, IonAlert],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePage implements OnInit {

  private modalCtrl = inject(ModalController);
  private servicios = inject(ServiciosService);
  private userInfoService = inject(UserInfoService);
  private toastService = inject(ToastService);
  private router = inject(Router);

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
      // console.log("QR leído:", data);
      const partes = data.split('|');
      const eventId = Number(partes[0]);
      const userId = Number(partes[1]);

      if (partes.length >= 2) {
        const payload = {
          event_id: eventId,
          user_id: userId,
        };
        this.uniseAEvento(payload);
        // console.log("Payload listo:", payload);
        // alert(JSON.stringify(payload, null, 2));
      }
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

  public alertButtonsEvento = [
    {
      text: 'OK',
      handler: (data: any) => {
        const codigo = Number(data.codigo);
        this.uniseAEvento(codigo);
      }
    }
  ];
  public alertInputsEvento = [
    {
      name: 'codigo',
      type: 'number',
      inputmode: 'numeric',
      placeholder: 'Codigo Del Evento',
      min: 1,
      max: 10,
    }
  ];

  uniseAEvento(payload: any) {
    this.isLoading = true;
    this.servicios.guardarDatos('events/guests', payload).subscribe({
      next: (data) => {
        this.isLoading = false;
        this.toastService.success('Unido Correctamente');
        this.router.navigate(['tabs/evento/' + data.id]);
      },
      error: (error) => {
        this.isLoading = false;
        this.toastService.error('Error al unirse al evento');
      }
    })

  }
}
