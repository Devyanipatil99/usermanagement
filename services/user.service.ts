import { Injectable } from '@angular/core';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = [
    { id:1,name: 'Adi', email: 'Adi@example.com', role: 'User' },
    { id:2,name: 'Devyani', email: 'Devyani@example.com', role: 'HR' },
    { id:2,name: 'Dipak', email: 'Dipak@example.com', role: 'Issue Solver' },
    { id:4,name: 'Dipika', email: 'Dipika@example.com', role: 'Support' },
    { id:5,name: 'Vanita', email: 'Vanita@example.com', role: 'Admin' },
    { id:6,name: 'Suchita', email: 'Suchita@example.com', role: 'Moderator' },
    { id:7,name: 'Gaurav', email: 'Gaurav@example.com', role: 'Customer' },
    { id:8,name: 'Ravalu', email: 'Ravalu@example.com', role: 'Owner' },
    { id:9,name: 'Suresh', email: 'Suresh@example.com', role: 'General Manager' },
    { id:10,name: 'Saurabh', email: 'Saurabh@example.com', role: 'Technician' },
    { id:11,name: 'Neha', email: 'Neha@example.com', role: 'Database Handler' },
    // Add other users as needed...
  ];

  getUsers(): User[] {
    return [...this.users];
  }

  addUser(user: User): void {
    user.id = this.users.length + 1;
    this.users.push(user);
  }

  updateUser(user: User): void {
    const index = this.users.findIndex((u) => u.id === user.id);
    if (index !== -1) {
      this.users[index] = user;
    }
  }
}
