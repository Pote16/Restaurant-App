import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IMenuItemAPI, INewMenuItemAPI } from '../interfaces/interfacesAPI';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuItemsService {

  private menuItemsUrl = 'https://webtech.salespool.at/menuItems';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'AUTHORIZATION': String(localStorage.getItem("id_token"))
    })
  };


  constructor(
    private http: HttpClient) { }


  /** GET menuItems from the server */
  getMenuItems(): Observable<IMenuItemAPI[]> {
    return this.http.get<IMenuItemAPI[]>(this.menuItemsUrl, this.httpOptions).pipe(
        catchError(this.handleError<IMenuItemAPI[]>('getMenuItems', []))
      );
  }

  /** GET menuItem by id. Return `undefined` when id not found */
  getMenuItemNo404<Data>(id: number): Observable<IMenuItemAPI> {
    const url = `${this.menuItemsUrl}/?id=${id}`;
    return this.http.get<IMenuItemAPI[]>(url, this.httpOptions)
      .pipe(
        map(menuItems => menuItems[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          //this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<IMenuItemAPI>(`getMenuItem id=${id}`))
      );
  }

  /** POST: add a new menuItem to the server */
  addMenuItem(menuItem: INewMenuItemAPI): Observable<IMenuItemAPI> {
    return this.http.post<IMenuItemAPI>(this.menuItemsUrl, menuItem, this.httpOptions).pipe(
      //tap((newMenuItem: IMenuItemAPI) => this.log(`added hero w/ id=${newMenuItem.menuItemId}`)),
      catchError(this.handleError<IMenuItemAPI>('addMenuItem'))
    );
  }

  /** DELETE: delete the menuItem from the server */
  deleteMenuItem(id: number): Observable<IMenuItemAPI> {
    const url = `${this.menuItemsUrl}/${id}`;

    return this.http.delete<IMenuItemAPI>(url, this.httpOptions).pipe(
      //tap(_ => this.log(`deleted categorie id=${categorieId}`)),
      catchError(this.handleError<IMenuItemAPI>('deleteMenuItem'))
    );
  }


  /** PUT: update the hero on the server */
  updateMenuItem(menuItem: IMenuItemAPI): Observable<any> {
    const url = `${this.menuItemsUrl}/${menuItem.itemId}`;
    return this.http.put(url, menuItem, this.httpOptions).pipe(
      //tap(_ => this.log(`updated menuItem id=${menuItem.itemId}`)),
      catchError(this.handleError<any>('updateMenuItem'))
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
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  /*
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
  */

}
