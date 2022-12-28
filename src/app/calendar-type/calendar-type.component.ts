import { Component, OnInit } from '@angular/core';
import {AuditedNamedEntityGridComponent} from "../audited-named-entity-grid.component";
import {CalendarType} from "../model/entity/calendar-type";
import {CalendarTypeService} from "./calendar-type.service";
import {CoreOperationsMessages} from "../core-operations-messages";
import {IAuditedNameDataType} from "../model/interfaces/audited-name-data-type";
import {DataAction} from "../model/enums/data-action";
import {DataStatus} from "../model/enums/data-status";

@Component({
  selector: 'app-calendar-type',
  templateUrl: './calendar-type.component.html',
  styleUrls: ['./calendar-type.component.scss']
})
export class CalendarTypeComponent extends AuditedNamedEntityGridComponent<CalendarType> implements OnInit {

  constructor(private calendarTypeService: CalendarTypeService) {
    super();
    this.columnDefs = this.createColumnDefs();
    this.gridOptions = this.createGridOptions(this.onCellValueChanged);
  }

  initRowData() {
    this.rowData = [];
    //
    this.operationMessage = CoreOperationsMessages.FINDALL_CALENDAR_TYPE;
    this.calendarTypeService.findAll().subscribe(
      data => {
        for (const datum in data) {
          if (data.hasOwnProperty(datum)) {
            const calendarType: IAuditedNameDataType = data[datum];
            calendarType.selected = false;
            calendarType.isDataChanged = false;
          }
        }
        this.rowData = data;
        this.httpError = undefined;
      },
      err => {
        console.error('CalendarTypeComponent.findall: err="' + err);
        this.httpError = err;
      });
  }

  revertChanges() {
    console.log('CalendarTypeComponent.revertChanges: TODO');
  }

  saveChanges() {
    console.log('CalendarTypeComponent.saveChanges - entry - number of rows = ' + this.rowData.length);
    // save only new and modified rows
    const toBeSaved = this.rowData.filter(row => row.action != null);

    if (toBeSaved) {
      for (const calendarType of toBeSaved) {
        if (DataAction.Add === calendarType.action) {
          this.enrichAuditData(calendarType);
          this.calendarTypeService.add(calendarType as CalendarType).subscribe(
            data => {
              this.httpError = undefined;
              this.updateGrid(data);
            },
            err => {
              console.error('CalendarTypeComponent.add: err="' + err);
              this.httpError = err;
              this.operationMessage = CoreOperationsMessages.ADD_CALENDAR_TYPE;
            });
        } else if (DataAction.Update === calendarType.action) {
          calendarType.versionStatus = DataStatus.Amend;
          this.calendarTypeService.update(calendarType as CalendarType).subscribe(
            data => {
              this.httpError = undefined;
              this.updateGrid(data);
            },
            err => {
              console.error('CalendarTypeComponent.update: err="' + err);
              this.httpError = err;
              this.operationMessage = CoreOperationsMessages.UPDATE_CALENDAR_TYPE;
            }
          );
        } else if (DataAction.Delete === calendarType.action) {
          calendarType.versionStatus = DataStatus.Delete;
          this.calendarTypeService.delete(calendarType as CalendarType).subscribe(
            data => {
              console.log('Calendar type ' + calendarType.action + 'ed - result=' + data);
              this.httpError = undefined;
              const remainingRows: IAuditedNameDataType[] = this.rowData.filter(r => (this.liveStatuses.includes(r.versionStatus!)));
              this.gridApi!.setRowData(remainingRows);
              this.gridApi!.refreshCells();
            },
            err => {
              console.error('CalendarTypeComponent.delete: err="' + err);
              this.httpError = err;
              this.operationMessage = CoreOperationsMessages.DELETE_CALENDAR_TYPE;
            }
          );
        }
      }
    }

  }

  protected createNewEntity(): CalendarType {
    return new CalendarType();
  }

}

