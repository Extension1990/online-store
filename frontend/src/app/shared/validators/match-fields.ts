import { validate } from '@angular/forms/signals';

export function matchFields(fieldA: any, fieldB: any, message = 'Fields do not match.') {
  validate(fieldB, () => {
    if (fieldA.value !== fieldB.value) {
      return { kind: 'custom', message };
    }
    return null;
  });
}