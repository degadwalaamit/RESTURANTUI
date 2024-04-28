import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function minumumArrayLengthValidator(length: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isInvalid = control.value == null || (<Array<any>>control.value).length < length;
    return isInvalid ? { minumumArrayLength: { value: control.value } } : null;
  };
}
