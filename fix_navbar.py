import os
import re

root_dir = "d:/Client 1/client 4 daisyline"
categories_dir = os.path.join(root_dir, "categories")

html_files = [os.path.join(root_dir, "index.html")] + [
    os.path.join(categories_dir, f) for f in os.listdir(categories_dir) if f.endswith(".html")
]

for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # ISSUE 2: Center-Align Navbar Items on Desktop
    content = content.replace(
        '<nav class="hidden lg:flex space-x-10 items-center h-full ml-12">',
        '<nav class="hidden lg:flex space-x-10 items-center h-full absolute left-1/2 transform -translate-x-1/2">'
    )

    # ISSUE 3: Navbar Spacing
    content = content.replace(
        'translate-y-[0px]',
        'translate-y-[45px] md:translate-y-[48px]'
    )

    # ISSUE 1: Mobile Menu Not Opening (Fixing event bindings via inline onclick)
    if 'id="mobile-menu-btn"' in content and 'onclick=' not in content.split('id="mobile-menu-btn"')[1][:20]:
        content = content.replace(
            '<button id="mobile-menu-btn"',
            '<button id="mobile-menu-btn" onclick="document.getElementById(\'mobile-menu\').classList.remove(\'-translate-x-full\'); document.body.style.overflow=\'hidden\';" '
        )

    if 'id="close-menu-btn"' in content and 'onclick=' not in content.split('id="close-menu-btn"')[1][:20]:
        content = content.replace(
            '<button id="close-menu-btn"',
            '<button id="close-menu-btn" onclick="document.getElementById(\'mobile-menu\').classList.add(\'-translate-x-full\'); document.body.style.overflow=\'\';" '
        )

    mobile_link_pattern = r'(<a href="[^"]*" class="mobile-link [^"]*")'
    replacement = r'\1 onclick="document.getElementById(\'mobile-menu\').classList.add(\'-translate-x-full\'); document.body.style.overflow=\'\';"'
    if 'onclick="document.getElementById(\'mobile-menu\')' not in content:
        content = re.sub(mobile_link_pattern, replacement, content)

    if 'id="mobile-categories-btn"' in content and 'onclick=' not in content.split('id="mobile-categories-btn"')[1][:20]:
        content = content.replace(
            '<button id="mobile-categories-btn"',
            '<button id="mobile-categories-btn" onclick="document.getElementById(\'mobile-categories-dropdown\').classList.toggle(\'hidden\'); document.getElementById(\'mobile-categories-dropdown\').classList.toggle(\'flex\'); document.getElementById(\'mobile-categories-icon\').classList.toggle(\'rotate-180\');" '
        )
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Navbar fixes applied successfully!")
