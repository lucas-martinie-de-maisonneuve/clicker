// Click on Planet
let clickCount = 0;
let countPerClick = 0;

document.addEventListener("DOMContentLoaded", function () {
    const clickButton = document.getElementById('clicker');
    const clickCountDisplay = document.getElementById('clickCount');

    // Rotation Planet
    var rotation = 0;

    // Planet size
    let planet_width = 0
    let planet_height = 0

    rotatePlanet();

    function planete_size() {
        if (planet_height > 0) {
            setTimeout(function () {
                planet_height -= 1;
                planet_width -= 1;
                clickButton.style.width = (220 + planet_width) + "px";
                clickButton.style.height = (220 + planet_height) + "px";
                planete_size();
            }, 50)
        }
    }

    clickButton.addEventListener('click', function () {
        if (countPerClick === 0)
            clickCount++;
        else
            clickCount += countPerClick;
        clickCountDisplay.textContent = clickCount;
        planet_width = 80;
        planet_height = 80;
        clickButton.style.width = (235 + planet_width) + "px";
        clickButton.style.height = (235 + planet_height) + "px";
        planete_size();
    });

    // Rotation Planet
    function rotatePlanet() {
        rotation += 0.5;
        clickButton.style.transform = 'translate(-50%, -50%) rotate(' + rotation + 'deg)';
        window.requestAnimationFrame(rotatePlanet);
    }

});

function buy(cost) {
    let currentClickCount = parseInt(document.getElementById('clickCount').textContent);
    if (currentClickCount >= cost) {
        currentClickCount -= cost;
        clickCount = currentClickCount;
        if (cost === 10)
            countPerClick += 3
        else if (cost === 100)
            countPerClick += 10
        else if (cost === 1000)
            countPerClick += 50
        document.getElementById('clickCount').textContent = currentClickCount;
        document.getElementById('perClick').textContent = "Gain de click : " + countPerClick;
    }

}