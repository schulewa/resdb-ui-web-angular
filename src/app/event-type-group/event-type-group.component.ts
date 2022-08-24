import { Component, OnInit } from '@angular/core';
import {AuditedNamedEntityGridComponent} from "../audited-named-entity-grid.component";
import {EventTypeGroup} from "../model/entity/event-type-group";
import {CoreOperationsMessages} from "../core-operations-messages";
import {IAuditedNameDataType} from "../model/interfaces/audited-name-data-type";
import {DataAction} from "../model/enums/data-action";
import {DataStatus} from "../model/enums/data-status";
import {EventTypeGroupService} from "./event-type-group.service";

@Component({
  selector: 'app-event-type-group',
  templateUrl: './event-type-group.component.html',
  styleUrls: ['./event-type-group.component.scss']
})
export class EventTypeGroupComponent extends AuditedNamedEntityGridComponent<EventTypeGroup> implements OnInit {
  protected createNewEntity(): EventTypeGroup {
      throw new Error('Method not implemented.');
  }

  constructor(private eventTypeGroupService: EventTypeGroupService) {
    super();
    console.log('EventTypeGroupComponent constructor');
    this.columnDefs = this.createColumnDefs();
    this.gridOptions = this.createGridOptions(this.onCellValueChanged);
  }

  initRowData() {
    this.rowData = [];
    //
    this.operationMessage = CoreOperationsMessages.FINDALL_EVENT_TYPE_GROUP;
    this.eventTypeGroupService.findAll().subscribe(
      data => {
        for (const datum in data) {
          if (data.hasOwnProperty(datum)) {
            const eventTypeGroup: IAuditedNameDataType = data[datum];
            eventTypeGroup.selected = false;
            eventTypeGroup.isDataChanged = false;
          }
        }
        this.rowData = data;
        this.httpError = undefined;
      },
      err => {
        console.error('EventTypeGroupComponent.findall: err="' + err);
        this.httpError = err;
      });
  }

  revertChanges() {
    console.log('EventTypeGroupComponent.revertChanges: TODO');
  }

  saveChanges() {
    console.log('EventTypeGroupComponent.saveChanges - entry - number of rows = ' + this.rowData.length);
    // save only new and modified rows
    const toBeSaved = this.rowData.filter(row => row.action != null);

    if (toBeSaved) {
      for (const eventTypeGroup of toBeSaved) {
        if (DataAction.Add === eventTypeGroup.action) {
          this.operationMessage = CoreOperationsMessages.ADD_EVENT_TYPE_GROUP;
          this.enrichAuditData(eventTypeGroup);
          this.eventTypeGroupService.add(eventTypeGroup).subscribe(
            data => {
              this.httpError = undefined;
              this.updateGrid(data);
            },
            err => {
              console.error('EventTypeGroupComponent.add: err="' + err);
              this.httpError = err;
            });
        } else if (DataAction.Update === eventTypeGroup.action) {
          this.operationMessage = CoreOperationsMessages.UPDATE_EVENT_TYPE_GROUP;
          eventTypeGroup.status = DataStatus.Amend;
          this.eventTypeGroupService.update(eventTypeGroup).subscribe(
            data => {
              this.httpError = undefined;
              this.updateGrid(data);
            },
            err => {
              console.error('EventTypeGroupComponent.update: err="' + err);
              this.httpError = err;
            }
          );
        } else if (DataAction.Delete === eventTypeGroup.action) {
          this.operationMessage = CoreOperationsMessages.DELETE_EVENT_TYPE_GROUP;
          eventTypeGroup.status = DataStatus.Delete;
          this.eventTypeGroupService.delete(eventTypeGroup).subscribe(
            data => {
              this.httpError = undefined;
              const remainingRows: IAuditedNameDataType[] = this.rowData.filter(r => (this.liveStatuses.includes(r.status)));
              this.gridApi!.setRowData(remainingRows);
              this.gridApi!.refreshCells();
            },
            err => {
              console.error('EventTypeGroupComponent.delete: err="' + err);
              this.httpError = err;
            }
          );
        }
      }
    }

  }

}

