import { Injectable } from '@angular/core';
import *  as  data from './data.json';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  employees: any[] = (data as any).default.data;

  constructor() { }

  getEmployees() {
    return this.employees;
  }

  addEmployee(employee: any) {
    this.employees.push(employee);
  }

  editEmployee(employee: any, id: any) {
    Object.assign(this.employees[this.employees.findIndex(el => el.id.toString() === id.toString())], employee);
  }

  getEmployeeById(id: number) {
    return this.employees.find((item: any) => item.id.toString() === id.toString());
  }
}
