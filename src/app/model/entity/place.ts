import {River} from './river';
import {IAuditedNameDataType} from "../interfaces/audited-name-data-type";
import {DataStatus} from "../enums/data-status";
import {DataAction} from "../enums/data-action";

export class Place implements IAuditedNameDataType {

  id?: number;
  name: string;
  latitude: string;
  longitude: string;
  altitude: string;
  river: River | undefined;
  status: DataStatus;
  createdBy: string;
  updatedBy?: string;
  lastUpdated?: Date;
  selected: boolean;
  action: DataAction;
  isDataChanged: boolean;

  constructor() {
    this.name = '';
    this.latitude = '';
    this.longitude = '';
    this.altitude = '';
    this.status = DataStatus.New;
    this.createdBy = '';
    this.selected = false;
    this.action = DataAction.Add;
    this.isDataChanged = false;
  }

  isSaveButtonEnabled(): boolean {
    return this.isDataChanged;
  }

  public toString(): string {
    return 'Place: id=' + this.id + ' name=' + this.name +
      ' latitude=' + this.latitude + ' longitude=' + this.longitude + ' altitude=' + this.altitude +
      ' status=' + this.status + ' createdBy=' + this.createdBy +
      ' updatedBy=' + this.updatedBy + ' lastUpdated=' + this.lastUpdated + ' selected=' + this.selected + ' action=' + this.action +
      ' isDataChanged=' + this.isDataChanged;
  }
}
