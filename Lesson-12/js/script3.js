"use strict";
// Дано масив 30 випадкових цілих чисел. Підрахувати скільки було обмінів під час сортування включеннями.
{
    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function generateArray(length, min, max) {
        const arr = [];
        for (let i = 0; i < length; i++) {
            arr.push(getRandomNumber(min, max));
        }
        return arr;
    }
    function insertionSortWithStats(originalArray) {
        let swapsCount = 0;
        const arr = originalArray.slice();
        const n = arr.length;
        for (let i = 1; i < n; i++) {
            let key = arr[i];
            let j = i - 1;
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j = j - 1;
                swapsCount++;
            }
            arr[j + 1] = key;
        }
        return {
            sortedArray: arr,
            swaps: swapsCount
        };
    }
    const myNumbers = generateArray(30, 1, 100);
    const result = insertionSortWithStats(myNumbers);
    document.write(`<h2>Сортування включеннями</h2>`);
    document.write(`<p style="font-size: 20px;"><b>Початковий масив:</b><br> [${myNumbers.join(", ")}]</p>`);
    document.write(`<p style="font-size: 20px;"><b>Відсортований масив:</b><br> [${result.sortedArray.join(", ")}]</p>`);
    document.write(`<p style="font-size: 20px; color: blue;">Загальна кількість переміщень (обмінів): <b>${result.swaps}</b></p>`);
}
