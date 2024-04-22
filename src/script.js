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

    // rotatePlanet();

    clickButton.addEventListener('click', function () {
        if (countPerClick === 0)
            clickCount++;
        else
            clickCount += countPerClick;
        clickCountDisplay.textContent = clickCount;
        clickButton.style.width = "235px";
        clickButton.style.height = "235px";

        setTimeout(function () {
            clickButton.style.width = "250px";
            clickButton.style.height = "250px";
        }, 20);
        
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