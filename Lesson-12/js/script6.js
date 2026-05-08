"use strict";
// Дано масив імен. Застосовуючи відповідне сортування та бінарний пошук визначити, чи є у масиві ім’я довжиною 5 символів і під яким індексом.
{
    let names = ["Ivan", "Petro", "Olga", "Anna", "Danylo", "Maxim"];
    const targetLength = 5;
    // Сортування за довжиною
    function sortByLength(arr) {
        for (let i = 1; i < arr.length; i++) {
            let key = arr[i];
            let j = i - 1;
            while (j >= 0 && arr[j].length > key.length) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }
    }
    // Рекурсивний бінарний пошук (за довжиною)
    function binarySearchByLength(arr, targetLength, start, end) {
        if (start > end) {
            return -1;
        }
        let mid = Math.floor((start + end) / 2);
        if (arr[mid].length === targetLength) {
            return mid;
        }
        if (arr[mid].length > targetLength) {
            return binarySearchByLength(arr, targetLength, start, mid - 1);
        }
        return binarySearchByLength(arr, targetLength, mid + 1, end);
    }
    document.write(`<b>Початковий масив:</b> [${names.join(", ")}]<br>`);
    sortByLength(names);
    document.write(`<b>Відсортований (за довжиною):</b> [${names.join(", ")}]<br><br>`);
    let resultIndex = binarySearchByLength(names, targetLength, 0, names.length - 1);
    if (resultIndex !== -1) {
        document.write(`Результат: Ім'я довжиною 5 символів знайдено! <br>`);
        document.write(`Це ім'я "<b>${names[resultIndex]}</b>", індекс у відсортованому масиві: <b>${resultIndex}</b>.`);
    }
    else {
        document.write(`Результат: Імен довжиною 5 символів не знайдено.`);
    }
}
