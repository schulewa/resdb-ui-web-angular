import { Component, OnInit } from '@angular/core';
import {AuditedNamedEntityGridComponent} from "../audited-named-entity-grid.component";
import {HierarchyType} from "../model/entity/hierarchy-type";
import {CoreOperationsMessages} from "../core-operations-messages";
import {IAuditedNameDataType} from "../model/interfaces/audited-name-data-type";
import {DataAction} from "../model/enums/data-action";
import {DataStatus} from "../model/enums/data-status";
import {HierarchyTypeService} from "./hierarchy-type.service";

@Component({
  selector: 'app-hierarchy-type',
  templateUrl: './hierarchy-type.component.html',
  styleUrls: ['./hierarchy-type.component.scss']
})
export class HierarchyTypeComponent extends AuditedNamedEntityGridComponent<HierarchyType> implements OnInit {

  constructor(private hierarchyTypeService: HierarchyTypeService) {
    super();
    console.log('HierarchyTypeComponent constructor');
    this.columnDefs = this.createColumnDefs();
    this.gridOptions = this.createGridOptions(this.onCellValueChanged);
  }

  initRowData() {
    this.rowData = [];
    //
    this.operationMessage = CoreOperationsMessages.FINDALL_HIERARCHY_TYPE;
    this.hierarchyTypeService.findAll().subscribe(
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
        console.error('HierarchyTypeComponent.findall: err="' + err);
        this.httpError = err;
      });
  }

  revertChanges() {
    console.log('HierarchyTypeComponent.revertChanges: TODO');
  }

  saveChanges() {
    console.log('HierarchyTypeComponent.saveChanges - entry - number of rows = ' + this.rowData.length);
    // save only new and modified rows
    const toBeSaved = this.rowData.filter(row => row.action != null);

    if (toBeSaved) {
      for (const hierarchyType of toBeSaved) {
        if (DataAction.Add === hierarchyType.action) {
          this.operationMessage = CoreOperationsMessages.ADD_HIERARCHY_TYPE;
          this.enrichAuditData(hierarchyType);
          this.hierarchyTypeService.add(hierarchyType).subscribe(
            data => {
              this.httpError = undefined;
              this.updateGrid(data);
            },
            err => {
              console.error('HierarchyTypeComponent.add: err="' + err);
              this.httpError = err;
            });
        } else if (DataAction.Update === hierarchyType.action) {
          this.operationMessage = CoreOperationsMessages.UPDATE_HIERARCHY_TYPE;
          hierarchyType.status = DataStatus.Amend;
          this.hierarchyTypeService.update(hierarchyType).subscribe(
            data => {
              this.httpError = undefined;
              this.updateGrid(data);
            },
            err => {
              console.error('HierarchyTypeComponent.update: err="' + err);
              this.httpError = err;
            }
          );
        } else if (DataAction.Delete === hierarchyType.action) {
          this.operationMessage = CoreOperationsMessages.DELETE_HIERARCHY_TYPE;
          hierarchyType.status = DataStatus.Delete;
          this.hierarchyTypeService.delete(hierarchyType).subscribe(
            data => {
              this.httpError = undefined;
              const remainingRows: IAuditedNameDataType[] = this.rowData.filter(r => (this.liveStatuses.includes(r.status)));
              this.gridApi!.setRowData(remainingRows);
              this.gridApi!.refreshCells();
            },
            err => {
              console.error('HierarchyTypeComponent.delete: err="' + err);
              this.httpError = err;
            }
          );
        }
      }
    }

  }

  protected createNewEntity(): HierarchyType {
    return new HierarchyType();
  }

}
