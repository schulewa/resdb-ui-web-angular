import {Component, OnDestroy, OnInit} from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";
import {ICellRendererParams} from "ag-grid-community";

@Component({
  selector: 'app-thumbnail-cell-renderer',
  templateUrl: './thumbnail-cell-renderer.component.html',
  styleUrls: ['./thumbnail-cell-renderer.component.scss']
})
export class ThumbnailCellRendererComponent implements ICellRendererAngularComp, OnDestroy, OnInit {

  protected cellValue: any;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  agInit(params: ICellRendererParams): void {
    console.log('ThumbnailCellRendererComponent.agInit: params=' + params);
    this.cellValue = params;
  }

  refresh(params: ICellRendererParams<any>): boolean {
    console.log('ThumbnailCellRendererComponent.refresh: params=' + params);
    this.cellValue = this.getValueToDisplay(params);
    return true;
  }

  getValueToDisplay(params: ICellRendererParams) {
    console.log('ThumbnailCellRendererComponent.getValueToDisplay: params=' + params);
    return params.valueFormatted ? params.valueFormatted : params.value;
  }
}
