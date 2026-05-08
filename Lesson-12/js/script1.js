"use strict";
// Дано масив 30 випадкових цілих чисел. Підрахувати скільки було обмінів під час сортування бульбашкою
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
    function getSortedData(originalArray) {
        let swapsCount = 0;
        const arr = originalArray.slice();
        const n = arr.length;
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - 1 - i; j++) {
                if (arr[j] > arr[j + 1]) {
                    const temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapsCount++;
                }
            }
        }
        return {
            sortedArray: arr,
            swaps: swapsCount
        };
    }
    const sourceArray = generateArray(30, 1, 100);
    const result = getSortedData(sourceArray);
    document.write(`<h2>Результати сортування бульбашкою</h2>`);
    document.write(`<p style="font-size: 20px;"><b>Початковий масив:</b><br> [${sourceArray.join(", ")}]</p>`);
    document.write(`<p style="font-size: 20px;"><b>Відсортований масив:</b><br> [${result.sortedArray.join(", ")}]</p>`);
    document.write(`<p style="font-size: 20px; color: blue;">Загальна кількість обмінів під час сортування: <b>${result.swaps}</b></p>`);
}
