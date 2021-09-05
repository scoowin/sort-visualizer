import React, { useState, useEffect } from 'react';

import '../css/bootstrap.css';
import randomize from '../Algorithms/randomize';
import bubbleSort from '../Algorithms/bubbleSort';
import quickSort from '../Algorithms/quickSort';
import selectionSort from '../Algorithms/selectionSort';

function Sorter(props) {
    const { type, length } = props;

    //Array for mapping to render the bars
    const [arr, setArr] = useState([]);

    //Array to store width of bars
    const [width, setWidth] = useState([]);

    const [terminated, setTerminated] = useState(false);

    //Array to store id's of animation timeouts so that they can be cleared in case of termination
    let timeoutArray = [];

    //Initialize width array with random values from 1 to length of array
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

    //Run init function on Component Mounting
    useEffect(() => {
        init();
    }, []);

    //Disable Sorter initialization panel to avoid unwanted behaviours and run sort algorithm according to type selected
    const startSort = () => {
        document.getElementById('length').disabled = true;
        document.getElementById('type').disabled = true;
        document.getElementById('btn-init').disabled = true;
        switch (type) {
            case 'bubbleSort':
                timeoutArray = bubbleSort(width, swapWidth);
                break;
            case 'quickSort':
                timeoutArray = quickSort(width, swapWidth);
                break;
            case 'selectionSort':
                timeoutArray = selectionSort(width, swapWidth);
            default:
                break;
        }
    };

    //Terminate sort : Disable sort control buttons and enable Sorter initialization panel
    const stopSort = () => {
        document.getElementById('length').disabled = false;
        document.getElementById('type').disabled = false;
        document.getElementById('btn-init').disabled = false;
        setTerminated(true);
        for (let t of timeoutArray) {
            clearTimeout(t);
        }
    };

    //Function to animate the sorting of bars
    const swapWidth = (
        firstItemToBeSwapped,
        secondItemToBeSwapped,
        delay,
        clearTimeoutArray
    ) => {
        //Animation time in ms for each animation
        let anim_time = 500;

        const bars = document.getElementsByClassName('bar');
        let a = setTimeout(() => {
            bars[firstItemToBeSwapped].style.backgroundColor = 'red';
            bars[secondItemToBeSwapped].style.backgroundColor = 'red';
        }, anim_time * delay);
        clearTimeoutArray.push(a);
        delay++;
        let b = setTimeout(() => {
            let t = bars[firstItemToBeSwapped].style.width;
            bars[firstItemToBeSwapped].style.width =
                bars[secondItemToBeSwapped].style.width;
            bars[secondItemToBeSwapped].style.width = t;
        }, anim_time * delay);
        clearTimeoutArray.push(b);
        delay++;
        let c = setTimeout(() => {
            bars[firstItemToBeSwapped].style.backgroundColor = 'turquoise';
            bars[secondItemToBeSwapped].style.backgroundColor = 'turquoise';
        }, anim_time * delay);
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
