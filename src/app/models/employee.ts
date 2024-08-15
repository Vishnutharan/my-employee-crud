export interface Employee {
   id: string;
   name: string;
   mobileNumber: string;
   emailID: string;
   enp?: string; // Add this line if it's not already present
 }
 

/*
1. Component Initialization
   |
   v
2. ngOnInit() -> this.getemployees()
   |
   v
3. getemployees() -> employeeService.getEmployee()
   |
   v
4. employeeService.getEmployee() -> API Call to fetch employee data
   |
   v
5. Employee data received -> Populate employees array
   |
   v
6. User interacts with the form:
   |  |-> Fillform(emp) -> Populate form with employee data for editing
   |  |-> DeleteEmp(id) -> employeeService.DeleteEmployee(id)
   |
   v
7. onSubmit()
   |  |-> Check if id is present
   |     |-> Yes: updateEmployee() -> API Call to update employee data
   |     |-> No: createEmployee() -> API Call to create new employee
   |
   v
8. Form submitted -> Refresh employee list
 */



/* +---------------------+    uses    +-------------------+
|      AppComponent   |<---------->|   EmployeeService |
+---------------------+            +-------------------+
| - employees: Employee[]          | - getEmployee()   |
| - EmployeeFormgroup: FormGroup   | - createEmployee()|
| + ngOnInit(): void               | - updateEmployee()|
| + getemployees(): void           | - deleteEmployee()|
| + onSubmit(): void               +-------------------+
| + Fillform(emp: Employee): void  |                  |
| + DeleteEmp(id: string): void    |                  |
+---------------------+            +-------------------+
         |
         v
+---------------------+
|     Employee        |
+---------------------+
| - id: string        |
| - name: string      |
| - mobileNumber: string |
| - emailID: string   |
+---------------------+
  


*/



/* 

class AppComponent {
  - employees: Employee[]
  - EmployeeFormgroup: FormGroup
  + ngOnInit(): void
  + getemployees(): void
  + onSubmit(): void
  + Fillform(emp: Employee): void
  + DeleteEmp(id: string): void
}

class EmployeeService {
  + getEmployee(): Observable<Employee[]>
  + createEmployee(employee: Employee): Observable<any>
  + updateEmployee(employee: Employee): Observable<any>
  + deleteEmployee(id: string): Observable<any>
}

class Employee {
  - id: string
  - name: string
  - mobileNumber: string
  - emailID: string
}


*/