import os
import re

root_dir = "d:/Client 1/client 4 daisyline"
categories_dir = os.path.join(root_dir, "categories")

html_files = [os.path.join(root_dir, "index.html")] + [
    os.path.join(categories_dir, f) for f in os.listdir(categories_dir) if f.endswith(".html")
]

pattern = r'\s*// Mobile Categories Dropdown\s*const mobileCategoriesBtn = document\.getElementById\(\'mobile-categories-btn\'\);\s*const mobileCategoriesDropdown = document\.getElementById\(\'mobile-categories-dropdown\'\);\s*const mobileCategoriesIcon = document\.getElementById\(\'mobile-categories-icon\'\);\s*if \(mobileCategoriesBtn && mobileCategoriesDropdown && mobileCategoriesIcon\) \{\s*// Remove existing listeners if any by replacing\s*mobileCategoriesBtn\.replaceWith\(mobileCategoriesBtn\.cloneNode\(true\)\);\s*const newBtn = document\.getElementById\(\'mobile-categories-btn\'\);\s*newBtn\.addEventListener\(\'click\', \(\) => \{\s*mobileCategoriesDropdown\.classList\.toggle\(\'hidden\'\);\s*mobileCategoriesDropdown\.classList\.toggle\(\'flex\'\);\s*document\.getElementById\(\'mobile-categories-icon\'\)\.classList\.toggle\(\'rotate-180\'\);\s*\}\);\s*\}'

for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove all occurrences of the injected duplicate script
    new_content = re.sub(pattern, '', content)
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Cleaned {filepath}")

print("Cleanup complete!")
