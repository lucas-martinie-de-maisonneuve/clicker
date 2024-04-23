document.addEventListener('DOMContentLoaded', function() {
    const counterDisplay = document.getElementById('counterDisplay');

    let count = 0;

    function AutomaticCount() {
        count++; 
        counterDisplay.textContent = count; 
    }

    setInterval(AutomaticCount, 1000);
});
