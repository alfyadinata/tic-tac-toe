document.addEventListener("DOMContentLoaded", function () {
    const app = document.getElementById('app');
    let currentPlayer = 'X';
    let scale = 3;
    let cells = 9;

    const handleStart = () => {
        if (scale < 3) {
            return alert("Minimum scale is 3");
        }
        document.getElementById('form').style.display = 'none';
        document.getElementById('app').style.setProperty('--scale', scale);
        document.getElementById('app').style.display = 'grid';

        scale = document.getElementById('scale').value;
        cells = Array.from({ length: scale * scale }, () => "");
        console.log("uhuhu", cells)
    }

    document.getElementById('start').addEventListener('click', handleStart);


    const draw = () => {
        app.innerHTML = '';
        app.style.setProperty('--scale', scale);

        const totalCell = scale * scale;
        
        for (let index = 0; index < totalCell; index++) {
            const newCell = document.createElement('div');

            newCell.classList.add('cell');
            newCell.dataset.index = index;
            newCell.textContent = cells[index];
            newCell.addEventListener('click', onClickCell);

            app.appendChild(newCell);
        }
    }

    const isWinnerByRow = () => {
        for (let index = 0; index < cells.length; index++) {
            const startCell = index * scale;
            const endCell = startCell + scale;
            const cellInRow = cells.slice(startCell, endCell);
            const result = cellInRow.every((cell) => cell === currentPlayer);

            if (result && cellInRow.length > 0) {
                return result;
            }
        }

        return false;
    }

    const isWinnerByDiagonal = () => {
        const leftToRight = [];
        const rightToLeft = [];
        for (let index = 0; index < scale; index++) {
            if (index > 0) {
                console.log('scalee', scale)
                console.log('apa', index * scale + 1);
            }
            leftToRight.push(index === 0 ? cells[0] : cells[index * scale + 1]);
            rightToLeft.push(cells[index * scale + (scale - 1 - index)]);
        }

        const isWinByleftToRight = leftToRight.every((cell) => cell === currentPlayer);
        const isWinByrightToLeft = rightToLeft.every((cell) => cell === currentPlayer);

        console.log('cell', cells)
        console.log('leftToRight',leftToRight)
        console.log('rightToLeft', rightToLeft)

        const result = isWinByleftToRight || isWinByrightToLeft || false;
 
        return result;
    }

    const isWinnerByVertical = () => {
        for (let index = 0; index < scale; index++) {
            const verticalRows = [];
            const cellIndex = index;

            for (let indexChild = 0; indexChild < scale; indexChild++) {
                verticalRows.push(cells[cellIndex + indexChild * scale]);
            }

            const result = verticalRows.every((cell) => cell === currentPlayer);

            if (result) {
                return true;
            }
        }
        return false;
    }


    const isHasAWinner = () => {
        console.log('isWinnerByRow', isWinnerByRow())
        console.log('isWinnerByVertical', isWinnerByVertical())
        console.log('isWinnerByDiagonal', isWinnerByDiagonal())
        return isWinnerByRow() || isWinnerByDiagonal() || isWinnerByVertical() || false;
    };

    const isDraw = () => cells.every((cell) => cell !== '');

    const onClickCell = (event) => {
        const { index } = event.target.dataset;

        if (cells[index] === '') {
            cells[index] = currentPlayer;

            draw();

            if (isHasAWinner()) {
                alert(`${currentPlayer} is win the game`);
                window.location.reload();
            } else if (isDraw()) {
                alert('draw');
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }

        }
    }

    draw();
});
