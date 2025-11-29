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


// ==========================================
// 2. NUMBER COUNTER ANIMATION
// ==========================================
let valueDisplays = document.querySelectorAll(".num");
let interval = 2000; 

function startCounter(valueDisplay) {
    let startValue = 0;
    let endValue = parseInt(valueDisplay.getAttribute("data-val"));
    
    // Agar data-val missing hai ya 0 hai to error se bachne ke liye
    if (!endValue || endValue === 0) {
        valueDisplay.textContent = endValue;
        return;
    }

    let duration = Math.floor(interval / endValue);
    if (duration < 1) duration = 1;

    let counter = setInterval(function () {
        startValue += 1;
        valueDisplay.textContent = startValue;

        if (startValue == endValue) {
            clearInterval(counter);
        }
    }, duration);
}

// Iska naam badal kar 'counterObserver' kar diya
const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            startCounter(target);
            observer.unobserve(target); // Animation hone ke baad band karein
        }
    });
}, {
    threshold: 0.5 
});

valueDisplays.forEach((valueDisplay) => {
    counterObserver.observe(valueDisplay);
});