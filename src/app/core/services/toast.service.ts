import { inject, Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastController = inject(ToastController);

  async presentToast(message: string, duration: number = 2000, color: string = 'primary') {
    const toast = await this.toastController.create({
      message,
      duration,
      color,
      position: 'bottom',
    });
    toast.present();
  }

  async success(message: string) {
    this.presentToast(message, 2000, 'success');
  }

  async error(message: string) {
    this.presentToast(message, 3000, 'danger');
  }

  async warning(message: string) {
    this.presentToast(message, 3000, 'warning');
  }

  async info(message: string) {
    this.presentToast(message, 2500, 'medium');
  }
  
}
