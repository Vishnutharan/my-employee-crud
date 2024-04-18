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

  constructor(private employeeService: EmployeeService, private fb: FormBuilder) {
    this.EmployeeFormgroup = this.fb.group({
      id: [""],
      name: [""],
      mobileNumber: [""],
      emailID: [""]
    });
  }

  ngOnInit(): void {
    this.getemployees();
  }

  getemployees() {
    this.employeeService.getEmployee().subscribe((response: Employee[]) => {
      console.log(response);
      this.employees = response;
    });
  }

  onSubmit() {
    console.log(this.EmployeeFormgroup.value);
    if (this.EmployeeFormgroup.value.id != null && this.EmployeeFormgroup.value.id != "") {
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
    }
    else {
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

  Fillform(emp: Employee) {
    this.EmployeeFormgroup.setValue({
      id: emp.id,
      name: emp.name,
      mobileNumber: emp.mobileNumber,
      emailID: emp.emailID,
    });
  }
  DeleteEmp(id:string){
    this.employeeService.DeleteEmployee(id).subscribe(Res => {
      console.log(Res)
    })
  }
}
