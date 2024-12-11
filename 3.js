function calcResult(values, K) {
    // Sortează array-ul
    const sortedValues = values.slice().sort((a, b) => a - b);

    // Împarte valorile > K în segmente
    const segments = [];
    for (let val of sortedValues) {
        if (val <= K) {
            segments.push(val);
        } else {
            let rest = val;
            while (rest > K) {
                segments.push(K);
                rest -= K;
            }
            if (rest > 0) {
                segments.push(rest);
            }
        }
    }

    // Numărul total de segmente
    const totalSegments = segments.length;

    // Suma ponderată
    let weightedSum = 0;
    for (let i = 0; i < totalSegments; i++) {
        const weight = totalSegments - i;
        weightedSum += weight * segments[i];
    }

    const result = weightedSum / totalSegments;
    return result;
}

function performCalculation() {
    const valuesStr = document.getElementById('values').value;
    const kValueStr = document.getElementById('kValue').value;

    // Transformăm șirul de valori într-un array de numere
    const valuesArr = valuesStr.split(',').map(val => parseFloat(val.trim())).filter(num => !isNaN(num));

    const k = parseFloat(kValueStr);

    if (valuesArr.length === 0 || isNaN(k)) {
        document.getElementById('result').textContent = "Introduceți valori valide și un K valid.";
        return;
    }

    const rez = calcResult(valuesArr, k);
    console.log(rez);
    
    document.getElementById('result').innerHTML = "Rezultatul este: " + rez.toFixed(4);
}