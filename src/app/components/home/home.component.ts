import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  employeeData: any;
  displayedColumns: string[] = ['id', 'fname', 'lname', 'phone', 'status', 'email', 'action'];

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private commonService: CommonService) {
    this.employeeData = new MatTableDataSource(this.commonService.getEmployees());
  }
  ngOnInit() {
    this.employeeData.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.employeeData.filter = filterValue.trim().toLowerCase();
  }
  delete(item) {
    const emp: any[] = this.commonService.getEmployees();
    for (let i = 0; i < emp.length; i++) {
      if (item.id === emp[i].id) {
        emp.splice(i, 1);
        this.employeeData = new MatTableDataSource(emp);
        this.employeeData.sort = this.sort;
      }
    }
  }
}
