#!/usr/bin/env python3
"""Generate placeholder PDF files for CV downloads."""
import os

def make_pdf(filename, title, subtitle, body):
    objects = []
    objects.append(b'1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj')
    objects.append(b'2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj')
    objects.append(b'3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\nendobj')
    objects.append(b'5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj')

    stream = 'BT /F1 24 Tf 180 750 Td (%s) Tj ET BT /F1 12 Tf 170 720 Td (%s) Tj ET BT /F1 10 Tf 72 680 Td (%s) Tj ET' % (title, subtitle, body)
    stream = stream.encode()
    stream_obj = ('4 0 obj\n<< /Length %d >>\nstream\n' % len(stream)).encode() + stream + b'\nendstream\nendobj'
    objects.insert(3, stream_obj)

    pdf = b'%PDF-1.4\n'
    offsets = []
    for obj in objects:
        offsets.append(len(pdf))
        pdf += obj + b'\n'

    xref_offset = len(pdf)
    pdf += ('xref\n0 %d\n0000000000 65535 f \n' % (len(objects) + 1)).encode()
    for off in offsets:
        pdf += ('%010d 00000 n \n' % off).encode()

    pdf += ('trailer\n<< /Size %d /Root 1 0 R >>\nstartxref\n%d\n%%%%EOF' % (len(objects) + 1, xref_offset)).encode()

    os.makedirs(os.path.dirname(filename), exist_ok=True)
    with open(filename, 'wb') as f:
        f.write(pdf)

make_pdf('public/cv/Mustafa_Ozkan_CV_EN.pdf', 'Mustafa Ozkan', 'Curriculum Vitae - English', 'Placeholder CV. Replace this file with your actual CV.')
make_pdf('public/cv/Mustafa_Ozkan_CV_TR.pdf', 'Mustafa Ozkan', 'Ozgecmis - Turkce', 'Yer tutucu CV. Bu dosyayi gercek CV dosyanizla degistirin.')
print('PDFs created successfully')
