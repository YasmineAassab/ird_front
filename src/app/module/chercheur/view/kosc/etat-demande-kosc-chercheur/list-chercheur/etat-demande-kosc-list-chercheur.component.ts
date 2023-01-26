import {Component, OnInit} from '@angular/core';
import {EtatDemandeKoscService} from 'src/app/controller/service/EtatDemandeKosc.service';
import {EtatDemandeKoscVo} from 'src/app/controller/model/EtatDemandeKosc.model';
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
  selector: 'app-etat-demande-kosc-list-chercheur',
  templateUrl: './etat-demande-kosc-list-chercheur.component.html',
  styleUrls: ['./etat-demande-kosc-list-chercheur.component.css']
})
export class EtatDemandeKoscListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'EtatDemandeKosc';


    constructor(private datePipe: DatePipe, private etatDemandeKoscService: EtatDemandeKoscService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.loadEtatDemandeKoscs();
      this.initExport();
      this.initCol();
    }
    
    // methods
      public async loadEtatDemandeKoscs(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EtatDemandeKosc', 'list');
        isPermistted ? this.etatDemandeKoscService.findAll().subscribe(etatDemandeKoscs => this.etatDemandeKoscs = etatDemandeKoscs,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.etatDemandeKoscService.findByCriteria(this.searchEtatDemandeKosc).subscribe(etatDemandeKoscs=>{
            
            this.etatDemandeKoscs = etatDemandeKoscs;
           // this.searchEtatDemandeKosc = new EtatDemandeKoscVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'code', header: 'Code'},
                            {field: 'libelle', header: 'Libelle'},
        ];
    }
    
    public async editEtatDemandeKosc(etatDemandeKosc: EtatDemandeKoscVo){
        const isPermistted = await this.roleService.isPermitted('EtatDemandeKosc', 'edit');
         if(isPermistted){
          this.etatDemandeKoscService.findByIdWithAssociatedList(etatDemandeKosc).subscribe(res => {
           this.selectedEtatDemandeKosc = res;

            this.editEtatDemandeKoscDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewEtatDemandeKosc(etatDemandeKosc: EtatDemandeKoscVo){
        const isPermistted = await this.roleService.isPermitted('EtatDemandeKosc', 'view');
        if(isPermistted){
           this.etatDemandeKoscService.findByIdWithAssociatedList(etatDemandeKosc).subscribe(res => {
           this.selectedEtatDemandeKosc = res;

            this.viewEtatDemandeKoscDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateEtatDemandeKosc(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedEtatDemandeKosc = new EtatDemandeKoscVo();
            this.createEtatDemandeKoscDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteEtatDemandeKosc(etatDemandeKosc: EtatDemandeKoscVo){
       const isPermistted = await this.roleService.isPermitted('EtatDemandeKosc', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Etat demande kosc) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.etatDemandeKoscService.delete(etatDemandeKosc).subscribe(status=>{
                          if(status > 0){
                          const position = this.etatDemandeKoscs.indexOf(etatDemandeKosc);
                          position > -1 ? this.etatDemandeKoscs.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Etat demande kosc Supprimé',
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


public async duplicateEtatDemandeKosc(etatDemandeKosc: EtatDemandeKoscVo) {

     this.etatDemandeKoscService.findByIdWithAssociatedList(etatDemandeKosc).subscribe(
	 res => {
	       this.initDuplicateEtatDemandeKosc(res);
	       this.selectedEtatDemandeKosc = res;
	       this.selectedEtatDemandeKosc.id = null;


            this.createEtatDemandeKoscDialog = true;

});

	}

	initDuplicateEtatDemandeKosc(res: EtatDemandeKoscVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.etatDemandeKoscs.map(e => {
    return {
                    'Code': e.code ,
                    'Libelle': e.libelle ,
     }
      });

      this.criteriaData = [{
            'Code': this.searchEtatDemandeKosc.code ? this.searchEtatDemandeKosc.code : environment.emptyForExport ,
            'Libelle': this.searchEtatDemandeKosc.libelle ? this.searchEtatDemandeKosc.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get etatDemandeKoscs() : Array<EtatDemandeKoscVo> {
           return this.etatDemandeKoscService.etatDemandeKoscs;
       }
    set etatDemandeKoscs(value: Array<EtatDemandeKoscVo>) {
        this.etatDemandeKoscService.etatDemandeKoscs = value;
       }

    get etatDemandeKoscSelections() : Array<EtatDemandeKoscVo> {
           return this.etatDemandeKoscService.etatDemandeKoscSelections;
       }
    set etatDemandeKoscSelections(value: Array<EtatDemandeKoscVo>) {
        this.etatDemandeKoscService.etatDemandeKoscSelections = value;
       }
   
     


    get selectedEtatDemandeKosc() : EtatDemandeKoscVo {
           return this.etatDemandeKoscService.selectedEtatDemandeKosc;
       }
    set selectedEtatDemandeKosc(value: EtatDemandeKoscVo) {
        this.etatDemandeKoscService.selectedEtatDemandeKosc = value;
       }
    
    get createEtatDemandeKoscDialog() :boolean {
           return this.etatDemandeKoscService.createEtatDemandeKoscDialog;
       }
    set createEtatDemandeKoscDialog(value: boolean) {
        this.etatDemandeKoscService.createEtatDemandeKoscDialog= value;
       }
    
    get editEtatDemandeKoscDialog() :boolean {
           return this.etatDemandeKoscService.editEtatDemandeKoscDialog;
       }
    set editEtatDemandeKoscDialog(value: boolean) {
        this.etatDemandeKoscService.editEtatDemandeKoscDialog= value;
       }
    get viewEtatDemandeKoscDialog() :boolean {
           return this.etatDemandeKoscService.viewEtatDemandeKoscDialog;
       }
    set viewEtatDemandeKoscDialog(value: boolean) {
        this.etatDemandeKoscService.viewEtatDemandeKoscDialog = value;
       }
       
     get searchEtatDemandeKosc() : EtatDemandeKoscVo {
        return this.etatDemandeKoscService.searchEtatDemandeKosc;
       }
    set searchEtatDemandeKosc(value: EtatDemandeKoscVo) {
        this.etatDemandeKoscService.searchEtatDemandeKosc = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
