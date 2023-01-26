import {Component, OnInit} from '@angular/core';
import {DepartementService} from 'src/app/controller/service/Departement.service';
import {DepartementVo} from 'src/app/controller/model/Departement.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from 'src/app/controller/service/role.service';
import {DatePipe} from '@angular/common';


import { RegionService } from 'src/app/controller/service/Region.service';

import {RegionVo} from 'src/app/controller/model/Region.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from 'src/app/controller/service/Auth.service';
import { ExportService } from 'src/app/controller/service/Export.service';

@Component({
  selector: 'app-departement-list-admin',
  templateUrl: './departement-list-admin.component.html',
  styleUrls: ['./departement-list-admin.component.css']
})
export class DepartementListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Departement';
    regions :Array<RegionVo>;


    constructor(private datePipe: DatePipe, private departementService: DepartementService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
        , private regionService: RegionService
) { }

    ngOnInit() : void {
      this.loadDepartements();
      this.initExport();
      this.initCol();
      this.loadRegion();
    }
    
    // methods
      public async loadDepartements(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Departement', 'list');
        isPermistted ? this.departementService.findAll().subscribe(departements => this.departements = departements,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.departementService.findByCriteria(this.searchDepartement).subscribe(departements=>{
            
            this.departements = departements;
           // this.searchDepartement = new DepartementVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'libelle', header: 'Libelle'},
                            {field: 'code', header: 'Code'},
                        {field: 'region?.libelle', header: 'Region'},
        ];
    }
    
    public async editDepartement(departement: DepartementVo){
        const isPermistted = await this.roleService.isPermitted('Departement', 'edit');
         if(isPermistted){
          this.departementService.findByIdWithAssociatedList(departement).subscribe(res => {
           this.selectedDepartement = res;

            this.editDepartementDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewDepartement(departement: DepartementVo){
        const isPermistted = await this.roleService.isPermitted('Departement', 'view');
        if(isPermistted){
           this.departementService.findByIdWithAssociatedList(departement).subscribe(res => {
           this.selectedDepartement = res;

            this.viewDepartementDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateDepartement(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedDepartement = new DepartementVo();
            this.createDepartementDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteDepartement(departement: DepartementVo){
       const isPermistted = await this.roleService.isPermitted('Departement', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Departement) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.departementService.delete(departement).subscribe(status=>{
                          if(status > 0){
                          const position = this.departements.indexOf(departement);
                          position > -1 ? this.departements.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Departement Supprimé',
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

public async loadRegion(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Departement', 'list');
    isPermistted ? this.regionService.findAll().subscribe(regions => this.regions = regions,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateDepartement(departement: DepartementVo) {

     this.departementService.findByIdWithAssociatedList(departement).subscribe(
	 res => {
	       this.initDuplicateDepartement(res);
	       this.selectedDepartement = res;
	       this.selectedDepartement.id = null;


            this.createDepartementDialog = true;

});

	}

	initDuplicateDepartement(res: DepartementVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.departements.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Code': e.code ,
            'Region': e.regionVo?.libelle ,
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchDepartement.libelle ? this.searchDepartement.libelle : environment.emptyForExport ,
            'Code': this.searchDepartement.code ? this.searchDepartement.code : environment.emptyForExport ,
        'Region': this.searchDepartement.regionVo?.libelle ? this.searchDepartement.regionVo?.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get departements() : Array<DepartementVo> {
           return this.departementService.departements;
       }
    set departements(value: Array<DepartementVo>) {
        this.departementService.departements = value;
       }

    get departementSelections() : Array<DepartementVo> {
           return this.departementService.departementSelections;
       }
    set departementSelections(value: Array<DepartementVo>) {
        this.departementService.departementSelections = value;
       }
   
     


    get selectedDepartement() : DepartementVo {
           return this.departementService.selectedDepartement;
       }
    set selectedDepartement(value: DepartementVo) {
        this.departementService.selectedDepartement = value;
       }
    
    get createDepartementDialog() :boolean {
           return this.departementService.createDepartementDialog;
       }
    set createDepartementDialog(value: boolean) {
        this.departementService.createDepartementDialog= value;
       }
    
    get editDepartementDialog() :boolean {
           return this.departementService.editDepartementDialog;
       }
    set editDepartementDialog(value: boolean) {
        this.departementService.editDepartementDialog= value;
       }
    get viewDepartementDialog() :boolean {
           return this.departementService.viewDepartementDialog;
       }
    set viewDepartementDialog(value: boolean) {
        this.departementService.viewDepartementDialog = value;
       }
       
     get searchDepartement() : DepartementVo {
        return this.departementService.searchDepartement;
       }
    set searchDepartement(value: DepartementVo) {
        this.departementService.searchDepartement = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
