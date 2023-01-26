import {Component, OnInit} from '@angular/core';
import {KoscEmployeeService} from 'src/app/controller/service/KoscEmployee.service';
import {KoscEmployeeVo} from 'src/app/controller/model/KoscEmployee.model';
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
  selector: 'app-kosc-employee-list-chercheur',
  templateUrl: './kosc-employee-list-chercheur.component.html',
  styleUrls: ['./kosc-employee-list-chercheur.component.css']
})
export class KoscEmployeeListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'KoscEmployee';


    constructor(private datePipe: DatePipe, private koscEmployeeService: KoscEmployeeService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.loadKoscEmployees();
      this.initExport();
      this.initCol();
    }
    
    // methods
      public async loadKoscEmployees(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('KoscEmployee', 'list');
        isPermistted ? this.koscEmployeeService.findAll().subscribe(koscEmployees => this.koscEmployees = koscEmployees,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.koscEmployeeService.findByCriteria(this.searchKoscEmployee).subscribe(koscEmployees=>{
            
            this.koscEmployees = koscEmployees;
           // this.searchKoscEmployee = new KoscEmployeeVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'firstName', header: 'First name'},
                            {field: 'lastName', header: 'Last name'},
                            {field: 'phone', header: 'Phone'},
                            {field: 'cellPhone', header: 'Cell phone'},
                            {field: 'email1', header: 'Email1'},
                            {field: 'email2', header: 'Email2'},
                            {field: 'email3', header: 'Email3'},
        ];
    }
    
    public async editKoscEmployee(koscEmployee: KoscEmployeeVo){
        const isPermistted = await this.roleService.isPermitted('KoscEmployee', 'edit');
         if(isPermistted){
          this.koscEmployeeService.findByIdWithAssociatedList(koscEmployee).subscribe(res => {
           this.selectedKoscEmployee = res;

            this.editKoscEmployeeDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewKoscEmployee(koscEmployee: KoscEmployeeVo){
        const isPermistted = await this.roleService.isPermitted('KoscEmployee', 'view');
        if(isPermistted){
           this.koscEmployeeService.findByIdWithAssociatedList(koscEmployee).subscribe(res => {
           this.selectedKoscEmployee = res;

            this.viewKoscEmployeeDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateKoscEmployee(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedKoscEmployee = new KoscEmployeeVo();
            this.createKoscEmployeeDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteKoscEmployee(koscEmployee: KoscEmployeeVo){
       const isPermistted = await this.roleService.isPermitted('KoscEmployee', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Kosc employee) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.koscEmployeeService.delete(koscEmployee).subscribe(status=>{
                          if(status > 0){
                          const position = this.koscEmployees.indexOf(koscEmployee);
                          position > -1 ? this.koscEmployees.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Kosc employee Supprimé',
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


public async duplicateKoscEmployee(koscEmployee: KoscEmployeeVo) {

     this.koscEmployeeService.findByIdWithAssociatedList(koscEmployee).subscribe(
	 res => {
	       this.initDuplicateKoscEmployee(res);
	       this.selectedKoscEmployee = res;
	       this.selectedKoscEmployee.id = null;


            this.createKoscEmployeeDialog = true;

});

	}

	initDuplicateKoscEmployee(res: KoscEmployeeVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.koscEmployees.map(e => {
    return {
                    'First name': e.firstName ,
                    'Last name': e.lastName ,
                    'Phone': e.phone ,
                    'Cell phone': e.cellPhone ,
                    'Email1': e.email1 ,
                    'Email2': e.email2 ,
                    'Email3': e.email3 ,
     }
      });

      this.criteriaData = [{
            'First name': this.searchKoscEmployee.firstName ? this.searchKoscEmployee.firstName : environment.emptyForExport ,
            'Last name': this.searchKoscEmployee.lastName ? this.searchKoscEmployee.lastName : environment.emptyForExport ,
            'Phone': this.searchKoscEmployee.phone ? this.searchKoscEmployee.phone : environment.emptyForExport ,
            'Cell phone': this.searchKoscEmployee.cellPhone ? this.searchKoscEmployee.cellPhone : environment.emptyForExport ,
            'Email1': this.searchKoscEmployee.email1 ? this.searchKoscEmployee.email1 : environment.emptyForExport ,
            'Email2': this.searchKoscEmployee.email2 ? this.searchKoscEmployee.email2 : environment.emptyForExport ,
            'Email3': this.searchKoscEmployee.email3 ? this.searchKoscEmployee.email3 : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get koscEmployees() : Array<KoscEmployeeVo> {
           return this.koscEmployeeService.koscEmployees;
       }
    set koscEmployees(value: Array<KoscEmployeeVo>) {
        this.koscEmployeeService.koscEmployees = value;
       }

    get koscEmployeeSelections() : Array<KoscEmployeeVo> {
           return this.koscEmployeeService.koscEmployeeSelections;
       }
    set koscEmployeeSelections(value: Array<KoscEmployeeVo>) {
        this.koscEmployeeService.koscEmployeeSelections = value;
       }
   
     


    get selectedKoscEmployee() : KoscEmployeeVo {
           return this.koscEmployeeService.selectedKoscEmployee;
       }
    set selectedKoscEmployee(value: KoscEmployeeVo) {
        this.koscEmployeeService.selectedKoscEmployee = value;
       }
    
    get createKoscEmployeeDialog() :boolean {
           return this.koscEmployeeService.createKoscEmployeeDialog;
       }
    set createKoscEmployeeDialog(value: boolean) {
        this.koscEmployeeService.createKoscEmployeeDialog= value;
       }
    
    get editKoscEmployeeDialog() :boolean {
           return this.koscEmployeeService.editKoscEmployeeDialog;
       }
    set editKoscEmployeeDialog(value: boolean) {
        this.koscEmployeeService.editKoscEmployeeDialog= value;
       }
    get viewKoscEmployeeDialog() :boolean {
           return this.koscEmployeeService.viewKoscEmployeeDialog;
       }
    set viewKoscEmployeeDialog(value: boolean) {
        this.koscEmployeeService.viewKoscEmployeeDialog = value;
       }
       
     get searchKoscEmployee() : KoscEmployeeVo {
        return this.koscEmployeeService.searchKoscEmployee;
       }
    set searchKoscEmployee(value: KoscEmployeeVo) {
        this.koscEmployeeService.searchKoscEmployee = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
