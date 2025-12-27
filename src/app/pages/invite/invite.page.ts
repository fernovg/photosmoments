import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonText, IonButton, IonImg } from '@ionic/angular/standalone';
import { ServiciosService } from 'src/app/core/services/servicios.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.page.html',
  styleUrls: ['./invite.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonText, IonButton, IonImg],
})
export class InvitePage implements OnInit {
  eventId: string | null = null;
  eventNotFound = false;
  event: any = null;
  baseImgUrl = environment.img_url;
  placeholderCover = 'assets/evento.png';
  private servicios = inject(ServiciosService);
  constructor(private route: ActivatedRoute, private router: Router) {}
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
  redirect(){
    this.router.navigate(['/signin'], {replaceUrl: true});
  }

  getCoverImage(): string {
    const src = this.event?.cover_image_path;
    if (!src) return this.placeholderCover;
    if (src.startsWith('http')) return src;
    return `${this.baseImgUrl}${src}`;
  }
}
