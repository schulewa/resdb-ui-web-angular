import {HistoricalDate} from "../entity/historical-date";
import {Title} from "../entity/title";
import {Place} from "../entity/place";
import {DataStatus} from "../enums/data-status";
import {DataAction} from "../enums/data-action";
import {PersonTitle} from "../entity/person-title";
import {PersonRole} from "../entity/person-role";
import {PersonAttribute} from "../entity/person-attribute";

export interface PersonApi {
    id: number;
    firstName: string;
    middleName: string;
    familyName: string;
    gender: string;
    dateOfBirth: HistoricalDate;
    dateOfDeath: HistoricalDate;
    birthPlace: Place;
    deathPlace: Place;

    status: DataStatus;
    createdBy: string;
    updatedBy: string;
    lastUpdated: Date;
    selected: boolean;
    action: DataAction;
    isDataChanged: boolean;

    attributes: PersonAttribute[];
    roles: PersonRole[];
    titles: PersonTitle[];
}
