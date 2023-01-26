import {Component, OnInit} from '@angular/core';
import {KoscEmployeeService} from 'src/app/controller/service/KoscEmployee.service';
import {KoscEmployeeVo} from 'src/app/controller/model/KoscEmployee.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-kosc-employee-view-chercheur',
  templateUrl: './kosc-employee-view-chercheur.component.html',
  styleUrls: ['./kosc-employee-view-chercheur.component.css']
})
export class KoscEmployeeViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private koscEmployeeService: KoscEmployeeService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewKoscEmployeeDialog  = false;
}

// getters and setters

get koscEmployees(): Array<KoscEmployeeVo> {
    return this.koscEmployeeService.koscEmployees;
       }
set koscEmployees(value: Array<KoscEmployeeVo>) {
        this.koscEmployeeService.koscEmployees = value;
       }

 get selectedKoscEmployee(): KoscEmployeeVo {
           return this.koscEmployeeService.selectedKoscEmployee;
       }
    set selectedKoscEmployee(value: KoscEmployeeVo) {
        this.koscEmployeeService.selectedKoscEmployee = value;
       }

   get viewKoscEmployeeDialog(): boolean {
           return this.koscEmployeeService.viewKoscEmployeeDialog;

       }
    set viewKoscEmployeeDialog(value: boolean) {
        this.koscEmployeeService.viewKoscEmployeeDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
