export default function bubbleSort(arr, animate) {
    let delay = 1;
    let n = arr.length;
    let clearTimeoutArray = [];
    for (var i = 0; i < n - 1; i++) {
        for (var j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                var temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                animate(j, j + 1, delay, clearTimeoutArray);
                delay += 3;
            }
        }
    }
    return clearTimeoutArray;
}
