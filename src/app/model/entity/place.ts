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
  versionStatus?: DataStatus;
  versionCreatedBy?: string;
  versionNumber?: number;
  versionUpdatedBy?: string;
  versionLastUpdated?: Date;
  selected: boolean;
  action: DataAction;
  isDataChanged: boolean;

  constructor() {
    this.name = '';
    this.latitude = '';
    this.longitude = '';
    this.altitude = '';
    this.versionStatus = DataStatus.New;
    this.versionCreatedBy = '';
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
      ' versionStatus=' + this.versionStatus + ' versionCreatedBy=' + this.versionCreatedBy +
      ' versionUpdatedBy=' + this.versionUpdatedBy + ' versionLastUpdated=' + this.versionLastUpdated + ' selected=' + this.selected + ' action=' + this.action +
      ' isDataChanged=' + this.isDataChanged;
  }
}
