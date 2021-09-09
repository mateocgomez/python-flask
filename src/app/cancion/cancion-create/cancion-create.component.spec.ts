/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormBuilder, FormsModule, Validators } from '@angular/forms'  
import { ReactiveFormsModule} from '@angular/forms' 
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';

import { CancionCreateComponent } from './cancion-create.component';
import { CancionModule } from '../cancion.module';

describe('CancionCreateComponent', () => {
  let component: CancionCreateComponent;
  let fixture: ComponentFixture<CancionCreateComponent>;
  const formBuilder: FormBuilder = new FormBuilder();


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        BrowserAnimationsModule, // required animations module
        ToastrModule.forRoot(), // ToastrModule added
        CancionModule
      ],
      providers: [
        // reference the new instance of formBuilder from above
        { provide: FormBuilder, useValue: formBuilder }
      ],
      declarations: [ CancionCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancionCreateComponent);
    component = fixture.componentInstance;

    // pass in the form dynamically
    component.cancionForm = formBuilder.group({
      titulo: ["", [Validators.required, Validators.maxLength(128)]],
      minutos: ["", [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(2)]],
      segundos: ["", [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(2)]],
      interprete: ["", [Validators.required, Validators.maxLength(128)]]
    })

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
