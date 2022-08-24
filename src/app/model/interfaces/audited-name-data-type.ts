import { Nameable } from './nameable-data-entity';
import { IDataAudited } from './data-audited';
import { IDataChanged } from './data-changed';
import { IPrimaryKey } from './primary-key';
import { IDataAction } from './data-action';
import { ISelectableData } from './selectable-data';

export interface IAuditedNameDataType extends Nameable, IPrimaryKey, IDataAction, IDataAudited, IDataChanged, ISelectableData {}
