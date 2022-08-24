import { IDataAudited } from './data-audited';
import { IDataChanged } from './data-changed';
import { IPrimaryKey } from './primary-key';
import { IDataAction } from './data-action';
import { ISelectableData } from './selectable-data';

export interface IAuditedDataType extends IPrimaryKey, IDataAction, IDataAudited, IDataChanged, ISelectableData {}
