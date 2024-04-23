// Initializing global variables
let clickCount = 0; // Number of clicks on the button
let countPerClick = 0; // Number of clicks added per click
let totalGained = 0; // Total clicks gained
let buttonCosts = [10, 500, 5000]; // Costs of purchase buttons
let bonusCount = [0,0,0]

document.addEventListener("DOMContentLoaded", function () {
    const clickButton = document.getElementById('clicker'); // Click button
    const clickCountDisplay = document.getElementById('clickCount'); // Display of click count
    const totalClickDisplay = document.getElementById('totalClick'); // Display of total clicks

    // Planet rotation
    var rotation = 0;

    // Planet size
    let planet_width = 0;
    let planet_height = 0;

    // Init purchase buttons
    updateButtons();

    // Event listener for clicking the button
    clickButton.addEventListener('click', function () {
        // Incrementing click count and total gained
        if (countPerClick === 0) {
            clickCount++;
            totalGained++;
        } else {
            clickCount += countPerClick;
            totalGained += countPerClick;
        }
        // Updating display
        clickCountDisplay.textContent = clickCount;
        totalClickDisplay.textContent = "Total gained : " + totalGained;
        // Increasing planet size
        planet_width = 80;
        planet_height = 80;
        clickButton.style.width = (235 + planet_width) + "px";
        clickButton.style.height = (235 + planet_height) + "px";
        planet_size(); // Calling function to decrease planet size
    });

    // Function to gradually decrease planet size
    function planet_size() {
        if (planet_height > 0) {
            setTimeout(function () {
                planet_height -= 1;
                planet_width -= 1;
                clickButton.style.width = (235 + planet_width) + "px";
                clickButton.style.height = (235 + planet_height) + "px";
                planet_size(); // Recursive call to continue decreasing size
            }, 50);
        }
    }

    // Function for planet rotation
    function rotatePlanet() {
        rotation += 0.5;
        clickButton.style.transform = 'translate(-50%, -50%) rotate(' + rotation + 'deg)';
        window.requestAnimationFrame(rotatePlanet);
    }

});

// Function for purchasing a bonus
function buy(costIndex) {
    let cost = buttonCosts[costIndex]; // Cost of the bonus
    let currentClickCount = parseInt(document.getElementById('clickCount').textContent); // Current click count
    if (currentClickCount >= cost) { // Checking if user has enough clicks
        currentClickCount -= cost; // Subtracting cost from current clicks
        clickCount = currentClickCount; // Updating click count
        // Adding bonus click count based on cost
        if (cost === buttonCosts[0])
            countPerClick += 3;
        else if (cost === buttonCosts[1])
            countPerClick += 10;
        else if (cost === buttonCosts[2])
            countPerClick += 50;
        // Updating display
        document.getElementById('clickCount').textContent = currentClickCount;
        document.getElementById('perClick').textContent = "Click Gain: " + countPerClick;
        // Increasing cost for next purchase
        buttonCosts[costIndex] = Math.floor(buttonCosts[costIndex] *= 1.33); // Updating purchase buttons
        bonusCount[costIndex] =  bonusCount[costIndex] + 1 ;// Number of time bonus has been purshased

        updateButtons();
    }
}

// Function to update purchase buttons
function updateButtons() {
    let facilitiesSection = document.getElementById('facilities'); // Facilities section
    facilitiesSection.innerHTML = ""; // Resetting facilities section

    // Creating purchase buttons for each cost
    for (let i = 0; i < buttonCosts.length; i++) {
        let cost = buttonCosts[i]; // Button cost
        let count = bonusCount[i]; // Button count
        let button = document.createElement('button'); // Creating a button element
        button.className = 'button'; // Assigning a class to the button
        let nbClicked = document.createElement('p'); // Creating a p element
        nbClicked.className = "buttonclicked"
        
        // Button text with cost and bonus click count
        button.textContent = cost + " Clicks (Clicks + " + ((cost === buttonCosts[0]) ? 3 : (cost === buttonCosts[1]) ? 10 : 50 )+ ")";
        
        nbClicked.textContent = count;
        // Assigning purchase function to button click event
        button.onclick = function () {
            buy(i);
        };
        facilitiesSection.appendChild(button); // Adding button to facilities section
        facilitiesSection.appendChild(nbClicked); // Adding paragraph to facilities section
    }
}