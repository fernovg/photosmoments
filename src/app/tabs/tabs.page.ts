import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonFab, IonFabButton, ModalController, IonAlert } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { home, people, book, person, camera } from 'ionicons/icons';
import { CamaraModalComponent } from '../shared/components/camara-modal/camara-modal.component';
import { PhotoService } from '../core/services/photo.service';
import { ServiciosService } from '../core/services/servicios.service';
import { evento } from '../core/models/general.interface';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  imports: [IonFabButton, IonFab, IonTabs, IonTabBar, IonTabButton, IonIcon, IonAlert],
})
export class TabsPage {

  private servicios = inject(ServiciosService);
  private modalCtrl = inject(ModalController);
  public photoService = inject(PhotoService);
  public environmentInjector = inject(EnvironmentInjector);

  eventos: evento[] = [];
  alertInputs: any[] = [];
  constructor() {
    addIcons({ home, people, book, person, camera });
  }

  ngOnInit() {
    this.misEventos();
  }

  misEventos() {
    this.servicios.traerDatos('events').subscribe({
      next: (eventos) => {
        this.eventos = eventos;
        // console.log(this.eventos);

        this.alertInputs = this.eventos.map((ev: any) => ({
          label: ev.name,        // nombre del evento
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
      const modal = await this.modalCtrl.create({
        component: CamaraModalComponent,
        componentProps: {
          photo: photo,
          eventoId: eventoSeleccionado.id,
          eventoNombre: eventoSeleccionado.name,
        },
        cssClass: 'modal-fullscreen'
      });
      await modal.present();
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

}