
import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { addUser, addUserSuccess } from '../../store/user.actions';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  imports: [CommonModule,ReactiveFormsModule],
  standalone: true
})
export class AddUserComponent {
  addUserForm: FormGroup;
  private store = inject(Store);
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.addUserForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  addUser(): void {
    if (this.addUserForm.valid) {
      const user = this.addUserForm.value; 
      this.store.dispatch(addUser({ user }));
      this.store.pipe(select(addUserSuccess)).subscribe(successAction => {
        if (successAction) {
          this.router.navigate(['/user-list']);
        }
      });

      
    }
  }
}
