const prompt = require('prompt-sync')({sigint: true});
const { makeSequence, levelSelection, countingCowsAndBulls } = require('./lib/function') 

const alphabet = [1,2,3,4,5,6,7,8,9,0]; // Символы для загадывания
const numberMoves = 10; // Максимальное количества ходов
let countMoves = 0; // Количество ходов пользователя
let userNumber = null; // Переменная для пользовательского ввода

console.log(`Игра "БЫКИ и КОРОВЫ"!
Компьютер загадывает число из нескольких различающихся цифр (от 3 до 6). Игроку дается несколько попыток на то, чтобы угадать это число.
После каждой попытки компьютер сообщает количество совпавших цифр стоящих не на своих местах, а также количество правильных цифр на своих местах.
Например загаданное число: 56478 предположение игрока: 52976
ответ: совпавших цифр не на своих местах - 1 (6), цифр на своих местах - 2 (5 и 7)
игра ведется до окончания количества ходов (${numberMoves}) либо до отгадывания\n`);

function game() {
    let level = levelSelection(3,6); // Выбор уровня от 3 до 6 цифр
    console.log(`\nОтлично игра началась! Компьютер загадал ${level}-значное число, цифры в котором не повторяются!`)
    const hiddenNumber = makeSequence(level, alphabet); // Загадываем число
    // console.log(`Загаданное число = ${hiddenNumber}`);
    while (hiddenNumber.join('') !== userNumber){
        if (numberMoves === countMoves) {
            console.log(`Попытки закончились, вы проиграли, загаданное число = ${hiddenNumber.join('')}`);
            return false;
        }
        countMoves++;
        userNumber = prompt(`Введите последовательность из ${level} цифр: `);
        if (userNumber.length !== level) {
            console.log(`Вы ввесли последовательность из ${userNumber.length} знаков, давайте еще раз.`);
            continue
        };
        if (!userNumber.split('').every( (digit, index, array) => array.indexOf(digit) === index)) {
            console.log('В Вашем числе повторяются цифры, попробуйте снова');
            continue;
        } 

        let [cows, bulls] = countingCowsAndBulls(userNumber, hiddenNumber);
        console.log(`Cовпавших цифр не на своих местах - ${cows}, цифр на своих местах - ${bulls}`);
    }
    console.log(`Поздравляем, вы победили!`);
}

game();