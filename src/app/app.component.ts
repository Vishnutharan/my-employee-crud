import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './service/employee.service';
import { Employee } from './models/employee';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  employees: Employee[] = [];
  EmployeeFormgroup: FormGroup;

  constructor(
    private employeeService: EmployeeService,
    private fb: FormBuilder
  ) {
    // Initialize the form group for employee data
    this.EmployeeFormgroup = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      emailID: ['', [Validators.required, Validators.email]],
      enp: ['', Validators.required] // Add the enp field with validation
    });
  }

  ngOnInit(): void {
    // Load employees data when the component initializes
    this.getemployees();  // Call the method to fetch employees data or perform initialization
  }

  // Fetches employees data from the service
  getemployees() {
    this.employeeService.getEmployee().subscribe((response: Employee[]) => {
      console.log(response);
      this.employees = response;
    });
  }

  // Handles form submission for creating or updating an employee
  onSubmit() {
    const employeeData = this.EmployeeFormgroup.value;
    console.log(employeeData);

    if (employeeData.id) {
      // Update existing employee
      this.employeeService.updateEmployee(employeeData).subscribe(
        response => {
          console.log(response);
          this.getemployees();
          this.EmployeeFormgroup.reset();
        },
        error => {
          console.error('Error updating employee:', error);
          if (error.status === 400 && error.error.errors) {
            console.error('Validation errors:', error.error.errors);
          }
        }
      );
    } else {
      // Create new employee
      const { id, ...newEmployeeData } = employeeData; // Exclude id for new employees
      this.employeeService.createEmployee(newEmployeeData).subscribe(
        response => {
          console.log(response);
          this.getemployees();
          this.EmployeeFormgroup.reset();
        },
        error => {
          console.error('Error creating employee:', error);
          if (error.status === 400 && error.error.errors) {
            console.error('Validation errors:', error.error.errors);
          }
        }
      );
    }
  }

  // Fills the form with data for editing an employee
  Fillform(emp: Employee) {
    this.EmployeeFormgroup.setValue({
      id: emp.id,
      name: emp.name,
      mobileNumber: emp.mobileNumber,
      emailID: emp.emailID,
      enp: emp.enp || '' // Ensure enp is set, default to empty string if not provided
    });
  }

  // Deletes an employee
  DeleteEmp(id: string) {
    this.employeeService.DeleteEmployee(id).subscribe(Res => {
      console.log(Res);
      this.getemployees();
    });
  }
}
