import { ValidatorFn } from '@angular/forms';
import { PASSWORD_RULES } from './password-rules';

export const passwordRules: ValidatorFn = control => {
    const value: string = control.value ?? '';

    if (!value) return null;

    const errors = Object.fromEntries(
        PASSWORD_RULES.map(rule => [
            rule.key,
            !rule.test(value)
        ])
    );

    return Object.values(errors).some(Boolean)
        ? { passwordRules: errors }
        : null;
};
