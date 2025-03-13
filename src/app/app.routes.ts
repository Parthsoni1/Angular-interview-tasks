import { Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { AuthGuard } from './guards/auth.guard';
import { AddUserComponent } from './components/add-user/add-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { ShowPostsComponent } from './components/show-posts/show-posts.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },  
    { path: 'login', component: LoginComponent },
    { path: 'user-list', component: UserListComponent },
    { path: 'add-user', component: AddUserComponent, canActivate: [AuthGuard] },
    { path: 'edit-user/:id', component: EditUserComponent, canActivate: [AuthGuard] },
    { path: 'show-posts/:userId', component: ShowPostsComponent, canActivate: [AuthGuard] },
  
];
