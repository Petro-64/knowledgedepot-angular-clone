export interface IsAuthenticated {
    JwtToken: string;
    ifAdmin: boolean;
    ifUser: boolean;
  }