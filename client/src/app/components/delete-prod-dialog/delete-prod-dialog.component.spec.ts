import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProdDialogComponent } from './delete-prod-dialog.component';

describe('DeleteProdDialogComponent', () => {
  let component: DeleteProdDialogComponent;
  let fixture: ComponentFixture<DeleteProdDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteProdDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteProdDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
