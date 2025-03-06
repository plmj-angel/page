export function startUserInputValidatation() {
    const fieldsToValidate = [
        { id: 'attackModels', validate: validatePositiveNumber },
        { id: 'attacks', validate: validatePositiveNumber },
        { id: 'skill', validate: validatePositiveNumber },
        { id: 'strength', validate: validatePositiveNumber },
        { id: 'ap', validate: validateNonNegativeNumber }, // AP could be 0
        { id: 'damage', validate: validatePositiveNumber },
        { id: 'defenseModels', validate: validatePositiveNumber },
        { id: 'toughness', validate: validatePositiveNumber },
        { id: 'save', validate: validatePositiveNumber },
        { id: 'invulnrable', validate: validatePositiveNumber },
        { id: 'wounds', validate: validatePositiveNumber },
        { id: 'addUnits', validate: validateNonNegativeNumber },
        { id: 'addUnitsWounds', validate: validatePositiveNumber },
        { id: 'leaderWounds', validate: validatePositiveNumber },

        { id: 'hitMod', validate: (v:string) => validateModifierRange(v, -1, 1) },
        { id: 'woundMod', validate: (v:string) => validateModifierRange(v, -1, 1) },
        { id: 'saveMod', validate: (v:string) => validateModifierRange(v, -1, 1) },

        //TODO think about how to handle this
        // { id: 'woundRoll', validate: validateWoundRollString },
        // { id: 'woundReroll', validate: validateWoundRerollString },
		//{ id: 'saveReroll', validate: validateNonNegativeNumber },
        //{ id: 'feelNoPain', validate: validateNonNegativeNumber }
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