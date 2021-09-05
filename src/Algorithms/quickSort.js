export default function quickSort(arr, animate) {
    let delay = 1;
    let clearTimeoutArray = [];

    let stack = [];

    stack.push(0);
    stack.push(arr.length - 1);

    while (stack[stack.length - 1] >= 0) {
        let end = stack.pop();
        let start = stack.pop();

        const pivotValue = arr[end];
        let pivotIndex = start;
        for (let i = start; i < end; i++) {
            if (arr[i] < pivotValue) {
                [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
                animate(i, pivotIndex, delay, clearTimeoutArray);
                delay += 3;
                pivotIndex++;
            }
        }

        [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];

        animate(pivotIndex, end, delay, clearTimeoutArray);
        delay += 3;

        if (pivotIndex - 1 > start) {
            stack.push(start);
            stack.push(pivotIndex - 1);
        }

        if (pivotIndex + 1 < end) {
            stack.push(pivotIndex + 1);
            stack.push(end);
        }
    }
    return clearTimeoutArray;
}
