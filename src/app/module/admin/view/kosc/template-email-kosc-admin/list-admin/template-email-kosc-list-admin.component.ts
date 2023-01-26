import {Component, OnInit} from '@angular/core';
import {TemplateEmailKoscService} from 'src/app/controller/service/TemplateEmailKosc.service';
import {TemplateEmailKoscVo} from 'src/app/controller/model/TemplateEmailKosc.model';
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
  selector: 'app-template-email-kosc-list-admin',
  templateUrl: './template-email-kosc-list-admin.component.html',
  styleUrls: ['./template-email-kosc-list-admin.component.css']
})
export class TemplateEmailKoscListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'TemplateEmailKosc';


    constructor(private datePipe: DatePipe, private templateEmailKoscService: TemplateEmailKoscService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.loadTemplateEmailKoscs();
      this.initExport();
      this.initCol();
    }
    
    // methods
      public async loadTemplateEmailKoscs(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('TemplateEmailKosc', 'list');
        isPermistted ? this.templateEmailKoscService.findAll().subscribe(templateEmailKoscs => this.templateEmailKoscs = templateEmailKoscs,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.templateEmailKoscService.findByCriteria(this.searchTemplateEmailKosc).subscribe(templateEmailKoscs=>{
            
            this.templateEmailKoscs = templateEmailKoscs;
           // this.searchTemplateEmailKosc = new TemplateEmailKoscVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'code', header: 'Code'},
                            {field: 'libelle', header: 'Libelle'},
                            {field: 'objet', header: 'Objet'},
        ];
    }
    
    public async editTemplateEmailKosc(templateEmailKosc: TemplateEmailKoscVo){
        const isPermistted = await this.roleService.isPermitted('TemplateEmailKosc', 'edit');
         if(isPermistted){
          this.templateEmailKoscService.findByIdWithAssociatedList(templateEmailKosc).subscribe(res => {
           this.selectedTemplateEmailKosc = res;

            this.editTemplateEmailKoscDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewTemplateEmailKosc(templateEmailKosc: TemplateEmailKoscVo){
        const isPermistted = await this.roleService.isPermitted('TemplateEmailKosc', 'view');
        if(isPermistted){
           this.templateEmailKoscService.findByIdWithAssociatedList(templateEmailKosc).subscribe(res => {
           this.selectedTemplateEmailKosc = res;

            this.viewTemplateEmailKoscDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateTemplateEmailKosc(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedTemplateEmailKosc = new TemplateEmailKoscVo();
            this.createTemplateEmailKoscDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteTemplateEmailKosc(templateEmailKosc: TemplateEmailKoscVo){
       const isPermistted = await this.roleService.isPermitted('TemplateEmailKosc', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Template email kosc) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.templateEmailKoscService.delete(templateEmailKosc).subscribe(status=>{
                          if(status > 0){
                          const position = this.templateEmailKoscs.indexOf(templateEmailKosc);
                          position > -1 ? this.templateEmailKoscs.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Template email kosc Supprimé',
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


public async duplicateTemplateEmailKosc(templateEmailKosc: TemplateEmailKoscVo) {

     this.templateEmailKoscService.findByIdWithAssociatedList(templateEmailKosc).subscribe(
	 res => {
	       this.initDuplicateTemplateEmailKosc(res);
	       this.selectedTemplateEmailKosc = res;
	       this.selectedTemplateEmailKosc.id = null;


            this.createTemplateEmailKoscDialog = true;

});

	}

	initDuplicateTemplateEmailKosc(res: TemplateEmailKoscVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.templateEmailKoscs.map(e => {
    return {
                    'Code': e.code ,
                    'Libelle': e.libelle ,
                    'Objet': e.objet ,
                    'Corps': e.corps ,
     }
      });

      this.criteriaData = [{
            'Code': this.searchTemplateEmailKosc.code ? this.searchTemplateEmailKosc.code : environment.emptyForExport ,
            'Libelle': this.searchTemplateEmailKosc.libelle ? this.searchTemplateEmailKosc.libelle : environment.emptyForExport ,
            'Objet': this.searchTemplateEmailKosc.objet ? this.searchTemplateEmailKosc.objet : environment.emptyForExport ,
            'Corps': this.searchTemplateEmailKosc.corps ? this.searchTemplateEmailKosc.corps : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get templateEmailKoscs() : Array<TemplateEmailKoscVo> {
           return this.templateEmailKoscService.templateEmailKoscs;
       }
    set templateEmailKoscs(value: Array<TemplateEmailKoscVo>) {
        this.templateEmailKoscService.templateEmailKoscs = value;
       }

    get templateEmailKoscSelections() : Array<TemplateEmailKoscVo> {
           return this.templateEmailKoscService.templateEmailKoscSelections;
       }
    set templateEmailKoscSelections(value: Array<TemplateEmailKoscVo>) {
        this.templateEmailKoscService.templateEmailKoscSelections = value;
       }
   
     


    get selectedTemplateEmailKosc() : TemplateEmailKoscVo {
           return this.templateEmailKoscService.selectedTemplateEmailKosc;
       }
    set selectedTemplateEmailKosc(value: TemplateEmailKoscVo) {
        this.templateEmailKoscService.selectedTemplateEmailKosc = value;
       }
    
    get createTemplateEmailKoscDialog() :boolean {
           return this.templateEmailKoscService.createTemplateEmailKoscDialog;
       }
    set createTemplateEmailKoscDialog(value: boolean) {
        this.templateEmailKoscService.createTemplateEmailKoscDialog= value;
       }
    
    get editTemplateEmailKoscDialog() :boolean {
           return this.templateEmailKoscService.editTemplateEmailKoscDialog;
       }
    set editTemplateEmailKoscDialog(value: boolean) {
        this.templateEmailKoscService.editTemplateEmailKoscDialog= value;
       }
    get viewTemplateEmailKoscDialog() :boolean {
           return this.templateEmailKoscService.viewTemplateEmailKoscDialog;
       }
    set viewTemplateEmailKoscDialog(value: boolean) {
        this.templateEmailKoscService.viewTemplateEmailKoscDialog = value;
       }
       
     get searchTemplateEmailKosc() : TemplateEmailKoscVo {
        return this.templateEmailKoscService.searchTemplateEmailKosc;
       }
    set searchTemplateEmailKosc(value: TemplateEmailKoscVo) {
        this.templateEmailKoscService.searchTemplateEmailKosc = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
