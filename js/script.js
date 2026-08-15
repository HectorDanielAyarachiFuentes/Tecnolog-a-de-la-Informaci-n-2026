// JavaScript for Windows XP Portfolio Simulation

document.addEventListener('DOMContentLoaded', () => {
    // 1. Clock functionality
    updateClock();
    setInterval(updateClock, 60000);

    // 2. Drag & Drop for Windows
    makeDraggable(document.getElementById('main-window'), document.getElementById('window-titlebar'));
    makeDraggable(document.getElementById('about-dialog'), document.querySelector('.dialog-titlebar'));
    makeDraggable(document.getElementById('winamp-video-window'), document.getElementById('winamp-video-titlebar'));
    makeDraggable(document.getElementById('pinball-window'), document.getElementById('pinball-titlebar'));
    makeDraggable(document.getElementById('ie-window'), document.getElementById('ie-titlebar'));

    // Double-click on main window titlebar to maximize/restore
    const titlebar = document.getElementById('window-titlebar');
    if (titlebar) {
        titlebar.addEventListener('dblclick', () => {
            toggleMaximizeWindow('main-window');
        });
    }

    // Make Desktop Icons Draggable using Draggabilly
    if (typeof Draggabilly !== 'undefined') {
        const icons = document.querySelectorAll('.desktop-icon');
        icons.forEach(icon => {
            const draggie = new Draggabilly(icon, { containment: '.desktop' });
            draggie.on('staticClick', (event, pointer) => {
                const iconId = icon.id;
                if (iconId === 'icon-my-computer') {
                    openWindow('main-window');
                } else if (iconId === 'icon-my-documents') {
                    openWindow('main-window');
                    switchTab('tab-act1');
                } else if (iconId === 'icon-pdf') {
                    openWindow('main-window');
                    switchTab('tab-act1');
                } else if (iconId === 'icon-about') {
                    openAboutModal();
                } else if (iconId === 'icon-winamp') {
                    openWinamp();
                } else if (iconId === 'icon-pinball') {
                    openPinball();
                } else if (iconId === 'icon-ie') {
                    openIE();
                }
            });
        });
    }

    // Play Windows XP Startup Sound on first user interaction
    document.body.addEventListener('click', () => {
        const startupSound = document.getElementById('sound-startup');
        if (startupSound && startupSound.paused && !sessionStorage.getItem('hasPlayedStartup')) {
            startupSound.volume = 0.4;
            startupSound.play().catch(e => console.log('Audio playback blocked by browser:', e));
            sessionStorage.setItem('hasPlayedStartup', 'true');
        }
    }, { once: true });
});

// ── Clock ────────────────────────────────────────────────────
function updateClock() {
    const clockEl = document.getElementById('system-clock');
    if (!clockEl) return;
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    clockEl.innerText = `${hours}:${minutes} ${ampm}`;
}

// ── Tabs ─────────────────────────────────────────────────────
function switchTab(tabId) {
    document.querySelectorAll('.xp-tab-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.xp-tab-button').forEach(b => b.classList.remove('active'));
    const panel = document.getElementById(tabId);
    if (panel) panel.classList.add('active');
    const btn = document.getElementById('btn-' + tabId);
    if (btn) btn.classList.add('active');
}

// ── PDF helpers ───────────────────────────────────────────────
function selectActivity(activityId) {
    if (activityId === 'act1') {
        const pathBar = document.querySelector('.viewer-path-bar');
        if (pathBar) pathBar.innerText = 'C:\\TI-2026\\Actividades\\Actividad-1\\reporte-laboratorio-prompts.pdf';
        const iframe = document.getElementById('pdf-iframe');
        if (iframe) iframe.src = 'Actividades/Actividad-1/reporte-laboratorio-prompts.pdf';
    }
}

function refreshPDF() {
    const iframe = document.getElementById('pdf-iframe');
    if (iframe) {
        const src = iframe.src;
        iframe.src = '';
        setTimeout(() => { iframe.src = src; }, 100);
    }
}

// ── Window actions ────────────────────────────────────────────
function closeWindow(windowId) {
    const win = document.getElementById(windowId);
    if (win) win.style.display = 'none';
    const item = document.getElementById(`taskbar-${windowId}`);
    if (item) item.classList.remove('active');
}

function minimizeWindow(windowId) {
    const win = document.getElementById(windowId);
    if (win) win.classList.add('minimized');
    const item = document.getElementById(`taskbar-${windowId}`);
    if (item) item.classList.remove('active');
}

function openWindow(windowId) {
    const win = document.getElementById(windowId);
    if (win) {
        win.style.display = 'flex';
        void win.offsetWidth;
        win.classList.remove('minimized');
        bringToFront(win);
    }
    const item = document.getElementById(`taskbar-${windowId}`);
    if (item) {
        item.style.display = 'flex';
        item.classList.add('active');
    }
}

function toggleWindowMinimization(windowId) {
    const win = document.getElementById(windowId);
    const item = document.getElementById(`taskbar-${windowId}`);
    if (win.classList.contains('minimized') || win.style.display === 'none') {
        win.style.display = 'flex';
        void win.offsetWidth;
        win.classList.remove('minimized');
        bringToFront(win);
        if (item) item.classList.add('active');
    } else {
        win.classList.add('minimized');
        if (item) item.classList.remove('active');
    }
}

function toggleMaximizeWindow(windowId) {
    const win = document.getElementById(windowId);
    if (!win) return;
    if (win.classList.contains('maximized')) {
        win.classList.remove('maximized');
        win.style.width     = win.dataset.preMaxWidth     || '';
        win.style.height    = win.dataset.preMaxHeight    || '';
        win.style.top       = win.dataset.preMaxTop       || '';
        win.style.left      = win.dataset.preMaxLeft      || '';
        win.style.transform = win.dataset.preMaxTransform || '';
    } else {
        win.dataset.preMaxWidth     = win.style.width;
        win.dataset.preMaxHeight    = win.style.height;
        win.dataset.preMaxTop       = win.style.top;
        win.dataset.preMaxLeft      = win.style.left;
        win.dataset.preMaxTransform = win.style.transform;
        win.classList.add('maximized');
        win.style.width     = '';
        win.style.height    = '';
        win.style.top       = '';
        win.style.left      = '';
        win.style.transform = '';
    }
}

function bringToFront(windowEl) {
    document.querySelectorAll('.window').forEach(w => w.style.zIndex = '20');
    windowEl.style.zIndex = '30';
}

// ── Drag & Drop ───────────────────────────────────────────────
function makeDraggable(windowEl, titlebarEl) {
    if (!windowEl || !titlebarEl) return;
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    titlebarEl.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        if (windowEl.classList.contains('maximized')) return;
        e = e || window.event;
        e.preventDefault();
        if (windowEl.style.transform && windowEl.style.transform.includes('translate')) {
            const rect = windowEl.getBoundingClientRect();
            windowEl.style.transform = 'none';
            windowEl.style.left = rect.left + 'px';
            windowEl.style.top  = rect.top  + 'px';
        }
        bringToFront(windowEl);
        windowEl.classList.add('dragging');
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup   = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        let newTop  = windowEl.offsetTop  - pos2;
        let newLeft = windowEl.offsetLeft - pos1;
        if (newTop < 0) newTop = 0;
        if (newTop > window.innerHeight - 60) newTop = window.innerHeight - 60;
        windowEl.style.top  = newTop  + 'px';
        windowEl.style.left = newLeft + 'px';
    }

    function closeDragElement() {
        windowEl.classList.remove('dragging');
        document.onmouseup   = null;
        document.onmousemove = null;
    }
}

// ── Start Menu ────────────────────────────────────────────────
function toggleStartMenu() {
    const menu = document.getElementById('start-menu');
    if (!menu) return;
    menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
}

document.addEventListener('click', (e) => {
    const menu = document.getElementById('start-menu');
    const btn  = document.querySelector('.start-btn');
    if (menu && menu.style.display === 'flex') {
        if (!menu.contains(e.target) && !btn.contains(e.target)) {
            menu.style.display = 'none';
        }
    }
});

// ── About Modal ───────────────────────────────────────────────
function openAboutModal() {
    const overlay = document.getElementById('about-dialog-overlay');
    if (overlay) {
        overlay.style.display = 'flex';
        const sound = document.getElementById('sound-error');
        if (sound) { sound.currentTime = 0; sound.volume = 0.3; sound.play().catch(() => {}); }
        setTimeout(() => {
            const ok = document.querySelector('.dialog-ok-btn');
            if (ok) ok.focus();
        }, 100);
    }
}

function closeAboutModal() {
    const overlay = document.getElementById('about-dialog-overlay');
    if (overlay) overlay.style.display = 'none';
}

function closeAboutModalOnOverlay(event) {
    if (event.target.id === 'about-dialog-overlay') closeAboutModal();
}

// ── PDF Expand ────────────────────────────────────────────────
function toggleExpandPDF() {
    const viewer  = document.querySelector('.activities-viewer');
    if (!viewer) return;
    const btnText = document.getElementById('text-expand-pdf');
    const btnIcon = document.getElementById('icon-expand-pdf');
    const desktop = document.querySelector('.desktop');

    viewer.classList.toggle('expanded');

    if (viewer.classList.contains('expanded')) {
        let ph = document.getElementById('pdf-viewer-placeholder');
        if (!ph) {
            ph = document.createElement('div');
            ph.id = 'pdf-viewer-placeholder';
            ph.style.display = 'none';
            viewer.parentNode.insertBefore(ph, viewer);
        }
        if (desktop) desktop.appendChild(viewer);
        if (btnText) btnText.innerText = 'Contraer';
        if (btnIcon) { btnIcon.src = 'assets/iconos/collapse.svg'; btnIcon.alt = 'Contraer'; }
    } else {
        const ph = document.getElementById('pdf-viewer-placeholder');
        if (ph && ph.parentNode) ph.parentNode.insertBefore(viewer, ph);
        if (btnText) btnText.innerText = 'Expandir';
        if (btnIcon) { btnIcon.src = 'assets/iconos/expand.svg'; btnIcon.alt = 'Expandir'; }
    }
}

// ── Shutdown / Logoff ─────────────────────────────────────────
// Va directamente a la pantalla XP (omite el dialogo viejo del HTML)
function showShutdownDialog(tipo) {
    const menu = document.getElementById('start-menu');
    if (menu) menu.style.display = 'none';
    showXPScreen(tipo === 'apagar');
}

// Inyectar estilos XP una sola vez
function injectXPStyles() {
    if (document.getElementById('xp-screen-styles')) return;
    const s = document.createElement('style');
    s.id = 'xp-screen-styles';
    s.textContent = `
        #xp-shutdown-screen {
            position: fixed; inset: 0; z-index: 999999;
            display: flex; flex-direction: column;
            opacity: 0; transition: opacity 0.7s ease;
            pointer-events: all; cursor: default;
            background: #1660c8;
            font-family: "Franklin Gothic Medium","Arial Narrow",Arial,sans-serif;
            overflow: hidden;
        }
        .xp-top-bar {
            flex-shrink: 0;
            background: linear-gradient(to bottom, #2272e0 0%, #0e4db8 100%);
            border-bottom: 2px solid #f0c000;
            padding: 14px 40px;
            display: flex; align-items: center; gap: 14px;
        }
        .xp-center {
            flex: 1;
            background: linear-gradient(160deg, #1e68d0 0%, #1050a8 45%, #0a3585 100%);
            display: flex; align-items: stretch;
        }
        .xp-left {
            width: 40%;
            border-right: 1px solid rgba(255,255,255,0.15);
            display: flex; flex-direction: column;
            align-items: flex-start; justify-content: center;
            padding: 36px 44px; gap: 18px;
        }
        .xp-left-logo {
            display: flex; align-items: center; gap: 12px;
        }
        .xp-left-subtitle {
            color: #fff;
            font-size: 14px;
            font-family: Tahoma, sans-serif;
            font-weight: 400;
            line-height: 1.6;
            text-shadow: 0 1px 2px rgba(0,0,0,0.6);
        }
        .xp-divider-v {
            width: 100%; height: 1px;
            background: rgba(255,255,255,0.18);
        }
        .xp-right {
            flex: 1;
            display: flex; flex-direction: column;
            align-items: center; justify-content: center;
            padding: 36px 44px; gap: 16px;
        }
        .xp-user-row {
            display: flex; align-items: center; gap: 18px;
        }
        .xp-avatar {
            width: 64px; height: 64px; border-radius: 6px;
            background: linear-gradient(135deg, #3898e8, #1060c0);
            border: 3px solid rgba(255,255,255,0.5);
            box-shadow: 0 4px 16px rgba(0,0,0,0.45);
            overflow: hidden; flex-shrink: 0;
            display: flex; align-items: center; justify-content: center;
        }
        .xp-avatar img { width: 100%; height: 100%; object-fit: cover; }
        .xp-user-info {
            display: flex; flex-direction: column; gap: 5px;
        }
        .xp-user-name {
            color: #fff; font-size: 15px; font-weight: 700;
            font-family: Tahoma, "Segoe UI", sans-serif;
            text-shadow: 0 1px 4px rgba(0,0,0,0.6);
        }
        .xp-status {
            color: #b8d4f4; font-size: 12px;
            font-family: Tahoma, "Segoe UI", sans-serif;
            text-shadow: 0 1px 2px rgba(0,0,0,0.6);
        }
        .xp-progress {
            width: 160px; height: 11px;
            background: rgba(0,0,0,0.35);
            border: 1px solid rgba(255,255,255,0.15);
            border-radius: 2px;
            overflow: hidden; position: relative;
            margin-top: 4px;
        }
        .xp-marquee {
            position: absolute; top: 0; left: -55px;
            width: 55px; height: 100%;
            background: linear-gradient(to right,
                transparent, #3ad53a 35%, #80ff80 50%, #3ad53a 65%, transparent);
            animation: xpmarquee 1.3s linear infinite;
        }
        @keyframes xpmarquee { from { left: -55px } to { left: 160px } }
        .xp-bottom-bar {
            flex-shrink: 0; height: 50px;
            background: linear-gradient(to top, #0e4db8 0%, #2272e0 100%);
            border-top: 2px solid #f0c000;
        }
        /* Flag logo CSS */
        .xp-flag {
            display: grid; grid-template-columns: 1fr 1fr;
            grid-template-rows: 1fr 1fr;
            gap: 3px;
            transform: perspective(100px) rotateY(-6deg) rotateX(3deg);
            filter: drop-shadow(0 3px 8px rgba(0,0,0,0.5));
            flex-shrink: 0;
        }
        .xp-flag-q { border-radius: 2px; }
        .xp-flag-q1 { background: radial-gradient(circle at 60% 60%, #f04020, #c03010); }
        .xp-flag-q2 { background: radial-gradient(circle at 40% 60%, #60c000, #409000); }
        .xp-flag-q3 { background: radial-gradient(circle at 60% 40%, #20b0e8, #0880c0); }
        .xp-flag-q4 { background: radial-gradient(circle at 40% 40%, #f8c800, #d09000); }
        /* Logo text */
        .xp-logo { display: flex; flex-direction: column; line-height: 1; }
        .xp-logo-ms {
            color: rgba(255,255,255,0.65);
            font-size: 9px; letter-spacing: 1px; font-style: italic;
            font-family: Tahoma, sans-serif; margin-bottom: 1px;
        }
        .xp-logo-win {
            color: #fff; font-size: 28px; font-style: italic; font-weight: 400;
            letter-spacing: -0.5px; text-shadow: 1px 1px 3px rgba(0,0,0,0.5);
        }
        .xp-logo-xp {
            font-size: 17px; font-style: italic; font-weight: 700;
            background: linear-gradient(to bottom, #f9d64a, #e08000);
            -webkit-background-clip: text; -webkit-text-fill-color: transparent;
            background-clip: text; letter-spacing: 3px; margin-top: -2px;
        }
        /* Click hint */
        .xp-hint {
            position: absolute; bottom: 60px; left: 50%;
            transform: translateX(-50%);
            color: rgba(255,255,255,0);
            font-size: 11px; font-family: Tahoma, sans-serif;
            cursor: pointer; transition: color 1s ease;
            white-space: nowrap; user-select: none;
        }
        .xp-hint.show { color: rgba(255,255,255,0.35); }
        .xp-hint:hover { color: rgba(255,255,255,0.7); }
    `;
    document.head.appendChild(s);
}

function flagHTML(size) {
    const sz = size || 46;
    return `<div class="xp-flag" style="width:${sz}px;height:${sz}px;">
        <div class="xp-flag-q xp-flag-q1"></div>
        <div class="xp-flag-q xp-flag-q2"></div>
        <div class="xp-flag-q xp-flag-q3"></div>
        <div class="xp-flag-q xp-flag-q4"></div>
    </div>`;
}

function showXPScreen(isShutdown) {
    injectXPStyles();

    const existing = document.getElementById('xp-shutdown-screen');
    if (existing) existing.remove();

    const statusText = isShutdown ? 'Apagando el equipo...' : 'Cerrando sesion...';
    const leftText   = isShutdown
        ? 'Windows XP esta<br>apagando el<br>sistema virtual.'
        : 'Para iniciar sesion,<br>haz clic en tu<br>nombre de usuario.';

    const el = document.createElement('div');
    el.id = 'xp-shutdown-screen';
    el.innerHTML =
        // Top bar
        '<div class="xp-top-bar">' +
            flagHTML(40) +
            '<div class="xp-logo">' +
                '<span class="xp-logo-ms">Microsoft\u00ae</span>' +
                '<span class="xp-logo-win">Windows</span>' +
                '<span class="xp-logo-xp">XP</span>' +
            '</div>' +
        '</div>' +
        // Center (left + right panels)
        '<div class="xp-center">' +
            // LEFT: big logo + subtitle
            '<div class="xp-left">' +
                '<div class="xp-left-logo">' +
                    flagHTML(58) +
                    '<div class="xp-logo">' +
                        '<span class="xp-logo-win" style="font-size:36px;">Windows</span>' +
                        '<span class="xp-logo-xp" style="font-size:22px;">XP</span>' +
                    '</div>' +
                '</div>' +
                '<div class="xp-divider-v"></div>' +
                '<span class="xp-left-subtitle">' + leftText + '</span>' +
            '</div>' +
            // RIGHT: user + status + progress
            '<div class="xp-right">' +
                '<div class="xp-user-row">' +
                    '<div class="xp-avatar">' +
                        '<img src="assets/iconos/users-1.png" alt="Usuario" ' +
                            'onerror="this.style.display=\'none\';this.parentNode.innerHTML=\'<svg viewBox=&quot;0 0 24 24&quot; fill=&quot;rgba(255,255,255,0.7)&quot; width=&quot;40&quot;><path d=&quot;M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z&quot;/></svg>\'">' +
                    '</div>' +
                    '<div class="xp-user-info">' +
                        '<span class="xp-user-name">Hector Daniel Ayarachi Fuentes</span>' +
                        '<span class="xp-status">' + statusText + '</span>' +
                        '<div class="xp-progress">' +
                            '<div class="xp-marquee"></div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>' +
        // Bottom bar
        '<div class="xp-bottom-bar"></div>' +
        // Hint
        '<span class="xp-hint" id="xp-hint">Haz clic en cualquier lugar para volver al escritorio</span>';

    document.body.appendChild(el);

    // Fade in
    requestAnimationFrame(() => requestAnimationFrame(() => { el.style.opacity = '1'; }));

    // After 2.5s enable click-to-dismiss
    setTimeout(() => {
        const hint = document.getElementById('xp-hint');
        if (hint) hint.classList.add('show');
        el.addEventListener('click', dismissXPScreen);
    }, 2500);
}

function dismissXPScreen() {
    const el = document.getElementById('xp-shutdown-screen');
    if (!el) return;
    el.removeEventListener('click', dismissXPScreen);
    el.style.opacity = '0';
    setTimeout(() => { el.remove(); openWindow('main-window'); }, 700);
}

// Aliases for legacy calls
function showBlackScreen(isShutdown) { showXPScreen(isShutdown); }
function dismissBlackScreen()        { dismissXPScreen(); }







