document.addEventListener("DOMContentLoaded", function () {
    const app = document.getElementById('app');
    let currentPlayer = 'X';
    const scale = 3;
    let cells = Array.from({ length: scale * scale }, () => "");

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
        const firstDiagonal = [];
        const secondDiagonal = [];

        for (let index = 0; index < cells.length; index++) {
            firstDiagonal.push(cells[index * scale + 1]);
            secondDiagonal.push(cells[index * scale + (scale - 1 - index)]);
        }

        const isWinByFirstDiagonal = firstDiagonal.every((cell) => cell === currentPlayer);
        const isWinBySecondDiagonal = secondDiagonal.every((cell) => cell === currentPlayer);
        const result = isWinByFirstDiagonal || isWinBySecondDiagonal || false;
 
        return result;
    }


    const isHasAWinner = () => {
        console.log("isWinnerByRow()", isWinnerByRow());
        console.log("isWinnerByDiagonal", isWinnerByDiagonal());
        console.log("cells", cells)
        return isWinnerByRow() || isWinnerByDiagonal() || false;
    };

    const isDraw = () => cells.every((cell) => cell !== '');

    const onClickCell = (event) => {
        const { index } = event.target.dataset;

        if (cells[index] === '') {
            cells[index] = currentPlayer;

            draw();

            if (isHasAWinner()) {
                console.log("done", cells);
            }

            if (isDraw()) {
                alert('draw');
            }

            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }

    draw();
});
