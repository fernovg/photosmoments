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
    qr_payload?: string;
    photos?: eventoPhoto[];
    user?: user;

    img?: string;
}

export interface eventoPhoto {
    id?: number;
    user_id?: number;
    event_id?: number;
    thumbnail_path?: string;
    image_path?: string;
    uploaded_at?: Date;
    created_at?: Date;
    updated_at?: Date;
    user?: user;
}

export interface guests {
    id?: number;
    event_id?: number;
    guest_id?: number;
    guest?: user;
}

export interface user {
    id?: number;
    name?: string;
    lastname?: string;
}

// export interface guest {
//     id?: number;
//     name?: string;
//     lastname?: string;
// }