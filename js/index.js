document.addEventListener('DOMContentLoaded', function () {
    const app = document.getElementById('app');
    let currentPlayer = 'X';
    let scale = 3;
    let cells = scale * scale;

    const generatePlayer = () => document.getElementById('player').innerText = currentPlayer;

    const handleStart = () => {
        scale = document.getElementById('scale').value;

        if (scale < 3 || scale > 100) {
            return resultDialog({
                title: "Oops !",
                text: 'The maximum and minimum scale is between 3-100.',
                icon: 'error',
            });
        }
        document.getElementById('form').style.display = 'none';
        document.getElementById('app').style.setProperty('--scale', scale);
        document.getElementById('app').style.display = 'grid';
        document.getElementById('info').style.display = 'block';

        cells = Array.from({ length: scale * scale }, () => '');

        generatePlayer();
        draw();
    }

    document.getElementById('start').addEventListener('click', handleStart);


    const draw = () => {
        app.innerHTML = '';
        app.style.setProperty('--scale', scale);

        const cellSize = `${app.clientHeight / cells.length * 100}px`;
        const totalCell = scale * scale;
        
        for (let index = 0; index < totalCell; index++) {
            const newCell = document.createElement('div');
            newCell.classList.add('cell');
            newCell.dataset.index = index;
            newCell.textContent = cells[index];
            newCell.addEventListener('click', onClickCell);
            newCell.style.width = cellSize;
            newCell.style.height = cellSize;

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

    const resultDialog = ({title, text, icon}) => {
        return Swal.fire({
            title: title,
            text: text,
            icon: icon,
            confirmButtonText: "Restart ?",
        }).then(() => {
            window.location.reload();
        });
    }

    const onClickCell = (event) => {
        const { index } = event.target.dataset;

        if (cells[index] === '') {
            cells[index] = currentPlayer;

            draw();

            if (isHasAWinner()) {
                return resultDialog({
                    title: 'Good Job !',
                    text: `${currentPlayer} is win the game.`,
                    icon: 'success',
                });
            } else if (isDraw()) {
                return resultDialog({
                    title: "Draw !",
                    text: 'No one is win the game',
                    icon: 'info',
                });
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }

            generatePlayer();
        }
    }

    draw();
});
