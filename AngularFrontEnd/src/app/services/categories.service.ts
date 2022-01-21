import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IMenuCategoryAPI } from '../interfaces/interfacesAPI';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private categoriesUrl = 'https://webtech.salespool.at/categories';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'AUTHORIZATION': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDI1NDM1NjksImV4cCI6MTY0MjgwMjc2OX0.iqNe-SR0AHS-Qtb_y2cTs0mkYIgz68YQRpLbwrAON-M'
    })
  };


  constructor(
    private http: HttpClient) { }


  /** GET categories from the server */
  getCategories(): Observable<IMenuCategoryAPI[]> {
    return this.http.get<IMenuCategoryAPI[]>(this.categoriesUrl, this.httpOptions).pipe(
        catchError(this.handleError<IMenuCategoryAPI[]>('getCategories', []))
      );
  }

  /** GET category by id. Return `undefined` when id not found */
  getCategoryNo404<Data>(id: number): Observable<IMenuCategoryAPI> {
    const url = `${this.categoriesUrl}/?id=${id}`;
    return this.http.get<IMenuCategoryAPI[]>(url, this.httpOptions)
      .pipe(
        map(categories => categories[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          //this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<IMenuCategoryAPI>(`getCategory id=${id}`))
      );
  }

  /** POST: add a new category to the server */
  addCategory(category: IMenuCategoryAPI): Observable<IMenuCategoryAPI> {
    return this.http.post<IMenuCategoryAPI>(this.categoriesUrl, category, this.httpOptions).pipe(
      //tap((newCategory: IMenuCategoryAPI) => this.log(`added hero w/ id=${newCategory.categoryId}`)),
      catchError(this.handleError<IMenuCategoryAPI>('addCategory'))
    );
  }

  /** DELETE: delete the category from the server */
  deleteCategory(id: number): Observable<IMenuCategoryAPI> {
    const url = `${this.categoriesUrl}/${id}`;

    return this.http.delete<IMenuCategoryAPI>(url, this.httpOptions).pipe(
      //tap(_ => this.log(`deleted categorie id=${categorieId}`)),
      catchError(this.handleError<IMenuCategoryAPI>('deleteCategory'))
    );
  }


  /** PUT: update the hero on the server */
  updateCategory(category: IMenuCategoryAPI): Observable<any> {
    const url = `${this.categoriesUrl}/${category.categoryId}`;
    return this.http.put(url, category, this.httpOptions).pipe(
      //tap(_ => this.log(`updated category id=${category.categoryId}`)),
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
