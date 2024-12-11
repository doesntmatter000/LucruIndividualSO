const procese = [];

function adaugaProces() {
    const symbol = document.getElementById('symbol').value;
    const ordine = parseInt(document.getElementById('ordine').value);
    const val = parseInt(document.getElementById('val').value);

    if (!symbol || isNaN(ordine) || isNaN(val)) {
        alert('Toate campurile trebuie completate corect.');
        return;
    }

    const proces = { symbol, ordine, val };
    procese.push(proces);
    afiseazaProcese();

    // Resetam campurile
    document.getElementById('symbol').value = '';
    document.getElementById('ordine').value = '';
    document.getElementById('val').value = '';
}

function afiseazaProcese() {
    const listaProcese = document.getElementById('lista-procese');
    listaProcese.innerHTML = '';

    procese.forEach((proces, index) => {
        const li = document.createElement('li');
        li.textContent = `Symbol: ${proces.symbol}, Ordine: ${proces.ordine}, Val: ${proces.val}`;
        listaProcese.appendChild(li);
    });
}

function calculeazaRezultat() {
    try {
        const rezultat = ordonareSiCalcul(procese);
        document.getElementById('ordine-realizare').textContent = rezultat.ordineRealizare.join(', ');
        document.getElementById('rezultat-calcul').textContent = rezultat.rezultatCalcul.toFixed(2);
    } catch (error) {
        alert(error.message);
    }
}

/**
 * Functie pentru sortarea proceselor si calcularea rezultatului ponderat.
 * @param {Array} procese - Array de obiecte, fiecare obiect avand proprietatile 'symbol', 'ordine' si 'val'.
 * @returns {Object} - Un obiect care contine ordinea de realizare si rezultatul calculului.
 * @throws {Error} - Arunca o eroare daca inputul nu este valid.
 */
function ordonareSiCalcul(procese) {
    if (!Array.isArray(procese)) {
        throw new Error("Parametrul trebuie sa fie un array de obiecte.");
    }

    procese.forEach((proces, index) => {
        if (typeof proces.symbol !== 'string' || typeof proces.ordine !== 'number' || typeof proces.val !== 'number') {
            throw new Error(`Elementul de la indexul ${index} trebuie sa aiba proprietatile 'symbol' (string), 'ordine' (number) si 'val' (number).`);
        }
    });

    const copieProcese = procese.slice(); 
    copieProcese.sort((a, b) => b.ordine - a.ordine);

    const ponderi = [4, 3, 2, 1]; 

    let sumaPonderata = 0;
    for (let i = 0; i < copieProcese.length; i++) {
        const pondere = ponderi[i] !== undefined ? ponderi[i] : 1; 
        sumaPonderata += pondere * copieProcese[i].val;
    }

    const rezultat = sumaPonderata / 4; 
    const ordineRealizare = copieProcese.map(proces => proces.symbol);

    return {
        ordineRealizare: ordineRealizare,
        rezultatCalcul: rezultat
    };
}