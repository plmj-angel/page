const htmlIds = [
    //attack fields
    "models", "attacks", "skill", "str", "ap", "dmg", "hitMod", "lethHit", "susHits", "hitCrit", "critRolls", "reroll", "woundMod", "devastWound", "woundCrit", "woundRoll", "woundReroll",
    //defense fields
    "defModels", "tough", "save", "invuln", "wounds", "saveMod", "cover", "saveReroll", "noPain"
];
export function getPageValues() {
    const fieldValues = {};
    htmlIds.forEach(htmlId => {
        const element = document.getElementById(htmlId);
        if (element) {
            fieldValues[htmlId] = getInputValue(element);
        }
    });
    return fieldValues;
}
function getInputValue(element) {
    const inputElement = element;
    if (inputElement.type === "checkbox") {
        return inputElement.checked;
    }
    return inputElement.value;
}
