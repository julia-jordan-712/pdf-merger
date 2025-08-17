import { Component } from '@angular/core';
import { PDFDocument } from 'pdf-lib';
import { FormsModule } from '@angular/forms';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-pdf-merger',
  imports: [FormsModule, CdkDrag, CdkDropList],
  templateUrl: './pdf-merger.html',
  styleUrl: './pdf-merger.scss'
})
export class PdfMerger {

  uploadedPdfs: File[] = [];
  mergedPdf: Uint8Array | null = null;
  // In Ihrer Angular-Komponente (z. B. app-pdf-upload.component.ts)
  newFileName: string = 'neuer_dateiname.pdf'; // Standardwert für den Dateinamen

  /**
  * Coordinates the merging of multiple PDFs into a single PDF.
  * Reads and processes the uploaded PDF files and stores the merged PDF.
  */
  async coordinateMergePDFs() {
    const pdfs = await Promise.all(this.uploadedPdfs.map(file => this.readPDF(file)));
    this.mergedPdf = await this.mergePDFsIntoOne(pdfs);
  }


  async readPDF(file: File): Promise<Uint8Array> {
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
  async mergePDFsIntoOne(pdfs: Uint8Array[]): Promise<Uint8Array> {
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

  reorderFiles(event: any) {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.uploadedPdfs.push(files[i]);
    }
    this.coordinateMergePDFs();
  }

  downloadMergedPDF() {
    if (!this.mergedPdf) {
      return;
    }
    const blob = new Blob([this.mergedPdf], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style.display = 'none';
    a.href = url;

    // Verwenden Sie den Wert aus dem Textfeld als Dateinamen
    a.download = this.newFileName; // Hier wird der Dateiname aus dem Textfeld verwendet

    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.uploadedPdfs, event.previousIndex, event.currentIndex);
    this.coordinateMergePDFs();
  }

}