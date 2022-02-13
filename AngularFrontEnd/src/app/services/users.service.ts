import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUserAPI, INewUserAPI,  } from '../interfaces/interfacesAPI';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private usersUrl = environment.WEBAPIURL + 'users';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'AUTHORIZATION': String(localStorage.getItem("id_token"))
    })
  };

  constructor(private http: HttpClient) { }


  /** GET users from the server */
  getUsers(): Observable<IUserAPI[]> {
    return this.http.get<IUserAPI[]>(this.usersUrl, this.httpOptions).pipe(
      catchError(this.handleError<IUserAPI[]>('getUsers', []))
    );
  }

  /** GET user by id. Return `undefined` when id not found */
  getUserNo404<Data>(id: number): Observable<IUserAPI> {
    const url = `${this.usersUrl}/?id=${id}`;
    return this.http.get<IUserAPI[]>(url, this.httpOptions)
      .pipe(
        map(users => users[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          //this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<IUserAPI>(`getUser id=${id}`))
      );
  }

  /** POST: add a new user to the server */
  addUser(user: INewUserAPI): Observable<IUserAPI> {
    return this.http.post<IUserAPI>(this.usersUrl, user, this.httpOptions).pipe(
      //tap((newUser: IUserAPI) => this.log(`added hero w/ id=${newUser.userId}`)),
      catchError(this.handleError<IUserAPI>('addUser'))
    );
  }

  /** DELETE: delete the user from the server */
  deleteUser(id: number): Observable<IUserAPI> {
    const url = `${this.usersUrl}/${id}`;

    return this.http.delete<IUserAPI>(url, this.httpOptions).pipe(
      //tap(_ => this.log(`deleted categorie id=${categorieId}`)),
      catchError(this.handleError<IUserAPI>('deleteUser'))
    );
  }


  /** PUT: update the hero on the server */
  updateUser(user: IUserAPI): Observable<any> {
    const url = `${this.usersUrl}/${user.userID}`;
    return this.http.put(url, user, this.httpOptions).pipe(
      //tap(_ => this.log(`updated user id=${user.userId}`)),
      catchError(this.handleError<any>('updateUser'))
    );
  }


  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      //console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
