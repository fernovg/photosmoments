import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonToolbar, IonItem, IonInput, IonButton, IonProgressBar, IonIcon } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { ValidatorsForm } from 'src/app/core/services/validator.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { addIcons } from 'ionicons';
import { eye, eyeOff, logoGoogle } from 'ionicons/icons';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [IonButton, IonInput, IonItem, IonBackButton, ReactiveFormsModule, IonButtons, IonButtons, IonContent, IonHeader, IonToolbar, CommonModule, FormsModule]
})
export class SignupPage implements OnInit {

  private formBuilder = inject(FormBuilder);
  private valiService = inject(ValidatorsForm);
  private toastService = inject(ToastService);
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoading = false;
  showPassword: boolean = false;

  public miRegister: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    lastname: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern(this.valiService.emailPattern)]],
    password: ['', Validators.required],
    password_confirmation: ['', Validators.required],
    user_type_id: [2],
  });

  constructor() {
    addIcons({ eye, eyeOff, logoGoogle });
  }

  ngOnInit() {
    this.isLoggedIn();
    this.authService.headers();
  }

  registrar() {
    this.isLoading = true;
    const { name, lastname, phone, email, password, password_confirmation, user_type_id } = this.miRegister.value;
    this.authService.register(name, lastname, phone, email, password, password_confirmation, user_type_id).subscribe({
      next: (data) => {
        if (data) {
          this.isLoading = false;
          this.toastService.success('Usuario creado correctamente');
          this.router.navigate(['tabs/inicio']);
        } else {
          this.isLoading = false;
          this.toastService.error('Error al crear el usuario');
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.toastService.error('Error al crear el usuario');
      }
    })
  }

  get emailErrorMsg(): string {
    const errors = this.miRegister.get('email')?.errors;
    if (errors?.['required']) {
      // console.log("El correo es obligatorio");
      return 'El correo es obligatorio';
    } else if (errors?.['pattern']) {
      // console.log("No es un formato de correo valido");
      return 'No es un formato de correo valido';
    }
    return '';
  }

  campoNoEsValido(campo: string) {
    return this.miRegister.controls[campo]?.errors
      && this.miRegister.controls[campo].touched
  }

  // si el usuario esta logeado lo manda a inicio
  isLoggedIn() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['tabs/inicio'])
    }
  }

  // Método para alternar la visibilidad de la contraseña
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

}