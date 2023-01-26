import {Component, OnInit} from '@angular/core';
import {TemplateEmailClientInjoinableService} from 'src/app/controller/service/TemplateEmailClientInjoinable.service';
import {TemplateEmailClientInjoinableVo} from 'src/app/controller/model/TemplateEmailClientInjoinable.model';
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
  selector: 'app-template-email-client-injoinable-list-chercheur',
  templateUrl: './template-email-client-injoinable-list-chercheur.component.html',
  styleUrls: ['./template-email-client-injoinable-list-chercheur.component.css']
})
export class TemplateEmailClientInjoinableListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'TemplateEmailClientInjoinable';


    constructor(private datePipe: DatePipe, private templateEmailClientInjoinableService: TemplateEmailClientInjoinableService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.loadTemplateEmailClientInjoinables();
      this.initExport();
      this.initCol();
    }
    
    // methods
      public async loadTemplateEmailClientInjoinables(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('TemplateEmailClientInjoinable', 'list');
        isPermistted ? this.templateEmailClientInjoinableService.findAll().subscribe(templateEmailClientInjoinables => this.templateEmailClientInjoinables = templateEmailClientInjoinables,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.templateEmailClientInjoinableService.findByCriteria(this.searchTemplateEmailClientInjoinable).subscribe(templateEmailClientInjoinables=>{
            
            this.templateEmailClientInjoinables = templateEmailClientInjoinables;
           // this.searchTemplateEmailClientInjoinable = new TemplateEmailClientInjoinableVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'code', header: 'Code'},
                            {field: 'libelle', header: 'Libelle'},
                            {field: 'objet', header: 'Objet'},
        ];
    }
    
    public async editTemplateEmailClientInjoinable(templateEmailClientInjoinable: TemplateEmailClientInjoinableVo){
        const isPermistted = await this.roleService.isPermitted('TemplateEmailClientInjoinable', 'edit');
         if(isPermistted){
          this.templateEmailClientInjoinableService.findByIdWithAssociatedList(templateEmailClientInjoinable).subscribe(res => {
           this.selectedTemplateEmailClientInjoinable = res;

            this.editTemplateEmailClientInjoinableDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewTemplateEmailClientInjoinable(templateEmailClientInjoinable: TemplateEmailClientInjoinableVo){
        const isPermistted = await this.roleService.isPermitted('TemplateEmailClientInjoinable', 'view');
        if(isPermistted){
           this.templateEmailClientInjoinableService.findByIdWithAssociatedList(templateEmailClientInjoinable).subscribe(res => {
           this.selectedTemplateEmailClientInjoinable = res;

            this.viewTemplateEmailClientInjoinableDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateTemplateEmailClientInjoinable(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedTemplateEmailClientInjoinable = new TemplateEmailClientInjoinableVo();
            this.createTemplateEmailClientInjoinableDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteTemplateEmailClientInjoinable(templateEmailClientInjoinable: TemplateEmailClientInjoinableVo){
       const isPermistted = await this.roleService.isPermitted('TemplateEmailClientInjoinable', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Template email client injoinable) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.templateEmailClientInjoinableService.delete(templateEmailClientInjoinable).subscribe(status=>{
                          if(status > 0){
                          const position = this.templateEmailClientInjoinables.indexOf(templateEmailClientInjoinable);
                          position > -1 ? this.templateEmailClientInjoinables.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Template email client injoinable Supprimé',
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


public async duplicateTemplateEmailClientInjoinable(templateEmailClientInjoinable: TemplateEmailClientInjoinableVo) {

     this.templateEmailClientInjoinableService.findByIdWithAssociatedList(templateEmailClientInjoinable).subscribe(
	 res => {
	       this.initDuplicateTemplateEmailClientInjoinable(res);
	       this.selectedTemplateEmailClientInjoinable = res;
	       this.selectedTemplateEmailClientInjoinable.id = null;


            this.createTemplateEmailClientInjoinableDialog = true;

});

	}

	initDuplicateTemplateEmailClientInjoinable(res: TemplateEmailClientInjoinableVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.templateEmailClientInjoinables.map(e => {
    return {
                    'Code': e.code ,
                    'Libelle': e.libelle ,
                    'Objet': e.objet ,
                    'Corps': e.corps ,
     }
      });

      this.criteriaData = [{
            'Code': this.searchTemplateEmailClientInjoinable.code ? this.searchTemplateEmailClientInjoinable.code : environment.emptyForExport ,
            'Libelle': this.searchTemplateEmailClientInjoinable.libelle ? this.searchTemplateEmailClientInjoinable.libelle : environment.emptyForExport ,
            'Objet': this.searchTemplateEmailClientInjoinable.objet ? this.searchTemplateEmailClientInjoinable.objet : environment.emptyForExport ,
            'Corps': this.searchTemplateEmailClientInjoinable.corps ? this.searchTemplateEmailClientInjoinable.corps : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get templateEmailClientInjoinables() : Array<TemplateEmailClientInjoinableVo> {
           return this.templateEmailClientInjoinableService.templateEmailClientInjoinables;
       }
    set templateEmailClientInjoinables(value: Array<TemplateEmailClientInjoinableVo>) {
        this.templateEmailClientInjoinableService.templateEmailClientInjoinables = value;
       }

    get templateEmailClientInjoinableSelections() : Array<TemplateEmailClientInjoinableVo> {
           return this.templateEmailClientInjoinableService.templateEmailClientInjoinableSelections;
       }
    set templateEmailClientInjoinableSelections(value: Array<TemplateEmailClientInjoinableVo>) {
        this.templateEmailClientInjoinableService.templateEmailClientInjoinableSelections = value;
       }
   
     


    get selectedTemplateEmailClientInjoinable() : TemplateEmailClientInjoinableVo {
           return this.templateEmailClientInjoinableService.selectedTemplateEmailClientInjoinable;
       }
    set selectedTemplateEmailClientInjoinable(value: TemplateEmailClientInjoinableVo) {
        this.templateEmailClientInjoinableService.selectedTemplateEmailClientInjoinable = value;
       }
    
    get createTemplateEmailClientInjoinableDialog() :boolean {
           return this.templateEmailClientInjoinableService.createTemplateEmailClientInjoinableDialog;
       }
    set createTemplateEmailClientInjoinableDialog(value: boolean) {
        this.templateEmailClientInjoinableService.createTemplateEmailClientInjoinableDialog= value;
       }
    
    get editTemplateEmailClientInjoinableDialog() :boolean {
           return this.templateEmailClientInjoinableService.editTemplateEmailClientInjoinableDialog;
       }
    set editTemplateEmailClientInjoinableDialog(value: boolean) {
        this.templateEmailClientInjoinableService.editTemplateEmailClientInjoinableDialog= value;
       }
    get viewTemplateEmailClientInjoinableDialog() :boolean {
           return this.templateEmailClientInjoinableService.viewTemplateEmailClientInjoinableDialog;
       }
    set viewTemplateEmailClientInjoinableDialog(value: boolean) {
        this.templateEmailClientInjoinableService.viewTemplateEmailClientInjoinableDialog = value;
       }
       
     get searchTemplateEmailClientInjoinable() : TemplateEmailClientInjoinableVo {
        return this.templateEmailClientInjoinableService.searchTemplateEmailClientInjoinable;
       }
    set searchTemplateEmailClientInjoinable(value: TemplateEmailClientInjoinableVo) {
        this.templateEmailClientInjoinableService.searchTemplateEmailClientInjoinable = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
