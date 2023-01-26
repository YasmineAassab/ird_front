import {Component, OnInit} from '@angular/core';
import {TemplateEmailReplanificationService} from 'src/app/controller/service/TemplateEmailReplanification.service';
import {TemplateEmailReplanificationVo} from 'src/app/controller/model/TemplateEmailReplanification.model';
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
  selector: 'app-template-email-replanification-list-chercheur',
  templateUrl: './template-email-replanification-list-chercheur.component.html',
  styleUrls: ['./template-email-replanification-list-chercheur.component.css']
})
export class TemplateEmailReplanificationListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'TemplateEmailReplanification';


    constructor(private datePipe: DatePipe, private templateEmailReplanificationService: TemplateEmailReplanificationService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.loadTemplateEmailReplanifications();
      this.initExport();
      this.initCol();
    }
    
    // methods
      public async loadTemplateEmailReplanifications(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('TemplateEmailReplanification', 'list');
        isPermistted ? this.templateEmailReplanificationService.findAll().subscribe(templateEmailReplanifications => this.templateEmailReplanifications = templateEmailReplanifications,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.templateEmailReplanificationService.findByCriteria(this.searchTemplateEmailReplanification).subscribe(templateEmailReplanifications=>{
            
            this.templateEmailReplanifications = templateEmailReplanifications;
           // this.searchTemplateEmailReplanification = new TemplateEmailReplanificationVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'code', header: 'Code'},
                            {field: 'libelle', header: 'Libelle'},
                            {field: 'objet', header: 'Objet'},
        ];
    }
    
    public async editTemplateEmailReplanification(templateEmailReplanification: TemplateEmailReplanificationVo){
        const isPermistted = await this.roleService.isPermitted('TemplateEmailReplanification', 'edit');
         if(isPermistted){
          this.templateEmailReplanificationService.findByIdWithAssociatedList(templateEmailReplanification).subscribe(res => {
           this.selectedTemplateEmailReplanification = res;

            this.editTemplateEmailReplanificationDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewTemplateEmailReplanification(templateEmailReplanification: TemplateEmailReplanificationVo){
        const isPermistted = await this.roleService.isPermitted('TemplateEmailReplanification', 'view');
        if(isPermistted){
           this.templateEmailReplanificationService.findByIdWithAssociatedList(templateEmailReplanification).subscribe(res => {
           this.selectedTemplateEmailReplanification = res;

            this.viewTemplateEmailReplanificationDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateTemplateEmailReplanification(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedTemplateEmailReplanification = new TemplateEmailReplanificationVo();
            this.createTemplateEmailReplanificationDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteTemplateEmailReplanification(templateEmailReplanification: TemplateEmailReplanificationVo){
       const isPermistted = await this.roleService.isPermitted('TemplateEmailReplanification', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Template email replanification) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.templateEmailReplanificationService.delete(templateEmailReplanification).subscribe(status=>{
                          if(status > 0){
                          const position = this.templateEmailReplanifications.indexOf(templateEmailReplanification);
                          position > -1 ? this.templateEmailReplanifications.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Template email replanification Supprimé',
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


public async duplicateTemplateEmailReplanification(templateEmailReplanification: TemplateEmailReplanificationVo) {

     this.templateEmailReplanificationService.findByIdWithAssociatedList(templateEmailReplanification).subscribe(
	 res => {
	       this.initDuplicateTemplateEmailReplanification(res);
	       this.selectedTemplateEmailReplanification = res;
	       this.selectedTemplateEmailReplanification.id = null;


            this.createTemplateEmailReplanificationDialog = true;

});

	}

	initDuplicateTemplateEmailReplanification(res: TemplateEmailReplanificationVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.templateEmailReplanifications.map(e => {
    return {
                    'Code': e.code ,
                    'Libelle': e.libelle ,
                    'Objet': e.objet ,
                    'Corps': e.corps ,
     }
      });

      this.criteriaData = [{
            'Code': this.searchTemplateEmailReplanification.code ? this.searchTemplateEmailReplanification.code : environment.emptyForExport ,
            'Libelle': this.searchTemplateEmailReplanification.libelle ? this.searchTemplateEmailReplanification.libelle : environment.emptyForExport ,
            'Objet': this.searchTemplateEmailReplanification.objet ? this.searchTemplateEmailReplanification.objet : environment.emptyForExport ,
            'Corps': this.searchTemplateEmailReplanification.corps ? this.searchTemplateEmailReplanification.corps : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get templateEmailReplanifications() : Array<TemplateEmailReplanificationVo> {
           return this.templateEmailReplanificationService.templateEmailReplanifications;
       }
    set templateEmailReplanifications(value: Array<TemplateEmailReplanificationVo>) {
        this.templateEmailReplanificationService.templateEmailReplanifications = value;
       }

    get templateEmailReplanificationSelections() : Array<TemplateEmailReplanificationVo> {
           return this.templateEmailReplanificationService.templateEmailReplanificationSelections;
       }
    set templateEmailReplanificationSelections(value: Array<TemplateEmailReplanificationVo>) {
        this.templateEmailReplanificationService.templateEmailReplanificationSelections = value;
       }
   
     


    get selectedTemplateEmailReplanification() : TemplateEmailReplanificationVo {
           return this.templateEmailReplanificationService.selectedTemplateEmailReplanification;
       }
    set selectedTemplateEmailReplanification(value: TemplateEmailReplanificationVo) {
        this.templateEmailReplanificationService.selectedTemplateEmailReplanification = value;
       }
    
    get createTemplateEmailReplanificationDialog() :boolean {
           return this.templateEmailReplanificationService.createTemplateEmailReplanificationDialog;
       }
    set createTemplateEmailReplanificationDialog(value: boolean) {
        this.templateEmailReplanificationService.createTemplateEmailReplanificationDialog= value;
       }
    
    get editTemplateEmailReplanificationDialog() :boolean {
           return this.templateEmailReplanificationService.editTemplateEmailReplanificationDialog;
       }
    set editTemplateEmailReplanificationDialog(value: boolean) {
        this.templateEmailReplanificationService.editTemplateEmailReplanificationDialog= value;
       }
    get viewTemplateEmailReplanificationDialog() :boolean {
           return this.templateEmailReplanificationService.viewTemplateEmailReplanificationDialog;
       }
    set viewTemplateEmailReplanificationDialog(value: boolean) {
        this.templateEmailReplanificationService.viewTemplateEmailReplanificationDialog = value;
       }
       
     get searchTemplateEmailReplanification() : TemplateEmailReplanificationVo {
        return this.templateEmailReplanificationService.searchTemplateEmailReplanification;
       }
    set searchTemplateEmailReplanification(value: TemplateEmailReplanificationVo) {
        this.templateEmailReplanificationService.searchTemplateEmailReplanification = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
