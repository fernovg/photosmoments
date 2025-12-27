import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonSegment, IonSegmentButton, IonSegmentContent, IonSegmentView, IonCard, IonCardHeader, IonCardTitle, ModalController, IonAvatar, IonItem, IonGrid, IonRow, IonCol, IonList, IonLabel, IonModal, IonButtons, IonBackButton, IonCardContent, IonCardSubtitle, IonItemSliding, IonItemOptions, IonItemOption, IonNote, IonChip, IonImg } from '@ionic/angular/standalone';

// import {  } from '@ionic/angular';
import { GaleriaModalComponent } from 'src/app/shared/components/galeria-modal/galeria-modal.component';
import { ServiciosService } from 'src/app/core/services/servicios.service';
import { evento, eventoPhoto, guests } from 'src/app/core/models/general.interface';
import { ActivatedRoute } from '@angular/router';
import { EditarEventoModalComponent } from 'src/app/shared/components/editar-evento-modal/editar-evento-modal.component';
import { environment } from 'src/environments/environment';
import { LoaderComponent } from 'src/app/shared/components/loader/loader.component';
import { UserInfoService } from 'src/app/core/services/user-info.service';
import { ModalService } from 'src/app/core/services/modal.service';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.page.html',
  styleUrls: ['./evento.page.scss'],
  standalone: true,
  imports: [IonModal, IonLabel, IonItem, IonAvatar, IonList, IonCol, IonRow, IonGrid, IonCardTitle, IonCardHeader, IonCard, IonSegmentButton, IonSegment, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, IonSegmentContent, IonSegmentView, CommonModule, FormsModule, LoaderComponent, IonButtons, IonBackButton, IonCardContent, IonCardSubtitle, IonItemSliding, IonItemOptions, IonItemOption, IonNote, IonChip, IonImg]
})
export class EventoPage implements OnInit {

  private modalCtrl = inject(ModalController);
  private servicios = inject(ServiciosService);
  // private route = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private userInfoService = inject(UserInfoService);
  private modalService = inject(ModalService);
  
  baseUrl = environment.img_url;
  placeholderCover = 'assets/evento.png';
  user: any;

  constructor() {}

  evento: evento | null = null;
  eventoId: string | null = null;

  eventos: evento[] = [];
  guests: guests[] = [];
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
          this.traerInvitados(id);
          // console.log(this.evento);
          this.isLoading = false;
        },
        error: (error) => {
          // console.log(error);
          this.isLoading = false;
        }
      })
    });
    this.userInfoService.getUserData().subscribe(data => {
      this.user = data;
      // this.isLoading = false;
    });
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
        // console.log(error);
      }
    })
  }

  traerInvitados(id:string){
    const path = 'guests';
    const path1 = 'events';
    this.servicios.traerGuest(path, id, path1).subscribe({
      next: (data: any[]) => {
        this.guests = data;
        // console.log(this.guests);
      },
      error: (error) => {
        // console.log(error);
      }
    })
  }

  async abrirGaleria(index: number) {
    // const modal = await this.modalCtrl.create({
    //   component: GaleriaModalComponent,
    //   componentProps: {
    //     imagenes: this.eventoPhoto,
    //     slideIndex: index
    //   },
    //   cssClass: 'modal-fullscreen',
    //   showBackdrop: true
    // });
    // await modal.present();
    const { data } = await this.modalService.modalGaleria(this.eventoPhoto, index);
  }

  async abrirEditarEvento(evento: any) {
    // const modal = await this.modalCtrl.create({
    //   component: EditarEventoModalComponent,
    //   componentProps: {
    //     evento
    //   },
    //   cssClass: 'modal-fullscreen',
    //   showBackdrop: true
    // });
    // await modal.present();
    // const { data, role } = await modal.onDidDismiss();

    const { role } = await this.modalService.modalEditarEvento(evento);

    if (role === 'confirm') {
      this.ngOnInit();
      // console.log(data, 'evento actualizado');
    }
  }

  getCoverImage(ev?: evento | null): string {
    if (!ev?.cover_image_path) return this.placeholderCover;
    const src = ev.cover_image_path;
    if (src.startsWith('http')) return src;
    return `${this.baseUrl}${src}`;
  }

}