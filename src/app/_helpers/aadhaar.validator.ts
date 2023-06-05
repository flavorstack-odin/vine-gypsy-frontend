import { AbstractControl, ValidationErrors } from '@angular/forms';

export function aadhaarValidator(
  control: AbstractControl
): ValidationErrors | null {
  // Remove any whitespace characters from the Aadhaar number
  const aadhaarNumber = control.value.replace(/\s/g, '');

  // Check if the Aadhaar number is 12 digits long
  if (aadhaarNumber.length !== 12) {
    return { aadhaarLength: true };
  }

  // Check if the Aadhaar number contains only numeric digits
  if (!/^\d+$/.test(aadhaarNumber)) {
    return { aadhaarFormat: true };
  }

  // Validate the checksum digit of the Aadhaar number
  let checkSum = 0;
  for (let i = 0; i < 11; i++) {
    checkSum += parseInt(aadhaarNumber.charAt(i), 10) * (11 - i);
  }
  checkSum = checkSum % 11 === 0 ? 0 : 11 - (checkSum % 11);
  if (checkSum !== parseInt(aadhaarNumber.charAt(11), 10)) {
    return { aadhaarChecksum: true };
  }

  // If all checks pass, the Aadhaar number is valid
  return null;
}
