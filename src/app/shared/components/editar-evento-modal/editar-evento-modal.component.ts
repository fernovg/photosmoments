import { CommonModule, formatDate } from '@angular/common';
import { Component, inject, input, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonModal, IonTitle, IonToolbar, ModalController, IonList, IonDatetime, IonAccordion, IonAccordionGroup, IonLabel, IonToggle, IonSelectOption, IonTabButton, IonAlert, IonImg } from '@ionic/angular/standalone';
import { ServiciosService } from 'src/app/core/services/servicios.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { ValidatorsForm } from 'src/app/core/services/validator.service';
import type { OverlayEventDetail } from '@ionic/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editar-evento-modal',
  templateUrl: './editar-evento-modal.component.html',
  styleUrls: ['./editar-evento-modal.component.scss'],
  imports: [IonLabel, IonList,
    FormsModule, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonTitle, IonToolbar, ReactiveFormsModule, IonDatetime, IonAccordion, IonAccordionGroup, IonToggle, CommonModule, IonAlert, IonImg]
})
export class EditarEventoModalComponent implements OnInit {

  @Input() evento: any;
  cEvento!: FormGroup;

  private modalCtrl = inject(ModalController);
  private fb = inject(FormBuilder);
  private toastService = inject(ToastService);
  private valiService = inject(ValidatorsForm);
  private servicios = inject(ServiciosService);
  private router = inject(Router);

  isLoading = false;
  baseImgUrl = environment.img_url;
  placeholderCover = 'assets/evento.png';
  coverFile: File | null = null;
  coverPreview: string | null = null;
  readonly maxCoverSize = 5 * 1024 * 1024;

  constructor() { }

  ngOnInit() {
    // Crear el form
    this.cEvento = this.fb.group({
      name: ['', Validators.required],
      event_date: ['', Validators.required],
      close_date: ['', Validators.required],
      total_guests: ['', Validators.required],
      max_photos_per_guest: ['', Validators.required],
      can_view_photos_before_event: [true],
      can_upload_photos_before_event: [true],
      days_before_upload: ['', Validators.required],
    });

    // Rellenar el form con los datos recibidos
    if (this.evento) {
      this.cEvento.patchValue(this.evento);
      this.coverPreview = this.getCoverImage(this.evento.cover_image_path);
    }
  }

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
    formData.append('close_date', formatDate(raw.close_date, 'yyyy-MM-dd HH:mm', 'en'));
    formData.append('total_guests', String(Number(raw.total_guests)));
    formData.append('max_photos_per_guest', String(Number(raw.max_photos_per_guest)));
    formData.append('can_view_photos_before_event', raw.can_view_photos_before_event ? '1' : '0');
    formData.append('can_upload_photos_before_event', raw.can_upload_photos_before_event ? '1' : '0');
    formData.append('days_before_upload', String(Number(raw.days_before_upload)));
    if (this.coverFile) {
      formData.append('cover_image', this.coverFile);
    }

    this.isLoading = true;
    this.servicios.actualizarDatos('events/' + this.evento.id, formData).subscribe({
      next: (data) => {
        this.isLoading = false;
        this.toastService.success('Editado Correctamente');
        this.modalCtrl.dismiss(data, 'confirm');
      },
      error: (error) => {
        this.isLoading = false;
        this.toastService.error(this.extractErrorMessage(error, 'Error al editar el evento'));
      }
    })

  }

  eliminar() {
    this.isLoading = true;
    this.servicios.eliminarDatos('events/' + this.evento.id).subscribe({
      next: (data) => {
        this.isLoading = false;
        this.toastService.success('Eliminado Correctamente');
        this.router.navigate(['/tabs/inicio']);
        this.modalCtrl.dismiss(data, 'confirm');
      },
      error: (error) => {
        this.isLoading = false;
        this.toastService.error('Error al eliminar el evento');
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
  public dias = [1, 3, 7];

  public customInvitados = false;
  public customFotos = false;

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
      this.customFotos = true;
      this.cEvento.patchValue({ days_before_upload: null });
    } else {
      this.customFotos = false;
      this.cEvento.patchValue({ days_before_upload: value });
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
      this.coverPreview = this.getCoverImage(this.evento?.cover_image_path);
      return;
    }

    if (file.size > this.maxCoverSize) {
      this.toastService.error('La imagen debe pesar máximo 5 MB.');
      input.value = '';
      this.coverFile = null;
      this.coverPreview = this.getCoverImage(this.evento?.cover_image_path);
      return;
    }

    this.coverFile = file;
    this.coverPreview = URL.createObjectURL(file);
  }

  getCoverImage(path?: string): string {
    if (!path) return this.placeholderCover;
    if (path.startsWith('http')) return path;
    return `${this.baseImgUrl}${path}`;
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

  public alertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
      handler: () => {
        // console.log('Alert canceled');
      },
    },
    {
      text: 'OK',
      role: 'Confimar',
      handler: () => {
        // console.log('Alert confirmed');
        this.eliminar();
      },
    },
  ];

  setResult(event: CustomEvent<OverlayEventDetail>) {
    // console.log(`Dismissed with role: ${event.detail.role}`);
  }
}
