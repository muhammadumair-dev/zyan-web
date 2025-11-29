// ==========================================
// 1. REVEAL ANIMATION (Fade In Effect)
// ==========================================
const reveals = document.querySelectorAll(".reveal");

// Iska naam badal kar 'revealObserver' kar diya
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            // Optional: Agar baar-baar animation nahi chahiye to unobserve karein
            revealObserver.unobserve(entry.target); 
        }
    });
}, { threshold: 0.2 });

reveals.forEach(reveal => {
    revealObserver.observe(reveal);
});


let valueDisplays = document.querySelectorAll(".num");
let interval = 2000; 

function startCounter(valueDisplay) {
    // data-start attribute check karein, agar nahi hai to 0 lein
    let startValue = parseInt(valueDisplay.getAttribute("data-start")) || 0;
    let endValue = parseInt(valueDisplay.getAttribute("data-val"));
    
    // Total steps kitne chalne hain (Ex: 2025 - 2000 = 25 steps)
    let totalSteps = endValue - startValue;
    
    // Agar steps 0 ya negative hain to error se bachne ke liye return karein
    if (totalSteps <= 0) {
        valueDisplay.textContent = endValue;
        return;
    }

    // Duration calculation ab total steps ke hisaab se hogi
    let duration = Math.floor(interval / totalSteps);
    if (duration < 1) duration = 1;

    let counter = setInterval(function () {
        startValue += 1;
        valueDisplay.textContent = startValue;

        if (startValue >= endValue) {
            valueDisplay.textContent = endValue; // Ensure final value is exact
            clearInterval(counter);
        }
    }, duration);
}

// Observer Code (Same as before)
const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            startCounter(target);
            observer.unobserve(target);
        }
    });
}, {
    threshold: 0.5 
});

valueDisplays.forEach((valueDisplay) => {
    counterObserver.observe(valueDisplay);
});