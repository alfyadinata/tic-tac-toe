document.addEventListener('DOMContentLoaded', function () {
    const app = document.getElementById('app');
    let currentPlayer = 'X';
    let scale = 3;
    let cells = scale * scale;

    const generatePlayer = () => document.getElementById('player').innerText = currentPlayer;

    const handleStart = () => {
        scale = document.getElementById('scale').value;

        if (scale < 3) {
            return alert('Minimum scale is 3');
        }
        document.getElementById('form').style.display = 'none';
        document.getElementById('app').style.setProperty('--scale', scale);
        document.getElementById('app').style.display = 'grid';
        document.getElementById('info').style.display = 'block';
        document.getElementById('loading').style.display = 'none';

        cells = Array.from({ length: scale * scale }, () => '');

        generatePlayer();
        draw();
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

    const isWinnerByHorizontal = () => {
        for (let index = 0; index < scale; index++) {
            const startCell = index * scale;
            const endCell = Number(startCell) + Number(scale);
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
            leftToRight.push(cells[index * scale + index]);
            rightToLeft.push(cells[index * scale + (scale - 1 - index)]);
        }

        const isWinByleftToRight = leftToRight.every((cell) => cell === currentPlayer);
        const isWinByrightToLeft = rightToLeft.every((cell) => cell === currentPlayer);

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
        return isWinnerByHorizontal() || isWinnerByDiagonal() || isWinnerByVertical() || false;
    };

    const isDraw = () => cells.every((cell) => cell !== '');

    const onClickCell = (event) => {
        const { index } = event.target.dataset;

        if (cells[index] === '') {
            cells[index] = currentPlayer;

            draw();

            if (isHasAWinner()) {
                Swal.fire({
                    title: "Good Job !",
                    text: `${currentPlayer} is win the game`,
                    icon: 'success',
                    confirmButtonText: "Restart ?",
                }).then(() => {
                    window.location.reload();
                });
            } else if (isDraw()) {
                Swal.fire({
                    title: "Draw !",
                    text: 'No one is win the game',
                    icon: 'info',
                    confirmButtonText: "Restart ?",
                }).then(() => {
                    window.location.reload();
                });
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
            generatePlayer();
        }
    }

    draw();
});
