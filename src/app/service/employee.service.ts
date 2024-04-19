import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private httpclient: HttpClient) { }
  baseurl = "http://localhost:5185/api/Employee"

  /**
   * Retrieves a list of employees from the API.
   * @returns An Observable of Employee array.
   */
  getEmployee(): Observable<Employee[]> {
    return this.httpclient.get<Employee[]>(this.baseurl);
  }

  /**
   * Creates a new employee record in the API.
   * @param emp The Employee object to create.
   * @returns An Observable of the created Employee object.
   */
  createEmployee(emp: Employee): Observable<Employee> {
    emp.id = "000000000000000"; // Assuming ID is set to a default value for creation.
    return this.httpclient.post<Employee>(this.baseurl, emp);
  }

  /**
   * Updates an existing employee record in the API.
   * @param emp The Employee object with updated data.
   * @returns An Observable of the updated Employee object.
   */
  updateEmployee(emp: Employee): Observable<Employee> {
    return this.httpclient.put<Employee>(this.baseurl + '/' + emp.id, emp);
  }

  /**
   * Deletes an employee record from the API.
   * @param id The ID of the employee to delete.
   * @returns An Observable of the deleted Employee object.
   */
  DeleteEmployee(id: string): Observable<Employee> {
    return this.httpclient.delete<Employee>(this.baseurl + '/' + id);
  }
}
