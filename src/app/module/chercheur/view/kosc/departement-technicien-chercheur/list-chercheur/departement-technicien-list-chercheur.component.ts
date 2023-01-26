import {Component, OnInit} from '@angular/core';
import {DepartementTechnicienService} from 'src/app/controller/service/DepartementTechnicien.service';
import {DepartementTechnicienVo} from 'src/app/controller/model/DepartementTechnicien.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from 'src/app/controller/service/role.service';
import {DatePipe} from '@angular/common';


import { TechnicienService } from 'src/app/controller/service/Technicien.service';
import { DepartementService } from 'src/app/controller/service/Departement.service';

import {DepartementVo} from 'src/app/controller/model/Departement.model';
import {TechnicienVo} from 'src/app/controller/model/Technicien.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from 'src/app/controller/service/Auth.service';
import { ExportService } from 'src/app/controller/service/Export.service';

@Component({
  selector: 'app-departement-technicien-list-chercheur',
  templateUrl: './departement-technicien-list-chercheur.component.html',
  styleUrls: ['./departement-technicien-list-chercheur.component.css']
})
export class DepartementTechnicienListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'DepartementTechnicien';
    techniciens :Array<TechnicienVo>;
    departements :Array<DepartementVo>;


    constructor(private datePipe: DatePipe, private departementTechnicienService: DepartementTechnicienService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
        , private technicienService: TechnicienService
        , private departementService: DepartementService
) { }

    ngOnInit() : void {
      this.loadDepartementTechniciens();
      this.initExport();
      this.initCol();
      this.loadTechnicien();
      this.loadDepartement();
    }
    
    // methods
      public async loadDepartementTechniciens(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('DepartementTechnicien', 'list');
        isPermistted ? this.departementTechnicienService.findAll().subscribe(departementTechniciens => this.departementTechniciens = departementTechniciens,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.departementTechnicienService.findByCriteria(this.searchDepartementTechnicien).subscribe(departementTechniciens=>{
            
            this.departementTechniciens = departementTechniciens;
           // this.searchDepartementTechnicien = new DepartementTechnicienVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'technicien?.identifiant', header: 'Technicien'},
                        {field: 'departement?.libelle', header: 'Departement'},
                            {field: 'dateDebut', header: 'Date debut'},
                            {field: 'dateFin', header: 'Date fin'},
        ];
    }
    
    public async editDepartementTechnicien(departementTechnicien: DepartementTechnicienVo){
        const isPermistted = await this.roleService.isPermitted('DepartementTechnicien', 'edit');
         if(isPermistted){
          this.departementTechnicienService.findByIdWithAssociatedList(departementTechnicien).subscribe(res => {
           this.selectedDepartementTechnicien = res;
                        this.selectedDepartementTechnicien.dateDebut = new Date(departementTechnicien.dateDebut);
                        this.selectedDepartementTechnicien.dateFin = new Date(departementTechnicien.dateFin);

            this.editDepartementTechnicienDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewDepartementTechnicien(departementTechnicien: DepartementTechnicienVo){
        const isPermistted = await this.roleService.isPermitted('DepartementTechnicien', 'view');
        if(isPermistted){
           this.departementTechnicienService.findByIdWithAssociatedList(departementTechnicien).subscribe(res => {
           this.selectedDepartementTechnicien = res;
                this.selectedDepartementTechnicien.dateDebut = new Date(departementTechnicien.dateDebut);
                this.selectedDepartementTechnicien.dateFin = new Date(departementTechnicien.dateFin);

            this.viewDepartementTechnicienDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateDepartementTechnicien(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedDepartementTechnicien = new DepartementTechnicienVo();
            this.createDepartementTechnicienDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteDepartementTechnicien(departementTechnicien: DepartementTechnicienVo){
       const isPermistted = await this.roleService.isPermitted('DepartementTechnicien', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Departement technicien) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.departementTechnicienService.delete(departementTechnicien).subscribe(status=>{
                          if(status > 0){
                          const position = this.departementTechniciens.indexOf(departementTechnicien);
                          position > -1 ? this.departementTechniciens.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Departement technicien Supprimé',
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
    const isPermistted = await this.roleService.isPermitted('DepartementTechnicien', 'list');
    isPermistted ? this.technicienService.findAll().subscribe(techniciens => this.techniciens = techniciens,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadDepartement(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('DepartementTechnicien', 'list');
    isPermistted ? this.departementService.findAll().subscribe(departements => this.departements = departements,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateDepartementTechnicien(departementTechnicien: DepartementTechnicienVo) {

     this.departementTechnicienService.findByIdWithAssociatedList(departementTechnicien).subscribe(
	 res => {
	       this.initDuplicateDepartementTechnicien(res);
	       this.selectedDepartementTechnicien = res;
	       this.selectedDepartementTechnicien.id = null;


            this.createDepartementTechnicienDialog = true;

});

	}

	initDuplicateDepartementTechnicien(res: DepartementTechnicienVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.departementTechniciens.map(e => {
    return {
            'Technicien': e.technicienVo?.identifiant ,
            'Departement': e.departementVo?.libelle ,
                    'Date debut': this.datePipe.transform(e.dateDebut , 'dd/MM/yyyy hh:mm'),
                    'Date fin': this.datePipe.transform(e.dateFin , 'dd/MM/yyyy hh:mm'),
     }
      });

      this.criteriaData = [{
        'Technicien': this.searchDepartementTechnicien.technicienVo?.identifiant ? this.searchDepartementTechnicien.technicienVo?.identifiant : environment.emptyForExport ,
        'Departement': this.searchDepartementTechnicien.departementVo?.libelle ? this.searchDepartementTechnicien.departementVo?.libelle : environment.emptyForExport ,
            'Date debut Min': this.searchDepartementTechnicien.dateDebutMin ? this.datePipe.transform(this.searchDepartementTechnicien.dateDebutMin , this.dateFormat) : environment.emptyForExport ,
            'Date debut Max': this.searchDepartementTechnicien.dateDebutMax ? this.datePipe.transform(this.searchDepartementTechnicien.dateDebutMax , this.dateFormat) : environment.emptyForExport ,
            'Date fin Min': this.searchDepartementTechnicien.dateFinMin ? this.datePipe.transform(this.searchDepartementTechnicien.dateFinMin , this.dateFormat) : environment.emptyForExport ,
            'Date fin Max': this.searchDepartementTechnicien.dateFinMax ? this.datePipe.transform(this.searchDepartementTechnicien.dateFinMax , this.dateFormat) : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get departementTechniciens() : Array<DepartementTechnicienVo> {
           return this.departementTechnicienService.departementTechniciens;
       }
    set departementTechniciens(value: Array<DepartementTechnicienVo>) {
        this.departementTechnicienService.departementTechniciens = value;
       }

    get departementTechnicienSelections() : Array<DepartementTechnicienVo> {
           return this.departementTechnicienService.departementTechnicienSelections;
       }
    set departementTechnicienSelections(value: Array<DepartementTechnicienVo>) {
        this.departementTechnicienService.departementTechnicienSelections = value;
       }
   
     


    get selectedDepartementTechnicien() : DepartementTechnicienVo {
           return this.departementTechnicienService.selectedDepartementTechnicien;
       }
    set selectedDepartementTechnicien(value: DepartementTechnicienVo) {
        this.departementTechnicienService.selectedDepartementTechnicien = value;
       }
    
    get createDepartementTechnicienDialog() :boolean {
           return this.departementTechnicienService.createDepartementTechnicienDialog;
       }
    set createDepartementTechnicienDialog(value: boolean) {
        this.departementTechnicienService.createDepartementTechnicienDialog= value;
       }
    
    get editDepartementTechnicienDialog() :boolean {
           return this.departementTechnicienService.editDepartementTechnicienDialog;
       }
    set editDepartementTechnicienDialog(value: boolean) {
        this.departementTechnicienService.editDepartementTechnicienDialog= value;
       }
    get viewDepartementTechnicienDialog() :boolean {
           return this.departementTechnicienService.viewDepartementTechnicienDialog;
       }
    set viewDepartementTechnicienDialog(value: boolean) {
        this.departementTechnicienService.viewDepartementTechnicienDialog = value;
       }
       
     get searchDepartementTechnicien() : DepartementTechnicienVo {
        return this.departementTechnicienService.searchDepartementTechnicien;
       }
    set searchDepartementTechnicien(value: DepartementTechnicienVo) {
        this.departementTechnicienService.searchDepartementTechnicien = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
