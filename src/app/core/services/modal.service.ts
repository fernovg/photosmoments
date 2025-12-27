import { Injectable } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular/standalone';
import { CamaraModalComponent } from 'src/app/shared/components/camara-modal/camara-modal.component';
import { CamscanModalComponent } from 'src/app/shared/components/camscan-modal/camscan-modal.component';
import { CrearEventoModalComponent } from 'src/app/shared/components/crear-evento-modal/crear-evento-modal.component';
import { EditarEventoModalComponent } from 'src/app/shared/components/editar-evento-modal/editar-evento-modal.component';
import { GaleriaModalComponent } from 'src/app/shared/components/galeria-modal/galeria-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    private modalCtrl: ModalController
  ) { }

  async modalCrearEvento() {
    const modal = await this.modalCtrl.create({
      component: CrearEventoModalComponent,
      cssClass: 'modal-fullscreen',
      showBackdrop: true
    });

    await modal.present();
    return modal.onDidDismiss();
  }

  async modalScanner() {
    const modal = await this.modalCtrl.create({
      component: CamscanModalComponent,
      backdropDismiss: false,
    });
    await modal.present();
    return modal.onWillDismiss();
  }

  async modalCamara(photo: any, evento: any) {
    const modal = await this.modalCtrl.create({
      component: CamaraModalComponent,
      componentProps: {
        photo: photo,
        eventoId: evento.id,
        eventoNombre: evento.name,
      },
      cssClass: 'modal-fullscreen'
    });
    await modal.present();
    return modal.onWillDismiss();
  }

  async modalGaleria(imagenes: any[], index: number) {
    const modal = await this.modalCtrl.create({
      component: GaleriaModalComponent,
      componentProps: {
        imagenes: imagenes,
        slideIndex: index
      },
      cssClass: 'modal-fullscreen',
      showBackdrop: true
    });
    await modal.present();
    return modal.onDidDismiss();
  }

  async modalEditarEvento(evento: any) {
    const modal = await this.modalCtrl.create({
      component: EditarEventoModalComponent,
      componentProps: {
        evento
      },
      cssClass: 'modal-fullscreen',
      showBackdrop: true
    });
    await modal.present();
    return modal.onDidDismiss();
  }



}
