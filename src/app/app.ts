import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PdfMerger } from './components/pdf-merger/pdf-merger';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PdfMerger],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('pdf-merger');
}
