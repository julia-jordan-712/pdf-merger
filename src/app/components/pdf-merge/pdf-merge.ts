import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PDFDocument } from 'pdf-lib';

@Component({
  selector: 'app-pdf-merge',
  imports: [FormsModule],
  templateUrl: './pdf-merge.html',
  styleUrl: './pdf-merge.scss',
})
export class PdfMerge {
  $pdfs = input.required<File[]>();

  newFileName: string = 'merged';

  protected async downloadMergedPDF(): Promise<void> {
    const mergedPdf: Uint8Array = await this.mergePdfs();
    this.downloadPdf(mergedPdf);
  }

  /**
   * Coordinates the merging of multiple PDFs into a single PDF.
   * Reads and processes the uploaded PDF files and stores the merged PDF.
   */
  private async mergePdfs(): Promise<Uint8Array<ArrayBufferLike>> {
    const pdfs = await Promise.all(
      this.$pdfs().map((file) => this.readPDF(file))
    );
    return await this.mergePDFsIntoOne(pdfs);
  }

  private async readPDF(file: File): Promise<Uint8Array> {
    return new Promise<Uint8Array>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          resolve(new Uint8Array(event.target.result as ArrayBuffer));
        } else {
          reject('Could not read the PDF file');
        }
      };
      reader.readAsArrayBuffer(file);
    });
  }

  /** this function is merging PDFs and return the PDFs data as a Unit8Array*/
  private async mergePDFsIntoOne(pdfs: Uint8Array[]): Promise<Uint8Array> {
    const mergedPdf = await PDFDocument.create();
    for (const pdfBytes of pdfs) {
      const pdf = await PDFDocument.load(pdfBytes);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => {
        mergedPdf.addPage(page);
      });
    }
    return await mergedPdf.save();
  }

  private downloadPdf(pdf: Uint8Array<ArrayBufferLike>): void {
    const blob = new Blob([pdf], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style.display = 'none';
    a.href = url;

    a.download = `${this.newFileName.trim()}.pdf`;

    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }
}
