document.addEventListener('DOMContentLoaded', () => {
    const nrProceseInput = document.getElementById('nrProcese');
    const calculateButton = document.getElementById('calculateButton');
    const inputsContainer = document.getElementById('inputsContainer');
    const resultHeader = document.getElementById('resultHeader');
    const resultContainer = document.getElementById('resultContainer');
    const detailedResultContainer = document.getElementById('detailedResultContainer');
    const averageExecutionContainer = document.getElementById('averageExecutionContainer');
    const averageWaitContainer = document.getElementById('averageWaitContainer');

    nrProceseInput.addEventListener('input', () => {
        inputsContainer.innerHTML = ''; 
        const value = parseInt(nrProceseInput.value, 10);
        if (!isNaN(value) && value > 0) {
            for (let i = 0; i < value; i++) {
                const input = document.createElement('input');
                input.type = 'text';
                input.placeholder = getPlaceholder(i) + ' (durata)';
                input.classList.add('process-input');
                input.addEventListener('keypress', (e) => {
                    if (!/\d/.test(e.key)) {
                        e.preventDefault(); 
                    }
                });
                inputsContainer.appendChild(input);
            }
        }
    });

    calculateButton.addEventListener('click', () => {
        const processInputs = document.querySelectorAll('.process-input');
        let processes = Array.from(processInputs).map((input, index) => {
            const burst = parseInt(input.value, 10);
            return {
                name: getPlaceholder(index),
                burst: isNaN(burst) ? 0 : burst
            };
        }).filter(p => p.burst > 0);

        if (processes.length > 0) {
            processes.sort((a, b) => a.burst - b.burst);


            let waitingTime = [];
            let turnaroundTime = [];
            let cumulative = 0;

            processes.forEach((proc, index) => {
                if (index === 0) {
                    waitingTime[index] = 0;
                } else {
                    waitingTime[index] = cumulative;
                }
                cumulative += proc.burst;
                turnaroundTime[index] = waitingTime[index] + proc.burst;
            });

            const totalWait = waitingTime.reduce((sum, val) => sum + val, 0);
            const avgWait = totalWait / processes.length;

            const totalTurnaround = turnaroundTime.reduce((sum, val) => sum + val, 0);
            const avgTurnaround = totalTurnaround / processes.length;

            resultHeader.textContent = `Durata medie (turnaround) este de ${avgTurnaround} unități.`;

            let burstExp = processes.map(p => p.burst).join('+');
            resultContainer.textContent = `(${burstExp})/${processes.length} = ${avgTurnaround} unități (pentru turnaround).`;

            detailedResultContainer.innerHTML = '<h4>Detalii pentru fiecare proces:</h4>';
            processes.forEach((proc, index) => {
                const p = document.createElement('p');
                p.textContent = `Procesul ${proc.name}: Durată = ${proc.burst} unități, Timp de așteptare = ${waitingTime[index]} unități, Finalizare în = ${turnaroundTime[index]} unități.`;
                detailedResultContainer.appendChild(p);
            });

            averageExecutionContainer.textContent = `Timpul mediu de realizare (turnaround) = ${avgTurnaround} unități.`;

            averageWaitContainer.textContent = `Timpul mediu de așteptare = ${avgWait} unități.`;
        } else {
            resultHeader.textContent = '';
            resultContainer.textContent = 'Introduceți durate valide pentru fiecare proces.';
            detailedResultContainer.innerHTML = '';
            averageExecutionContainer.textContent = '';
            averageWaitContainer.textContent = '';
        }
    });

    function getPlaceholder(index) {
        let placeholder = '';
        while (index >= 0) {
            placeholder = String.fromCharCode((index % 26) + 65) + placeholder;
            index = Math.floor(index / 26) - 1;
        }
        return placeholder;
    }
});

