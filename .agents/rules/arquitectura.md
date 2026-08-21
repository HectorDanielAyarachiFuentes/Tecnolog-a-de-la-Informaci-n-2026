# 🤖 GUÍA DE ARQUITECTURA Y ESTRUCTURA DEL PROYECTO (PARA IA)

> **📌 PROPÓSITO DE ESTE DOCUMENTO:**  
> Este archivo sirve como mapa de contexto rápido para cualquier Inteligencia Artificial o desarrollador que abra este repositorio. **Lee este documento antes de procesar el código fuente** para entender la arquitectura general, la función de cada carpeta/archivo y ahorrar tokens.

> **⚠️ REGLA DE MANTENIMIENTO OBLIGATORIA PARA CUALQUIER IA:**  
> Si agregas, modificas, renombras o eliminas cualquier carpeta o archivo dentro de este proyecto, **es OBLIGATORIO que actualices este archivo (`GUIA_IA.md`) inmediatamente** para reflejar la nueva estructura y mantener el contexto al día.

---

## 📌 1. RESUMEN EJECUTIVO Y ARQUITECTURA

* **Nombre del Proyecto:** Tecnologías de la Información para la Gestión 2026 - Portafolio Web Windows XP
* **Autor / Estudiante:** Hector Daniel Ayarachi Fuentes
* **Tecnologías:** HTML5, Vanilla CSS3 (Luna Blue Theme), Vanilla JavaScript (ES6+ Modular), WebAssembly (C++ 3D Pinball), Webamp API, PyMuPDF (Python).
* **Concepto Principal:** Simulación interactiva de escritorio **Windows XP** (Web Desktop Portfolio) funcional dentro del navegador, con soporte para ventanas arrastrables, barra de tareas, gadgets (Internet Explorer 6, Winamp, 3D Pinball Space Cadet) y visor de reportes académicos en PDF.

---

## 📂 2. ÁRBOL DE DIRECTORIOS

```text
.
├── public/                                  # Archivos estáticos y multimedia
│   ├── assets/
│   │   ├── xp_bliss.png                     # Fondo de pantalla icónico de Windows XP (Bliss)
│   │   └── iconos/                          # Iconos vectoriales (SVG) y bitmap (PNG) estilo retro XP
│   ├── content/                             # Entregables y trabajos académicos de la materia
│   │   └── Actividad-1/
│   │       ├── reporte-laboratorio-prompts.pdf
│   │       └── bases-laboratorio-prompts/
│   └── media/                               # Archivos multimedia reproducidos en Winamp
│       └── Mirtha Pérez - La Nave Del Olvido.mp4
├── src/                                     # Código fuente del proyecto
│   ├── css/
│   │   ├── modules/                         # Módulos CSS separados por funcionalidad
│   │   │   ├── _variables.css               # Variables y reset global
│   │   │   ├── _desktop.css                 # Entorno y iconos de escritorio
│   │   │   ├── _window.css                  # Estilos de ventanas y pestañas
│   │   │   ├── _taskbar.css                 # Barra de tareas y menú inicio
│   │   │   ├── _content.css                 # Contenido de actividades y panel About
│   │   │   ├── _apps.css                    # Estilos específicos de IE6, Winamp, Pinball
│   │   │   └── _responsive.css              # Ajustes responsivos
│   │   └── style.css                        # Archivo principal que importa todos los módulos
│   ├── js/
│   │   ├── script.js                        # Lógica principal del escritorio, ventanas, reloj y pestañas
│   │   └── draggabilly.pkgd.min.js          # Librería para arrastre suave de iconos del escritorio
│   └── gadgets/                             # Módulos de aplicaciones accesorias extraídas
│       ├── winamp.js                        # Módulo del reproductor Winamp y ventana de video
│       ├── internet-explorer.js             # Módulo del simulador de Internet Explorer 6
│       ├── pinball.js                       # Módulo controlador e integración del juego 3D Pinball
│       └── pinball/                         # Juego 3D Pinball Space Cadet (Motor C++ en WebAssembly)
│           ├── index.html                   # HTML contenedor del lienzo canvas
│           ├── SpaceCadetPinball.js         # Código de enlace Emscripten WASM
│           ├── SpaceCadetPinball.wasm       # Binario compilado del motor de juego
│           └── SpaceCadetPinball.data       # Assets gráficos y de sonido del Pinball
├── scripts/                                 # Scripts de automatización en Python
│   ├── edit_pdf.py                          # Edición y reescritura de metadatos/portada en PDF (PyMuPDF)
│   ├── inspect_pdf.py                       # Inspección de bloques de texto y coordenadas del PDF
│   └── verify.py                            # Verificación rápida de la estructura del PDF
├── index.html                               # Punto de entrada principal (HTML de la interfaz Windows XP)
├── README.md                                # Documentación principal del repositorio
├── AGENTS.md                                # Reglas y directivas de comportamiento para Agentes de IA
└── GUIA_IA.md                               # Este documento de contexto para la IA
```

---

## 📄 3. DETALLE DE ARCHIVOS Y COMPONENTES

### 🏠 3.1. Raíz (`/`)
* **`index.html`:** 
  * Estructura DOM de la interfaz Windows XP.
  * Contiene los accesos directos del escritorio (`#desktop-icons`), la ventana principal con pestañas de actividades (`#main-window`), las ventanas independientes de gadgets (`#ie-window`, `#winamp-video-window`, `#pinball-window`), el cuadro de diálogo "Sobre mí" (`#about-dialog`) y la barra de tareas inferior (`.taskbar`).
* **`README.md`:** Documentación general.
* **`AGENTS.md`:**
  * Define las reglas principales de conducta para agentes de IA en el repositorio, incluyendo la lectura de esta guía y su actualización obligatoria.

---

### 🎨 3.2. Carpeta `src/css/`
* **`src/css/style.css`:** Archivo principal de estilos que une todos los submódulos usando `@import`.
* **`src/css/modules/`:** 
  * **`_variables.css`:** Define las propiedades personalizadas, reset global, gradientes clásicos y tipografía (Tahoma / Outfit).
  * **`_desktop.css`:** Reglas para el entorno del escritorio y posicionamiento de iconos.
  * **`_window.css`:** Clases para estados activo, minimizado, maximizado, barra de título (`.window-titlebar`), pestañas (`sys-tab`), cuadros de diálogo y botones de control.
  * **`_taskbar.css`:** Define la barra de tareas clásica inferior, botón de inicio, menú de inicio y bandeja del sistema (System Tray).
  * **`_content.css`:** Diseño del layout de actividades, el visor PDF intergrado y la sección "Sobre mí".
  * **`_apps.css`:** Estilos para las aplicaciones embebidas (IE6, Winamp, Pinball Space Cadet, explorador de Windows).
  * **`_responsive.css`:** Ajustes y media queries para pantallas de menor tamaño.

---

### 📜 3.3. Carpeta `src/js/`
* **`src/js/script.js`:**
  * **Reloj del Sistema:** Función `updateClock()` en formato 12h AM/PM.
  * **Arrastre y Z-Index:** Función `makeDraggable()` para mover ventanas desde la barra de título y `bringToFront()` para enfocar la ventana activa sobre las demás.
  * **Gestión de Ventanas:** `openWindow()`, `closeWindow()`, `minimizeWindow()`, `toggleMaximizeWindow()`.
  * **Iconos del Escritorio:** Inicializa *Draggabilly* en cada icono e intercepta clics (`staticClick`) para abrir aplicaciones/gadgets.
  * **Pestañas:** `switchTab(tabId)` para cambiar entre Actividad 1, Actividad 2, etc.
  * **Sonido de Inicio:** Reproduce el audio clásico de inicio de Windows XP en la primera interacción del usuario.
* **`src/js/draggabilly.pkgd.min.js`:**
  * Librería externa para posibilitar el arrastre físico de los iconos del escritorio manteniendo contenedor restringido (`containment: '.desktop'`).

---

### 🕹️ 3.4. Carpeta `src/gadgets/`
Módulos de aplicaciones accesorias extraídas para mantener la modularidad del código:

* **`src/gadgets/winamp.js`:**
  * Instancia la librería `Webamp` con skins retro (Internet Archive, Mac OS X Aqua, SpyAMP) y lista de reproducción (canción en video y demo MP3).
  * Sincroniza la barra DeskBand mini reproductor ubicada en la barra de tareas de Windows XP (Play, Pause, Stop, Siguiente, Anterior, Estado).
  * Controla la ventana contenedora de video (`winamp-video-window`) sincronizando la reproducción.
* **`src/gadgets/internet-explorer.js`:**
  * Simula un navegador IE6 con historial (`ieHistory`, `ieHistoryIndex`), botones Atrás/Adelante/Actualizar/Inicio.
  * Transforma de forma inteligente URLs de plataformas de video (YouTube, RuTube, Vimeo) y buscadores (Google con `igu=1`, Wikipedia Móvil, DuckDuckGo Lite) a formatos incrustables (`embed`), permitiendo **reproducir videos reales e interactuar dentro del iframe** sin bloqueos de `X-Frame-Options`.
  * Ofrece marcadores rápidos funcionales (Google, YouTube Video, RuTube Rusia, Vimeo HD, Wikipedia, DuckDuckGo, Internet Archive, W3Schools).
* **`src/gadgets/pinball.js`:**
  * Controla la apertura/cierre de la ventana del juego 3D Pinball.
  * Carga y reinicia el `iframe` apuntando a `src/gadgets/pinball/index.html`.
  * Fuerza el foco del teclado en el `iframe` para responder inmediatamente a las teclas de control del Pinball (espacio, flechas, Z, X).
* **`src/gadgets/pinball/`:**
  * Port original de *3D Pinball - Space Cadet* recompilado a WebAssembly (C++ a WASM via Emscripten).

---

### 📚 3.5. Carpeta `public/`
Recursos estáticos y multimedia:
* **`public/content/Actividad-1/reporte-laboratorio-prompts.pdf`:** Documento PDF principal del curso que se incrusta en el visor PDF interactivo de la ventana principal (`#pdf-iframe`).
* **`public/content/Actividad-1/bases-laboratorio-prompts/`:** Archivos fuente de texto (`.txt`, `.csv.txt`, `.pdf`) utilizados en el desarrollo del laboratorio de ingeniería de prompts.
* **`public/assets/xp_bliss.png`:** Imagen de fondo del escritorio.
* **`public/assets/iconos/`:** Recopilación de iconos PNG/SVG retro de Windows XP (`computer_explorer`, `directory_closed`, `winamp.svg`, `pinball.svg`, `world-0.png`, etc.).
* **`public/media/`:** Medios audiovisuales reproducidos por el gadget Winamp (`Mirtha Pérez - La Nave Del Olvido.mp4`).

---

### 🐍 3.6. Carpeta `scripts/`
Herramientas Python en segundo plano para mantenimiento de documentos PDF:
* **`scripts/edit_pdf.py`:** Limpia un área rectangular (`redact_annot`) del PDF y reescribe texto de metadatos (Estudiante, Fecha, Materia) usando fuentes de bajo nivel en PyMuPDF.
* **`scripts/inspect_pdf.py`:** Extrae las coordenadas exactas (`bbox`) y propiedades de las líneas de texto del PDF para depuración de layout.
* **`scripts/verify.py`:** Script ligero para verificar la legibilidad y extracción del PDF.

---

## ⚡ 4. GUÍA DE MODIFICACIÓN RÁPIDA (PARA LA IA)

Cuando se solicite hacer cambios en el proyecto, consulta este cuadro antes de editar:

| Tipo de Tarea | Archivos a Modificar / Revisar |
| :--- | :--- |
| **Agregar nuevo gadget o app al escritorio** | 1. Crear `src/gadgets/nombre-gadget.js`<br>2. Agregar HTML de la ventana e icono en `index.html`<br>3. Registrar evento de click en `src/js/script.js`<br>4. Ajustar estilos en `src/css/style.css` |
| **Modificar comportamiento del Visor PDF** | 1. Modificar HTML de la toolbar en `index.html`<br>2. Editar funciones `selectActivity()` y `refreshPDF()` en `src/js/script.js` |
| **Ajustar diseño o interfaz Windows XP** | Editar el módulo correspondiente dentro de `src/css/modules/` (ej. `_window.css`, `_taskbar.css`, etc.) |
| **Modificar portada o texto del PDF** | Ejecutar script `scripts/edit_pdf.py` mediante Python |
| **Cambiar reproductor Winamp / Canciones** | Editar objeto de configuración `webampInstance` en `src/gadgets/winamp.js` |

---
*Fin de la Guía de Arquitectura para IA.*
