export function startUserInputValidatation() {
    const fieldsToValidate = [
        { id: 'attacks', validate: validatePositiveNumber },
        { id: 'strength', validate: validatePositiveNumber },
        { id: 'toughness', validate: validatePositiveNumber },
        { id: 'hitMod', validate: validateModifierRange },
        { id: 'woundMod', validate: validateModifierRange },
        { id: 'saveMod', validate: validateModifierRange },
        { id: 'addUnits', validate: validateNonNegativeNumber },
        { id: 'addUnitsWounds', validate: validatePositiveNumber },
        { id: 'leaderWounds', validate: validatePositiveNumber }
    ];

    fieldsToValidate.forEach(({ id, validate }) => {
        const input = document.getElementById(id) as HTMLInputElement;
        if (input) {
            input.addEventListener('input', () => {
                validateField(input, validate);
            });
        }
    });
}

function validateField(input: HTMLInputElement, validateFn: (value: string) => string | null) {
    const error = validateFn(input.value);
    showFieldError(input, error);
}

function showFieldError(input: HTMLInputElement, error: string | null) {
    let errorSpan = input.nextElementSibling as HTMLSpanElement;

    if (!errorSpan || !errorSpan.classList.contains('field-error')) {
        errorSpan = document.createElement('span');
        errorSpan.className = 'field-error';
        errorSpan.style.color = 'red';
        errorSpan.style.fontSize = '0.85em';
        errorSpan.style.marginLeft = '8px';
        input.parentNode?.insertBefore(errorSpan, input.nextSibling);
    }

    errorSpan.textContent = error || '';
}

function validatePositiveNumber(value: string): string | null {
    const num = Number(value);
    if (value.trim() === '') return null;
    if (isNaN(num) || num <= 0) return 'Must be a positive number';
    return null;
}

function validateNonNegativeNumber(value: string): string | null {
    const num = Number(value);
    if (value.trim() === '') return null;
    if (isNaN(num) || num < 0) return 'Cannot be negative';
    return null;
}

function validateModifierRange(value: string, startRange: number = -1, endRange:number = 1): string | null {
    const num = Number(value);
    if (value.trim() === '') return null;
    if (isNaN(num) || num < startRange || num > endRange) {
		return `Must be between ${startRange} and ${endRange}`;
	}
    return null;
}