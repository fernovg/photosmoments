import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonCol, IonRow, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonItem, IonIcon, IonLabel, IonChip, IonButton, ModalController, IonImg, IonCardSubtitle } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addCircle, calendar, camera, people, qrCode, qrCodeOutline, location } from 'ionicons/icons';
import { ServiciosService } from 'src/app/core/services/servicios.service';
import { UserInfoService } from 'src/app/core/services/user-info.service';
import { evento } from 'src/app/core/models/general.interface';
import { CrearEventoModalComponent } from 'src/app/shared/components/crear-evento-modal/crear-evento-modal.component';
import { LoaderComponent } from 'src/app/shared/components/loader/loader.component';
import { environment } from 'src/environments/environment';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.page.html',
  styleUrls: ['./eventos.page.scss'],
  standalone: true,
  imports: [IonButton, IonChip, IonLabel, IonIcon, IonItem, IonCardTitle, IonCardHeader, IonCardContent, IonCard, IonRow, IonCol, IonGrid, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, LoaderComponent, IonImg, IonCardSubtitle, RouterLink]
})
export class EventosPage implements OnInit {

  private modalCtrl = inject(ModalController);
  private servicios = inject(ServiciosService);
  private userInfoService = inject(UserInfoService);

  baseImgUrl = environment.img_url;
  placeholderCover = 'assets/evento.png';

  eventos: evento[] = [];

  isLoading = true;

  constructor() {
    addIcons({ addCircle, qrCodeOutline, calendar, location, people, camera, qrCode });
  }

  ngOnInit() {
    this.misEventos();
  }

  misEventos() {
    this.isLoading = true;
    this.servicios.traerDatos('events').subscribe({
      next: (eventos) => {
        this.eventos = eventos;
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
      }
    })
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

  getCoverImage(ev?: evento | null): string {
    if (!ev?.cover_image_path) return this.placeholderCover;
    const src = ev.cover_image_path;
    if (src.startsWith('http')) return src;
    return `${this.baseImgUrl}${src}`;
  }
}
