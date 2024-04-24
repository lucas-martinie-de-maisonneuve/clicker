// Initializing global variables
let TimeClick = 0;
let clickCount = 0; // Number of clicks on the button
var nb = 0;
let totalGained = 0; // Total clicks gained


let buttonCosts = [15, 500, 1500, 15000, 30000, 100000, 1000, 5000, 10000, 50000, 100000, 300000]; // Costs of purchase buttons
let facilitiesName = ["Spacecraft SCV-70", "Satellite DeltaIV", "Rocket Atlas XXIII", "Space shuttle Lazlo-vl", "Queen Madec-28", "HLV Venture G X II", "Shooting Star", "Comet", "Moon", "Planet-251HLV f", "Black hole", "Mount Olympus"]
let bonusCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

document.addEventListener("DOMContentLoaded", function () {
    const clickButton = document.getElementById('clicker'); // Click button
    const clickCountDisplay = document.getElementById('clickCount'); // Display of click count
    const totalClickDisplay = document.getElementById('totalClick'); // Display of total clicks

    // Planet rotation
    var rotation = 0;

    // Planet size
    let planet_width = 0;
    let planet_height = 0;

    let countPerClick = 0; // Number of clicks added per click

    // Init purchase buttons
    updateButtons();
    
    // TimeClick !== 1000;
    setInterval(AutomaticCount, 1000); 

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
    
    function AutomaticCount() {
        let currentClickCount = parseInt(document.getElementById('clickCount').textContent);

        currentClickCount = clickCount + nb; 
        document.getElementById('clickCount').textContent = currentClickCount;

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
        else if (cost === buttonCosts[3]) {
            nb += 1;
            countPerClick += 0;
            console.log(nb)
        }

    // Updating display
        document.getElementById('clickCount').textContent = currentClickCount;
        document.getElementById('perClick').textContent = "Click Gain: " + countPerClick;
        // Increasing cost for next purchase
        buttonCosts[costIndex] = Math.floor(buttonCosts[costIndex] *= 1.33); 
        // Updating purchase buttons
        bonusCount[costIndex] = bonusCount[costIndex] + 1;// Number of time bonus has been purshased

        updateButtons();
    }
}

// Function to update purchase buttons
function updateButtons() {
    let facilitiesSection = document.getElementById('facilities'); // Facilities section
    facilitiesSection.innerHTML = "<h2 class='BonusTitle'>Facilities</h2>"; // Resetting facilities section

    let upgradeSection = document.getElementById('upgrade'); // Upgrade section
    upgradeSection.innerHTML = "<h2 class='BonusTitle'>Upgrade</h2>"; // Resetting upgrade section


// FACILITIES 

// Creating purchase buttons for each cost
    for (let i = 0; i < buttonCosts.length; i++) {
        let buttonName = facilitiesName[i]
        let cost = buttonCosts[i]; // Button cost
        let count = bonusCount[i]; // Button count
        let button = document.createElement('button'); // Creating a button element
        button.className = 'button'; // Assigning a class to the button
        let nbClicked = document.createElement('p'); // Creating a p element
        nbClicked.className = "buttonclicked"
        let div_button = document.createElement('div'); // Creating a div element
        div_button.className = "div_button"
        let img_button = document.createElement("img");
        img_button.className = "img_logo"
        img_button.src= `image/logo${i}.png`


        // Button text with cost and bonus click count
        if (cost === buttonCosts[0] || cost === buttonCosts[1] || cost === buttonCosts[2]) 
            button.innerHTML = `
                <p class="F-title"> ${buttonName} </p>
                <p>${cost} Clicks</p>
                <p>(Clicks + ${(cost === buttonCosts[0]) ? 3 : (cost === buttonCosts[1]) ? 10 : 50})`;
        else 
            button.innerHTML = `
            <p class="F-title"> ${buttonName}</p>
            <p> ${cost} Clicks (Auto clicks + 0.1/s)</p>         
            `;


        nbClicked.textContent = count;
        // Assigning purchase function to button click event
        div_button.onclick = function () {
            buy(i);
        };

        if (i < 6 ) {
            facilitiesSection.appendChild(div_button)
            div_button.appendChild(nbClicked); // Adding paragraph to facilities section
            div_button.appendChild(button); // Adding button to facilities section
            div_button.appendChild(img_button); // Adding logo to facilities section

        } 
        else {            
            // nbClicked.textContent = count;
        upgradeSection.appendChild(div_button)
        div_button.appendChild(nbClicked); // Adding paragraph to upgrade section
        div_button.appendChild(button); // Adding button to upgrade section
        div_button.appendChild(img_button); // Adding logo to upgrade section
        }
    }


};