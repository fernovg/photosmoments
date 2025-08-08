import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.page.html',
  styleUrls: ['./bienvenida.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BienvenidaPage implements OnInit {

  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() { }

  ngOnInit() {
    this.isLoggedIn();
    this.authService.headers();
  }

  finalizar() {
    console.log('Tutorial finalizado');
    // redireccionar a login o tabs
  }

  // si el usuario esta logeado lo manda a inicio
  isLoggedIn() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['tabs/inicio'])
    }
  }

}
