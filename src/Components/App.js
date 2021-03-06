import React, { useState } from 'react';
import Sorter from './Sorter';

import '../css/bootstrap.css';
import '../index.css';

function App() {
    const [sortType, setSortType] = useState('');
    const [sortLength, setSortLength] = useState(0);
    const [showSorter, setShowSorter] = useState(false);

    function handleLengthChange(e) {
        let val = e.target.value;
        if (val > 100) {
            val = 100;
        }
        if (val < 0) {
            val = 0;
        }
        setSortLength(val);
    }

    function handleTypeChange(e) {
        setSortType(e.target.value);
    }

    function init() {
        //Destroy the Sorter Component and add it again so it initializes correctly
        if (sortLength !== 0 && sortType !== '') {
            setShowSorter(false);
            setTimeout(() => {
                setShowSorter(true);
            }, 0);
        }
    }

    return (
        <div className="container-fluid">
            <h1 className="text-center h3">Sorting Algorithm Visualizer</h1>
            <div className="row">
                <div className="col-12 col-sm-4 text-center">
                    <label htmlFor="length">Length of array to be sorted</label>
                    <input
                        className="m-2"
                        type="number"
                        min="1"
                        max="100"
                        name="length"
                        id="length"
                        onChange={handleLengthChange}
                        value={sortLength}
                    />
                </div>
                <div className="col-12 col-sm-4 text-center">
                    <label htmlFor="type">Sorting algorithm</label>
                    <select
                        className="m-2"
                        name="type"
                        id="type"
                        onChange={handleTypeChange}
                        value={sortType}
                    >
                        <option value=""></option>
                        <option value="bubbleSort">Bubble Sort</option>
                        <option value="quickSort">Quick Sort</option>
                        <option value="selectionSort">Selection Sort</option>
                    </select>
                </div>
                <div className="col-12 col-sm-4 text-center">
                    <button
                        className="btn btn-info p-1"
                        onClick={init}
                        id="btn-init"
                    >
                        Intialize sorter
                    </button>
                </div>
            </div>
            {showSorter && <Sorter type={sortType} length={sortLength} />}
        </div>
    );
}

export default App;
