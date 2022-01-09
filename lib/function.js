const prompt = require('prompt-sync')({sigint: true});
function makeSequence(count, alp) {
    if (alp && alp.length !== 0){
        if (typeof alp === "string"){
            alp = alp.split('');
        }
        alp = alp.sort(() => Math.random() - 0.5);
        return alp.splice(0, count);
    }
}

function levelSelection(min, max) {
    let level = null;
    while (!(level >= min && level <= max)){
        if (level !== null){
            level = +prompt(`Вы ввели ${level}. Пожалуйста введите значение от ${min} до ${max}: `);
        } else {
            level = +prompt(`Скольки значное число загадать компьютеру? от ${min} до ${max}: `);
        }
    }
    return level;
}

function countingCowsAndBulls(userNumber, hiddenNumber) {
    let cows = 0;
    let bulls = 0;
    const arrayNumber = userNumber.split('');
    for (let index = 0; index < arrayNumber.length; index++) {
        const digit = arrayNumber[index];
        if(+digit === +hiddenNumber[index]) {
            bulls++;
            continue;
        }
        if (hiddenNumber.indexOf(+digit) !== -1) cows++;
    }
    return [cows, bulls];
}
module.exports = {makeSequence, levelSelection, countingCowsAndBulls}