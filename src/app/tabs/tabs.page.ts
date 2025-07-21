import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonFab, IonFabButton, ModalController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { home, people, book, person, camera } from 'ionicons/icons';
import { CamaraModalComponent } from '../shared/components/camara-modal/camara-modal.component';
import { PhotoService } from '../core/services/photo.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  imports: [IonFabButton, IonFab, IonTabs, IonTabBar, IonTabButton, IonIcon],
})
export class TabsPage {

  private modalCtrl = inject(ModalController);
  public  photoService = inject(PhotoService);
  public environmentInjector = inject(EnvironmentInjector);

  constructor() {
    addIcons({ home, people, book, person, camera });
  }

  async abrirCamara() {
    const photo = await this.photoService.addNewToGallery();
    if (photo) {
      const modal = await this.modalCtrl.create({
        component: CamaraModalComponent,
        componentProps: {
          photo: photo
        },
        cssClass: 'modal-fullscreen'
      });
      await modal.present();
    }
  }

  // addPhotoToGallery() {
  //   this.photoService.addNewToGallery();
  // }

}