import { Component, OnInit } from '@angular/core';
import {AuditedNamedEntityGridComponent} from "../audited-named-entity-grid.component";
import {RaceType} from "../model/entity/race-type";
import {CoreOperationsMessages} from "../core-operations-messages";
import {IAuditedNameDataType} from "../model/interfaces/audited-name-data-type";
import {DataAction} from "../model/enums/data-action";
import {DataStatus} from "../model/enums/data-status";
import {RaceTypeService} from "./race-type.service";

@Component({
  selector: 'app-race-type',
  templateUrl: './race-type.component.html',
  styleUrls: ['./race-type.component.scss']
})
export class RaceTypeComponent extends AuditedNamedEntityGridComponent<RaceType> implements OnInit {

  constructor(private raceTypeService: RaceTypeService) {
    super();
    this.columnDefs = this.createColumnDefs();
    this.gridOptions = this.createGridOptions(this.onCellValueChanged);
  }

  initRowData() {
    this.rowData = [];
    //
    this.operationMessage = CoreOperationsMessages.FINDALL_RACE_TYPE;
    this.raceTypeService.findAll().subscribe(
      data => {
        for (const datum in data) {
          if (datum.hasOwnProperty(datum)) {
            const raceType: IAuditedNameDataType = data[datum];
            raceType.selected = false;
            raceType.isDataChanged = false;
          }
        }
        this.rowData = data;
      },
      err => {
        this.httpError = err;
      });
  }

  revertChanges() {
    console.log('RaceTypeService.revertChanges: TODO');
  }

  saveChanges() {
    // save only new and modified rows
    const toBeSaved = this.rowData.filter(row => row.action != null);

    if (toBeSaved) {
      for (const raceType of toBeSaved) {
        if (DataAction.Add === raceType.action) {
          this.operationMessage = CoreOperationsMessages.ADD_RACE_TYPE;
          this.enrichAuditData(raceType);
          this.raceTypeService.add(raceType).subscribe(
            data => {
              this.httpError = undefined;
              this.updateGrid(data);
            },
            err => {
              this.httpError = err;
            });
        } else if (DataAction.Update === raceType.action) {
          this.operationMessage = CoreOperationsMessages.UPDATE_RACE_TYPE;
          raceType.status = DataStatus.Amend;
          this.raceTypeService.update(raceType).subscribe(
            data => {
              this.httpError = undefined;
              this.updateGrid(data);
            },
            err => {
              this.httpError = err;
            }
          );
        } else if (DataAction.Delete === raceType.action) {
          this.operationMessage = CoreOperationsMessages.DELETE_RACE_TYPE;
          raceType.status = DataStatus.Delete;
          this.raceTypeService.delete(raceType).subscribe(
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

  protected createNewEntity(): RaceType {
    return new RaceType();
  }

}
