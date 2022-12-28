import { Component, OnInit } from '@angular/core';
import {AuditedNamedEntityGridComponent} from "../audited-named-entity-grid.component";
import {ArtefactType} from "../model/entity/artefact-type";
import {ArtefactTypeService} from "./artefact-type.service";
import {CoreOperationsMessages} from "../core-operations-messages";
import {IAuditedNameDataType} from "../model/interfaces/audited-name-data-type";
import {DataAction} from "../model/enums/data-action";
import {DataStatus} from "../model/enums/data-status";

@Component({
  selector: 'app-artefact-type',
  templateUrl: './artefact-type.component.html',
  styleUrls: ['./artefact-type.component.scss']
})
export class ArtefactTypeComponent extends AuditedNamedEntityGridComponent<ArtefactType> implements OnInit {

  constructor(private artefactTypeService: ArtefactTypeService) {
    super();
    this.columnDefs = this.createColumnDefs();
    this.gridOptions = this.createGridOptions(this.onCellValueChanged);
  }

  initRowData() {
    this.rowData = [];
    //
    this.operationMessage = CoreOperationsMessages.FINDALL_ARTEFACT_TYPE;
    this.artefactTypeService.findAll().subscribe(
      data => {
        for (const datum in data) {
          if (data.hasOwnProperty(datum)) {
            const artefactType: IAuditedNameDataType = data[datum];
            artefactType.selected = false;
            artefactType.isDataChanged = false;
          }
        }
        this.rowData = data;
        this.httpError = undefined;
      },
      err => {
        console.error('ArtefactTypeComponent.findall: err="' + err);
        this.httpError = err;
      });
  }

  revertChanges() {
    console.log('ArtefactTypeComponent.revertChanges: TODO');
  }

  saveChanges() {
    console.log('ArtefactTypeComponent.saveChanges - entry - number of rows = ' + this.rowData.length);
    // save only new and modified rows
    const toBeSaved = this.rowData.filter(row => row.action != null);

    if (toBeSaved) {
      for (const artefactType of toBeSaved) {
        if (DataAction.Add === artefactType.action) {
          this.enrichAuditData(artefactType);
          this.artefactTypeService.add(artefactType as ArtefactType).subscribe(
            data => {
              this.updateGrid(data);
            },
            err => {
              console.error('ArtefactTypeComponent.add: err="' + err);
              this.httpError = err;
              this.operationMessage = CoreOperationsMessages.ADD_ARTEFACT_TYPE;
            });
        } else if (DataAction.Update === artefactType.action) {
          artefactType.versionStatus = DataStatus.Amend;
          this.artefactTypeService.update(artefactType as ArtefactType).subscribe(
            data => {
              this.updateGrid(data);
            },
            err => {
              console.error('ArtefactTypeComponent.update: err="' + err);
              this.httpError = err;
              this.operationMessage = CoreOperationsMessages.UPDATE_ARTEFACT_TYPE;
            }
          );
        } else if (DataAction.Delete === artefactType.action) {
          artefactType.versionStatus = DataStatus.Delete;
          this.artefactTypeService.delete(artefactType as ArtefactType).subscribe(
            data => {
              console.log('Artefact type ' + artefactType.action + 'ed - result=' + data);
              const remainingRows: IAuditedNameDataType[] = this.rowData.filter(r => (this.liveStatuses.includes(r.versionStatus!)));
              this.gridApi!.setRowData(remainingRows);
              this.gridApi!.refreshCells();
            },
            err => {
              console.error('ArtefactTypeComponent.delete: err="' + err);
              this.httpError = err;
              this.operationMessage = CoreOperationsMessages.DELETE_ARTEFACT_TYPE;
            }
          );
        }
      }
    }

  }

  protected createNewEntity(): ArtefactType {
    return new ArtefactType();
  }

}

