"use strict";
// Сформувати двовимірний масив (4*8) з номерами днів (описати окремий тип для днів). Заповнити його випадковим чином. Підрахувати для кожного рядка кількість неділь.
{
    const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];
    function generateDayMatrix(rows, cols) {
        return Array.from({ length: rows }, () => Array.from({ length: cols }, () => {
            const randomIndex = Math.floor(Math.random() * days.length);
            return days[randomIndex];
        }));
    }
    function analyzeRows(matrix) {
        document.write("<h3>Матриця днів тижня (4x8):</h3>");
        matrix.forEach((row, rowIndex) => {
            const sundayCount = row.reduce((count, day) => (day === "Нд" ? count + 1 : count), 0);
            document.write(`Рядок ${rowIndex + 1}: [ ${row.join(" , ")} ] — <b>Неділь: ${sundayCount}</b><br>`);
        });
    }
    const myMatrix = generateDayMatrix(4, 8);
    analyzeRows(myMatrix);
}
