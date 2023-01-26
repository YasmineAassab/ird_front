import {Component, OnInit} from '@angular/core';
import {TemplateSuiviService} from 'src/app/controller/service/TemplateSuivi.service';
import {TemplateSuiviVo} from 'src/app/controller/model/TemplateSuivi.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-template-suivi-view-admin',
  templateUrl: './template-suivi-view-admin.component.html',
  styleUrls: ['./template-suivi-view-admin.component.css']
})
export class TemplateSuiviViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private templateSuiviService: TemplateSuiviService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewTemplateSuiviDialog  = false;
}

// getters and setters

get templateSuivis(): Array<TemplateSuiviVo> {
    return this.templateSuiviService.templateSuivis;
       }
set templateSuivis(value: Array<TemplateSuiviVo>) {
        this.templateSuiviService.templateSuivis = value;
       }

 get selectedTemplateSuivi(): TemplateSuiviVo {
           return this.templateSuiviService.selectedTemplateSuivi;
       }
    set selectedTemplateSuivi(value: TemplateSuiviVo) {
        this.templateSuiviService.selectedTemplateSuivi = value;
       }

   get viewTemplateSuiviDialog(): boolean {
           return this.templateSuiviService.viewTemplateSuiviDialog;

       }
    set viewTemplateSuiviDialog(value: boolean) {
        this.templateSuiviService.viewTemplateSuiviDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
