import pymupdf

PDF_PATH = r"C:\Users\Ramoncito\.antigravity-ide\Tecnolog-a-de-la-Informaci-n-2026\Actividades\Actividad-1\reporte-laboratorio-prompts.pdf"

doc = pymupdf.open(PDF_PATH)
page = doc[0]

print("=== TODOS LOS TEXTOS EN ZONA y=480-540 ===")
blocks = page.get_text("dict")["blocks"]
for b in blocks:
    if b["type"] == 0:
        for line in b["lines"]:
            for span in line["spans"]:
                bbox = span["bbox"]
                if 480 < bbox[1] < 540:
                    txt = repr(span["text"])
                    r, g, b2 = (span["color"]>>16)&0xFF, (span["color"]>>8)&0xFF, span["color"]&0xFF
                    print(f"  TEXT={txt}")
                    print(f"    bbox=({bbox[0]:.1f}, {bbox[1]:.1f}, {bbox[2]:.1f}, {bbox[3]:.1f})")
                    print(f"    size={span['size']}  color=RGB({r},{g},{b2})  font={span['font']}")

doc.close()
