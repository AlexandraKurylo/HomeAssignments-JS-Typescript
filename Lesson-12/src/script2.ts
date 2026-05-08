// Дано масив 30 випадкових цілих чисел. Підрахувати скільки було обмінів під час сортування змішуванням.
{
    function getRandomNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function generateArray(length: number, min: number, max: number): number[] {
        const arr: number[] = [];
        for (let i = 0; i < length; i++) {
            arr.push(getRandomNumber(min, max));
        }
        return arr;
    }


    function shakerSortWithStats(originalArray: number[]) {
        let swapsCount = 0;
        const arr = originalArray.slice();
        
        let left = 0;
        let right = arr.length - 1;

        while (left < right) {
            for (let i = left; i < right; i++) {
                if (arr[i] > arr[i + 1]) {
                    const temp = arr[i];
                    arr[i] = arr[i + 1];
                    arr[i + 1] = temp;
                    swapsCount++;
                }
            }
            right--; 

            for (let i = right; i > left; i--) {
                if (arr[i] < arr[i - 1]) {
                    const temp = arr[i];
                    arr[i] = arr[i - 1];
                    arr[i - 1] = temp;
                    swapsCount++;
                }
            }
            left++;
        }

        return {
            sortedArray: arr,
            swaps: swapsCount
        };
    }

    const myNumbers = generateArray(30, 1, 100);
    const result = shakerSortWithStats(myNumbers);

    document.write(`<h2>Сортування змішуванням</h2>`);
    document.write(`<p style="font-size: 20px;"><b>Початковий масив:</b><br> [${myNumbers.join(", ")}]</p>`);
    document.write(`<p style="font-size: 20px;"><b>Відсортований масив:</b><br> [${result.sortedArray.join(", ")}]</p>`);
    document.write(`<p style="font-size: 20px; color: blue;">Кількість обмінів під час сортування змішуванням: <b>${result.swaps}</b></p>`);
}