import {Component, OnInit, ViewChild} from '@angular/core';
import {Language} from "../model/entity/language";
import {LanguageService} from "./language.service";
import {DateFormatters} from "../formatters/date-formatters";
import {CoreOperationsMessages} from "../core-operations-messages";
import {IAuditedNameDataType} from "../model/interfaces/audited-name-data-type";
import {DataAction} from "../model/enums/data-action";
import {DataStatus} from "../model/enums/data-status";
import {ColDef, GridApi, GridOptions} from "ag-grid-community";
import {YesNoCellRendererComponent} from "../cell-renderers/yes-no-cell-renderer/yes-no-cell-renderer.component";
import {HttpErrorResponse} from "@angular/common/http";
import {PopupMenuComponent} from "../popup-menu/popup-menu.component";
import {DataPopupMenuAction} from "../model/enums/data-popup-menu-action";
import {getCurrentUser} from "../utils/local-storage-utils";

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit { //extends AuditedNamedEntityGridComponent<Language> implements OnInit {

  @ViewChild(PopupMenuComponent) menu: PopupMenuComponent | undefined;

  protected columnDefs: ColDef[] = [];
  protected gridApi: GridApi | undefined;
  protected gridOptions: GridOptions | undefined;
  protected rowData: Language[]= [];
  protected httpError: HttpErrorResponse | undefined;
  protected operationMessage: string = '';
  protected liveStatuses: Array<DataStatus> = [];
  protected rowSelection: any;
  protected selectedRow: Language | undefined;
  protected haveEmptyRow: boolean = false;

  constructor(private languageService: LanguageService) {
    this.columnDefs = this.createColumnDefs();
    this.gridOptions = this.createGridOptions(this.onCellValueChanged);
  }

  protected createGridOptions(cellValueChanged: (event: any) => void): GridOptions {
    return <GridOptions> {
      animateRows: true,
      enableCellChangeFlash: true,
      enableColResize: true,
      enableFilter: true,
      enableSorting: true,
      onCellValueChanged: cellValueChanged,
      rowDeselection: false,
      rowSelection: 'single',
      statusBar: {
        statusPanels: [
          { statusPanel: 'agTotalRowCountComponent', align: 'left' },
          { statusPanel: 'agSelectedRowCountComponent' }
        ]
      },
      unSortIcon: true
    };
  }

  onGridReady(params: { api: GridApi<any> | undefined; }) {
    this.gridApi = params.api;
  }

  protected onCellValueChanged(event: any ) {
    // handle updated 'name' value
    console.log('onCellValueChanged - entry: event=' + event + ' haveEmptyRow=' + this.haveEmptyRow);
    if (event.data && event.data.id && event.data.id > 0) {
      event.data.action = DataAction.Update;
      this.gridApi!.refreshCells();
    }

    const nameColDef = this.gridApi!.getColumnDef('name');
    if (nameColDef === event.colDef) {
      console.log('onCellValueChanged: event.colDef == name column - set haveEmptyRow to false');
      this.haveEmptyRow = false;
    }

    console.log('onCellValueChanged - exit: haveEmptyRow=' + this.haveEmptyRow);
  }

  protected createColumnDefs(): any[] {
    return [
      {
        headerName: '',
        field: 'selected',
        width: 30,
        headerCheckboxSelection: true,
        checkboxSelection: true,
        editable: true
      },
      {headerName: 'ID', field: 'id', width: 60, editable: false, filter: true},
      {headerName: 'Name', field: 'name', width: 200, editable: true, filter: true},
      {headerName: 'Native Name', field: 'nativeName', width: 200, editable: true, filter: true},
      {headerName: 'iso6391Code1', field: 'iso6391Code1',width: 100, editable: true, filter: true},
      {headerName: 'iso6392CodeAlpha2t', field: 'iso6392CodeAlpha2t', width: 100, editable: true, filter: true},
      {headerName: 'iso6392CodeAlpha2b', field: 'iso6392CodeAlpha2b', width: 100, editable: true, filter: true},
      {headerName: 'iso6392CodeAlpha3', field: 'iso6392CodeAlpha3', width: 100, editable: true, filter: true},
      {headerName: 'Deciphered', field: 'deciphered', width: 125, editable: false, filter: true, cellRenderer: YesNoCellRendererComponent},
      {headerName: 'Living', field: 'living', width: 100, editable: false, filter: true, cellRenderer: YesNoCellRendererComponent},
      {headerName: 'Constructed', field: 'constructed', width: 125, editable: false, filter: true, cellRenderer: YesNoCellRendererComponent},
      {headerName: 'Macro Language', field: 'macroLanguage', width: 150, editable: false, filter: true, cellRenderer: YesNoCellRendererComponent},
      {headerName: 'Status', field: 'status', width: 100, editable: false, filter: true},
      {headerName: 'Created by', field: 'createdBy', width: 110, editable: false, filter: true},
      {headerName: 'Last updated by', field: 'updatedBy', width: 150, editable: false, filter: true},
      {
        headerName: 'Last updated',
        field: 'lastUpdated',
        width: 160,
        editable: false,
        filter: true,
        valueFormatter: DateFormatters.dateWithTimeAsString
      },
      {headerName: 'Action', field: 'action', width: 100, editable: false, filter: true}
    ];
  }

  initRowData() {
    this.rowData = [];
    //
    this.operationMessage = CoreOperationsMessages.FINDALL_LANGUAGE;
    this.languageService.findAll().subscribe(
      data => {
        for (const datum in data) {
          if (data.hasOwnProperty(datum)) {
            const language: Language = data[datum];
            language.selected = false;
            language.isDataChanged = false;
          }
        }
        this.rowData = data;
        this.httpError = undefined;
      },
      err => {
        console.error('LanguageComponent.findAll: err="' + err);
        this.httpError = err;
      });
  }

  protected createNewEntity(): Language {
    return new Language();
  }

  protected enrichAuditData(auditData: IAuditedNameDataType) {
    const currentUser = getCurrentUser();
    if (currentUser != null) {
      if (!auditData.versionCreatedBy) {
        auditData.versionCreatedBy = currentUser;
      }
      if (!auditData.versionUpdatedBy) {
        auditData.versionUpdatedBy = currentUser;
      }
    }
    if (!auditData.versionLastUpdated) {
      auditData.versionLastUpdated = new Date();
    }
  }

  protected updateGrid(saved: IAuditedNameDataType) {
    if (saved && saved.name) {
      const newRowData: IAuditedNameDataType[] = [];
      this.rowData.forEach( (entry) => {
        if (saved.name === entry.name) {
          newRowData.push(saved);
        } else {
          newRowData.push(entry);
        }
      });
      this.gridApi!.setRowData(newRowData);
    }

    console.log('Data updated');
  }

  revertChanges() {
    console.log('LanguageComponent.revertChanges: TODO');
  }

  saveChanges() {
    console.log('LanguageComponent.saveChanges - entry - number of rows = ' + this.rowData.length);
    // save only new and modified rows
    const toBeSaved = this.rowData.filter(row => row.action != null);

    if (toBeSaved) {
      for (const language of toBeSaved) {
        if (DataAction.Add === language.action) {
          this.operationMessage = CoreOperationsMessages.ADD_LANGUAGE;
          this.enrichAuditData(language);
          this.languageService.add(language).subscribe(
            data => {
              this.httpError = undefined;
              this.updateGrid(data);
            },
            err => {
              console.error('LanguageComponent.add: err="' + err);
              this.httpError = err;
            });
        } else if (DataAction.Update === language.action) {
          this.operationMessage = CoreOperationsMessages.UPDATE_LANGUAGE;
          language.status = DataStatus.Amend;
          this.languageService.update(language).subscribe(
            data => {
              this.httpError = undefined;
              this.updateGrid(data);
            },
            err => {
              console.error('LanguageComponent.update: err="' + err);
              this.httpError = err;
            }
          );
        } else if (DataAction.Delete === language.action) {
          this.operationMessage = CoreOperationsMessages.DELETE_LANGUAGE;
          language.status = DataStatus.Delete;
          this.languageService.delete(language).subscribe(
            data => {
              this.httpError = undefined;
              const remainingRows: IAuditedNameDataType[] = this.rowData.filter(r => (this.liveStatuses.includes(r.status)));
              this.gridApi!.setRowData(remainingRows);
              this.gridApi!.refreshCells();
            },
            err => {
              console.error('LanguageComponent.delete: err="' + err);
              this.httpError = err;
            }
          );
        }
      }
    }

  }

  onContextPopupMenu(event: any) {
    event.preventDefault(); // Suppress the browser's context menu
    console.log('AuditedNamedEntityGridComponent: onContextPopupMenu - event=' + event);
    this.menu!.open(event);
  }

  protected getRowData(): any[] {
    return this.rowData;
  }

  protected deselectAllRows() {
    this.rowData.forEach(entry => entry.selected = false);
  }

  protected onRowSelected(event: any) {
    //
    // need to de-select all rows first then select the newly selected one.
    // this is to ensure we don't leave the previously selected row marked as still selected.
    //
    this.deselectAllRows();
    event.data.selected = event.node.selected;
    this.selectedRow = event.node.data;
    this.menu!.open(event);
  }

  protected onSelectionChanged(event: any) {
    const rowCount = event.api.getSelectedNodes().length;
    console.log('LanguageComponent.onSelectionChanged: ' + rowCount + ' rows selected');
  }

  protected getColumnDefs() {
    return this.columnDefs;
  }

  protected actionSelected(popupMenuAction: any) {
    console.log('AuditedNamedEntityGridComponent.actionSelected: popupMenuAction=' + popupMenuAction);
    switch (popupMenuAction) {
      case DataPopupMenuAction.AddEmptyRow:
        this.addEmptyRow();
        break;
      case DataPopupMenuAction.MarkForDeletion:
        this.markRowForDeletion();
        break;
      case DataPopupMenuAction.RemoveRow:
        this.removeEmptyRow();
        break;
      case DataPopupMenuAction.UnmarkForDeletion:
        this.unmarkForDeletion();
        break;
      default:
        console.error('AuditedNamedEntityGridComponent.actionSelected: popup menu action not recognized');
    }
  }

  addEmptyRow() {
    if (this.haveEmptyRow) {
      console.log('addEmptyRow: haveEmptyRow is true so return without adding another');
      return;
    }

    this.rowData.push(this.createNewRowDatum());
    this.gridApi!.setRowData(this.rowData);

    //
    // set focus to Name column on new row; should be in edit mode and in that Name cell
    //
    const rowIndex = this.rowData.length  - 1;
    this.haveEmptyRow = true;
    this.gridApi!.setFocusedCell(rowIndex, 'name');
  }

  protected  markRowForDeletion() {
    console.log('AuditedNamedEntityGridComponent.markRowForDeletion');
    let nameOfAction;
    this.rowData.filter(this.isSelected).forEach(function (value) {
      value.action = DataAction.Delete;
      nameOfAction = DataAction[value.action];
      console.log('AuditedNamedEntityGridComponent.delete: mark for deletion - ' + value.name + '     name of action=' + nameOfAction);
    } );
    this.gridApi!.setRowData(this.rowData);
    this.gridApi!.refreshCells();
  }

  protected removeEmptyRow() {
    //
    // TODO need to check that this removes the row from the grid AND from this.rowData; LOOKED LIKE ROW ADDED TWICE...
    //
    console.log('removeEmptyRow: Removing empty row');
    if (this.selectedRow && this.isUnsavedRow(this.selectedRow)) {
      const otherRows: IAuditedNameDataType[] = [];
      this.rowData.filter(entry => !entry.selected).forEach(entry => otherRows.push(entry));
      console.log('removeEmptyRow: otherRows size = ' + otherRows.length);
      this.gridApi!.setRowData(otherRows);
      this.gridApi!.refreshCells();
    }
  }

  protected  unmarkForDeletion() {
    console.log('TODO: Unmarking row for deletion');
  }


  protected isSelected(element: { selected: any; }, index: any, array: any) {
    return element.selected;
  }

  isUnsavedRow(row: IAuditedNameDataType) {
    return row && row.id === 0;
  }

  ngOnInit(): void {
    this.liveStatuses.push(DataStatus.New);
    this.liveStatuses.push(DataStatus.Amend);
    this.haveEmptyRow = false;
    this.initRowData();
  }

  protected createNewRowDatum(): any {
    const datum = this.createNewEntity();
    datum.status = DataStatus.New;
    datum.action = DataAction.Add;
    return datum;
  }

}
