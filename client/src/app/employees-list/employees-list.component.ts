import { Component, OnInit } from '@angular/core'
import { Employee } from '../employee'
import { Observable } from 'rxjs'
import { EmployeeService } from '../employee.service'

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit {
  employees$: Observable<Employee[]> = new Observable()

  constructor (private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.fetchEmployees()
  }

  deleteEmployee(id: string) {
    this.employeeService.deleteEmployee(id)
      .subscribe({
        next: () => this.fetchEmployees()
      })
  }

  private fetchEmployees() {
    this.employees$ = this.employeeService.getEmployees()
  }
}
