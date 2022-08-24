import {IDataChanged} from "../interfaces/data-changed";

export class River implements IDataChanged {
  id: number;
  name: string;

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
