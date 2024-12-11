document.addEventListener('DOMContentLoaded', () => {
    const processCountInput = document.getElementById('processCountInput');
    const calculateBtn = document.getElementById('calculateBtn');
    const processInputsContainer = document.getElementById('processInputsContainer');
    const resultTitle = document.getElementById('resultTitle');
    const resultSummary = document.getElementById('resultSummary');
    const detailedResult = document.getElementById('detailedResult');
    const averageTurnaroundTimeContainer = document.getElementById('averageTurnaroundTimeContainer');
    const averageWaitTimeContainer = document.getElementById('averageWaitTimeContainer');
    const waitTimeCalculation = document.getElementById('waitTimeCalculation');

    processCountInput.addEventListener('input', () => {
        processInputsContainer.innerHTML = '';
        const value = parseInt(processCountInput.value, 10);
        if (!isNaN(value) && value > 0) {
            for (let i = 0; i < value; i++) {
                const input = document.createElement('input');
                input.type = 'text';
                input.placeholder = `Proces ${String.fromCharCode(65 + i)} (durata)`;
                input.addEventListener('keypress', (e) => {
                    if (!/\d/.test(e.key)) {
                        e.preventDefault();
                    }
                });
                processInputsContainer.appendChild(input);
                processInputsContainer.appendChild(document.createElement('br'));
            }
        }
    });

    calculateBtn.addEventListener('click', () => {
        const processInputs = processInputsContainer.querySelectorAll('input');
        let processes = Array.from(processInputs).map((input, index) => {
            const burst = parseInt(input.value, 10);
            return {
                name: `Proces ${String.fromCharCode(65 + index)}`,
                burst: isNaN(burst) ? 0 : burst
            };
        }).filter(p => p.burst > 0);

        if (processes.length > 0) {
            processes.sort((a, b) => a.burst - b.burst);

            let waitingTime = [];
            let turnaroundTime = [];
            let cumulative = 0;

            processes.forEach((proc, index) => {
                waitingTime[index] = index === 0 ? 0 : cumulative;
                cumulative += proc.burst;
                turnaroundTime[index] = waitingTime[index] + proc.burst;
            });

            const totalWait = waitingTime.reduce((sum, val) => sum + val, 0);
            const avgWait = totalWait / processes.length;

            const totalTurnaround = turnaroundTime.reduce((sum, val) => sum + val, 0);
            const avgTurnaround = totalTurnaround / processes.length;

            resultTitle.textContent = 'Rezultate SJF';

            let burstExp = processes.map(p => p.burst).join('+');
            resultSummary.textContent = `(${burstExp}) / ${processes.length} = ${avgTurnaround.toFixed(2)} unități (turnaround).`;

            detailedResult.innerHTML = '<h4>Detalii pentru fiecare proces:</h4>';
            processes.forEach((proc, index) => {
                const p = document.createElement('p');
                p.textContent = `${proc.name}: Durată = ${proc.burst} unități, Timp de așteptare = ${waitingTime[index]} unități, Finalizare = ${turnaroundTime[index]} unități.`;
                detailedResult.appendChild(p);
            });

            averageTurnaroundTimeContainer.textContent = `Timp mediu de turnaround = ${avgTurnaround.toFixed(2)} unități.`;

            waitTimeCalculation.innerHTML = '<h4>Calculul timpului de așteptare:</h4>';
            const waitTimesStr = waitingTime.join('+');
            const waitCalcFormula = document.createElement('p');
            waitCalcFormula.textContent = `Timp mediu de așteptare = (${waitTimesStr}) / ${processes.length} = ${avgWait.toFixed(2)} unități.`;
            waitTimeCalculation.appendChild(waitCalcFormula);

            averageWaitTimeContainer.textContent = `Timp mediu de așteptare = ${avgWait.toFixed(2)} unități.`;
        } else {
            resultTitle.textContent = '';
            resultSummary.textContent = 'Introduceți durate valide pentru fiecare proces.';
            detailedResult.innerHTML = '';
            averageTurnaroundTimeContainer.textContent = '';
            averageWaitTimeContainer.textContent = '';
            waitTimeCalculation.innerHTML = '';
        }
    });
});