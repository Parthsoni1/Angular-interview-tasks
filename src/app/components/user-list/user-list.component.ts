import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAllUsers } from '../../store/user.selector';
import { Observable } from 'rxjs';
import { deleteUser, loadUsers } from '../../store/user.actions';
import { StatusColorDirective } from '../../directives/status-color.directive';
import * as bootstrap from 'bootstrap';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, StatusColorDirective]
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  private store = inject(Store);
  users$: Observable<any> = this.store.select(selectAllUsers);
  userIdToDelete!: number;
  constructor(private userService: UserService, private fb: FormBuilder, private router: Router) {
      
  }

  ngOnInit(): void {
    this.store.dispatch(loadUsers());
  }

  addUserNavigate() {
    this.router.navigate(['./add-user'])
  }
  deleteUser(userId: number) {
    this.store.dispatch(deleteUser({ userId }));
  }
  editUser(id: number) {
    this.router.navigate(['./edit-user', id])
  }

  viewPosts(userId: number): void {
    this.router.navigate(['/show-posts', userId]);
  }

  confirmDelete() {
    if (this.userIdToDelete) {
      this.deleteUser(this.userIdToDelete);
  
      const modalElement = document.getElementById('exampleModal');
      if (modalElement) {
        const modalInstance = bootstrap.Modal.getInstance(modalElement); 
        if (modalInstance) {
          modalInstance.hide(); 
        }
        const modalBackdrops = document.querySelectorAll('.modal-backdrop');
        modalBackdrops.forEach((backdrop) => backdrop.remove());
    
        document.body.classList.remove('modal-open');
      }
    }
  }
}
