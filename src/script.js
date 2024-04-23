let clickCount = 0;
let countPerClick = 1;
let totalGained = 0;
let buttonCosts = [10, 500, 5000];

document.addEventListener("DOMContentLoaded", function () {
    const clickButton = document.getElementById('clicker');
    const clickCountDisplay = document.getElementById('clickCount');
    const totalClickDisplay = document.getElementById('totalClick');

    // Load saved data if available
    loadGameData();

    // Rotation Planet
    var rotation = 0;

    // Planet size
    let planet_width = 0;
    let planet_height = 0;

    // Update button display
    updateButtons();

    // Click event handler
    clickButton.addEventListener('click', function () {
        clickCount += countPerClick || 1;
        totalGained += countPerClick || 1;

        // Update counters display
        clickCountDisplay.textContent = clickCount;
        totalClickDisplay.textContent = "Total gained : " + totalGained;

        // Update planet size
        planet_width = 80;
        planet_height = 80;
        clickButton.style.width = (235 + planet_width) + "px";
        clickButton.style.height = (235 + planet_height) + "px";
        planete_size();

        // Save game data
        saveGameData();
    });

    function planete_size() {
        if (planet_height > 0) {
            setTimeout(function () {
                planet_height -= 1;
                planet_width -= 1;
                clickButton.style.width = (235 + planet_width) + "px";
                clickButton.style.height = (235 + planet_height) + "px";
                planete_size();
            }, 50)
        }
    }

    // Rotation Planet
    function rotatePlanet() {
        rotation += 0.5;
        clickButton.style.transform = 'translate(-50%, -50%) rotate(' + rotation + 'deg)';
        window.requestAnimationFrame(rotatePlanet);
    }
});

// Function to handle purchase
function buy(costIndex) {
    let cost = buttonCosts[costIndex];
    let currentClickCount = parseInt(document.getElementById('clickCount').textContent);
    if (currentClickCount >= cost) {
        currentClickCount -= cost;
        clickCount = currentClickCount;
        countPerClick += (cost === buttonCosts[0]) ? 3 : (cost === buttonCosts[1]) ? 10 : 50;
        document.getElementById('clickCount').textContent = currentClickCount;
        document.getElementById('perClick').textContent = "Gain de click : " + countPerClick;

        buttonCosts[costIndex] = Math.floor(buttonCosts[costIndex] *= 1.33);

        // Update button display
        updateButtons();

        // Save game data
        saveGameData();
    }
}

// Function to update button display
function updateButtons() {
    let shop_listSection = document.getElementById('shop_list');
    let upgradeSection = document.getElementById('upgrade');
    shop_listSection.innerHTML = "";
    upgradeSection.innerHTML = "";

    for (let i = 0; i < buttonCosts.length; i++) {
        let cost = buttonCosts[i];
        let button = document.createElement('button');
        button.className = 'button';
        button.textContent = cost + " Clicks (Clicks + " + ((cost === buttonCosts[0]) ? 3 : (cost === buttonCosts[1]) ? 10 : 50) + ")";
        button.onclick = function () {
            buy(i);
        };
        shop_listSection.appendChild(button);
    }
}

// Function to save game data
function saveGameData() {
    localStorage.setItem('clickCount', clickCount);
    localStorage.setItem('countPerClick', countPerClick);
    localStorage.setItem('totalGained', totalGained);
}

// Function to load game data
function loadGameData() {
    if (localStorage.getItem('clickCount') !== null) {
        clickCount = parseInt(localStorage.getItem('clickCount'));
        countPerClick = parseInt(localStorage.getItem('countPerClick'));
        totalGained = parseInt(localStorage.getItem('totalGained'));

        // Update display with loaded data
        document.getElementById('clickCount').textContent = clickCount;
        document.getElementById('perClick').textContent = "Gain de click : " + countPerClick;
        document.getElementById('totalClick').textContent = "Total gained : " + totalGained;
    }
}

// Function to clear game data and reset the game
function clearGameData() {
    localStorage.clear(); // Remove all saved data

    // Reset variables
    clickCount = 0;
    countPerClick = 1;
    totalGained = 0;
    buttonCosts = [10, 500, 5000]; // Reset button costs

    // Update display
    document.getElementById('clickCount').textContent = clickCount;
    document.getElementById('perClick').textContent = "Gain de click : " + countPerClick;
    document.getElementById('totalClick').textContent = "Total gained : " + totalGained;

    // Update buttons
    updateButtons();
}