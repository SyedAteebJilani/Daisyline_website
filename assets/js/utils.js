/* Reusable Utility Functions */
const Utils = {
    $: (selector, scope = document) => scope.querySelector(selector),
    $$: (selector, scope = document) => Array.from(scope.querySelectorAll(selector)),
    formatPKR: (amount) => `PKR ${Number(amount).toLocaleString()}`,
    debounce: (func, delay = 250) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), delay);
        };
    },
    makeSvgBg: (title, bgHex = '#FFF0F3', textHex = '#5A6B53', emoji = '🧶') => {
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
            <rect width="600" height="600" fill="${bgHex}"/>
            <circle cx="300" cy="300" r="220" fill="none" stroke="${textHex}" stroke-width="2" stroke-dasharray="8 8" opacity="0.3"/>
            <circle cx="300" cy="220" r="90" fill="#FFFFFF" opacity="0.85"/>
            <text x="300" y="240" font-family="'Plus Jakarta Sans', sans-serif" font-size="70" text-anchor="middle" fill="${textHex}">${emoji}</text>
            <text x="300" y="380" font-family="'Cormorant Garamond', serif" font-size="34" font-weight="600" text-anchor="middle" fill="${textHex}">${title}</text>
            <text x="300" y="420" font-family="'Plus Jakarta Sans', sans-serif" font-size="16" letter-spacing="3" text-anchor="middle" fill="${textHex}" opacity="0.6">DAISYLINE HANDMADE</text>
        </svg>`;
        return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
    }
};
