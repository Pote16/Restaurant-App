import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as moment from "moment";
import { tap } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(username:string, password:string ) {
    return this.http.post('https://webtech.salespool.at/authentication/login/', {username, password})
      .subscribe(data => {
        this.setSession(data);
      })
  }

  // @ts-ignore
  protected setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn,'second');

    localStorage.setItem('id_token', authResult.token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    let expiresAt: any;
    // @ts-ignore
    expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
