import {DataStatus} from "../enums/data-status";
import {DataAction} from "../enums/data-action";
import {Image} from "./image";
import {IAuditedDataType} from "../interfaces/audited-data-type";

export class Country implements IAuditedDataType {

  id?: number;
  code: string;
  name: string;
  stateName: string;
  sovereignty: string;
  flagImage: Image;
  status: DataStatus;
  createdBy: string;
  updatedBy?: string;
  lastUpdated?: Date;
  selected: boolean;
  action: DataAction;
  isDataChanged: boolean;

  constructor() {
    this.code = '';
    this.flagImage = new Image();
    this.name = '';
    this.stateName = '';
    this.sovereignty = '';
    this.status = DataStatus.New;
    this.createdBy = '';
    this.selected = false;
    this.action = DataAction.Add;
    this.isDataChanged = false;
  }

  public toString(): string {
    return 'Country: id=' + this.id + ' name=' + this.name + ' status=' + this.status + ' createdBy=' + this.createdBy +
            ' updatedBy=' + this.updatedBy + ' lastUpdated=' + this.lastUpdated + ' selected=' + this.selected + ' action=' + this.action +
            ' isDataChanged=' + this.isDataChanged;
  }
}
