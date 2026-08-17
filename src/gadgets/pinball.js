// ── 3D Pinball: Space Cadet Controller ──────────────────────
// Extracted from script.js for modular maintenance
// Dependencies: bringToFront(), closeWindow() from script.js

function openPinball() {
    const win = document.getElementById('pinball-window');
    const iframe = document.getElementById('pinball-iframe');
    const loading = document.getElementById('pinball-loading');
    
    if (win) {
        win.style.display = 'flex';
        win.classList.remove('minimized');
        bringToFront(win);
        
        const taskItem = document.getElementById('taskbar-pinball-window');
        if (taskItem) {
            taskItem.style.display = 'flex';
            taskItem.classList.add('active');
        }
        
        if (iframe && (!iframe.src || iframe.src === 'about:blank' || iframe.src.indexOf('src/gadgets/pinball/index.html') === -1)) {
            if (loading) loading.style.display = 'flex';
            iframe.src = 'src/gadgets/pinball/index.html';
            iframe.onload = () => {
                if (loading) loading.style.display = 'none';
                setTimeout(() => {
                    try {
                        iframe.focus();
                        if (iframe.contentWindow) iframe.contentWindow.focus();
                    } catch(e){}
                }, 300);
            };
        } else if (iframe) {
            try {
                iframe.focus();
                if (iframe.contentWindow) iframe.contentWindow.focus();
            } catch(e){}
        }
    }
}

function closePinball() {
    closeWindow('pinball-window');
    const iframe = document.getElementById('pinball-iframe');
    if (iframe) iframe.src = 'about:blank';
}

function restartPinball() {
    const iframe = document.getElementById('pinball-iframe');
    const loading = document.getElementById('pinball-loading');
    if (iframe) {
        if (loading) loading.style.display = 'flex';
        iframe.src = 'about:blank';
        setTimeout(() => { 
            iframe.src = 'src/gadgets/pinball/index.html'; 
            iframe.onload = () => {
                if (loading) loading.style.display = 'none';
                setTimeout(() => {
                    try {
                        iframe.focus();
                        if (iframe.contentWindow) iframe.contentWindow.focus();
                    } catch(e){}
                }, 300);
            };
        }, 150);
    }
}
