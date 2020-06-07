import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-edit-details',
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.scss']
})
export class EditDetailsComponent implements OnInit {
  employee: any;
  isNew = true;
  employeeId: any;
  employeeForm: FormGroup;
  statuses: any[] = ['Active', 'Inactive'];

  constructor(
    private activatedRoute: ActivatedRoute,
    private commonService: CommonService,
    private fb: FormBuilder,
    private route: Router) {
    this.activatedRoute.params.subscribe(params => {
      if (params && params.id) {
        this.employeeId = params.id;
        this.getEmployeeData(params.id);
      } else {
        this.initFormControl(null);
      }
    });
  }
  ngOnInit(): void {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.

  }
  initFormControl(employee) {
    this.employeeForm = this.fb.group({
      fname: new FormControl(employee ? employee.fname : null, Validators.required),
      lname: new FormControl(employee ? employee.lname : null, Validators.required),
      phone: new FormControl(employee ? employee.phone : null, Validators.required),
      email: new FormControl(employee ? employee.email : null, [Validators.required, Validators.email]),
      status: new FormControl(employee ? employee.status : null, Validators.required),
    });
  }

  getEmployeeData(id: number) {
    this.isNew = false;
    this.employee = this.commonService.getEmployeeById(id);
    this.initFormControl(this.employee);
  }

  onSave() {
    const employee = this.commonService.getEmployees();
    if (this.isNew) {
      const obj = this.employeeForm.value;
      obj.id = employee.length + 1;
      this.commonService.addEmployee(obj);
    } else {
      this.commonService.editEmployee(this.employeeForm.value, this.employeeId);
    }
    this.route.navigate(['/dashboard']);
  }
}
