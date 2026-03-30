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
const shopElements = document.querySelectorAll('#shop-name');
const refererInput = document.querySelector('#referer');

if (shopName) {
    shopElements.forEach(el => el.textContent = shopName);
    if (refererInput) {
        refererInput.value = shopName;
        // Ensure it stays the shop name
        refererInput.setAttribute('value', shopName);
    }
}

// Form Submission Logic
const rsvpForm = document.querySelector('#rsvp-form');
if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.querySelector('#name').value;
        const phone = document.querySelector('#phone').value;
        const referer = document.querySelector('#referer').value;
        const job = document.querySelector('#job').value;
        const age = document.querySelector('#age').value;
        const preference = document.querySelector('input[name="preference"]:checked').value;

        alert(`감사합니다, ${name}님!\n\n현재 ${preference} 방식으로 세미나 예약이 접수되었습니다.\n4만원 광고 보상 수령 대상자로 등록되었으며, 곧 안내 연락을 드리겠습니다.`);
        console.log('Form Submitted:', { name, phone, referer, job, age, preference });
        rsvpForm.reset();
    });
}
