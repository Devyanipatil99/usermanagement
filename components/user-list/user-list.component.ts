import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { UserFormComponent } from '../user-form/user-form.component';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-user-list',
  imports: [CommonModule, FormsModule, UserFormComponent],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  selectedUser: User | null = null;
  isEditMode: boolean = false;
  searchQuery: string = '';
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.users = this.userService.getUsers();
    this.filteredUsers = [...this.users];
  }

  onAddUser(): void {
    this.isEditMode = false;
    this.selectedUser = { id: 0, name: '', email: '', role: '' };
  }

  onEditUser(user: User): void {
    this.isEditMode = true;
    this.selectedUser = { ...user };
  }

  onSaveUser(user: User): void {
    if (this.isEditMode) {
      this.userService.updateUser(user);
    } else {
      this.userService.addUser(user);
    }
    this.loadUsers();
    this.selectedUser = null;
  }

  onCancel(): void {
    this.selectedUser = null;
  }

  onDeleteUser(user: User): void {
    if (confirm(`Are you sure you want to delete user ${user.name}?`)) {
      this.users = this.users.filter((u) => u.id !== user.id);
      this.filteredUsers = [...this.users];
    }
  }

  onSearch(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredUsers = this.users.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
    );
  }

  onSort(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.filteredUsers.sort((a, b) => {
      const aValue = (a as any)[column]?.toString().toLowerCase() || '';
      const bValue = (b as any)[column]?.toString().toLowerCase() || '';
      if (aValue < bValue) {
        return this.sortDirection === 'asc' ? -1 : 1;
      } else if (aValue > bValue) {
        return this.sortDirection === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }
}
