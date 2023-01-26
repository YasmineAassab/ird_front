import {Component, OnInit} from '@angular/core';
import {OperatorService} from 'src/app/controller/service/Operator.service';
import {OperatorVo} from 'src/app/controller/model/Operator.model';
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
  selector: 'app-operator-list-admin',
  templateUrl: './operator-list-admin.component.html',
  styleUrls: ['./operator-list-admin.component.css']
})
export class OperatorListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Operator';


    constructor(private datePipe: DatePipe, private operatorService: OperatorService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.loadOperators();
      this.initExport();
      this.initCol();
    }
    
    // methods
      public async loadOperators(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Operator', 'list');
        isPermistted ? this.operatorService.findAll().subscribe(operators => this.operators = operators,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.operatorService.findByCriteria(this.searchOperator).subscribe(operators=>{
            
            this.operators = operators;
           // this.searchOperator = new OperatorVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'reference', header: 'Reference'},
                            {field: 'libelle', header: 'Libelle'},
        ];
    }
    
    public async editOperator(operator: OperatorVo){
        const isPermistted = await this.roleService.isPermitted('Operator', 'edit');
         if(isPermistted){
          this.operatorService.findByIdWithAssociatedList(operator).subscribe(res => {
           this.selectedOperator = res;

            this.editOperatorDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewOperator(operator: OperatorVo){
        const isPermistted = await this.roleService.isPermitted('Operator', 'view');
        if(isPermistted){
           this.operatorService.findByIdWithAssociatedList(operator).subscribe(res => {
           this.selectedOperator = res;

            this.viewOperatorDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateOperator(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedOperator = new OperatorVo();
            this.createOperatorDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteOperator(operator: OperatorVo){
       const isPermistted = await this.roleService.isPermitted('Operator', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Operator) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.operatorService.delete(operator).subscribe(status=>{
                          if(status > 0){
                          const position = this.operators.indexOf(operator);
                          position > -1 ? this.operators.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Operator Supprimé',
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


public async duplicateOperator(operator: OperatorVo) {

     this.operatorService.findByIdWithAssociatedList(operator).subscribe(
	 res => {
	       this.initDuplicateOperator(res);
	       this.selectedOperator = res;
	       this.selectedOperator.id = null;


            this.createOperatorDialog = true;

});

	}

	initDuplicateOperator(res: OperatorVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.operators.map(e => {
    return {
                    'Reference': e.reference ,
                    'Libelle': e.libelle ,
     }
      });

      this.criteriaData = [{
            'Reference': this.searchOperator.reference ? this.searchOperator.reference : environment.emptyForExport ,
            'Libelle': this.searchOperator.libelle ? this.searchOperator.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get operators() : Array<OperatorVo> {
           return this.operatorService.operators;
       }
    set operators(value: Array<OperatorVo>) {
        this.operatorService.operators = value;
       }

    get operatorSelections() : Array<OperatorVo> {
           return this.operatorService.operatorSelections;
       }
    set operatorSelections(value: Array<OperatorVo>) {
        this.operatorService.operatorSelections = value;
       }
   
     


    get selectedOperator() : OperatorVo {
           return this.operatorService.selectedOperator;
       }
    set selectedOperator(value: OperatorVo) {
        this.operatorService.selectedOperator = value;
       }
    
    get createOperatorDialog() :boolean {
           return this.operatorService.createOperatorDialog;
       }
    set createOperatorDialog(value: boolean) {
        this.operatorService.createOperatorDialog= value;
       }
    
    get editOperatorDialog() :boolean {
           return this.operatorService.editOperatorDialog;
       }
    set editOperatorDialog(value: boolean) {
        this.operatorService.editOperatorDialog= value;
       }
    get viewOperatorDialog() :boolean {
           return this.operatorService.viewOperatorDialog;
       }
    set viewOperatorDialog(value: boolean) {
        this.operatorService.viewOperatorDialog = value;
       }
       
     get searchOperator() : OperatorVo {
        return this.operatorService.searchOperator;
       }
    set searchOperator(value: OperatorVo) {
        this.operatorService.searchOperator = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
