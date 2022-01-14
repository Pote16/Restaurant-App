import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor() { }
}

getTables(): Table[] {
  return HEROES;
}
