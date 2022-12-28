import {IAuditedNameDataType} from "../interfaces/audited-name-data-type";
import {DataStatus} from "../enums/data-status";
import {DataAction} from "../enums/data-action";

export class ArtefactGroup implements IAuditedNameDataType {

  id?: number;
  name: string;
  versionStatus: DataStatus;
  versionCreatedBy: string;
  versionNumber?: number;
  versionUpdatedBy?: string;
  versionLastUpdated?: Date;
  selected: boolean;
  action: DataAction;
  isDataChanged: boolean;

  constructor() {
    this.name = '';
    this.versionStatus = DataStatus.New;
    this.versionCreatedBy = '';
    this.isDataChanged = false;
    this.selected = false;
    this.action = DataAction.Add;
  }

  public toString(): string {
    return 'ArtefactGroup: id=' + this.id + ' name=' + this.name + ' versionStatus=' + this.versionStatus + ' versionCreatedBy=' + this.versionCreatedBy +
            ' versionUpdatedBy=' + this.versionUpdatedBy + ' versionLastUpdated=' + this.versionLastUpdated + ' selected=' + this.selected + ' action=' + this.action +
            ' isDataChanged=' + this.isDataChanged;
  }
}
