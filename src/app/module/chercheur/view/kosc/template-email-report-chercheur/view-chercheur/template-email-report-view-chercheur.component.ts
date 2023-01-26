import {Component, OnInit} from '@angular/core';
import {TemplateEmailReportService} from 'src/app/controller/service/TemplateEmailReport.service';
import {TemplateEmailReportVo} from 'src/app/controller/model/TemplateEmailReport.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-template-email-report-view-chercheur',
  templateUrl: './template-email-report-view-chercheur.component.html',
  styleUrls: ['./template-email-report-view-chercheur.component.css']
})
export class TemplateEmailReportViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private templateEmailReportService: TemplateEmailReportService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewTemplateEmailReportDialog  = false;
}

// getters and setters

get templateEmailReports(): Array<TemplateEmailReportVo> {
    return this.templateEmailReportService.templateEmailReports;
       }
set templateEmailReports(value: Array<TemplateEmailReportVo>) {
        this.templateEmailReportService.templateEmailReports = value;
       }

 get selectedTemplateEmailReport(): TemplateEmailReportVo {
           return this.templateEmailReportService.selectedTemplateEmailReport;
       }
    set selectedTemplateEmailReport(value: TemplateEmailReportVo) {
        this.templateEmailReportService.selectedTemplateEmailReport = value;
       }

   get viewTemplateEmailReportDialog(): boolean {
           return this.templateEmailReportService.viewTemplateEmailReportDialog;

       }
    set viewTemplateEmailReportDialog(value: boolean) {
        this.templateEmailReportService.viewTemplateEmailReportDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
