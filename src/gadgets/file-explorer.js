/**
 * Windows XP Classic File Explorer - "Mi PC" Style
 * Simulates the classic WXP folder viewer with left tree panel
 * and right content panel showing the actual site structure.
 */

// ─── File System Tree Definition ─────────────────────────────────────────────
const FILE_SYSTEM = {
  id: 'root',
  name: 'Mi PC',
  type: 'computer',
  children: [
    {
      id: 'drive-c',
      name: 'Disco local (C:)',
      type: 'drive',
      children: [
        {
          id: 'folder-ti2026',
          name: 'TI-2026',
          type: 'folder',
          description: 'Raiz del proyecto web - Tecnologias de la Informacion para la Gestion 2026',
          children: [
            {
              id: 'folder-public',
              name: 'public',
              type: 'folder',
              description: 'Archivos publicos del sitio web (recursos accesibles por el navegador)',
              children: [
                {
                  id: 'folder-assets',
                  name: 'assets',
                  type: 'folder',
                  description: 'Recursos estaticos: imagenes, iconos y wallpapers',
                  children: [
                    {
                      id: 'folder-iconos',
                      name: 'iconos',
                      type: 'folder',
                      description: 'Coleccion de iconos estilo Windows XP/98 en PNG y SVG',
                      children: [
                        { id: 'f-arrow-left', name: 'ArrowLeft.svg', type: 'svg', description: 'Flecha izquierda usada en la barra de herramientas del visor' },
                        { id: 'f-arrow-right', name: 'ArrowRight.svg', type: 'svg', description: 'Flecha derecha usada en la barra de herramientas del visor' },
                        { id: 'f-sync', name: 'Sync.svg', type: 'svg', description: 'Icono de actualizar/recargar' },
                        { id: 'f-collapse', name: 'collapse.svg', type: 'svg', description: 'Icono para colapsar el arbol de carpetas' },
                        { id: 'f-expand', name: 'expand.svg', type: 'svg', description: 'Icono para expandir el panel de vista' },
                        { id: 'f-comp4', name: 'computer_explorer-4.png', type: 'png', preview: 'public/assets/iconos/computer_explorer-4.png', description: 'Icono Mi PC pequeno - usado en la barra de titulo' },
                        { id: 'f-comp5', name: 'computer_explorer-5.png', type: 'png', preview: 'public/assets/iconos/computer_explorer-5.png', description: 'Icono Mi PC grande - usado en el escritorio' },
                        { id: 'f-ctrl4', name: 'control_panel-4.png', type: 'png', preview: 'public/assets/iconos/control_panel-4.png', description: 'Icono Panel de Control - menu inicio' },
                        { id: 'f-dir-c4', name: 'directory_closed-4.png', type: 'png', preview: 'public/assets/iconos/directory_closed-4.png', description: 'Icono carpeta cerrada - usado en listas de archivos' },
                        { id: 'f-dir-o4', name: 'directory_open-4.png', type: 'png', preview: 'public/assets/iconos/directory_open-4.png', description: 'Icono carpeta abierta - estado seleccionado' },
                        { id: 'f-help-big', name: 'help_book_big-0.png', type: 'png', preview: 'public/assets/iconos/help_book_big-0.png', description: 'Libro de ayuda grande - icono escritorio "Sobre mi"' },
                        { id: 'f-help-sm', name: 'help_book_small-0.png', type: 'png', preview: 'public/assets/iconos/help_book_small-0.png', description: 'Libro de ayuda pequeno - barra de titulo del dialogo' },
                        { id: 'f-help-q', name: 'help_question_mark-0.png', type: 'png', preview: 'public/assets/iconos/help_question_mark-0.png', description: 'Signo de pregunta - icono del dialogo "Sobre mi"' },
                        { id: 'f-speaker', name: 'loudspeaker_rays-1.png', type: 'png', preview: 'public/assets/iconos/loudspeaker_rays-1.png', description: 'Altavoz con rayos - bandeja del sistema (volumen)' },
                        { id: 'f-msgerr', name: 'msg_error-0.png', type: 'png', preview: 'public/assets/iconos/msg_error-0.png', description: 'Icono de mensaje de error del sistema' },
                        { id: 'f-network', name: 'network_normal_two_pcs-2.png', type: 'png', preview: 'public/assets/iconos/network_normal_two_pcs-2.png', description: 'Dos PCs en red - bandeja del sistema (red local)' },
                        { id: 'f-notepad', name: 'notepad-0.png', type: 'png', preview: 'public/assets/iconos/notepad-0.png', description: 'Bloc de notas - icono escritorio "Reporte Prompts"' },
                        { id: 'f-pinball-ico', name: 'pinball.svg', type: 'svg', description: 'Icono del gadget 3D Pinball Space Cadet' },
                        { id: 'f-users', name: 'users-1.png', type: 'png', preview: 'public/assets/iconos/users-1.png', description: 'Icono de usuarios - avatar en el menu inicio' },
                        { id: 'f-videoplayer', name: 'video_player.svg', type: 'svg', description: 'Icono del reproductor de video' },
                        { id: 'f-winamp-ico', name: 'winamp.svg', type: 'svg', description: 'Logo Winamp - icono en escritorio y menu inicio' },
                        { id: 'f-winxp', name: 'winxp.svg', type: 'svg', description: 'Logo Windows XP - decorativo' },
                        { id: 'f-world', name: 'world-0.png', type: 'png', preview: 'public/assets/iconos/world-0.png', description: 'Icono mundo/globo - Internet Explorer y barra de zona' }
                      ]
                    },
                    { id: 'f-bliss', name: 'xp_bliss.png', type: 'png', size: '716 KB', description: 'Wallpaper "Bliss" de Windows XP (colinas verdes) usado como fondo de escritorio' }
                  ]
                },
                {
                  id: 'folder-content',
                  name: 'content',
                  type: 'folder',
                  description: 'Contenido academico organizado por actividades del semestre',
                  children: [
                    {
                      id: 'folder-act1',
                      name: 'Actividad-1',
                      type: 'folder',
                      description: 'Primera actividad: Laboratorio de Ingenieria de Prompts',
                      children: [
                        {
                          id: 'folder-bases',
                          name: 'bases-laboratorio-prompts',
                          type: 'folder',
                          description: 'Archivos base proporcionados para el laboratorio de prompts',
                          children: [
                            { id: 'f-agenda', name: 'agenda-formaciones.csv.txt', type: 'txt', size: '972 B', description: 'Agenda de formaciones en formato CSV plano - usado como contexto para prompts', action: 'open-pdf', path: 'public/content/Actividad-1/bases-laboratorio-prompts/agenda-formaciones.csv.txt' },
                            { id: 'f-tramites', name: 'base-guia-tramites-municipales.txt', type: 'txt', size: '2.7 KB', description: 'Guia de tramites municipales - base de conocimiento para prompts de gestion', action: 'open-pdf', path: 'public/content/Actividad-1/bases-laboratorio-prompts/base-guia-tramites-municipales.txt' },
                            { id: 'f-capacit', name: 'base-politica-capacitacion-rrhh.txt', type: 'txt', size: '2.5 KB', description: 'Politica de capacitacion RRHH - documento base para ejercicios de prompts', action: 'open-pdf', path: 'public/content/Actividad-1/bases-laboratorio-prompts/base-politica-capacitacion-rrhh.txt' },
                            { id: 'f-consigna', name: 'consigna-laboratorio-prompts-intervenibles.docx.pdf', type: 'pdf', size: '227 KB', description: 'Consigna oficial del laboratorio de prompts (PDF). Contiene las instrucciones y criterios de evaluacion.', action: 'open-pdf', path: 'public/content/Actividad-1/bases-laboratorio-prompts/consigna-laboratorio-prompts-intervenibles.docx.pdf' },
                            { id: 'f-inscript', name: 'inscripciones-desestructuradas.txt', type: 'txt', size: '1.7 KB', description: 'Datos de inscripciones en formato no estructurado - para practica de extraccion con prompts', action: 'open-pdf', path: 'public/content/Actividad-1/bases-laboratorio-prompts/inscripciones-desestructuradas.txt' }
                          ]
                        },
                        { id: 'f-reporte', name: 'reporte-laboratorio-prompts.pdf', type: 'pdf', size: '44 KB', description: 'Reporte final del laboratorio de Ingenieria de Prompts. Entregable principal de la Actividad 1.', action: 'open-pdf', path: 'public/content/Actividad-1/reporte-laboratorio-prompts.pdf' }
                      ]
                    }
                  ]
                },
                {
                  id: 'folder-media',
                  name: 'media',
                  type: 'folder',
                  description: 'Archivos multimedia: videos musicales para el reproductor Winamp',
                  children: [
                    { id: 'f-video', name: 'Mirtha Perez - La Nave Del Olvido.mp4', type: 'mp4', size: '5.4 MB', description: 'Video musical de Mirtha Perez "La Nave Del Olvido". Se reproduce en el gadget Winamp y en la ventana de video flotante.' }
                  ]
                }
              ]
            },
            {
              id: 'folder-src',
              name: 'src',
              type: 'folder',
              description: 'Codigo fuente del sitio web (HTML, CSS, JavaScript)',
              children: [
                {
                  id: 'folder-css',
                  name: 'css',
                  type: 'folder',
                  description: 'Hojas de estilo CSS del sitio',
                  children: [
                    { id: 'f-style', name: 'style.css', type: 'css', size: '~50 KB', description: 'Hoja de estilos principal. Contiene variables CSS, el sistema de ventanas XP, titlebars con gradiente azul, barra de tareas, menu inicio, gadgets, dialogo "Sobre mi", tabs, visor de PDF y todas las animaciones.' }
                  ]
                },
                {
                  id: 'folder-js',
                  name: 'js',
                  type: 'folder',
                  description: 'Scripts JavaScript del sitio',
                  children: [
                    { id: 'f-script', name: 'script.js', type: 'js', size: '~24 KB', description: 'Script principal del escritorio XP. Maneja: reloj del sistema, drag & drop de ventanas y iconos (Draggabilly), menu inicio, apagado simulado, integracion con todos los gadgets y cambio de tabs.' },
                    { id: 'f-draggabilly', name: 'draggabilly.pkgd.min.js', type: 'js', size: '~12 KB', description: 'Libreria Draggabilly (empaquetada, minificada). Permite arrastrar los iconos del escritorio dentro de los limites del desktop.' }
                  ]
                },
                {
                  id: 'folder-gadgets',
                  name: 'gadgets',
                  type: 'folder',
                  description: 'Gadgets/aplicaciones del escritorio Windows XP simulado',
                  children: [
                    { id: 'f-winamp-js', name: 'winamp.js', type: 'js', size: '~15 KB', description: 'Gadget Winamp clasico. Implementa la ventana de reproductor con skin oscuro, controles Play/Stop/Pausa, seek bar con tiempo en formato LCD, control de volumen, minimizar a taskbar deskband con miniatura de video en vivo.' },
                    { id: 'f-ie-js', name: 'internet-explorer.js', type: 'js', size: '~12 KB', description: 'Gadget Internet Explorer. Simula el navegador clasico de Windows XP con barra de progreso de carga, barra de direccion editable, botones de navegacion y soporte de iframes.' },
                    { id: 'f-fe-js', name: 'file-explorer.js', type: 'js', size: '~14 KB', description: 'ESTE ARCHIVO: Gadget Explorador de Archivos estilo Windows XP. Panel izquierdo con arbol de carpetas navegable, panel derecho con vistas Iconos/Lista/Detalles, barra de direccion con breadcrumbs, historial de navegacion Atras/Adelante/Arriba y apertura de archivos PDF.' },
                    {
                      id: 'folder-pinball',
                      name: 'pinball',
                      type: 'folder',
                      description: 'Juego 3D Pinball Space Cadet portado a WebAssembly',
                      children: [
                        { id: 'f-pinball-music', name: 'pinball-music.mp3', type: 'mp3', description: 'Banda sonora original del 3D Pinball Space Cadet de Windows XP' },
                        { id: 'f-pinball-wasm', name: '(archivos WASM/JS)', type: 'wasm', description: 'Archivos WebAssembly del juego compilado desde C++ original. Incluye motor de fisica, sprites y logica del juego.' }
                      ]
                    }
                  ]
                }
              ]
            },
            { id: 'f-indexhtml', name: 'index.html', type: 'html', size: '~39 KB', description: 'Pagina HTML unica del sitio (Single Page Application). Contiene el escritorio XP completo: iconos arrastrables, ventana principal con tabs, dialog "Sobre mi", barra de tareas, menu inicio, gadgets Winamp/Pinball/IE/Explorador de Archivos y sonidos del sistema.' },
            { id: 'f-readme', name: 'README.md', type: 'md', size: '2.1 KB', description: 'Documentacion del proyecto en formato Markdown. Explica la estructura, como ejecutar el proyecto y la descripcion de los gadgets.' }
          ]
        }
      ]
    },
    {
      id: 'my-documents',
      name: 'Mis Documentos',
      type: 'special-folder',
      description: 'Documentos del estudiante Hector Daniel Ayarachi Fuentes',
      children: [
        { id: 'link-reporte', name: 'reporte-laboratorio-prompts.pdf', type: 'pdf', size: '44 KB', description: 'Acceso directo: Reporte del Laboratorio de Prompts - Actividad 1', action: 'open-pdf', path: 'public/content/Actividad-1/reporte-laboratorio-prompts.pdf' }
      ]
    },
    {
      id: 'my-network',
      name: 'Mis Sitios de Red',
      type: 'special-folder',
      description: 'Ubicaciones de red - GitHub Pages hosting',
      children: [
        { id: 'net-github', name: 'GitHub Pages (sitio en vivo)', type: 'network', description: 'El sitio esta publicado en GitHub Pages. URL disponible en el README.' }
      ]
    }
  ]
};

// ─── State ───────────────────────────────────────────────────────────────────
let feCurrentNodeId = 'root';
let feSelectedNodeId = null;
let feExpandedNodes = new Set(['root', 'drive-c', 'folder-ti2026']);
let feHistory = ['root'];
let feHistoryIndex = 0;
let feView = 'icons';

// ─── Helpers ─────────────────────────────────────────────────────────────────
function feFindNode(id, node = FILE_SYSTEM) {
  if (node.id === id) return node;
  if (node.children) {
    for (const child of node.children) {
      const found = feFindNode(id, child);
      if (found) return found;
    }
  }
  return null;
}

function feGetPath(id, node = FILE_SYSTEM, path = []) {
  if (node.id === id) return [...path, node];
  if (node.children) {
    for (const child of node.children) {
      const result = feGetPath(id, child, [...path, node]);
      if (result) return result;
    }
  }
  return null;
}

function feGetIcon(node) {
  const typeIcons = {
    'computer': '&#128187;', 'drive': '&#128190;',
    'folder': '&#128193;', 'special-folder': '&#128193;',
    'pdf': '&#128196;', 'txt': '&#128221;', 'html': '&#127760;',
    'css': '&#127912;', 'js': '&#9881;', 'png': '&#128444;',
    'svg': '&#128444;', 'mp4': '&#127909;', 'mp3': '&#127925;',
    'md': '&#128203;', 'wasm': '&#9881;', 'network': '&#127760;'
  };
  return typeIcons[node.type] || '&#128196;';
}

function feGetFileColor(type) {
  const colors = {
    'pdf': '#c0392b', 'txt': '#2c3e50', 'html': '#e67e22',
    'css': '#2980b9', 'js': '#d4ac0d', 'png': '#7d3c98',
    'svg': '#1abc9c', 'mp4': '#e91e63', 'mp3': '#ff5722',
    'md': '#607d8b', 'folder': '#e8a000', 'special-folder': '#2980b9',
    'drive': '#7f8c8d', 'computer': '#2980b9', 'network': '#27ae60', 'wasm': '#555'
  };
  return colors[type] || '#7f8c8d';
}

// ─── Navigation ───────────────────────────────────────────────────────────────
function feNavigateTo(id) {
  const node = feFindNode(id);
  if (!node) return;

  if (node.action === 'open-pdf' && node.path) {
    openWindow('main-window');
    switchTab('tab-act1');
    setTimeout(() => {
      const iframe = document.getElementById('pdf-iframe');
      if (iframe) iframe.src = node.path;
    }, 100);
    feSelectedNodeId = id;
    feRenderRightPanel();
    return;
  }

  const isContainer = ['folder', 'special-folder', 'drive', 'computer'].includes(node.type);
  if (!isContainer) {
    feSelectedNodeId = id;
    feRenderRightPanel();
    feUpdateStatusBar();
    return;
  }

  if (feHistoryIndex < feHistory.length - 1) {
    feHistory = feHistory.slice(0, feHistoryIndex + 1);
  }
  feHistory.push(id);
  feHistoryIndex = feHistory.length - 1;
  feCurrentNodeId = id;
  feSelectedNodeId = null;
  feExpandedNodes.add(id);
  feRender();
}

function feGoBack() {
  if (feHistoryIndex > 0) {
    feHistoryIndex--;
    feCurrentNodeId = feHistory[feHistoryIndex];
    feSelectedNodeId = null;
    feRender();
  }
}

function feGoForward() {
  if (feHistoryIndex < feHistory.length - 1) {
    feHistoryIndex++;
    feCurrentNodeId = feHistory[feHistoryIndex];
    feSelectedNodeId = null;
    feRender();
  }
}

function feGoUp() {
  const path = feGetPath(feCurrentNodeId);
  if (path && path.length > 1) {
    feNavigateTo(path[path.length - 2].id);
  }
}

// ─── Tree Panel ───────────────────────────────────────────────────────────────
function feRenderTree(node, depth) {
  depth = depth || 0;
  const isExpanded = feExpandedNodes.has(node.id);
  const isCurrent = node.id === feCurrentNodeId;
  const isContainer = ['folder', 'special-folder', 'drive', 'computer'].includes(node.type);
  const hasContainerChildren = node.children && node.children.some(c =>
    ['folder', 'special-folder', 'drive', 'computer'].includes(c.type)
  );
  const indent = depth * 16;

  let icon = '';
  if (node.type === 'computer') icon = '&#128187;';
  else if (node.type === 'drive') icon = '&#128190;';
  else if (isContainer) icon = isExpanded ? '&#128194;' : '&#128193;';
  else return '';

  let html = '<div class="fe-tree-item' + (isCurrent ? ' fe-tree-current' : '') + '" '
    + 'style="padding-left:' + (indent + 2) + 'px" '
    + 'data-id="' + node.id + '" '
    + 'onclick="feNavigateTo(\'' + node.id + '\')">';

  if (hasContainerChildren) {
    html += '<span class="fe-tree-toggle" onclick="feToggleExpand(\'' + node.id + '\', event)">'
      + (isExpanded ? '&#9660;' : '&#9658;') + '</span>';
  } else {
    html += '<span class="fe-tree-toggle-ph"></span>';
  }

  html += '<span class="fe-tree-icon">' + icon + '</span>';
  html += '<span class="fe-tree-label">' + node.name + '</span>';
  html += '</div>';

  if (isExpanded && node.children) {
    for (const child of node.children) {
      html += feRenderTree(child, depth + 1);
    }
  }
  return html;
}

function feToggleExpand(id, event) {
  event.stopPropagation();
  if (feExpandedNodes.has(id)) {
    feExpandedNodes.delete(id);
  } else {
    feExpandedNodes.add(id);
  }
  feRenderTreePanel();
}

// ─── Right Panel ─────────────────────────────────────────────────────────────
function feRenderRightPanel() {
  const node = feFindNode(feCurrentNodeId);
  if (!node) return;
  const panel = document.getElementById('fe-content-panel');
  const infoPanel = document.getElementById('fe-info-content');
  const selectedNode = feSelectedNodeId ? feFindNode(feSelectedNodeId) : null;

  if (infoPanel) {
    const displayNode = selectedNode || node;
    const isFile = displayNode && !['folder', 'drive', 'computer', 'special-folder'].includes(displayNode.type);
    infoPanel.innerHTML =
      '<div class="fe-info-item">'
      + '<div class="fe-info-icon" style="color:' + feGetFileColor(displayNode.type) + '">' + feGetIcon(displayNode) + '</div>'
      + '<div class="fe-info-name">' + displayNode.name + '</div>'
      + (isFile && displayNode.type ? '<div class="fe-info-type">Archivo ' + displayNode.type.toUpperCase() + '</div>' : '')
      + (displayNode.size ? '<div class="fe-info-size">Tamano: ' + displayNode.size + '</div>' : '')
      + (displayNode.description ? '<div class="fe-info-desc">' + displayNode.description + '</div>' : '')
      + (displayNode.action ? '<button class="fe-info-action-btn" onclick="feNavigateTo(\'' + displayNode.id + '\')">Abrir</button>' : '')
      + '</div>';
  }

  if (!panel) return;
  const items = node.children || [];

  if (feView === 'icons') {
    let html = '<div class="fe-icons-grid">';
    for (const child of items) {
      const color = feGetFileColor(child.type);
      const sel = feSelectedNodeId === child.id ? ' selected' : '';
      html += '<div class="fe-icon-item' + sel + '" data-id="' + child.id + '"'
        + ' onclick="feSelectItem(\'' + child.id + '\')"'
        + ' ondblclick="feNavigateTo(\'' + child.id + '\')">'
        + '<div class="fe-icon-img" style="color:' + color + '">' + feGetIcon(child) + '</div>'
        + '<div class="fe-icon-label">' + child.name + '</div>'
        + '</div>';
    }
    if (!items.length) html += '<div class="fe-empty-folder"><span>&#128194;</span><p>Esta carpeta esta vacia</p></div>';
    html += '</div>';
    panel.innerHTML = html;

  } else if (feView === 'list') {
    let html = '<div class="fe-list-view">';
    for (const child of items) {
      const color = feGetFileColor(child.type);
      const sel = feSelectedNodeId === child.id ? ' selected' : '';
      html += '<div class="fe-list-item' + sel + '" data-id="' + child.id + '"'
        + ' onclick="feSelectItem(\'' + child.id + '\')"'
        + ' ondblclick="feNavigateTo(\'' + child.id + '\')">'
        + '<span class="fe-list-icon" style="color:' + color + '">' + feGetIcon(child) + '</span>'
        + '<span class="fe-list-name">' + child.name + '</span>'
        + '</div>';
    }
    if (!items.length) html += '<div class="fe-empty-folder"><p>Esta carpeta esta vacia</p></div>';
    html += '</div>';
    panel.innerHTML = html;

  } else {
    // Details
    let html = '<table class="fe-details-table"><thead><tr>'
      + '<th>Nombre</th><th>Tipo</th><th>Tamano</th><th>Descripcion</th>'
      + '</tr></thead><tbody>';
    for (const child of items) {
      const color = feGetFileColor(child.type);
      const sel = feSelectedNodeId === child.id ? ' selected' : '';
      const typeLabel = child.type === 'folder' || child.type === 'special-folder' ? 'Carpeta de archivos'
        : child.type === 'drive' ? 'Disco local'
        : 'Archivo ' + child.type.toUpperCase();
      const countStr = child.children ? child.children.length + ' elementos' : '—';
      html += '<tr class="fe-details-row' + sel + '" data-id="' + child.id + '"'
        + ' onclick="feSelectItem(\'' + child.id + '\')"'
        + ' ondblclick="feNavigateTo(\'' + child.id + '\')">'
        + '<td class="fe-details-name"><span style="color:' + color + '">' + feGetIcon(child) + '</span> ' + child.name + '</td>'
        + '<td>' + typeLabel + '</td>'
        + '<td>' + (child.size || countStr) + '</td>'
        + '<td class="fe-details-desc">' + (child.description || '—') + '</td>'
        + '</tr>';
    }
    if (!items.length) html += '<tr><td colspan="4" class="fe-empty-folder">Esta carpeta esta vacia</td></tr>';
    html += '</tbody></table>';
    panel.innerHTML = html;
  }
}

function feSelectItem(id) {
  feSelectedNodeId = id;
  document.querySelectorAll('#fe-content-panel .fe-icon-item, #fe-content-panel .fe-list-item, #fe-content-panel .fe-details-row')
    .forEach(el => el.classList.remove('selected'));
  const el = document.querySelector('#fe-content-panel [data-id="' + id + '"]');
  if (el) el.classList.add('selected');
  const infoPanel = document.getElementById('fe-info-content');
  if (infoPanel) {
    const sn = feFindNode(id);
    if (sn) {
      const isFile = !['folder', 'drive', 'computer', 'special-folder'].includes(sn.type);
      infoPanel.innerHTML =
        '<div class="fe-info-item">'
        + '<div class="fe-info-icon" style="color:' + feGetFileColor(sn.type) + '">' + feGetIcon(sn) + '</div>'
        + '<div class="fe-info-name">' + sn.name + '</div>'
        + (isFile && sn.type ? '<div class="fe-info-type">Archivo ' + sn.type.toUpperCase() + '</div>' : '')
        + (sn.size ? '<div class="fe-info-size">Tamano: ' + sn.size + '</div>' : '')
        + (sn.description ? '<div class="fe-info-desc">' + sn.description + '</div>' : '')
        + (sn.action ? '<button class="fe-info-action-btn" onclick="feNavigateTo(\'' + sn.id + '\')">Abrir</button>' : '')
        + '</div>';
    }
  }
  feUpdateStatusBar();
}

// ─── Address Bar ─────────────────────────────────────────────────────────────
function feRenderAddressBar() {
  const path = feGetPath(feCurrentNodeId);
  const bar = document.getElementById('fe-address-bar');
  if (!bar || !path) return;
  bar.innerHTML = path.map(function(node, i) {
    if (i === path.length - 1) return '<span class="fe-bc-cur">' + node.name + '</span>';
    return '<span class="fe-bc-link" onclick="feNavigateTo(\'' + node.id + '\')">' + node.name + '</span><span class="fe-bc-sep">&#8250;</span>';
  }).join('');
}

function feUpdateNavButtons() {
  const back = document.getElementById('fe-btn-back');
  const fwd = document.getElementById('fe-btn-forward');
  const up = document.getElementById('fe-btn-up');
  if (back) back.disabled = feHistoryIndex <= 0;
  if (fwd) fwd.disabled = feHistoryIndex >= feHistory.length - 1;
  const path = feGetPath(feCurrentNodeId);
  if (up) up.disabled = !path || path.length <= 1;
}

function feUpdateStatusBar() {
  const node = feFindNode(feCurrentNodeId);
  const el = document.getElementById('fe-status-text');
  if (!el || !node) return;
  const count = node.children ? node.children.length : 0;
  el.textContent = feSelectedNodeId ? '1 objeto(s) seleccionado(s)' : count + ' objeto(s)';
}

// ─── Full Render ─────────────────────────────────────────────────────────────
function feRenderTreePanel() {
  const treeEl = document.getElementById('fe-tree-panel');
  if (treeEl) treeEl.innerHTML = feRenderTree(FILE_SYSTEM, 0);
}

function feRender() {
  feRenderTreePanel();
  feRenderRightPanel();
  feRenderAddressBar();
  feUpdateNavButtons();
  feUpdateStatusBar();
}

// ─── View Toggle ─────────────────────────────────────────────────────────────
function feSetView(v) {
  feView = v;
  ['icons', 'list', 'details'].forEach(function(vv) {
    const btn = document.getElementById('fe-view-' + vv);
    if (btn) btn.classList.toggle('active', vv === v);
  });
  feRenderRightPanel();
}

// ─── Window Control ──────────────────────────────────────────────────────────
function openFileExplorer(startId) {
  if (startId) {
    feCurrentNodeId = startId;
    feHistory = [startId];
    feHistoryIndex = 0;
  }
  // Use openWindow which already sets display:flex
  openWindow('fe-window');
  const tb = document.getElementById('taskbar-fe-window');
  if (tb) tb.style.display = '';

  // Force render after browser has painted the visible window
  requestAnimationFrame(function() {
    requestAnimationFrame(function() {
      feRender();
    });
  });
}

function closeFileExplorer() {
  closeWindow('fe-window');
  const tb = document.getElementById('taskbar-fe-window');
  if (tb) tb.style.display = 'none';
}
