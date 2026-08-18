function getBooleanSetting(settingName){try{var name = "pinballspacecadet" + settingName;var nameEQ = name + "=";var ca = document.cookie.split(";");for(var i=0;i < ca.length;i++){var c = ca[i];while (c.charAt(0)==" "){c = c.substring(1,c.length);}if (c.indexOf(nameEQ) == 0){if (c.substring(nameEQ.length,c.length)=="true"){return true;}else{return false;}}}}catch(err){}return true;}
			function setBooleanSetting(settingName,settingValue){try{var name = "pinballspacecadet" + settingName;var value = String(settingValue);var days = 999;var expires = "";if (days){var date = new Date();date.setTime(date.getTime() + (days*24*60*60*1000));expires = "; expires=" + date.toUTCString() + "; SameSite=Lax";}document.cookie = name + "=" + (value || "")  + expires + "; Secure; path=/";}catch(err){}}

			var Module={preRun:[function() {
				Module.addRunDependency('load_mp3');
				fetch('pinball-music.mp3')
					.then(response => response.arrayBuffer())
					.then(buffer => {
						try { FS.mkdir('/game_resources'); } catch(e) {}
						try { FS.unlink('/game_resources/PINBALL2.MID'); } catch(e) {}
						FS.writeFile('/game_resources/PINBALL2.MID', new Uint8Array(buffer));
						Module.removeRunDependency('load_mp3');
					})
					.catch(err => {
						console.error("Failed to load MP3", err);
						Module.removeRunDependency('load_mp3');
					});
			}],postRun:[function() { document.getElementsByClassName("pleasewait")[0].style.display = "none"; }],print:function(){}(),printErr:function(e){},canvas:function(){var e=document.getElementById("canvas");return e.addEventListener("webglcontextlost",(function(e){}),!1),e}(),setStatus:function(e){},totalDependencies:0,monitorRunDependencies:function(e){}};

			var GAME_SOUND_ENABLED = getBooleanSetting("GAME_SOUND_ENABLED");

			document.addEventListener("keydown", function(event)
				{
				if (event.key === "c")
					{
					const keySlash = new KeyboardEvent("keydown", { key: "/", code: "Slash", which: 191, keyCode: 191, shiftKey: false, ctrlKey: false, altKey: false, metaKey: false, bubbles: true, cancelable: true});
					document.getElementById("canvas").dispatchEvent(keySlash);
					}
				else if (event.key === "r")
					{
					const keyF2 = new KeyboardEvent("keydown", { key: "F2", code: "F2", which: 113, keyCode: 113, shiftKey: false, ctrlKey: false, altKey: false, metaKey: false, bubbles: true, cancelable: true});
					document.getElementById("canvas").dispatchEvent(keyF2);
					}
				});

			document.addEventListener("keyup", function(event)
				{
				if (event.key === "c")
					{
					const keySlash = new KeyboardEvent("keyup", { key: "/", code: "Slash", which: 191, keyCode: 191, shiftKey: false, ctrlKey: false, altKey: false, metaKey: false, bubbles: true, cancelable: true});
					document.getElementById("canvas").dispatchEvent(keySlash);
					}
				else if (event.key === "r")
					{
					const keyF2 = new KeyboardEvent("keyup", { key: "F2", code: "F2", which: 113, keyCode: 113, shiftKey: false, ctrlKey: false, altKey: false, metaKey: false, bubbles: true, cancelable: true});
					document.getElementById("canvas").dispatchEvent(keyF2);
					}
				else if (event.key === "t")
					{
					if (!Module.SDL2) {
						return;
					}

					GAME_SOUND_ENABLED = !GAME_SOUND_ENABLED;
					setBooleanSetting("GAME_SOUND_ENABLED", GAME_SOUND_ENABLED);

					try
						{
						const bgAudio = document.getElementById("bg-music");
						if (!GAME_SOUND_ENABLED)
							{
							Module.SDL2.audioContext.suspend();
							if (bgAudio) bgAudio.pause();
							}
						else
							{
							Module.SDL2.audioContext.resume();
							if (bgAudio) bgAudio.play();
							}
						} catch( err)
						{
						}
					}
				});

			document.getElementById("canvas").addEventListener("contextmenu", function(event)
				{
				event.preventDefault();
				});

			window.addEventListener("load", function()
				{
				document.getElementsByClassName("gui_start")[0].addEventListener("click", function(event)
					{
					document.getElementsByClassName("gui_container")[0].style.display = "none";
					document.getElementsByClassName("pleasewait")[0].style.display = "block";
					document.getElementById("fullscreen-btn").style.display = "block";

					const bgAudio = document.getElementById("bg-music");
					if (bgAudio) {
						bgAudio.play().catch(e => console.log("Audio autoplay prevented", e));
					}

					const scriptGame = document.createElement("script");
					scriptGame.src = "3DPinballSpaceCadet.js";
					document.getElementsByTagName("body")[0].appendChild(scriptGame);
					});

				const canvas = document.getElementById("canvas");
				let optionsMenuOpen = false;

				canvas.addEventListener("mousedown", function(event) {
					const rect = canvas.getBoundingClientRect();
					const cw = canvas.width || 600;
					const ch = canvas.height || 440;
					const ar = cw / ch;

					let dw = rect.width;
					let dh = rect.height;
					let offsetX = 0;
					let offsetY = 0;

					if (rect.width / rect.height > ar) {
						dw = rect.height * ar;
						offsetX = (rect.width - dw) / 2;
					} else {
						dh = rect.width / ar;
						offsetY = (rect.height - dh) / 2;
					}

					const gx = (event.clientX - rect.left - offsetX) / dw;
					const gy = (event.clientY - rect.top - offsetY) / dh;

					const bgAudio = document.getElementById("bg-music");
					if (!bgAudio) return;

					// If clicking in the "Audio" dropdown item area (top left under Opción)
					if (gy >= 0.06 && gy <= 0.26 && gx >= 0.04 && gx <= 0.35) {
						if (bgAudio.paused) {
							bgAudio.play();
						} else {
							bgAudio.pause();
						}
					}
				}, true);

				const fsBtn = document.getElementById("fullscreen-btn");
				if (fsBtn) {
					fsBtn.addEventListener("click", function() {
						if (!document.fullscreenElement) {
							document.documentElement.requestFullscreen().catch((err) => {
								console.error(`Error attempting to enable full-screen mode: ${err.message}`);
							});
							fsBtn.innerText = "Exit Fullscreen";
						} else {
							if (document.exitFullscreen) {
								document.exitFullscreen();
							}
							fsBtn.innerText = "Fullscreen";
						}
					});
				}
				});

			window.addEventListener("resize", function()
				{
				// Handled by CSS
				});
