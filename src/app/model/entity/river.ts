import {IDataChanged} from "../interfaces/data-changed";
import {DataStatus} from "../enums/data-status";

export class River implements IDataChanged {
  id?: number;
  name: string;
  status: DataStatus;
  createdBy: string;
  updatedBy?: string;
  lastUpdated?: Date;
  versionNumber: number;

  isDataChanged: boolean;

  constructor() {
    this.name = '';
    this.status = DataStatus.New;
    this.createdBy = '';
    this.versionNumber = 0;
    this.isDataChanged = false;
  }

  isSaveButtonEnabled(): boolean {
    return this.isDataChanged;
  }

}
