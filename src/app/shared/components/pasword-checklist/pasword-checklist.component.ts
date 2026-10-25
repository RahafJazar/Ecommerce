import { Component, computed, input } from '@angular/core';
import { PASSWORD_RULES } from '../../validators/password-rules';

@Component({
  imports: [],
  selector: 'app-pasword-checklist',
  styleUrl: './pasword-checklist.component.css',
  templateUrl: './pasword-checklist.component.html',
})
export class PaswordChecklistComponent {
  password = input<string>('');

  readonly passCheck = computed(() => {
    const value = this.password();

    return PASSWORD_RULES.map(rule => ({
      label: rule.label,
      valid: rule.test(value)
    }));
  });

  readonly completedChecks = computed(
    () => this.passCheck().filter(check => check.valid).length
  );

}
