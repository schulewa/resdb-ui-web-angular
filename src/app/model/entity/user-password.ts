import {User} from "./user";

export class UserPassword {
  id?: number | undefined;
  user: User | undefined;
  validFrom: Date | undefined;
  validTo: Date | undefined;
  validityTimezoneOffset: string | undefined;
}
