import {DataStatus} from "../enums/data-status";
import {DataAction} from "../enums/data-action";
import {ImageType} from "./image-type";

export class Image {
  id?: number;
  filePath: string;
  fileName: string;
  imageType: ImageType;
  action: DataAction;
  createdBy: string;
  isDataChanged: boolean;
  lastUpdated?: Date;
  updatedBy?: string;
  selected: boolean;
  status: DataStatus;

  constructor() {
    this.filePath = '';
    this.fileName = '';
    this.imageType = new ImageType();
    this.status = DataStatus.New;
    this.createdBy = '';
    this.selected = false;
    this.action = DataAction.Add;
    this.isDataChanged = false;
  }

  public toString(): string {
    return 'Image: id=' + this.id + ' filePath=' + this.filePath + ' fileName=' + this.fileName + ' status=' + this.status + ' createdBy=' + this.createdBy +
      ' updatedBy=' + this.updatedBy + ' lastUpdated=' + this.lastUpdated + ' selected=' + this.selected + ' action=' + this.action +
      ' isDataChanged=' + this.isDataChanged;
  }
}
