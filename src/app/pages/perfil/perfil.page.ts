import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonCard, IonAvatar, IonList, IonItem, IonSelectOption, IonSelect, IonLabel, IonChip, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cogOutline, createOutline } from 'ionicons/icons';
import { ServiciosService } from 'src/app/core/services/servicios.service';
import { UserInfoService } from 'src/app/core/services/user-info.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [IonIcon, IonButton, IonChip, IonLabel, IonItem, IonList, IonAvatar, IonCard, IonContent, CommonModule, FormsModule, IonSelect, IonSelectOption]
})
export class PerfilPage implements OnInit {

  private servicios = inject(ServiciosService);
  private userInfoService = inject(UserInfoService);

  user: any;

  isLoading = false;
  loading: boolean = false;

  constructor() {
    addIcons({ createOutline, cogOutline });
  }

  ngOnInit() {
    this.userInfoService.getUserData().subscribe(data => {
      this.user = data;
      this.isLoading = false;
    });
    this.userInfoService.getLoading().subscribe(isLoading => {
      this.loading = isLoading;
    });
  }

}
