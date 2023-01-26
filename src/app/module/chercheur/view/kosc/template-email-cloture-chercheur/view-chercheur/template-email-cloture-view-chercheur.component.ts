import {Component, OnInit} from '@angular/core';
import {TemplateEmailClotureService} from 'src/app/controller/service/TemplateEmailCloture.service';
import {TemplateEmailClotureVo} from 'src/app/controller/model/TemplateEmailCloture.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-template-email-cloture-view-chercheur',
  templateUrl: './template-email-cloture-view-chercheur.component.html',
  styleUrls: ['./template-email-cloture-view-chercheur.component.css']
})
export class TemplateEmailClotureViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private templateEmailClotureService: TemplateEmailClotureService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewTemplateEmailClotureDialog  = false;
}

// getters and setters

get templateEmailClotures(): Array<TemplateEmailClotureVo> {
    return this.templateEmailClotureService.templateEmailClotures;
       }
set templateEmailClotures(value: Array<TemplateEmailClotureVo>) {
        this.templateEmailClotureService.templateEmailClotures = value;
       }

 get selectedTemplateEmailCloture(): TemplateEmailClotureVo {
           return this.templateEmailClotureService.selectedTemplateEmailCloture;
       }
    set selectedTemplateEmailCloture(value: TemplateEmailClotureVo) {
        this.templateEmailClotureService.selectedTemplateEmailCloture = value;
       }

   get viewTemplateEmailClotureDialog(): boolean {
           return this.templateEmailClotureService.viewTemplateEmailClotureDialog;

       }
    set viewTemplateEmailClotureDialog(value: boolean) {
        this.templateEmailClotureService.viewTemplateEmailClotureDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
