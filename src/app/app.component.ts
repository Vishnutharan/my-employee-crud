import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './service/employee.service';
import { Employee } from './models/employee';
import { FormBuilder, FormGroup } from '@angular/forms';

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
      id: [""],
      name: [""],
      mobileNumber: [""],
      emailID: [""]
    });
  }

  ngOnInit(): void {
    // Load employees data when the component initializes
    // This method is called by Angular when the component is initialized.
    // It's used here to trigger the loading of employees data or perform any other initialization tasks related to employees.
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
    console.log(this.EmployeeFormgroup.value);
    if (this.EmployeeFormgroup.value.id != null && this.EmployeeFormgroup.value.id != "") {
      // Update existing employee
      this.employeeService.updateEmployee(this.EmployeeFormgroup.value).subscribe(response => {
        console.log(response);
        this.getemployees();
        this.EmployeeFormgroup.setValue({
          id: "",
          name: "",
          mobileNumber: "",
          emailID: "",
        });
      });
    } else {
      // Create new employee
      this.employeeService.createEmployee(this.EmployeeFormgroup.value).subscribe(response => {
        console.log(response);
        this.getemployees();
        this.EmployeeFormgroup.setValue({
          id: "",
          name: "",
          mobileNumber: "",
          emailID: "",
        });
      });
    }
  }

  // Fills the form with data for editing an employee
  Fillform(emp: Employee) {
    this.EmployeeFormgroup.setValue({
      id: emp.id,
      name: emp.name,
      mobileNumber: emp.mobileNumber,
      emailID: emp.emailID,
    });
  }

  // Deletes an employee
  DeleteEmp(id: string) {
    this.employeeService.DeleteEmployee(id).subscribe(Res => {
      console.log(Res)
    });
  }
}
