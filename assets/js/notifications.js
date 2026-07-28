/* Toast Notification System */
function showToast(message, iconClass = 'ph-check-circle') {
    let container = document.getElementById('dl-toast-container');
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
