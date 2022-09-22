import {IDataChanged} from "../interfaces/data-changed";
import {DataStatus} from "../enums/data-status";

export class Role implements IDataChanged {
  id: number;
  name: string;
  status: DataStatus | undefined;
  createdBy: string | undefined;
  updatedBy: string | undefined;
  lastUpdated: Date | undefined;
  selected: boolean = false;

  isDataChanged: boolean;

  constructor() {
    this.id = 0;
    this.name = '';
    this.isDataChanged = false;
  }

  isSaveButtonEnabled(): boolean {
    return this.isDataChanged;
  }

}
