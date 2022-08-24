import {AccountStatus} from "../enums/account-status";
import {Permission} from "../entity/permission";

export interface AuthenticatedUser {
  id: bigint,
  logonName: string,
  firstName: string,
  familyName: string,
  status: AccountStatus,
  permissions: Permission[],
  token: string
}
