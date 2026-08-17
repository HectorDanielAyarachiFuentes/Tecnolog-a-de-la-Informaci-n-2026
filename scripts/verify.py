import pymupdf
doc = pymupdf.open(r"C:\Users\Ramoncito\.antigravity-ide\Tecnolog-a-de-la-Informaci-n-2026\Actividades\Actividad-1\reporte-laboratorio-prompts.pdf")
page = doc[0]
for b in page.get_text("dict")["blocks"]:
    if b["type"] == 0:
        for l in b["lines"]:
            for s in l["spans"]:
                if 475 < s["bbox"][1] < 615:
                    print(f"  {s['text']:48s}  y=({s['bbox'][1]:.0f}-{s['bbox'][3]:.0f})")
doc.close()
