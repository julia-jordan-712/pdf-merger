import { Component } from '@angular/core';
import { PdfList } from '@app/components/pdf-list/pdf-list';
import { PdfMerge } from '@app/components/pdf-merge/pdf-merge';
import { PdfUpload } from '@app/components/pdf-upload/pdf-upload';

@Component({
  selector: 'app-pdf-merger',
  imports: [PdfList, PdfMerge, PdfUpload],
  templateUrl: './pdf-merger.html',
  styleUrl: './pdf-merger.scss',
})
export class PdfMerger {
  pdfs: File[] = [];

  protected addFiles(files: File[]): void {
    this.pdfs.push(...files);
  }

  protected setFiles(files: File[]): void {
    this.pdfs = files;
  }
}
