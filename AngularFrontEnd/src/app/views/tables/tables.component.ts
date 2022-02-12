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
  public qrCodeURL = "-";

  public visibleEditForm = false;
  public visibleAddNewForm = false;
  public visibleQrCode = false;

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

  toggleQRCode() {
    this.visibleQrCode = !this.visibleQrCode;
  }

  AddNewForm() {
    this.newTable = {
      tischNummer: 0,
      anzahlPlatz: 0,
      beschreibung: "",
    };
    this.toggleAddNewForm();
  }

  addTable(table: INewTableAPI) {
    this.toggleAddNewForm();
    this.tablesService.addTable(table).subscribe();
    this.getTables();
  }

  deleteTable(table: ITableAPI): void {
    this.tables = this.tables.filter(h => h !== table);
    this.tablesService.deleteTable(table.tableID).subscribe();
  }

  handleFormChange(event: any) {
    this.visibleEditForm = event;
  }

  createQRCode(id: number) {
    this.qrCodeURL = this.guestviewURL + "/?id=" + id;
    this.toggleQRCode();
  }


}
