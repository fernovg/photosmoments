import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonCard, IonAvatar, IonList, IonItem, IonSelectOption, IonSelect, IonLabel, IonChip, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cogOutline, createOutline } from 'ionicons/icons';
import { ServiciosService } from 'src/app/core/services/servicios.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [IonIcon, IonButton, IonChip, IonLabel, IonItem, IonList, IonAvatar, IonCard, IonContent, CommonModule, FormsModule, IonSelect, IonSelectOption]
})
export class PerfilPage implements OnInit {

  private infoSerivice = inject(ServiciosService);
  
  isLoading = false;

  data: any;
  
  constructor() { 
    addIcons({createOutline,cogOutline});
  }

  ngOnInit() {
    this.miInfo();
  }

  miInfo(){
    this.isLoading = true;
    this.infoSerivice.traerDatos('profile').subscribe(resp => {
      this.data = resp;
      this.isLoading = false;
      console.log(this.data);
    })
  }

}
