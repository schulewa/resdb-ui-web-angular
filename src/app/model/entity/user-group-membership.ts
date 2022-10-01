import { User } from './user';
import {UserGroup} from './user-group';

export class UserGroupMembership {
    id?: number | undefined;
    user: User | undefined;
    group: UserGroup | undefined;
    validFrom: Date | undefined;
    validTo: Date | undefined;
}
