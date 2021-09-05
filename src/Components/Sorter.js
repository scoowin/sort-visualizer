import React, { useState, useEffect } from 'react';

import '../css/bootstrap.css';
import randomize from '../Algorithms/randomize';
import bubbleSort from '../Algorithms/bubbleSort';

function Sorter(props) {
    const { type, length, sorting, setSorting } = props;

    const [arr, setArr] = useState([]);
    const [width, setWidth] = useState([]);
    const [terminated, setTerminated] = useState(false);

    let timeoutArray = [];

    const init = () => {
        let a = [];
        let w = [];
        let l = length;
        for (let i = 0; i != l; i++) {
            a.push(i);
            w.push(i + 1);
        }
        setArr(a);
        w = randomize(w);
        setWidth(w);
    };

    useEffect(() => {
        init();
    }, []);

    const startSort = () => {
        document.getElementById('length').disabled = true;
        document.getElementById('type').disabled = true;
        document.getElementById('btn-init').disabled = true;
        timeoutArray = bubbleSort(width, swapWidth);
    };

    const stopSort = () => {
        document.getElementById('length').disabled = false;
        document.getElementById('type').disabled = false;
        document.getElementById('btn-init').disabled = false;
        setTerminated(true);
        for (let t of timeoutArray) {
            clearTimeout(t);
        }
    };

    const swapWidth = (
        firstItemToBeSwapped,
        secondItemToBeSwapped,
        delay,
        clearTimeoutArray
    ) => {
        const bars = document.getElementsByClassName('bar');
        let a = setTimeout(() => {
            bars[firstItemToBeSwapped].style.backgroundColor = 'red';
            bars[secondItemToBeSwapped].style.backgroundColor = 'red';
        }, 500 * delay);
        clearTimeoutArray.push(a);
        delay++;
        let b = setTimeout(() => {
            let t = bars[firstItemToBeSwapped].style.width;
            bars[firstItemToBeSwapped].style.width =
                bars[secondItemToBeSwapped].style.width;
            bars[secondItemToBeSwapped].style.width = t;
        }, 500 * delay);
        clearTimeoutArray.push(b);
        delay++;
        let c = setTimeout(() => {
            bars[firstItemToBeSwapped].style.backgroundColor = 'turquoise';
            bars[secondItemToBeSwapped].style.backgroundColor = 'turquoise';
        }, 500 * delay);
        clearTimeoutArray.push(c);
    };

    return (
        <div>
            <div className="row m-2">
                <div className="col-6 text-center">
                    <button
                        className="btn btn-primary"
                        onClick={startSort}
                        disabled={terminated}
                    >
                        Start
                    </button>
                </div>
                <div className="col-6 text-center">
                    <button
                        className="btn btn-danger"
                        onClick={stopSort}
                        disabled={terminated}
                    >
                        Terminate
                    </button>
                </div>
            </div>
            <div>
                {arr.map((x) => {
                    let w = width[x] + 'vw';
                    return (
                        <div
                            className="bar"
                            key={x}
                            style={{
                                backgroundColor: 'turquoise',
                                height: '5px',
                                width: w,
                                margin: '2px 0px 2px 0px',
                            }}
                        ></div>
                    );
                })}
            </div>
        </div>
    );
}

export default Sorter;
