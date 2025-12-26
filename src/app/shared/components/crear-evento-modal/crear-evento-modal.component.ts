import { CommonModule, formatDate } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonToolbar, ModalController, IonList, IonLabel, IonToggle, IonBadge, IonFooter, IonImg } from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular';
import { ServiciosService } from 'src/app/core/services/servicios.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { ValidatorsForm } from 'src/app/core/services/validator.service';
import { FechaModalComponent } from '../fecha-modal/fecha-modal.component';
@Component({
  selector: 'app-crear-evento-modal',
  standalone: true,
  templateUrl: './crear-evento-modal.component.html',
  styleUrls: ['./crear-evento-modal.component.scss'],
  imports: [IonLabel, IonList,
    FormsModule, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonToolbar, ReactiveFormsModule, IonToggle, CommonModule, IonBadge, IonFooter, IonImg]
})
export class CrearEventoModalComponent implements OnInit {

  private modalCtrl = inject(ModalController);
  private fb = inject(FormBuilder);
  private toastService = inject(ToastService);
  private valiService = inject(ValidatorsForm);
  private servicios = inject(ServiciosService);
  private navCtrl = inject(NavController);

  isLoading = false;

  fechaSeleccionada: string | null = null;
  coverFile: File | null = null;
  coverPreview: string | null = null;
  readonly maxCoverSize = 5 * 1024 * 1024;

  public cEvento: FormGroup = this.fb.group({
    name: ['', [Validators.required,]],
    event_date: ['', Validators.required],
    close_date: [''],
    address: ['', Validators.required],
    total_guests: [10, Validators.required],
    max_photos_per_guest: [10, Validators.required],
    can_view_photos_before_event: [true],
    can_upload_photos_before_event: [true],
    days_before_upload: [1, Validators.required],
  });

  constructor() { }

  ngOnInit() { }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    if (this.cEvento.invalid) {
      console.log(this.cEvento.value);
      this.toastService.error('Completa todos los campos requeridos');
      return;
    }

    const raw = this.cEvento.value;

    const formData = new FormData();
    formData.append('name', raw.name);
    formData.append('event_date', formatDate(raw.event_date, 'yyyy-MM-dd HH:mm', 'en'));
    formData.append('close_date', formatDate(raw.event_date, 'yyyy-MM-dd HH:mm', 'en'));
    formData.append('address', raw.address);
    formData.append('total_guests', String(Number(raw.total_guests)));
    formData.append('max_photos_per_guest', String(Number(raw.max_photos_per_guest)));
    formData.append('can_view_photos_before_event', raw.can_view_photos_before_event ? '1' : '0');
    formData.append('can_upload_photos_before_event', raw.can_upload_photos_before_event ? '1' : '0');
    formData.append('days_before_upload', String(Number(raw.days_before_upload)));
    if (this.coverFile) {
      formData.append('cover_image', this.coverFile);
    }

    this.isLoading = true;
    this.servicios.guardarDatos('events', formData).subscribe({
      next: (data) => {
        this.isLoading = false;
        this.toastService.success('Creado Correctamente');
        this.modalCtrl.dismiss(data, 'confirm');
        const eventId = data?.id ?? data?.event?.id;
        if (eventId) {
          this.navCtrl.navigateForward(`/tabs/evento/${eventId}`);
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.toastService.error(this.extractErrorMessage(error, 'Error al crear el evento'));
      }
    })
  }

  valVerFotos() {
    this.cEvento.get('can_view_photos_before_event')!.markAsTouched();
  }

  valSubirFotos() {
    this.cEvento.get('can_upload_photos_before_event')!.markAsTouched();
  }

  public invitados = [10, 15, 20, 30];
  public fotos = [10, 25, 50, 100, 150, 250];
  public dias = [1, 7, 14];

  public customInvitados = false;
  public customFotos = false;
  public customDays = false;

  setInvitados(value: number | 'custom') {
    if (value === 'custom') {
      this.customInvitados = true;
      this.cEvento.patchValue({ total_guests: null });
    } else {
      this.customInvitados = false;
      this.cEvento.patchValue({ total_guests: value });
    }
  }

  setFotos(value: number | 'custom') {
    if (value === 'custom') {
      this.customFotos = true;
      this.cEvento.patchValue({ max_photos_per_guest: null });
    } else {
      this.customFotos = false;
      this.cEvento.patchValue({ max_photos_per_guest: value });
    }
  }

  setDias(value: number | 'custom') {
    if (value === 'custom') {
      this.customDays = true;
      this.cEvento.patchValue({ days_before_upload: null });
    } else {
      this.customDays = false;
      this.cEvento.patchValue({ days_before_upload: value });
    }
  }

  async abrirFecha() {
    const modal = await this.modalCtrl.create({
      component: FechaModalComponent,
      breakpoints: [0, 0.32, 0.40],
      initialBreakpoint: 0.40,
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      this.fechaSeleccionada = data;
      this.cEvento.patchValue({ event_date: data });
    }
  }

  onCoverSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      this.toastService.error('Solo se permiten imágenes.');
      input.value = '';
      this.coverFile = null;
      this.coverPreview = null;
      return;
    }

    if (file.size > this.maxCoverSize) {
      this.toastService.error('La imagen debe pesar máximo 5 MB.');
      input.value = '';
      this.coverFile = null;
      this.coverPreview = null;
      return;
    }

    this.coverFile = file;
    this.coverPreview = URL.createObjectURL(file);
  }

  private extractErrorMessage(error: any, fallback: string): string {
    const validationErrors = error?.error?.errors;
    if (validationErrors) {
      const firstKey = Object.keys(validationErrors)[0];
      if (firstKey && validationErrors[firstKey]?.length) {
        return validationErrors[firstKey][0];
      }
    }
    return error?.error?.message || fallback;
  }

}
