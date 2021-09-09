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
import { AlbumJoinCancionComponent } from './album-join-cancion.component';

describe('AlbumJoinCancionComponent', () => {
  let component: AlbumJoinCancionComponent;
  let fixture: ComponentFixture<AlbumJoinCancionComponent>;
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        CommonModule,
        BrowserAnimationsModule, // required animations module
        ToastrModule.forRoot(), // ToastrModule added
      ],
      providers: [
        // reference the new instance of formBuilder from above
        { provide: FormBuilder, useValue: formBuilder }
      ],
      declarations: [ AlbumJoinCancionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumJoinCancionComponent);
    component = fixture.componentInstance;

    component.albumCancionForm = formBuilder.group({
      tituloAlbum: ["", [Validators.required]],
      idCancion: ["", [Validators.required]],
      tituloCancion: ["", [Validators.required]]
    })
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
