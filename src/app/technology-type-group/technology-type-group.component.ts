import { Component, OnInit } from '@angular/core';
import {AuditedNamedEntityGridComponent} from "../audited-named-entity-grid.component";
import {TechnologyTypeGroup} from "../model/entity/technology-type-group";
import {CoreOperationsMessages} from "../core-operations-messages";
import {IAuditedNameDataType} from "../model/interfaces/audited-name-data-type";
import {DataAction} from "../model/enums/data-action";
import {DataStatus} from "../model/enums/data-status";
import {TechnologyTypeGroupService} from "./technology-type-group.service";

// @ts-ignore
@Component({
  selector: 'app-technology-type-group',
  templateUrl: './technology-type-group.component.html',
  styleUrls: ['./technology-type-group.component.scss']
})
export class TechnologyTypeGroupComponent extends AuditedNamedEntityGridComponent<TechnologyTypeGroup> implements OnInit {

  constructor(private technologyTypeGroupService: TechnologyTypeGroupService) {
    super();
    this.columnDefs = this.createColumnDefs();
    this.gridOptions = this.createGridOptions(this.onCellValueChanged);
  }

  initRowData() {
    this.rowData = [];
    //
    this.operationMessage = CoreOperationsMessages.FINDALL_TECHNOLOGY_TYPE_GROUP;
    this.technologyTypeGroupService.findAll().subscribe(
      data => {
        for (const datum in data) {
          if (datum.hasOwnProperty(datum)) {
            const technologyTypeGroup: IAuditedNameDataType = data[datum];
            technologyTypeGroup.selected = false;
            technologyTypeGroup.isDataChanged = false;
          }
        }
        this.rowData = data;
      },
      err => {
        this.httpError = err;
      });
  }


  protected createNewEntity(): TechnologyTypeGroup {
    return new TechnologyTypeGroup();
  }

  revertChanges() {
    console.log('TechnologyTypeGroupComponent.revertChanges: TODO');
  }

  saveChanges() {
    // save only new and modified rows
    const toBeSaved = this.rowData.filter(row => row.action != null);

    if (toBeSaved) {
      for (const datum of toBeSaved) {
        const technologyTypeGroup = datum as TechnologyTypeGroup;
        if (DataAction.Add === technologyTypeGroup.action) {
          this.operationMessage = CoreOperationsMessages.ADD_TECHNOLOGY_TYPE_GROUP;
          this.enrichAuditData(technologyTypeGroup);
          this.technologyTypeGroupService.add(technologyTypeGroup).subscribe(
            data => {
              this.httpError = undefined;
              this.updateGrid(data);
            },
            err => {
              this.httpError = err;
            });
        } else if (DataAction.Update === technologyTypeGroup.action) {
          this.operationMessage = CoreOperationsMessages.UPDATE_TECHNOLOGY_TYPE_GROUP;
          technologyTypeGroup.versionStatus = DataStatus.Amend;
          this.technologyTypeGroupService.update(technologyTypeGroup).subscribe(
            data => {
              this.httpError = undefined;
              this.updateGrid(data);
            },
            err => {
              this.httpError = err;
            }
          );
        } else if (DataAction.Delete === technologyTypeGroup.action) {
          this.operationMessage = CoreOperationsMessages.DELETE_TECHNOLOGY_TYPE_GROUP;
          technologyTypeGroup.versionStatus = DataStatus.Delete;
          this.technologyTypeGroupService.delete(technologyTypeGroup).subscribe(
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
}
