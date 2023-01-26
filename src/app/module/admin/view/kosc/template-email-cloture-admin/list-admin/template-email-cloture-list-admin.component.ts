import {Component, OnInit} from '@angular/core';
import {TemplateEmailClotureService} from 'src/app/controller/service/TemplateEmailCloture.service';
import {TemplateEmailClotureVo} from 'src/app/controller/model/TemplateEmailCloture.model';
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
  selector: 'app-template-email-cloture-list-admin',
  templateUrl: './template-email-cloture-list-admin.component.html',
  styleUrls: ['./template-email-cloture-list-admin.component.css']
})
export class TemplateEmailClotureListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'TemplateEmailCloture';


    constructor(private datePipe: DatePipe, private templateEmailClotureService: TemplateEmailClotureService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.loadTemplateEmailClotures();
      this.initExport();
      this.initCol();
    }
    
    // methods
      public async loadTemplateEmailClotures(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('TemplateEmailCloture', 'list');
        isPermistted ? this.templateEmailClotureService.findAll().subscribe(templateEmailClotures => this.templateEmailClotures = templateEmailClotures,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.templateEmailClotureService.findByCriteria(this.searchTemplateEmailCloture).subscribe(templateEmailClotures=>{
            
            this.templateEmailClotures = templateEmailClotures;
           // this.searchTemplateEmailCloture = new TemplateEmailClotureVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'code', header: 'Code'},
                            {field: 'libelle', header: 'Libelle'},
                            {field: 'objet', header: 'Objet'},
        ];
    }
    
    public async editTemplateEmailCloture(templateEmailCloture: TemplateEmailClotureVo){
        const isPermistted = await this.roleService.isPermitted('TemplateEmailCloture', 'edit');
         if(isPermistted){
          this.templateEmailClotureService.findByIdWithAssociatedList(templateEmailCloture).subscribe(res => {
           this.selectedTemplateEmailCloture = res;

            this.editTemplateEmailClotureDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewTemplateEmailCloture(templateEmailCloture: TemplateEmailClotureVo){
        const isPermistted = await this.roleService.isPermitted('TemplateEmailCloture', 'view');
        if(isPermistted){
           this.templateEmailClotureService.findByIdWithAssociatedList(templateEmailCloture).subscribe(res => {
           this.selectedTemplateEmailCloture = res;

            this.viewTemplateEmailClotureDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateTemplateEmailCloture(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedTemplateEmailCloture = new TemplateEmailClotureVo();
            this.createTemplateEmailClotureDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteTemplateEmailCloture(templateEmailCloture: TemplateEmailClotureVo){
       const isPermistted = await this.roleService.isPermitted('TemplateEmailCloture', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Template email cloture) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.templateEmailClotureService.delete(templateEmailCloture).subscribe(status=>{
                          if(status > 0){
                          const position = this.templateEmailClotures.indexOf(templateEmailCloture);
                          position > -1 ? this.templateEmailClotures.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Template email cloture Supprimé',
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


public async duplicateTemplateEmailCloture(templateEmailCloture: TemplateEmailClotureVo) {

     this.templateEmailClotureService.findByIdWithAssociatedList(templateEmailCloture).subscribe(
	 res => {
	       this.initDuplicateTemplateEmailCloture(res);
	       this.selectedTemplateEmailCloture = res;
	       this.selectedTemplateEmailCloture.id = null;


            this.createTemplateEmailClotureDialog = true;

});

	}

	initDuplicateTemplateEmailCloture(res: TemplateEmailClotureVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.templateEmailClotures.map(e => {
    return {
                    'Code': e.code ,
                    'Libelle': e.libelle ,
                    'Objet': e.objet ,
                    'Corps': e.corps ,
     }
      });

      this.criteriaData = [{
            'Code': this.searchTemplateEmailCloture.code ? this.searchTemplateEmailCloture.code : environment.emptyForExport ,
            'Libelle': this.searchTemplateEmailCloture.libelle ? this.searchTemplateEmailCloture.libelle : environment.emptyForExport ,
            'Objet': this.searchTemplateEmailCloture.objet ? this.searchTemplateEmailCloture.objet : environment.emptyForExport ,
            'Corps': this.searchTemplateEmailCloture.corps ? this.searchTemplateEmailCloture.corps : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get templateEmailClotures() : Array<TemplateEmailClotureVo> {
           return this.templateEmailClotureService.templateEmailClotures;
       }
    set templateEmailClotures(value: Array<TemplateEmailClotureVo>) {
        this.templateEmailClotureService.templateEmailClotures = value;
       }

    get templateEmailClotureSelections() : Array<TemplateEmailClotureVo> {
           return this.templateEmailClotureService.templateEmailClotureSelections;
       }
    set templateEmailClotureSelections(value: Array<TemplateEmailClotureVo>) {
        this.templateEmailClotureService.templateEmailClotureSelections = value;
       }
   
     


    get selectedTemplateEmailCloture() : TemplateEmailClotureVo {
           return this.templateEmailClotureService.selectedTemplateEmailCloture;
       }
    set selectedTemplateEmailCloture(value: TemplateEmailClotureVo) {
        this.templateEmailClotureService.selectedTemplateEmailCloture = value;
       }
    
    get createTemplateEmailClotureDialog() :boolean {
           return this.templateEmailClotureService.createTemplateEmailClotureDialog;
       }
    set createTemplateEmailClotureDialog(value: boolean) {
        this.templateEmailClotureService.createTemplateEmailClotureDialog= value;
       }
    
    get editTemplateEmailClotureDialog() :boolean {
           return this.templateEmailClotureService.editTemplateEmailClotureDialog;
       }
    set editTemplateEmailClotureDialog(value: boolean) {
        this.templateEmailClotureService.editTemplateEmailClotureDialog= value;
       }
    get viewTemplateEmailClotureDialog() :boolean {
           return this.templateEmailClotureService.viewTemplateEmailClotureDialog;
       }
    set viewTemplateEmailClotureDialog(value: boolean) {
        this.templateEmailClotureService.viewTemplateEmailClotureDialog = value;
       }
       
     get searchTemplateEmailCloture() : TemplateEmailClotureVo {
        return this.templateEmailClotureService.searchTemplateEmailCloture;
       }
    set searchTemplateEmailCloture(value: TemplateEmailClotureVo) {
        this.templateEmailClotureService.searchTemplateEmailCloture = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
