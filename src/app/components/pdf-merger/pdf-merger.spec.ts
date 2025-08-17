import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PdfMerger } from './pdf-merger';

describe('PdfUpload', () => {
  let component: PdfMerger;
  let fixture: ComponentFixture<PdfMerger>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdfMerger]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdfMerger);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
