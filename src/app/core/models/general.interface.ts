export interface myProfile {
    id?: number;
    name?: string;
    lastname?: string;
    email?: string;
    user_type_id?: number;
}

export interface evento {
    id?: number;
    name?: string;
    event_date?: Date;
    close_date?: Date;
    can_view_photos_before_event?: boolean;
    can_upload_photos_before_event?: boolean;
    total_guests?: number;
    max_photos_per_guest?: number;
    days_before_upload?: number;
    qr_code_path?: string;
}