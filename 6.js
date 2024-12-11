let processes = [];

        document.getElementById('addProcess').addEventListener('click', () => {
            const name = document.getElementById('processName').value.trim();
            const time = parseInt(document.getElementById('processTime').value.trim());
            
            if (!name || isNaN(time) || time <= 0) {
                alert('Vă rugăm să introduceți un simbol și un timp valid pentru proces.');
                return;
            }

            processes.push({ name, time });
            alert(`Procesul ${name} cu timpul ${time} a fost adăugat.`);
            document.getElementById('processName').value = '';
            document.getElementById('processTime').value = '';

            displayProcesses();
        });

        function displayProcesses() {
            const processList = document.getElementById('processList');
            processList.innerHTML = '<strong>Procese introduse:</strong><br>' + processes.map(p => `Simbol: ${p.name}, Timp: ${p.time}`).join('<br>');
        }

        function roundRobinScheduler(processes, quantum) {
            let queue = [...processes]; 
            let executionOrder = []; 
            let totalWaitTime = 0; 
            let times = []; 

            while (queue.length > 0) {
                queue.sort((a, b) => a.time - b.time);
                let currentProcess = queue.shift();
                
                if (currentProcess.time <= quantum) {
                    executionOrder.push(currentProcess.name); 
                    times.push(currentProcess.time); 
                } else {
                    executionOrder.push(`${currentProcess.name}(${currentProcess.time - quantum})`); 
                    queue.push({ name: currentProcess.name, time: currentProcess.time - quantum }); 
                    times.push(quantum); 
                }
            }
            
            let totalProcesses = times.length;
            let totalTime = 0;
            let calculations = [];
            
            for (let i = 0; i < times.length; i++) {
                let factor = totalProcesses - i;
                totalTime += factor * times[i];
                calculations.push(`(${factor}*${times[i]})`);
            }
            
            let averageWaitTime = totalTime / totalProcesses;

            return {
                executionOrder,
                calculations: calculations.join(' + '),
                averageWaitTime: averageWaitTime.toFixed(2)
            };
        }

        document.getElementById('submit').addEventListener('click', () => {
            const quantum = parseInt(document.getElementById('quantum').value.trim());
            if (processes.length === 0 || isNaN(quantum) || quantum <= 0) {
                alert('Vă rugăm să introduceți toate datele corect.');
                return;
            }

            const result = roundRobinScheduler(processes, quantum);

            document.getElementById('result').innerHTML = `
                <strong>Ordinea de executie:</strong> ${result.executionOrder.join(', ')}<br>
                <strong>Calculele:</strong> ${result.calculations}<br>
                <strong>Media timpului de asteptare:</strong> ${result.averageWaitTime}
            `;
        });