import {Component, OnInit} from '@angular/core';
import {TemplateEmailReplanificationService} from 'src/app/controller/service/TemplateEmailReplanification.service';
import {TemplateEmailReplanificationVo} from 'src/app/controller/model/TemplateEmailReplanification.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-template-email-replanification-view-admin',
  templateUrl: './template-email-replanification-view-admin.component.html',
  styleUrls: ['./template-email-replanification-view-admin.component.css']
})
export class TemplateEmailReplanificationViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private templateEmailReplanificationService: TemplateEmailReplanificationService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewTemplateEmailReplanificationDialog  = false;
}

// getters and setters

get templateEmailReplanifications(): Array<TemplateEmailReplanificationVo> {
    return this.templateEmailReplanificationService.templateEmailReplanifications;
       }
set templateEmailReplanifications(value: Array<TemplateEmailReplanificationVo>) {
        this.templateEmailReplanificationService.templateEmailReplanifications = value;
       }

 get selectedTemplateEmailReplanification(): TemplateEmailReplanificationVo {
           return this.templateEmailReplanificationService.selectedTemplateEmailReplanification;
       }
    set selectedTemplateEmailReplanification(value: TemplateEmailReplanificationVo) {
        this.templateEmailReplanificationService.selectedTemplateEmailReplanification = value;
       }

   get viewTemplateEmailReplanificationDialog(): boolean {
           return this.templateEmailReplanificationService.viewTemplateEmailReplanificationDialog;

       }
    set viewTemplateEmailReplanificationDialog(value: boolean) {
        this.templateEmailReplanificationService.viewTemplateEmailReplanificationDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
