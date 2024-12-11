function summonHero() {
    const heroList = document.getElementById('heroList');
    const heroEntry = document.createElement('div');
    heroEntry.className = 'hero-entry';
    heroEntry.innerHTML = `
        <input type="text" class="hero-name" placeholder="Hero Name" required>
        <input type="number" class="hero-power" min="1" placeholder="Power Level" required>
        <button type="button" onclick="banishHero(this)">✖</button>
    `;
    heroList.appendChild(heroEntry);
}

function banishHero(button) {
    const heroEntry = button.parentElement;
    const heroList = document.getElementById('heroList');
    if (heroList.children.length > 1) {
        heroList.removeChild(heroEntry);
    } else {
        alert('At least one hero must remain.');
    }
}

function guideHeroesThroughKingdom(heroes, wandPower) {
    const heroQueue = [...heroes];
    const journeyPath = [];
    const journeyTimes = [];

    while (heroQueue.length > 0) {
        const hero = heroQueue.shift();
        const { name, power } = hero;

        if (power <= wandPower) {
            journeyPath.push(name);
            journeyTimes.push(power);
        } else {
            const remainingPower = power - wandPower;
            journeyPath.push(`${name}(${remainingPower})`);
            journeyTimes.push(wandPower);
            heroQueue.push({ name, power: remainingPower });
        }
    }

    const totalAdventures = journeyTimes.length;
    let weightedImpact = 0;
    for (let i = 0; i < totalAdventures; i++) {
        const weight = totalAdventures - i;
        weightedImpact += weight * journeyTimes[i];
    }
    const magicImpact = weightedImpact / totalAdventures;

    return {
        questPath: journeyPath.join(' '),
        magicImpact: magicImpact.toFixed(2)
    };
}

function castMagicSpell() {
    const wandPower = parseInt(document.getElementById('magicWand').value);
    if (isNaN(wandPower) || wandPower < 1) {
        alert('Please enter a valid magic power for the wand.');
        return;
    }

    const heroNames = document.querySelectorAll('.hero-name');
    const heroPowers = document.querySelectorAll('.hero-power');

    const heroes = [];
    for (let i = 0; i < heroNames.length; i++) {
        const name = heroNames[i].value.trim();
        const power = parseInt(heroPowers[i].value);

        if (name === '' || isNaN(power) || power < 1) {
            alert('Please fill in all fields for each hero.');
            return;
        }

        heroes.push({ name, power });
    }

    const result = guideHeroesThroughKingdom(heroes, wandPower);

    document.getElementById('questPath').innerText = result.questPath;
    document.getElementById('magicImpact').innerText = result.magicImpact;
    document.getElementById('kingdomResults').style.display = 'block';
}