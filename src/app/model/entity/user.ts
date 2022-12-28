import {AuthenticationResult} from '../enums/authentication-result';
import {UserGroupMembership} from './user-group-membership';
import {IAuditedDataType} from "../interfaces/audited-data-type";
import {DataStatus} from "../enums/data-status";
import {DataAction} from "../enums/data-action";
import {UserPassword} from "./user-password";
import {Language} from "./language";

export class User implements IAuditedDataType {
  firstName: string | undefined;
  familyName: string | undefined;
  groupMemberships: UserGroupMembership[] = [];
  id?: number;
  loginPassword: string | undefined;
  logonName: string | undefined;
  passwords: UserPassword[] = [];
  preferredLanguage: Language | undefined;
  jwtToken: string | undefined;
  status: DataStatus;
  // @ts-ignore
  versionCreatedBy?: string;
  versionLastUpdated?: Date;
  versionNumber?: number;
  versionUpdatedBy?: string;
  versionStatus?: DataStatus;
  selected: boolean;
  action: DataAction;
  isDataChanged: boolean;
  invalidAccessCount: number;
  authenticationResult: AuthenticationResult | undefined;
  passwordUpdated: Date | undefined;
  lastLogon: Date | undefined;
  sessionId: string | undefined;

  constructor() {
    this.isDataChanged = false;
    this.selected = false;
    this.action = DataAction.Add;
    this.status = DataStatus.New;
    this.invalidAccessCount = 0;
  }

  public toString(): string {
    return 'User: logonName=' + this.logonName +
      ' loginPassword=******' + ' firstName=' + this.firstName + ' familyName=' + this.familyName;
  }

}
