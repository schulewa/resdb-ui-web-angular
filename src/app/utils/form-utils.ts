import {FormGroup} from "@angular/forms";

export function hasFormFieldChanged(form: FormGroup, fieldName: string): boolean {
  const field = form.get(fieldName);
  return (field != null && (field.dirty || field.touched));
}

export function isFormFieldInvalid(form: FormGroup, fieldName: string): boolean {
  const field = form.get(fieldName);
  return field == null || ((field.invalid || field.touched));
}
