import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { isNullOrUndefined } from "util";

export function invalidWordsValidator(words: Array<string>): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let isInvalid = false;
    if (!isNullOrUndefined(words) && !isNullOrUndefined(control.value)) {
      words.forEach(w => {
        isInvalid = w.toLowerCase() === control.value.toLowerCase();
      });
    }
    return isInvalid ? { invalidWords: { value: control.value } } : null;
  };
}
