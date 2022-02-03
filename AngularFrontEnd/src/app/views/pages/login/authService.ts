import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: "root"
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(username:string, password:string ) {
    let authURL = environment.WEBAPIURL + 'authentication/login/';
    return this.http.post(authURL, {username, password})
      .subscribe(data => {
        this.setSession(data);
      })
  }

  // @ts-ignore
  protected setSession(authResult) {
    const expiresAt = authResult.expiresIn;

    localStorage.setItem('id_token', authResult.token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    let expiresAt: any;
    // @ts-ignore
    expiresAt = JSON.parse(expiration);
    return expiresAt;
  }
}
