// ==========================================
// CONFIGURACIÓN DE DOCUMENTO Y ESTILOS
// ==========================================
#set document(
  title: "Laboratorio de Prompts Intervenibles - Reporte Final",
  author: ("Hector Daniel Ayarachi Fuentes", "Alejandra Diaz"),
)

#set text(font: "Arial", size: 9.8pt, fill: rgb("#1f2933"), lang: "es")
#set par(justify: true, leading: 0.7em)

// Paleta de colores institucional unificada (Estilo Actividad 2)
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
  above: 18pt,
  below: 9pt,
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
  above: 9pt,
  below: 11pt,
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
  above: 8pt,
  below: 10pt,
  text(size: 9.2pt, body),
)

#let estacion(n, t) = block(
  width: 100%,
  fill: primary,
  inset: (top: 6pt, bottom: 6pt, left: 10pt, right: 10pt),
  radius: 4pt,
  above: 16pt,
  below: 9pt,
  [
    #text(fill: white.darken(15%), size: 8pt, tracking: 0.12em, weight: "bold", upper(n))\
    #v(-3pt)
    #text(fill: white, size: 11.5pt, weight: "bold", t)
  ],
)

#let codeblock(body) = block(
  width: 100%,
  fill: rgb("f7f9fa"),
  stroke: 0.8pt + rgb("9eb1bb"),
  inset: (x: 9pt, y: 7pt),
  radius: 3pt,
  above: 6pt,
  below: 9pt,
  text(font: "Consolas", size: 7.6pt, body),
)

#let tag-ok(body) = box(fill: rgb("e6f4ea"), inset: (x: 3pt, y: 1.5pt), radius: 2.5pt, text(fill: rgb("137333"), weight: "bold", size: 6.2pt, body))
#let tag-no(body) = box(fill: rgb("fce8e6"), inset: (x: 3pt, y: 1.5pt), radius: 2.5pt, text(fill: rgb("c5221f"), weight: "bold", size: 6.2pt, body))
#let tag-warn(body) = box(fill: rgb("fef7e0"), inset: (x: 3pt, y: 1.5pt), radius: 2.5pt, text(fill: rgb("b06000"), weight: "bold", size: 6.2pt, body))

// Formato de tablas
#show table.cell: set par(justify: false, leading: 0.5em)
#show table.cell: set text(size: 8.5pt)

// ==========================================
// 1. CARÁTULA PRINCIPAL (IDÉNTICA A ACTIVIDAD 2)
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
      #image("/Logotipo de curzas/CURZAS.png", width: 130pt)
      
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
        LABORATORIO DE PROMPTS INTERVENIBLES
      ]
      
      #v(10pt)
      
      // Subtítulo
      #text(size: 13pt, fill: text-muted, style: "italic")[
        Reporte Final de Experimentación, Intervención y Resultados
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
            Comprender la separación entre las instrucciones que controlan el comportamiento de una IA y el conocimiento/datos que la alimentan, a través de la modificación, prueba y ajuste de prompts en distintas estaciones de trabajo.
          ]
        ],
      )
      
      #v(85pt)
      
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
            text(size: 9.5pt, weight: "semibold", fill: primary)[Hector Daniel Ayarachi Fuentes \ Alejandra Diaz],
            
            text(size: 9pt, weight: "bold", fill: text-muted)[FECHA DE ENTREGA:],
            text(size: 9.2pt, fill: text-main)[14 de Agosto de 2026],
            
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
      text(size: 8pt, fill: rgb("7d919f"))[Actividad 1 · Laboratorio de Prompts],
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
      text(size: 8pt, fill: rgb("7d919f"))[Reporte de Experimentación e Intervención],
      image("/Logotipo de curzas/CURZAS.png", height: 13pt),
      text(size: 8pt, fill: rgb("7d919f"))[
        #context [Página #counter(page).display("1") de #counter(page).final().at(0)]
      ],
    )
  ],
)

#h1[Laboratorio de Prompts Intervenibles]
#text(size: 11pt, fill: text-muted)[Exploración de la arquitectura de prompts, inyección de conocimiento y extracción estructurada]

#v(8pt)

#summary[
  *Resumen Ejecutivo:* A lo largo de cuatro estaciones obligatorias y una opcional, se experimentó con la separación entre *instrucciones* (reglas, formato y rol) y *conocimiento* (bases documentales externas). Se evaluó el comportamiento del modelo frente a cambios de base, normalización rigurosa hacia CSV y formulación de restricciones lógicas avanzadas.
]

#v(6pt)
#h2[Desarrollo de las Estaciones de Trabajo]

// ==========================================
// ESTACIÓN 1
// ==========================================
#estacion("Estación 1", "Todo dentro del prompt: Orientador del Programa Impulso Local")

#consigna-box[
  *Materiales / Documentación Utilizada:*
  - Contexto de origen: Documentos `[DOC-1]` a `[DOC-5]` embebidos directamente dentro de las directivas del prompt inicial.
  - Archivo externo: Ninguno (la información se encuentra integrada en el cuerpo del prompt).
]

En esta estación se evaluó la integración de instrucciones y documentos de conocimiento dentro de un mismo bloque de consulta. El prompt de inicio configuró a la IA para actuar como un orientador del programa ficticio 'Impulso Local', brindando respuestas concisas y derivando adecuadamente.

#h3[1. Mensaje de Presentación Inicial]
Según la directiva de `<inicio>`, al abrir la conversación el asistente se presenta obligatoriamente:

#nota[
  *Asistente:* «Hola, soy el orientador del programa ficticio 'Impulso Local'. ¿Qué necesitas saber sobre Impulso Local?»
]

#h3[2. Preguntas de Prueba y Simulación de Respuestas]

*Consulta A1: Domicilio a nombre de un tercero*
#consigna-box[
  *Usuario:* «Tengo 20 años, pero el servicio del domicilio no está a mi nombre. ¿Puedo inscribirme?» \
  *Asistente:* Sí, puedes inscribirte en el programa Impulso Local si eres mayor de 18 años. Aunque el servicio no esté a tu nombre, puedes presentar una declaración jurada de domicilio. Fundamento: `[DOC-1]`, `[DOC-2]`. ¿Qué necesitas saber sobre Impulso Local?
]

*Consulta A2: Garantía de vacante*
#consigna-box[
  *Usuario:* «¿Me garantizas que conseguiré una vacante para el próximo lunes?» \
  *Asistente:* No es posible garantizar una vacante. La inscripción no asegura una vacante y los cupos son limitados. Además, el documento no informa fechas de inicio ni disponibilidad de vacantes. Debes consultar estos datos en el portal o en el Centro Comunitario. Fundamento: `[DOC-3]`, `[DOC-5]`. ¿Qué necesitas saber sobre Impulso Local?
]

#h3[3. Intervención / Modificación del Prompt]
Se seleccionó la opción de modificar la salida para explicar la respuesta en una tabla rígida que facilite la toma de decisiones rápidas, mostrando la información oficial y el siguiente paso sugerido.

#summary[
  *Instrucción Modificada (Regla 5):* \
  _5. Usa lenguaje claro y respuestas breves. Formatea siempre tu salida final en una tabla con exactamente dos columnas: 'Información Confirmada' y 'Próximo Paso sugerido'._
]

#h3[4. Simulación de Interacción con Prompt Modificado]
Al enviar la consulta sobre el domicilio, la IA responde directamente con la estructura tabular requerida:

#v(4pt)
#table(
  columns: (1fr, 1fr),
  fill: (col, row) => if row == 0 { primary } else { bg-card },
  stroke: 0.5pt + border-subtle,
  inset: (x: 10pt, y: 9pt),
  [#text(fill: white, weight: "bold", size: 8.8pt)[Información Confirmada]],
  [#text(fill: white, weight: "bold", size: 8.8pt)[Próximo Paso sugerido]],
  
  [Los residentes mayores de 18 años pueden inscribirse. La falta de un servicio a tu nombre se puede subsanar presentando una declaración jurada de domicilio. `[DOC-1]`, `[DOC-2]` #tag-ok[Conforme]],
  [Presentar tu documento de identidad y tu declaración jurada de domicilio en el Centro Comunitario (de lunes a jueves de 9:00 a 15:00) o en el portal.]
)

#v(10pt)

// ==========================================
// ESTACIÓN 2
// ==========================================
#estacion("Estación 2", "Instrucciones y conocimiento separados: Un orientador, dos bases")

En esta estación se separó explícitamente el bloque de instrucciones (que controla las reglas del diálogo) de la base de conocimiento cargada en la etiqueta `<base_conocimiento>`.

#consigna-box[
  *Materiales / Documentación Utilizada:*
  - *Base de Trámites Municipales:* `base-guia-tramites-municipales.txt` (Exenciones, reclamos, accesibilidad y canales `[AP-01]` a `[AP-08]`).
  - *Base de Capacitación de RRHH:* `base-politica-capacitacion-rrhh.txt` (Aprobaciones, destinatarios, horas y prioridades `[RH-01]` a `[RH-08]`).
]

#h3[1. Prueba con Base de Conocimiento 1: Trámites Municipales]
El asistente inicializa la conversación según la directiva obligatoria de bienvenida:

#nota[
  *Asistente:* «Base cargada. ¿Qué consulta quieres realizar?»
]

*Consulta B1: Recuperación de expediente con DNI*
#consigna-box[
  *Usuario:* «Perdí mi código de expediente de mi trámite de habilitación, ¿lo puedo consultar con mi DNI?» \
  *Asistente:* No es posible informar el estado de un expediente utilizando solamente tu nombre y apellido. Si perdiste el código, debes solicitar su recuperación de manera presencial.
  - *Fundamento:* `[AP-04]`
  - *Próximo paso:* Acércate al Centro Cívico y acredita tu identidad para recuperar el código.
  - *Límite:* Esta oficina de orientación no maneja datos de expedientes particulares.
]

*Consulta B2: Solicitud de intérprete de señas a corto plazo*
#consigna-box[
  *Usuario:* «¿Puedo pedir un intérprete de señas para mañana?» \
  *Asistente:* No es posible coordinar un intérprete para mañana. El servicio debe solicitarse con al menos 48 horas de anticipación.
  - *Fundamento:* `[AP-06]`
  - *Próximo paso:* Realiza la solicitud por teléfono o presencialmente con el plazo de anticipación requerido.
  - *Límite:* No se procesan solicitudes urgentes de un día para el otro.
]

#h3[2. Prueba con Base de Conocimiento 2: Política de Capacitación Interna (RRHH)]
Se reemplazó la base de conocimiento por la de Recursos Humanos. Al abrir la nueva conversación, la IA se inicializa de la misma manera:

#nota[
  *Asistente:* «Base cargada. ¿Qué consulta quieres realizar?»
]

*Consulta C1: Solicitud de capacitación para empleado temporal*
#consigna-box[
  *Usuario:* «Tengo un contrato temporario desde hace dos meses, ¿puedo pedir una capacitación?» \
  *Asistente:* No puedes solicitar capacitación todavía. El personal temporario debe haber completado 90 días de trabajo.
  - *Fundamento:* `[RH-01]`
  - *Próximo paso:* Espera a cumplir los 90 días de antigüedad para iniciar el trámite en el portal.
  - *Límite:* El sistema bloquea solicitudes antes del plazo mínimo.
]

*Consulta C2: Cursado de 20 horas en horario laboral*
#consigna-box[
  *Usuario:* «Quiero hacer un curso de 20 horas en total el próximo mes, ¿se puede hacer todo en horario de trabajo?» \
  *Asistente:* No se puede realizar la totalidad del curso en horario laboral. El límite máximo permitido es de 16 horas mensuales.
  - *Fundamento:* `[RH-04]`
  - *Próximo paso:* Solicita una justificación escrita a tu responsable y preséntala a RRHH para evaluar una excepción.
  - *Límite:* Las horas excedentes deberán realizarse fuera de la jornada laboral.
]

#h3[3. Intervención en Base de Conocimiento (RRHH)]
Se agregó una regla de negocio y conocimiento adicional en la base de RRHH para manejar capacitaciones en idiomas extranjeros:

#summary[
  *Nueva Entrada de Conocimiento agregada:* \
  `[RH-09] IDIOMAS EXTRANJEROS:` Las capacitaciones de idiomas (como inglés o portugués) requieren obligatoriamente un examen de nivelación previo y solo serán autorizadas si existe una relación directa justificada con proyectos internacionales vigentes del área del solicitante.
]

El asistente se inicializa con el saludo obligatorio:
#nota[*Asistente:* «Base cargada. ¿Qué consulta quieres realizar?»]

*Respuesta con Conocimiento Intervenido:*
#consigna-box[
  *Usuario:* «¿Puedo inscribirme en un curso de inglés?» \
  *Asistente:* Para inscribirte en cursos de idiomas extranjeros, requieres obligatoriamente hacer un examen de nivelación y el curso debe vincularse con proyectos internacionales vigentes de tu área.
  - *Fundamento:* `[RH-09]`
  - *Próximo paso:* Consulta con tu responsable directo si tu área posee proyectos internacionales y solicita turno para la nivelación.
  - *Límite:* Sin relación con proyectos externos el reintegro o tiempo no se autorizará.
]

#h3[4. Análisis Metacognitivo de la Arquitectura]
- *Lo que permaneció estable:* Las directivas de respuesta (brevedad, no inventar, responder solo con la base, formato de salida estructurado con fundamento/próximo paso/límite) se mantuvieron inalteradas.
- *Lo que cambió por completo:* La temática, el léxico, los plazos aplicables, los destinatarios y las restricciones organizacionales. Esto valida cómo se puede desacoplar el motor de razonamiento lógico de la base de datos documental.

#v(10pt)

// ==========================================
// ESTACIÓN 3
// ==========================================
#estacion("Estación 3", "Del texto desordenado a un CSV: Extracción y Normalización")

#consigna-box[
  *Materiales / Documentación Utilizada:*
  - Registro de inscripciones informales: `inscripciones-desestructuradas.txt` (Contiene registros de datos ficticios en formatos mixtos con errores, faltas de ID y duplicaciones).
]

En esta estación se tomó un archivo de texto con inscripciones informales en múltiples formatos, se extrajeron los campos en una tabla cruda, se aplicaron reglas estrictas de control de calidad y se exportó un CSV estandarizado.

#h3[Paso 1: Extracción Directa sin Inferencia]
Se procesó el texto crudo del archivo y se volcaron los campos exactamente en el orden solicitado, registrando alertas de extracción para campos faltantes, duplicados o inconsistentes sin realizar correcciones silenciosas.

#v(4pt)
#table(
  columns: (24pt, 46pt, 94pt, 48pt, 66pt, 40pt, 62pt, 1fr),
  fill: (col, row) => if row == 0 { primary } else if calc.even(row) { rgb("#f8fafc") } else { white },
  stroke: 0.5pt + border-subtle,
  inset: (x: 2.5pt, y: 3.5pt),
  [#text(fill: white, weight: "bold", size: 6.2pt)[id]],
  [#text(fill: white, weight: "bold", size: 6.2pt)[nombre \ completo]],
  [#text(fill: white, weight: "bold", size: 6.2pt)[email]],
  [#text(fill: white, weight: "bold", size: 6.2pt)[area]],
  [#text(fill: white, weight: "bold", size: 6.2pt)[curso \ interes]],
  [#text(fill: white, weight: "bold", size: 6.2pt)[modalidad]],
  [#text(fill: white, weight: "bold", size: 6.2pt)[disponibilidad]],
  [#text(fill: white, weight: "bold", size: 6.2pt)[observaciones]],
  
  [#text(size: 5.8pt)[p-001]], [#text(size: 5.8pt)[ana silva]], [#text(size: 5.5pt)[ANA.SILVA\@EXAMPLE.ORG]], [#text(size: 5.8pt)[Atención al Público]], [#text(size: 5.8pt)[Redacción Administrativa]], [#text(size: 5.8pt)[presencial]], [#text(size: 5.8pt)[lunes o miércoles mañana]], [#text(size: 5.8pt)[NO INFORMADO]],
  [#text(size: 5.8pt)[P002]], [#text(size: 5.8pt)[Bruno Costa]], [#text(size: 5.5pt)[bruno.costa\@example.org]], [#text(size: 5.8pt)[rrhh]], [#text(size: 5.8pt)[entrevistas laborales]], [#text(size: 5.8pt)[VIRTUAL]], [#text(size: 5.8pt)[martes después 13hs]], [#text(size: 5.8pt)[NO INFORMADO]],
  [#text(size: 5.8pt)[P-003]], [#text(size: 5.8pt)[Carla Méndez]], [#text(size: 5.5pt)[carla.mendez\@example.org]], [#text(size: 5.8pt)[Administración]], [#text(size: 5.8pt)[Compras y contrataciones]], [#text(size: 5.8pt)[NO INFORMADO]], [#text(size: 5.8pt)[Viernes de 9 a 14]], [#text(size: 5.8pt)[NO INFORMADO]],
  [#text(size: 5.8pt)[p-004]], [#text(size: 5.8pt)[diego torres]], [#text(size: 5.5pt)[diego.torres\@example.org]], [#text(size: 5.8pt)[Equipo de gestión]], [#text(size: 5.8pt)[Tableros de Gestión]], [#text(size: 5.8pt)[Virtual]], [#text(size: 5.8pt)[jueves 14:00 a 18:00]], [#text(size: 5.8pt)[ya maneja planillas básicas]],
  [#text(size: 5.8pt)[P005]], [#text(size: 5.8pt)[Elena Ruiz]], [#text(size: 5.5pt)[elena.ruiz\@example.org]], [#text(size: 5.8pt)[Atención ciudadana]], [#text(size: 5.8pt)[Atención Ciudadana]], [#text(size: 5.8pt)[presencial]], [#text(size: 5.8pt)[jueves por la mañana]], [#text(size: 5.8pt)[NO INFORMADO]],
  [#text(size: 5.8pt)[P-006]], [#text(size: 5.8pt)[Fabián Luna]], [#text(size: 5.5pt)[SIN CORREO]], [#text(size: 5.8pt)[todo el personal]], [#text(size: 5.8pt)[Protección de datos]], [#text(size: 5.8pt)[indistinta]], [#text(size: 5.8pt)[miércoles desde las 14]], [#text(size: 5.8pt)[NO INFORMADO]],
  [#text(size: 5.8pt)[P004]], [#text(size: 5.8pt)[Diego Tórres]], [#text(size: 5.5pt)[DIEGO.TORRES\@example.org]], [#text(size: 5.8pt)[Gestión]], [#text(size: 5.8pt)[indicadores capacitación]], [#text(size: 5.8pt)[virtual]], [#text(size: 5.8pt)[lunes de 15 a 18]], [#text(size: 5.8pt)[Segunda solicitud probable]],
  [#text(size: 5.8pt)[SIN-ID]], [#text(size: 5.8pt)[Gabriela Paz]], [#text(size: 5.5pt)[gabriela.paz\@example.org]], [#text(size: 5.8pt)[Área de RR.HH.]], [#text(size: 5.8pt)[selección sin sesgos]], [#text(size: 5.8pt)[NO INFORMADO]], [#text(size: 5.8pt)[viernes por la mañana]], [#text(size: 5.8pt)[NO INFORMADO]],
  [#text(size: 5.8pt)[p-008]], [#text(size: 5.8pt)[Hugo Rey]], [#text(size: 5.5pt)[hugo.rey\@example.org]], [#text(size: 5.8pt)[administración]], [#text(size: 5.8pt)[Introducción a expedientes]], [#text(size: 5.8pt)[presencial]], [#text(size: 5.8pt)[lunes 8 a 12]], [#text(size: 5.8pt)[Miércoles también 9 a 12]]
)

#h3[Paso 2: Normalización de Datos y Detección de Problemas]
Se aplicaron las reglas de normalización solicitadas: formatear ID a `P-000` (o `SIN-ID`), aplicar mayúscula inicial a nombres y minúsculas a correos, normalizar áreas al catálogo oficial (escribiendo `REVISAR` si no coinciden) y marcar potenciales duplicados.

#v(4pt)
#table(
  columns: (24pt, 44pt, 88pt, 44pt, 56pt, 34pt, 50pt, 28pt, 24pt, 1fr),
  fill: (col, row) => if row == 0 { primary } else if calc.even(row) { rgb("#f8fafc") } else { white },
  stroke: 0.5pt + border-subtle,
  inset: (x: 2.5pt, y: 3.5pt),
  [#text(fill: white, weight: "bold", size: 6.2pt)[id]],
  [#text(fill: white, weight: "bold", size: 6.2pt)[nombre]],
  [#text(fill: white, weight: "bold", size: 6.2pt)[email]],
  [#text(fill: white, weight: "bold", size: 6.2pt)[area]],
  [#text(fill: white, weight: "bold", size: 6.2pt)[curso]],
  [#text(fill: white, weight: "bold", size: 6.2pt)[modalidad]],
  [#text(fill: white, weight: "bold", size: 6.2pt)[disponibilidad]],
  [#text(fill: white, weight: "bold", size: 6.2pt)[obs]],
  [#text(fill: white, weight: "bold", size: 6.2pt)[dup]],
  [#text(fill: white, weight: "bold", size: 6.2pt)[motivo]],
  
  [#text(size: 6pt)[P-001]], [#text(size: 6pt)[Ana Silva]], [#text(size: 5.6pt)[ana.silva\@example.org]], [#text(size: 6pt)[REVISAR]], [#text(size: 6pt)[Redacción Admin.]], [#text(size: 6pt)[Presencial]], [#text(size: 6pt)[lunes o miérc. mañana]], [#text(size: 6pt)[NO INF.]], [#tag-no[NO]], [#text(size: 6pt)[Área no estándar]],
  [#text(size: 6pt)[P-002]], [#text(size: 6pt)[Bruno Costa]], [#text(size: 5.6pt)[bruno.costa\@example.org]], [#text(size: 6pt)[Recursos Humanos]], [#text(size: 6pt)[entrevistas laborales]], [#text(size: 6pt)[Virtual]], [#text(size: 6pt)[martes después 13]], [#text(size: 6pt)[NO INF.]], [#tag-no[NO]], [#tag-ok[OK]],
  [#text(size: 6pt)[P-003]], [#text(size: 6pt)[Carla Méndez]], [#text(size: 5.6pt)[carla.mendez\@example.org]], [#text(size: 6pt)[Administración]], [#text(size: 6pt)[Compras y contrat.]], [#text(size: 6pt)[No informada]], [#text(size: 6pt)[Viernes de 9 a 14]], [#text(size: 6pt)[NO INF.]], [#tag-no[NO]], [#tag-ok[OK]],
  [#text(size: 6pt)[P-004]], [#text(size: 6pt)[Diego Torres]], [#text(size: 5.6pt)[diego.torres\@example.org]], [#text(size: 6pt)[Gestión]], [#text(size: 6pt)[Tableros Gestión]], [#text(size: 6pt)[Virtual]], [#text(size: 6pt)[jueves 14 a 18]], [#text(size: 6pt)[planillas bás.]], [#tag-warn[SI]], [#text(size: 6pt)[ID/correo dup.]],
  [#text(size: 6pt)[P-005]], [#text(size: 6pt)[Elena Ruiz]], [#text(size: 5.6pt)[elena.ruiz\@example.org]], [#text(size: 6pt)[Atención ciudadana]], [#text(size: 6pt)[Atención Ciudadana]], [#text(size: 6pt)[Presencial]], [#text(size: 6pt)[jueves mañana]], [#text(size: 6pt)[NO INF.]], [#tag-no[NO]], [#tag-ok[OK]],
  [#text(size: 6pt)[P-006]], [#text(size: 6pt)[Fabián Luna]], [#text(size: 5.6pt)[NO INFORMADO]], [#text(size: 6pt)[Todo el personal]], [#text(size: 6pt)[Protección datos]], [#text(size: 6pt)[Indistinta]], [#text(size: 6pt)[miérc. desde 14]], [#text(size: 6pt)[NO INF.]], [#tag-no[NO]], [#text(size: 6pt)[Falta correo]],
  [#text(size: 6pt)[P-004]], [#text(size: 6pt)[Diego Tórres]], [#text(size: 5.6pt)[diego.torres\@example.org]], [#text(size: 6pt)[Gestión]], [#text(size: 6pt)[indicadores capac.]], [#text(size: 6pt)[Virtual]], [#text(size: 6pt)[lunes 15 a 18]], [#text(size: 6pt)[segunda sol.]], [#tag-warn[SI]], [#text(size: 6pt)[ID/correo dup.]],
  [#text(size: 6pt)[SIN-ID]], [#text(size: 6pt)[Gabriela Paz]], [#text(size: 5.6pt)[gabriela.paz\@example.org]], [#text(size: 6pt)[Recursos Humanos]], [#text(size: 6pt)[selección sin sesgos]], [#text(size: 6pt)[No informada]], [#text(size: 6pt)[viernes mañana]], [#text(size: 6pt)[NO INF.]], [#tag-no[NO]], [#text(size: 6pt)[Falta ID]],
  [#text(size: 6pt)[P-008]], [#text(size: 6pt)[Hugo Rey]], [#text(size: 5.6pt)[hugo.rey\@example.org]], [#text(size: 6pt)[Administración]], [#text(size: 6pt)[Intro expedientes]], [#text(size: 6pt)[Presencial]], [#text(size: 6pt)[lunes 8 a 12]], [#text(size: 6pt)[miérc. 9-12]], [#tag-no[NO]], [#tag-ok[OK]]
)

#pagebreak()

#summary[
  *Control de Procesamiento Realizado:* \
  Total de registros recibidos: *9* | Total de registros devueltos: *9* \
  *Alertas para intervención humana:*
  - *P-001 (Ana Silva):* Área no estándar 'Atención al Público' marcada como `REVISAR`.
  - *P-004 (Diego Torres / Tórres):* Dos solicitudes asociadas al mismo ID y correo con distinto curso y ortografía.
  - *SIN-ID (Gabriela Paz):* Registro sin identificador único asignado.
  - *P-006 (Fabián Luna):* Ficha sin correo electrónico de contacto.
]

#h3[Paso 3: Validación y Vista del Archivo CSV Normalizado]
#block(
  width: 100%,
  fill: rgb("f7f9fa"),
  stroke: 0.8pt + rgb("9eb1bb"),
  inset: (x: 8pt, y: 7pt),
  radius: 3pt,
  above: 6pt,
  below: 9pt,
  [
    #set text(font: "Consolas", size: 5.1pt)
    ```csv
    "id_registro","nombre_completo","email","area","curso_interes","modalidad","disponibilidad","observaciones","posible_duplicado","motivo_revision"
    "P-001","Ana Silva","ana.silva@example.org","REVISAR","Redacción Administrativa","Presencial","lunes o miércoles por la mañana","NO INFORMADO","NO","Área no estándar"
    "P-002","Bruno Costa","bruno.costa@example.org","Recursos Humanos","entrevistas laborales","Virtual","martes después de las 13","NO INFORMADO","NO","OK"
    "P-003","Carla Méndez","carla.mendez@example.org","Administración","Compras y contrataciones","No informada","Viernes de 9 a 14","NO INFORMADO","NO","OK"
    "P-004","Diego Torres","diego.torres@example.org","Gestión","Tableros de Gestión","Virtual","jueves 14:00 a 18:00","ya maneja planillas básicas","SI","ID y correo duplicado"
    "P-005","Elena Ruiz","elena.ruiz@example.org","Atención ciudadana","Atención Ciudadana","Presencial","jueves por la mañana","NO INFORMADO","NO","OK"
    "P-006","Fabián Luna","NO INFORMADO","Todo el personal","Protección de datos","Indistinta","puede miércoles desde las 14","NO INFORMADO","NO","Falta correo"
    "P-004","Diego Tórres","diego.torres@example.org","Gestión","indicadores de capacitación","Virtual","lunes de 15 a 18","Posiblemente sea una segunda solicitud de la misma persona","SI","ID y correo duplicado"
    "SIN-ID","Gabriela Paz","gabriela.paz@example.org","Recursos Humanos","selección sin sesgos","No informada","viernes por la mañana","NO INFORMADO","NO","Falta ID"
    "P-008","Hugo Rey","hugo.rey@example.org","Administración","Introducción a expedientes","Presencial","lunes 8 a 12","Agregó en otro mensaje que también puede los miércoles de 9 a 12","NO","OK"
    ```
  ]
)

#v(10pt)

// ==========================================
// ESTACIÓN 4
// ==========================================
#estacion("Estación 4", "Consultar y combinar un CSV: Reglas de Cruce, Horarios y Cupos")

#consigna-box[
  *Materiales / Documentación Utilizada:*
  - Catálogo estructurado de cursos: `agenda-formaciones.csv.txt` (Tabla con id, día, horario, modalidad, cupos, destinatarios y requisitos previos).
]

#h3[1. Caso de Prueba 1: Personal de Recursos Humanos]
*Consulta:* «Trabajo en RRHH, solamente puedo cursar en forma virtual y no tengo conocimientos de planillas.»

#v(4pt)
#table(
  columns: (30pt, 110pt, 45pt, 75pt, 45pt, 1fr),
  fill: (col, row) => if row == 0 { primary } else { bg-card },
  stroke: 0.5pt + border-subtle,
  inset: (x: 5pt, y: 5pt),
  [#text(fill: white, weight: "bold", size: 7.5pt)[id]],
  [#text(fill: white, weight: "bold", size: 7.5pt)[actividad]],
  [#text(fill: white, weight: "bold", size: 7.5pt)[dia]],
  [#text(fill: white, weight: "bold", size: 7.5pt)[horario]],
  [#text(fill: white, weight: "bold", size: 7.5pt)[modalidad]],
  [#text(fill: white, weight: "bold", size: 7.5pt)[motivo_eleccion]],
  
  [T02], [Entrevistas laborales], [martes], [14:00 - 16:00], [virtual], [Dirigido a RRHH, virtual y sin requisitos previos. #tag-ok[Aprobado]],
  [T04], [Protección de datos], [miércoles], [15:00 - 17:00], [virtual], [Abierto a todo el personal, virtual y sin requisitos previos. #tag-ok[Aprobado]],
  [T07], [Selección sin sesgos], [viernes], [09:00 - 11:00], [virtual], [Dirigido a RRHH, virtual y sin requisitos previos. #tag-ok[Aprobado]]
)

#nota[
  *Condiciones verificadas exitosamente:*
  - *Destinatario:* Válido (T02 y T07 para RRHH, T04 para todo el personal).
  - *Modalidad:* Válida (las tres son virtuales).
  - *Conocimientos previos:* Válidos (ninguno requiere planillas básicas).
  - *Superposición horaria:* Ninguna (martes, miércoles y viernes en horarios separados).
]

#h3[2. Caso de Prueba 2: Actividades Presenciales el Mismo Día]
*Consulta:* «Quiero dos actividades presenciales el mismo día y no puedo permanecer después de las 13:00.»

#summary[
  *Resultado del Análisis del Asistente:* \
  #tag-no[No es posible cumplir con la solicitud] \
  *Razón:* El catálogo de cursos no tiene ninguna combinación de dos actividades presenciales programadas para el mismo día. Los cursos presenciales disponibles son: T01 (lunes), T09 (martes), T03 (miércoles), T05 (jueves) y T08 (viernes). Al estar todos programados en días distintos, no se puede programar más de uno en el mismo día. \
  *Dato faltante:* Para futuras búsquedas alternas, por favor indica tus conocimientos previos y tu área de trabajo.
]

#h3[3. Intervención en las Reglas de Negocio]
Se agregó la restricción de que la suma de horas de las capacitaciones seleccionadas no exceda el límite semanal de 8 horas.

#summary[
  *Regla de Carga Horaria Máxima añadida (Regla 7):* \
  _7. La suma de la duración de las actividades combinadas seleccionadas en una semana no debe superar las 8 horas totales para el alumno._
]

Al intentar solicitar 4 cursos de 2 horas y uno de 3 horas (total 11 horas), el sistema rechazó la combinación y sugirió descartar dos actividades presenciales para mantenerse dentro de la política interna de 8 horas semanales.

#v(10pt)

// ==========================================
// ESTACIÓN OPCIONAL
// ==========================================
#estacion("Estación Opcional", "Convertir base en microjuego: Quiz con Personalidad de Moderador")

#consigna-box[
  *Materiales / Documentación Utilizada:*
  - Base de conocimiento de origen: `base-guia-tramites-municipales.txt` (Inyectada en la etiqueta `<base_del_juego>`).
]

Se configuró el asistente para ejecutar un juego educativo de preguntas sobre los trámites municipales. El prompt fue intervenido para que el moderador adopte el rol de un empleado público de mesa de entradas, cansado y reacio a dar explicaciones sencillas.

#h3[1. Configuración del Moderador Gruñón]
- Expresar desinterés o fatiga al inicio de cada ronda (usar la palabra _\*suspiro\*_).
- Reprender sutilmente al participante si comete errores básicos.
- Solo otorgar pistas de mala gana, comentando que la información está en la cartelera.

#h3[2. Simulación de la Sesión de Juego (4 Rondas)]

#consigna-box[
  *Inicio:* \
  *Asistente:* _\*Suspiro\*_ A ver, pase el que sigue... ¿Qué nivel quiere? Tengo 'inicial', 'intermedio' o 'desafiante'. Rápido que ya casi es hora de mi descanso de café. \
  \
  *Ronda 1 (Canales de Atención):* \
  *Pregunta:* ¿Se pueden iniciar trámites o enviar documentos enviando un mensaje por WhatsApp al número de la Municipalidad? \
  *Participante:* «No sé, ¿me das una pista?» \
  *Asistente:* _\*Mira el techo con resignación\*_ Pero si está en el cartel de la entrada con letras gigantes... A ver, el teléfono 0800 atiende pero no inicia nada. Y olvídese del WhatsApp, ahí no atendemos a nadie. Piense su respuesta. \
  *Participante:* «Entonces es falso, no se puede por WhatsApp.» \
  *Asistente:* Correcto, milagro de la tarde. No se reciben trámites por WhatsApp. Suma 1 punto porque pidió pista de mala gana. Vamos con la ronda 2. \
  \
  *Ronda 2 (Certificado de Residencia):* \
  *Pregunta:* Si el servicio del domicilio no está a mi nombre, ¿puedo presentar un contrato de alquiler o qué otra alternativa da la base? \
  *Participante:* «Puedo presentar una declaración jurada de domicilio.» \
  *Asistente:* _\*Sella un papel sin mirarlo\*_ Al fin alguien que lee los folletos antes de hacer la fila. Correcto, declaración jurada de domicilio. Suma 2 puntos. Total: 3 puntos. \
  \
  *Ronda 3 (Permisos de Espacios Públicos):* \
  *Pregunta:* ¿Con cuántos días hábiles de anticipación debe presentarse la solicitud de permiso para un evento en la plaza? \
  *Participante:* «Con 5 días de anticipación.» \
  *Asistente:* ¡No, señor! Cero puntos. Son diez días hábiles. Diez. Después vienen a llorar porque el trámite no sale a tiempo. Seguimos con 3 puntos. \
  \
  *Ronda 4 (Estado de Trámite):* \
  *Pregunta:* Si llama por teléfono un ciudadano y le da solo su nombre y apellido, ¿puede usted informarle el estado de su expediente? \
  *Participante:* «No, por motivos de privacidad no se da esa información solo con nombre y apellido.» \
  *Asistente:* Correcto. Sin el código de 12 caracteres no le digo nada. Privacidad es privacidad. Suma 2 puntos. Finaliza el juego. \
  \
  *Cierre del Juego:* \
  *Asistente:* Listo, juego terminado. Hizo 5 puntos de 8 posibles. Vaya a repasar la sección `[AP-03]` y `[AP-04]` de la cartelera porque la próxima vez no lo dejo pasar. ¡Que pase el siguiente!
]

#v(10pt)

// ==========================================
// PUBLICACIÓN Y REFLEXIÓN FINAL
// ==========================================
#estacion("Cierre", "Publicación, Reflexión Metacognitiva y Foro")

#h3[1. Preguntas Metacognitivas para Pensar]

- *¿Qué parte del prompt controlaba el comportamiento y cuál aportaba el conocimiento?* \
  El comportamiento es controlado por las instrucciones fijas (sistema de etiquetas como `<reglas>`, `<objetivo>`, `<formato>` y roles asignados). El conocimiento es puramente externo y proviene del bloque de datos delimitado por etiquetas como `<documentos>` o `<base_conocimiento>`, el cual puede sustituirse sin alterar la lógica de procesamiento.

- *¿Qué modificación produjo el cambio más inesperado?* \
  La introducción del rol del moderador gruñón en el microjuego. Aunque las respuestas siguieron estrictamente la guía de trámites, el cambio de tono alteró totalmente la experiencia del usuario, demostrando cómo la empatía o estilo de interacción pueden modificarse con pocas líneas de directivas estilísticas.

- *¿Dónde hizo falta que intervinieras tú y no la herramienta?* \
  En la Estación 3, durante la validación de calidad de datos. Se requirió criterio humano para decidir cómo manejar la duplicación de ID de Diego Torres (quien solicitó dos cursos válidos con el mismo identificador) y determinar que el área 'Atención al Público' debía ser revisada administrativamente por no pertenecer al catálogo estándar.

- *¿Qué uso parecido se te ocurre en una organización?* \
  Procesamiento automático de minutas de reuniones o encuestas informales hacia tablas de seguimiento y alertas gerenciales, o asistentes de soporte técnico que consulten bases de conocimiento dinámicas en tiempo real.

#h3[2. Texto para Publicación Propia en el Foro]

#summary[
  *Texto Compartido en el Foro de la Cátedra:* \
  _Estimados compañeros y docente, les comparto mis conclusiones del laboratorio:_ \
  1. *Trazabilidad:* A cada respuesta generada le dimos contexto claro y especificamos el material de donde fue extraída con su código oficial (ej. `[AP-04]` o `[RH-01]`). \
  2. *Experimentación:* El proceso de ajustar las variables una a una en cada estación resultó muy dinámico y didáctico para comprender la respuesta del modelo. \
  3. *Reflexión de la IA:* Observar cómo una pequeña directiva de comportamiento (como actuar como un empleado público gruñón) modifica radicalmente el estilo conversacional sin alterar la fidelidad a los datos crudos, demuestra que los límites de una IA no radican en lo que sabe, sino en cómo se le instruye a comunicarlo. Es un claro ejemplo de la separación entre procesamiento lógico (computación) y base cognitiva (conocimiento). \
  4. *Casos complejos:* En la Estación 3 resolvimos el duplicado de ID manteniendo ambos registros en revisión, y en la Estación 4 el control de la carga horaria semanal de 8 horas validó la capacidad de cruces aritméticos complejos.
]
