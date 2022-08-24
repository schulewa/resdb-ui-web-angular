import {DataStatus} from "../enums/data-status";

export interface IDataAudited {
  status: DataStatus;
  createdBy: string;
  updatedBy: string;
  lastUpdated: Date;
}
