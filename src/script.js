// Click on Planet
let clickCount = 0;
let countPerClick = 0;
let totalGained = 0
let buttonCosts = [10, 500, 5000];

document.addEventListener("DOMContentLoaded", function () {
    const clickButton = document.getElementById('clicker');
    const clickCountDisplay = document.getElementById('clickCount');
    const totalClickDisplay = document.getElementById('totalClick');

    // Rotation Planet
    var rotation = 0;

    // Planet size
    let planet_width = 0
    let planet_height = 0

    // rotatePlanet();
    updateButtons();
    clickButton.addEventListener('click', function () {
        if (countPerClick === 0) {
            clickCount++;
            totalGained++;
        }
        else {
            clickCount += countPerClick;
            totalGained += countPerClick
        }
        clickCountDisplay.textContent = clickCount;
        totalClickDisplay.textContent = "Total gained : " + totalGained;
        planet_width = 80;
        planet_height = 80;
        clickButton.style.width = (235 + planet_width) + "px";
        clickButton.style.height = (235 + planet_height) + "px";
        planete_size();
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

function buy(costIndex) {
    let cost = buttonCosts[costIndex];
    let currentClickCount = parseInt(document.getElementById('clickCount').textContent);
    if (currentClickCount >= cost) {
        currentClickCount -= cost;
        clickCount = currentClickCount;
        if (cost === buttonCosts[0])
            countPerClick += 3;
        else if (cost === buttonCosts[1])
            countPerClick += 10;
        else if (cost === buttonCosts[2])
            countPerClick += 50;
        document.getElementById('clickCount').textContent = currentClickCount;
        document.getElementById('perClick').textContent = "Gain de click : " + countPerClick;

        buttonCosts[costIndex] = Math.floor(buttonCosts[costIndex] *= 1.33);

        updateButtons();
    }
} function updateButtons() {
    let facilitiesSection = document.getElementById('facilities');
    let upgradeSection = document.getElementById('upgrade');
    facilitiesSection.innerHTML = "";
    upgradeSection.innerHTML = "";

    for (let i = 0; i < buttonCosts.length; i++) {
        let cost = buttonCosts[i];
        let button = document.createElement('button');
        button.className = 'button';
        button.textContent = cost + " Clicks (Clicks + " + ((cost === buttonCosts[0]) ? 3 : (cost === buttonCosts[1]) ? 10 : 50) + ")";
        button.onclick = function () {
            buy(i);
        };
        facilitiesSection.appendChild(button);

    }
}