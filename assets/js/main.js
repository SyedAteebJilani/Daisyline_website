/* ==========================================================================
   DAISYLINE CROCHET — MASTER E-COMMERCE JAVASCRIPT ENGINE
   Role: Principal Frontend Architect & JS System Designer
   Sprint 1–11: Complete Shared Architecture, Modular State Management,
   Cart Drawer, Wishlist, Quick View, Search, & Refactored Utilities.
   ========================================================================== */

'use strict';

/* --------------------------------------------------------------------------
   1. GLOBAL CONFIGURATION & CONSTANTS
   -------------------------------------------------------------------------- */
const CONFIG = {
    SITE_NAME: 'Daisyline Crochet',
    CURRENCY: 'PKR',
    STORAGE_KEYS: {
        CART: 'daisyline_cart',
        WISHLIST: 'daisyline_wishlist',
        RECENTLY_VIEWED: 'daisyline_recently_viewed'
    },
    TIMINGS: {
        ANNOUNCEMENT_ROTATOR: 4500,
        HERO_SLIDER: 4500,
        TESTIMONIAL_SLIDER: 5500,
        TOAST_DISMISS: 3200
    }
};

/* --------------------------------------------------------------------------
   2. REUSABLE UTILITIES & HELPERS
   -------------------------------------------------------------------------- */
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

/* --------------------------------------------------------------------------
   3. SHARED PRODUCT CATALOG DATA
   -------------------------------------------------------------------------- */
const PRODUCTS_CATALOG = [
    {
        id: 'prod-1',
        name: 'Blush Rose Gajra',
        category: 'Gajras',
        subcategory: 'Floral Gajras',
        price: 1850,
        priceFormatted: 'PKR 1,850',
        rating: 5.0,
        reviews: 24,
        bg: '#FFF0F3',
        text: '#5A6B53',
        emoji: '🌸',
        badges: ['NEW'],
        badgeClass: 'dl-badge-new-tag',
        inStock: true,
        description: 'Handcrafted floral crochet Gajra featuring soft blush petals and gold accent beads.',
        colors: ['Blush Pink', 'Cream White', 'Soft Sage'],
        materials: ['Milk Cotton'],
        sizes: ['Standard']
    },
    {
        id: 'prod-2',
        name: 'Sunflower Bouquet',
        category: 'Bouquets',
        subcategory: 'Flower Bouquets',
        price: 2450,
        priceFormatted: 'PKR 2,450',
        rating: 4.9,
        reviews: 38,
        bg: '#FFEBE3',
        text: '#5A6B53',
        emoji: '🌻',
        badges: ['HANDMADE'],
        badgeClass: 'dl-badge-handmade-tag',
        inStock: true,
        description: 'Everlasting handcrafted sunflower bouquet wrapped in vintage kraft paper with ribbon.',
        colors: ['Bright Yellow', 'Golden Sun'],
        materials: ['Milk Cotton'],
        sizes: ['Medium', 'Large']
    },
    {
        id: 'prod-3',
        name: 'Pastel Hair Clips Set',
        category: 'Hair Accessories',
        subcategory: 'Hair Clips',
        price: 950,
        priceFormatted: 'PKR 950',
        rating: 5.0,
        reviews: 16,
        bg: '#F5EFE6',
        text: '#5A6B53',
        emoji: '🎀',
        badges: ['SALE'],
        badgeClass: 'dl-badge-sale-tag',
        inStock: true,
        description: 'Set of 3 handcrafted crochet daisy clips with non-slip metal alligator backing.',
        colors: ['Pastel Mix', 'Cream', 'Pink'],
        materials: ['Cotton'],
        sizes: ['One Size']
    },
    {
        id: 'prod-4',
        name: 'Cozy Knit Cardigan',
        category: 'Wearables',
        subcategory: 'Cardigans',
        price: 6800,
        priceFormatted: 'PKR 6,800',
        rating: 5.0,
        reviews: 42,
        bg: '#FAF8F5',
        text: '#5A6B53',
        emoji: '🧥',
        badges: ['BOUTIQUE'],
        badgeClass: 'dl-badge-new-tag',
        inStock: true,
        description: 'Ultra-soft chunky hand-knit cardigan with floral granny square pattern.',
        colors: ['Oatmeal', 'Blush', 'Sage'],
        materials: ['Milk Cotton', 'Soft Wool'],
        sizes: ['Small', 'Medium', 'Large']
    },
    {
        id: 'prod-5',
        name: 'Daisy Charm Keychain',
        category: 'Keychains',
        subcategory: 'Bag Charms',
        price: 750,
        priceFormatted: 'PKR 750',
        rating: 4.8,
        reviews: 19,
        bg: '#FFF0F3',
        text: '#5A6B53',
        emoji: '🌼',
        badges: ['LIMITED'],
        badgeClass: 'dl-badge-limited-tag',
        inStock: true,
        description: 'Adorable handmade daisy flower keychain with solid brass keyring ring.',
        colors: ['White', 'Yellow', 'Pink'],
        materials: ['Cotton'],
        sizes: ['Standard']
    },
    {
        id: 'prod-6',
        name: 'Handwoven Tote Bag',
        category: 'Bags',
        subcategory: 'Tote Bags',
        price: 4200,
        priceFormatted: 'PKR 4,200',
        rating: 5.0,
        reviews: 84,
        bg: '#F5EFE6',
        text: '#5A6B53',
        emoji: '👜',
        badges: ['BEST SELLER'],
        badgeClass: 'dl-badge-bestseller-tag',
        inStock: true,
        description: 'Spacious handcrafted tote bag with reinforced handles and optional satin lining.',
        colors: ['Beige', 'Cream', 'Sage'],
        materials: ['Milk Cotton'],
        sizes: ['Medium', 'Large']
    },
    {
        id: 'prod-7',
        name: 'Velvet Bear Plushie',
        category: 'Plushies',
        subcategory: 'Characters',
        price: 2900,
        priceFormatted: 'PKR 2,900',
        rating: 5.0,
        reviews: 62,
        bg: '#FFEBE3',
        text: '#5A6B53',
        emoji: '🧸',
        badges: ['HANDMADE'],
        badgeClass: 'dl-badge-handmade-tag',
        inStock: true,
        description: 'Ultra-soft plush bear crocheted with velvet yarn and safety eyes.',
        colors: ['Honey Brown', 'Cream'],
        materials: ['Velvet Yarn'],
        sizes: ['10 Inches']
    },
    {
        id: 'prod-8',
        name: 'Floral Coaster Set (4 Pcs)',
        category: 'Home Decor',
        subcategory: 'Coasters',
        price: 1600,
        priceFormatted: 'PKR 1,600',
        rating: 4.9,
        reviews: 53,
        bg: '#FAF8F5',
        text: '#5A6B53',
        emoji: '☕',
        badges: ['BEST SELLER'],
        badgeClass: 'dl-badge-bestseller-tag',
        inStock: true,
        description: 'Set of 4 heat-resistant handmade crochet flower coasters for dining & coffee tables.',
        colors: ['Pastel Multi', 'Ivory'],
        materials: ['Pure Cotton'],
        sizes: ['4.5 Inches']
    }
];

/* --------------------------------------------------------------------------
   4. LOCALSTORAGE STATE MANAGER
   -------------------------------------------------------------------------- */
class ShoppingStore {
    constructor() {
        this.cart = this.getStorage(CONFIG.STORAGE_KEYS.CART, []);
        this.wishlist = this.getStorage(CONFIG.STORAGE_KEYS.WISHLIST, []);
        this.recentlyViewed = this.getStorage(CONFIG.STORAGE_KEYS.RECENTLY_VIEWED, []);
    }

    getStorage(key, fallback) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : fallback;
        } catch (e) {
            console.warn(`Storage read error [${key}]:`, e);
            return fallback;
        }
    }

    setStorage(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.warn(`Storage write error [${key}]:`, e);
        }
    }

    saveCart() {
        this.setStorage(CONFIG.STORAGE_KEYS.CART, this.cart);
        this.updateBadges();
        this.renderCartDrawer();
    }

    saveWishlist() {
        this.setStorage(CONFIG.STORAGE_KEYS.WISHLIST, this.wishlist);
        this.updateBadges();
    }

    saveRecentlyViewed() {
        this.setStorage(CONFIG.STORAGE_KEYS.RECENTLY_VIEWED, this.recentlyViewed);
    }

    addToCart(productId, qty = 1, color = '', size = '') {
        const prod = PRODUCTS_CATALOG.find(p => p.id === productId) || {
            id: productId, name: 'Crochet Item', price: 2500, priceFormatted: 'PKR 2,500', emoji: '🧶', bg: '#FFF0F3'
        };

        const existing = this.cart.find(item => item.id === productId && item.color === color && item.size === size);
        if (existing) {
            existing.qty += qty;
        } else {
            this.cart.push({
                id: prod.id,
                name: prod.name,
                price: prod.price,
                priceFormatted: prod.priceFormatted,
                emoji: prod.emoji,
                bg: prod.bg,
                qty: qty,
                color: color || (prod.colors ? prod.colors[0] : ''),
                size: size || (prod.sizes ? prod.sizes[0] : '')
            });
        }

        this.saveCart();
        showToast(`Added ${prod.name} to Cart! 💕`, 'ph-shopping-bag');
        openCartDrawer();
    }

    removeFromCart(index) {
        if (index >= 0 && index < this.cart.length) {
            const removed = this.cart.splice(index, 1)[0];
            this.saveCart();
            showToast(`Removed ${removed.name} from Cart`, 'ph-trash');
        }
    }

    updateCartQty(index, delta) {
        if (this.cart[index]) {
            this.cart[index].qty += delta;
            if (this.cart[index].qty <= 0) {
                this.cart.splice(index, 1);
            }
            this.saveCart();
        }
    }

    getCartSubtotal() {
        return this.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    }

    getCartTotalItems() {
        return this.cart.reduce((sum, item) => sum + item.qty, 0);
    }

    toggleWishlist(productId) {
        const idx = this.wishlist.indexOf(productId);
        const prod = PRODUCTS_CATALOG.find(p => p.id === productId);
        const name = prod ? prod.name : 'Item';

        if (idx >= 0) {
            this.wishlist.splice(idx, 1);
            this.saveWishlist();
            showToast(`Removed from Wishlist`, 'ph-heart-break');
        } else {
            this.wishlist.push(productId);
            this.saveWishlist();
            showToast(`Added ${name} to Wishlist! 💖`, 'ph-heart');
        }
    }

    isInWishlist(productId) {
        return this.wishlist.includes(productId);
    }

    addRecentlyViewed(productId) {
        this.recentlyViewed = this.recentlyViewed.filter(id => id !== productId);
        this.recentlyViewed.unshift(productId);
        if (this.recentlyViewed.length > 8) this.recentlyViewed.pop();
        this.saveRecentlyViewed();
    }

    updateBadges() {
        const cartBadges = Utils.$$('.dl-badge-cart');
        const wishlistBadges = Utils.$$('.dl-badge:not(.dl-badge-cart)');

        const totalCart = this.getCartTotalItems();
        const totalWish = this.wishlist.length;

        cartBadges.forEach(b => b.textContent = totalCart);
        wishlistBadges.forEach(b => b.textContent = totalWish);
    }

    renderCartDrawer() {
        const body = Utils.$('#dl-cart-drawer-items');
        const subtotalEl = Utils.$('#dl-cart-drawer-subtotal');
        const countEl = Utils.$('#dl-cart-drawer-count');

        if (!body) return;

        if (countEl) countEl.textContent = `(${this.getCartTotalItems()})`;
        if (subtotalEl) subtotalEl.textContent = Utils.formatPKR(this.getCartSubtotal());

        if (this.cart.length === 0) {
            body.innerHTML = `
                <div class="dl-empty-state" style="padding:40px 10px; margin:0; border:none;">
                    <div class="dl-empty-icon" style="font-size:44px;">🧶</div>
                    <h3 class="dl-empty-title" style="font-size:20px;">Your cart is empty</h3>
                    <p class="dl-empty-desc" style="font-size:13px;">Add handmade crochet pieces to your cart!</p>
                </div>
            `;
            return;
        }

        body.innerHTML = this.cart.map((item, idx) => {
            const svgBg = Utils.makeSvgBg(item.name, item.bg || '#FFF0F3', '#5A6B53', item.emoji || '🧶');
            return `
                <div class="dl-cart-item">
                    <img src="${svgBg}" alt="${item.name}" class="dl-cart-item-img">
                    <div class="dl-cart-item-info">
                        <div class="dl-cart-item-title">${item.name}</div>
                        <div class="dl-cart-item-price">${item.priceFormatted}</div>
                        ${item.color ? `<div style="font-size:11px; color:var(--dl-muted);">${item.color}</div>` : ''}
                        <div class="dl-qty-picker" style="margin-top:6px; transform:scale(0.85); transform-origin:left;">
                            <button class="dl-qty-btn" onclick="store.updateCartQty(${idx}, -1)">&minus;</button>
                            <span class="dl-qty-val">${item.qty}</span>
                            <button class="dl-qty-btn" onclick="store.updateCartQty(${idx}, 1)">&plus;</button>
                        </div>
                    </div>
                    <button class="dl-cart-item-remove" onclick="store.removeFromCart(${idx})" aria-label="Remove item">
                        <i class="ph ph-trash"></i>
                    </button>
                </div>
            `;
        }).join('');
    }
}

const store = new ShoppingStore();

/* --------------------------------------------------------------------------
   5. TOAST NOTIFICATION GENERATOR
   -------------------------------------------------------------------------- */
function showToast(message, iconClass = 'ph-check-circle') {
    let container = Utils.$('#dl-toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'dl-toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'dl-toast';
    toast.innerHTML = `<i class="ph ${iconClass} text-lg"></i> <span>${message}</span>`;
    
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-10px)';
        setTimeout(() => toast.remove(), 350);
    }, CONFIG.TIMINGS.TOAST_DISMISS);
}

/* --------------------------------------------------------------------------
   6. GLOBAL UI MODALS & DRAWERS
   -------------------------------------------------------------------------- */
function injectGlobalUIComponents() {
    if (!Utils.$('#dl-cart-drawer')) {
        const drawerHtml = `
            <div class="dl-drawer-overlay" id="dl-cart-overlay"></div>
            <aside class="dl-cart-drawer" id="dl-cart-drawer">
                <div class="dl-cart-drawer-header">
                    <span class="dl-cart-drawer-title">
                        <i class="ph ph-shopping-bag"></i> Your Cart <span id="dl-cart-drawer-count">(0)</span>
                    </span>
                    <button class="dl-drawer-close-btn" id="dl-cart-close-btn" aria-label="Close Cart">
                        <i class="ph ph-x"></i>
                    </button>
                </div>
                <div class="dl-cart-drawer-body" id="dl-cart-drawer-items">
                    <!-- Dynamic Cart Items -->
                </div>
                <div class="dl-cart-drawer-footer">
                    <div class="dl-cart-subtotal-row">
                        <span>Subtotal:</span>
                        <span id="dl-cart-drawer-subtotal">PKR 0</span>
                    </div>
                    <button class="dl-btn dl-btn-primary" style="width:100%; margin-bottom:8px;" onclick="alert('Proceeding to Checkout! 💕')">
                        Proceed to Checkout ⚡
                    </button>
                    <button class="dl-btn dl-btn-secondary" style="width:100%;" onclick="closeCartDrawer(); window.location.href='../../pages/shop.html'">
                        Continue Shopping
                    </button>
                </div>
            </aside>
        `;
        document.body.insertAdjacentHTML('beforeend', drawerHtml);
    }

    if (!Utils.$('#dl-quickview-modal')) {
        const qvHtml = `
            <div class="dl-quickview-modal" id="dl-quickview-modal">
                <div class="dl-quickview-box">
                    <button class="dl-quickview-close" id="dl-qv-close-btn"><i class="ph ph-x"></i></button>
                    <div class="dl-quickview-grid" id="dl-qv-content">
                        <!-- Dynamic Quick View Content -->
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', qvHtml);
    }
}

function openCartDrawer() {
    const drawer = Utils.$('#dl-cart-drawer');
    const overlay = Utils.$('#dl-cart-overlay');
    if (drawer) drawer.classList.add('open');
    if (overlay) overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeCartDrawer() {
    const drawer = Utils.$('#dl-cart-drawer');
    const overlay = Utils.$('#dl-cart-overlay');
    if (drawer) drawer.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
}

function openQuickView(productId) {
    const prod = PRODUCTS_CATALOG.find(p => p.id === productId) || PRODUCTS_CATALOG[0];
    const qvModal = Utils.$('#dl-quickview-modal');
    const qvContent = Utils.$('#dl-qv-content');

    if (!qvModal || !qvContent) return;

    const svgBg = Utils.makeSvgBg(prod.name, prod.bg, prod.text, prod.emoji);

    qvContent.innerHTML = `
        <div>
            <div class="dl-pdp-main-img-box" style="height:320px;">
                <img src="${svgBg}" alt="${prod.name}" class="dl-pdp-main-img">
            </div>
        </div>
        <div class="dl-pdp-info-panel">
            <span class="dl-pdp-stock-badge"><i class="ph ph-check-circle"></i> In Stock</span>
            <h2 class="dl-pdp-title" style="font-size:32px;">${prod.name}</h2>
            <div class="dl-stars">★★★★★ <span style="font-size:12px; color:var(--dl-muted);">(${prod.reviews} Reviews)</span></div>
            <div class="dl-pdp-price">${prod.priceFormatted}</div>
            <p class="dl-pdp-desc-short">${prod.description}</p>
            <div class="dl-pdp-btn-group">
                <button class="dl-btn dl-btn-primary" onclick="store.addToCart('${prod.id}'); closeQuickView();">Add to Cart</button>
                <button class="dl-btn dl-btn-secondary" onclick="window.location.href='../../pages/product.html'">View Full Details</button>
            </div>
        </div>
    `;

    qvModal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeQuickView() {
    const qvModal = Utils.$('#dl-quickview-modal');
    if (qvModal) qvModal.classList.remove('open');
    document.body.style.overflow = '';
}

/* --------------------------------------------------------------------------
   7. APPLICATION BOOTSTRAP
   -------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
    injectGlobalUIComponents();
    store.updateBadges();
    store.renderCartDrawer();

    // Global Event Delegation for Cart & Search Triggers
    Utils.$$('.dl-cart-icon').forEach(icon => {
        icon.addEventListener('click', (e) => {
            e.preventDefault();
            openCartDrawer();
        });
    });

    const cartCloseBtn = Utils.$('#dl-cart-close-btn');
    const cartOverlay = Utils.$('#dl-cart-overlay');
    if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCartDrawer);
    if (cartOverlay) cartOverlay.addEventListener('click', closeCartDrawer);

    const qvCloseBtn = Utils.$('#dl-qv-close-btn');
    if (qvCloseBtn) qvCloseBtn.addEventListener('click', closeQuickView);

    
    // ==== GLOBAL SEARCH LOGIC ====
    const desktopSearchBar = Utils.$('#dl-desktop-search-bar');
    const desktopSearchInput = Utils.$('#dl-search-input');
    const desktopSearchClose = Utils.$('#dl-search-close');
    const desktopSearchResults = Utils.$('#dl-desktop-search-results');

    const mobileSearchModal = Utils.$('#dl-search-modal');
    const mobileSearchInput = Utils.$('#dl-mobile-search-input');
    const mobileSearchClose = Utils.$('#dl-search-modal-close');
    const mobileSearchResults = Utils.$('#dl-mobile-search-results');
    
    // Quick tags mapping
    const quickTags = Utils.$$('.dl-search-quick-tags a');

    // The search triggers
    const searchTriggers = Utils.$$('.dl-search-trigger');

    const renderSearchResults = (query, container) => {
        if (!query.trim()) {
            container.innerHTML = '';
            container.classList.remove('active');
            return;
        }

        const lowerQuery = query.toLowerCase().trim();
        const results = PRODUCTS_CATALOG.filter(p => {
            return (p.name && p.name.toLowerCase().includes(lowerQuery)) ||
                   (p.category && p.category.toLowerCase().includes(lowerQuery)) ||
                   (p.subCategory && p.subCategory.toLowerCase().includes(lowerQuery));
        });

        if (results.length === 0) {
            container.innerHTML = '<div class="dl-search-no-results">No products found.</div>';
            container.classList.add('active');
            return;
        }

        const html = results.map(item => {
            const imgSrc = Utils.makeSvgBg(item.name, item.bg, item.text, item.emoji);
            return `
                <a href="./product.html?id=${item.id}" class="dl-search-result-item">
                    <img src="${imgSrc}" alt="${item.name}" class="dl-search-result-img">
                    <div class="dl-search-result-info">
                        <span class="dl-search-result-name">${item.name}</span>
                        <span class="dl-search-result-price">Rs. ${item.price}</span>
                    </div>
                </a>
            `;
        }).join('');

        container.innerHTML = html;
        container.classList.add('active');
    };

    searchTriggers.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (window.innerWidth >= 1024) {
                if (desktopSearchBar) {
                    desktopSearchBar.classList.add('active');
                    if (desktopSearchInput) desktopSearchInput.focus();
                }
            } else {
                if (mobileSearchModal) {
                    mobileSearchModal.classList.add('active');
                    if (mobileSearchInput) mobileSearchInput.focus();
                }
            }
        });
    });

    const closeAllSearch = () => {
        if (desktopSearchBar) {
            desktopSearchBar.classList.remove('active');
            if (desktopSearchInput) desktopSearchInput.value = '';
            if (desktopSearchResults) {
                desktopSearchResults.innerHTML = '';
                desktopSearchResults.classList.remove('active');
            }
        }
        if (mobileSearchModal) {
            mobileSearchModal.classList.remove('active');
            if (mobileSearchInput) mobileSearchInput.value = '';
            if (mobileSearchResults) {
                mobileSearchResults.innerHTML = '';
                mobileSearchResults.classList.remove('active');
            }
        }
    };

    if (desktopSearchClose) {
        desktopSearchClose.addEventListener('click', closeAllSearch);
    }
    if (mobileSearchClose) {
        mobileSearchClose.addEventListener('click', closeAllSearch);
    }
    
    // Close on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeAllSearch();
    });

    // Close when clicking outside desktop search
    document.addEventListener('click', (e) => {
        if (desktopSearchBar && desktopSearchBar.classList.contains('active')) {
            // If click is outside the search bar and not on a trigger
            if (!desktopSearchBar.contains(e.target) && !e.target.closest('.dl-search-trigger')) {
                closeAllSearch();
            }
        }
        if (mobileSearchModal && mobileSearchModal.classList.contains('active')) {
             if (e.target === mobileSearchModal) {
                 closeAllSearch();
             }
        }
    });

    if (desktopSearchInput) {
        desktopSearchInput.addEventListener('input', (e) => {
            if (desktopSearchResults) renderSearchResults(e.target.value, desktopSearchResults);
        });
    }

    if (mobileSearchInput) {
        mobileSearchInput.addEventListener('input', (e) => {
            if (mobileSearchResults) renderSearchResults(e.target.value, mobileSearchResults);
        });
    }

    // Quick tags logic
    quickTags.forEach(tag => {
        tag.addEventListener('click', (e) => {
            e.preventDefault();
            const tagText = e.target.textContent;
            if (window.innerWidth >= 1024) {
                if (desktopSearchInput) {
                    desktopSearchInput.value = tagText;
                    if (desktopSearchResults) renderSearchResults(tagText, desktopSearchResults);
                }
            } else {
                if (mobileSearchInput) {
                    mobileSearchInput.value = tagText;
                    if (mobileSearchResults) renderSearchResults(tagText, mobileSearchResults);
                }
            }
        });
    });

    // Announcement Rotator
    const annSlides = Utils.$$('.dl-announcement-slide');
    let annIndex = 0;
    if (annSlides.length > 1) {
        setInterval(() => {
            annSlides[annIndex].classList.remove('active');
            annIndex = (annIndex + 1) % annSlides.length;
            annSlides[annIndex].classList.add('active');
        }, CONFIG.TIMINGS.ANNOUNCEMENT_ROTATOR);
    }

    // Mobile Navigation Drawer
    const mobileMenuBtn = Utils.$('#dl-mobile-menu-btn');
    const drawerCloseBtn = Utils.$('#dl-drawer-close-btn');
    const drawer = Utils.$('#dl-mobile-drawer');
    const drawerOverlay = Utils.$('#dl-drawer-overlay');

    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', () => {
        if (drawer) drawer.classList.add('open');
        if (drawerOverlay) drawerOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    });

    const closeMobileMenu = () => {
        if (drawer) drawer.classList.remove('open');
        if (drawerOverlay) drawerOverlay.classList.remove('open');
        document.body.style.overflow = '';
    };

    if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeMobileMenu);
    if (drawerOverlay) drawerOverlay.addEventListener('click', closeMobileMenu);

    // Render Product Cards
    const renderProductCardHTML = (item) => {
        const imgSrc = Utils.makeSvgBg(item.name, item.bg, item.text, item.emoji);
        const tagClass = item.badgeClass || '';
        const badgeText = item.badges ? item.badges[0] : '';

        return `
            <div class="dl-product-card dl-reveal">
                <div class="dl-product-img-wrap">
                    ${badgeText ? `<span class="dl-product-tag ${tagClass}">${badgeText}</span>` : ''}
                    <button class="dl-wishlist-btn ${store.isInWishlist(item.id) ? 'active' : ''}" aria-label="Add to wishlist" onclick="store.toggleWishlist('${item.id}'); this.classList.toggle('active');">
                        <i class="ph ph-heart text-lg"></i>
                    </button>
                    <a href="../../pages/product.html">
                        <img src="${imgSrc}" alt="${item.name}" class="dl-product-img" loading="lazy">
                    </a>
                    <div class="dl-product-actions">
                        <button class="dl-btn-product dl-btn-quick" onclick="openQuickView('${item.id}')">👁 Quick View</button>
                        <button class="dl-btn-product dl-btn-cart" onclick="store.addToCart('${item.id}')">Add to Cart</button>
                    </div>
                </div>
                <div class="dl-product-info">
                    <div>
                        <div class="dl-product-rating">
                            ★★★★★ <span>${item.rating} (${item.reviews})</span>
                        </div>
                        <h3 class="dl-product-title"><a href="../../pages/product.html" style="color:inherit; text-decoration:none;">${item.name}</a></h3>
                    </div>
                    <div class="dl-product-price">${item.priceFormatted}</div>
                </div>
            </div>
        `;
    };

    const newTrack = Utils.$('#new-arrivals-track');
    const bestTrack = Utils.$('#best-sellers-track');
    const mainShopGrid = Utils.$('#dl-shop-product-grid');

    if (newTrack) newTrack.innerHTML = PRODUCTS_CATALOG.slice(0, 5).map(renderProductCardHTML).join('');
    if (bestTrack) bestTrack.innerHTML = PRODUCTS_CATALOG.slice(3, 8).map(renderProductCardHTML).join('');
    if (mainShopGrid) mainShopGrid.innerHTML = PRODUCTS_CATALOG.map(renderProductCardHTML).join('');

    
    // ----------------- SPRINT 3 ADDITIONS -----------------
    // 1. Featured Products (10 demo products)
    const featuredTrack = Utils.$('#featured-track');
    if (featuredTrack && PRODUCTS_CATALOG) {
        let featuredProducts = PRODUCTS_CATALOG.slice(0, 10);
        // Duplicate to ensure there are at least 8-10 if the array is small
        if (featuredProducts.length < 8) {
            featuredProducts = [...featuredProducts, ...featuredProducts].slice(0, 10);
        }
        featuredTrack.innerHTML = featuredProducts.map(renderProductCardHTML).join('');
    }

    // 2. Customer Reviews (6 demo reviews)
    const testimonialSlider = Utils.$('#testimonial-slider');
    if (testimonialSlider) {
        const demoReviews = [
            { name: 'Ayesha Khan', city: 'Karachi', rating: '★★★★★', text: 'Absolutely love the crochet blanket! So soft and the colors are exactly as shown.' },
            { name: 'Fatima Ali', city: 'Lahore', rating: '★★★★★', text: 'The custom keychain is adorable. Beautiful craftsmanship and fast delivery.' },
            { name: 'Zainab Qureshi', city: 'Islamabad', rating: '★★★★★', text: 'Bought the baby set for my niece and it is perfect. So gentle on her skin.' },
            { name: 'Sana R.', city: 'Rawalpindi', rating: '★★★★☆', text: 'Beautiful tote bag. The stitching is very sturdy. Highly recommend DaisyLine!' },
            { name: 'Hira S.', city: 'Multan', rating: '★★★★★', text: 'The sunflower bouquet is gorgeous and never dies! Looks beautiful on my desk.' },
            { name: 'Nida W.', city: 'Peshawar', rating: '★★★★★', text: 'Very impressed with the quality of the crochet cardigan. Warm and cozy.' }
        ];
        
        const renderReview = (r) => `
            <div class="dl-testimonial-card">
                <div class="dl-testimonial-card-inner">
                    <div class="dl-testimonial-icon">❝</div>
                    <div class="dl-testimonial-rating">${r.rating}</div>
                    <p class="dl-testimonial-text">"${r.text}"</p>
                    <div class="dl-testimonial-author">
                        <strong>${r.name}</strong>
                        <span>${r.city}</span>
                    </div>
                </div>
            </div>
        `;

        const cardsHTML = demoReviews.map(renderReview).join('');
        const dotsHTML = demoReviews.map((_, i) => `<button class="dl-test-dot ${i === 0 ? 'active' : ''}" data-index="${i}" aria-label="Go to slide ${i + 1}"></button>`).join('');

        testimonialSlider.innerHTML = `
            <div class="dl-testimonial-carousel">
                <div class="dl-testimonial-track" id="testimonial-track">
                    ${cardsHTML}
                </div>
                <button class="dl-test-nav prev" id="test-prev" aria-label="Previous Review">
                    <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"></path></svg>
                </button>
                <button class="dl-test-nav next" id="test-next" aria-label="Next Review">
                    <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path></svg>
                </button>
            </div>
            <div class="dl-test-dots-container" id="test-dots">
                ${dotsHTML}
            </div>
        `;

        // Carousel Logic
        const track = Utils.$('#testimonial-track');
        const dots = Utils.$$('.dl-test-dot', testimonialSlider);
        const prevBtn = Utils.$('#test-prev');
        const nextBtn = Utils.$('#test-next');
        let currentIndex = 0;
        let isDragging = false;
        let startPos = 0;
        let currentTranslate = 0;
        let prevTranslate = 0;
        let autoPlayInterval;

        const updateCarousel = (index) => {
            const cards = Utils.$$('.dl-testimonial-card', track);
            if (!cards.length) return;
            const cardWidth = cards[0].offsetWidth;
            currentTranslate = -(index * cardWidth);
            prevTranslate = currentTranslate;
            track.style.transform = `translateX(${currentTranslate}px)`;
            
            dots.forEach(d => d.classList.remove('active'));
            if (dots[index]) dots[index].classList.add('active');
        };

        const nextSlide = () => {
            const visibleCards = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
            const maxIndex = demoReviews.length - visibleCards;
            currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
            updateCarousel(currentIndex);
        };

        const prevSlide = () => {
            const visibleCards = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
            const maxIndex = demoReviews.length - visibleCards;
            currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
            updateCarousel(currentIndex);
        };

        const startAutoPlay = () => {
            stopAutoPlay();
            autoPlayInterval = setInterval(nextSlide, 4500);
        };

        const stopAutoPlay = () => clearInterval(autoPlayInterval);

        nextBtn.addEventListener('click', () => { nextSlide(); startAutoPlay(); });
        prevBtn.addEventListener('click', () => { prevSlide(); startAutoPlay(); });
        
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                const visibleCards = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
                const maxIndex = demoReviews.length - visibleCards;
                currentIndex = Math.min(i, maxIndex);
                updateCarousel(currentIndex);
                startAutoPlay();
            });
        });

        testimonialSlider.addEventListener('mouseenter', stopAutoPlay);
        testimonialSlider.addEventListener('mouseleave', startAutoPlay);

        // Touch / Swipe Support
        const getPositionX = (event) => event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
        
        const touchStart = (index) => (event) => {
            isDragging = true;
            startPos = getPositionX(event);
            track.style.transition = 'none';
            stopAutoPlay();
        };

        const touchMove = (event) => {
            if (!isDragging) return;
            const currentPosition = getPositionX(event);
            const diff = currentPosition - startPos;
            const cards = Utils.$$('.dl-testimonial-card', track);
            const cardWidth = cards.length ? cards[0].offsetWidth : 0;
            const visibleCards = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
            const maxTranslate = -((demoReviews.length - visibleCards) * cardWidth);
            
            let targetTranslate = prevTranslate + diff;
            // Add resistance at edges
            if (targetTranslate > 0) targetTranslate = diff * 0.3;
            else if (targetTranslate < maxTranslate) targetTranslate = maxTranslate + (diff * 0.3);
            
            track.style.transform = `translateX(${targetTranslate}px)`;
        };

        const touchEnd = (event) => {
            isDragging = false;
            track.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
            const cards = Utils.$$('.dl-testimonial-card', track);
            const cardWidth = cards.length ? cards[0].offsetWidth : 0;
            const movedBy = track.style.transform.replace(/[^\d.-]/g, '') - prevTranslate;

            if (movedBy < -100) nextSlide();
            else if (movedBy > 100) prevSlide();
            else updateCarousel(currentIndex); // Snap back

            startAutoPlay();
        };

        track.addEventListener('touchstart', touchStart(currentIndex), { passive: true });
        track.addEventListener('touchmove', touchMove, { passive: true });
        track.addEventListener('touchend', touchEnd);
        track.addEventListener('mousedown', touchStart(currentIndex));
        track.addEventListener('mousemove', touchMove);
        track.addEventListener('mouseup', touchEnd);
        track.addEventListener('mouseleave', () => { if (isDragging) touchEnd(); });

        window.addEventListener('resize', () => {
            track.style.transition = 'none';
            // Recalculate max index on resize
            const visibleCards = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
            const maxIndex = demoReviews.length - visibleCards;
            if (currentIndex > maxIndex) currentIndex = maxIndex;
            updateCarousel(currentIndex);
            setTimeout(() => track.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)', 50);
        });

        // Init
        updateCarousel(currentIndex);
        startAutoPlay();
    }

    // 3. Instagram Feed (8 placeholder posts)
    const instaTrack = Utils.$('#insta-track');
    if (instaTrack) {
        const instaPosts = Array(8).fill(0).map((_, i) => ({
            id: i,
            img: Utils.makeSvgBg(`Post ${i+1}`, '#F5EFE6', '#5A6B53', '📸')
        }));
        
        const renderInsta = (p) => `
            <a href="https://www.instagram.com/daisylinecrochet/" target="_blank" rel="noopener noreferrer" class="dl-insta-item dl-reveal">
                <img src="${p.img}" alt="Instagram Post" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; aspect-ratio: 1/1;">
                <div class="dl-insta-overlay">
                    <i class="ph ph-instagram-logo"></i>
                </div>
            </a>
        `;
        instaTrack.innerHTML = instaPosts.map(renderInsta).join('');
    }

    // Scroll Reveal Observer
    const revealEls = Utils.$$('.dl-reveal');
    if (revealEls.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('dl-active');
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

        revealEls.forEach(el => observer.observe(el));
    }
});


/* --------------------------------------------------------------------------
   8. SPRINT 7 ADDITIONS (GLOBAL REUSABLE COMPONENTS)
   -------------------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {

    // 8.1 Active Page Highlighting
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.dl-nav-link, .dl-mobile-nav-link');
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop();
        if (linkPath === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active'); // ensure no hardcoded active classes stick around incorrectly
        }
    });

    // 8.2 Product Image Gallery (Reusable)
    const initGallery = () => {
        const mainImg = document.getElementById('dl-main-product-image');
        const thumbs = document.querySelectorAll('.dl-pdp-thumb-item');
        if (!mainImg || thumbs.length === 0) return;

        thumbs.forEach(thumb => {
            thumb.addEventListener('click', () => {
                thumbs.forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
                mainImg.style.opacity = '0.5';
                setTimeout(() => {
                    mainImg.src = thumb.dataset.img;
                    mainImg.style.opacity = '1';
                }, 150);
            });
        });
    };
    initGallery();

    // 8.3 Quantity Selector (Reusable)
    const initQuantitySelectors = () => {
        const decBtns = document.querySelectorAll('#dl-qty-dec');
        const incBtns = document.querySelectorAll('#dl-qty-inc');
        const qtyInputs = document.querySelectorAll('#dl-qty-input');

        decBtns.forEach((btn, idx) => {
            btn.addEventListener('click', () => {
                const input = qtyInputs[idx];
                if (!input) return;
                let val = parseInt(input.value) || 1;
                if (val > 1) input.value = val - 1;
            });
        });

        incBtns.forEach((btn, idx) => {
            btn.addEventListener('click', () => {
                const input = qtyInputs[idx];
                if (!input) return;
                let val = parseInt(input.value) || 1;
                input.value = val + 1;
            });
        });
    };
    initQuantitySelectors();

    // 8.4 Reusable Buy Now Flow
    const buyNowBtn = document.getElementById('dl-buy-now-btn');
    const addToCartBtn = document.getElementById('dl-add-cart-btn');
    
    // Check if we are on a product page by URL params or implicit ID
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id') || 'prod-1'; // fallback to first item

    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const qtyInput = document.getElementById('dl-qty-input');
            const qty = qtyInput ? (parseInt(qtyInput.value) || 1) : 1;
            store.addToCart(productId, qty);
        });
    }

    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const qtyInput = document.getElementById('dl-qty-input');
            const qty = qtyInput ? (parseInt(qtyInput.value) || 1) : 1;
            store.addToCart(productId, qty);
            // Simulate redirect to checkout
            showToast('Proceeding to Checkout! ⚡', 'ph-lightning');
            setTimeout(() => {
                // In real app: window.location.href = '/checkout';
                openCartDrawer();
            }, 800);
        });
    }

    // 8.5 Smooth Scrolling for anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 8.6 Mobile Shop Dropdown standard toggle
    const shopAccBtn = document.getElementById('dl-shop-acc-btn');
    const shopAccContent = document.getElementById('dl-shop-acc-content');
    if (shopAccBtn && shopAccContent) {
        shopAccBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const isOpen = shopAccContent.style.display === 'block';
            shopAccContent.style.display = isOpen ? 'none' : 'block';
            const icon = shopAccBtn.querySelector('.dl-acc-icon');
            if (icon) {
                icon.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
    }
});
