import { Component, OnInit } from '@angular/core';
import {AuditedNamedEntityGridComponent} from "../audited-named-entity-grid.component";
import {EntityType} from "../model/entity/entity-type";
import {CoreOperationsMessages} from "../core-operations-messages";
import {IAuditedNameDataType} from "../model/interfaces/audited-name-data-type";
import {DataAction} from "../model/enums/data-action";
import {DataStatus} from "../model/enums/data-status";
import {EntityTypeService} from "./entity-type.service";

@Component({
  selector: 'app-entity-type',
  templateUrl: './entity-type.component.html',
  styleUrls: ['./entity-type.component.scss']
})
export class EntityTypeComponent extends AuditedNamedEntityGridComponent<EntityType> implements OnInit {

  constructor(private entityTypeService: EntityTypeService) {
    super();
    this.columnDefs = this.createColumnDefs();
    this.gridOptions = this.createGridOptions(this.onCellValueChanged);
  }

  initRowData() {
    this.rowData = [];
    //
    this.operationMessage = CoreOperationsMessages.FINDALL_ENTITY_TYPE;
    this.entityTypeService.findAll().subscribe(
      data => {
        for (const datum in data) {
          if (data.hasOwnProperty(datum)) {
            const entityType: IAuditedNameDataType = data[datum];
            entityType.selected = false;
            entityType.isDataChanged = false;
          }
        }
        this.rowData = data;
        this.httpError = undefined;
      },
      err => {
        console.error('EnityTypeComponent.findall: err="' + err);
        this.httpError = err;
      });
  }

  revertChanges() {
    console.log('EnityTypeComponent.revertChanges: TODO');
  }

  saveChanges() {
    console.log('EnityTypeComponent.saveChanges - entry - number of rows = ' + this.rowData.length);
    // save only new and modified rows
    const toBeSaved = this.rowData.filter(row => row.action != null);

    if (toBeSaved) {
      for (const datum of toBeSaved) {
        const entityType = datum as EntityType;
        if (DataAction.Add === entityType.action) {
          this.enrichAuditData(entityType);
          this.entityTypeService.add(entityType).subscribe(
            data => {
              this.httpError = undefined;
              this.updateGrid(data);
            },
            err => {
              console.error('EntityTypeComponent.add: err="' + err);
              this.httpError = err;
              this.operationMessage = CoreOperationsMessages.ADD_ENTITY_TYPE;
            });
        } else if (DataAction.Update === entityType.action) {
          entityType.status = DataStatus.Amend;
          this.entityTypeService.update(entityType).subscribe(
            data => {
              this.httpError = undefined;
              this.updateGrid(data);
            },
            err => {
              console.error('EntityTypeComponent.update: err="' + err);
              this.httpError = err;
              this.operationMessage = CoreOperationsMessages.UPDATE_ENTITY_TYPE;
            }
          );
        } else if (DataAction.Delete === entityType.action) {
          entityType.status = DataStatus.Delete;
          this.entityTypeService.delete(entityType).subscribe(
            data => {
              this.httpError = undefined;
              const remainingRows: IAuditedNameDataType[] = this.rowData.filter(r => (this.liveStatuses.includes(r.versionStatus!)));
              this.gridApi!.setRowData(remainingRows);
              this.gridApi!.refreshCells();
            },
            err => {
              console.error('EntityTypeComponent.delete: err="' + err);
              this.httpError = err;
              this.operationMessage = CoreOperationsMessages.DELETE_ENTITY_TYPE;
            }
          );
        }
      }
    }

  }

  protected createNewEntity(): EntityType {
    return new EntityType();
  }

}

