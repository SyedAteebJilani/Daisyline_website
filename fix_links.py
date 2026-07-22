import os

root_dir = "d:/Client 1/client 4 daisyline"
categories_dir = os.path.join(root_dir, "categories")

html_files = [os.path.join(root_dir, "index.html")] + [
    os.path.join(categories_dir, f) for f in os.listdir(categories_dir) if f.endswith(".html")
]

for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace all empty anchor links
    content = content.replace('href="#"', 'href="javascript:void(0)"')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Empty links replaced!")
