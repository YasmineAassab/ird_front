import {Component, OnInit} from '@angular/core';
import {EntrepriseService} from 'src/app/controller/service/Entreprise.service';
import {EntrepriseVo} from 'src/app/controller/model/Entreprise.model';
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
  selector: 'app-entreprise-list-chercheur',
  templateUrl: './entreprise-list-chercheur.component.html',
  styleUrls: ['./entreprise-list-chercheur.component.css']
})
export class EntrepriseListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Entreprise';


    constructor(private datePipe: DatePipe, private entrepriseService: EntrepriseService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.loadEntreprises();
      this.initExport();
      this.initCol();
    }
    
    // methods
      public async loadEntreprises(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Entreprise', 'list');
        isPermistted ? this.entrepriseService.findAll().subscribe(entreprises => this.entreprises = entreprises,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.entrepriseService.findByCriteria(this.searchEntreprise).subscribe(entreprises=>{
            
            this.entreprises = entreprises;
           // this.searchEntreprise = new EntrepriseVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'libelle', header: 'Libelle'},
                            {field: 'code', header: 'Code'},
        ];
    }
    
    public async editEntreprise(entreprise: EntrepriseVo){
        const isPermistted = await this.roleService.isPermitted('Entreprise', 'edit');
         if(isPermistted){
          this.entrepriseService.findByIdWithAssociatedList(entreprise).subscribe(res => {
           this.selectedEntreprise = res;

            this.editEntrepriseDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewEntreprise(entreprise: EntrepriseVo){
        const isPermistted = await this.roleService.isPermitted('Entreprise', 'view');
        if(isPermistted){
           this.entrepriseService.findByIdWithAssociatedList(entreprise).subscribe(res => {
           this.selectedEntreprise = res;

            this.viewEntrepriseDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateEntreprise(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedEntreprise = new EntrepriseVo();
            this.createEntrepriseDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteEntreprise(entreprise: EntrepriseVo){
       const isPermistted = await this.roleService.isPermitted('Entreprise', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Entreprise) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.entrepriseService.delete(entreprise).subscribe(status=>{
                          if(status > 0){
                          const position = this.entreprises.indexOf(entreprise);
                          position > -1 ? this.entreprises.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Entreprise Supprimé',
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


public async duplicateEntreprise(entreprise: EntrepriseVo) {

     this.entrepriseService.findByIdWithAssociatedList(entreprise).subscribe(
	 res => {
	       this.initDuplicateEntreprise(res);
	       this.selectedEntreprise = res;
	       this.selectedEntreprise.id = null;


            this.createEntrepriseDialog = true;

});

	}

	initDuplicateEntreprise(res: EntrepriseVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.entreprises.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Code': e.code ,
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchEntreprise.libelle ? this.searchEntreprise.libelle : environment.emptyForExport ,
            'Code': this.searchEntreprise.code ? this.searchEntreprise.code : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get entreprises() : Array<EntrepriseVo> {
           return this.entrepriseService.entreprises;
       }
    set entreprises(value: Array<EntrepriseVo>) {
        this.entrepriseService.entreprises = value;
       }

    get entrepriseSelections() : Array<EntrepriseVo> {
           return this.entrepriseService.entrepriseSelections;
       }
    set entrepriseSelections(value: Array<EntrepriseVo>) {
        this.entrepriseService.entrepriseSelections = value;
       }
   
     


    get selectedEntreprise() : EntrepriseVo {
           return this.entrepriseService.selectedEntreprise;
       }
    set selectedEntreprise(value: EntrepriseVo) {
        this.entrepriseService.selectedEntreprise = value;
       }
    
    get createEntrepriseDialog() :boolean {
           return this.entrepriseService.createEntrepriseDialog;
       }
    set createEntrepriseDialog(value: boolean) {
        this.entrepriseService.createEntrepriseDialog= value;
       }
    
    get editEntrepriseDialog() :boolean {
           return this.entrepriseService.editEntrepriseDialog;
       }
    set editEntrepriseDialog(value: boolean) {
        this.entrepriseService.editEntrepriseDialog= value;
       }
    get viewEntrepriseDialog() :boolean {
           return this.entrepriseService.viewEntrepriseDialog;
       }
    set viewEntrepriseDialog(value: boolean) {
        this.entrepriseService.viewEntrepriseDialog = value;
       }
       
     get searchEntreprise() : EntrepriseVo {
        return this.entrepriseService.searchEntreprise;
       }
    set searchEntreprise(value: EntrepriseVo) {
        this.entrepriseService.searchEntreprise = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
