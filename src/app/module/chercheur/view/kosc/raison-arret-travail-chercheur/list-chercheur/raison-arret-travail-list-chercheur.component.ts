import {Component, OnInit} from '@angular/core';
import {RaisonArretTravailService} from 'src/app/controller/service/RaisonArretTravail.service';
import {RaisonArretTravailVo} from 'src/app/controller/model/RaisonArretTravail.model';
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
  selector: 'app-raison-arret-travail-list-chercheur',
  templateUrl: './raison-arret-travail-list-chercheur.component.html',
  styleUrls: ['./raison-arret-travail-list-chercheur.component.css']
})
export class RaisonArretTravailListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'RaisonArretTravail';


    constructor(private datePipe: DatePipe, private raisonArretTravailService: RaisonArretTravailService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.loadRaisonArretTravails();
      this.initExport();
      this.initCol();
    }
    
    // methods
      public async loadRaisonArretTravails(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('RaisonArretTravail', 'list');
        isPermistted ? this.raisonArretTravailService.findAll().subscribe(raisonArretTravails => this.raisonArretTravails = raisonArretTravails,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.raisonArretTravailService.findByCriteria(this.searchRaisonArretTravail).subscribe(raisonArretTravails=>{
            
            this.raisonArretTravails = raisonArretTravails;
           // this.searchRaisonArretTravail = new RaisonArretTravailVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'libelle', header: 'Libelle'},
                            {field: 'code', header: 'Code'},
        ];
    }
    
    public async editRaisonArretTravail(raisonArretTravail: RaisonArretTravailVo){
        const isPermistted = await this.roleService.isPermitted('RaisonArretTravail', 'edit');
         if(isPermistted){
          this.raisonArretTravailService.findByIdWithAssociatedList(raisonArretTravail).subscribe(res => {
           this.selectedRaisonArretTravail = res;

            this.editRaisonArretTravailDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewRaisonArretTravail(raisonArretTravail: RaisonArretTravailVo){
        const isPermistted = await this.roleService.isPermitted('RaisonArretTravail', 'view');
        if(isPermistted){
           this.raisonArretTravailService.findByIdWithAssociatedList(raisonArretTravail).subscribe(res => {
           this.selectedRaisonArretTravail = res;

            this.viewRaisonArretTravailDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateRaisonArretTravail(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedRaisonArretTravail = new RaisonArretTravailVo();
            this.createRaisonArretTravailDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteRaisonArretTravail(raisonArretTravail: RaisonArretTravailVo){
       const isPermistted = await this.roleService.isPermitted('RaisonArretTravail', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Raison arret travail) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.raisonArretTravailService.delete(raisonArretTravail).subscribe(status=>{
                          if(status > 0){
                          const position = this.raisonArretTravails.indexOf(raisonArretTravail);
                          position > -1 ? this.raisonArretTravails.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Raison arret travail Supprimé',
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


public async duplicateRaisonArretTravail(raisonArretTravail: RaisonArretTravailVo) {

     this.raisonArretTravailService.findByIdWithAssociatedList(raisonArretTravail).subscribe(
	 res => {
	       this.initDuplicateRaisonArretTravail(res);
	       this.selectedRaisonArretTravail = res;
	       this.selectedRaisonArretTravail.id = null;


            this.createRaisonArretTravailDialog = true;

});

	}

	initDuplicateRaisonArretTravail(res: RaisonArretTravailVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.raisonArretTravails.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Code': e.code ,
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchRaisonArretTravail.libelle ? this.searchRaisonArretTravail.libelle : environment.emptyForExport ,
            'Code': this.searchRaisonArretTravail.code ? this.searchRaisonArretTravail.code : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get raisonArretTravails() : Array<RaisonArretTravailVo> {
           return this.raisonArretTravailService.raisonArretTravails;
       }
    set raisonArretTravails(value: Array<RaisonArretTravailVo>) {
        this.raisonArretTravailService.raisonArretTravails = value;
       }

    get raisonArretTravailSelections() : Array<RaisonArretTravailVo> {
           return this.raisonArretTravailService.raisonArretTravailSelections;
       }
    set raisonArretTravailSelections(value: Array<RaisonArretTravailVo>) {
        this.raisonArretTravailService.raisonArretTravailSelections = value;
       }
   
     


    get selectedRaisonArretTravail() : RaisonArretTravailVo {
           return this.raisonArretTravailService.selectedRaisonArretTravail;
       }
    set selectedRaisonArretTravail(value: RaisonArretTravailVo) {
        this.raisonArretTravailService.selectedRaisonArretTravail = value;
       }
    
    get createRaisonArretTravailDialog() :boolean {
           return this.raisonArretTravailService.createRaisonArretTravailDialog;
       }
    set createRaisonArretTravailDialog(value: boolean) {
        this.raisonArretTravailService.createRaisonArretTravailDialog= value;
       }
    
    get editRaisonArretTravailDialog() :boolean {
           return this.raisonArretTravailService.editRaisonArretTravailDialog;
       }
    set editRaisonArretTravailDialog(value: boolean) {
        this.raisonArretTravailService.editRaisonArretTravailDialog= value;
       }
    get viewRaisonArretTravailDialog() :boolean {
           return this.raisonArretTravailService.viewRaisonArretTravailDialog;
       }
    set viewRaisonArretTravailDialog(value: boolean) {
        this.raisonArretTravailService.viewRaisonArretTravailDialog = value;
       }
       
     get searchRaisonArretTravail() : RaisonArretTravailVo {
        return this.raisonArretTravailService.searchRaisonArretTravail;
       }
    set searchRaisonArretTravail(value: RaisonArretTravailVo) {
        this.raisonArretTravailService.searchRaisonArretTravail = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
