import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonFab, IonFabButton, ModalController, IonAlert } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { home, people, book, person, camera } from 'ionicons/icons';
import { CamaraModalComponent } from '../shared/components/camara-modal/camara-modal.component';
import { PhotoService } from '../core/services/photo.service';
import { ServiciosService } from '../core/services/servicios.service';
import { evento } from '../core/models/general.interface';
import { Router } from '@angular/router';
import { UserInfoService } from '../core/services/user-info.service';
import { ModalService } from '../core/services/modal.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  imports: [IonFabButton, IonFab, IonTabs, IonTabBar, IonTabButton, IonIcon, IonAlert],
})
export class TabsPage {
  private userInfoService = inject(UserInfoService);
  private servicios = inject(ServiciosService);
  private modalCtrl = inject(ModalController);
  public photoService = inject(PhotoService);
  private router = inject(Router);
  public environmentInjector = inject(EnvironmentInjector);
  private modalService = inject(ModalService);

  eventos: evento[] = [];
  alertInputsCam: any[] = [];
  constructor() {
    addIcons({ home, people, book, person, camera });
  }

  ngOnInit() {
    this.misEventos();
    this.userInfoService.cargarInfo();
  }

  ionViewWillEnter() {
    this.misEventos();
  }

  misEventos() {
    this.servicios.traerDatos('events').subscribe({
      next: (eventos) => {
        this.eventos = eventos;
        this.alertInputsCam = this.eventos.map((ev: any) => ({
          label: ev.name,
          type: 'radio',
          value: {
            id: ev.id,
            name: ev.name,
          },
        }));
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  async abrirCamara(eventoSeleccionado: any) {
    const photo = await this.photoService.addNewToGallery();
    if (photo) {
      // const modal = await this.modalCtrl.create({
      //   component: CamaraModalComponent,
      //   componentProps: {
      //     photo: photo,
      //     eventoId: eventoSeleccionado.id,
      //     eventoNombre: eventoSeleccionado.name,
      //   },
      //   cssClass: 'modal-fullscreen'
      // });
      // await modal.present();
      // const { role, data } = await modal.onWillDismiss();
      const { role, data } = await this.modalService.modalCamara(photo, eventoSeleccionado);

      if (role === 'confirm') {
        this.recargarEvento(eventoSeleccionado.id);
      }
    }
  }

  async manejarBotonCamara() {
    await this.misEventos();
    const rutaActual = this.router.url;
    // console.log('rutaActual', rutaActual);

    if (rutaActual.startsWith('/tabs/evento/')) {
      const partes = rutaActual.split('/');
      const eventoId = partes[partes.length - 1];
      // console.log('Evento ID desde URL:', eventoId);

      const evento = this.eventos.find((ev: any) => ev.id == eventoId);
      // console.log('Evento encontrado:', evento);

      if (evento) {
        this.abrirCamara(evento);
      } else {
        console.warn('Evento no encontrado');
      }

    } else {
      const alert = document.querySelector('#alert-tabs') as any;
      // const alert = document.querySelector('ion-alert');
      // (alert as any).present();
      alert.present();
    }
  }

  public alertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
    },
    {
      text: 'Seleccionar',
      handler: (data: any) => {
        if (data) {
          // console.log('Evento seleccionado:', data);
          this.abrirCamara(data);
        }
      },
    },
  ];

  recargarEvento(eventoId: string) {
    const url = `/tabs/evento/${eventoId}`;

    // Navega a una ruta "vacía" y luego regresa
    this.router.navigateByUrl('/tabs/inicio', { skipLocationChange: true }).then(() => {
      this.router.navigate([url]);
    });
  }
}