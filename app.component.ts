import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterOutlet } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { provideAnimations } from '@angular/platform-browser/animations';
import { UserListComponent } from './components/user-list/user-list.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    UserListComponent,
    RouterOutlet, // If you need routing support
  ],
  template: `
    <div class="welcome-container">
      <h1>Welcome to User Management System</h1>
    </div>
    <!-- Ensure the UserList is included only once -->
    <app-user-list></app-user-list>
  `,
  styles: [
    `
      .welcome-container {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        margin: 1px 0;
        color:green;
      }

      h1 {
        font-size: 2rem;
        font-weight: bold;
      }
    `,
  ],
})
export class AppComponent {}

