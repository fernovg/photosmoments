import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonButton, IonIcon,
  IonChip, IonLabel, IonItem, ModalController, IonAlert, IonImg
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
import { Router, RouterLinkActive } from '@angular/router';
import { timestamp } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonLabel, IonChip, IonButton, IonContent, IonCard,
    IonCardContent, IonCardHeader, IonCardTitle, CommonModule, FormsModule, LoaderComponent, RouterLinkActive, IonImg, IonCardSubtitle, IonItem],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePage implements OnInit {

  private modalCtrl = inject(ModalController);
  private servicios = inject(ServiciosService);
  private userInfoService = inject(UserInfoService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  baseImgUrl = environment.img_url;
  placeholderCover = 'assets/evento.png';

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

  ionViewWillEnter() {
    this.misEventos();
  }

  hasActiveEvent(): boolean {
    let eventsLength = this.eventos.filter(e => !e.is_guest).length
    return (eventsLength >= 1);
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
    // console.log('Apunte con la cámara al código QR del evento al que desea unirse.');

    const modal = await this.modalCtrl.create({
      component: CamscanModalComponent,
      backdropDismiss: false,
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();

    if (data) {
      const decoded = decodeURIComponent(data);
      const userId = this.user.id;

      // Caso URL directa tipo https://photosmoments.vercel.app/invitar/1
      const inviteMatch = decoded.match(/\/invitar\/(\d+)/);
      if (inviteMatch) {
        const inviteId = Number(inviteMatch[1]);
        if (inviteId && !isNaN(inviteId)) {
          // this.router.navigate(['/invitar', inviteId], { replaceUrl: true });
          //  return;
          const payload = {
            event_id: inviteId,
            guest_id: userId,
          };
          this.uniseAEvento(payload);
        }
      } else {
        this.toastService.error('Código QR inválido');
        return;
      }

      // Caso payload con pipes http://...|eventId|...
      //const partes = decoded.split('|').filter(Boolean);
      //const eventId = Number(partes[1] || partes[0]);
      //
      //if (!eventId || isNaN(eventId)) {
      //  this.toastService.error('Código QR inválido');
      //  return;
      //}


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
      // this.ngOnInit();
      this.ionViewWillEnter();
      // console.log(data, 'evento creado');
    }
  }

  abrirEvento(evento: evento) {
    this.router.navigate(['tabs/evento/' + evento.id]);
  }
  uniseAEvento(payload: any) {
    this.isLoading = true;
    // alert(JSON.stringify(payload, null, 2));
    this.servicios.guardarDatos('events/guests', payload).subscribe({
      next: (data) => {
        this.isLoading = false;
        this.toastService.success('Unido Correctamente');
        this.router.navigate(['tabs/evento/' + payload.event_id]);
      },
      error: (error) => {
        this.isLoading = false;
        // alert(error);
        this.toastService.error('Error al unirse al evento');
      }
    })

  }

  getCoverImage(ev?: evento | null): string {
    if (!ev?.cover_image_path) return this.placeholderCover;
    const src = ev.cover_image_path;
    if (src.startsWith('http')) return src;
    return `${this.baseImgUrl}${src}`;
  }

  // this.modalCtrl.dismiss({ deleted: true, eventId: this.evento.id });



}
