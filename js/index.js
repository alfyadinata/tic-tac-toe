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


    const isHasAWinner = () => {
        const diagonalGapRightToLeft = scale - 2;
        const diagonalGapLeftToRight = scale;

        for (let index = 1; index < scale; index++) {
            const cell = cells[index];
        }
    };

    const isDraw = cells.every((cell) => cell !== '');

    const onClickCell = (event) => {
        const { index } = event.target.dataset;

        if (cells[index] === '') {
            cells[index] = currentPlayer;

            draw();

            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

            if (!isHasAWinner()) {
                return 'congrats';
            }

            if (isDraw()) {
                alert('draw');
            }

        }
    }

    draw();
});
