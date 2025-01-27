import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-user-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent {
  @Input() user: User = { id: 0, name: '', email: '', role: '' };
  @Input() isEditMode: boolean = false;
  @Output() save = new EventEmitter<User>();
  @Output() cancel = new EventEmitter<void>();

  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
    });
  }

  ngOnChanges(): void {
    if (this.user) {
      this.userForm.setValue({
        name: this.user.name,
        email: this.user.email,
        role: this.user.role,
      });
    }
  }

  onSave(): void {
    if (this.userForm.valid) {
      this.save.emit({ ...this.user, ...this.userForm.value });
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
