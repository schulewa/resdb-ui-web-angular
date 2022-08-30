import { Component, OnInit } from '@angular/core';
import { Person } from '../model/entity/person';
import {DataStatus} from "../model/enums/data-status";
import {DataAction} from "../model/enums/data-action";
import {AuditedEntityGridComponent} from "../audited-entity-grid.component";
import {PersonService} from "./person.service";
import {Router} from "@angular/router";
import {CoreOperationsMessages} from "../core-operations-messages";
import {IAuditedNameDataType} from "../model/interfaces/audited-name-data-type";
import {DataMode} from "../model/enums/data-mode";

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent extends AuditedEntityGridComponent<Person> implements OnInit {

  protected showGrid: boolean = true;
  protected dataMode: DataMode | undefined;

  constructor(private personService: PersonService, private router: Router) {
    super();
    this.columnDefs = this.createColumnDefs();
    this.gridOptions = this.createGridOptions(this.onCellValueChanged);
  }

  protected initRowData(): Person[] {
    this.rowData = [];
    //
    this.operationMessage = CoreOperationsMessages.FINDALL_PERSON;
    this.personService.findAll().subscribe(
      data => {
        for (const datum in data) {
          if (datum.hasOwnProperty(datum)) {
            const person: Person = data[datum];
            person.selected = false;
            person.isDataChanged = false;
          }
        }
        this.rowData = data;
        this.httpError = undefined;
      },
      err => {
        console.error('PersonComponent.findAll: err="' + err + '"');
        this.httpError = err;
    });
    return this.rowData;
  }

  protected override createColumnDefs(): any[] {
    return [
      {headerName: '', field: 'selected', width: 30, headerCheckboxSelection: true, checkboxSelection: true, editable: true},
      {headerName: 'ID', field: 'id', width: 60, editable: false, filter: true},
      {headerName: 'First name', field: 'firstName', width: 200, editable: false, filter: true},
      {headerName: 'Middle name(s)', field: 'middleName', width: 200, editable: false, filter: true},
      {headerName: 'Family name', field: 'familyName', width: 200, editable: false, filter: true},
      {headerName: 'Status', field: 'status', valueGetter: this.statusValueGetter, width: 100, editable: false, filter: true},
      {headerName: 'Created by', field: 'createdBy', width: 110, editable: false, filter: true},
      {headerName: 'Last updated by', field: 'updatedBy', width: 150, editable: false, filter: true},
      {headerName: 'Last updated', field: 'lastUpdated', width: 220, editable: false, filter: true},
      {headerName: 'Action', field: 'action', valueGetter: this.actionValueGetter, width: 100, editable: false, filter: true}
    ];
  }

  protected actionValueGetter(params: { data: { action: string; }; }) {
    // @ts-ignore
    return params.data.action ? DataAction[params.data.action] : '';
  }

  protected statusValueGetter(params: any) {
    // @ts-ignore
    return params.data.status ? DataStatus[params.data.status] : DataStatus.New;
  }

  isAddMode(): boolean {
    return DataMode.Add === this.dataMode;
  }

  isEditMode(): boolean {
    return DataMode.Update === this.dataMode;
  }

  protected override onCellValueChanged(event: any) {
    console.log('onCellValueChanged - entry: event=' + event + ' haveEmptyRow=' + this.haveEmptyRow);
    if (event.data && event.data.id && event.data.id > 0) {
      event.data.action = DataAction.Update;
      this.gridApi!.refreshCells();
    }

    const familyNameColDef = this.gridApi!.getColumnDef('familyName');
    if (familyNameColDef === event.colDef) {
      this.haveEmptyRow = false;
    }

    console.log('onCellValueChanged - exit: haveEmptyRow=' + this.haveEmptyRow);
  }

  mapStatus(value: any): DataStatus {
    if (value) {
      if ('NEW' === value) {
        return DataStatus.New;
      } else if ('AMEND' === value) {
        return DataStatus.Amend;
      } else {
        console.error('Unrecognized DataStatus returned from database: ' + value);
        return DataStatus.New;
      }
    } else {
      return DataStatus.New;
    }
  }

  // isAddMode(): boolean {
  //   return DataMode.Add === this.dataMode;
  // }
  //
  // isEditMode(): boolean {
  //   return DataMode.Update === this.dataMode;
  // }

  addPerson() {
    console.log('TODO: redirect to /person but with null Person as Input');
    this.showGrid = false;
    this.dataMode = DataMode.Add;
  }

  editPerson() {
    console.log('TODO: redirect to /person-detail but with the Person as Input');
    this.showGrid = false;
    this.dataMode = DataMode.Update;
    // TODO set variables for EDIT in person-detail.component.html/.ts to this.selectedRow
  }

  //
  // TODO move revertChanges and saveChanges to person-detail component
  //

  revertChanges() {
    console.log('PersonComponent.revertChanges: TODO');
  }

  haveDataChanges(): boolean {
    const changedData = this.rowData.filter(row => row.action != null);
    return changedData && changedData.length > 0;
  }

  saveChanges() {
    console.log('PersonComponent.saveChanges - entry - number of rows = ' + this.rowData.length);
    // save only new and modified rows
    const toBeSaved = this.rowData.filter(row => row.action != null);

    if (toBeSaved) {
      for (const raceType of toBeSaved) {
        if (DataAction.Add === raceType.action) {
          this.operationMessage = CoreOperationsMessages.ADD_TALE_TYPE;
          this.enrichAuditData(raceType);
          this.personService.add(raceType).subscribe(
            data => {
              this.httpError = undefined;
              this.updateGrid(data);
            },
            err => {
              this.httpError = err;
            });
        } else if (DataAction.Update === raceType.action) {
          this.operationMessage = CoreOperationsMessages.UPDATE_TALE_TYPE;
          raceType.status = DataStatus.Amend;
          this.personService.update(raceType).subscribe(
            data => {
              this.httpError = undefined;
              this.updateGrid(data);
            },
            err => {
              this.httpError = err;
            }
          );
        } else if (DataAction.Delete === raceType.action) {
          this.operationMessage = CoreOperationsMessages.DELETE_TALE_TYPE;
          raceType.status = DataStatus.Delete;
          this.personService.delete(raceType).subscribe(
            data => {
              this.httpError = undefined;
              const remainingRows: Person[] = this.rowData.filter(r => (this.liveStatuses.includes(r.status)));
              this.gridApi!.setRowData(remainingRows);
              this.gridApi!.refreshCells();
            },
            err => {
              this.httpError = err;
            }
          );
        }
      }
    }

  }

  protected override updateGrid(saved: Person) {
    if (saved && saved.firstName && saved.familyName) {
      const newRowData: Person[] = [];
      this.rowData.forEach((entry) => {
        // TODO what do we need to check here to determine if we have new entry?
        if (saved.firstName === entry.firstName && saved.familyName === entry.familyName) {
          newRowData.push(saved);
        } else {
          newRowData.push(entry);
        }
      });
      this.gridApi!.setRowData(newRowData);
    }

    console.log('Data updated');
  }

  protected override onSelectionChanged(event: any) {
    const rowCount = event.api.getSelectedNodes().length;
    console.log('PersonComponent.onSelectionChanged: ' + rowCount + ' rows selected');
    const selectedRows = event.api.getSelectedNodes();
    if (selectedRows && selectedRows.length === 1) {
      this.selectedRow = selectedRows[0].data;
    } else {
      this.selectedRow = undefined;
    }
  }

  protected createNewEntity(): Person {
    return new Person();
  }

}
