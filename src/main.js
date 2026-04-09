/**
 * Intersection Observer for Reveal Animations
 * - Add 'reveal' class to HTML elements to make them slide up on scroll.
 */
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Floating CTA Visibility Logic
const floatingCta = document.querySelector('#floating-cta-container');
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    
    // Show after hero section (roughly 600px)
    if (scrolled > 600) {
        floatingCta.classList.remove('hidden');
        floatingCta.classList.add('visible');
    } else {
        floatingCta.classList.add('hidden');
        floatingCta.classList.remove('visible');
    }

    // Subtle Parallax effect for hero visual
    const heroImg = document.querySelector('.hero-img');
    if (heroImg && scrolled < 1000) {
        heroImg.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

/**
 * Handle Dynamic URL Params (e.g., ?shop=CafeName)
 * - 'shop' 파라미터가 있으면 매장명을 페이지 곳곳에 반영하고 폼 필드에도 채워줍니다.
 */
const urlParams = new URLSearchParams(window.location.search);
const shopName = urlParams.get('shop') || '로컬 매장';
const shopElements = document.querySelectorAll('.shop-name');
const refererInput = document.querySelector('#referer');

if (shopName) {
    shopElements.forEach(el => el.textContent = shopName);
    if (refererInput) {
        refererInput.value = shopName;
        // Ensure it stays the shop name
        refererInput.setAttribute('value', shopName);
    }
}

// Multi-step Stepper Form Logic
const formSteps = document.querySelectorAll('.form-step');
const progressBar = document.getElementById('progress-bar');
let currentStep = 1;
const totalSteps = formSteps.length;

function updateStepper() {
    formSteps.forEach(step => {
        const stepNum = parseInt(step.dataset.step);
        step.classList.toggle('active', stepNum === currentStep);
    });
    
    // Update progress bar
    if (progressBar) {
        const progress = (currentStep / totalSteps) * 100;
        progressBar.style.width = `${progress}%`;
    }
    
    // Visual feedback for mobile (scroll back to top of form)
    if (currentStep > 1) {
        const formHeader = document.querySelector('.form-wrapper h2');
        if (formHeader) {
            formHeader.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
}

// Next/Prev Navigation
document.querySelectorAll('.btn-next').forEach(btn => {
    // Only handle 'next' logic for type="button" buttons. Submit button is handled by form submit.
    if (btn.type === 'button') {
        btn.addEventListener('click', () => {
            const stepEl = formSteps[currentStep - 1];
            const inputs = stepEl.querySelectorAll('input:not([type="radio"]), select');
            let isValid = true;
            
            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value) {
                    input.style.borderColor = '#ff4444';
                    input.focus();
                    isValid = false;
                } else {
                    input.style.borderColor = '';
                }
            });

            if (isValid && currentStep < totalSteps) {
                currentStep++;
                updateStepper();
            }
        });
    }
});

document.querySelectorAll('.btn-prev').forEach(btn => {
    btn.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            updateStepper();
        }
    });
});

// Final Form Submission (Connect to Google Forms)
const rsvpForm = document.querySelector('#rsvp-form');
if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Final validate (Privacy)
        const privacy = document.getElementById('privacy-agreement');
        if (!privacy.checked) {
            alert('개인정보 수집 및 연락 동의가 필요합니다.');
            return;
        }

        // Get form values
        const name = document.querySelector('#name').value;
        const phone = document.querySelector('#phone').value;
        const referer = document.querySelector('#referer').value;
        const job = document.querySelector('#job').value;
        const age = document.querySelector('#age').value;
        const preference = document.querySelector('input[name="preference"]:checked').value;
        const preferredTime = document.querySelector('input[name="preferred-time"]:checked').value; // 추가된 필드

        // Google Form Submission URL (formResponse)
        const GFORM_URL = 'https://docs.google.com/forms/d/15fLXw230cVqct_wpILr14WagcWgMfPawcCLu_s6Uirg/formResponse';

        // Map local fields to Google Form entry IDs
        const formData = new FormData();
        formData.append('entry.1873593474', name);
        formData.append('entry.1511710695', phone);
        formData.append('entry.600478127', referer);
        formData.append('entry.1211908548', job);
        formData.append('entry.1858549790', age);
        formData.append('entry.2037368284', preference); // 세미나 방식 (1:1/단체)
        formData.append('entry.1963810709', preferredTime); // 선호 시간대 필드

        // Submit to Google Form using fetch (Hidden Submission)
        fetch(GFORM_URL, {
            method: 'POST',
            mode: 'no-cors', // Essential for Google Form bypass
            body: formData
        }).then(() => {
            // Success UX
            alert(`감사합니다, ${name}님!\n\n세미나 예약 신청이 완료되었습니다.\n구글 시트에 성공적으로 저장되었으며, 곧 안내 연락을 드리겠습니다.`);
            
            // Reset form and go back to first step
            rsvpForm.reset();
            currentStep = 1;
            updateStepper();
        }).catch(err => {
            console.error('Submission error:', err);
            alert('일시적인 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
        });
    });
}

// Auto-play review video when visible
const reviewVideo = document.getElementById('review-video');
const unmuteBtn = document.getElementById('unmute-btn');

if (reviewVideo) {
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                reviewVideo.play().catch(e => console.log('Autoplay prevented:', e));
            } else {
                reviewVideo.pause();
            }
        });
    }, { threshold: 0.5 });
    videoObserver.observe(reviewVideo);
    
    // Tap to unmute logic
    if (unmuteBtn) {
        // Toggle sound and play on overlay click
        unmuteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            reviewVideo.muted = false;
            reviewVideo.play();
            unmuteBtn.classList.add('hidden');
        });

        // Hide overlay if user unmutes via native controls
        reviewVideo.addEventListener('volumechange', () => {
            if (!reviewVideo.muted && reviewVideo.volume > 0) {
                unmuteBtn.classList.add('hidden');
            }
        });
    }
}

// Urgency Countdown Timer Update (Midnight deadline)
function updateCounters() {
    const timers = document.querySelectorAll('.countdown-timer');
    if (!timers.length) return;

    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const diff = tomorrow - now;

    if (diff <= 0) {
        timers.forEach(timer => timer.textContent = '00 : 00 : 00');
        return;
    }

    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    const format = (num) => num.toString().padStart(2, '0');
    const timeString = `${format(h)} : ${format(m)} : ${format(s)}`;
    
    timers.forEach(timer => timer.textContent = timeString);
}
setInterval(updateCounters, 1000);
updateCounters();
