"use strict";
// Для розглянутих методів сортування спробувати вивести етапи сортування шляхом виведення відповідних таблиць за зразком. Тобто кожного разу після обміну елементів вивести поточний стан масиву на екран.
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
    function drawStep(arr, activeIdx) {
        document.write(`<div style="display: flex; align-items: center; font-family: monospace; font-size: 18px; margin-bottom: 5px;">`);
        document.write(`<span style="margin-right: 8px;">[</span>`);
        arr.forEach((num, idx) => {
            let borderStyle = (idx === activeIdx)
                ? `border: 2px dashed red; background-color: #fff0f0;`
                : `border: 2px solid transparent;`;
            document.write(`
                <div style="width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; ${borderStyle} margin: 0 2px;">
                    ${num}
                </div>
            `);
            if (idx < arr.length - 1)
                document.write(`<span style="margin: 0 4px;">,</span>`);
        });
        document.write(`<span style="margin-left: 8px;">]</span>`);
        document.write(`</div>`);
        document.write(`<div style="color: #3498db; font-size: 20px; margin-left: 50px; margin-bottom: 10px;">↓</div>`);
    }
    function bubbleSortVisual(data) {
        let arr = [...data];
        document.write(`<h3>1. Сортування бульбашкою</h3>`);
        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = 0; j < arr.length - 1 - i; j++) {
                if (arr[j] > arr[j + 1]) {
                    let temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    drawStep(arr, j + 1);
                }
            }
        }
    }
    function shakerSortVisual(data) {
        let arr = [...data];
        document.write(`<h3>2. Сортування змішуванням</h3>`);
        let left = 0;
        let right = arr.length - 1;
        while (left < right) {
            for (let i = left; i < right; i++) {
                if (arr[i] > arr[i + 1]) {
                    let temp = arr[i];
                    arr[i] = arr[i + 1];
                    arr[i + 1] = temp;
                    drawStep(arr, i + 1);
                }
            }
            right--;
            for (let i = right; i > left; i--) {
                if (arr[i] < arr[i - 1]) {
                    [arr[i], arr[i - 1]] = [arr[i - 1], arr[i]];
                    drawStep(arr, i - 1);
                }
            }
            left++;
        }
    }
    function insertionSortVisual(data) {
        let arr = [...data];
        document.write(`<h3>3. Сортування включеннями</h3>`);
        for (let i = 1; i < arr.length; i++) {
            let key = arr[i];
            let j = i - 1;
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
            drawStep(arr, j + 1);
        }
    }
    const testData = generateArray(5, 1, 100);
    document.write(`<p style="font-size: 20px;"><b>Початковий масив:</b><br> [${testData.join(", ")}]</p>`);
    document.write(`<hr>`);
    bubbleSortVisual([...testData]);
    document.write(`<hr>`);
    shakerSortVisual([...testData]);
    document.write(`<hr>`);
    insertionSortVisual([...testData]);
}
