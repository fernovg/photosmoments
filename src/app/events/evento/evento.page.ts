import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonActionSheet, IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon, IonSegment, IonSegmentButton, IonSegmentContent, IonSegmentView, IonCard, IonCardHeader, IonCardTitle, ModalController, IonAvatar, IonItem, IonGrid, IonRow, IonCol, IonList, IonLabel, IonModal, IonSearchbar, IonImg } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addCircle, albums, camera, ellipsisHorizontal, grid, heart, people, qrCodeOutline, settings, ellipsisHorizontalOutline } from 'ionicons/icons';
// import {  } from '@ionic/angular';
import { GaleriaModalComponent } from 'src/app/shared/components/galeria-modal/galeria-modal.component';
import { CrearEventoModalComponent } from 'src/app/shared/components/crear-evento-modal/crear-evento-modal.component';
import { ServiciosService } from 'src/app/core/services/servicios.service';
import { evento, eventoPhoto } from 'src/app/core/models/general.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { EditarEventoModalComponent } from 'src/app/shared/components/editar-evento-modal/editar-evento-modal.component';
import { environment } from 'src/environments/environment';
import { LoaderComponent } from 'src/app/shared/components/loader/loader.component';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.page.html',
  styleUrls: ['./evento.page.scss'],
  standalone: true,
  imports: [IonModal, IonLabel, IonItem, IonAvatar, IonList, IonCol, IonRow, IonGrid, IonActionSheet, IonCardTitle, IonCardHeader, IonCard, IonSegmentButton, IonSegment, IonIcon, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, IonSegmentContent, IonSegmentView, CommonModule, FormsModule, LoaderComponent]
})
export class EventoPage implements OnInit {

  private modalCtrl = inject(ModalController);
  private servicios = inject(ServiciosService);
  // private route = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  baseUrl = environment.img_url;

  constructor() {
    addIcons({ qrCodeOutline, settings, albums, grid, heart, ellipsisHorizontalOutline, addCircle, people, camera, ellipsisHorizontal });
  }

  evento: evento | null = null;
  eventoId: string | null = null;

  eventos: evento[] = [];
  eventoPhoto: eventoPhoto[] = [];

  isLoading = true;

  async ngOnInit() {
    this.isLoading = true;
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      const path = 'events';
      this.servicios.traerDatosId(path, id).subscribe({
        next: (data) => {
          this.evento = data;
          this.traerFotos(id);
          // console.log(this.evento);
          this.isLoading = false;
        },
        error: (error) => {
          console.log(error);
          this.isLoading = false;
        }
      })
    })
  }

  traerFotos(id: string) {
    const path = 'guest-photos';
    this.servicios.traerDatosId(path, id).subscribe({
      next: (data: any[]) => {
        // this.eventoPhoto = data;
        this.eventoPhoto = data.sort((a, b) => {
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  //* Action Sheet
  // isActionSheetOpen = false;

  // public actionSheetButtons = [
  //   {
  //     text: 'Guardar',
  //     data: {
  //       action: 'save',
  //     },
  //   },
  //   {
  //     text: 'Borrar',
  //     role: 'destructive',
  //     data: {
  //       action: 'delete',
  //     },
  //   },
  //   // {
  //   //   text: 'Compartir',
  //   //   data: {
  //   //     action: 'share',
  //   //   },
  //   // },
  //   {
  //     text: 'Cancelar',
  //     role: 'cancel',
  //     data: {
  //       action: 'cancel',
  //     },
  //   },
  // ]

  // setOpen(isOpen: boolean) {
  //   this.isActionSheetOpen = isOpen;
  // }

  async abrirGaleria(index: number) {
    const modal = await this.modalCtrl.create({
      component: GaleriaModalComponent,
      componentProps: {
        imagenes: this.eventoPhoto,
        slideIndex: index
      },
      cssClass: 'modal-fullscreen',
      showBackdrop: true
    });
    await modal.present();
  }

  async abrirEditarEvento(evento: any) {
    const modal = await this.modalCtrl.create({
      component: EditarEventoModalComponent,
      componentProps: {
        evento
      },
      cssClass: 'modal-fullscreen',
      showBackdrop: true
    });
    await modal.present();

    //para capturar la respuesta al cerrar
    const { data, role } = await modal.onDidDismiss();
    if (role === 'confirm') {
      this.ngOnInit();
      // console.log(data, 'evento actualizado');
    }
  }



}
