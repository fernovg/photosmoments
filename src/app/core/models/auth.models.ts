export interface AuthResponse {
    // result: boolean;
    // data: {
    //     id: number;
    //     name: string;
    //     lastname: string;
    //     email: string;
    //     token: string;
    //     userTypeID: number;
    //     status: number;
    //     password?: string | null;
    // };
    access_token: string;
    token_type: string;
    message: string;
    errors: {
        email: string[];
    }
}