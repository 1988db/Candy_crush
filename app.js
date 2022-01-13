document.addEventListener('DOMContentLoaded', ()=> {
    const grid = document.querySelector('.grid');
    const scoreDisplay = document.querySelector('#score');
    const width = 8;
    const squares = [];
    let score = 0;
    const candyColors = [
        'red',
        'yellow',
        'orange',
        'purple',
        'green',
        'blue'
    ];

    //Create board
    function createBoard() {
        for (let i=  0; i < width * width; i++) {
            const square = document.createElement('div');
            square.setAttribute('draggable', true);
            square.setAttribute('id', i);
            let randomColor = Math.floor(Math.random() * candyColors.length);
            square.style.backgroundColor = candyColors[randomColor];
            grid.appendChild(square);
            squares.push(square);
        }
    }

    createBoard();
    //Drah the candies
    let colorBeingDragged;
    let colorBeingReplaced;
    let squareIdBeingDragged;
    let squareIdBeingReplaced;

    //Drag the candies
    squares.forEach(square => square.addEventListener('dragstart', dragStart));
    squares.forEach(square => square.addEventListener('dragend', dragEnd));
    squares.forEach(square => square.addEventListener('dragover', dragOver));
    squares.forEach(square => square.addEventListener('dragenter', dragEnter));
    squares.forEach(square => square.addEventListener('dragleave', dragLeave));
    squares.forEach(square => square.addEventListener('drop', dragDrop));

    function dragStart() {
        colorBeingDragged = this.style.backgroundColor;
        squareIdBeingDragged = parseInt(this.id);
        console.log(colorBeingDragged)
        console.log(this.id, 'dragStart');
    }

    function dragOver(e) {
        e.preventDefault();
        console.log(this.id, 'dragOver');
    }

    function dragEnter(e) {
        e.preventDefault();
        console.log(this.id, 'dragEnter');
    }

    function dragLeave() {
        console.log(this.id, 'dragLeave');
    }

    
    function dragEnd() {
        console.log(this.id, 'dragEnd');
        //what is valid move?
        let validMoves = [
            squareIdBeingDragged -1,
            squareIdBeingDragged - width,
            squareIdBeingDragged + 1,
            squareIdBeingDragged + width
        ];
        let validMove = validMoves.includes(squareIdBeingReplaced);

        if (squareIdBeingReplaced && validMove) {
            squareIdBeingReplaced = null;            
        } else if (squareIdBeingReplaced && !validMove) {
            squares[squareIdBeingReplaced].style.backgroundColor = colorBeingReplaced;
            squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged;
        } else {
            squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged;
        }
    }

    function dragDrop() {
        console.log(this.id, 'dragDrop');
        colorBeingReplaced = this.style.backgroundColor;
        console.log(colorBeingReplaced)
        squareIdBeingReplaced = parseInt(this.id);
        this.style.backgroundColor = colorBeingDragged;
        squares[squareIdBeingDragged].style.backgroundColor = colorBeingReplaced;
    }

    //checking for matches
    const forbiddenCheckIndexesForThree = [
        6,7,
        14,15,
        22,23,
        30,31,
        38,39,
        46,47,
        54,55
    ];
    const forbiddenCheckIndexesForFour = [
        5,6,7,
        13,14,15,
        21,22,23,
        29,30,31,
        37,38,39,
        45,46,47,
        53,54,55
    ];
    const forbiddenCheckIndexesForFive = [
        4,5,6,7,
        12,13,14,15,
        20,21,22,23,
        28,29,30,31,
        36,37,38,39,
        44,45,46,47,
        52,53,54,55
    ];
    //check row of three
    function checkRowForThree() {
        for (i = 0; i < 62; i++) {
            let rowOfThree = [i, i+1, i+2];
            let decidedColor = squares[i].style.backgroundColor;
            const isBlank = squares[i].style.backgroundColor === 'white';

            if (forbiddenCheckIndexesForThree.includes(i)) {
                continue;
            }
            if (rowOfThree.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
                score += 3;
                scoreDisplay.innerText = score;
                rowOfThree.forEach(index => {
                    squares[index].style.backgroundColor = 'white';
                })
            }
        }
    }   

    function checkColumnForThree() {
        for (i = 0; i < 48; i++) {
            let columnOfThree = [i, i+width, i+width*2];
            let decidedColor = squares[i].style.backgroundColor;
            const isBlank = squares[i].style.backgroundColor === 'white';

            if (columnOfThree.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
                score += 3;
                scoreDisplay.innerText = score;
                columnOfThree.forEach(index => {
                    squares[index].style.backgroundColor = 'white';
                })
            }
        }
    }

    function checkRowForFour() {
        for (i = 0; i < 61; i++) {
            let rowOfFour = [i, i+1, i+2, i+3];
            let decidedColor = squares[i].style.backgroundColor;
            const isBlank = squares[i].style.backgroundColor === 'white';

            if (forbiddenCheckIndexesForFour.includes(i)) {
               continue;
            }
            else if (rowOfFour.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
                score += 4;
                scoreDisplay.innerText = score;
                rowOfFour.forEach(index => {
                    squares[index].style.backgroundColor = 'white';
                })
            }
        }
    }

    function checkColumnForFour() {
        for (i = 0; i < 40; i++) {
            let columnOfFour = [i, i+width, i+width*2, i+width*3];
            let decidedColor = squares[i].style.backgroundColor;
            const isBlank = squares[i].style.backgroundColor === 'white';

            if (columnOfFour.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
                score += 4;
                scoreDisplay.innerText = score;
                columnOfFour.forEach(index => {
                    squares[index].style.backgroundColor = 'white';
                })
            }
        }
    }

    function checkRowForFive() {
        for (i = 0; i < 60; i++) {
            let rowOfFive = [i, i+1, i+2, i+3, i+4];
            let decidedColor = squares[i].style.backgroundColor;
            const isBlank = squares[i].style.backgroundColor === 'white';

            if (forbiddenCheckIndexesForFive.includes(i)) {
                continue;
            }
            else if (rowOfFive.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
                score += 5;
                scoreDisplay.innerText = score;
                rowOfFive.forEach(index => {
                    squares[index].style.backgroundColor = 'white';
                })
            }
        }
    }

    function checkColumnForFive() {
        for (i = 0; i < 32; i++) {
            let columnOfFive = [i, i+width, i+width*2, i+width*3, i+width*4];
            let decidedColor = squares[i].style.backgroundColor;
            const isBlank = squares[i].style.backgroundColor === 'white';

            if (columnOfFive.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
                score += 5;
                scoreDisplay.innerText = score;
                columnOfFive.forEach(index => {
                    squares[index].style.backgroundColor = 'white';
                })
            }
        }
    }
    window.setInterval(checkRowForFive, 100);
    window.setInterval(checkColumnForFive, 100)
    window.setInterval(checkRowForFour, 100);
    window.setInterval(checkColumnForFour, 100)
    window.setInterval(checkRowForThree, 100);
    window.setInterval(checkColumnForThree, 100);
    

})