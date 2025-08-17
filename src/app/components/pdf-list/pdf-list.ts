import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-pdf-list',
  imports: [CdkDrag, CdkDropList],
  templateUrl: './pdf-list.html',
  styleUrl: './pdf-list.scss',
})
export class PdfList {
  $pdfs = input.required<File[]>();
  filesChanged = output<File[]>();

  drop(event: CdkDragDrop<string[]>) {
    const pdfs = this.$pdfs();
    if (!pdfs || pdfs.length === 0) {
      return;
    }
    // Reorder the files in the array based on the drag-and-drop event
    moveItemInArray(pdfs, event.previousIndex, event.currentIndex);
    this.filesChanged.emit(pdfs);
  }
}
