import {Component, OnInit} from '@angular/core';
import {TemplateEmailReportService} from 'src/app/controller/service/TemplateEmailReport.service';
import {TemplateEmailReportVo} from 'src/app/controller/model/TemplateEmailReport.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from 'src/app/controller/service/role.service';
import {DatePipe} from '@angular/common';



import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from 'src/app/controller/service/Auth.service';
import { ExportService } from 'src/app/controller/service/Export.service';

@Component({
  selector: 'app-template-email-report-list-admin',
  templateUrl: './template-email-report-list-admin.component.html',
  styleUrls: ['./template-email-report-list-admin.component.css']
})
export class TemplateEmailReportListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'TemplateEmailReport';


    constructor(private datePipe: DatePipe, private templateEmailReportService: TemplateEmailReportService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.loadTemplateEmailReports();
      this.initExport();
      this.initCol();
    }
    
    // methods
      public async loadTemplateEmailReports(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('TemplateEmailReport', 'list');
        isPermistted ? this.templateEmailReportService.findAll().subscribe(templateEmailReports => this.templateEmailReports = templateEmailReports,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.templateEmailReportService.findByCriteria(this.searchTemplateEmailReport).subscribe(templateEmailReports=>{
            
            this.templateEmailReports = templateEmailReports;
           // this.searchTemplateEmailReport = new TemplateEmailReportVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'code', header: 'Code'},
                            {field: 'libelle', header: 'Libelle'},
                            {field: 'objet', header: 'Objet'},
        ];
    }
    
    public async editTemplateEmailReport(templateEmailReport: TemplateEmailReportVo){
        const isPermistted = await this.roleService.isPermitted('TemplateEmailReport', 'edit');
         if(isPermistted){
          this.templateEmailReportService.findByIdWithAssociatedList(templateEmailReport).subscribe(res => {
           this.selectedTemplateEmailReport = res;

            this.editTemplateEmailReportDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewTemplateEmailReport(templateEmailReport: TemplateEmailReportVo){
        const isPermistted = await this.roleService.isPermitted('TemplateEmailReport', 'view');
        if(isPermistted){
           this.templateEmailReportService.findByIdWithAssociatedList(templateEmailReport).subscribe(res => {
           this.selectedTemplateEmailReport = res;

            this.viewTemplateEmailReportDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateTemplateEmailReport(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedTemplateEmailReport = new TemplateEmailReportVo();
            this.createTemplateEmailReportDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteTemplateEmailReport(templateEmailReport: TemplateEmailReportVo){
       const isPermistted = await this.roleService.isPermitted('TemplateEmailReport', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Template email report) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.templateEmailReportService.delete(templateEmailReport).subscribe(status=>{
                          if(status > 0){
                          const position = this.templateEmailReports.indexOf(templateEmailReport);
                          position > -1 ? this.templateEmailReports.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Template email report Supprimé',
                        life: 3000
                    });
                                     }

                    },error=>console.log(error))
                             }
                     });
              }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'Problème de permission'
              });
             }
    }


public async duplicateTemplateEmailReport(templateEmailReport: TemplateEmailReportVo) {

     this.templateEmailReportService.findByIdWithAssociatedList(templateEmailReport).subscribe(
	 res => {
	       this.initDuplicateTemplateEmailReport(res);
	       this.selectedTemplateEmailReport = res;
	       this.selectedTemplateEmailReport.id = null;


            this.createTemplateEmailReportDialog = true;

});

	}

	initDuplicateTemplateEmailReport(res: TemplateEmailReportVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.templateEmailReports.map(e => {
    return {
                    'Code': e.code ,
                    'Libelle': e.libelle ,
                    'Objet': e.objet ,
                    'Corps': e.corps ,
     }
      });

      this.criteriaData = [{
            'Code': this.searchTemplateEmailReport.code ? this.searchTemplateEmailReport.code : environment.emptyForExport ,
            'Libelle': this.searchTemplateEmailReport.libelle ? this.searchTemplateEmailReport.libelle : environment.emptyForExport ,
            'Objet': this.searchTemplateEmailReport.objet ? this.searchTemplateEmailReport.objet : environment.emptyForExport ,
            'Corps': this.searchTemplateEmailReport.corps ? this.searchTemplateEmailReport.corps : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get templateEmailReports() : Array<TemplateEmailReportVo> {
           return this.templateEmailReportService.templateEmailReports;
       }
    set templateEmailReports(value: Array<TemplateEmailReportVo>) {
        this.templateEmailReportService.templateEmailReports = value;
       }

    get templateEmailReportSelections() : Array<TemplateEmailReportVo> {
           return this.templateEmailReportService.templateEmailReportSelections;
       }
    set templateEmailReportSelections(value: Array<TemplateEmailReportVo>) {
        this.templateEmailReportService.templateEmailReportSelections = value;
       }
   
     


    get selectedTemplateEmailReport() : TemplateEmailReportVo {
           return this.templateEmailReportService.selectedTemplateEmailReport;
       }
    set selectedTemplateEmailReport(value: TemplateEmailReportVo) {
        this.templateEmailReportService.selectedTemplateEmailReport = value;
       }
    
    get createTemplateEmailReportDialog() :boolean {
           return this.templateEmailReportService.createTemplateEmailReportDialog;
       }
    set createTemplateEmailReportDialog(value: boolean) {
        this.templateEmailReportService.createTemplateEmailReportDialog= value;
       }
    
    get editTemplateEmailReportDialog() :boolean {
           return this.templateEmailReportService.editTemplateEmailReportDialog;
       }
    set editTemplateEmailReportDialog(value: boolean) {
        this.templateEmailReportService.editTemplateEmailReportDialog= value;
       }
    get viewTemplateEmailReportDialog() :boolean {
           return this.templateEmailReportService.viewTemplateEmailReportDialog;
       }
    set viewTemplateEmailReportDialog(value: boolean) {
        this.templateEmailReportService.viewTemplateEmailReportDialog = value;
       }
       
     get searchTemplateEmailReport() : TemplateEmailReportVo {
        return this.templateEmailReportService.searchTemplateEmailReport;
       }
    set searchTemplateEmailReport(value: TemplateEmailReportVo) {
        this.templateEmailReportService.searchTemplateEmailReport = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
