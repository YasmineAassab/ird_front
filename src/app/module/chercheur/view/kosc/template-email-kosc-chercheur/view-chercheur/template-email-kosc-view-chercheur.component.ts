import {Component, OnInit} from '@angular/core';
import {TemplateEmailKoscService} from 'src/app/controller/service/TemplateEmailKosc.service';
import {TemplateEmailKoscVo} from 'src/app/controller/model/TemplateEmailKosc.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-template-email-kosc-view-chercheur',
  templateUrl: './template-email-kosc-view-chercheur.component.html',
  styleUrls: ['./template-email-kosc-view-chercheur.component.css']
})
export class TemplateEmailKoscViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private templateEmailKoscService: TemplateEmailKoscService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewTemplateEmailKoscDialog  = false;
}

// getters and setters

get templateEmailKoscs(): Array<TemplateEmailKoscVo> {
    return this.templateEmailKoscService.templateEmailKoscs;
       }
set templateEmailKoscs(value: Array<TemplateEmailKoscVo>) {
        this.templateEmailKoscService.templateEmailKoscs = value;
       }

 get selectedTemplateEmailKosc(): TemplateEmailKoscVo {
           return this.templateEmailKoscService.selectedTemplateEmailKosc;
       }
    set selectedTemplateEmailKosc(value: TemplateEmailKoscVo) {
        this.templateEmailKoscService.selectedTemplateEmailKosc = value;
       }

   get viewTemplateEmailKoscDialog(): boolean {
           return this.templateEmailKoscService.viewTemplateEmailKoscDialog;

       }
    set viewTemplateEmailKoscDialog(value: boolean) {
        this.templateEmailKoscService.viewTemplateEmailKoscDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
