import { Component } from '@angular/core';
import { NgFor, NgIf, UpperCasePipe, CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Import child component (Task 8 & 9)
import { ChildComponent } from './child/child.component';

// Import custom pipe (Task 10)
import { NameTitleCasePipe } from './name-title-case.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    NgFor,
    NgIf,
    UpperCasePipe,
    CurrencyPipe,
    DatePipe,
    ChildComponent,
    NameTitleCasePipe
  ],
  template: `
    <h1>Angular Assignment</h1>

    <!-- Task 1 & 2 -->
    <h2>User Info</h2>
    <label>Name:</label>
    <input type="text" [(ngModel)]="name"><br><br>

    <label>Age:</label>
    <input type="number" [(ngModel)]="age"><br><br>

    <p>Hello {{name}}, your age is {{age}}</p>

    <!-- Task 3 -->
    <p>{{ getMessage() }}</p>

    <hr>

    <!-- Task 4 & 5 -->
    <h2>Employees</h2>
    <table border="1" cellpadding="5" *ngIf="employees.length > 0; else noEmp">
      <tr>
        <th>Code</th>
        <th>Name</th>
        <th>Gender</th>
        <th>Annual Salary</th>
        <th>Date of Birth</th>
      </tr>
      <tr *ngFor="let emp of employees">
        <td>{{ emp.code | uppercase }}</td>
        <td>{{ emp.name | nameTitleCase }}</td> <!-- Task 10 custom pipe -->
        <td>{{ emp.gender }}</td>
        <td>{{ emp.annualSalary | currency:'INR' }}</td>
        <td>{{ emp.dateOfBirth | date:'fullDate' }}</td>
      </tr>
    </table>

    <ng-template #noEmp>
      <h3>There are no records</h3>
    </ng-template>

    <hr>

    <!-- Task 6 & 7 -->
    <h2>Add Employee</h2>
    <form (ngSubmit)="addEmployee()" #empForm="ngForm">
      <input type="text" [(ngModel)]="emp.code" name="code" placeholder="Code"><br>
      <input type="text" [(ngModel)]="emp.name" name="name" placeholder="Name"><br>
      <input type="text" [(ngModel)]="emp.gender" name="gender" placeholder="Gender"><br>
      <input type="number" [(ngModel)]="emp.annualSalary" name="salary" placeholder="Salary"><br>
      <input type="date" [(ngModel)]="emp.dateOfBirth" name="dob"><br>
      <button type="submit">Add Employee</button>
    </form>

    <hr>

    <!-- Task 8: Parent -> Child -->
    <h2>Task 8: Parent → Child</h2>
    <app-child [parentMessage]="'Hello from Parent Component'"></app-child>

    <hr>

    <!-- Task 9: Child -> Parent -->
    <h2>Task 9: Child → Parent</h2>
    <app-child 
      [parentMessage]="'Child, please send me a message!'" 
      (messageEvent)="receiveMessage($event)">
    </app-child>

    <p *ngIf="childMessage">Message from Child: {{ childMessage }}</p>
  `
})
export class App {
  name: string = 'Karthik';
  age: number = 25;

  employees: any[] = [
    { code: 'emp101', name: 'karthik', gender: 'Male', annualSalary: 5500, dateOfBirth: '1988-06-25' },
    { code: 'emp102', name: 'sachin', gender: 'Male', annualSalary: 5700.95, dateOfBirth: '1982-06-09' },
    { code: 'emp103', name: 'rahul', gender: 'Male', annualSalary: 5900, dateOfBirth: '1979-08-12' },
    { code: 'emp104', name: 'mary', gender: 'Female', annualSalary: 6500.826, dateOfBirth: '1980-10-14' },
  ];

  emp: any = {};

  childMessage: string = ''; // Task 9 variable

  getMessage() {
    if (this.age < 13) return `Hello ${this.name}, you are a child`;
    else if (this.age >= 13 && this.age <= 19) return `Hello ${this.name}, you are a teenager`;
    else return `Hello ${this.name}, you are an adult`;
  }

  addEmployee() {
    this.employees.push(this.emp);
    this.emp = {}; // clear form
  }

  receiveMessage(message: string) {
    this.childMessage = message;
  }
}
