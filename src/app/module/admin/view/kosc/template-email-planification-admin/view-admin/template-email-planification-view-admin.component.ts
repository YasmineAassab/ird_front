import {Component, OnInit} from '@angular/core';
import {TemplateEmailPlanificationService} from 'src/app/controller/service/TemplateEmailPlanification.service';
import {TemplateEmailPlanificationVo} from 'src/app/controller/model/TemplateEmailPlanification.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-template-email-planification-view-admin',
  templateUrl: './template-email-planification-view-admin.component.html',
  styleUrls: ['./template-email-planification-view-admin.component.css']
})
export class TemplateEmailPlanificationViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private templateEmailPlanificationService: TemplateEmailPlanificationService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewTemplateEmailPlanificationDialog  = false;
}

// getters and setters

get templateEmailPlanifications(): Array<TemplateEmailPlanificationVo> {
    return this.templateEmailPlanificationService.templateEmailPlanifications;
       }
set templateEmailPlanifications(value: Array<TemplateEmailPlanificationVo>) {
        this.templateEmailPlanificationService.templateEmailPlanifications = value;
       }

 get selectedTemplateEmailPlanification(): TemplateEmailPlanificationVo {
           return this.templateEmailPlanificationService.selectedTemplateEmailPlanification;
       }
    set selectedTemplateEmailPlanification(value: TemplateEmailPlanificationVo) {
        this.templateEmailPlanificationService.selectedTemplateEmailPlanification = value;
       }

   get viewTemplateEmailPlanificationDialog(): boolean {
           return this.templateEmailPlanificationService.viewTemplateEmailPlanificationDialog;

       }
    set viewTemplateEmailPlanificationDialog(value: boolean) {
        this.templateEmailPlanificationService.viewTemplateEmailPlanificationDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
