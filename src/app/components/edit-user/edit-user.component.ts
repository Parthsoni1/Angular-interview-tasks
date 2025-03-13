import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { select, Store } from '@ngrx/store';
import { updateUser, updateUserSuccess } from '../../store/user.actions';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class EditUserComponent implements OnInit {
  editUserForm: FormGroup;
  userId!: number ;
  private store = inject(Store);
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.editUserForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', [Validators.required]],
      status: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.userId = +this.route.snapshot.paramMap.get('id')!;
    this.loadUser();
  }

  loadUser(): void {
    this.userService.getUserById(this.userId).subscribe((user) => {
      this.editUserForm.patchValue(user);
    });
  }

  updateUser(): void {
    if (this.editUserForm.valid) {
      const updatedUser: User = {
        ...this.editUserForm.value,
        id: this.userId,
      };
      
      // Dispatch update user action
      this.store.dispatch(updateUser({ user: updatedUser }));

      // Listen for the success of the update before navigating
      this.store.pipe(select(updateUserSuccess)).subscribe(successAction => {
        if (successAction) {
          this.router.navigate(['/user-list']);
        }
      });
  }
}
}
