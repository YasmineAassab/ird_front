import {Component, OnInit} from '@angular/core';
import {RegionService} from 'src/app/controller/service/Region.service';
import {RegionVo} from 'src/app/controller/model/Region.model';
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
  selector: 'app-region-list-admin',
  templateUrl: './region-list-admin.component.html',
  styleUrls: ['./region-list-admin.component.css']
})
export class RegionListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Region';


    constructor(private datePipe: DatePipe, private regionService: RegionService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.loadRegions();
      this.initExport();
      this.initCol();
    }
    
    // methods
      public async loadRegions(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Region', 'list');
        isPermistted ? this.regionService.findAll().subscribe(regions => this.regions = regions,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.regionService.findByCriteria(this.searchRegion).subscribe(regions=>{
            
            this.regions = regions;
           // this.searchRegion = new RegionVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'libelle', header: 'Libelle'},
                            {field: 'code', header: 'Code'},
        ];
    }
    
    public async editRegion(region: RegionVo){
        const isPermistted = await this.roleService.isPermitted('Region', 'edit');
         if(isPermistted){
          this.regionService.findByIdWithAssociatedList(region).subscribe(res => {
           this.selectedRegion = res;

            this.editRegionDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewRegion(region: RegionVo){
        const isPermistted = await this.roleService.isPermitted('Region', 'view');
        if(isPermistted){
           this.regionService.findByIdWithAssociatedList(region).subscribe(res => {
           this.selectedRegion = res;

            this.viewRegionDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateRegion(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedRegion = new RegionVo();
            this.createRegionDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteRegion(region: RegionVo){
       const isPermistted = await this.roleService.isPermitted('Region', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Region) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.regionService.delete(region).subscribe(status=>{
                          if(status > 0){
                          const position = this.regions.indexOf(region);
                          position > -1 ? this.regions.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Region Supprimé',
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


public async duplicateRegion(region: RegionVo) {

     this.regionService.findByIdWithAssociatedList(region).subscribe(
	 res => {
	       this.initDuplicateRegion(res);
	       this.selectedRegion = res;
	       this.selectedRegion.id = null;


            this.createRegionDialog = true;

});

	}

	initDuplicateRegion(res: RegionVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.regions.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Code': e.code ,
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchRegion.libelle ? this.searchRegion.libelle : environment.emptyForExport ,
            'Code': this.searchRegion.code ? this.searchRegion.code : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get regions() : Array<RegionVo> {
           return this.regionService.regions;
       }
    set regions(value: Array<RegionVo>) {
        this.regionService.regions = value;
       }

    get regionSelections() : Array<RegionVo> {
           return this.regionService.regionSelections;
       }
    set regionSelections(value: Array<RegionVo>) {
        this.regionService.regionSelections = value;
       }
   
     


    get selectedRegion() : RegionVo {
           return this.regionService.selectedRegion;
       }
    set selectedRegion(value: RegionVo) {
        this.regionService.selectedRegion = value;
       }
    
    get createRegionDialog() :boolean {
           return this.regionService.createRegionDialog;
       }
    set createRegionDialog(value: boolean) {
        this.regionService.createRegionDialog= value;
       }
    
    get editRegionDialog() :boolean {
           return this.regionService.editRegionDialog;
       }
    set editRegionDialog(value: boolean) {
        this.regionService.editRegionDialog= value;
       }
    get viewRegionDialog() :boolean {
           return this.regionService.viewRegionDialog;
       }
    set viewRegionDialog(value: boolean) {
        this.regionService.viewRegionDialog = value;
       }
       
     get searchRegion() : RegionVo {
        return this.regionService.searchRegion;
       }
    set searchRegion(value: RegionVo) {
        this.regionService.searchRegion = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
