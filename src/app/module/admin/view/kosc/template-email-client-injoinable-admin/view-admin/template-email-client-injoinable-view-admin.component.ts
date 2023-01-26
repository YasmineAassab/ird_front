import {Component, OnInit} from '@angular/core';
import {TemplateEmailClientInjoinableService} from 'src/app/controller/service/TemplateEmailClientInjoinable.service';
import {TemplateEmailClientInjoinableVo} from 'src/app/controller/model/TemplateEmailClientInjoinable.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-template-email-client-injoinable-view-admin',
  templateUrl: './template-email-client-injoinable-view-admin.component.html',
  styleUrls: ['./template-email-client-injoinable-view-admin.component.css']
})
export class TemplateEmailClientInjoinableViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private templateEmailClientInjoinableService: TemplateEmailClientInjoinableService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewTemplateEmailClientInjoinableDialog  = false;
}

// getters and setters

get templateEmailClientInjoinables(): Array<TemplateEmailClientInjoinableVo> {
    return this.templateEmailClientInjoinableService.templateEmailClientInjoinables;
       }
set templateEmailClientInjoinables(value: Array<TemplateEmailClientInjoinableVo>) {
        this.templateEmailClientInjoinableService.templateEmailClientInjoinables = value;
       }

 get selectedTemplateEmailClientInjoinable(): TemplateEmailClientInjoinableVo {
           return this.templateEmailClientInjoinableService.selectedTemplateEmailClientInjoinable;
       }
    set selectedTemplateEmailClientInjoinable(value: TemplateEmailClientInjoinableVo) {
        this.templateEmailClientInjoinableService.selectedTemplateEmailClientInjoinable = value;
       }

   get viewTemplateEmailClientInjoinableDialog(): boolean {
           return this.templateEmailClientInjoinableService.viewTemplateEmailClientInjoinableDialog;

       }
    set viewTemplateEmailClientInjoinableDialog(value: boolean) {
        this.templateEmailClientInjoinableService.viewTemplateEmailClientInjoinableDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
