import {Component, OnInit} from '@angular/core';
import {TemplateSuiviService} from 'src/app/controller/service/TemplateSuivi.service';
import {TemplateSuiviVo} from 'src/app/controller/model/TemplateSuivi.model';
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
  selector: 'app-template-suivi-list-admin',
  templateUrl: './template-suivi-list-admin.component.html',
  styleUrls: ['./template-suivi-list-admin.component.css']
})
export class TemplateSuiviListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'TemplateSuivi';


    constructor(private datePipe: DatePipe, private templateSuiviService: TemplateSuiviService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.loadTemplateSuivis();
      this.initExport();
      this.initCol();
    }
    
    // methods
      public async loadTemplateSuivis(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('TemplateSuivi', 'list');
        isPermistted ? this.templateSuiviService.findAll().subscribe(templateSuivis => this.templateSuivis = templateSuivis,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.templateSuiviService.findByCriteria(this.searchTemplateSuivi).subscribe(templateSuivis=>{
            
            this.templateSuivis = templateSuivis;
           // this.searchTemplateSuivi = new TemplateSuiviVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'code', header: 'Code'},
                            {field: 'libelle', header: 'Libelle'},
                            {field: 'objet', header: 'Objet'},
        ];
    }
    
    public async editTemplateSuivi(templateSuivi: TemplateSuiviVo){
        const isPermistted = await this.roleService.isPermitted('TemplateSuivi', 'edit');
         if(isPermistted){
          this.templateSuiviService.findByIdWithAssociatedList(templateSuivi).subscribe(res => {
           this.selectedTemplateSuivi = res;

            this.editTemplateSuiviDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewTemplateSuivi(templateSuivi: TemplateSuiviVo){
        const isPermistted = await this.roleService.isPermitted('TemplateSuivi', 'view');
        if(isPermistted){
           this.templateSuiviService.findByIdWithAssociatedList(templateSuivi).subscribe(res => {
           this.selectedTemplateSuivi = res;

            this.viewTemplateSuiviDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateTemplateSuivi(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedTemplateSuivi = new TemplateSuiviVo();
            this.createTemplateSuiviDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteTemplateSuivi(templateSuivi: TemplateSuiviVo){
       const isPermistted = await this.roleService.isPermitted('TemplateSuivi', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Template suivi) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.templateSuiviService.delete(templateSuivi).subscribe(status=>{
                          if(status > 0){
                          const position = this.templateSuivis.indexOf(templateSuivi);
                          position > -1 ? this.templateSuivis.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Template suivi Supprimé',
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


public async duplicateTemplateSuivi(templateSuivi: TemplateSuiviVo) {

     this.templateSuiviService.findByIdWithAssociatedList(templateSuivi).subscribe(
	 res => {
	       this.initDuplicateTemplateSuivi(res);
	       this.selectedTemplateSuivi = res;
	       this.selectedTemplateSuivi.id = null;


            this.createTemplateSuiviDialog = true;

});

	}

	initDuplicateTemplateSuivi(res: TemplateSuiviVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.templateSuivis.map(e => {
    return {
                    'Code': e.code ,
                    'Libelle': e.libelle ,
                    'Objet': e.objet ,
                    'Corps': e.corps ,
     }
      });

      this.criteriaData = [{
            'Code': this.searchTemplateSuivi.code ? this.searchTemplateSuivi.code : environment.emptyForExport ,
            'Libelle': this.searchTemplateSuivi.libelle ? this.searchTemplateSuivi.libelle : environment.emptyForExport ,
            'Objet': this.searchTemplateSuivi.objet ? this.searchTemplateSuivi.objet : environment.emptyForExport ,
            'Corps': this.searchTemplateSuivi.corps ? this.searchTemplateSuivi.corps : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get templateSuivis() : Array<TemplateSuiviVo> {
           return this.templateSuiviService.templateSuivis;
       }
    set templateSuivis(value: Array<TemplateSuiviVo>) {
        this.templateSuiviService.templateSuivis = value;
       }

    get templateSuiviSelections() : Array<TemplateSuiviVo> {
           return this.templateSuiviService.templateSuiviSelections;
       }
    set templateSuiviSelections(value: Array<TemplateSuiviVo>) {
        this.templateSuiviService.templateSuiviSelections = value;
       }
   
     


    get selectedTemplateSuivi() : TemplateSuiviVo {
           return this.templateSuiviService.selectedTemplateSuivi;
       }
    set selectedTemplateSuivi(value: TemplateSuiviVo) {
        this.templateSuiviService.selectedTemplateSuivi = value;
       }
    
    get createTemplateSuiviDialog() :boolean {
           return this.templateSuiviService.createTemplateSuiviDialog;
       }
    set createTemplateSuiviDialog(value: boolean) {
        this.templateSuiviService.createTemplateSuiviDialog= value;
       }
    
    get editTemplateSuiviDialog() :boolean {
           return this.templateSuiviService.editTemplateSuiviDialog;
       }
    set editTemplateSuiviDialog(value: boolean) {
        this.templateSuiviService.editTemplateSuiviDialog= value;
       }
    get viewTemplateSuiviDialog() :boolean {
           return this.templateSuiviService.viewTemplateSuiviDialog;
       }
    set viewTemplateSuiviDialog(value: boolean) {
        this.templateSuiviService.viewTemplateSuiviDialog = value;
       }
       
     get searchTemplateSuivi() : TemplateSuiviVo {
        return this.templateSuiviService.searchTemplateSuivi;
       }
    set searchTemplateSuivi(value: TemplateSuiviVo) {
        this.templateSuiviService.searchTemplateSuivi = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
