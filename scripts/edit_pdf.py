import pymupdf, shutil

PDF_PATH = r"C:\Users\Ramoncito\.antigravity-ide\Tecnolog-a-de-la-Informaci-n-2026\Actividades\Actividad-1\reporte-laboratorio-prompts.pdf"

doc = pymupdf.open(PDF_PATH)
page = doc[0]

# ═══════════════════════════════════════════════════════════
# ESTRATEGIA: borrar TODA la zona de metadatos de golpe
# y reescribirla completa desde cero.
# ═══════════════════════════════════════════════════════════

# Zona a limpiar: desde ESTUDIANTE (y=481) hasta después de Tecnología (y=600)
NUKE_RECT = pymupdf.Rect(85, 478, 500, 600)
page.add_redact_annot(NUKE_RECT, fill=(1, 1, 1))
page.apply_redactions()
print("✓ Zona completa limpiada (y=478 a y=600)")

# Verificar que no quede nada
blocks = page.get_text("dict")["blocks"]
for b in blocks:
    if b["type"] == 0:
        for line in b["lines"]:
            for span in line["spans"]:
                bbox = span["bbox"]
                if 475 < bbox[1] < 605:
                    print(f"  RESIDUO: '{span['text']}' bbox={bbox}")

# ═══════════════════════════════════════════════════════════
# REESCRIBIR TODO con las posiciones y estilos originales
# ═══════════════════════════════════════════════════════════
X0 = 93.54

# Colores originales
GRAY  = (120/255, 120/255, 120/255)  # etiquetas bold
TEAL  = (14/255, 104/255, 115/255)   # nombres
DARK  = (44/255, 62/255, 80/255)     # valores texto oscuro

# Posiciones Y (baselines) — diseño original + Alejandra añadida
# El original tenía:
#   ESTUDIANTE label:  baseline ~491  (top=481, size=10)
#   Hector:            baseline ~507  (top=496, size=11)
#   FECHA label:       baseline ~534  (top=524, size=10)
#   14 de Agosto:      baseline ~550  (top=539, size=11)
#   MATERIA label:     baseline ~576  (top=566, size=10)
#   Tecnología:        baseline ~593  (top=583, size=10)
#
# Con Alejandra, desplazamos FECHA, Agosto, MATERIA, Tecnología 16 pts abajo

texts = [
    # (baseline_y, text, fontsize, color, fontname)
    (491.3,  "ESTUDIANTE / EXPERIMENTADOR:", 10.0, GRAY, "hebo"),
    (507.0,  "Hector Daniel Ayarachi Fuentes", 11.0, TEAL, "helv"),
    (521.0,  "Alejandra Diaz",                11.0, TEAL, "helv"),
    (549.8,  "FECHA DE ENTREGA:",             10.0, GRAY, "hebo"),
    (565.6,  "14 de Agosto de 2026",          11.0, DARK, "helv"),
    (592.3,  "MATERIA / CONTEXTO:",           10.0, GRAY, "hebo"),
    (607.4,  "Tecnología de la Información para la Gestión", 10.0, (0,0,0), "helv"),
]

for y, text, size, color, font in texts:
    page.insert_text((X0, y), text, fontsize=size, color=color, fontname=font)
    print(f"  ✓ '{text}' → baseline={y}")

# Guardar
tmp = PDF_PATH + ".tmp"
doc.save(tmp)
doc.close()
shutil.move(tmp, PDF_PATH)
print("\n✓ PDF guardado exitosamente.")
