import {DataStatus} from "../enums/data-status";

export interface IDataAudited {
  versionStatus?: DataStatus;
  versionCreatedBy?: string;
  versionNumber?: number;
  versionUpdatedBy?: string;
  versionLastUpdated?: Date;
}
