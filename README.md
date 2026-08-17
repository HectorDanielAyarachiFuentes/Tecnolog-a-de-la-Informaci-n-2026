# 🖥️ Windows XP Web Portfolio

> Un portafolio interactivo y simulador de escritorio basado en el diseño clásico de Windows XP Luna Blue, construido con Vanilla JS, CSS3 y HTML5.

Este proyecto fue desarrollado para la materia de **Tecnologías de la Información para la Gestión 2026** por **Hector Daniel Ayarachi Fuentes**.

## ✨ Características

- 🖼️ **Diseño Pixel-Perfect**: Emulación fiel de la interfaz gráfica "Luna Blue" de Windows XP.
- 🪟 **Gestor de Ventanas Completo**: Ventanas arrastrables, minimizables y maximizables con manejo inteligente de Z-Index.
- 🎵 **Winamp Integrado**: Reproductor multimedia funcional (`Webamp`) con barra DeskBand incrustada en la barra de tareas.
- 🌐 **Internet Explorer 6**: Navegador funcional que transforma URLs en iframes seguros para reproducir videos de YouTube, Vimeo y más sin salir del escritorio.
- 🕹️ **3D Pinball Space Cadet**: El clásico juego compilado a WebAssembly (WASM) y totalmente jugable en el navegador.
- 📄 **Visor de PDF Integrado**: Lector de reportes académicos embebido.

## 📂 Arquitectura

El repositorio está estructurado siguiendo estándares modernos de desarrollo web, incluso sin usar bundlers:

- `public/`: Contiene todos los archivos estáticos, imágenes, fuentes, archivos multimedia y contenido (PDFs).
- `src/`: Contiene el código fuente (`CSS`, `JavaScript` modular y scripts de gadgets como Winamp y Pinball).
- `scripts/`: Herramientas de automatización en Python (PyMuPDF) para el manejo y edición de metadatos de los reportes en PDF.

## 🚀 Uso y Desarrollo

Para ejecutar el proyecto, simplemente sirve la carpeta raíz con cualquier servidor HTTP local.
Por ejemplo, usando Python o Live Server:

```bash
# Python 3
python -m http.server 8000
```

Visita `http://localhost:8000` en tu navegador.

## 🤖 Guía para IAs y Colaboradores

Si eres una Inteligencia Artificial asistiendo en el desarrollo o un colaborador humano, por favor lee las instrucciones detalladas en [`GUIA_IA.md`](GUIA_IA.md) y [`AGENTS.md`](AGENTS.md) antes de realizar modificaciones estructurales.
