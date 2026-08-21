/**
 * Windows Media Player 9 (WMP9) Wrapper
 * Controls the visibility of the WMP9 clone iframe.
 */

// Function called by clicking the desktop icon
function openWMP() {
    openWindow('wmp-window');
    
    // Attempt to focus the iframe so keyboard controls work (if any)
    const iframe = document.getElementById('wmp-iframe');
    if (iframe) {
        setTimeout(() => {
            try {
                iframe.focus();
                if (iframe.contentWindow) iframe.contentWindow.focus();
            } catch(e){}
        }, 100);
    }
}
