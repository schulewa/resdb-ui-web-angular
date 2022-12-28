import { Component, OnInit } from '@angular/core';
import {AuditedNamedEntityGridComponent} from "../audited-named-entity-grid.component";
import {LanguageGroup} from "../model/entity/language-group";
import {CoreOperationsMessages} from "../core-operations-messages";
import {IAuditedNameDataType} from "../model/interfaces/audited-name-data-type";
import {DataAction} from "../model/enums/data-action";
import {DataStatus} from "../model/enums/data-status";
import {LanguageGroupService} from "./language-group.service";

@Component({
  selector: 'app-language-group',
  templateUrl: './language-group.component.html',
  styleUrls: ['./language-group.component.scss']
})
export class LanguageGroupComponent extends AuditedNamedEntityGridComponent<LanguageGroup> implements OnInit {

  constructor(private languageGroupService: LanguageGroupService) {
    super();
    this.columnDefs = this.createColumnDefs();
    this.gridOptions = this.createGridOptions(this.onCellValueChanged);
  }

  initRowData() {
    this.rowData = [];
    //
    this.operationMessage = CoreOperationsMessages.FINDALL_LANGUAGE_GROUP;
    this.languageGroupService.findAll().subscribe(
      data => {
        for (const datum in data) {
          if (data.hasOwnProperty(datum)) {
            const languageGroup: IAuditedNameDataType = data[datum];
            languageGroup.selected = false;
            languageGroup.isDataChanged = false;
          }
        }
        this.rowData = data;
        this.httpError = undefined;
      },
      err => {
        console.error('LanguageGroupComponent.findAll: err="' + err);
        this.httpError = err;
      });
  }

  revertChanges() {
    console.log('LanguageGroupComponent.revertChanges: TODO');
  }

  saveChanges() {
    console.log('LanguageGroupComponent.saveChanges - entry - number of rows = ' + this.rowData.length);
    // save only new and modified rows
    const toBeSaved = this.rowData.filter(row => row.action != null);

    if (toBeSaved) {
      for (const datum of toBeSaved) {
        const languageGroup = datum as LanguageGroup;
        if (DataAction.Add === languageGroup.action) {
          this.operationMessage = CoreOperationsMessages.ADD_LANGUAGE_GROUP;
          this.enrichAuditData(languageGroup);
          this.languageGroupService.add(languageGroup).subscribe(
            data => {
              this.httpError = undefined;
              this.updateGrid(data);
            },
            err => {
              console.error('LanguageGroupComponent.add: err="' + err);
              this.httpError = err;
            });
        } else if (DataAction.Update === languageGroup.action) {
          this.operationMessage = CoreOperationsMessages.UPDATE_LANGUAGE_GROUP;
          languageGroup.status = DataStatus.Amend;
          this.languageGroupService.update(languageGroup).subscribe(
            data => {
              this.httpError = undefined;
              this.updateGrid(data);
            },
            err => {
              console.error('LanguageGroupComponent.update: err="' + err);
              this.httpError = err;
            }
          );
        } else if (DataAction.Delete === languageGroup.action) {
          this.operationMessage = CoreOperationsMessages.DELETE_LANGUAGE_GROUP;
          languageGroup.status = DataStatus.Delete;
          this.languageGroupService.delete(languageGroup).subscribe(
            data => {
              this.httpError = undefined;
              const remainingRows: IAuditedNameDataType[] = this.rowData.filter(r => (this.liveStatuses.includes(r.versionStatus!)));
              this.gridApi!.setRowData(remainingRows);
              this.gridApi!.refreshCells();
            },
            err => {
              console.error('LanguageGroupComponent.delete: err="' + err);
              this.httpError = err;
            }
          );
        }
      }
    }

  }

  protected createNewEntity(): LanguageGroup {
    return new LanguageGroup();
  }

}
