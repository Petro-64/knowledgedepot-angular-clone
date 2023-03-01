export interface LoginResponce {
    cookie_consent_given: number;
    id: number; 
    jwt_token: string;
    name: string; 
    role_id: number; 
    success: boolean; 
    suspension_reason: string; 
  }