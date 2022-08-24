import { Component, OnInit } from '@angular/core';
import {AuditedNamedEntityGridComponent} from "../audited-named-entity-grid.component";
import {ArtefactGroup} from "../model/entity/artefact-group";
import {ArtefactGroupService} from "./artefact-group.service";
import {CoreOperationsMessages} from "../core-operations-messages";
import {IAuditedNameDataType} from "../model/interfaces/audited-name-data-type";
import {DataAction} from "../model/enums/data-action";
import {DataStatus} from "../model/enums/data-status";

@Component({
  selector: 'app-artefact-group',
  templateUrl: './artefact-group.component.html',
  styleUrls: ['./artefact-group.component.scss']
})
export class ArtefactGroupComponent extends AuditedNamedEntityGridComponent<ArtefactGroup> implements OnInit {

  constructor(private artefactGroupService: ArtefactGroupService) {
    super();
    this.columnDefs = this.createColumnDefs();
    this.gridOptions = this.createGridOptions(this.onCellValueChanged);
  }

  initRowData() {
    this.rowData = [];
    //
    this.operationMessage = CoreOperationsMessages.FINDALL_ARTEFACT_GROUP;
    this.artefactGroupService.findAll().subscribe(
      data => {
        for (const datum in data) {
          if (data.hasOwnProperty(datum)) {
            const artefactGroup: IAuditedNameDataType = data[datum];
            artefactGroup.selected = false;
            artefactGroup.isDataChanged = false;
          }
        }
        this.rowData = data;
        this.httpError = undefined;
      },
      err => {
        console.error('ArtefactGroupComponent.findall: err="' + err);
        this.httpError = err;
      });
  }

  revertChanges() {
    console.log('ArtefactGroupComponent.revertChanges: TODO');
  }

  saveChanges() {
    console.log('ArtefactGroupComponent.saveChanges - entry - number of rows = ' + this.rowData.length);
    // save only new and modified rows
    const toBeSaved = this.rowData.filter(row => row.action != null);

    if (toBeSaved) {
      for (const artefactGroup of toBeSaved) {
        if (DataAction.Add === artefactGroup.action) {
          this.enrichAuditData(artefactGroup);
          this.artefactGroupService.add(artefactGroup).subscribe(
            data => {
              this.httpError = undefined;
              this.updateGrid(data);
            },
            err => {
              console.error('ArtefactGroupComponent.add: err="' + err);
              this.httpError = err;
              this.operationMessage = CoreOperationsMessages.ADD_ARTEFACT_GROUP;
            });
        } else if (DataAction.Update === artefactGroup.action) {
          artefactGroup.status = DataStatus.Amend;
          this.artefactGroupService.update(artefactGroup).subscribe(
            data => {
              this.httpError = undefined;
              this.updateGrid(data);
            },
            err => {
              console.error('ArtefactGroupComponent.update: err="' + err);
              this.httpError = err;
              this.operationMessage = CoreOperationsMessages.UPDATE_ARTEFACT_GROUP;
            }
          );
        } else if (DataAction.Delete === artefactGroup.action) {
          artefactGroup.status = DataStatus.Delete;
          this.artefactGroupService.delete(artefactGroup).subscribe(
            data => {
              console.log('Artefact group ' + artefactGroup.action + 'ed - result=' + data);
              this.httpError = undefined;
              const remainingRows: IAuditedNameDataType[] = this.rowData.filter(r => (this.liveStatuses.includes(r.status)));
              this.gridApi!.setRowData(remainingRows);
              this.gridApi!.refreshCells();
            },
            err => {
              console.error('ArtefactGroupComponent.delete: err="' + err);
              this.httpError = err;
              this.operationMessage = CoreOperationsMessages.DELETE_ARTEFACT_GROUP;
            }
          );
        }
      }
    }

  }

  protected createNewEntity(): ArtefactGroup {
    return new ArtefactGroup();
  }

}

