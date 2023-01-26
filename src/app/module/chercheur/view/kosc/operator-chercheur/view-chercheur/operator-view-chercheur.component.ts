import {Component, OnInit} from '@angular/core';
import {OperatorService} from 'src/app/controller/service/Operator.service';
import {OperatorVo} from 'src/app/controller/model/Operator.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-operator-view-chercheur',
  templateUrl: './operator-view-chercheur.component.html',
  styleUrls: ['./operator-view-chercheur.component.css']
})
export class OperatorViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private operatorService: OperatorService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewOperatorDialog  = false;
}

// getters and setters

get operators(): Array<OperatorVo> {
    return this.operatorService.operators;
       }
set operators(value: Array<OperatorVo>) {
        this.operatorService.operators = value;
       }

 get selectedOperator(): OperatorVo {
           return this.operatorService.selectedOperator;
       }
    set selectedOperator(value: OperatorVo) {
        this.operatorService.selectedOperator = value;
       }

   get viewOperatorDialog(): boolean {
           return this.operatorService.viewOperatorDialog;

       }
    set viewOperatorDialog(value: boolean) {
        this.operatorService.viewOperatorDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
