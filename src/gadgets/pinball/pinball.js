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
        
        const audio = document.getElementById('pinball-music');
        if (audio && audio.paused) {
            audio.play().catch(e => console.log('Autoplay prevented by browser, requires interaction first.'));
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
    const audio = document.getElementById('pinball-music');
    if (audio) audio.pause();
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

function togglePinballMusic() {
    const audio = document.getElementById('pinball-music');
    if (audio) {
        if (audio.paused) {
            audio.play().catch(e => console.log('Autoplay prevented', e));
        } else {
            audio.pause();
        }
    }
    const iframe = document.getElementById('pinball-iframe');
    if (iframe) {
        setTimeout(() => {
            iframe.focus();
            if (iframe.contentWindow) iframe.contentWindow.focus();
        }, 10);
    }
}

function togglePinballSounds() {
    const iframe = document.getElementById('pinball-iframe');
    if (iframe && iframe.contentWindow) {
        try {
            const cw = iframe.contentWindow;
            
            // First send the 't' keyup event to toggle the internal variable
            const keyEvent = new KeyboardEvent("keyup", {
                key: "t",
                code: "KeyT",
                which: 84,
                keyCode: 84,
                bubbles: true,
                cancelable: true
            });
            cw.document.dispatchEvent(keyEvent);
            
            // Now manually try to suspend or resume the AudioContext to be sure
            let ctx = null;
            if (cw.Module && cw.Module.SDL2 && cw.Module.SDL2.audioContext) ctx = cw.Module.SDL2.audioContext;
            else if (cw.SDL && cw.SDL.audioContext) ctx = cw.SDL.audioContext;
            else if (cw.AL && cw.AL.currentContext && cw.AL.currentContext.audioCtx) ctx = cw.AL.currentContext.audioCtx;
            else if (cw.audioContext) ctx = cw.audioContext;
            
            if (ctx) {
                if (ctx.state === 'running') {
                    ctx.suspend();
                } else if (ctx.state === 'suspended') {
                    ctx.resume();
                }
            }
        } catch(e) {
            console.log("Could not toggle sounds:", e);
        }
        setTimeout(() => {
            iframe.focus();
            if (iframe.contentWindow) iframe.contentWindow.focus();
        }, 10);
    }
}
