import os
import re
import sys

root_dir = "d:/Client 1/client 4 daisyline"
categories_dir = os.path.join(root_dir, "categories")

# 1. READ INDEX.HTML TO GET BOILERPLATE
with open(os.path.join(root_dir, "index.html"), "r", encoding="utf-8") as f:
    index_html = f.read()

# Extract head/header
header_match = re.search(r'(.*?<body[^>]*>.*?)</main>', index_html, re.DOTALL)
if not header_match:
    print("Failed to find header")
    sys.exit(1)
header_part = header_match.group(1)

# Extract footer
footer_match = re.search(r'(<!-- Super-Footer.*)', index_html, re.DOTALL)
if not footer_match:
    print("Failed to find footer")
    sys.exit(1)
footer_part = footer_match.group(1)

# 2. GENERATE THE NEW MAIN CONTENT
about_main = """
    <main class="pt-24 md:pt-32">
        <!-- Hero Section -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-24">
            <div class="relative w-full h-[50vh] md:h-[65vh] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-soft bg-brand-sage group reveal">
                <div class="absolute inset-0 img-hover-container">
                    <img src="./images/hero_image.webp" alt="Handmade Crochet Bouquet" class="w-full h-full object-cover opacity-60 mix-blend-multiply">
                </div>
                <div class="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-brand-text/10">
                    <span class="text-white tracking-widest uppercase text-xs md:text-sm font-semibold mb-4 block drop-shadow-md">Handcrafted with Love</span>
                    <h1 class="font-heading text-5xl md:text-7xl lg:text-8xl text-white mb-6 drop-shadow-lg leading-tight">About Daisyline</h1>
                    <p class="text-white/95 text-lg md:text-2xl font-light max-w-2xl mx-auto drop-shadow-md">A journey of yarn, tradition, and slow-made art.</p>
                </div>
            </div>
            
            <nav class="flex justify-center text-[10px] sm:text-xs font-medium text-brand-muted uppercase tracking-widest mt-8">
                <ol class="flex items-center space-x-2">
                    <li><a href="./index.html" class="hover:text-brand-sage transition-colors">Home</a></li>
                    <li><span class="text-brand-beige mx-2">/</span></li>
                    <li class="text-brand-olive">About Us</li>
                </ol>
            </nav>
        </section>

        <!-- Our Story -->
        <section class="py-16 md:py-24 bg-brand-cream relative">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center reveal delay-100">
                <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-beige/50 text-brand-sage mb-8">
                    <i class="ph ph-heart text-3xl"></i>
                </div>
                <h2 class="font-heading text-4xl md:text-5xl text-brand-text mb-8">Our Story</h2>
                <div class="space-y-6 text-brand-text/80 text-lg md:text-xl font-light leading-relaxed">
                    <p>Every piece at Daisyline is handmade with love. We believe in the magic of slow living and the beauty of things crafted carefully, loop by loop, stitch by stitch.</p>
                    <p>From cozy cardigans to everlasting bouquets, we pay incredible attention to detail, ensuring that each piece is a unique creation made specially for our customers.</p>
                    <p>By choosing Daisyline, you are not just purchasing a product; you are supporting handmade craftsmanship and keeping a beautiful tradition alive.</p>
                </div>
            </div>
        </section>

        <!-- How to Order Timeline -->
        <section class="py-20 md:py-32 bg-brand-ivory relative overflow-hidden">
            <div class="absolute top-0 right-0 w-96 h-96 bg-brand-floral/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
            
            <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div class="text-center mb-16 reveal">
                    <h2 class="font-heading text-4xl md:text-5xl text-brand-text mb-4">How to Order</h2>
                    <p class="text-brand-muted text-lg font-light">Your journey to owning a handcrafted piece.</p>
                </div>
                
                <div class="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-brand-sage/50 before:to-transparent">
                    
                    <!-- Step 1 -->
                    <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active reveal delay-100">
                        <div class="flex items-center justify-center w-10 h-10 rounded-full border-4 border-brand-ivory bg-brand-sage text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                            <span class="font-heading text-xl font-bold">1</span>
                        </div>
                        <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-white shadow-sm hover:shadow-lg transition-all duration-300">
                            <h3 class="font-heading text-2xl text-brand-text mb-2">Choose your favourite</h3>
                            <p class="text-brand-muted font-light text-sm">Browse our curated collections and choose your favourite handmade products.</p>
                        </div>
                    </div>
                    
                    <!-- Step 2 -->
                    <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active reveal delay-200">
                        <div class="flex items-center justify-center w-10 h-10 rounded-full border-4 border-brand-ivory bg-brand-sage text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                            <span class="font-heading text-xl font-bold">2</span>
                        </div>
                        <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-white shadow-sm hover:shadow-lg transition-all duration-300">
                            <h3 class="font-heading text-2xl text-brand-text mb-2">Add to cart</h3>
                            <p class="text-brand-muted font-light text-sm">Add products to your cart to begin the secure checkout process.</p>
                        </div>
                    </div>

                    <!-- Step 3 -->
                    <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active reveal delay-300">
                        <div class="flex items-center justify-center w-10 h-10 rounded-full border-4 border-brand-ivory bg-brand-sage text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                            <span class="font-heading text-xl font-bold">3</span>
                        </div>
                        <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-white shadow-sm hover:shadow-lg transition-all duration-300 border-l-4 border-brand-gold md:border-l-0 md:border-r-4">
                            <h3 class="font-heading text-2xl text-brand-text mb-2">Checkout & Payment</h3>
                            <p class="text-brand-muted font-light text-sm mb-3">Complete the checkout form.</p>
                            <div class="bg-brand-floral/30 p-3 rounded-lg text-sm text-brand-olive font-medium">
                                <i class="ph ph-warning-circle inline-block mr-1"></i> Uploading the advance payment screenshot is mandatory. Orders are not processed until the screenshot is uploaded.
                            </div>
                        </div>
                    </div>

                    <!-- Step 4 -->
                    <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active reveal delay-100">
                        <div class="flex items-center justify-center w-10 h-10 rounded-full border-4 border-brand-ivory bg-brand-sage text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                            <span class="font-heading text-xl font-bold">4</span>
                        </div>
                        <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-white shadow-sm hover:shadow-lg transition-all duration-300">
                            <h3 class="font-heading text-2xl text-brand-text mb-2">Confirmation</h3>
                            <p class="text-brand-muted font-light text-sm">After verification, your order will be confirmed. You will receive a confirmation email detailing the production timeline.</p>
                        </div>
                    </div>

                    <!-- Step 5 (Custom Orders) -->
                    <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active reveal delay-200">
                        <div class="flex items-center justify-center w-10 h-10 rounded-full border-4 border-brand-ivory bg-brand-sage text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                            <i class="ph ph-magic-wand text-lg"></i>
                        </div>
                        <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-white shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                            <div class="absolute top-0 right-0 w-20 h-20 bg-brand-floral rounded-bl-[100px] -z-10 opacity-50"></div>
                            <h3 class="font-heading text-2xl text-brand-text mb-3">For Custom Orders</h3>
                            <ul class="space-y-2 text-brand-muted font-light text-sm mb-4">
                                <li class="flex gap-2"><i class="ph ph-check text-brand-sage mt-0.5"></i> Navigate to the Custom Order page.</li>
                                <li class="flex gap-2"><i class="ph ph-check text-brand-sage mt-0.5"></i> Fill in all required details.</li>
                                <li class="flex gap-2"><i class="ph ph-check text-brand-sage mt-0.5"></i> If you have inspiration images from Pinterest, Instagram, Facebook, or elsewhere, upload them with the form.</li>
                            </ul>
                            <p class="text-xs text-brand-text bg-brand-beige/30 p-3 rounded-lg mt-4 font-medium">
                                If any requirements are unclear, our team may contact you. Please provide your <strong class="text-brand-olive">WhatsApp number</strong> and <strong class="text-brand-olive">Instagram ID</strong> for smooth communication.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        <!-- Policies Section -->
        <section class="py-20 bg-brand-cream border-t border-brand-beige/30">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid md:grid-cols-2 gap-8 lg:gap-12">
                    
                    <!-- Shipping Policy -->
                    <div id="shipping" class="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm hover:shadow-lg transition-shadow duration-500 reveal">
                        <div class="w-14 h-14 rounded-full bg-brand-floral flex items-center justify-center text-brand-olive mb-6">
                            <i class="ph ph-truck text-2xl"></i>
                        </div>
                        <h2 class="font-heading text-3xl md:text-4xl text-brand-text mb-6">Shipping Policy</h2>
                        <ul class="space-y-4 text-brand-muted font-light text-base">
                            <li class="flex gap-3"><i class="ph ph-warning-circle text-brand-sage text-xl shrink-0 mt-0.5"></i> <span><strong>Advance payment screenshot is mandatory</strong> before order confirmation.</span></li>
                            <li class="flex gap-3"><i class="ph ph-envelope text-brand-sage text-xl shrink-0 mt-0.5"></i> <span>Confirmation email will be sent once payment is verified.</span></li>
                            <li class="flex gap-3"><i class="ph ph-clock text-brand-sage text-xl shrink-0 mt-0.5"></i> <span>Handmade products require time. <strong>Small orders: 5–10 business days</strong> after confirmation.</span></li>
                            <li class="flex gap-3"><i class="ph ph-calendar-plus text-brand-sage text-xl shrink-0 mt-0.5"></i> <span>Complex or large custom orders may require additional production time.</span></li>
                            <li class="flex gap-3"><i class="ph ph-chat-circle-dots text-brand-sage text-xl shrink-0 mt-0.5"></i> <span>Customers are welcome to contact us anytime regarding progress.</span></li>
                            <li class="flex gap-3"><i class="ph ph-map-pin text-brand-sage text-xl shrink-0 mt-0.5"></i> <span>Delivery available all across Pakistan.</span></li>
                        </ul>
                    </div>

                    <!-- Return Policy -->
                    <div id="returns" class="bg-brand-sage text-white p-8 md:p-10 rounded-[2rem] shadow-soft hover:shadow-xl transition-shadow duration-500 reveal delay-100">
                        <div class="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-white mb-6 backdrop-blur-sm">
                            <i class="ph ph-arrow-u-up-left text-2xl"></i>
                        </div>
                        <h2 class="font-heading text-3xl md:text-4xl mb-6">Return Policy</h2>
                        <ul class="space-y-4 font-light text-white/90 text-base">
                            <li class="flex gap-3"><i class="ph ph-x-circle text-white/70 text-xl shrink-0 mt-0.5"></i> <span><strong>Custom-made products</strong> created according to customer requirements are <strong>non-returnable</strong>.</span></li>
                            <li class="flex gap-3"><i class="ph ph-check-circle text-white/70 text-xl shrink-0 mt-0.5"></i> <span><strong>Ready-made items</strong> are eligible for return <em>only</em> if there is a genuine size issue.</span></li>
                            <li class="flex gap-3"><i class="ph ph-warning text-white/70 text-xl shrink-0 mt-0.5"></i> <span>No refunds or returns for any other reason.</span></li>
                            <li class="flex gap-3"><i class="ph ph-clock-countdown text-white/70 text-xl shrink-0 mt-0.5"></i> <span>Customers must contact us within <strong>2–4 days</strong> after receiving the parcel.</span></li>
                            <li class="flex gap-3"><i class="ph ph-info text-white/70 text-xl shrink-0 mt-0.5"></i> <span>Return policy applies only to Ready-to-Ship products.</span></li>
                        </ul>
                    </div>
                    
                </div>
            </div>
        </section>

        <!-- FAQs & Contact -->
        <section id="faq" class="py-20 md:py-32 bg-brand-ivory relative border-t border-brand-beige/50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div class="text-center mb-16 reveal">
                    <h2 class="font-heading text-4xl md:text-5xl text-brand-text mb-4">Frequently Asked Questions</h2>
                    <p class="text-brand-muted text-lg font-light">Everything you need to know about ordering from Daisyline.</p>
                </div>

                <div class="grid lg:grid-cols-12 gap-12 lg:gap-8 items-start">
                    
                    <!-- Accordion -->
                    <div class="lg:col-span-8 space-y-4 reveal delay-100">
                        
                        <details class="group bg-white rounded-2xl shadow-sm border border-brand-beige/30 overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                            <summary class="flex items-center justify-between p-6 cursor-pointer text-brand-text font-medium outline-none">
                                <span class="text-lg font-heading md:text-xl">Can I customize my order?</span>
                                <span class="transition duration-300 group-open:-rotate-180 bg-brand-ivory text-brand-olive rounded-full p-2">
                                    <i class="ph ph-caret-down"></i>
                                </span>
                            </summary>
                            <div class="px-6 pb-6 text-brand-muted font-light text-sm md:text-base border-t border-brand-beige/30 pt-4 bg-brand-cream/50">
                                Yes. Every custom order is made according to your requirements. We take pride in creating unique pieces just for you.
                            </div>
                        </details>

                        <details class="group bg-white rounded-2xl shadow-sm border border-brand-beige/30 overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                            <summary class="flex items-center justify-between p-6 cursor-pointer text-brand-text font-medium outline-none">
                                <span class="text-lg font-heading md:text-xl">How long does production take?</span>
                                <span class="transition duration-300 group-open:-rotate-180 bg-brand-ivory text-brand-olive rounded-full p-2">
                                    <i class="ph ph-caret-down"></i>
                                </span>
                            </summary>
                            <div class="px-6 pb-6 text-brand-muted font-light text-sm md:text-base border-t border-brand-beige/30 pt-4 bg-brand-cream/50">
                                Normally 5–10 business days after order confirmation. Large or complex orders may require more time due to the handcrafted nature of our products.
                            </div>
                        </details>

                        <details class="group bg-white rounded-2xl shadow-sm border border-brand-beige/30 overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                            <summary class="flex items-center justify-between p-6 cursor-pointer text-brand-text font-medium outline-none">
                                <span class="text-lg font-heading md:text-xl">Do you deliver all over Pakistan?</span>
                                <span class="transition duration-300 group-open:-rotate-180 bg-brand-ivory text-brand-olive rounded-full p-2">
                                    <i class="ph ph-caret-down"></i>
                                </span>
                            </summary>
                            <div class="px-6 pb-6 text-brand-muted font-light text-sm md:text-base border-t border-brand-beige/30 pt-4 bg-brand-cream/50">
                                Yes, we offer secure delivery all across Pakistan.
                            </div>
                        </details>

                        <details class="group bg-white rounded-2xl shadow-sm border border-brand-beige/30 overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                            <summary class="flex items-center justify-between p-6 cursor-pointer text-brand-text font-medium outline-none">
                                <span class="text-lg font-heading md:text-xl">Can I return custom products?</span>
                                <span class="transition duration-300 group-open:-rotate-180 bg-brand-ivory text-brand-olive rounded-full p-2">
                                    <i class="ph ph-caret-down"></i>
                                </span>
                            </summary>
                            <div class="px-6 pb-6 text-brand-muted font-light text-sm md:text-base border-t border-brand-beige/30 pt-4 bg-brand-cream/50">
                                No. Custom-made products created according to customer requirements are strictly non-returnable.
                            </div>
                        </details>

                        <details class="group bg-white rounded-2xl shadow-sm border border-brand-beige/30 overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                            <summary class="flex items-center justify-between p-6 cursor-pointer text-brand-text font-medium outline-none">
                                <span class="text-lg font-heading md:text-xl">Can I cancel my order?</span>
                                <span class="transition duration-300 group-open:-rotate-180 bg-brand-ivory text-brand-olive rounded-full p-2">
                                    <i class="ph ph-caret-down"></i>
                                </span>
                            </summary>
                            <div class="px-6 pb-6 text-brand-muted font-light text-sm md:text-base border-t border-brand-beige/30 pt-4 bg-brand-cream/50">
                                Orders can only be cancelled <strong>before</strong> production begins or materials are purchased. Once we have started crafting your order, cancellations are no longer accepted.
                            </div>
                        </details>

                        <details class="group bg-white rounded-2xl shadow-sm border border-brand-beige/30 overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                            <summary class="flex items-center justify-between p-6 cursor-pointer text-brand-text font-medium outline-none">
                                <span class="text-lg font-heading md:text-xl">What payment methods do you accept?</span>
                                <span class="transition duration-300 group-open:-rotate-180 bg-brand-ivory text-brand-olive rounded-full p-2">
                                    <i class="ph ph-caret-down"></i>
                                </span>
                            </summary>
                            <div class="px-6 pb-6 text-brand-muted font-light text-sm md:text-base border-t border-brand-beige/30 pt-4 bg-brand-cream/50">
                                We accept advance payments via:
                                <ul class="list-disc pl-5 mt-2 space-y-1">
                                    <li>Easypaisa</li>
                                    <li>JazzCash</li>
                                    <li>Bank Transfer</li>
                                </ul>
                            </div>
                        </details>

                        <details class="group bg-white rounded-2xl shadow-sm border border-brand-beige/30 overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                            <summary class="flex items-center justify-between p-6 cursor-pointer text-brand-text font-medium outline-none">
                                <span class="text-lg font-heading md:text-xl">How will I know my order is confirmed?</span>
                                <span class="transition duration-300 group-open:-rotate-180 bg-brand-ivory text-brand-olive rounded-full p-2">
                                    <i class="ph ph-caret-down"></i>
                                </span>
                            </summary>
                            <div class="px-6 pb-6 text-brand-muted font-light text-sm md:text-base border-t border-brand-beige/30 pt-4 bg-brand-cream/50">
                                You will receive a confirmation email detailing your order after your payment verification is complete.
                            </div>
                        </details>

                    </div>

                    <!-- Contact Sidebar -->
                    <div class="lg:col-span-4 bg-white p-8 rounded-[2rem] shadow-sm border border-brand-beige/50 text-center reveal delay-200">
                        <div class="w-16 h-16 rounded-full bg-brand-floral flex items-center justify-center text-brand-olive mx-auto mb-6">
                            <i class="ph ph-chats-circle text-3xl"></i>
                        </div>
                        <h3 class="font-heading text-2xl text-brand-text mb-2">Need help placing an order?</h3>
                        <p class="text-brand-muted font-light text-sm mb-8">We are always here to assist you. Contact us through any of the platforms below.</p>
                        
                        <div class="flex flex-col gap-4">
                            <a href="https://wa.me/923198504489" target="_blank" class="flex items-center gap-4 p-4 rounded-xl bg-brand-ivory hover:bg-brand-sage hover:text-white transition-colors group">
                                <i class="ph ph-whatsapp-logo text-2xl text-green-500 group-hover:text-white transition-colors"></i>
                                <div class="text-left">
                                    <span class="block text-xs uppercase tracking-wider font-semibold opacity-70">WhatsApp</span>
                                    <span class="block font-medium">+92 319 8504489</span>
                                </div>
                            </a>
                            
                            <a href="https://www.instagram.com/daisylinecrochet/" target="_blank" class="flex items-center gap-4 p-4 rounded-xl bg-brand-ivory hover:bg-brand-sage hover:text-white transition-colors group">
                                <i class="ph ph-instagram-logo text-2xl text-[#E1306C] group-hover:text-white transition-colors"></i>
                                <div class="text-left">
                                    <span class="block text-xs uppercase tracking-wider font-semibold opacity-70">Instagram</span>
                                    <span class="block font-medium">@daisylinecrochet</span>
                                </div>
                            </a>
                            
                            <a href="https://www.facebook.com/share/1HeWDJU5ap/" target="_blank" class="flex items-center gap-4 p-4 rounded-xl bg-brand-ivory hover:bg-brand-sage hover:text-white transition-colors group">
                                <i class="ph ph-facebook-logo text-2xl text-[#1877F2] group-hover:text-white transition-colors"></i>
                                <div class="text-left">
                                    <span class="block text-xs uppercase tracking-wider font-semibold opacity-70">Facebook</span>
                                    <span class="block font-medium">Daisyline</span>
                                </div>
                            </a>
                            
                            <div class="grid grid-cols-2 gap-4">
                                <a href="https://www.threads.com/@daisylinecrochet" target="_blank" class="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-brand-ivory hover:bg-brand-sage hover:text-white transition-colors">
                                    <i class="ph ph-threads-logo text-2xl"></i>
                                    <span class="text-xs font-semibold">Threads</span>
                                </a>
                                <a href="https://www.tiktok.com/@daisylinecrochet?_r=1&_t=ZS-98DQTwu0jqr" target="_blank" class="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-brand-ivory hover:bg-brand-sage hover:text-white transition-colors">
                                    <i class="ph ph-tiktok-logo text-2xl"></i>
                                    <span class="text-xs font-semibold">TikTok</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
"""

# Fix page title and meta in header
about_header = header_part.replace(
    "<title>Daisyline Crochet | Handmade with Love & Tradition</title>",
    "<title>About Us | Daisyline Crochet</title>"
).replace(
    '<meta name="description" content="Inspired by Grandma\'s crochet legacy. Handmade crochet plush toys, handbags, bouquets, and custom gifts. Made in Pakistan.">',
    '<meta name="description" content="Learn about Daisyline Crochet. Every product is handmade with love in Pakistan. Discover our story, shipping policy, return policy, and FAQs.">'
)

# 3. WRITE ABOUT_US.HTML
about_html_content = about_header + about_main + footer_part
with open(os.path.join(root_dir, "about_us.html"), "w", encoding="utf-8") as f:
    f.write(about_html_content)

print("Created about_us.html")

# 4. UPDATE ALL HTML FILES

html_files = [os.path.join(root_dir, "about_us.html"), os.path.join(root_dir, "index.html")] + [
    os.path.join(categories_dir, f) for f in os.listdir(categories_dir) if f.endswith(".html")
]

# Add custom-orders.html if exists
custom_orders_path = os.path.join(root_dir, "custom-orders.html")
if os.path.exists(custom_orders_path):
    html_files.append(custom_orders_path)
    
story_path = os.path.join(root_dir, "story.html")
if os.path.exists(story_path):
    html_files.append(story_path)
    
how_path = os.path.join(root_dir, "how-to-order.html")
if os.path.exists(how_path):
    html_files.append(how_path)

def get_prefix(filepath):
    if "categories" in filepath:
        return "../"
    return "./"

for filepath in html_files:
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
    except:
        continue
        
    prefix = get_prefix(filepath)
    
    # NAVIGATION UPDATE
    # Desktop Nav
    content = re.sub(
        r'<a href="\.[^"]*story\.html"[^>]*>\s*Our Story\s*<span',
        f'<a href="{prefix}about_us.html" class="text-brand-text hover:text-brand-sage font-medium text-xs tracking-[0.1em] uppercase transition-colors relative py-8 group">\n                        About Us\n                        <span',
        content
    )
    # Mobile Nav
    content = re.sub(
        r'<a href="\.[^"]*story\.html" class="mobile-link[^>]*>Our Story</a>',
        f'<a href="{prefix}about_us.html" class="mobile-link font-heading text-4xl md:text-5xl font-light italic text-brand-text hover:text-brand-sage transition-colors">About Us</a>',
        content
    )

    # FOOTER UPDATE
    # Find the Information / Support list
    # Let's match the block inside "Information"
    # Replacing the whole block with the required format
    old_info_block_pattern = r'<ul[^>]*>.*?How to Order.*?Shipping Policy.*?</ul>'
    
    new_info_block = f"""<ul class="space-y-4 text-sm font-light text-brand-beige/80 mb-8">
                        <li><a href="{prefix}about_us.html" class="hover:text-white transition-colors">About Us</a></li>
                        <li><a href="{prefix}how-to-order.html" class="hover:text-white transition-colors">How to Order</a></li>
                        <li><a href="{prefix}about_us.html#shipping" class="hover:text-white transition-colors">Shipping Policy</a></li>
                        <li><a href="{prefix}about_us.html#returns" class="hover:text-white transition-colors">Return Policy</a></li>
                        <li><a href="{prefix}about_us.html#faq" class="hover:text-white transition-colors">FAQs</a></li>
                    </ul>"""
                    
    content = re.sub(old_info_block_pattern, new_info_block, content, flags=re.DOTALL)
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
        
print("Updated all files!")
