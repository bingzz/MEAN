import { Injectable } from '@angular/core'
import { Employee } from './employee'
import { Observable, Subject } from 'rxjs'
import { HttpClient } from '@angular/common/http'

const url = 'http://localhost:5200'
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employees$: Subject<Employee[]> = new Subject()

  constructor (private httpClient: HttpClient) { }

  private refreshEmployees() {
    this.httpClient.get<Employee[]>(url + '/employees')
      .subscribe(employees => {
        this.employees$.next(employees)
      })
  }

  getEmployees(): Subject<Employee[]> {
    this.refreshEmployees()
    return this.employees$
  }

  createEmployee(employee: Employee): Observable<string> {
    return this.httpClient.post(url + '/employees', employee, { responseType: 'text' })
  }

  updateEmployee(id: string, employee: Employee): Observable<string> {
    return this.httpClient.put(url + `employees/${id}`, employee, { responseType: 'text' })
  }

  deleteEmployee(id: string): Observable<string> {
    return this.httpClient.delete(url + `employees/${id}`, { responseType: 'text' })
  }
}
