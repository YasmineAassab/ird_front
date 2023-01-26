import {Component, OnInit} from '@angular/core';
import {ArretTravailService} from 'src/app/controller/service/ArretTravail.service';
import {ArretTravailVo} from 'src/app/controller/model/ArretTravail.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from 'src/app/controller/service/role.service';
import {DatePipe} from '@angular/common';


import { TechnicienService } from 'src/app/controller/service/Technicien.service';
import { RaisonArretTravailService } from 'src/app/controller/service/RaisonArretTravail.service';

import {RaisonArretTravailVo} from 'src/app/controller/model/RaisonArretTravail.model';
import {TechnicienVo} from 'src/app/controller/model/Technicien.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from 'src/app/controller/service/Auth.service';
import { ExportService } from 'src/app/controller/service/Export.service';

@Component({
  selector: 'app-arret-travail-list-chercheur',
  templateUrl: './arret-travail-list-chercheur.component.html',
  styleUrls: ['./arret-travail-list-chercheur.component.css']
})
export class ArretTravailListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'ArretTravail';
    techniciens :Array<TechnicienVo>;
    raisonArretTravails :Array<RaisonArretTravailVo>;


    constructor(private datePipe: DatePipe, private arretTravailService: ArretTravailService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
        , private technicienService: TechnicienService
        , private raisonArretTravailService: RaisonArretTravailService
) { }

    ngOnInit() : void {
      this.loadArretTravails();
      this.initExport();
      this.initCol();
      this.loadTechnicien();
      this.loadRaisonArretTravail();
    }
    
    // methods
      public async loadArretTravails(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ArretTravail', 'list');
        isPermistted ? this.arretTravailService.findAll().subscribe(arretTravails => this.arretTravails = arretTravails,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.arretTravailService.findByCriteria(this.searchArretTravail).subscribe(arretTravails=>{
            
            this.arretTravails = arretTravails;
           // this.searchArretTravail = new ArretTravailVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'technicien?.identifiant', header: 'Technicien'},
                            {field: 'dateDebut', header: 'Date debut'},
                            {field: 'dateFin', header: 'Date fin'},
                        {field: 'raisonArretTravail?.libelle', header: 'Raison arret travail'},
        ];
    }
    
    public async editArretTravail(arretTravail: ArretTravailVo){
        const isPermistted = await this.roleService.isPermitted('ArretTravail', 'edit');
         if(isPermistted){
          this.arretTravailService.findByIdWithAssociatedList(arretTravail).subscribe(res => {
           this.selectedArretTravail = res;
                        this.selectedArretTravail.dateDebut = new Date(arretTravail.dateDebut);
                        this.selectedArretTravail.dateFin = new Date(arretTravail.dateFin);

            this.editArretTravailDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewArretTravail(arretTravail: ArretTravailVo){
        const isPermistted = await this.roleService.isPermitted('ArretTravail', 'view');
        if(isPermistted){
           this.arretTravailService.findByIdWithAssociatedList(arretTravail).subscribe(res => {
           this.selectedArretTravail = res;
                this.selectedArretTravail.dateDebut = new Date(arretTravail.dateDebut);
                this.selectedArretTravail.dateFin = new Date(arretTravail.dateFin);

            this.viewArretTravailDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateArretTravail(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedArretTravail = new ArretTravailVo();
            this.createArretTravailDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteArretTravail(arretTravail: ArretTravailVo){
       const isPermistted = await this.roleService.isPermitted('ArretTravail', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Arret travail) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.arretTravailService.delete(arretTravail).subscribe(status=>{
                          if(status > 0){
                          const position = this.arretTravails.indexOf(arretTravail);
                          position > -1 ? this.arretTravails.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Arret travail Supprimé',
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

public async loadTechnicien(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('ArretTravail', 'list');
    isPermistted ? this.technicienService.findAll().subscribe(techniciens => this.techniciens = techniciens,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadRaisonArretTravail(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('ArretTravail', 'list');
    isPermistted ? this.raisonArretTravailService.findAll().subscribe(raisonArretTravails => this.raisonArretTravails = raisonArretTravails,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateArretTravail(arretTravail: ArretTravailVo) {

     this.arretTravailService.findByIdWithAssociatedList(arretTravail).subscribe(
	 res => {
	       this.initDuplicateArretTravail(res);
	       this.selectedArretTravail = res;
	       this.selectedArretTravail.id = null;


            this.createArretTravailDialog = true;

});

	}

	initDuplicateArretTravail(res: ArretTravailVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.arretTravails.map(e => {
    return {
            'Technicien': e.technicienVo?.identifiant ,
                    'Date debut': this.datePipe.transform(e.dateDebut , 'dd/MM/yyyy hh:mm'),
                    'Date fin': this.datePipe.transform(e.dateFin , 'dd/MM/yyyy hh:mm'),
            'Raison arret travail': e.raisonArretTravailVo?.libelle ,
                    'Comment': e.comment ,
     }
      });

      this.criteriaData = [{
        'Technicien': this.searchArretTravail.technicienVo?.identifiant ? this.searchArretTravail.technicienVo?.identifiant : environment.emptyForExport ,
            'Date debut Min': this.searchArretTravail.dateDebutMin ? this.datePipe.transform(this.searchArretTravail.dateDebutMin , this.dateFormat) : environment.emptyForExport ,
            'Date debut Max': this.searchArretTravail.dateDebutMax ? this.datePipe.transform(this.searchArretTravail.dateDebutMax , this.dateFormat) : environment.emptyForExport ,
            'Date fin Min': this.searchArretTravail.dateFinMin ? this.datePipe.transform(this.searchArretTravail.dateFinMin , this.dateFormat) : environment.emptyForExport ,
            'Date fin Max': this.searchArretTravail.dateFinMax ? this.datePipe.transform(this.searchArretTravail.dateFinMax , this.dateFormat) : environment.emptyForExport ,
        'Raison arret travail': this.searchArretTravail.raisonArretTravailVo?.libelle ? this.searchArretTravail.raisonArretTravailVo?.libelle : environment.emptyForExport ,
            'Comment': this.searchArretTravail.comment ? this.searchArretTravail.comment : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get arretTravails() : Array<ArretTravailVo> {
           return this.arretTravailService.arretTravails;
       }
    set arretTravails(value: Array<ArretTravailVo>) {
        this.arretTravailService.arretTravails = value;
       }

    get arretTravailSelections() : Array<ArretTravailVo> {
           return this.arretTravailService.arretTravailSelections;
       }
    set arretTravailSelections(value: Array<ArretTravailVo>) {
        this.arretTravailService.arretTravailSelections = value;
       }
   
     


    get selectedArretTravail() : ArretTravailVo {
           return this.arretTravailService.selectedArretTravail;
       }
    set selectedArretTravail(value: ArretTravailVo) {
        this.arretTravailService.selectedArretTravail = value;
       }
    
    get createArretTravailDialog() :boolean {
           return this.arretTravailService.createArretTravailDialog;
       }
    set createArretTravailDialog(value: boolean) {
        this.arretTravailService.createArretTravailDialog= value;
       }
    
    get editArretTravailDialog() :boolean {
           return this.arretTravailService.editArretTravailDialog;
       }
    set editArretTravailDialog(value: boolean) {
        this.arretTravailService.editArretTravailDialog= value;
       }
    get viewArretTravailDialog() :boolean {
           return this.arretTravailService.viewArretTravailDialog;
       }
    set viewArretTravailDialog(value: boolean) {
        this.arretTravailService.viewArretTravailDialog = value;
       }
       
     get searchArretTravail() : ArretTravailVo {
        return this.arretTravailService.searchArretTravail;
       }
    set searchArretTravail(value: ArretTravailVo) {
        this.arretTravailService.searchArretTravail = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
