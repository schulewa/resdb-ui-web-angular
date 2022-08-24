import { Component, OnInit } from '@angular/core';
import {AuditedNamedEntityGridComponent} from "../audited-named-entity-grid.component";
import {MeasureType} from "../model/entity/measure-type";
import {CoreOperationsMessages} from "../core-operations-messages";
import {IAuditedNameDataType} from "../model/interfaces/audited-name-data-type";
import {DataAction} from "../model/enums/data-action";
import {DataStatus} from "../model/enums/data-status";
import {MeasureTypeService} from "./measure-type.service";

@Component({
  selector: 'app-measure-type',
  templateUrl: './measure-type.component.html',
  styleUrls: ['./measure-type.component.scss']
})
export class MeasureTypeComponent extends AuditedNamedEntityGridComponent<MeasureType> implements OnInit {
  protected createNewEntity(): MeasureType {
      throw new Error('Method not implemented.');
  }

  constructor(private measureTypeService: MeasureTypeService) {
    super();
    this.columnDefs = this.createColumnDefs();
    this.gridOptions = this.createGridOptions(this.onCellValueChanged);
  }

  initRowData() {
    this.rowData = [];
    //
    this.operationMessage = CoreOperationsMessages.FINDALL_MEASURE_TYPE;
    this.measureTypeService.findAll().subscribe(
      data => {
        for (const datum in data) {
          if (data.hasOwnProperty(datum)) {
            const measureType: IAuditedNameDataType = data[datum];
            measureType.selected = false;
            measureType.isDataChanged = false;
          }
        }
        this.rowData = data;
        this.httpError = undefined;
      },
      err => {
        this.httpError = err;
      });
  }

  revertChanges() {
    console.log('MeasureTypeComponent.revertChanges: TODO');
  }

  saveChanges() {
    // save only new and modified rows
    const toBeSaved = this.rowData.filter(row => row.action != null);

    if (toBeSaved) {
      for (const measureType of toBeSaved) {
        if (DataAction.Add === measureType.action) {
          this.operationMessage = CoreOperationsMessages.ADD_MEASURE_TYPE;
          this.enrichAuditData(measureType);
          this.measureTypeService.add(measureType).subscribe(
            data => {
              this.httpError = undefined;
              this.updateGrid(data);
            },
            err => {
              this.httpError = err;
            });
        } else if (DataAction.Update === measureType.action) {
          this.operationMessage = CoreOperationsMessages.UPDATE_MEASURE_TYPE;
          measureType.status = DataStatus.Amend;
          this.measureTypeService.update(measureType).subscribe(
            data => {
              this.httpError = undefined;
              this.updateGrid(data);
            },
            err => {
              this.httpError = err;
            }
          );
        } else if (DataAction.Delete === measureType.action) {
          this.operationMessage = CoreOperationsMessages.DELETE_MEASURE_TYPE;
          measureType.status = DataStatus.Delete;
          this.measureTypeService.delete(measureType).subscribe(
            data => {
              this.httpError = undefined;
              const remainingRows: IAuditedNameDataType[] = this.rowData.filter(r => (this.liveStatuses.includes(r.status)));
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

}
