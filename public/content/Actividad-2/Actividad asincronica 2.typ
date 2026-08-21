// ==========================================
// CONFIGURACIÓN DE DOCUMENTO Y ESTILOS
// ==========================================
#set document(
  title: "Nueve desafíos con un cuaderno de fuentes",
  author: "Hector Daniel Ayarachi Fuentes",
)

#set text(font: "Arial", size: 9.8pt, fill: rgb("#1f2933"), lang: "es")
#set par(justify: true, leading: 0.7em)

// Paleta de colores institucional
#let primary = rgb("#153e5c")       // Azul petróleo institucional
#let teal-accent = rgb("#176b67")   // Verde azulado
#let orange-accent = rgb("#c1741f") // Naranja terracota
#let text-main = rgb("#1f2933")     // Texto principal
#let text-muted = rgb("#4b6575")    // Texto secundario
#let border-subtle = rgb("#b7c9d6") // Borde suave
#let bg-card = rgb("#fdf6ee")       // Fondo cálido para destacados

// Componentes de Estilo
#let h1(body) = text(size: 20pt, fill: primary, weight: "bold", block(below: 8pt, body))
#let h2(body) = block(
  above: 20pt,
  below: 10pt,
  stroke: (bottom: 1.2pt + border-subtle),
  inset: (bottom: 4pt),
  text(size: 13pt, fill: primary, weight: "bold", body),
)
#let h3(body) = block(above: 12pt, below: 5pt, text(size: 10.5pt, fill: rgb("#28536b"), weight: "bold", body))

#let callout(body, bg, border-color, left-border-color) = block(
  width: 100%,
  fill: rgb(bg),
  stroke: (
    top: 0.8pt + rgb(border-color),
    right: 0.8pt + rgb(border-color),
    bottom: 0.8pt + rgb(border-color),
    left: 4.5pt + rgb(left-border-color),
  ),
  inset: (x: 11pt, y: 9pt),
  radius: (right: 4pt),
  above: 10pt,
  below: 12pt,
  body,
)

#let summary(body) = callout(body, "fdf6ee", "b7c9d6", "c1741f")
#let consigna-box(body) = callout(body, "f0f6fa", "b7c9d6", "153e5c")

#let nota(body) = block(
  width: 100%,
  fill: rgb("eef6f4"),
  stroke: (left: 4pt + teal-accent),
  inset: (x: 10pt, y: 8pt),
  radius: (right: 4pt),
  above: 9pt,
  below: 11pt,
  text(size: 9.2pt, body),
)

#let paso(n, t) = block(
  width: 100%,
  fill: primary,
  inset: (top: 6pt, bottom: 6pt, left: 10pt, right: 10pt),
  radius: 4pt,
  above: 18pt,
  below: 9pt,
  [
    #text(fill: white.darken(15%), size: 8pt, tracking: 0.12em, weight: "bold", upper(n))\
    #v(-3pt)
    #text(fill: white, size: 11.5pt, weight: "bold", t)
  ],
)

// Formato de celdas de tablas
#show table.cell: set par(justify: false, leading: 0.5em)
#show table.cell: set text(size: 8.8pt)

// ==========================================
// 1. CARÁTULA PRINCIPAL
// ==========================================
#page(
  paper: "a4",
  margin: (x: 2cm, top: 2.5cm, bottom: 2.2cm),
  header: none,
  footer: none,
)[
  #grid(
    columns: (12pt, 1fr),
    gutter: 20pt,
    [
      #rect(
        width: 100%,
        height: 94%,
        fill: teal-accent,
        radius: 2pt,
      )
    ],
    [
      #v(10pt)
      // Logotipo institucional destacado en carátula
      #image("../../Logotipo de curzas/CURZAS.png", width: 130pt)
      
      #v(15pt)
      // Barra superior naranja
      #rect(
        width: 100%,
        height: 4.5pt,
        fill: orange-accent,
        radius: 1pt,
      )
      
      #v(22pt)
      
      // Título Principal
      #text(size: 20pt, weight: "bold", fill: primary)[
        NUEVE DESAFÍOS CON UN \ CUADERNO DE FUENTES
      ]
      
      #v(10pt)
      
      // Subtítulo
      #text(size: 13pt, fill: text-muted, style: "italic")[
        Actividad Asincrónica 2
      ]
      
      #v(30pt)
      
      // Cuadro de Propósito
      #block(
        width: 100%,
        fill: bg-card,
        stroke: (left: 4.5pt + orange-accent, rest: 0.6pt + border-subtle),
        inset: (x: 14pt, y: 12pt),
        radius: (right: 4pt),
        [
          #text(weight: "bold", fill: orange-accent, size: 9pt, tracking: 0.08em)[PROPÓSITO DE LA ACTIVIDAD]\
          #v(4pt)
          #text(size: 9.3pt, fill: text-main)[
            Aprender a manejar un cuaderno de IA sobre documentación de trabajo, y comprobar cada resultado mediante nueve desafíos independientes que utilizan como base documentos de recursos humanos ficticios de la Municipalidad de Puerto Norte.
          ]
        ],
      )
      
      #v(90pt)
      
      // Metadatos inferiores
      #block(
        width: 100%,
        stroke: (top: 0.6pt + border-subtle),
        inset: (top: 18pt),
        [
          #grid(
            columns: (160pt, 1fr),
            row-gutter: 14pt,
            text(size: 9pt, weight: "bold", fill: text-muted)[ESTUDIANTE / EXPERIMENTADOR:],
            text(size: 9.5pt, weight: "semibold", fill: primary)[Hector Daniel Ayarachi Fuentes],
            
            text(size: 9pt, weight: "bold", fill: text-muted)[FECHA DE ENTREGA:],
            text(size: 9.2pt, fill: text-main)[20 de Agosto de 2026],
            
            text(size: 9pt, weight: "bold", fill: text-muted)[MATERIA / CONTEXTO:],
            text(size: 9.2pt, fill: text-main)[Tecnología de la Información para la Gestión],
          )
        ],
      )
    ],
  )
]

// ==========================================
// 2. CUERPO DEL INFORME Y DESARROLLO
// ==========================================
#counter(page).update(1)

#set page(
  paper: "a4",
  margin: (x: 2cm, top: 2.2cm, bottom: 2.2cm),
  header: [
    #grid(
      columns: (1fr, 1fr),
      align: (left, right),
      text(size: 8pt, fill: rgb("7d919f"))[Tecnología de la Información para la Gestión · CURZAS],
      text(size: 8pt, fill: rgb("7d919f"))[Actividad Asincrónica 2 · Cuaderno de Fuentes],
    )
    #v(-4pt)
    #line(length: 100%, stroke: 0.4pt + rgb("b7c9d6"))
  ],
  footer: [
    #line(length: 100%, stroke: 0.4pt + rgb("b7c9d6"))
    #v(-2pt)
    #grid(
      columns: (1fr, auto, 1fr),
      align: (left + horizon, center + horizon, right + horizon),
      text(size: 8pt, fill: rgb("7d919f"))[Informe de Resolución de Desafíos],
      image("../../Logotipo de curzas/CURZAS.png", height: 13pt),
      text(size: 8pt, fill: rgb("7d919f"))[
        #context [Página #counter(page).display("1") de #counter(page).final().at(0)]
      ],
    )
  ],
)

#h1[Nueve Desafíos con un Cuaderno de Fuentes]
#text(size: 11pt, fill: text-muted)[Resolución de los ejercicios de auditoría y análisis documental]

#v(8pt)

#summary[
  *Resumen del Proceso:* Se detallan a continuación los resultados obtenidos tras someter el corpus documental (reglamento, acta, manual, certificado, resolución escaneada y registro de inscripciones) a distintas consultas y procesamientos mediante NotebookLM. El objetivo principal fue verificar la precisión, trazabilidad e integridad de las respuestas dadas por la IA sobre una base de datos específica.
]

#v(6pt)
#h2[Desarrollo Metodológico: Paso a Paso]

// ==========================================
// DESAFÍO 1
// ==========================================
#paso("Desafío 1", "Armar el cuaderno y mirar qué entró")

#consigna-box[
  *Objetivo: Armar el cuaderno y mirar qué entró*
  
  + Creá un cuaderno nuevo y llamalo `Capacitación · Puerto Norte`.
  + Cargá estas cinco fuentes: `reglamento-capacitacion.pdf`, `manual-inscripciones.pdf`, `acta-comite-2026-08-04.pdf`, `registro-capacitaciones.csv` y `certificado-sandoval.png`.
  + No cargues todavía la resolución escaneada: es del desafío 2.
  + Hacé clic sobre `reglamento-capacitacion.pdf` en el panel de fuentes. Se abre lo que el cuaderno extrajo de ese archivo. Leé las primeras líneas.
  + Hacé lo mismo con `certificado-sandoval.png`.
]

*Respuesta y Verificación:*
- *1.* Se inicializó el cuaderno en la plataforma con el nombre solicitado.
- *2.* Se cargaron las cinco fuentes requeridas con éxito. A continuación, se adjunta la captura del panel de carga de fuentes:
  
  #figure(
    block(
      width: 70%,
      stroke: 0.8pt + border-subtle,
      radius: 5pt,
      fill: bg-card,
      inset: 15pt,
      align(left)[
        #text(weight: "bold", size: 10pt)[FUENTES (5)] \
        #v(4pt)
        #line(length: 100%, stroke: 0.5pt + border-subtle)
        #v(6pt)
        #stack(
          dir: ttb,
          spacing: 8pt,
          text(size: 9.5pt)[📄 `reglamento-capacitacion.pdf`],
          text(size: 9.5pt)[📄 `manual-inscripciones.pdf`],
          text(size: 9.5pt)[📄 `acta-comite-2026-08-04.pdf`],
          text(size: 9.5pt)[📊 `registro-capacitaciones.csv`],
          text(size: 9.5pt)[🖼️ `certificado-sandoval.png`]
        )
      ]
    ),
    caption: [Recreación del panel de fuentes cargado en NotebookLM]
  )

- *3.* No se cargó la resolución escaneada, cumpliendo estrictamente con lo solicitado para este primer desafío.

- *4.* Al hacer clic sobre el reglamento, se constató que la extracción de texto fue exitosa y fiel al original. Las primeras líneas que el cuaderno extrajo y mostró fueron: 
  > _"Reglamento del Programa Anual de Capacitación / Municipalidad de Puerto Norte · Dirección de Recursos Humanos / Aprobado por Resolución 088/2026 / Artículo 1. Objeto..."_

- *5.* Al revisar `certificado-sandoval.png` (haciendo clic en la fuente), el sistema extrajo las primeras líneas de texto reconocibles:
  > _"Certificado de Participación. Se certifica que Sandoval, Luis ha completado el curso..."_ \
  Sin embargo, se detectó que el contenido extraído fue incompleto. El sistema omitió la carga horaria porque la imagen provista está truncada en su parte inferior, dejando un vacío documental que la IA no puede resolver ni alucinar si se le formulan los prompts correctos.

// ==========================================
// DESAFÍO 2
// ==========================================
#pagebreak()
#paso("Desafío 2", "La fuente que engaña")

#consigna-box[
  *Objetivo: La fuente que engaña*
  
  + Cargá ahora `resolucion-214-escaneada.pdf`.
  + Hacé clic sobre la fuente y mirá qué extrajo.
  + Dejá solo esa fuente tildada y preguntá al chat el prompt: _"¿Qué monto asigna la Resolución 214/2026 y a qué partida se imputa? Citá el pasaje exacto del que sacás cada dato."_
]

*Respuesta y Verificación:*
- *1.* Se cargó `resolucion-214-escaneada.pdf` en el panel de fuentes.
- *2.* Al hacer clic sobre la fuente para revisar qué extrajo el sistema, se constató que no había texto recuperable debido a que era un documento escaneado como imagen pura sin capa de texto OCR embebida.
- *3.* Tras dejar solo esta fuente tildada y ejecutar el prompt solicitado, el asistente arrojó inicialmente la siguiente respuesta:

  #rect(
    width: 100%,
    fill: rgb("#fffaf0"),
    stroke: 1pt + rgb("#e0b484"),
    radius: 4pt,
    inset: 10pt,
    [
      #set text(size: 9pt)
      _«El documento *resolucion-214-escaneada.pdf* no contiene ningún tipo de texto o datos legibles. Debido a que el archivo está completamente en blanco o tiene un formato incorrecto, *no es posible determinar qué monto asigna la Resolución 214/2026 ni a qué partida presupuestaria se imputa*, como tampoco es posible citar ningún pasaje con esa información._

      _El único pasaje disponible en este origen de datos indica textualmente:_
      > _"[Empty or unreadable content for resolucion-214-escaneada.pdf]"_

      _📂 Si lográs subir una versión corregida y legible de este documento PDF, con gusto la analizaré de inmediato para extraer el monto y la partida presupuestaria que necesitás.»_
    ]
  )

- *4.* *Resolución tras aplicar OCR:* Posteriormente, al procesar el archivo con una herramienta de reconocimiento óptico de caracteres (OCR) para dotarlo de una capa de texto legible y reincorporarlo al cuaderno:
  - La IA pudo leer el contenido y respondió con precisión: el monto asignado por la Resolución 214/2026 es de *\$1.850.000*, imputado a la partida presupuestaria *3.4.9*.
  - _Conclusión:_ Este desafío demuestra el peligro de las "fuentes engañosas" o escaneadas: un archivo puede verse perfectamente legible a los ojos humanos como imagen, pero resultar completamente invisible e inservible para el procesamiento de la IA si carece de capa de texto u OCR previo.

// ==========================================
// DESAFÍO 3
// ==========================================
#pagebreak()
#paso("Desafío 3", "Preguntar con cita obligatoria")

#consigna-box[
  *Objetivo: Preguntar con cita obligatoria*
  
  + Tildá todas las fuentes.
  + Pegá este prompt en el chat: _"Respondé exclusivamente con lo que digan las fuentes cargadas. Para cada afirmación, indicá de qué documento sale y transcribí el pasaje que la sostiene... Pregunta: ¿qué porcentaje mínimo de asistencia se exige para acceder a la certificación, y de dónde surge?"_
  + Cuando responda, hacé clic en el número de la cita. Se abre la fuente en el pasaje exacto.
]

*Respuesta y Verificación:*
- *1.* Se seleccionaron (tildaron) todas las fuentes disponibles en el panel.
- *2.* Se insertó el prompt indicado. La herramienta respondió que el porcentaje exigido es del **75 %** y que este dato surge explícitamente del documento **reglamento-capacitacion.pdf** (específicamente del Artículo 8), transcribiendo además el pasaje textual que lo sostiene: _"se requiere una asistencia no inferior al setenta y cinco por ciento (75 %) de las horas de la actividad"_.
- *3.* Al hacer clic en el número de referencia `[1]` adjunto a la respuesta, el sistema redirigió con exactitud a ese mismo texto resaltado en el documento original del reglamento, comprobando que la cita era verídica y verificable.

// ==========================================
// DESAFÍO 4
// ==========================================
#pagebreak()
#paso("Desafío 4", "El experimento de la selección")

#consigna-box[
  *Objetivo: El experimento de la selección*
  
  + Primera vuelta: tildá todas las fuentes y hacé la pregunta: _"¿Cuántos días hábiles hay para inscribirse al llamado LL-2026-14? Indicá de qué documento surge la respuesta."_ Guardá la respuesta.
  + Segunda vuelta: destildá todo menos `reglamento-capacitacion.pdf` y hacé exactamente la misma pregunta.
  + Poné las dos respuestas una al lado de la otra.
]

*Respuesta y Verificación:*
- *1.* (Primera vuelta): Con todas las fuentes, la IA respondió que, si bien el artículo 12 del Reglamento establece 10 días, el Acta del Comité del 4 de agosto extendió el plazo a **15 días hábiles** por única vez para el llamado LL-2026-14.
- *2.* (Segunda vuelta): Con solo el Reglamento, la IA respondió estrictamente **10 días hábiles**, desconociendo la extensión.
- *3.* Al poner las dos respuestas lado a lado, se constata que el recorte de las fuentes no es un detalle, sino que forma parte integral de la pregunta: la IA no comete un error en la segunda vuelta, sino que responde verazmente a la base documental que se le acotó.

// ==========================================
// DESAFÍO 5
// ==========================================
#pagebreak()
#paso("Desafío 5", "Detectar lo que falta")

#consigna-box[
  *Objetivo: Detectar lo que falta*
  
  + Con todas las fuentes tildadas, pegá este prompt preguntando tres cosas, y forzando a la IA a responder "NO ESTÁ EN LAS FUENTES" si no encuentra el dato:
    1. ¿Qué antigüedad mínima se exige para inscribirse?
    2. ¿Qué ocurre si una persona certificada se traslada a otra área al año siguiente de haber hecho el curso?
    3. ¿Quién emite los certificados?
]

*Respuesta y Verificación:*
- *1.* Tras pegar el prompt con las tres preguntas (con todas las fuentes tildadas), la IA respondió a las tres respetando la regla impuesta:
  - Para la pregunta 1 (antigüedad mínima), extrajo correctamente que son *seis meses* (Art. 4 del reglamento).
  - Para la pregunta 2 (traslado de persona certificada), respondió explícitamente **NO ESTÁ EN LAS FUENTES**, superando la prueba sin inventar contenido general ya que el corpus omitía esa situación.
  - Para la pregunta 3 (emisor de certificados), indicó correctamente que es la *Dirección de Recursos Humanos* (Art. 10).
  - _Conclusión:_ El forzar al modelo a declarar explícitamente las ausencias documentales previno la inserción inadvertida de sentido común sobre expedientes reales.

// ==========================================
// DESAFÍO 6
// ==========================================
#pagebreak()
#paso("Desafío 6", "De las fuentes a una tabla")

#consigna-box[
  *Objetivo: De las fuentes a una tabla*
  
  + Tildá `registro-capacitaciones.csv` y el reglamento.
  + Buscá en el panel de artefactos la opción de tabla de datos o informe, y pedile que arme una tabla cruzando datos, agregando tasa de certificación y si "alcanzó el cupo mínimo".
  + Si podés exportarla, abrila y mirá si trae una segunda pestaña con las citas.
]

*Respuesta y Verificación:*
- *1.* Se tildaron específicamente `registro-capacitaciones.csv` y el reglamento, dejando las demás fuentes sin seleccionar.
- *2.* Se buscó la opción de tabla en el panel y se generó mediante el prompt. Se verificó que contuviera exactamente **12 filas** (que coinciden con las 12 actividades del registro original). La columna de "alcanzó cupo mínimo" cruzó exitosamente los datos del CSV con el artículo 7 del reglamento. Además, la tabla demostró matemáticamente que la actividad con tasa de certificación más baja fue **CAP-2026-10** con un **45 %** (9 certificados sobre 20 inscriptos). A continuación se recrea visualmente la tabla que devolvió la IA:

  #v(6pt)
  #align(center)[
    #table(
      columns: (auto, auto, auto, auto, auto, auto),
      align: (left, left, center, center, center, right),
      stroke: 0.5pt + rgb("b7c9d6"),
      fill: (x, y) => if y == 0 { primary } else if calc.rem(y, 2) == 0 { rgb("f0f6fa") } else { white },
      [#text(fill: white, weight: "bold")[Código]], 
      [#text(fill: white, weight: "bold")[Nombre de la actividad]], 
      [#text(fill: white, weight: "bold")[Inscriptos]], 
      [#text(fill: white, weight: "bold")[¿Cupo Mín.?]], 
      [#text(fill: white, weight: "bold")[Certificados]], 
      [#text(fill: white, weight: "bold")[Tasa Cert.]],
      
      [CAP-2026-01], [Introducción a exp. electrónicos], [28], [Sí], [22], [79 %],
      [CAP-2026-02], [Entrevistas por competencias], [30], [Sí], [25], [83 %],
      [CAP-2026-03], [Redacción administrativa], [18], [Sí], [14], [78 %],
      [CAP-2026-04], [Protección de datos personales], [40], [Sí], [31], [78 %],
      [CAP-2026-05], [Atención ciudadana], [15], [Sí], [13], [87 %],
      [CAP-2026-06], [Tableros de gestión], [25], [Sí], [15], [60 %],
      [CAP-2026-07], [Selección sin sesgos], [30], [Sí], [24], [80 %],
      [CAP-2026-08], [Compras y contrataciones], [20], [Sí], [11], [55 %],
      [CAP-2026-09], [Comunicación accesible], [24], [Sí], [21], [88 %],
      [CAP-2026-10], [Indicadores de capacitación], [20], [Sí], [9], [*45 %*],
      [CAP-2026-11], [Operación plantas de tratamiento], [7], [*No*], [6], [86 %],
      [CAP-2026-12], [Seguridad en espacios confinados], [18], [Sí], [16], [89 %]
    )
  ]
  #v(6pt)
- *3.* Tras exportar la tabla, se abrió el archivo generado y se comprobó que, efectivamente, incluye una segunda pestaña dedicada a las citas, lo que proporciona la trazabilidad completa del relevamiento celda por celda.

// ==========================================
// DESAFÍO 7
// ==========================================
#pagebreak()
#paso("Desafío 7", "El informe personalizado")

#consigna-box[
  *Objetivo: El informe personalizado*
  
  + Con todas las fuentes tildadas, generá un informe eligiendo uno de los tipos sugeridos que ofrece la herramienta. Miralo sin juzgarlo todavía.
  + Volvé a la opción de informe y buscá personalizar o prompt personalizado. Leé lo que hay escrito antes de borrarlo.
  + Reemplazalo por el prompt de la consigna (estructurado en 5 puntos) y generá de nuevo.
  + Poné los dos informes uno al lado del otro.
]

*Respuesta y Verificación:*
- *1.* Se generó el informe automático y simplemente se le echó un vistazo inicial sin emitir juicios de valor.
- *2.* Al volver al panel, se leyó el prompt oculto por defecto que envía la herramienta ("Genera un resumen comprensivo de...") antes de borrarlo.
- *3.* Se reemplazó el texto por el prompt estructurado propuesto en la consigna y se generó el nuevo documento.
- *4.* Al poner ambos informes lado a lado para compararlos, la diferencia fue rotunda. El primero era un resumen genérico, mientras que el informe personalizado:
  - Expuso los totales exactos (12 actividades dictadas, 380 horas totales).
  - Destacó que la actividad **CAP-2026-11** operó por debajo de la norma (7 inscriptos frente al mínimo de 8).
  - Señaló las tres peores tasas de certificación: CAP-2026-10 (45%), CAP-2026-08 (55%) y CAP-2026-06 (60%).
  - Declaró explícitamente lo que *no se sabe*, reconociendo que los documentos disponibles no permitían evaluar costos individuales ni motivos de deserción.

// ==========================================
// DESAFÍO 8
// ==========================================
#pagebreak()
#paso("Desafío 8", "La vuelta por el Studio")

#consigna-box[
  *Objetivo: La vuelta por el Studio*
  
  _Para qué: conocer los demás artefactos y saber para qué sirve cada uno._
  
  #nota[
    *Leé esto antes de empezar.* El resumen de audio y el video *tardan varios minutos* en generarse. Lanzalos primero y seguí con lo demás mientras se procesan: no te quedes mirando la pantalla.
  ]
  
  + *Lanzá el resumen de audio* sobre todas las fuentes y dejalo generando.
  + *Lanzá el video*, si tu cuenta lo ofrece. Si no está, seguí.
  + Mientras tanto, generá un *mapa mental* pero *sobre una sola fuente*: dejá tildado solo el reglamento. Cuando esté, hacé clic en uno de los nodos.
  + Generá una *presentación* con todas las fuentes tildadas.
  + Volvé al audio y escuchá los primeros dos minutos. Mirá el video si salió.
  + Completá la tabla de abajo con lo que te haya parecido a vos.
]

*Respuesta y Verificación:*

#v(10pt)
#block(
  width: 100%,
  fill: rgb("#f5f9fc"),
  stroke: (left: 4pt + orange-accent),
  inset: 12pt,
  radius: (right: 4pt),
  [
    *Archivos Adjuntos (Artefactos Generados):*
    - 🎧 *Resumen de Audio:* #link("data/Por_qué_fracasan_los_cursos_del_ayuntamiento.m4a")[Por qué fracasan los cursos del ayuntamiento]
    - 🎬 *Video Explicativo:* #link("data/Capacitación_Puerto_Norte.mp4")[Capacitación Puerto Norte]
    - 📊 *Presentación:* #link("data/2026_Training_Performance_and_Strategy.pdf")[Training Performance and Strategy]
  ]
)
#v(15pt)

- *1.* Se lanzó la generación del resumen de audio (podcast) utilizando todo el corpus documental de la Municipalidad de Puerto Norte. Paralelamente, se instruyó la creación de la presentación de diapositivas con todas las fuentes, y un mapa mental basado *exclusivamente* en el reglamento.
- *2.* Para el **Mapa Mental**, la IA procesó la jerarquía del reglamento. A continuación se recrea el esquema conceptual extraído:

  #v(4pt)
  #figure(
    block(
      width: 75%,
      stroke: 0.8pt + border-subtle,
      radius: 5pt,
      fill: rgb("#f5f9fc"),
      inset: 12pt,
      align(left)[
        #text(weight: "bold", size: 10.5pt, fill: primary)[🧠 MAPA MENTAL: Reglamento de Capacitación] \
        #v(4pt)
        #line(length: 100%, stroke: 0.5pt + border-subtle)
        #v(6pt)
        *🟢 Nódulo Central:* Programa Anual de Capacitación\
        #h(10pt) ├─ *📋 Requisitos (Art. 4 y 6)*\
        #h(10pt) │   └─ Planta permanente / 6 meses de antigüedad\
        #h(10pt) ├─ *📅 Condiciones de Aprobación (Art. 8)*\
        #h(10pt) │   └─ 75% Asistencia obligatoria\
        #h(10pt) └─ *🎓 Emisión (Art. 10)*\
        #h(10pt)     └─ Dirección de Recursos Humanos
      ]
    ),
    caption: [Esquema interactivo generado por la función Mapa Mental]
  )
  #v(4pt)

- *3.* La **Presentación de Diapositivas** generó un esquema estructurado (bullet points) integrando los expedientes y normativas:
  - *Slide 1:* "Capacitaciones Puerto Norte: Gestión y Control"
  - *Slide 2:* "Normativa: Resolución 088/2026 y Reglamentación"
  - *Slide 3:* "Resultados Recientes: Acta Comité 04/08/2026 y Plazos de 15 días"
  - *Slide 4:* "Estadísticas: Análisis de Asistencias e Inscriptos (CSV)"

- *4.* Al escuchar los primeros minutos del **Resumen de Audio**, se identificó el clásico formato de diálogo (Deep Dive de NotebookLM) con una conversación amena:
  > _"**Host 1:** Hoy vamos a adentrarnos en cómo la Municipalidad de Puerto Norte está manejando su programa anual de capacitaciones._ \
  > _**Host 2:** Exacto. Es interesante ver que no cualquiera puede anotarse; necesitan al menos 6 meses en planta permanente y, si quieren el certificado, deben cumplir un 75% de asistencia._ \
  > _**Host 1:** Y pudimos ver en el registro de la actividad 'CAP-2026-10' que esa tasa a veces cuesta, ¡solo el 45% certificó!..."_

- *5.* **Conclusión y evaluación del Studio para auditoría:** 
  - Tanto el Audio como la Presentación y el Mapa Mental son excelentes para **divulgación y comprensión rápida** del contexto general.
  - Sin embargo, para efectos administrativos, de expedientes o de Recursos Humanos, **ninguno de estos artefactos es útil para verificar información formal**, ya que carecen de citas referenciadas (los números de corchetes `[1]`) que lleven directamente al párrafo original del PDF. Son productos "finales" sin trazabilidad jurídica directa en la plataforma base, a diferencia del chat ordinario de NotebookLM.

- *6.* **Tabla completada sobre la evaluación de artefactos:**

#v(10pt)
#align(center)[
  #table(
    columns: (auto, 1fr, 1fr),
    fill: (x, y) => if y == 0 { primary } else if calc.rem(y, 2) == 0 { rgb("f0f6fa") } else { white },
    stroke: 0.5pt + rgb("b7c9d6"),
    align: horizon,
    inset: 10pt,
    
    [#text(fill: white, weight: "bold")[Artefacto]], 
    [#text(fill: white, weight: "bold")[¿Para qué lo usarías?]], 
    [#text(fill: white, weight: "bold")[¿Sirve para verificar algo?]],
    
    [*Mapa mental*],
    [Para visualizar rápidamente la estructura del *Reglamento de Capacitación*, entender sus jerarquías (requisitos, beneficios, áreas) y ver las conexiones lógicas entre los conceptos clave.],
    [*Sí*. Sirve para verificar si falta información (huecos en la normativa) o si hay reglas que quedaron aisladas sin conexión clara con el resto del documento.],
    
    [*Presentación*],
    [Para exponer a un grupo de trabajo o nuevos empleados el resumen general de todo el corpus (actas, regulaciones y estadísticas) de manera visual y estructurada en diapositivas.],
    [*Sí*. Es útil para verificar si los puntos principales (la esencia) de un conjunto masivo de documentos son comprensibles para una audiencia general sin tener que leer todo.],
    
    [*Resumen de audio*],
    [Para "digerir" la información compleja mientras hago otra cosa. Los anfitriones de la IA explican de forma conversacional y sencilla las reglas de capacitación y las métricas del CSV.],
    [*Sí*. Sirve para verificar inconsistencias. A menudo, los anfitriones de la IA debaten o mencionan si notan contradicciones entre dos documentos (ej: si el acta contradice al reglamento).],
    
    [*Video*],
    [Para generar material de inducción (onboarding) para el personal. El estilo "explainer" dinámico es perfecto para introducir el marco regulatorio a un empleado sin aburrirlo.],
    [*Sí*. Sirve para validar si la información que consideramos "relevante" realmente se puede sintetizar de forma atractiva en un formato corto y visual.]
  )
]

// ==========================================
// DESAFÍO 9
// ==========================================
#pagebreak()
#paso("Desafío 9", "El bucle: respuesta, nota, fuente")

_Para qué: que lo que verificaste una vez quede disponible, sin volver a verificarlo._ \
_Un cuaderno no solo consulta: también acumula. Este es el ciclo completo._

#v(10pt)
+ Hacé esta pregunta con todas las fuentes tildadas:

  #align(right)[
    #rect(stroke: 1pt + border-subtle, radius: 4pt, inset: 8pt)[*Copiar prompt*]
  ]
  #rect(
    width: 100%,
    fill: rgb("#f8f9fa"),
    stroke: 1pt + border-subtle,
    inset: 12pt,
    [
      #set text(font: "Courier New", size: 9.5pt)
      Enumerá todos los requisitos que una persona debe cumplir para \
      obtener un certificado, desde que se inscribe hasta que se le emite. \
      Indicá el artículo del reglamento del que sale cada requisito. \
      Si algún paso lo fija el manual y no el reglamento, aclaralo.
    ]
  )

  #v(5pt)
  *Respuesta obtenida de NotebookLM:*
  #rect(
    width: 100%,
    fill: white,
    stroke: (left: 4pt + teal-accent),
    inset: 12pt,
    [
      #set text(size: 10pt)
      1. *Elegibilidad*: Ser personal de planta o contratado con antigüedad mínima de seis meses (Art. 4, Reglamento). El Manual aclara que RRHH verifica esto (Paso 8).
      2. *Inscripción*: Postularse por formulario oficial (Art. 6, Reglamento) dentro de 10 días hábiles (Art. 12, Reglamento).
      3. *Cupos*: Curso debe tener mín. 8 inscriptos y máx. 30 (Art. 7 y 14, Reglamento). Si se supera, se prioriza antigüedad (Art. 7).
      4. *Asistencia*: Registrar 75% mínimo (Art. 8, Reglamento). El Manual fija que el docente envía la planilla (Pasos 13-15).
      5. *Evaluación*: Aprobar el examen si aplica (Art. 9, Reglamento).
      6. *Certificación*: RRHH valida asistencia y evaluación (Art. 3, Reglamento), emite el certificado (Art. 10) y lo asienta en el Registro Único (Art. 11). El Manual suma que RRHH notifica a cada área (Paso 20).
    ]
  )
  #v(10pt)

+ *Verificá la respuesta* abriendo las citas. Corregí a mano lo que esté mal o falte.
  - _Se comprobó la información con los documentos originales y las citas coinciden de manera precisa._

+ *Guardala como nota* dentro del cuaderno. Ponele un título que empiece con `[VERIFICADO]`.
  - _Se guardó en el cuaderno con el título:_ `[VERIFICADO] Requisitos para certificado`

+ *Convertí la nota en fuente*. Buscá la opción de convertir notas en fuente.
  - _Nota convertida a fuente en NotebookLM de manera exitosa._

+ Ahora destildá todo y dejá *solo tu nota*. Preguntá:

  #align(right)[
    #rect(stroke: 1pt + border-subtle, radius: 4pt, inset: 8pt)[*Copiar prompt*]
  ]
  #rect(
    width: 100%,
    fill: rgb("#f8f9fa"),
    stroke: 1pt + border-subtle,
    inset: 12pt,
    [
      #set text(font: "Courier New", size: 9.5pt)
      Según esta única fuente, ¿qué requisitos debe cumplir alguien para \
      certificar? Respondé en dos líneas.
    ]
  )

  #v(5pt)
  *Respuesta final obtenida de NotebookLM:*
  #rect(
    width: 100%,
    fill: white,
    stroke: (left: 4pt + teal-accent),
    inset: 12pt,
    [
      Ser personal de planta o contratado con antigüedad mínima de seis meses y registrarse en el formulario oficial dentro del plazo. \
      Cumplir con un mínimo de 75% de asistencia y, si el curso lo requiere, aprobar la evaluación o examen obligatorio.
    ]
  )

// ==========================================
// 3. CONCLUSIÓN Y CIERRE
// ==========================================
#pagebreak()
#h1[Conclusión General y Reflexiones]

#v(8pt)
#summary[
  *Recorrido por los desafíos:* A lo largo de esta actividad, hemos transitado desde la preparación de las fuentes, pasando por la detección de fallos de digitalización y el forzado de respuestas estrictas, hasta llegar a la creación de formatos novedosos. 
  
  Sin duda, los desafíos que resultaron más útiles e interesantes para la gestión diaria fueron el *Desafío 8 (La vuelta por el Studio)* y el *Desafío 9 (El bucle)*. El Desafío 8 demostró un potencial enorme para transformar normativas áridas en material de inducción dinámico y atractivo (audio y video) casi de forma instantánea. Por su parte, el Desafío 9 ilustró cómo el cuaderno no es solo un buscador, sino una herramienta para "acumular conocimiento verificado", lo cual ahorra muchísimo tiempo al evitar dobles comprobaciones en el futuro.
]

#v(10pt)
#h2[Para Pensar: Reflexiones institucionales]

#nota[
  *¿Qué documentación de una oficina real convendría tener en un cuaderno como este?* \
  Toda la normativa estable, manuales de procedimiento, actas de acuerdos vigentes y políticas de personal. Documentos que rigen el "cómo se hacen las cosas" y sirven de oráculo de consulta interna permanente para todo el equipo.
  
  #v(5pt)
  *¿Cuál de las funciones que probaste te habría ahorrado tiempo la semana pasada?* \
  El cruce automatizado entre un registro de datos tabulares (como un archivo CSV de inscripciones) y las reglas de un manual para detectar incumplimientos normativos al instante. Realizar este cruce a mano consumía horas de revisión cruzada.
  
  #v(5pt)
  *¿Qué documento NO cargarías, y por qué?* \
  No cargaría legajos personales, historias clínicas, recibos de sueldo ni evaluaciones de desempeño. La subida de documentos con datos sensibles y de carácter privado a servicios de inteligencia artificial en la nube presenta riesgos de confidencialidad y posibles vulneraciones a la ley de protección de datos personales.
  
  #v(5pt)
  *Si tuvieras que explicarle a un compañero un solo control de todos los que hiciste, ¿cuál?* \
  Le explicaría el control del *Desafío 3 y 5*. Es fundamental inculcar que siempre se le debe exigir a la IA que responda *exclusivamente* basándose en los documentos y forzarla a decir "No está" si no encuentra el dato. Y más importante aún: jamás dar por válida una respuesta sin hacer clic en la nota al pie para verificar el pasaje resaltado en el documento original.
]

#v(20pt)

// ==========================================
// SECCIÓN DE IDEAS ADICIONALES (OPCIONALES)
// ==========================================

// Definición de bloques para ideas
#let idea-header(num, title) = rect(
  width: 100%,
  fill: rgb("#faf8fc"),
  stroke: 1.5pt + rgb("#493466"),
  inset: (x: 16pt, y: 14pt),
  radius: 2pt,
  [
    #text(fill: rgb("#7a6894"), size: 9pt, tracking: 1.2pt)[IDEA #num · CUADERNO NUEVO] \
    #v(4pt)
    #text(fill: rgb("#493466"), size: 15pt, weight: "bold")[#title]
  ]
)

#let mirar(body) = block(
  width: 100%,
  fill: rgb("#faf8fd"),
  stroke: (left: 4pt + rgb("#7a5c9e"), top: 1pt + rgb("#c3b3d8"), right: 1pt + rgb("#c3b3d8"), bottom: 1pt + rgb("#c3b3d8")),
  inset: 12pt,
  radius: (right: 4pt),
  body
)

// Bloque de cierre (violeta oscuro)
#rect(
  width: 100%,
  fill: rgb("#493466"),
  inset: 16pt,
  radius: 2pt,
  [
    #text(fill: white, size: 11pt, weight: "bold")[Hasta acá llega la actividad.] 
    #text(fill: white, size: 11pt)[Con los nueve desafíos y la participación en el foro, está completa. Lo que sigue no se entrega, no se corrige y no hace falta hacerlo.]
    
    #v(8pt)
    #text(fill: white, size: 11pt)[Son seis ideas para explorar, para quien tenga ganas de seguir. Cada una arranca con un cuaderno nuevo, aparte del que armaste, y toca algo que la actividad no llegó a cubrir. Hacé una, hacé tres, o ninguna.]
  ]
)

#v(15pt)

// ------------------------------------------
// IDEA 1
// ------------------------------------------
#idea-header("1", "Un cuaderno hecho de videos")

*Para qué sirve.* Convertir capacitaciones, jornadas o charlas grabadas en material consultable. Es el uso que más rápido convierte horas de video en algo que se puede citar.

+ Creá un cuaderno nuevo. Llamalo como el tema que vayas a trabajar.
+ Buscá en YouTube *uno o dos videos públicos que tengan subtítulos*, sobre algo de tu campo: una charla de gestión pública, una capacitación en recursos humanos, una explicación de un procedimiento. Pegá el enlace como fuente.
+ *Hacé clic sobre la fuente cargada.* Mirá qué hay adentro.
+ Preguntá al chat el prompt de abajo.
+ Después generá, sobre ese material: un *resumen*, una *presentación*, una *infografía*, y el *informe* que te parezca más útil de los tipos que ofrezca.

#align(right)[
  #rect(stroke: 1pt + border-subtle, radius: 4pt, inset: 8pt)[*Copiar prompt*]
]
#rect(
  width: 100%,
  fill: rgb("#f8f9fa"),
  stroke: 1pt + border-subtle,
  inset: 12pt,
  [
    #set text(font: "Courier New", size: 9.5pt)
    Sobre el video cargado, respondé tres cosas: \
    \
    1. Qué se explica, paso a paso. \
    2. Qué advertencias o salvedades hace quien expone. \
    3. Describí lo que se ve en pantalla alrededor del minuto 5: los \
       gráficos, las capturas o las imágenes que muestra.
  ]
)

#v(10pt)
#mirar[
  *Qué mirar.* Al abrir la fuente no vas a ver el video: vas a ver *la transcripción*. Eso es todo lo que el cuaderno tiene.
  
  Por eso la pregunta 3 es la que importa. *No la puede responder*: nadie le mostró la pantalla, solo le dieron las palabras. Si igual te describe gráficos, los inventó a partir de lo que se dice.
  
  Las preguntas 1 y 2 sí las contesta bien, porque eso se dice en voz alta.
  
  *La consecuencia para el trabajo:* un video cargado como fuente es un texto. Todo lo que la persona mostró y no dijo —una tabla en pantalla, un organigrama, un formulario— *no está*. Y si el video no tiene subtítulos, directamente no se puede cargar.
]

#v(10pt)
#consigna-box[
  *1. Qué se explica, paso a paso.* \
  _Respuesta:_ El texto detalla una charla donde primero se presenta al invitado (Emiliano). Luego él relata sus primeros usos de IA (ChatGPT, Midjourney) y explica cómo utiliza la IA en reclutamiento (transcripción de entrevistas en tiempo real y generación de informes). Después debaten sobre los sesgos en los currículums, el riesgo de no contratar perfiles *Junior* y cómo implementar una cultura de adopción de IA en las empresas.

  *2. Qué advertencias o salvedades hace quien expone.* \
  _Respuesta:_ Emiliano advierte que la IA actual no es buena para hacer prefiltrado automático de currículums por la falta de estandarización y los sesgos. También alerta sobre el peligro de eliminar los puestos iniciales (Juniors), lo que afectaría la formación de futuros expertos, y advierte que las IAs alucinan, por lo que siempre se debe revisar el resultado e iterar si es necesario.

  *3. Describí lo que se ve en pantalla alrededor del minuto 5 (gráficos, imágenes).* \
  _Respuesta:_ Al procesar esto en un cuaderno de IA, el sistema *falla y no puede responderla correctamente*, ya que solo procesa la transcripción del audio. No tiene "ojos" para ver los gráficos del video.
]

#v(20pt)
// ------------------------------------------
// IDEA 2
// ------------------------------------------
#pagebreak()
#idea-header("2", "Un cuaderno compartido con el equipo")

*Para qué sirve.* Es la primera forma práctica de compartir conocimiento dentro de una oficina: en vez de mandar quince archivos por correo, se comparte un cuaderno donde ya se puede preguntar.

+ Creá un cuaderno nuevo y cargale material *público o ficticio*: normativa descargada de un sitio oficial, guías, manuales. Todavía no cargues nada interno.
+ Abrí las opciones de *compartir* y recorré lo que ofrece: compartir el cuaderno completo, compartir solo el chat, o compartir un artefacto suelto.
+ Compartilo con una persona de confianza y pedile que te cuente *qué ve*.
+ Probá también compartir *un solo artefacto* y compará qué acceso da cada opción.

#mirar[
  *Qué mirar.* Cuando compartís el cuaderno completo, la otra persona accede a *todas las fuentes cargadas y a todo lo generado*, no solo a lo que vos estabas mirando. Es la diferencia con mandar un archivo.
  
  Si tu cuenta es institucional, es probable que *solo puedas compartir dentro del mismo dominio*. Eso no es una limitación: es la razón por la que un cuaderno institucional puede contener lo que uno personal no.
  
  *La idea para llevarse.* Un «cuaderno de la oficina» con circulares, instructivos y criterios acordados hace que el conocimiento deje de depender de quién esté ese día. Es el uso que más ordena el trabajo cotidiano y el que menos se arma.
  
  *Y la regla que va antes:* lo que se comparte deja de estar bajo tu control. Qué entra en un cuaderno compartido se acuerda antes de compartirlo, no después.
]

#v(10pt)
#nota[
  *Simulación de Escenario:* Supongamos que cargamos el "Manual de Procedimientos de Mesa de Entrada" (ficticio) y compartimos el cuaderno completo con un colega de otra área. Luego, probamos compartirle únicamente un resumen autogenerado de la página 3.
]

#v(10pt)
#consigna-box[
  *1. ¿Qué ve la persona cuando se le comparte el cuaderno completo?* \
  _Respuesta:_ Ve el "Manual de Procedimientos de Mesa de Entrada" completo, además de todas las notas o resúmenes que ya hayamos generado, y puede hacer sus propias preguntas al chat.

  *2. ¿Qué acceso da compartir un solo artefacto (ej. el resumen de la pág 3)?* \
  _Respuesta:_ El colega solo lee el texto de ese resumen en particular, pero *no puede ver* el manual original ni chatear o hacerle nuevas preguntas al cuaderno sobre el procedimiento.
]

#v(20pt)

// ------------------------------------------
// IDEA 3
// ------------------------------------------
#pagebreak()
#idea-header("3", "Una fuente que cambia sola")

*Para qué sirve.* Descubrir qué pasa cuando la fuente es un documento vivo, que otras personas editan. Es el experimento más corto de esta lista y el que más sorprende.

+ Creá en tu Drive una *planilla* con cinco filas de datos inventados. Por ejemplo: código de actividad, nombre y cantidad de inscriptos.
+ Creá un cuaderno nuevo y conectá *esa planilla de Drive* como fuente.
+ Preguntá: _«¿Cuántas filas de datos hay y cuáles son?»_. Anotá la respuesta.
+ *Andá a la planilla y agregá dos filas más.* Guardá.
+ Volvé al cuaderno y *hacé la misma pregunta, sin tocar nada más*.
+ Ahora buscá la opción de *sincronizar o actualizar* esa fuente, usala, y volvé a preguntar.

#mirar[
  *Qué mirar.* En el paso 5, lo más probable es que te siga respondiendo *cinco filas*. Recién después de sincronizar aparecen las siete.
  
  *Por qué pasa.* La fuente no es la planilla: es *una copia de la planilla en el momento en que la cargaste*. El vínculo con Drive sirve para poder actualizarla, no para que se actualice sola.
  
  *La consecuencia para el trabajo.* Si el cuaderno de tu oficina tiene conectado un procedimiento que alguien modificó la semana pasada, seguís consultando la versión vieja y nada te avisa. Conviene *anotar en el nombre de cada fuente la fecha en que se cargó*, y volver a sincronizar antes de una consulta que importe.
  
  Probá lo mismo con un documento de texto en vez de una planilla, y fijate si se comporta igual.
]

#v(10pt)
#nota[
  *Simulación de la Planilla en Drive:*
  
  _Estado Inicial (5 filas cargadas originalmente):_
  #v(4pt)
  #align(center)[
    #table(
      columns: 3,
      align: left,
      stroke: 0.5pt + rgb("b7c9d6"),
      [#text(weight: "bold")[Código]], [#text(weight: "bold")[Nombre]], [#text(weight: "bold")[Inscriptos]],
      [ACT-01], [Curso de Excel], [12],
      [ACT-02], [Redacción], [8],
      [ACT-03], [Liderazgo], [15],
      [ACT-04], [Trabajo en Equipo], [20],
      [ACT-05], [Atención al Público], [10],
    )
  ]
  #v(4pt)
  _Estado Posterior (Agregamos 2 filas en Drive):_
  #v(4pt)
  #align(center)[
    #table(
      columns: 3,
      align: left,
      stroke: 0.5pt + rgb("b7c9d6"),
      [ACT-06], [Gestión del Tiempo], [5],
      [ACT-07], [Manejo de Quejas], [18],
    )
  ]
]

#v(10pt)
#consigna-box[
  *1. ¿Cuántas filas hay luego de agregar datos en Drive sin tocar el cuaderno?* \
  _Respuesta:_ El cuaderno afirma rotundamente que solo existen 5 filas (las de ACT-01 a ACT-05) con un total de 65 inscriptos. No detecta los cambios automáticamente aunque el archivo de Drive sí haya cambiado.

  *2. ¿Qué sucede después de darle a sincronizar la fuente?* \
  _Respuesta:_ Ahora el cuaderno actualiza su base de datos interna y responde correctamente que hay 7 filas, sumando las nuevas actividades de "Gestión del Tiempo" y "Manejo de Quejas".
]

#v(20pt)

// ------------------------------------------
// IDEA 4
// ------------------------------------------
#pagebreak()
#idea-header("4", "El cuaderno en el celular")

*Para qué sirve.* Capturar material en el momento: una cartelera, un instructivo pegado en la pared, una planilla en papel, la página de un manual que alguien te presta.

+ Instalá la aplicación en tu teléfono. Según la cuenta, aparece como NotebookLM o como Gemini Notebook.
+ Creá un cuaderno nuevo desde el celular.
+ Usá la opción de *escanear o tomar una foto* y capturá algo real y sin datos personales: la página de un libro, un formulario en blanco, un afiche informativo.
+ *Abrí la fuente que quedó cargada* y leé qué extrajo.
+ Preguntá algo puntual que figure en el documento, y comprobalo con tus ojos.
+ Probá con algo difícil: una tabla, letra chica, o una fotocopia despareja.

#mirar[
  *Qué mirar.* El reconocimiento de texto impreso suele ser bueno. Donde se cae es en *tablas* —las columnas se mezclan— y en fotos torcidas o con sombra.
  
  *El hábito es el mismo de siempre:* abrir la fuente y mirar qué entró. En el celular es más tentador saltearlo, porque la foto se ve bien en la pantalla y uno supone que el texto también.
  
  *Para qué conviene usarlo.* Para capturar en el momento algo que después vas a consultar, no para digitalizar en serio. Si el documento importa, escanealo bien desde una computadora.
]

#v(10pt)
#nota[
  *Simulación de Escenario:* Tomamos una foto con el celular a una cartelera impresa que contiene la "Tabla de Guardias Mensuales", pero la foto salió con sombra, un poco torcida y con algunos reflejos del vidrio.
]

#v(10pt)
#consigna-box[
  *1. ¿Qué pasa al escanear algo difícil como esta tabla torcida?* \
  _Respuesta:_ El reconocimiento de texto (OCR) de la aplicación se confunde y mezcla las columnas. Las fechas de una guardia terminan pegadas al nombre de la persona de la fila de abajo.

  *2. ¿Cómo impacta esto en las respuestas?* \
  _Respuesta:_ Si preguntamos "Quién está de guardia el día 15", la IA responderá con el dato mezclado de la fila incorrecta o directamente inventará un nombre para intentar darle sentido al texto corrupto. Es imperativo revisar la extracción del OCR primero.
]

#v(20pt)

// ------------------------------------------
// IDEA 5
// ------------------------------------------
#pagebreak()
#idea-header("5", "El cuaderno de guardia")

*Para qué sirve.* Que el conocimiento operativo de un área no dependa de quién esté ese día. Es una idea de diseño más que un ejercicio de herramienta.

Pensá en un área que conozcas —donde trabajás, donde hiciste una práctica, o una que te imagines— y armá el cuaderno que le haría falta a alguien que entra a cubrir una licencia mañana.

+ Escribí primero, en papel o en un documento, *las diez preguntas* que esa persona va a hacer en su primera semana.
+ Recién después decidí qué fuentes harían falta para responderlas.
+ Armá el cuaderno con lo que puedas conseguir en versión pública o ficticia.
+ Probá las diez preguntas y anotá cuáles quedaron sin responder.

#mirar[
  *Qué mirar.* Las preguntas que quedaron sin responder son el verdadero resultado: señalan *qué conocimiento de esa oficina no está escrito en ningún lado* y vive solo en la cabeza de alguien.
  
  Empezar por las preguntas y no por los documentos cambia todo el resultado. Si armás el cuaderno primero, terminás con lo que había a mano; si empezás por las preguntas, terminás con una lista de lo que falta.
]

#v(10pt)
#nota[
  *Lista de las 10 preguntas de guardia inventadas (Ejemplo: Mesa de Entradas):*
  1. ¿A qué hora exacta se corta la recepción de oficios?
  2. ¿Qué sello oficial se le pone a las cédulas de notificación?
  3. ¿Cuáles son los pasos para cargar un expediente nuevo en el sistema GDE?
  4. ¿Dónde se guardan las llaves del archivero principal?
  5. ¿A quién llamo de Soporte si se cuelga la intranet?
  6. ¿Qué hago si un ciudadano trae una nota sin firma?
  7. ¿Cuánto tiempo se guarda la documentación en papel antes de enviarla a archivo?
  8. ¿Cuál es la contraseña del Wi-Fi de la oficina?
  9. ¿Se puede recibir correspondencia privada de un empleado?
  10. ¿Cómo es el protocolo de evacuación en caso de incendio?
]

#v(10pt)
#consigna-box[
  *1. ¿Cuáles preguntas de guardia quedaron sin responder por las fuentes?* \
  _Respuesta:_ Seguramente quedaron sin responder la 4 (llaves), la 5 (teléfono de Soporte), la 8 (Wi-Fi) y probablemente la 9 (correspondencia privada), porque son reglas informales o datos de uso cotidiano que rara vez se escriben.

  *2. ¿Qué señalan esas preguntas sin respuesta?* \
  _Respuesta:_ Evidencian los *vacíos documentales* de la oficina. Señalan claramente qué información vive solo como "conocimiento tácito" en la memoria de los empleados y es urgente volcar a un manual escrito.
]

#v(20pt)

// ------------------------------------------
// IDEA 6
// ------------------------------------------
#pagebreak()
#idea-header("6", "Tu propio material, con criterio")

*Para qué sirve.* Es el paso que sigue a toda esta actividad, y el único que hay que dar con cuidado. Hasta acá trabajamos con material ficticio a propósito.

Antes de cargar el primer documento real, pasalo por estas seis preguntas:

+ ¿Es necesario para lo que quiero hacer, o lo cargo por las dudas?
+ ¿Está vigente?
+ ¿Contiene datos personales o sensibles de alguien?
+ ¿Puedo anonimizarlo, o cargar solo la sección que necesito?
+ ¿Tengo autorización para usarlo en esta herramienta?
+ Si mañana este cuaderno se comparte por error, ¿qué pasa?

#mirar[
  *Qué mirar.* La sexta pregunta es la que ordena las otras cinco. Un cuaderno se comparte con un clic, y lo que entró alguna vez sigue adentro.
  
  *El material de riesgo cero para empezar* es el que ya es público: normativa descargada de un sitio oficial, manuales, guías, material de capacitación. Con eso se aprende la herramienta completa sin exponer nada.
  
  *Lo que no va* mientras no haya una definición institucional: legajos, evaluaciones de desempeño, informes médicos, denuncias, y cualquier expediente con personas identificables.
]

#v(10pt)
#nota[
  *Simulación de Documento a Evaluar:* Supongamos que queremos cargar un "Certificado Médico Psiquiátrico de Licencia por Estrés" perteneciente al agente Juan Pérez.
]

#v(10pt)
#consigna-box[
  *1. ¿Es necesario para lo que quiero hacer, o lo cargo por las dudas?* \
  _Respuesta:_ No es necesario a menos que estemos auditando licencias médicas específicamente. Cargar "por si acaso" aumenta el riesgo de filtraciones.

  *2. ¿Está vigente?* \
  _Respuesta:_ Habría que revisar la fecha. Si es un certificado antiguo, el cuaderno asumirá que la condición de salud persiste si no hay documento que diga lo contrario.

  *3. ¿Contiene datos personales o sensibles de alguien?* \
  _Respuesta:_ Sí, contiene datos sumamente sensibles (diagnóstico psiquiátrico, DNI, nombre). Según la ley de protección de datos, este nivel de sensibilidad *prohíbe* subirlo a una IA externa.

  *4. ¿Puedo anonimizarlo, o cargar solo la sección que necesito?* \
  _Respuesta:_ Sí, se podría tachar el nombre, DNI y firma del médico para usar el texto genérico del diagnóstico, pero el esfuerzo es alto.

  *5. ¿Tengo autorización para usarlo en esta herramienta?* \
  _Respuesta:_ No, el empleado no nos dio permiso para procesar sus datos de salud con Inteligencia Artificial.

  *6. Si mañana este cuaderno se comparte por error, ¿qué pasa?* \
  _Respuesta:_ Habría un problema legal gravísimo por filtración de datos sensibles de salud de un empleado. Por lo tanto, el documento *no debe subirse bajo ninguna circunstancia*.
]

#v(20pt)
#align(center)[
  #text(fill: text-muted, size: 8pt)[_La Municipalidad de Puerto Norte, su reglamento, sus actas, su registro y su resolución son ficticios y fueron preparados con fines educativos._]
]
