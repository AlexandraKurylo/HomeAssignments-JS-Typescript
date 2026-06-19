"use strict"

const globalStringsArray = ["Привіт", "JS2026", "Тест 123", "Київ", "Рядок без цифр", "АЕОУ", "БВГД", "Автомобіль 1", "Будинок 3", "Ніч", "Текст"];
const globalSampleText = "Привіт! Тут є кілька чисел: 45, 102 та 7. Також тут є пунктуація... Чи не так? Сьогодні 19.06.2026, а у гаманці є 4142-3433-2323-3434 та 55 двоцифрових чисел, наприклад 23 і 88.";

function renderTaskCard(taskNum, taskTitle, inputDataDescription, resultData) {
    const container = document.getElementById('tasksContainer');
    
    if (container) {
        const card = document.createElement('div');
        card.className = 'task-card';
        const title = document.createElement('h3');
        title.className = 'task-card__title';
        title.innerText = `Задача ${taskNum}. ${taskTitle}`;
        const dataBlock = document.createElement('div');
        dataBlock.className = 'task-card__data';
        dataBlock.innerText = `Вхідні дані: ${inputDataDescription}`;
        const outputBlock = document.createElement('div');
        outputBlock.className = 'task-card__output';
        
        if (Array.isArray(resultData)) {
            outputBlock.innerText = resultData.length > 0 ? `Результат: [ ${resultData.join(', ')} ]` : 'Результат: (нічого не знайдено)';
            if (resultData.length === 0) outputBlock.classList.add('task-card__output--empty');
        } else {
            outputBlock.innerText = `Результат: ${resultData}`;
        }
        card.append(title, dataBlock, outputBlock);
        container.append(card);
    } else {
        console.error('Помилка: елемент #tasksContainer не знайдено в DOM.');
    }
}

// Задача 1. Рядки, у яких є цифри
function runTask1(arr = globalStringsArray) {
    renderTaskCard(1, "Рядки з цифрами", JSON.stringify(arr), arr.filter(str => /\d/.test(str)));
}
// Задача 2. Рядки, у яких немає цифр
function runTask2(arr = globalStringsArray) {
    renderTaskCard(2, "Рядки без цифр", JSON.stringify(arr), arr.filter(str => !/\d/.test(str)));
}
// Задача 3. Рядки, у яких є голосні літери
function runTask3(arr = globalStringsArray) {
    renderTaskCard(3, "Рядки з голосними літерами", JSON.stringify(arr), arr.filter(str => /[аеиоуюяіїєaeiouy]/iu.test(str)));
}
// Задача 4. Рядки, у яких немає голосних літер
function runTask4(arr = globalStringsArray) {
    renderTaskCard(4, "Рядки БЕЗ голосних літер", JSON.stringify(arr), arr.filter(str => !/[аеиоуюяіїєaeiouy]/iu.test(str)));
}
// Задача 5. Рядки, у яких є або цифра 1 або цифра 3
function runTask5(arr = globalStringsArray) {
    renderTaskCard(5, "Рядки, що містять 1 або 3", JSON.stringify(arr), arr.filter(str => /[13]/.test(str)));
}
// Задача 6. Вивести усі числа, які є у тексті
function runTask6(text = globalSampleText) {
    renderTaskCard(6, "Усі числа в тексті", text, text.match(/\d+/g) || []);
}
// Задача 7. Знайти усі знаки пунктуації
function runTask7(text = globalSampleText) {
    renderTaskCard(7, "Усі знаки пунктуації", text, text.match(/\p{P}/gu) || []);
}
// Задача 8. Вивести усі складові, які розділені розділовими знаками
function runTask8(text = globalSampleText) {
    renderTaskCard(8, "Складові, розділені знаками", text, text.split(/[\p{P}\s]+/gu).filter(w => w.length > 0));
}
// Задача 9. Перевірити, чи містить рядок дату у форматі dd.mm.yyyy
function runTask9(text = globalSampleText) {
    const hasDate = /\b\d{2}\.\d{2}\.\d{4}\b/.test(text);
    renderTaskCard(9, "Перевірка наявності дати dd.mm.yyyy", text, hasDate ? "Так, містить дату!" : "Ні, дати немає");
}
// Задача 10. Підрахувати кількість двоцифрових чисел у рядку
function runTask10(text = globalSampleText) {
    const matches = text.match(/(?<!\d)\d{2}(?!\d)/g) || [];
    renderTaskCard(10, "Кількість двоцифрових чисел", text, `${matches.length} (знайдено: ${matches.join(', ')})`);
}
// Задача 11. Визначити чи може бути рядок номером банківської картки
function runTask11(text = globalSampleText) {
    renderTaskCard(11, "Пошук номерів банківських карток", text, text.match(/\b\d{4}-?\d{4}-?\d{4}-?\d{4}\b/g) || []);
}
// Задача 12. Визначити, чи є адреса сайту урядовою (.gov)
function runTask12(url1 = "https://company.gov.ua", url2 = "https://my-cool-site.com") {
    const regex = /\.gov\b/;
    const resultText = `Для "${url1}": ${regex.test(url1)} | Для "${url2}": ${regex.test(url2)}`;
    renderTaskCard(12, "Перевірка урядового сайту (.gov)", "Два окремих URL", resultText);
}
// Задача 13. Вибрати усі роки між 2020 та 2049 з повідомлення
function runTask13(text = "Події відбувалися у 2019 році, потім у 2023, плануються на 2035, 2045 та наприкінці у 2051 році.") {
    renderTaskCard(13, "Роки між 2020 та 2049", text, text.match(/\b20[2-4]\d\b/g) || []);
}
// Задача 14. Перевірити, чи є телефон оператором Київстар
// 	067, 068, 096, 097, 098, 077
function runTask14(p1 = "+380671234567", p2 = "+380771234567") {
    const regex = /^\+?3?8?0(6[78]|77|9[678])\d{7}$/;
    const resultText = `Номер ${p1}: ${regex.test(p1)} | Номер ${p2}: ${regex.test(p2)}`;
    renderTaskCard(14, "Перевірка оператора Київстар", "Два телефонні номери", resultText);
}
// Задача 15. Замінити пробіл на дефіс у ПІ
function runTask15(input = "Петренко Олександр") {
    renderTaskCard(15, "Заміна пробілу на дефіс у імені", input, input.replace(/\s+/, "-"));
}
// Задача 16. Трансформація дати з «день.місяць.рік» у «місяць/рік»
function runTask16(inputDate = "19.06.2026") {
    renderTaskCard(16, "Форматування дати у місяць/рік", inputDate, inputDate.replace(/^\d{2}\.(\d{2})\.(\d{4})$/, "$1/$2"));
}
// Головний запуск усіх завдань при старті сторінки
window.onload = function() {
    runTask1();
    runTask2();
    runTask3();
    runTask4();
    runTask5();
    runTask6();
    runTask7();
    runTask8();
    runTask9();
    runTask10();
    runTask11();
    runTask12();
    runTask13();
    runTask14();
    runTask15();
    runTask16();
};