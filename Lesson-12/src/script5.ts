// Дано масив імен. Застосовуючи відповідне сортування та бінарний пошук визначити, чи є у масиві ім’я «Olga» і під яким індексом.
{
    let names: string[] = ["Ivan", "Olga", "Petro", "Anna", "Danylo"];
    let target = "Olga";

    // Сортування включеннями
    function insertionSort(arr: string[]) {
        for (let i = 1; i < arr.length; i++) {
            let key = arr[i];
            let j = i - 1;
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }
    }

    // Рекурсивний бінарний пошук
    function binarySearchRecursive(arr: string[], x: string, start: number, end: number): number {
        if (start > end) {
            return -1; 
        }
        let mid = Math.floor((start + end) / 2);
        if (arr[mid] === x) {
            return mid;
        }
        if (arr[mid] > x) {
            return binarySearchRecursive(arr, x, start, mid - 1);
        }
        return binarySearchRecursive(arr, x, mid + 1, end);
    }

    document.write(`<b>Початковий масив:</b> [${names.join(", ")}]<br>`);
    insertionSort(names);
    document.write(`<b>Відсортований масив:</b> [${names.join(", ")}]<br><br>`);
    let index = binarySearchRecursive(names, target, 0, names.length - 1);

    if (index !== -1) {
        document.write(`Результат: Ім'я "<b>${target}</b>" знайдено у відсортованому масиві за індексом <b>${index}</b>.`);
    } else {
        document.write(`Результат: Ім'я "<b>${target}</b>" у масиві не знайдено.`);
    }
}