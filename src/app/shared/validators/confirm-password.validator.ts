import { AbstractControl } from "@angular/forms";

/*---------Confirm Password(custom) ------- */
export function confirmPassword(group: AbstractControl): { [key: string]: boolean } | null {
    const pass = group.get('password')?.value;
    const rePass = group.get('rePassword')?.value;

    if (pass != rePass && rePass !== '') {
        group.get('rePassword')?.setErrors({ mismatch: true });
        return { mismatch: true }
    }
    return null;

}

