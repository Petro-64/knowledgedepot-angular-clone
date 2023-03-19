import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { getJwsToken } from '../services/http/getJwsToken.service';
import { AuthService } from '../services/auth.service'


@Injectable()

export class AuthGuard implements CanActivate {
constructor(private router: Router, private JwsTok: getJwsToken, private authh: AuthService){
}
    canActivate(route: ActivatedRouteSnapshot,  state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean | any {
        console.log("this.JwsTok = ", this.JwsTok);
        return this.authh.isAuthenticated()
            .then(
                (authenticated ) => {
                    if(authenticated){
                        return true;
                    } else {
                        ////this.router.navigate(['/']);
                        return true;
                        
                    }
                }
            )


        // console.log("this.JwsTok = ", this.JwsTok)
        // if(this.JwsTok.get().length == 0) {
        //     console.log("zero length");
        //     return true;//this.router.navigate(['/'])
        // } else {
        //     console.log("none-zero length");
        //     return true;
        // }
    }
}
