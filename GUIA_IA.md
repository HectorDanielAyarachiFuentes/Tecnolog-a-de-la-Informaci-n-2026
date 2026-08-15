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
├── index.html                               # Punto de entrada principal (HTML de la interfaz Windows XP)
├── css/
│   └── style.css                            # Sistema de diseño completo estilo Windows XP Luna Blue
├── js/
│   ├── script.js                            # Lógica principal del escritorio, ventanas, reloj y pestañas
│   └── draggabilly.pkgd.min.js              # Librería para arrastre suave de iconos del escritorio
├── gadgets/
│   ├── winamp.js                            # Módulo del reproductor Winamp y ventana de video
│   ├── internet-explorer.js                 # Módulo del simulador de Internet Explorer 6
│   ├── pinball.js                           # Módulo controlador e integración del juego 3D Pinball
│   └── pinball/                             # Juego 3D Pinball Space Cadet (Motor C++ en WebAssembly)
│       ├── index.html                       # HTML contenedor del lienzo canvas
│       ├── SpaceCadetPinball.js             # Código de enlace Emscripten WASM
│       ├── SpaceCadetPinball.wasm           # Binario compilado del motor de juego
│       └── SpaceCadetPinball.data           # Assets gráficos y de sonido del Pinball
├── Actividades/                             # Entregables y trabajos académicos de la materia
│   └── Actividad-1/
│       ├── reporte-laboratorio-prompts.pdf  # Reporte en PDF mostrado en el visor principal
│       └── bases-laboratorio-prompts/       # Documentos de apoyo y bases de datos del laboratorio
├── assets/
│   ├── xp_bliss.png                         # Fondo de pantalla icónico de Windows XP (Bliss)
│   └── iconos/                              # Iconos vectoriales (SVG) y bitmap (PNG) estilo retro XP
├── Musica/
│   └── Mirtha Pérez - La Nave Del Olvido.mp4# Archivo de audio/video reproducido en Winamp
├── scripts-pdf/                             # Scripts de automatización en Python
│   ├── edit_pdf.py                          # Edición y reescritura de metadatos/portada en PDF (PyMuPDF)
│   ├── inspect_pdf.py                       # Inspección de bloques de texto y coordenadas del PDF
│   └── verify.py                            # Verificación rápida de la estructura del PDF
├── AGENTS.md                                # Reglas y directivas de comportamiento para Agentes de IA
└── GUIA_IA.md                               # Este documento de contexto para la IA
```

---

## 📄 3. DETALLE DE ARCHIVOS Y COMPONENTES

### 🏠 3.1. Raíz (`/`)
* **`index.html`:** 
  * Estructura DOM de la interfaz Windows XP.
  * Contiene los accesos directos del escritorio (`#desktop-icons`), la ventana principal con pestañas de actividades (`#main-window`), las ventanas independientes de gadgets (`#ie-window`, `#winamp-video-window`, `#pinball-window`), el cuadro de diálogo "Sobre mí" (`#about-dialog`) y la barra de tareas inferior (`.taskbar`).
* **`AGENTS.md`:**
  * Define las reglas principales de conducta para agentes de IA en el repositorio, incluyendo la lectura de esta guía y su actualización obligatoria.

---

### 🎨 3.2. Carpeta `css/`
* **`css/style.css`:**
  * **Design System XP:** Define los gradientes azules clásicos, bordes biselados, botones Luna Blue, pestañas de propiedades estilo `sys-tab` y tipografía Tahoma / Outfit.
  * **Gestión de Ventanas:** Clases para estados activo, minimizado, maximizado, barra de título (`.window-titlebar`), botones de control (cerrar/minimizar/maximizar) y barras de estado.
  * **Estilos de Gadgets:** Estilos personalizados para la interfaz de IE6 (barra de dirección, throbber animado, barra de progreso), reproductor mini Winamp de la barra de tareas y ventana del Pinball.

---

### 📜 3.3. Carpeta `js/`
* **`js/script.js`:**
  * **Reloj del Sistema:** Función `updateClock()` en formato 12h AM/PM.
  * **Arrastre y Z-Index:** Función `makeDraggable()` para mover ventanas desde la barra de título y `bringToFront()` para enfocar la ventana activa sobre las demás.
  * **Gestión de Ventanas:** `openWindow()`, `closeWindow()`, `minimizeWindow()`, `toggleMaximizeWindow()`.
  * **Iconos del Escritorio:** Inicializa *Draggabilly* en cada icono e intercepta clics (`staticClick`) para abrir aplicaciones/gadgets.
  * **Pestañas:** `switchTab(tabId)` para cambiar entre Actividad 1, Actividad 2, etc.
  * **Sonido de Inicio:** Reproduce el audio clásico de inicio de Windows XP en la primera interacción del usuario.
* **`js/draggabilly.pkgd.min.js`:**
  * Librería externa para posibilitar el arrastre físico de los iconos del escritorio manteniendo contenedor restringido (`containment: '.desktop'`).

---

### 🕹️ 3.4. Carpeta `gadgets/`
Módulos de aplicaciones accesorias extraídas para mantener la modularidad del código:

* **`gadgets/winamp.js`:**
  * Instancia la librería `Webamp` con skins retro (Internet Archive, Mac OS X Aqua, SpyAMP) y lista de reproducción (canción en video y demo MP3).
  * Sincroniza la barra DeskBand mini reproductor ubicada en la barra de tareas de Windows XP (Play, Pause, Stop, Siguiente, Anterior, Estado).
  * Controla la ventana contenedora de video (`winamp-video-window`) sincronizando la reproducción.
* **`gadgets/internet-explorer.js`:**
  * Simula un navegador IE6 con historial (`ieHistory`, `ieHistoryIndex`), botones Atrás/Adelante/Actualizar/Inicio.
  * Transforma de forma inteligente URLs de plataformas de video (YouTube, RuTube, Vimeo) y buscadores (Google con `igu=1`, Wikipedia Móvil, DuckDuckGo Lite) a formatos incrustables (`embed`), permitiendo **reproducir videos reales e interactuar dentro del iframe** sin bloqueos de `X-Frame-Options`.
  * Ofrece marcadores rápidos funcionales (Google, YouTube Video, RuTube Rusia, Vimeo HD, Wikipedia, DuckDuckGo, Internet Archive, W3Schools).
* **`gadgets/pinball.js`:**
  * Controla la apertura/cierre de la ventana del juego 3D Pinball.
  * Carga y reinicia el `iframe` apuntando a `gadgets/pinball/index.html`.
  * Fuerza el foco del teclado en el `iframe` para responder inmediatamente a las teclas de control del Pinball (espacio, flechas, Z, X).
* **`gadgets/pinball/`:**
  * Port original de *3D Pinball - Space Cadet* recompilado a WebAssembly (C++ a WASM via Emscripten).
  * `index.html`: Canvas de renderizado.
  * `SpaceCadetPinball.wasm` & `SpaceCadetPinball.data`: Motor binario y recursos del juego.

---

### 📚 3.5. Carpeta `Actividades/`
* **`Actividades/Actividad-1/reporte-laboratorio-prompts.pdf`:** 
  * Documento PDF principal del curso que se incrusta en el visor PDF interactivo de la ventana principal (`#pdf-iframe`).
* **`Actividades/Actividad-1/bases-laboratorio-prompts/`:** 
  * Archivos fuente de texto (`.txt`, `.csv.txt`, `.pdf`) utilizados en el desarrollo del laboratorio de ingeniería de prompts (tramites municipales, políticas RRHH, agendas de formación).

---

### 🐍 3.6. Carpeta `scripts-pdf/`
Herramientas Python en segundo plano para mantenimiento de documentos PDF:
* **`scripts-pdf/edit_pdf.py`:** Limpia un área rectangular (`redact_annot`) del PDF y reescribe texto de metadatos (Estudiante, Fecha, Materia) usando fuentes de bajo nivel en PyMuPDF.
* **`scripts-pdf/inspect_pdf.py`:** Extrae las coordenadas exactas (`bbox`) y propiedades de las líneas de texto del PDF para depuración de layout.
* **`scripts-pdf/verify.py`:** Script ligero para verificar la legibilidad y extracción del PDF.

---

### 🖼️ 3.7. Carpeta `assets/` y `Musica/`
* **`assets/xp_bliss.png`:** Imagen de fondo del escritorio.
* **`assets/iconos/`:** Recopilación de iconos PNG/SVG retro de Windows XP (`computer_explorer`, `directory_closed`, `winamp.svg`, `pinball.svg`, `world-0.png`, etc.).
* **`Musica/`:** Medios audiovisuales reproducidos por el gadget Winamp.

---

## ⚡ 4. GUÍA DE MODIFICACIÓN RÁPIDA (PARA LA IA)

Cuando se solicite hacer cambios en el proyecto, consulta este cuadro antes de editar:

| Tipo de Tarea | Archivos a Modificar / Revisar |
| :--- | :--- |
| **Agregar nuevo gadget o app al escritorio** | 1. Crear `gadgets/nombre-gadget.js`<br>2. Agregar HTML de la ventana e icono en `index.html`<br>3. Registrar evento de click en `js/script.js`<br>4. Ajustar estilos en `css/style.css` |
| **Modificar comportamiento del Visor PDF** | 1. Modificar HTML de la toolbar en `index.html`<br>2. Editar funciones `selectActivity()` y `refreshPDF()` en `js/script.js` |
| **Ajustar diseño o interfaz Windows XP** | Editar variables y clases CSS en `css/style.css` |
| **Modificar portada o texto del PDF** | Ejecutar script `scripts-pdf/edit_pdf.py` mediante Python |
| **Cambiar reproductor Winamp / Canciones** | Editar objeto de configuración `webampInstance` en `gadgets/winamp.js` |

---
*Fin de la Guía de Arquitectura para IA.*
