function getBooleanSetting(settingName){try{var name = "pinballspacecadet" + settingName;var nameEQ = name + "=";var ca = document.cookie.split(";");for(var i=0;i < ca.length;i++){var c = ca[i];while (c.charAt(0)==" "){c = c.substring(1,c.length);}if (c.indexOf(nameEQ) == 0){if (c.substring(nameEQ.length,c.length)=="true"){return true;}else{return false;}}}}catch(err){}return true;}
			function setBooleanSetting(settingName,settingValue){try{var name = "pinballspacecadet" + settingName;var value = String(settingValue);var days = 999;var expires = "";if (days){var date = new Date();date.setTime(date.getTime() + (days*24*60*60*1000));expires = "; expires=" + date.toUTCString() + "; SameSite=Lax";}document.cookie = name + "=" + (value || "")  + expires + "; Secure; path=/";}catch(err){}}

			var Module={preRun:[],postRun:[],print:function(){}(),printErr:function(e){},canvas:function(){var e=document.getElementById("canvas");return e.addEventListener("webglcontextlost",(function(e){}),!1),e}(),setStatus:function(e){},totalDependencies:0,monitorRunDependencies:function(e){}};

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
						if (!GAME_SOUND_ENABLED)
							{
							Module.SDL2.audioContext.suspend();
							}
						else
							{
							Module.SDL2.audioContext.resume();
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
				document.getElementById("canvas").style.height = (window.innerHeight + 20) + "px";

				// CHECKING IF THE GAME IS NOT RUNNING WITHIN AN IFRAME (Removed to allow iframe execution)
				document.getElementsByClassName("gui_start")[0].addEventListener("click", function(event)
					{
					document.getElementsByClassName("gui_container")[0].style.display = "none";
					document.getElementsByClassName("pleasewait")[0].style.display = "block";

					const scriptGame = document.createElement("script");
					scriptGame.src = "3DPinballSpaceCadet.js";
					document.getElementsByTagName("body")[0].appendChild(scriptGame);
					});
				});

			window.addEventListener("resize", function()
				{
				document.getElementById("canvas").style.height = (window.innerHeight + 20) + "px";
				});
