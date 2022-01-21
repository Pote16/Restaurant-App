import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ITableAPI, INewTableAPI } from '../interfaces/interfacesAPI';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TablesService {

  private tablesUrl = 'https://webtech.salespool.at/tables';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'AUTHORIZATION': environment.APIKEY
    })
  };


  constructor(
    private http: HttpClient) { }


  /** GET tables from the server */
  getTables(): Observable<ITableAPI[]> {
    return this.http.get<ITableAPI[]>(this.tablesUrl, this.httpOptions).pipe(
        catchError(this.handleError<ITableAPI[]>('getTables', []))
      );
  }

  /** GET table by id. Return `undefined` when id not found */
  getTableNo404<Data>(id: number): Observable<ITableAPI> {
    const url = `${this.tablesUrl}/?id=${id}`;
    return this.http.get<ITableAPI[]>(url, this.httpOptions)
      .pipe(
        map(tables => tables[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          //this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<ITableAPI>(`getTable id=${id}`))
      );
  }

  /** POST: add a new table to the server */
  addTable(table: INewTableAPI): Observable<ITableAPI> {
    return this.http.post<ITableAPI>(this.tablesUrl, table, this.httpOptions).pipe(
      //tap((newTable: ITableAPI) => this.log(`added hero w/ id=${newTable.tableId}`)),
      catchError(this.handleError<ITableAPI>('addTable'))
    );
  }

  /** DELETE: delete the table from the server */
  deleteTable(id: number): Observable<ITableAPI> {
    const url = `${this.tablesUrl}/${id}`;

    return this.http.delete<ITableAPI>(url, this.httpOptions).pipe(
      //tap(_ => this.log(`deleted categorie id=${categorieId}`)),
      catchError(this.handleError<ITableAPI>('deleteTable'))
    );
  }


  /** PUT: update the hero on the server */
  updateTable(table: ITableAPI): Observable<any> {
    const url = `${this.tablesUrl}/${table.tableID}`;
    return this.http.put(url, table, this.httpOptions).pipe(
      //tap(_ => this.log(`updated table id=${table.tableId}`)),
      catchError(this.handleError<any>('updateCatgeory'))
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
