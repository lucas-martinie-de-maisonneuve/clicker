let clickCount = 0;
let countPerClick = 0;

document.addEventListener("DOMContentLoaded", function () {
    const clickButton = document.getElementById('clicker');
    const clickCountDisplay = document.getElementById('clickCount');

    clickButton.addEventListener('click', function () {
        if (countPerClick === 0)
            clickCount ++
        else
            clickCount += countPerClick;
        clickCountDisplay.textContent = clickCount;
    });
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