import {Component, OnInit} from '@angular/core';
import {TemplateEmailPlanificationService} from 'src/app/controller/service/TemplateEmailPlanification.service';
import {TemplateEmailPlanificationVo} from 'src/app/controller/model/TemplateEmailPlanification.model';
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
  selector: 'app-template-email-planification-list-admin',
  templateUrl: './template-email-planification-list-admin.component.html',
  styleUrls: ['./template-email-planification-list-admin.component.css']
})
export class TemplateEmailPlanificationListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'TemplateEmailPlanification';


    constructor(private datePipe: DatePipe, private templateEmailPlanificationService: TemplateEmailPlanificationService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.loadTemplateEmailPlanifications();
      this.initExport();
      this.initCol();
    }
    
    // methods
      public async loadTemplateEmailPlanifications(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('TemplateEmailPlanification', 'list');
        isPermistted ? this.templateEmailPlanificationService.findAll().subscribe(templateEmailPlanifications => this.templateEmailPlanifications = templateEmailPlanifications,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.templateEmailPlanificationService.findByCriteria(this.searchTemplateEmailPlanification).subscribe(templateEmailPlanifications=>{
            
            this.templateEmailPlanifications = templateEmailPlanifications;
           // this.searchTemplateEmailPlanification = new TemplateEmailPlanificationVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'code', header: 'Code'},
                            {field: 'libelle', header: 'Libelle'},
                            {field: 'objet', header: 'Objet'},
        ];
    }
    
    public async editTemplateEmailPlanification(templateEmailPlanification: TemplateEmailPlanificationVo){
        const isPermistted = await this.roleService.isPermitted('TemplateEmailPlanification', 'edit');
         if(isPermistted){
          this.templateEmailPlanificationService.findByIdWithAssociatedList(templateEmailPlanification).subscribe(res => {
           this.selectedTemplateEmailPlanification = res;

            this.editTemplateEmailPlanificationDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewTemplateEmailPlanification(templateEmailPlanification: TemplateEmailPlanificationVo){
        const isPermistted = await this.roleService.isPermitted('TemplateEmailPlanification', 'view');
        if(isPermistted){
           this.templateEmailPlanificationService.findByIdWithAssociatedList(templateEmailPlanification).subscribe(res => {
           this.selectedTemplateEmailPlanification = res;

            this.viewTemplateEmailPlanificationDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateTemplateEmailPlanification(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedTemplateEmailPlanification = new TemplateEmailPlanificationVo();
            this.createTemplateEmailPlanificationDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteTemplateEmailPlanification(templateEmailPlanification: TemplateEmailPlanificationVo){
       const isPermistted = await this.roleService.isPermitted('TemplateEmailPlanification', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Template email planification) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.templateEmailPlanificationService.delete(templateEmailPlanification).subscribe(status=>{
                          if(status > 0){
                          const position = this.templateEmailPlanifications.indexOf(templateEmailPlanification);
                          position > -1 ? this.templateEmailPlanifications.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Template email planification Supprimé',
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


public async duplicateTemplateEmailPlanification(templateEmailPlanification: TemplateEmailPlanificationVo) {

     this.templateEmailPlanificationService.findByIdWithAssociatedList(templateEmailPlanification).subscribe(
	 res => {
	       this.initDuplicateTemplateEmailPlanification(res);
	       this.selectedTemplateEmailPlanification = res;
	       this.selectedTemplateEmailPlanification.id = null;


            this.createTemplateEmailPlanificationDialog = true;

});

	}

	initDuplicateTemplateEmailPlanification(res: TemplateEmailPlanificationVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.templateEmailPlanifications.map(e => {
    return {
                    'Code': e.code ,
                    'Libelle': e.libelle ,
                    'Objet': e.objet ,
                    'Corps': e.corps ,
     }
      });

      this.criteriaData = [{
            'Code': this.searchTemplateEmailPlanification.code ? this.searchTemplateEmailPlanification.code : environment.emptyForExport ,
            'Libelle': this.searchTemplateEmailPlanification.libelle ? this.searchTemplateEmailPlanification.libelle : environment.emptyForExport ,
            'Objet': this.searchTemplateEmailPlanification.objet ? this.searchTemplateEmailPlanification.objet : environment.emptyForExport ,
            'Corps': this.searchTemplateEmailPlanification.corps ? this.searchTemplateEmailPlanification.corps : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get templateEmailPlanifications() : Array<TemplateEmailPlanificationVo> {
           return this.templateEmailPlanificationService.templateEmailPlanifications;
       }
    set templateEmailPlanifications(value: Array<TemplateEmailPlanificationVo>) {
        this.templateEmailPlanificationService.templateEmailPlanifications = value;
       }

    get templateEmailPlanificationSelections() : Array<TemplateEmailPlanificationVo> {
           return this.templateEmailPlanificationService.templateEmailPlanificationSelections;
       }
    set templateEmailPlanificationSelections(value: Array<TemplateEmailPlanificationVo>) {
        this.templateEmailPlanificationService.templateEmailPlanificationSelections = value;
       }
   
     


    get selectedTemplateEmailPlanification() : TemplateEmailPlanificationVo {
           return this.templateEmailPlanificationService.selectedTemplateEmailPlanification;
       }
    set selectedTemplateEmailPlanification(value: TemplateEmailPlanificationVo) {
        this.templateEmailPlanificationService.selectedTemplateEmailPlanification = value;
       }
    
    get createTemplateEmailPlanificationDialog() :boolean {
           return this.templateEmailPlanificationService.createTemplateEmailPlanificationDialog;
       }
    set createTemplateEmailPlanificationDialog(value: boolean) {
        this.templateEmailPlanificationService.createTemplateEmailPlanificationDialog= value;
       }
    
    get editTemplateEmailPlanificationDialog() :boolean {
           return this.templateEmailPlanificationService.editTemplateEmailPlanificationDialog;
       }
    set editTemplateEmailPlanificationDialog(value: boolean) {
        this.templateEmailPlanificationService.editTemplateEmailPlanificationDialog= value;
       }
    get viewTemplateEmailPlanificationDialog() :boolean {
           return this.templateEmailPlanificationService.viewTemplateEmailPlanificationDialog;
       }
    set viewTemplateEmailPlanificationDialog(value: boolean) {
        this.templateEmailPlanificationService.viewTemplateEmailPlanificationDialog = value;
       }
       
     get searchTemplateEmailPlanification() : TemplateEmailPlanificationVo {
        return this.templateEmailPlanificationService.searchTemplateEmailPlanification;
       }
    set searchTemplateEmailPlanification(value: TemplateEmailPlanificationVo) {
        this.templateEmailPlanificationService.searchTemplateEmailPlanification = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
