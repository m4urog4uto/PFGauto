import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from 'src/app/core/models';


interface DialogData {
  course: Course;
}

interface Duration {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal-form-course.component.html',
  styleUrls: ['./modal-form-course.component.css']
})
export class ModalFormCourseComponent {

  courseForm: FormGroup;

  courseNameCtrl: FormControl<string | null>;
  descriptionCtrl: FormControl<string | null>;
  durationCtrl: FormControl<string | null>;

  durations: Duration[] = [
    {value: '1 mes', viewValue: '1 mes'},
    {value: '2 meses', viewValue: '2 meses'},
    {value: '3 meses', viewValue: '3 meses'},
    {value: '4 meses', viewValue: '4 meses'},
    {value: '5 meses', viewValue: '5 meses'},
    {value: '6 meses', viewValue: '6 meses'}
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<ModalFormCourseComponent>,
    public formBuilder: FormBuilder
  ) {
    const { id, courseName, description, duration } = data.course;
    
    this.courseNameCtrl = new FormControl(courseName, [ Validators.required ]);
    this.descriptionCtrl = new FormControl(description, [ Validators.required ]);
    this.durationCtrl = new FormControl(duration, [ Validators.required ]);

    this.courseForm = this.formBuilder.group({
      id: new FormControl(id, []), 
      courseName: this.courseNameCtrl,
      description: this.descriptionCtrl,
      duration: this.durationCtrl,
    });
  }

  onSubmit(): void {
    this.dialogRef.close(this.courseForm.value);
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
