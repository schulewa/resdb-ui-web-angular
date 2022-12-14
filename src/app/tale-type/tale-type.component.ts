import { Component, OnInit } from '@angular/core';
import {AuditedNamedEntityGridComponent} from "../audited-named-entity-grid.component";
import {TaleType} from "../model/entity/tale-type";
import {CoreOperationsMessages} from "../core-operations-messages";
import {IAuditedNameDataType} from "../model/interfaces/audited-name-data-type";
import {DataAction} from "../model/enums/data-action";
import {DataStatus} from "../model/enums/data-status";
import {TaleTypeService} from "./tale-type.service";

@Component({
  selector: 'app-tale-type',
  templateUrl: './tale-type.component.html',
  styleUrls: ['./tale-type.component.scss']
})
export class TaleTypeComponent extends AuditedNamedEntityGridComponent<TaleType> implements OnInit {

  constructor(private taleTypeService: TaleTypeService) {
    super();
    this.columnDefs = this.createColumnDefs();
    this.gridOptions = this.createGridOptions(this.onCellValueChanged);
  }

  initRowData() {
    this.rowData = [];
    //
    this.operationMessage = CoreOperationsMessages.FINDALL_TALE_TYPE;
    this.taleTypeService.findAll().subscribe(
      data => {
        for (const datum in data) {
          if (datum.hasOwnProperty(datum)) {
            const taleType: IAuditedNameDataType = data[datum];
            taleType.selected = false;
            taleType.isDataChanged = false;
          }
        }
        this.rowData = data;
      },
      err => {
        this.httpError = err;
      });
  }

  revertChanges() {
    console.log('TaleTypeService.revertChanges: TODO');
  }

  saveChanges() {
    // save only new and modified rows
    const toBeSaved = this.rowData.filter(row => row.action != null);

    if (toBeSaved) {
      for (const datum of toBeSaved) {
        const taleType = datum as TaleType;
        if (DataAction.Add === taleType.action) {
          this.operationMessage = CoreOperationsMessages.ADD_TALE_TYPE;
          this.enrichAuditData(taleType);
          this.taleTypeService.add(taleType).subscribe(
            data => {
              this.httpError = undefined;
              this.updateGrid(data);
            },
            err => {
              this.httpError = err;
            });
        } else if (DataAction.Update === taleType.action) {
          this.operationMessage = CoreOperationsMessages.UPDATE_TALE_TYPE;
          taleType.versionStatus = DataStatus.Amend;
          this.taleTypeService.update(taleType).subscribe(
            data => {
              this.httpError = undefined;
              this.updateGrid(data);
            },
            err => {
              this.httpError = err;
            }
          );
        } else if (DataAction.Delete === taleType.action) {
          this.operationMessage = CoreOperationsMessages.DELETE_TALE_TYPE;
          taleType.versionStatus = DataStatus.Delete;
          this.taleTypeService.delete(taleType).subscribe(
            data => {
              this.httpError = undefined;
              const remainingRows: IAuditedNameDataType[] = this.rowData.filter(r => (this.liveStatuses.includes(r.versionStatus!)));
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

  protected createNewEntity(): TaleType {
    return new TaleType();
  }

}
