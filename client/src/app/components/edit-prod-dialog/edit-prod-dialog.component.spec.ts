import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProdDialogComponent } from './edit-prod-dialog.component';

describe('EditProdDialogComponent', () => {
  let component: EditProdDialogComponent;
  let fixture: ComponentFixture<EditProdDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProdDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProdDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
