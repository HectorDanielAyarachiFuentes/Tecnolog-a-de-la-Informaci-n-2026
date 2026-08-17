// ── Internet Explorer 6 Browser ─────────────────────────────
// Extracted from script.js for modular maintenance
// Dependencies: bringToFront(), closeWindow() from script.js

let ieHistory = [];
let ieHistoryIndex = -1;
let ieCurrentUrl = '';
let ieIsLoading = false;
let ieAbortController = null;
let ieLoadTimer = null;
let ieUsingProxy = false;

function openIE() {
    const win = document.getElementById('ie-window');
    if (win) {
        win.style.display = 'flex';
        win.classList.remove('minimized');
        bringToFront(win);

        const taskItem = document.getElementById('taskbar-ie-window');
        if (taskItem) {
            taskItem.style.display = 'flex';
            taskItem.classList.add('active');
        }
    }
}

function closeIE() {
    closeWindow('ie-window');
    const taskItem = document.getElementById('taskbar-ie-window');
    if (taskItem) taskItem.style.display = 'none';
    ieStopLoading();
    // Reset iframe
    const iframe = document.getElementById('ie-iframe');
    if (iframe) { iframe.src = 'about:blank'; iframe.removeAttribute('srcdoc'); }
}

function ieSetLoading(isLoading) {
    ieIsLoading = isLoading;
    const loadingBar = document.getElementById('ie-loading-bar');
    const throbber = document.getElementById('ie-throbber');
    const statusText = document.getElementById('ie-status-text');

    if (isLoading) {
        if (loadingBar) loadingBar.classList.add('loading');
        if (throbber) throbber.classList.add('spinning');
        if (statusText) statusText.innerText = 'Abriendo página...';
    } else {
        if (loadingBar) loadingBar.classList.remove('loading');
        if (throbber) throbber.classList.remove('spinning');
        if (statusText) statusText.innerText = 'Listo';
    }
}

function ieShowPage(view) {
    const homepage = document.getElementById('ie-homepage');
    const iframe = document.getElementById('ie-iframe');
    const errorPage = document.getElementById('ie-error-page');

    if (homepage) homepage.style.display = view === 'home' ? 'flex' : 'none';
    if (iframe) iframe.style.display = view === 'page' ? 'block' : 'none';
    if (errorPage) {
        if (view === 'error') { errorPage.style.display = 'flex'; errorPage.classList.add('visible'); }
        else { errorPage.style.display = 'none'; errorPage.classList.remove('visible'); }
    }
}

function ieUpdateNavButtons() {
    const backBtn = document.getElementById('ie-btn-back');
    const fwdBtn = document.getElementById('ie-btn-forward');

    if (backBtn) {
        if (ieHistoryIndex > 0) backBtn.classList.remove('disabled');
        else backBtn.classList.add('disabled');
    }
    if (fwdBtn) {
        if (ieHistoryIndex < ieHistory.length - 1) fwdBtn.classList.remove('disabled');
        else fwdBtn.classList.add('disabled');
    }
}

function ieNormalizeUrl(url) {
    url = url.trim();
    if (!url) return '';
    
    // If it looks like a search query (no dots, no protocol)
    if (!url.includes('.') && !url.startsWith('http')) {
        return 'https://www.google.com/search?igu=1&q=' + encodeURIComponent(url);
    }

    // Google special handling - add igu=1 for iframe compatibility
    if (url.match(/google\.com\/search/i) && !url.includes('igu=')) {
        url += (url.includes('?') ? '&' : '?') + 'igu=1';
    }
    
    // Add protocol if missing
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
    }

    // For google.com without /search path (homepage), redirect to search
    if (url.match(/^https?:\/\/(www\.)?google\.com\/?$/i)) {
        url = 'https://www.google.com/webhp?igu=1';
    }

    return url;
}

function ieNavigate() {
    const input = document.getElementById('ie-address-input');
    if (!input) return;
    const url = ieNormalizeUrl(input.value);
    if (!url) return;
    ieNavigateTo(url);
}

function ieNavigateTo(url) {
    url = ieNormalizeUrl(url);
    if (!url) return;

    // Update address bar
    const input = document.getElementById('ie-address-input');
    if (input) input.value = url;

    // Add to history
    if (ieCurrentUrl !== url) {
        // Trim forward history
        ieHistory = ieHistory.slice(0, ieHistoryIndex + 1);
        ieHistory.push(url);
        ieHistoryIndex = ieHistory.length - 1;
    }

    ieCurrentUrl = url;
    ieUsingProxy = false;
    ieUpdateNavButtons();
    ieLoadUrl(url, false);
}

function ieLoadUrl(url, useProxy) {
    // Cancel any previous timers/requests
    if (ieLoadTimer) { clearTimeout(ieLoadTimer); ieLoadTimer = null; }
    if (ieAbortController) { ieAbortController.abort(); ieAbortController = null; }

    ieSetLoading(true);
    ieShowPage('page');

    const titleText = document.getElementById('ie-title-text');
    const statusUrl = document.getElementById('ie-status-url');
    if (statusUrl) statusUrl.innerText = url;

    const iframe = document.getElementById('ie-iframe');
    if (!iframe) return;

    // Remove old srcdoc if switching to direct mode
    if (!useProxy) iframe.removeAttribute('srcdoc');

    if (useProxy) {
        // ── PROXY MODE: Fetch via AllOrigins and inject as srcdoc ──
        ieUsingProxy = true;
        if (titleText) titleText.innerText = url + ' - Internet Explorer (Proxy)';

        ieAbortController = new AbortController();
        const proxyUrl = 'https://api.allorigins.win/raw?url=' + encodeURIComponent(url);

        fetch(proxyUrl, { signal: ieAbortController.signal })
            .then(response => {
                if (!response.ok) throw new Error('HTTP ' + response.status);
                return response.text();
            })
            .then(html => {
                // Inject a <base> tag so relative URLs resolve correctly
                let origin = '';
                try { origin = new URL(url).origin; } catch(e) { origin = url; }

                const baseTag = '<base href="' + origin + '/" target="_self">';

                if (html.toLowerCase().includes('<head>')) {
                    html = html.replace(/<head>/i, '<head>' + baseTag);
                } else if (html.toLowerCase().includes('<html>')) {
                    html = html.replace(/<html[^>]*>/i, '$&<head>' + baseTag + '</head>');
                } else {
                    html = baseTag + html;
                }

                iframe.srcdoc = html;
                iframe.style.display = 'block';

                // Extract page title
                const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
                if (titleMatch && titleMatch[1] && titleText) {
                    titleText.innerText = titleMatch[1].trim() + ' - Internet Explorer';
                }

                ieSetLoading(false);
                ieShowPage('page');
            })
            .catch(err => {
                if (err.name === 'AbortError') return;
                console.warn('IE Proxy Error:', err);
                ieSetLoading(false);
                ieShowError(url, err.message);
            });
    } else {
        // ── DIRECT MODE: Load URL directly in iframe ──
        if (titleText) titleText.innerText = url + ' - Internet Explorer';

        // Set up load handler
        const onLoad = () => {
            iframe.removeEventListener('load', onLoad);
            if (ieLoadTimer) { clearTimeout(ieLoadTimer); ieLoadTimer = null; }

            ieSetLoading(false);

            // Try to read the title from the iframe (works for same-origin)
            try {
                const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                if (iframeDoc && iframeDoc.title) {
                    if (titleText) titleText.innerText = iframeDoc.title + ' - Internet Explorer';
                }
                // Try to get the current URL (for navigation tracking)
                try {
                    const currentLoc = iframe.contentWindow.location.href;
                    if (currentLoc && currentLoc !== 'about:blank' && currentLoc !== url) {
                        ieCurrentUrl = currentLoc;
                        const input = document.getElementById('ie-address-input');
                        if (input) input.value = currentLoc;
                        if (statusUrl) statusUrl.innerText = currentLoc;
                    }
                } catch(e) { /* cross-origin, ignore */ }
            } catch(e) { /* cross-origin, ignore */ }
        };

        // Set up error detection: if iframe is blocked by X-Frame-Options,
        // the load event fires but content is empty. We detect this and
        // automatically fall back to proxy mode.
        const onError = () => {
            iframe.removeEventListener('error', onError);
            console.warn('IE: iframe error, trying proxy fallback');
            ieLoadUrl(url, true);
        };

        iframe.addEventListener('load', onLoad);
        iframe.addEventListener('error', onError);

        // Set the URL directly - this is REAL browsing
        iframe.src = url;
        iframe.style.display = 'block';

        // Fallback timeout: if page seems stuck after 12s, stop loading indicator
        ieLoadTimer = setTimeout(() => {
            ieSetLoading(false);
        }, 12000);
    }
}

function ieShowError(url, errMsg) {
    const errorMsgEl = document.getElementById('ie-error-msg');
    if (errorMsgEl) {
        errorMsgEl.innerText = 'No se pudo conectar a "' + url + '".\n' + 
            'Error: ' + (errMsg || 'Desconocido') + '\n\n' +
            'Posibles causas:\n• El sitio web no existe o no está disponible\n• La conexión fue rechazada\n• Restricciones de seguridad del navegador';
    }
    ieShowPage('error');
}

function ieGoBack() {
    if (ieHistoryIndex > 0) {
        ieHistoryIndex--;
        const url = ieHistory[ieHistoryIndex];
        ieCurrentUrl = url;
        const input = document.getElementById('ie-address-input');
        if (input) input.value = url;
        ieUpdateNavButtons();
        ieLoadUrl(url, false);
    }
}

function ieGoForward() {
    if (ieHistoryIndex < ieHistory.length - 1) {
        ieHistoryIndex++;
        const url = ieHistory[ieHistoryIndex];
        ieCurrentUrl = url;
        const input = document.getElementById('ie-address-input');
        if (input) input.value = url;
        ieUpdateNavButtons();
        ieLoadUrl(url, false);
    }
}

function ieGoHome() {
    ieCurrentUrl = '';
    ieUsingProxy = false;
    const input = document.getElementById('ie-address-input');
    if (input) input.value = '';
    const titleText = document.getElementById('ie-title-text');
    if (titleText) titleText.innerText = 'Internet Explorer';
    const statusUrl = document.getElementById('ie-status-url');
    if (statusUrl) statusUrl.innerText = '';
    ieStopLoading();
    const iframe = document.getElementById('ie-iframe');
    if (iframe) { iframe.src = 'about:blank'; iframe.removeAttribute('srcdoc'); }
    ieShowPage('home');
}

function ieRefresh() {
    if (ieCurrentUrl) {
        ieLoadUrl(ieCurrentUrl, ieUsingProxy);
    }
}

function ieStopLoading() {
    if (ieLoadTimer) { clearTimeout(ieLoadTimer); ieLoadTimer = null; }
    if (ieAbortController) { ieAbortController.abort(); ieAbortController = null; }
    ieSetLoading(false);
    // Also stop the iframe from loading
    const iframe = document.getElementById('ie-iframe');
    if (iframe && iframe.contentWindow) {
        try { iframe.contentWindow.stop(); } catch(e) {}
    }
}

function ieSearchFromHome() {
    const searchInput = document.getElementById('ie-search-input');
    if (!searchInput || !searchInput.value.trim()) return;
    const query = searchInput.value.trim();
    const searchUrl = 'https://www.google.com/search?igu=1&q=' + encodeURIComponent(query);
    const addrInput = document.getElementById('ie-address-input');
    if (addrInput) addrInput.value = searchUrl;
    ieNavigateTo(searchUrl);
}

// Try to use proxy for a page that's currently loaded directly
function ieTryProxy() {
    if (ieCurrentUrl && !ieUsingProxy) {
        ieLoadUrl(ieCurrentUrl, true);
    }
}
