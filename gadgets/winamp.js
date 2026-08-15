// ── Winamp & Windows XP DeskBand Mini Player ────────────────
// Extracted from script.js for modular maintenance
// Dependencies: bringToFront(), closeWindow() from script.js

let webampInstance = null;
let isWebampOpen = false;
let isWebampMinimized = false;
let isDeskbandPlaying = true;
let isVideoWindowOpen = false;
let winampVideoInit = false;

function initWinamp() {
    if (typeof Webamp === 'undefined') {
        console.warn('Webamp library is not yet loaded.');
        return;
    }

    if (!webampInstance) {
        webampInstance = new Webamp({
            initialTracks: [
                {
                    metaData: {
                        artist: "Mirtha Pérez",
                        title: "La Nave Del Olvido"
                    },
                    url: "Musica/Mirtha%20P%C3%A9rez%20-%20La%20Nave%20Del%20Olvido.mp4"
                },
                {
                    metaData: {
                        artist: "DJ Mike Llama",
                        title: "Llama Whippin' Intro (Winamp 2.91)"
                    },
                    url: "https://raw.githubusercontent.com/captbaritone/webamp/master/packages/webamp/demo/mp3/llama-2.91.mp3",
                    duration: 5.322286
                }
            ],
            availableSkins: [
                {
                    url: "https://raw.githubusercontent.com/captbaritone/webamp/master/packages/webamp/demo/skins/Internet-Archive.wsz",
                    name: "Internet Archive"
                },
                {
                    url: "https://raw.githubusercontent.com/captbaritone/webamp/master/packages/webamp/demo/skins/Mac_OS_X_Aqua.wsz",
                    name: "Mac OS X Aqua"
                },
                {
                    url: "https://raw.githubusercontent.com/captbaritone/webamp/master/packages/webamp/demo/skins/SpyAMP_Vers_1.wsz",
                    name: "SpyAMP"
                }
            ],
            zIndex: 60
        });

        webampInstance.onClose(() => {
            isWebampOpen = false;
            hideAllWinampWindows();
            updateWinampTaskbar(false, false);
            pauseAllVideos();
        });

        webampInstance.onMinimize(() => {
            minimizeAllWinamp();
        });

        const container = document.getElementById('webamp-container') || document.body;
        webampInstance.renderWhenReady(container).then(() => {
            isWebampOpen = true;
            isWebampMinimized = false;
            updateWinampTaskbar(true, true);

            // Sincronizar estado de webamp hacia los videos
            try {
                if (webampInstance.store) {
                    let lastStatus = webampInstance.store.getState().media.status;
                    webampInstance.store.subscribe(() => {
                        const status = webampInstance.store.getState().media.status;
                        if (status !== lastStatus) {
                            lastStatus = status;
                            if (status === 'PLAYING') {
                                playAllVideos(true);
                            } else if (status === 'PAUSED' || status === 'STOPPED') {
                                pauseAllVideos(true);
                            }
                        }
                        
                        // Sincronizar tiempo
                        if (status === 'PLAYING') {
                            const webampTime = webampInstance.store.getState().media.timeElapsed;
                            const video = document.getElementById('winamp-video-element');
                            if (video) {
                                if (video.paused && (!document.hidden)) video.play().catch(()=>{});
                                if (Math.abs(video.currentTime - webampTime) > 1.5) {
                                    video.currentTime = webampTime;
                                }
                            }
                            const dbVideo = document.getElementById('deskband-video');
                            if (dbVideo && dbVideo.paused && (!document.hidden)) dbVideo.play().catch(()=>{});
                        }
                    });
                }
            } catch(e) {
                console.warn('No se pudo enlazar el estado de webamp', e);
            }

            const webampEl = document.getElementById('webamp');
            if (webampEl) {
                webampEl.style.pointerEvents = 'auto';
                webampEl.addEventListener('mousedown', () => {
                    document.querySelectorAll('.window').forEach(w => w.style.zIndex = '20');
                    webampEl.style.zIndex = '60';
                });
            }
        }).catch(err => {
            console.error('Error rendering Webamp:', err);
        });
    }
}

function minimizeAllWinamp() {
    isWebampMinimized = true;
    const webampEl = document.getElementById('webamp');
    if (webampEl) webampEl.style.display = 'none';
    const winVid = document.getElementById('winamp-video-window');
    if (winVid) winVid.style.display = 'none';
    updateWinampTaskbar(true, false);
}

function restoreAllWinamp() {
    isWebampMinimized = false;
    const webampEl = document.getElementById('webamp');
    if (webampEl) {
        webampEl.style.display = 'block';
        webampEl.style.zIndex = '60';
    }
    const winVid = document.getElementById('winamp-video-window');
    if (winVid && isVideoWindowOpen) {
        winVid.style.display = 'flex';
        winVid.style.zIndex = '65';
    }
    updateWinampTaskbar(true, true);
}

function hideAllWinampWindows() {
    const webampEl = document.getElementById('webamp');
    if (webampEl) webampEl.style.display = 'none';
    const winVid = document.getElementById('winamp-video-window');
    if (winVid) winVid.style.display = 'none';
}

function openWinamp() {
    if (!webampInstance) {
        initWinamp();
    } else {
        if (!isWebampOpen) {
            webampInstance.reopen();
            isWebampOpen = true;
        }
        restoreAllWinamp();
    }
}

function restoreWinamp(event) {
    if (event) event.stopPropagation();
    openWinamp();
}

function handleWinampTaskbarClick(event) {
    const target = event.target;
    if (target.closest && (target.closest('.deskband-btn') || target.closest('.deskband-thumb'))) {
        return;
    }
    toggleWinamp();
}

function toggleWinamp() {
    const webampEl = document.getElementById('webamp');
    if (!webampInstance || !isWebampOpen) {
        openWinamp();
        return;
    }

    if (isWebampMinimized || (webampEl && webampEl.style.display === 'none')) {
        restoreAllWinamp();
    } else {
        minimizeAllWinamp();
    }
}

// ── Videos Synchronization & Playback ───────────────────────
let isSyncingPlayState = false;

function playAllVideos(fromWebamp = false) {
    if (isSyncingPlayState) return;
    const dbVideo = document.getElementById('deskband-video');
    const popVideo = document.getElementById('popup-video');
    const mainVideo = document.getElementById('winamp-video-element');
    const btn = document.getElementById('db-btn-play');
    const wvBtn = document.getElementById('wv-btn-play');

    if (dbVideo && dbVideo.paused) dbVideo.play().catch(() => {});
    if (popVideo && popVideo.paused) popVideo.play().catch(() => {});
    if (mainVideo && mainVideo.paused) mainVideo.play().catch(() => {});

    if (btn) btn.innerText = '⏸';
    if (wvBtn) wvBtn.innerText = '⏸';
    isDeskbandPlaying = true;
    
    if (!fromWebamp && webampInstance && typeof webampInstance.play === 'function') {
        isSyncingPlayState = true;
        try { webampInstance.play(); } catch(e){}
        isSyncingPlayState = false;
    }
}

function pauseAllVideos(fromWebamp = false) {
    if (isSyncingPlayState) return;
    const dbVideo = document.getElementById('deskband-video');
    const popVideo = document.getElementById('popup-video');
    const mainVideo = document.getElementById('winamp-video-element');
    const btn = document.getElementById('db-btn-play');
    const wvBtn = document.getElementById('wv-btn-play');

    if (dbVideo && !dbVideo.paused) dbVideo.pause();
    if (popVideo && !popVideo.paused) popVideo.pause();
    if (mainVideo && !mainVideo.paused) mainVideo.pause();

    if (btn) btn.innerText = '▶';
    if (wvBtn) wvBtn.innerText = '▶';
    isDeskbandPlaying = false;
    
    if (!fromWebamp && webampInstance && typeof webampInstance.pause === 'function') {
        isSyncingPlayState = true;
        try { webampInstance.pause(); } catch(e){}
        isSyncingPlayState = false;
    }
}

function toggleWinampDeskbandPlay(event) {
    if (event) event.stopPropagation();
    const v = document.getElementById('deskband-video');
    if (!v) return;
    if (v.paused) {
        playAllVideos();
    } else {
        pauseAllVideos();
    }
}

function updateWinampTaskbar(isVisible, isActive) {
    const taskbarItem = document.getElementById('taskbar-winamp');
    if (!taskbarItem) return;
    taskbarItem.style.display = isVisible ? 'flex' : 'none';
    if (isActive) {
        taskbarItem.classList.add('active');
    } else {
        taskbarItem.classList.remove('active');
    }
}

// ── Winamp Video Window (Toggleable Desktop Screen) ──────────
function setupWinampVideoEvents() {
    if (winampVideoInit) return;
    const video = document.getElementById('winamp-video-element');
    const seekbar = document.getElementById('winamp-video-seekbar');
    const timeDisplay = document.getElementById('winamp-video-time-display');
    const playBtn = document.getElementById('wv-btn-play');
    const overlay = document.getElementById('winamp-video-play-overlay');

    if (!video) return;
    video.muted = true;

    video.addEventListener('timeupdate', () => {
        if (!video.duration) return;
        const progress = (video.currentTime / video.duration) * 100;
        if (seekbar) seekbar.value = progress;

        const curMin = Math.floor(video.currentTime / 60).toString().padStart(2, '0');
        const curSec = Math.floor(video.currentTime % 60).toString().padStart(2, '0');
        if (timeDisplay) timeDisplay.innerText = `${curMin}:${curSec}`;

        // Sync thumbnail video times
        const dbV = document.getElementById('deskband-video');
        const popV = document.getElementById('popup-video');
        if (dbV && Math.abs(dbV.currentTime - video.currentTime) > 1) dbV.currentTime = video.currentTime;
        if (popV && Math.abs(popV.currentTime - video.currentTime) > 1) popV.currentTime = video.currentTime;
    });

    video.addEventListener('play', () => {
        if (playBtn) playBtn.innerText = '⏸';
        if (overlay) overlay.style.display = 'none';
    });

    video.addEventListener('pause', () => {
        if (playBtn) playBtn.innerText = '▶';
        if (overlay) overlay.style.display = 'flex';
    });

    winampVideoInit = true;
}

function toggleWinampVideoWindow(event) {
    if (event) event.stopPropagation();
    setupWinampVideoEvents();
    const win = document.getElementById('winamp-video-window');
    if (!win) return;

    if (win.style.display === 'none' || !isVideoWindowOpen) {
        win.style.display = 'flex';
        win.classList.remove('minimized');
        bringToFront(win);
        isVideoWindowOpen = true;
        const video = document.getElementById('winamp-video-element');
        const dbV = document.getElementById('deskband-video');
        if (video && dbV) {
            video.currentTime = dbV.currentTime;
            video.play().catch(() => {});
        }
    } else {
        win.style.display = 'none';
        isVideoWindowOpen = false;
    }
}

function closeWinampVideo() {
    const win = document.getElementById('winamp-video-window');
    if (win) win.style.display = 'none';
    isVideoWindowOpen = false;
}

function toggleWinampVideoMin() {
    minimizeAllWinamp();
}

function toggleWinampVideoPlay() {
    setupWinampVideoEvents();
    const video = document.getElementById('winamp-video-element');
    if (!video) return;
    if (video.paused) {
        playAllVideos();
    } else {
        pauseAllVideos();
    }
}

function stopWinampVideo() {
    const video = document.getElementById('winamp-video-element');
    if (video) {
        video.pause();
        video.currentTime = 0;
    }
    pauseAllVideos();
}

function seekWinampVideo(percent) {
    const video = document.getElementById('winamp-video-element');
    if (video && video.duration) {
        video.currentTime = (percent / 100) * video.duration;
        const dbV = document.getElementById('deskband-video');
        const popV = document.getElementById('popup-video');
        if (dbV) dbV.currentTime = video.currentTime;
        if (popV) popV.currentTime = video.currentTime;
        
        if (webampInstance && typeof webampInstance.seekToTime === 'function') {
            try { webampInstance.seekToTime(video.currentTime); } catch(e){}
        }
    }
}

function setWinampVideoVolume(vol) {
    const icon = document.getElementById('wv-vol-icon');
    if (icon) icon.innerText = vol == 0 ? '🔇' : '🔊';
    // Video elements always remain muted so Webamp is the single audio source
    const video = document.getElementById('winamp-video-element');
    if (video) video.muted = true;
}

function toggleWinampVideoMute() {
    const icon = document.getElementById('wv-vol-icon');
    if (icon) icon.innerText = icon.innerText === '🔇' ? '🔊' : '🔇';
    const video = document.getElementById('winamp-video-element');
    if (video) video.muted = true;
}

function toggleWinampVideoSize() {
    const win = document.getElementById('winamp-video-window');
    const label = document.getElementById('wv-scale-label');
    if (!win) return;
    win.classList.toggle('size-2x');
    const is2x = win.classList.contains('size-2x');
    if (label) label.innerText = is2x ? '2X' : '1X';
}

function fullscreenWinampVideo() {
    const video = document.getElementById('winamp-video-element');
    if (!video) return;
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    }
}
