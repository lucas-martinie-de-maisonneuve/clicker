// Initializing global variables
let TimeClick = 100;
let clickCount = 0; // Number of clicks on the button
var nb = 0.00;
let totalGained = 0; // Total clicks gained
let trueclick = 0;
let countPerClick = 1;
let multiplication_list = [3, 15, 150, 0.05, 0.5, 5]


let buttonCosts = [15, 150, 1500, 15000, 30000, 100000, 1000, 5000, 10000, 50000, 100000, 300000]; // Costs of purchase buttons
let initial_buttonCosts = [15, 150, 1500, 15000, 30000, 100000, 1000, 5000, 10000, 50000, 100000, 300000]; // Costs of purchase buttons
let facilitiesName = ["Spacecraft SCV-70", "Satellite DeltaIV", "Rocket Atlas XXIII", "Space shuttle Lazlo-vl", "Queen Madec-28", "HLVenture G X II", "Shooting Star", "Comet", "Moon", "Planet-251HLV f", "Black hole", "Mount Olympus"]
let bonusCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];


document.addEventListener("DOMContentLoaded", function () {
    const clickButton = document.getElementById('clicker'); // Click button
    const clickCountDisplay = document.getElementById('clickCount'); // Display of click count
    const totalClickDisplay = document.getElementById('totalClick'); // Display of total clicks

    // Load saved data if available
    loadGameData();

    // Planet rotation
    var rotation = 0;

    // Planet size
    let planet_width = 0;
    let planet_height = 0;


    // Init purchase buttons
    updateButtons();
    // setInterval(AutomaticCount, 1000);


    // Event listener for clicking the button
    clickButton.addEventListener('click', function () {
        // Incrementing click count and total gained
        currentClickCount += countPerClick;
        totalGained += countPerClick;
        trueclick += countPerClick;

        // Updating display
        clickCountDisplay.textContent = currentClickCount;
        totalClickDisplay.textContent = "Total gained : " + Math.floor(totalGained);
        // Increasing planet size
        planet_width = 80;
        planet_height = 80;
        clickButton.style.width = (235 + planet_width) + "px";
        clickButton.style.height = (235 + planet_height) + "px";

        planet_size(); // Calling function to decrease planet size

        // Update buttons display
        updateButtons();

    });
    // if (!TimeClick == 1000)
    setInterval(AutomaticCount, 100);

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

    setInterval(saveGameData, 1000);

    // Function for planet rotation
    function rotatePlanet() {
        rotation += 0.5;
        clickButton.style.transform = 'translate(-50%, -50%) rotate(' + rotation + 'deg)';
        window.requestAnimationFrame(rotatePlanet);
    }


});
setInterval(saveGameData, 1000)

// Function for purchasing a bonus
function buy(costIndex) {
    let cost = buttonCosts[costIndex]; // Cost of the bonus
    let currentClickCount = parseInt(document.getElementById('clickCount').textContent);
     // Current click count
    if (currentClickCount >= cost) { // Checking if user has enough clicks
        currentClickCount -= cost; // Subtracting cost from current clicks
        trueclick -= cost
        clickCount = currentClickCount; // Updating click count
        // Adding bonus click count based on cost


        // Upgrade

        if (cost === buttonCosts[6]) {
            multiplication_list[0] *= 2;
        }

        else if (cost === buttonCosts[7]) {
            multiplication_list[1] *= 2;
        }    
        
        else if (cost === buttonCosts[8]) {
            multiplication_list[2] *= 2;
        }  

        else if (cost === buttonCosts[9]) {
            multiplication_list[3] *= 5;
        }   
        
        else if (cost === buttonCosts[10]) {
            multiplication_list[4] *= 5;
        }

        else if (cost === buttonCosts[11]) {
            multiplication_list[5] *= 5;
        }
        bonusCount[costIndex] = bonusCount[costIndex] + 1;// Number of time bonus has been purshased

        countPerClick = multiplication_list[0] * bonusCount [0] + multiplication_list[1] * bonusCount [1] + multiplication_list[2] * bonusCount [2] + 1; 



        // Updating display
        document.getElementById('clickCount').textContent = currentClickCount;
        document.getElementById('perClick').textContent = "Click Gain : " + countPerClick;

        // Increasing cost for next purchase
        buttonCosts[costIndex] = Math.floor(buttonCosts[costIndex] *= 1.66);
        // Updating purchase buttons
        updateButtons();

    }
}

function AutomaticCount() {
    trueclick += multiplication_list[3] * bonusCount [3] + multiplication_list[4] * bonusCount [4] + multiplication_list[5] * bonusCount [5]; 
    currentClickCount = Math.floor(trueclick);
    document.getElementById('clickCount').textContent = currentClickCount;
    totalGained += multiplication_list[3] * bonusCount [3] + multiplication_list[4] * bonusCount [4] + multiplication_list[5] * bonusCount [5];
    document.getElementById('totalClick').textContent = "Total gained : " + Math.floor(totalGained);

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
        img_button.src = `image/logo${i}.png`;

        if (totalGained >= initial_buttonCosts[i]) {
            // Button text with cost and bonus click count
            if (i < 3) {
                button.innerHTML = `
                    <p class="FU-title"> ${buttonName} </p>
                    <p>${cost} Clicks</p>
                    <p>(Clicks + ${(cost === buttonCosts[0]) ? multiplication_list[0] : (cost === buttonCosts[1]) ? multiplication_list[1] : multiplication_list[2]})</p>`}

            else if (i <6){
                button.innerHTML = `
                <p class="FU-title"> ${buttonName}</p>
                <p>${cost} Clicks</p>

                <p>(Auto clicks + ${(cost === buttonCosts[3]) ? multiplication_list[3] * 2: (cost === buttonCosts[4]) ? multiplication_list[4] * 2: multiplication_list[5] * 2}/s) </p>
                ` 
             }
                else if (i <9){

                    button.innerHTML = `
                    <p class="FU-title"> ${buttonName}</p>
                    <p>${cost} Clicks</p>
                    <p>(${(cost === buttonCosts[6]) ?  `${facilitiesName[0]} x 2 ` : (cost === buttonCosts[7]) ?  `${facilitiesName[1]} x 2 ` :  `${facilitiesName[2]} x 2 `} )</p>`
                }
                else {
                    button.innerHTML = `
                    <p class="FU-title"> ${buttonName}</p>
                    <p>${cost} Clicks</p>
                    <p>(${(cost === buttonCosts[9]) ?  `${facilitiesName[3]} x 5 ` : (cost === buttonCosts[10]) ?  `${facilitiesName[4]} x 5 ` :  `${facilitiesName[5]} x 5 `} )</p>`
                    

                };

        nbClicked.textContent = count;
        // Assigning purchase function to button click event
        div_button.onclick = function () {
            buy(i);
        };

        div_button.appendChild(nbClicked); // Adding paragraph to facilities section
        div_button.appendChild(button); // Adding button to facilities section
        div_button.appendChild(img_button); // Adding logo to facilities section

            if (i < 6 ) {
                facilitiesSection.appendChild(div_button)
            } else {
                // nbClicked.textContent = count;
                upgradeSection.appendChild(div_button)
            }

}}};

function saveGameData() {
    localStorage.clear()
    localStorage.setItem('clickCount', trueclick);
    localStorage.setItem('countPerClick', countPerClick);
    localStorage.setItem('totalGained', totalGained);
    localStorage.setItem('nb', nb); // Save auto-click parameters
    localStorage.setItem('buttonCosts', JSON.stringify(buttonCosts)); // Save button costs
    localStorage.setItem('bonusCount', JSON.stringify(bonusCount)); // Save bonus count
}
function loadGameData() {
    if (localStorage.getItem('clickCount') !== null) {
        let click = parseInt(localStorage.getItem('clickCount'));
        countPerClick = parseInt(localStorage.getItem('countPerClick'));
        totalGained = parseInt(localStorage.getItem('totalGained'));
        nb = parseFloat(localStorage.getItem('nb')); // Load auto-click parameters
        buttonCosts = JSON.parse(localStorage.getItem('buttonCosts')); // Load button costs
        bonusCount = JSON.parse(localStorage.getItem('bonusCount')); // Load bonus count
        // Update display with loaded data
        document.getElementById('clickCount').textContent = click;
        document.getElementById('perClick').textContent = "Click Gain: " + countPerClick;
        document.getElementById('totalClick').textContent = "Total gained : " + totalGained;
        trueclick = click; // Set trueclick to the loaded click count
        updateButtons(); // Update buttons display

        // -------------> nb
        // -------------> trueclick
    }
}

function clearGameData() {
    localStorage.clear(); // Remove all saved data

    // Reset variables
    clickCount = 0;
    countPerClick = 1;
    totalGained = 0;
    buttonCosts = [15, 150, 1500, 15000, 30000, 100000, 1000, 5000, 10000, 50000, 100000, 300000];
    bonusCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    trueclick = 0
    nb = 0.00;

    // Update display
    document.getElementById('clickCount').textContent = clickCount;
    document.getElementById('perClick').textContent = "Gain de click : " + countPerClick;
    document.getElementById('totalClick').textContent = "Total gained : " + totalGained;

    // Update buttons
    updateButtons();
}