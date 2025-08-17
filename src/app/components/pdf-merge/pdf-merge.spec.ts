import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfMerge } from './pdf-merge';

describe('PdfMerge', () => {
  let component: PdfMerge;
  let fixture: ComponentFixture<PdfMerge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdfMerge]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdfMerge);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
