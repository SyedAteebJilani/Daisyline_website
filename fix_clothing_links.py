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

    # Replace Clothing.html with clothing.html in all hrefs
    content = content.replace('Clothing.html', 'clothing.html')
    # Just in case there are any Cardigans.html or cardigans.html missed
    content = content.replace('Cardigans.html', 'clothing.html')
    content = content.replace('cardigans.html', 'clothing.html')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Fixed Clothing.html references!")
