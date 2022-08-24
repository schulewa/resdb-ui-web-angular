import { Component, OnInit } from '@angular/core';
import {AuditedNamedEntityGridComponent} from "../audited-named-entity-grid.component";
import {DeityType} from "../model/entity/deity-type";
import {CoreOperationsMessages} from "../core-operations-messages";
import {IAuditedNameDataType} from "../model/interfaces/audited-name-data-type";
import {DataAction} from "../model/enums/data-action";
import {DataStatus} from "../model/enums/data-status";
import {DeityTypeService} from "./deity-type.service";

@Component({
  selector: 'app-deity-type',
  templateUrl: './deity-type.component.html',
  styleUrls: ['./deity-type.component.scss']
})
export class DeityTypeComponent extends AuditedNamedEntityGridComponent<DeityType> implements OnInit {

  constructor(private deityTypeService: DeityTypeService) {
    super();
    console.log('DeityTypeComponent constructor');
    this.columnDefs = this.createColumnDefs();
    this.gridOptions = this.createGridOptions(this.onCellValueChanged);
  }

  initRowData() {
    this.rowData = [];
    //
    this.operationMessage = CoreOperationsMessages.FINDALL_DEITY_TYPE;
    this.deityTypeService.findAll().subscribe(
      data => {
        for (const datum in data) {
          if (data.hasOwnProperty(datum)) {
            const deityType: IAuditedNameDataType = data[datum];
            deityType.selected = false;
            deityType.isDataChanged = false;
          }
        }
        this.rowData = data;
        this.httpError = undefined;
      },
      err => {
        console.error('DeityTypeComponent.findall: err="' + err);
        this.httpError = err;
      });
  }

  revertChanges() {
    console.log('DeityTypeComponent.revertChanges: TODO');
  }

  saveChanges() {
    console.log('DeityTypeComponent.saveChanges - entry - number of rows = ' + this.rowData.length);
    // save only new and modified rows
    const toBeSaved = this.rowData.filter(row => row.action != null);

    if (toBeSaved) {
      for (const deityType of toBeSaved) {
        if (DataAction.Add === deityType.action) {
          this.enrichAuditData(deityType);
          this.deityTypeService.add(deityType).subscribe(
            data => {
              this.httpError = undefined;
              this.updateGrid(data);
            },
            err => {
              console.error('DeityTypeComponent.add: err="' + err);
              this.httpError = err;
              this.operationMessage = CoreOperationsMessages.ADD_DEITY_TYPE;
            });
        } else if (DataAction.Update === deityType.action) {
          deityType.status = DataStatus.Amend;
          this.deityTypeService.update(deityType).subscribe(
            data => {
              this.httpError = undefined;
              this.updateGrid(data);
            },
            err => {
              console.error('DeityTypeComponent.update: err="' + err);
              this.httpError = err;
              this.operationMessage = CoreOperationsMessages.UPDATE_DEITY_TYPE;
            }
          );
        } else if (DataAction.Delete === deityType.action) {
          deityType.status = DataStatus.Delete;
          this.deityTypeService.delete(deityType).subscribe(
            data => {
              this.httpError = undefined;
              const remainingRows: IAuditedNameDataType[] = this.rowData.filter(r => (this.liveStatuses.includes(r.status)));
              this.gridApi!.setRowData(remainingRows);
              this.gridApi!.refreshCells();
            },
            err => {
              console.error('DeityTypeComponent.delete: err="' + err);
              this.httpError = err;
              this.operationMessage = CoreOperationsMessages.DELETE_DEITY_TYPE;
            }
          );
        }
      }
    }

  }

  protected createNewEntity(): DeityType {
    return new DeityType();
  }

}

