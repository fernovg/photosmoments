import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonText, IonButton } from '@ionic/angular/standalone';
import { ServiciosService } from 'src/app/core/services/servicios.service';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.page.html',
  styleUrls: ['./invite.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonText, IonButton],
})
export class InvitePage implements OnInit {
  eventId: string | null = null;
  private servicios = inject(ServiciosService);
  constructor(private route: ActivatedRoute) {}
 isLoading = true;
  ngOnInit() {
    this.eventId = this.route.snapshot.paramMap.get('id');
     this.servicios.traerDatosId('events', this.eventId || "").subscribe({
        next: (data) => {
          
          console.log('evento');
         
          // console.log(this.evento);
          this.isLoading = false;
        },
        error: (error) => {
          // console.log(error);
          this.isLoading = false;
        }
      })
  }
}
