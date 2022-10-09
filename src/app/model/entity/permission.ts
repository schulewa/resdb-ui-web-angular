import {OperationType} from '../enums/operation-type';

export class Permission {
    id?: number | undefined;
    name: string | undefined;
    description: string | undefined;
    status: PermissionStatus | undefined;
    operationType: OperationType | undefined;
}
