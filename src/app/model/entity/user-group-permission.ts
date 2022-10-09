import { UserGroup } from './user-group';
import { Permission } from './permission';

export class UserGroupPermission {
    id?: number | undefined;
    group: UserGroup | undefined;
    permission: Permission | undefined;
}
