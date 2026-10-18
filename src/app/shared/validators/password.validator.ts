import { ValidatorFn } from "@angular/forms";
import { countReset } from "console";

export const passwordRules: ValidatorFn = control => {
    const value: string = control?.value;

    if (!value) return null;

    const errors = {
        minLength: value.length < 8,
        uppercase: !/[A-Z]/.test(value),
        lowercase: !/[a-z]/.test(value),
        number: !/[0-9]/.test(value),
        special: !/[@#$%^&*!]/.test(value),
    }

    return Object.values(errors).some(Boolean) ? { passwordRules: errors } : null
}
