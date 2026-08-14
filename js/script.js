// JavaScript for Windows XP Portfolio Simulation

document.addEventListener('DOMContentLoaded', () => {
    // 1. Clock functionality
    updateClock();
    setInterval(updateClock, 60000); // Update every minute

    // 2. Drag & Drop for Windows
    makeDraggable(document.getElementById('main-window'), document.getElementById('window-titlebar'));
    makeDraggable(document.getElementById('about-dialog'), document.querySelector('.dialog-titlebar'));

    // Double-click on main window titlebar to maximize/restore
    const titlebar = document.getElementById('window-titlebar');
    if (titlebar) {
        titlebar.addEventListener('dblclick', () => {
            toggleMaximizeWindow('main-window');
        });
    }

    // 4. Make Desktop Icons Draggable using Draggabilly
    if (typeof Draggabilly !== 'undefined') {
        const icons = document.querySelectorAll('.desktop-icon');
        icons.forEach(icon => {
            const draggie = new Draggabilly(icon, {
                containment: '.desktop'
            });

            // Handle single click (without dragging) to open shortcuts
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
                }
            });
        });
    }

    // 3. Play Windows XP Startup Sound on first user interaction
    document.body.addEventListener('click', () => {
        const startupSound = document.getElementById('sound-startup');
        if (startupSound && startupSound.paused && !window.hasPlayedStartup) {
            startupSound.volume = 0.4;
            startupSound.play().catch(e => console.log('Audio playback blocked by browser:', e));
            window.hasPlayedStartup = true;
        }
    }, { once: true });
});

// Update Clock
function updateClock() {
    const clockEl = document.getElementById('system-clock');
    if (!clockEl) return;
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    clockEl.innerText = `${hours}:${minutes} ${ampm}`;
}

// Window Navigation Tabs
function switchTab(tabId) {
    // Hide all panels
    const panels = document.querySelectorAll('.xp-tab-panel');
    panels.forEach(panel => panel.classList.remove('active'));

    // Remove active class from all tab buttons
    const buttons = document.querySelectorAll('.xp-tab-button');
    buttons.forEach(btn => btn.classList.remove('active'));

    // Show selected panel
    const selectedPanel = document.getElementById(tabId);
    if (selectedPanel) selectedPanel.classList.add('active');

    // Add active class to clicked button
    let btnId = 'btn-' + tabId;
    const selectedBtn = document.getElementById(btnId);
    if (selectedBtn) selectedBtn.classList.add('active');
}

// Activity selection
function selectActivity(activityId) {
    if (activityId === 'act1') {
        const item = document.getElementById('item-act1');
        if (item) item.classList.add('active');
        // Update viewer path
        const pathBar = document.querySelector('.viewer-path-bar');
        if (pathBar) pathBar.innerText = 'C:\\TI-2026\\Actividades\\Actividad-1\\reporte-laboratorio-prompts.pdf';
        
        // Show PDF
        const iframe = document.getElementById('pdf-iframe');
        if (iframe) iframe.src = 'Actividades/Actividad-1/reporte-laboratorio-prompts.pdf';
    }
}

// Refresh PDF inside iframe
function refreshPDF() {
    const iframe = document.getElementById('pdf-iframe');
    if (iframe) {
        const currentSrc = iframe.src;
        iframe.src = '';
        setTimeout(() => {
            iframe.src = currentSrc;
        }, 100);
    }
}

// Window actions
function closeWindow(windowId) {
    const win = document.getElementById(windowId);
    if (win) win.style.display = 'none';

    // Update taskbar item
    const taskbarItem = document.getElementById(`taskbar-${windowId}`);
    if (taskbarItem) taskbarItem.classList.remove('active');
}

function minimizeWindow(windowId) {
    const win = document.getElementById(windowId);
    if (win) win.classList.add('minimized');

    const taskbarItem = document.getElementById(`taskbar-${windowId}`);
    if (taskbarItem) taskbarItem.classList.remove('active');
}

function openWindow(windowId) {
    const win = document.getElementById(windowId);
    if (win) {
        win.style.display = 'flex';
        // Force reflow to register display change before transition
        void win.offsetWidth;
        win.classList.remove('minimized');
        // Bring to front
        bringToFront(win);
    }

    const taskbarItem = document.getElementById(`taskbar-${windowId}`);
    if (taskbarItem) {
        taskbarItem.style.display = 'flex';
        taskbarItem.classList.add('active');
    }
}

function toggleWindowMinimization(windowId) {
    const win = document.getElementById(windowId);
    const taskbarItem = document.getElementById(`taskbar-${windowId}`);
    
    if (win.classList.contains('minimized') || win.style.display === 'none') {
        win.style.display = 'flex';
        void win.offsetWidth;
        win.classList.remove('minimized');
        bringToFront(win);
        if (taskbarItem) taskbarItem.classList.add('active');
    } else {
        win.classList.add('minimized');
        if (taskbarItem) taskbarItem.classList.remove('active');
    }
}

function toggleMaximizeWindow(windowId) {
    const win = document.getElementById(windowId);
    if (!win) return;

    if (win.classList.contains('maximized')) {
        win.classList.remove('maximized');
        win.style.width = win.dataset.preMaxWidth || '860px';
        win.style.height = win.dataset.preMaxHeight || '650px';
        win.style.top = win.dataset.preMaxTop || '50%';
        win.style.left = win.dataset.preMaxLeft || '50%';
        win.style.transform = win.dataset.preMaxTransform || 'translate(-50%, -52%)';
    } else {
        // Save current styles before maximizing
        win.dataset.preMaxWidth = win.style.width || '860px';
        win.dataset.preMaxHeight = win.style.height || '650px';
        win.dataset.preMaxTop = win.style.top || '50%';
        win.dataset.preMaxLeft = win.style.left || '50%';
        win.dataset.preMaxTransform = win.style.transform || 'translate(-50%, -52%)';

        win.classList.add('maximized');
        win.style.width = '100vw';
        win.style.height = 'calc(100vh - 30px)'; // Taskbar is 30px
        win.style.top = '0';
        win.style.left = '0';
        win.style.transform = 'none';
    }
}

// Bring clicked window to top
function bringToFront(windowEl) {
    const windows = document.querySelectorAll('.window');
    windows.forEach(w => w.style.zIndex = '20');
    windowEl.style.zIndex = '30';
}

// Draggable window utility
function makeDraggable(windowEl, titlebarEl) {
    if (!windowEl || !titlebarEl) return;
    
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    titlebarEl.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        // If maximized, don't drag
        if (windowEl.classList.contains('maximized')) return;
        
        e = e || window.event;
        e.preventDefault();
        
        // Remove translate(-50%, -50%) positioning on first drag to avoid jump
        if (windowEl.style.transform && windowEl.style.transform.includes('translate')) {
            const rect = windowEl.getBoundingClientRect();
            windowEl.style.transform = 'none';
            windowEl.style.left = rect.left + 'px';
            windowEl.style.top = rect.top + 'px';
        }

        bringToFront(windowEl);
        windowEl.classList.add('dragging');
        
        // Get mouse cursor position at startup
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // Call a function whenever the cursor moves
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // Calculate new cursor position
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        
        // Set element's new position
        let newTop = windowEl.offsetTop - pos2;
        let newLeft = windowEl.offsetLeft - pos1;
        
        // Boundaries checks (taskbar constraint)
        if (newTop < 0) newTop = 0;
        if (newTop > window.innerHeight - 60) newTop = window.innerHeight - 60;
        
        windowEl.style.top = newTop + "px";
        windowEl.style.left = newLeft + "px";
    }

    function closeDragElement() {
        windowEl.classList.remove('dragging');
        // Stop moving when mouse button is released
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// Start Menu controls
function toggleStartMenu() {
    const startMenu = document.getElementById('start-menu');
    if (!startMenu) return;

    if (startMenu.style.display === 'flex') {
        startMenu.style.display = 'none';
    } else {
        startMenu.style.display = 'flex';
    }
}

// Close Start Menu if clicking outside
document.addEventListener('click', (e) => {
    const startMenu = document.getElementById('start-menu');
    const startBtn = document.querySelector('.start-btn');
    if (startMenu && startMenu.style.display === 'flex') {
        if (!startMenu.contains(e.target) && !startBtn.contains(e.target)) {
            startMenu.style.display = 'none';
        }
    }
});

// About Modal control
function openAboutModal() {
    const overlay = document.getElementById('about-dialog-overlay');
    if (overlay) {
        overlay.style.display = 'flex';
        // Play error/warning alert sound (retro experience!)
        const alertSound = document.getElementById('sound-error');
        if (alertSound) {
            alertSound.currentTime = 0;
            alertSound.volume = 0.3;
            alertSound.play().catch(e => console.log('Sound blocked:', e));
        }
        
        // Focus the OK button
        setTimeout(() => {
            const okBtn = document.querySelector('.dialog-ok-btn');
            if (okBtn) okBtn.focus();
        }, 100);
    }
}

function closeAboutModal() {
    const overlay = document.getElementById('about-dialog-overlay');
    if (overlay) overlay.style.display = 'none';
}

function closeAboutModalOnOverlay(event) {
    if (event.target.id === 'about-dialog-overlay') {
        closeAboutModal();
    }
}

// Toggle full screen / expanded view for PDF viewer
function toggleExpandPDF() {
    const viewer = document.querySelector('.activities-viewer');
    if (!viewer) return;

    const btnText = document.getElementById('text-expand-pdf');
    const btnIcon = document.getElementById('icon-expand-pdf');
    const desktop = document.querySelector('.desktop');

    viewer.classList.toggle('expanded');

    if (viewer.classList.contains('expanded')) {
        // Create a placeholder where the viewer was originally located
        let placeholder = document.getElementById('pdf-viewer-placeholder');
        if (!placeholder) {
            placeholder = document.createElement('div');
            placeholder.id = 'pdf-viewer-placeholder';
            placeholder.style.display = 'none';
            viewer.parentNode.insertBefore(placeholder, viewer);
        }
        
        // Move the viewer to the desktop container so it can cover the full screen
        if (desktop) {
            desktop.appendChild(viewer);
        }

        if (btnText) btnText.innerText = 'Contraer';
        if (btnIcon) {
            btnIcon.src = 'assets/iconos/collapse.svg';
            btnIcon.alt = 'Contraer';
        }
    } else {
        // Move the viewer back to its original layout position
        const placeholder = document.getElementById('pdf-viewer-placeholder');
        if (placeholder && placeholder.parentNode) {
            placeholder.parentNode.insertBefore(viewer, placeholder);
        }

        if (btnText) btnText.innerText = 'Expandir';
        if (btnIcon) {
            btnIcon.src = 'assets/iconos/expand.svg';
            btnIcon.alt = 'Expandir';
        }
    }
}

// Shutdown / Logoff custom dialog
function showShutdownDialog(tipo) {
    // Cerrar el menÃº inicio si estÃ¡ abierto
    const startMenu = document.getElementById('start-menu');
    if (startMenu) startMenu.style.display = 'none';

    const overlay   = document.getElementById('shutdown-overlay');
    const emoji     = document.getElementById('shutdown-emoji');
    const title     = document.getElementById('shutdown-title');
    const msg       = document.getElementById('shutdown-msg');
    const progress  = document.getElementById('shutdown-progress');

    if (!overlay) return;

    const esApagar = tipo === 'apagar';
    if (esApagar) {
        emoji.textContent = 'ðŸ”Œ';
        title.textContent = 'Apagando el equipo...';
        msg.textContent   = 'Windows XP estÃ¡ apagando el sistema virtual. Gracias por su visita.';
    } else {
        emoji.textContent = 'ðŸ‘¤';
        title.textContent = 'Cerrando sesiÃ³n...';
        msg.textContent   = 'Cerrando sesiÃ³n de Hector Daniel Ayarachi Fuentes. Hasta luego.';
    }

    // Reiniciar barra de progreso y mostrar overlay
    progress.style.width = '0%';
    overlay.style.opacity = '1';
    overlay.style.transition = 'none';
    overlay.style.display = 'flex';

    // Animar barra de progreso durante ~2 segundos
    let pct = 0;
    const interval = setInterval(() => {
        pct += 2;
        progress.style.width = pct + '%';
        if (pct >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                // Mostrar pantalla negra de apagado (simula equipo apagado)
                showBlackScreen(esApagar);
            }, 400);
        }
    }, 40);
}

// Pantalla de apagado/logoff estilo Windows XP - diseno unificado
function showBlackScreen(isShutdown) {
    var overlay = document.getElementById('shutdown-overlay');
    if (overlay) overlay.style.display = 'none';

    // Inyectar estilos una sola vez
    if (!document.getElementById('xp-shutdown-styles')) {
        var style = document.createElement('style');
        style.id = 'xp-shutdown-styles';
        style.textContent = [
            '#xp-shutdown-screen {',
            '  position:fixed; inset:0; z-index:999999;',
            '  display:flex; flex-direction:column;',
            '  opacity:0; transition:opacity 0.7s ease;',
            '  pointer-events:all; cursor:default;',
            '  background:#1660c8;',
            '  font-family:"Franklin Gothic Medium","Arial Narrow",Arial,sans-serif;',
            '  overflow:hidden;',
            '}',
            '.xp-top-stripe {',
            '  flex-shrink:0;',
            '  background:linear-gradient(to bottom,#2272e0 0%,#0e4db8 100%);',
            '  border-bottom:2px solid #f0c000;',
            '  padding:16px 48px;',
            '  display:flex; align-items:center; gap:14px;',
            '}',
            '.xp-body {',
            '  flex:1;',
            '  background:linear-gradient(160deg,#1e68d0 0%,#1050a8 40%,#0a3585 100%);',
            '  display:flex; align-items:stretch;',
            '}',
            /* Left panel: XP logo + subtitle */
            '.xp-left-panel {',
            '  width:38%; border-right:1px solid rgba(255,255,255,0.15);',
            '  display:flex; flex-direction:column;',
            '  align-items:flex-start; justify-content:center;',
            '  padding:32px 40px;',
            '  gap:14px;',
            '}',
            '.xp-left-title {',
            '  color:#fff; font-size:14px; font-weight:400;',
            '  font-family:Tahoma,sans-serif; line-height:1.5;',
            '  text-shadow:0 1px 2px rgba(0,0,0,0.6);',
            '}',
            /* Right panel: user list */
            '.xp-right-panel {',
            '  flex:1;',
            '  display:flex; flex-direction:column;',
            '  align-items:center; justify-content:center;',
            '  padding:32px 40px; gap:20px;',
            '}',
            '.xp-user-row {',
            '  display:flex; align-items:center; gap:16px;',
            '}',
            '.xp-user-avatar {',
            '  width:64px; height:64px; border-radius:6px;',
            '  background:linear-gradient(135deg,#3898e8,#1060c0);',
            '  border:3px solid rgba(255,255,255,0.45);',
            '  box-shadow:0 4px 16px rgba(0,0,0,0.5);',
            '  overflow:hidden; flex-shrink:0;',
            '  display:flex; align-items:center; justify-content:center;',
            '}',
            '.xp-user-avatar img { width:100%; height:100%; object-fit:cover; }',
            '.xp-user-info {',
            '  display:flex; flex-direction:column; gap:4px;',
            '}',
            '.xp-user-name {',
            '  color:#fff; font-size:15px; font-weight:700;',
            '  text-shadow:0 1px 4px rgba(0,0,0,0.6);',
            '  font-family:Tahoma,"Segoe UI",sans-serif;',
            '}',
            '.xp-status-text {',
            '  color:#c0d8f8; font-size:12px;',
            '  font-family:Tahoma,"Segoe UI",sans-serif;',
            '  text-shadow:0 1px 2px rgba(0,0,0,0.7);',
            '}',
            /* Progress bar marquee */
            '.xp-progress-track {',
            '  width:160px; height:11px;',
            '  background:rgba(0,0,0,0.35);',
            '  border:1px solid rgba(255,255,255,0.15);',
            '  border-radius:2px; overflow:hidden; position:relative;',
            '}',
            '.xp-progress-marquee {',
            '  position:absolute; top:0; left:-55px;',
            '  width:55px; height:100%;',
            '  background:linear-gradient(to right,transparent,#3ad53a 35%,#80ff80 50%,#3ad53a 65%,transparent);',
            '  animation:xp-marquee 1.3s linear infinite;',
            '}',
            '@keyframes xp-marquee { from{left:-55px} to{left:160px} }',
            /* Bottom stripe */
            '.xp-bottom-stripe {',
            '  flex-shrink:0; height:52px;',
            '  background:linear-gradient(to top,#0e4db8 0%,#2272e0 100%);',
            '  border-top:2px solid #f0c000;',
            '}',
            /* Flag logo */
            '.xp-flag {',
            '  display:grid; grid-template-columns:1fr 1fr;',
            '  grid-template-rows:1fr 1fr;',
            '  gap:3px; width:46px; height:46px;',
            '  transform:perspective(100px) rotateY(-6deg) rotateX(3deg);',
            '  filter:drop-shadow(0 3px 8px rgba(0,0,0,0.5));',
            '  flex-shrink:0;',
            '}',
            '.xp-flag-q { border-radius:2px; }',
            '.xp-flag-q1 { background:radial-gradient(circle at 60% 60%,#f04020,#c03010); }',
            '.xp-flag-q2 { background:radial-gradient(circle at 40% 60%,#60c000,#409000); }',
            '.xp-flag-q3 { background:radial-gradient(circle at 60% 40%,#20b0e8,#0880c0); }',
            '.xp-flag-q4 { background:radial-gradient(circle at 40% 40%,#f8c800,#d09000); }',
            '.xp-logo-text { display:flex; flex-direction:column; line-height:1; }',
            '.xp-logo-microsoft { color:rgba(255,255,255,0.7); font-size:9px; letter-spacing:1px; font-style:italic; font-family:Tahoma,sans-serif; margin-bottom:1px; }',
            '.xp-logo-windows { color:#fff; font-size:30px; font-style:italic; font-weight:400; letter-spacing:-0.5px; text-shadow:1px 1px 3px rgba(0,0,0,0.5); }',
            '.xp-logo-xp { font-size:18px; font-style:italic; font-weight:700; background:linear-gradient(to bottom,#f9d64a,#e08000); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; letter-spacing:3px; margin-top:-3px; }',
            /* Click hint */
            '.xp-click-hint { position:absolute; bottom:62px; left:50%; transform:translateX(-50%); color:rgba(255,255,255,0); font-size:11px; font-family:Tahoma,sans-serif; cursor:pointer; transition:color 1s ease; white-space:nowrap; user-select:none; }',
            '.xp-click-hint.visible { color:rgba(255,255,255,0.35); }',
            '.xp-click-hint:hover { color:rgba(255,255,255,0.7); }'
        ].join('\n');
        document.head.appendChild(style);
    }

    // Eliminar pantalla anterior si existe
    var existing = document.getElementById('xp-shutdown-screen');
    if (existing) existing.remove();

    var statusText = isShutdown ? 'Apagando el equipo...' : 'Cerrando sesion...';
    var leftTitle  = isShutdown
        ? 'Windows XP esta apagando<br>el sistema virtual.'
        : 'Para iniciar sesion,<br>haz clic en tu nombre.';

    var screen = document.createElement('div');
    screen.id = 'xp-shutdown-screen';

    screen.innerHTML =
        '<div class="xp-top-stripe">' +
            '<div class="xp-flag">' +
                '<div class="xp-flag-q xp-flag-q1"></div>' +
                '<div class="xp-flag-q xp-flag-q2"></div>' +
                '<div class="xp-flag-q xp-flag-q3"></div>' +
                '<div class="xp-flag-q xp-flag-q4"></div>' +
            '</div>' +
            '<div class="xp-logo-text">' +
                '<span class="xp-logo-microsoft">Microsoft\u00ae</span>' +
                '<span class="xp-logo-windows">Windows</span>' +
                '<span class="xp-logo-xp">XP</span>' +
            '</div>' +
        '</div>' +
        '<div class="xp-body">' +
            '<div class="xp-left-panel">' +
                '<div style="display:flex;align-items:center;gap:12px;margin-bottom:8px;">' +
                    '<div class="xp-flag" style="width:56px;height:56px;">' +
                        '<div class="xp-flag-q xp-flag-q1"></div>' +
                        '<div class="xp-flag-q xp-flag-q2"></div>' +
                        '<div class="xp-flag-q xp-flag-q3"></div>' +
                        '<div class="xp-flag-q xp-flag-q4"></div>' +
                    '</div>' +
                    '<div class="xp-logo-text">' +
                        '<span class="xp-logo-windows" style="font-size:36px;">Windows</span>' +
                        '<span class="xp-logo-xp" style="font-size:22px;">XP</span>' +
                    '</div>' +
                '</div>' +
                '<div style="width:100%;height:1px;background:rgba(255,255,255,0.2);margin:8px 0;"></div>' +
                '<span class="xp-left-title">' + leftTitle + '</span>' +
            '</div>' +
            '<div class="xp-right-panel">' +
                '<div class="xp-user-row">' +
                    '<div class="xp-user-avatar">' +
                        '<img src="assets/iconos/users-1.png" alt="Usuario" onerror="this.style.display=\'none\'">' +
                    '</div>' +
                    '<div class="xp-user-info">' +
                        '<span class="xp-user-name">Hector Daniel Ayarachi Fuentes</span>' +
                        '<span class="xp-status-text">' + statusText + '</span>' +
                        '<div class="xp-progress-track" style="margin-top:6px;">' +
                            '<div class="xp-progress-marquee"></div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>' +
        '<div class="xp-bottom-stripe"></div>' +
        '<span class="xp-click-hint" id="xp-click-hint">Haz clic en cualquier lugar para volver al escritorio</span>';

    document.body.appendChild(screen);

    // Fade-in
    requestAnimationFrame(function() {
        requestAnimationFrame(function() { screen.style.opacity = '1'; });
    });

    // Tras 2.5s: hint visible + habilitar clic
    setTimeout(function() {
        var hint = document.getElementById('xp-click-hint');
        if (hint) hint.classList.add('visible');
        screen.addEventListener('click', dismissXPScreen);
    }, 2500);
}

// Quitar pantalla XP y volver al escritorio
function dismissXPScreen() {
    var screen = document.getElementById('xp-shutdown-screen');
    if (!screen) return;
    screen.removeEventListener('click', dismissXPScreen);
    screen.style.opacity = '0';
    setTimeout(function() {
        screen.remove();
        openWindow('main-window');
    }, 700);
}

// Alias por compatibilidad
function dismissBlackScreen() { dismissXPScreen(); }
