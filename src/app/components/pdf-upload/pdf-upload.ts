import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pdf-upload',
  imports: [FormsModule],
  templateUrl: './pdf-upload.html',
  styleUrl: './pdf-upload.scss',
})
export class PdfUpload {
  filesChanged = output<File[]>();

  protected uploadFiles(event: any): void {
    const files: FileList = event.target.files;
    const uploadedPdfs: File[] = [];
    for (let i = 0; i < files.length; i++) {
      uploadedPdfs.push(files[i]);
    }
    this.filesChanged.emit(uploadedPdfs);
  }
}
