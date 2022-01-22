import { Component, OnInit } from '@angular/core';
import { SAMPLETABLES } from 'src/assets/SampleData/sampledataAPI';
import { TablesService } from 'src/app/services/tables.service';
import { ITableAPI, INewTableAPI } from 'src/app/interfaces/interfacesAPI';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  selectedTable?: ITableAPI;
  newTable?: INewTableAPI;
  tables: ITableAPI[] = [];
  public guestviewURL = "https://webtech.salespool.at/guest";

  public visibleEditForm = false;
  public visibleAddNewForm = false;

  constructor(private tablesService: TablesService) {

  }

  ngOnInit(): void {
    this.getTables();
  }

  getTables(): void {
    this.tablesService.getTables()
      .subscribe(tables => this.tables = tables);
  }

  toggleEditForm() {
    this.visibleEditForm = !this.visibleEditForm;
  }

  editForm(table: ITableAPI) {
    this.selectedTable = table;
    this.toggleEditForm();
  }

  updateTable(table: ITableAPI) {
    //this.tables = this.tables.filter(h => h !== table);
    this.tablesService.updateTable(table).subscribe();
    this.toggleEditForm();
  }


  toggleAddNewForm() {
    this.visibleAddNewForm = !this.visibleAddNewForm;
  }

  AddNewForm() {
    this.newTable = {
      anzahlPlatz: 0,
      beschreibung: "",
    };
    this.toggleAddNewForm();
    this.ngOnInit();
  }

  addTable(table: INewTableAPI) {
    this.toggleAddNewForm();
    this.tablesService.addTable(table).subscribe();
  }

  deleteTable(table: ITableAPI): void {
    this.tables = this.tables.filter(h => h !== table);
    this.tablesService.deleteTable(table.tableID).subscribe();
  }

  handleFormChange(event: any) {
    this.visibleEditForm = event;
  }

  createQRCode(id: number) {
    let qrUrl: string = this.guestviewURL + id;
    
  }


}
