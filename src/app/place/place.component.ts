import {Component, OnInit} from '@angular/core';
import {Place} from "../model/entity/place";
import {DataStatus} from "../model/enums/data-status";
import {PlaceService} from "./place.service";
import {DataAction} from "../model/enums/data-action";
import {DateFormatters} from "../formatters/date-formatters";
import {CoreOperationsMessages} from "../core-operations-messages";
import {AuditedNamedEntityGridComponent} from "../audited-named-entity-grid.component";

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.scss']
})
export class PlaceComponent extends AuditedNamedEntityGridComponent<Place> implements OnInit {

  constructor(private placeService: PlaceService) {
    super();
    this.columnDefs = this.createColumnDefs();
    this.gridOptions = this.createGridOptions(this.onCellValueChanged);
    this.haveEmptyRow = false;
    this.rowData = [];
    this.operationMessage = '';
  }

  protected override createColumnDefs(): any[] {
    return [
      { headerName: '', field: 'selected', width: 30, headerCheckboxSelection: true, checkboxSelection: true, editable: true },
      { headerName: 'ID', field: 'id', width: 60, editable: false, filter: true },
      { headerName: 'Code', field: 'code', width: 80, editable: false, filter: true },
      { headerName: 'Name', field: 'name', width: 200, editable: false, filter: true },
      { headerName: 'Latitude', field: 'latitude', width: 300, editable: false, filter: true },
      { headerName: 'Longitude', field: 'longitude', width: 300, editable: false, filter: true },
      { headerName: 'Altitude', field: 'altitude', width: 200, editable: false, filter: true },
      { headerName: 'River', field: 'river', width: 100, editable: false, filter: true },
      { headerName: 'Status', field: 'status', width: 100, editable: false, filter: true },
      { headerName: 'Created by', field: 'createdBy', width: 110, editable: false, filter: true },
      { headerName: 'Last updated by', field: 'updatedBy', width: 150, editable: false, filter: true },
      {
        headerName: 'Last updated',
        field: 'lastUpdated',
        width: 160,
        editable: false,
        filter: true,
        valueFormatter: DateFormatters.dateWithTimeAsString
      },
      { headerName: 'Action', field: 'action', width: 100, editable: false, filter: true }
    ];
  }

  initRowData() {
    this.rowData = [];
    //
    this.operationMessage = CoreOperationsMessages.FINDALL_PLACE;
    this.placeService.findAll().subscribe(
      data => {
        for (const datum in data) {
          if (datum.hasOwnProperty(datum)) {
            const place: Place = data[datum];
            place.selected = false;
            place.isDataChanged = false;
          }
        }
        this.rowData = data;
      },
      err => {
        this.httpError = err;
      });
  }

  protected createNewEntity(): Place {
    return new Place();
  }

  revertChanges() {
    console.log('PlaceComponent.revertChanges: TODO');
  }

  saveChanges() {
    console.log('PlaceComponent.saveChanges - entry - number of rows = ' + this.rowData.length);
    // save only new and modified rows
    const toBeSaved = this.rowData.filter(row => row.action != null);

    if (toBeSaved) {
      for (const place of toBeSaved) {
        if (DataAction.Add === place.action) {
          this.enrichAuditData(place);
          this.placeService.add(place as Place).subscribe(
            data => {
              this.httpError = undefined;
              this.updateGrid(data);
            },
            err => {
              console.error('PlaceComponent.add: err="' + err);
              this.httpError = err;
              this.operationMessage = CoreOperationsMessages.ADD_PLACE;
            });
        } else if (DataAction.Update === place.action) {
          place.versionStatus = DataStatus.Amend;
          this.placeService.update(place as Place).subscribe(
            data => {
              this.httpError = undefined;
              this.updateGrid(data);
            },
            err => {
              console.error('PlaceComponent.update: err="' + err);
              this.httpError = err;
              this.operationMessage = CoreOperationsMessages.UPDATE_PLACE;
            }
          );
        } else if (DataAction.Delete === place.action) {
          place.versionStatus = DataStatus.Delete;
          this.placeService.delete(place as Place).subscribe(
            data => {
              console.log('Place ' + place.action + 'ed - result=' + data);
              this.httpError = undefined;
              const remainingRows: Place[] = (this.rowData as Place[]).filter(r => (this.liveStatuses.includes(r.versionStatus!)));
              this.gridApi!.setRowData(remainingRows);
              this.gridApi!.refreshCells();
            },
            err => {
              console.error('PlaceComponent.delete: err="' + err);
              this.httpError = err;
              this.operationMessage = CoreOperationsMessages.DELETE_PLACE;
            }
          );
        }
      }
    }

  }

  override updateGrid(saved: Place) {
    if (saved && saved.name) {
      const newRowData: Place[] = [];
      this.rowData.forEach( (entry) => {
        if (saved.name === entry.name) {
          newRowData.push(saved);
        } else {
          newRowData.push(entry as Place);
        }
      });
      this.gridApi!.setRowData(newRowData);
    }

    console.log('Data updated');
  }

}

