import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonText, IonButton, IonImg } from '@ionic/angular/standalone';
import { ServiciosService } from 'src/app/core/services/servicios.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ModalController } from '@ionic/angular';
import { LoginPage } from 'src/app/auth/login/login.page';
import { SignupPage } from 'src/app/auth/signup/signup.page';
import { FormsModule } from '@angular/forms';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.page.html',
  styleUrls: ['./invite.page.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonText, IonButton, IonImg],
  providers: [ModalController],
})
export class InvitePage implements OnInit {
  eventId: string | null = null;
  eventNotFound = false;
  event: any = null;
  baseImgUrl = environment.img_url;
  placeholderCover = 'assets/evento.png';
  private servicios = inject(ServiciosService);
  private modalCtrl = inject(ModalController);
  private toastService = inject(ToastService);
  constructor(private route: ActivatedRoute, private router: Router) { }
  isLoading = true;
  ngOnInit() {
    this.eventId = this.route.snapshot.paramMap.get('id');
    this.servicios.traerDatosId('eventsinvite', this.eventId || "").subscribe({
      next: (data) => {
        this.event = data;
        this.eventNotFound = false;
        this.isLoading = false;
      },
      error: (error) => {
        // console.log(error);
        this.isLoading = false;
        this.eventNotFound = true;
      }
    })
  }
  redirect() {
    this.router.navigate(['/signin'], { replaceUrl: true });
  }

  getCoverImage(): string {
    const src = this.event?.cover_image_path;
    if (!src) return this.placeholderCover;
    if (src.startsWith('http')) return src;
    return `${this.baseImgUrl}${src}`;
  }

  async openLoginModal() {
    const modal = await this.modalCtrl.create({
      component: LoginPage,
      componentProps: { isInvite: true },
      cssClass: 'modal-70',
      showBackdrop: true,
    });
    await modal.present();
    modal.onDidDismiss().then((data) => {
      console.log(data);
      if (data.role === 'login-success') {
        const payload = {
          event_id: this.eventId,
          guest_id: data.data.loggedIn.id,
        };
        this.isLoading = true;
        // alert(JSON.stringify(payload, null, 2));
        this.servicios.guardarDatos('events/guests', payload).subscribe({
          next: (data) => {
            this.isLoading = false;
           
            this.router.navigate([`/tabs/evento/${this.eventId}`], { replaceUrl: true });
          },
          error: (error) => {
            this.isLoading = false;
            console.log(error);
           if(error.error.message == 'Guest already invited'){
            this.toastService.warning('Ya estás invitado a este evento');
            this.router.navigate([`/tabs/evento/${this.eventId}`], { replaceUrl: true });
           }
           if(error.error.message == 'El organizador no puede ser invitado'){
            this.toastService.error(error.error.message);
           }
          }
        })
      }
    });
  }

  async openSignupModal() {
    const modal = await this.modalCtrl.create({
      component: SignupPage,
      componentProps: { isInvite: true },
      cssClass: 'modal-70',
      showBackdrop: true,
    });
    await modal.present();
    modal.onDidDismiss().then((data) => {
      console.log(data);
      if (data.role === 'register-success') {
        const payload = {
          event_id: this.eventId,
          guest_id: data.data.registered.id,
        };
        this.isLoading = true;
        // alert(JSON.stringify(payload, null, 2));
        this.servicios.guardarDatos('events/guests', payload).subscribe({
          next: (data) => {
            this.isLoading = false;
           
            this.router.navigate([`/tabs/evento/${this.eventId}`], { replaceUrl: true });
          },
          error: (error) => {
            this.isLoading = false;
            console.log(error);
           if(error.error.message == 'Guest already invited'){
            this.toastService.warning('Ya estás invitado a este evento');
            this.router.navigate([`/tabs/evento/${this.eventId}`], { replaceUrl: true });
           }
           if(error.error.message == 'El organizador no puede ser invitado'){
            this.toastService.error(error.error.message);
           }
          }
        })
      }
    });
  }
}
