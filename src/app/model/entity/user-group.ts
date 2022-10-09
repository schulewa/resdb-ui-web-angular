import {UserGroupPermission} from './user-group-permission';
import {AccountStatus} from '../enums/account-status';

export class UserGroup {
    id?: number | undefined;
    name: string | undefined;
    displayName: string | undefined;
    status: AccountStatus | undefined;
    groupPermissions: UserGroupPermission[] = [];
}
