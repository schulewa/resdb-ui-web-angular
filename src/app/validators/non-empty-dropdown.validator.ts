import { AbstractControl } from '@angular/forms';

export function NonEmptyDropdownValidator(control: AbstractControl) {

  console.log('NonEmptyDropdownValidator: control.value=' + control.value);

  if (control.value && control.value !== 'Please select') {
    return { nonEmptyDropdown: true };
  }

  return null;

}
