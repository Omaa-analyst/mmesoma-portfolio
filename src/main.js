/* ═══════════════════════════════════════════════════════
   MMESOMA VICTORY NWACHUKWU — PORTFOLIO JAVASCRIPT
   ─────────────────────────────────────────────────────
   1. Theme Switcher   (dark / light / system)
   2. Role Typewriter  (animated job title)
   3. Scroll Reveal    (fade-in on scroll)
   4. Project Filter   (filter by category)
   5. Contact Form     (submit feedback)
═══════════════════════════════════════════════════════ */


/* ══════════════════════════════════════════════════════
   1. THEME SWITCHER
   ──────────────────────────────────────────────────────
   - Three options: light, system, dark
   - "system" reads the OS preference via matchMedia
   - Choice is saved to localStorage so it persists
     after the browser is closed and reopened
══════════════════════════════════════════════════════ */
function applyTheme(choice) {
  // If "system", resolve to actual dark/light based on OS setting
  const resolved = choice === 'system'
    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : choice;

  // Apply to <body data-theme="..."> — CSS variables react automatically
  document.body.setAttribute('data-theme', resolved);

  // Highlight the active button in the toggle group
  ['light', 'system', 'dark'].forEach(x => {
    document.getElementById('btn-' + x).classList.toggle('active', x === choice);
  });

  // Persist choice
  localStorage.setItem('theme', choice);
}

// Called when user clicks a theme button
function setTheme(choice) {
  applyTheme(choice);
}

// On page load: restore saved preference, or default to "system"
(function initTheme() {
  const saved = localStorage.getItem('theme') || 'system';
  applyTheme(saved);

  // If user changes OS theme while page is open, re-apply if set to "system"
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (localStorage.getItem('theme') === 'system') applyTheme('system');
  });
})();


/* ══════════════════════════════════════════════════════
   2. ROLE TYPEWRITER
   ──────────────────────────────────────────────────────
   - Cycles through an array of job titles
   - Types each letter forward, pauses, then deletes
   - Automatically picks "a" or "an" based on whether
     the role starts with a vowel sound
   - Runs forever in a loop
══════════════════════════════════════════════════════ */
const roles = [
  'Data Scientist',
  'AI Expert',
  'Data Analyst',
  'Business Intelligence Analyst',
  'ML Engineer',
  'Writer & Storyteller',
  'Insight Strategist',
];

// Returns "an" if the word starts with a vowel sound, otherwise "a"
function getArticle(word) {
  return /^[aeiouAEIOU]/.test(word.trim()) ? 'an' : 'a';
}

let roleIndex  = 0;    // which role we're currently on
let charIndex  = 0;    // how many characters are currently shown
let isDeleting = false;

const roleTextEl    = document.getElementById('roleText');
const roleArticleEl = document.getElementById('roleArticle');

function typeRole() {
  const currentWord = roles[roleIndex];

  // ALWAYS update the article FIRST before touching the text
  // This means "a" vs "an" is correct from the very first keystroke
  roleArticleEl.textContent = getArticle(currentWord);

  if (!isDeleting) {
    // TYPE: add one more character
    roleTextEl.textContent = currentWord.slice(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentWord.length) {
      // Finished typing — pause 1.8s then start deleting
      setTimeout(() => { isDeleting = true; typeRole(); }, 1800);
      return;
    }
  } else {
    // DELETE: remove one character
    roleTextEl.textContent = currentWord.slice(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      // Finished deleting — move to next role
      isDeleting = false;
      roleIndex  = (roleIndex + 1) % roles.length;

      // Update article immediately when switching to new word
      // so it's never briefly wrong between words
      roleArticleEl.textContent = getArticle(roles[roleIndex]);
    }
  }

  // Deleting is faster (55ms) than typing (95ms) for a natural feel
  setTimeout(typeRole, isDeleting ? 55 : 95);
}

// Set the correct article for the VERY FIRST word ("Data Scientist" → "a")
// before typing even begins, so it's never "an Data Scientist" for a split second
roleArticleEl.textContent = getArticle(roles[0]);

// Start typing after a short delay so the page loads first
setTimeout(typeRole, 1000);


/* ══════════════════════════════════════════════════════
   3. SCROLL REVEAL
   ──────────────────────────────────────────────────────
   - Every element with class "reveal" starts hidden
     (opacity: 0, slightly below its final position)
   - IntersectionObserver watches them
   - When 8% of the element enters the viewport,
     add class "visible" → CSS transition plays
   - Stagger: each element in a batch waits 65ms longer
     than the previous one (cascade effect)
   - Stop watching after revealed (performance)
══════════════════════════════════════════════════════ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Stagger the animation for multiple elements entering at once
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 65);

      // No need to keep watching once revealed
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.08,          // trigger when 8% visible
  rootMargin: '0px 0px -35px 0px'  // trigger slightly before the bottom edge
});

// Attach observer to all reveal elements
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* ══════════════════════════════════════════════════════
   4. PROJECT FILTER
   ──────────────────────────────────────────────────────
   - Each project card has a data-cat attribute
     e.g. data-cat="ai", data-cat="bi"
   - Clicking a filter button shows only matching cards
   - "All" shows everything
══════════════════════════════════════════════════════ */
function filter(category, clickedBtn) {
  // Remove "on" (active) class from all filter buttons
  document.querySelectorAll('.fb').forEach(btn => btn.classList.remove('on'));

  // Mark this button as active
  clickedBtn.classList.add('on');

  // Show/hide project cards based on category
  document.querySelectorAll('.pcard').forEach(card => {
    const matches = category === 'all' || card.dataset.cat === category;
    card.style.display = matches ? 'flex' : 'none';
  });
}

// Expose filter to HTML onclick attributes
window.filter = filter;


/* ══════════════════════════════════════════════════════
   5. CONTACT FORM
   ──────────────────────────────────────────────────────
   - Prevents the default form submit (page reload)
   - Shows a visual success state on the button
   - Resets after 3.5 seconds
   - NOTE: To actually send emails, connect to a service
     like Formspree, EmailJS, or Netlify Forms
══════════════════════════════════════════════════════ */
function sendMsg(event) {
  event.preventDefault(); // Stop form from reloading the page

  const btn = event.target.querySelector('.csend');
  const originalHTML = btn.innerHTML;

  // Success state
  btn.textContent = 'Message Sent ✓';
  btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
  btn.disabled = true;

  // Reset after 3.5 seconds
  setTimeout(() => {
    btn.innerHTML = originalHTML;
    btn.style.background = '';
    btn.disabled = false;
  }, 3500);
}

// Expose sendMsg to HTML onsubmit attribute
window.sendMsg = sendMsg;
