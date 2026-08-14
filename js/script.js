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
    // Cerrar el menú inicio si está abierto
    const startMenu = document.getElementById('start-menu');
    if (startMenu) startMenu.style.display = 'none';

    const overlay   = document.getElementById('shutdown-overlay');
    const emoji     = document.getElementById('shutdown-emoji');
    const title     = document.getElementById('shutdown-title');
    const msg       = document.getElementById('shutdown-msg');
    const progress  = document.getElementById('shutdown-progress');

    if (!overlay) return;

    if (tipo === 'apagar') {
        emoji.textContent = '🔌';
        title.textContent = 'Apagando el equipo...';
        msg.textContent   = 'Windows XP está apagando el sistema virtual. Gracias por su visita.';
    } else {
        emoji.textContent = '👤';
        title.textContent = 'Cerrando sesión...';
        msg.textContent   = 'Cerrando sesión de Hector Daniel Ayarachi Fuentes. Hasta luego.';
    }

    // Reiniciar barra de progreso
    progress.style.width = '0%';
    overlay.style.display = 'flex';

    // Animar barra de progreso durante ~2 segundos
    let pct = 0;
    const interval = setInterval(() => {
        pct += 2;
        progress.style.width = pct + '%';
        if (pct >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                window.close();
                // Fallback si el browser bloquea window.close()
                overlay.style.transition = 'opacity 0.8s';
                overlay.style.opacity = '0';
            }, 400);
        }
    }, 40);
}

