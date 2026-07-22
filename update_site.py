import os
import re

root_dir = "d:/Client 1/client 4 daisyline"
categories_dir = os.path.join(root_dir, "categories")

html_files = [os.path.join(root_dir, "index.html")] + [
    os.path.join(categories_dir, f) for f in os.listdir(categories_dir) if f.endswith(".html")
]

categories = [
    ("Baby Sets", "baby-sets.html"),
    ("Bags / Wallets", "bags.html"),
    ("Book Items", "book-items.html"),
    ("Bouquets", "bouquets.html"),
    ("Cardigans", "cardigans.html"),
    ("Earrings", "earrings.html"),
    ("Gifting", "gifting.html"),
    ("Hair Accessories", "hair-accessories.html"),
    ("Hand Accessories", "hand-accessories.html"),
    ("Home Decor", "home-decor.html"),
    ("Keychains", "keychain.html"),
    ("Plushies", "plushies.html")
]

icons = {
    "baby-sets.html": "ph-baby",
    "bags.html": "ph-tote",
    "book-items.html": "ph-book-open",
    "bouquets.html": "ph-flower-tulip",
    "cardigans.html": "ph-coat-hanger",
    "earrings.html": "ph-sparkle",
    "gifting.html": "ph-gift",
    "hair-accessories.html": "ph-scissors",
    "hand-accessories.html": "ph-hand-swipe-left",
    "home-decor.html": "ph-house-line",
    "keychain.html": "ph-key",
    "plushies.html": "ph-teddy-bear"
}

def generate_header(is_root):
    prefix = "." if is_root else ".."
    cat_prefix = "./categories" if is_root else "."
    
    header = f'''    <header id="navbar" class="fixed w-full top-0 z-40 transition-all duration-500 transform translate-y-[0px] py-4 bg-white" style="background: #ffffff !important;">
        <div class="max-w-[90rem] mx-auto px-4 sm:px-8 lg:px-12">
            <div class="flex justify-between items-center h-16 md:h-20">
                <!-- Mobile Menu Button -->
                <div class="flex items-center lg:hidden w-1/3">
                    <button id="mobile-menu-btn" class="text-brand-text hover:text-brand-sage transition-colors -ml-2 p-2 group" aria-label="Open menu">
                        <div class="w-6 flex flex-col gap-1.5 items-start">
                            <span class="w-full h-[1px] bg-current transition-all group-hover:w-4"></span>
                            <span class="w-4 h-[1px] bg-current transition-all group-hover:w-full"></span>
                        </div>
                    </button>
                </div>

                <!-- Logo -->
                <div class="flex-shrink-0 flex items-center justify-center w-1/3 lg:w-auto absolute lg:relative left-1/2 lg:left-0 transform -translate-x-1/2 lg:translate-x-0 pointer-events-none lg:pointer-events-auto z-50">
                    <a href="{prefix}/index.html" class="pointer-events-auto flex items-center gap-4 group">
                        <img src="{prefix}/images/logo.jpg" alt="Daisyline Crochet Logo" class="h-10 md:h-12 w-auto object-contain rounded-full shadow-sm transition-transform duration-700 group-hover:rotate-12">
                        <span class="font-heading text-2xl md:text-3xl font-medium tracking-wide text-brand-text hidden lg:block">Daisyline.</span>
                    </a>
                </div>

                <!-- Desktop Menu -->
                <nav class="hidden lg:flex space-x-10 items-center h-full ml-12">
                    <a href="{prefix}/index.html" class="text-brand-text hover:text-brand-sage font-medium text-xs tracking-[0.1em] uppercase transition-colors relative py-8 group">
                        Home
                        <span class="absolute bottom-6 left-0 w-full h-[1px] bg-brand-sage origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"></span>
                    </a>
                    
                    <!-- Categories Mega Dropdown -->
                    <div class="relative group h-full flex items-center">
                        <a href="{prefix}/index.html#categories" class="text-brand-text hover:text-brand-sage font-medium text-xs tracking-[0.1em] uppercase transition-colors py-8 flex items-center gap-1.5 cursor-pointer">
                            Categories <i class="ph ph-caret-down text-[10px] transition-transform duration-500 group-hover:rotate-180"></i>
                        </a>
                        
                        <!-- Invisible bridge -->
                        <div class="absolute top-[80%] left-0 w-full h-10"></div>

                        <!-- Mega Menu Panel -->
                        <div class="absolute top-full left-1/2 transform -translate-x-1/2 w-[800px] bg-white/95 backdrop-blur-2xl border border-brand-beige/50 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 z-50 overflow-hidden mt-2">
                            <div class="p-8 grid grid-cols-4 gap-x-4 gap-y-6">'''
                            
    for name, link in categories:
        icon = icons.get(link, "ph-star")
        header += f'''
                                <a href="{cat_prefix}/{link}" class="group/item flex items-center gap-3">
                                    <div class="w-8 h-8 rounded-full bg-brand-ivory flex items-center justify-center text-brand-text group-hover/item:bg-brand-sage group-hover/item:text-white transition-all duration-300 shadow-sm"><i class="ph {icon} text-sm"></i></div>
                                    <span class="text-xs font-medium text-brand-text group-hover/item:text-brand-sage transition-colors">{name}</span>
                                </a>'''
                                
    header += f'''
                            </div>
                        </div>
                    </div>

                    <a href="{prefix}/story.html" class="text-brand-text hover:text-brand-sage font-medium text-xs tracking-[0.1em] uppercase transition-colors relative py-8 group">
                        Our Story
                        <span class="absolute bottom-6 left-0 w-full h-[1px] bg-brand-sage origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"></span>
                    </a>
                    
                    <a href="{prefix}/custom-orders.html" class="text-brand-text hover:text-brand-sage font-medium text-xs tracking-[0.1em] uppercase transition-colors relative py-8 group">
                        Custom Orders
                        <span class="absolute bottom-6 left-0 w-full h-[1px] bg-brand-sage origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"></span>
                    </a>
                </nav>

                <!-- Action Icons -->
                <div class="flex items-center space-x-6 w-1/3 justify-end z-50">
                    <a href="#" class="text-brand-text hover:text-brand-sage transition-colors relative group" aria-label="Search">
                        <i class="ph ph-magnifying-glass text-xl"></i>
                    </a>
                    <a href="#" class="text-brand-text hover:text-brand-sage transition-colors relative group flex items-center gap-2" aria-label="Cart">
                        <div class="relative">
                            <i class="ph ph-tote text-xl"></i>
                            <span class="absolute -top-1 -right-2 bg-brand-text text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center group-hover:bg-brand-sage transition-colors">0</span>
                        </div>
                        <span class="hidden md:block text-xs font-semibold uppercase tracking-wider ml-1">Cart</span>
                    </a>
                </div>
            </div>
        </div>
    </header>'''
    return header

def generate_mobile_menu(is_root):
    prefix = "." if is_root else ".."
    cat_prefix = "./categories" if is_root else "."
    
    mobile_menu = f'''    <div id="mobile-menu" class="fixed inset-0 bg-white text-brand-text z-50 transform -translate-x-full transition-transform duration-700 lg:hidden flex flex-col">
        <div class="flex justify-between items-center p-6 border-b border-brand-beige/30">
            <span class="font-heading text-2xl tracking-wide text-brand-text">Daisyline.</span>
            <button id="close-menu-btn" class="text-brand-text hover:text-brand-sage p-2 transition-colors" aria-label="Close menu">
                <i class="ph ph-x text-2xl"></i>
            </button>
        </div>
        
        <div class="flex-1 overflow-y-auto py-12 px-8 flex flex-col justify-start text-left">
            <div class="flex flex-col gap-8">
                <a href="{prefix}/index.html" class="mobile-link font-heading text-4xl md:text-5xl font-light italic text-brand-text hover:text-brand-sage transition-colors">Home</a>
                
                <!-- Mobile Categories Dropdown Accordion -->
                <div class="flex flex-col w-full">
                    <button id="mobile-categories-btn" class="flex items-center justify-between font-heading text-4xl md:text-5xl font-light italic text-brand-text hover:text-brand-sage transition-colors w-full text-left">
                        <span>Categories</span>
                        <i class="ph ph-caret-down text-2xl transition-transform duration-300" id="mobile-categories-icon"></i>
                    </button>
                    <!-- Sub-links container hidden by default -->
                    <div id="mobile-categories-dropdown" class="hidden flex-col gap-5 pl-4 pt-6 border-l border-brand-beige/50 ml-2 mt-2">'''
                    
    for name, link in categories:
        mobile_menu += f'''
                        <a href="{cat_prefix}/{link}" class="mobile-link text-lg font-sans text-brand-muted hover:text-brand-sage">{name}</a>'''
                        
    mobile_menu += f'''
                    </div>
                </div>

                <a href="{prefix}/story.html" class="mobile-link font-heading text-4xl md:text-5xl font-light italic text-brand-text hover:text-brand-sage transition-colors">Our Story</a>
                <a href="{prefix}/custom-orders.html" class="mobile-link font-heading text-4xl md:text-5xl font-light italic text-brand-text hover:text-brand-sage transition-colors">Custom Orders</a>
            </div>
            
            <div class="mt-12 pt-8 border-t border-brand-beige/30 flex gap-6">
                <a href="https://www.instagram.com/daisylinecrochet/" target="_blank" rel="noopener noreferrer" class="text-brand-text hover:text-brand-sage transition-colors"><i class="ph ph-instagram-logo text-3xl"></i></a>
                <a href="https://www.facebook.com/share/1HeWDJU5ap/" target="_blank" rel="noopener noreferrer" class="text-brand-text hover:text-brand-sage transition-colors"><i class="ph ph-facebook-logo text-3xl"></i></a>
                <a href="https://www.tiktok.com/@daisylinecrochet?_r=1&_t=ZS-98DQTwu0jqr" target="_blank" rel="noopener noreferrer" class="text-brand-text hover:text-brand-sage transition-colors"><i class="ph ph-tiktok-logo text-3xl"></i></a>
            </div>
        </div>
    </div>'''
    return mobile_menu

for filepath in html_files:
    is_root = (filepath == os.path.join(root_dir, "index.html"))
    prefix = "." if is_root else ".."
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update Navigation Menu (Header)
    header_pattern = re.compile(r'<header id="navbar".*?</header>', re.DOTALL)
    content = header_pattern.sub(generate_header(is_root), content, count=1)
    
    # 2. Update Mobile Menu (Overlay)
    if '<main' in content:
        content = re.sub(r'<div id="mobile-menu".*?(?=<main)', generate_mobile_menu(is_root) + '\n\n    ', content, flags=re.DOTALL)
        
    js_accordion = """
            // Mobile Categories Dropdown
            const mobileCategoriesBtn = document.getElementById('mobile-categories-btn');
            const mobileCategoriesDropdown = document.getElementById('mobile-categories-dropdown');
            const mobileCategoriesIcon = document.getElementById('mobile-categories-icon');
            if (mobileCategoriesBtn && mobileCategoriesDropdown && mobileCategoriesIcon) {
                // Remove existing listeners if any by replacing
                mobileCategoriesBtn.replaceWith(mobileCategoriesBtn.cloneNode(true));
                const newBtn = document.getElementById('mobile-categories-btn');
                newBtn.addEventListener('click', () => {
                    mobileCategoriesDropdown.classList.toggle('hidden');
                    mobileCategoriesDropdown.classList.toggle('flex');
                    document.getElementById('mobile-categories-icon').classList.toggle('rotate-180');
                });
            }"""
    if 'mobile-categories-btn' not in content[content.rfind('<script'):]:
        if '</script>' in content:
            if '// Enhanced Scroll Header' in content:
                content = content.replace('// Enhanced Scroll Header', js_accordion + '\n\n            // Enhanced Scroll Header')
            else:
                content = content.replace('</script>', js_accordion + '\n    </script>')
    
    # 3. Footer Update
    shipping_pattern = r'(<li>\s*<a href="[^"]*"[^>]*>Shipping Policy</a>\s*</li>)'
    how_to_order_html = f'<li><a href="{prefix}/how-to-order.html" class="hover:text-white transition-colors">How to Order</a></li>'
    if 'How to Order' not in content:
        content = re.sub(shipping_pattern, how_to_order_html + r'\n                        \1', content)
        
    # Also clean up index.html background transparency if it was there in another form
    if is_root and 'bg-transparent' in content:
         pass # Handled by header replacement
         
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Update complete!")
