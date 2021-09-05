export default function selectionSort(arr, animate) {
    let delay = 1;
    let clearTimeoutArray = [];

    let n = arr.length;

    for (let i = 0; i < n; i++) {
        let min = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[min]) {
                min = j;
            }
        }
        if (min != i) {
            let tmp = arr[i];
            arr[i] = arr[min];
            arr[min] = tmp;
            animate(i, min, delay, clearTimeoutArray);
            delay += 3;
        }
    }
    return clearTimeoutArray;
}
