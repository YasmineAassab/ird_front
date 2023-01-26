import {Component, OnInit} from '@angular/core';
import {ClientService} from 'src/app/controller/service/Client.service';
import {ClientVo} from 'src/app/controller/model/Client.model';
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
  selector: 'app-client-list-chercheur',
  templateUrl: './client-list-chercheur.component.html',
  styleUrls: ['./client-list-chercheur.component.css']
})
export class ClientListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Client';


    constructor(private datePipe: DatePipe, private clientService: ClientService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService: RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.loadClients();
      this.initExport();
      this.initCol();
    }
    
    // methods
      public async loadClients(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Client', 'list');
        isPermistted ? this.clientService.findAll().subscribe(clients => this.clients = clients,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.clientService.findByCriteria(this.searchClient).subscribe(clients=>{
            
            this.clients = clients;
           // this.searchClient = new ClientVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'email', header: 'Email'},
                            {field: 'nom', header: 'Nom'},
                            {field: 'prenom', header: 'Prenom'},
        ];
    }
    
    public async editClient(client: ClientVo){
        const isPermistted = await this.roleService.isPermitted('Client', 'edit');
         if(isPermistted){
          this.clientService.findByIdWithAssociatedList(client).subscribe(res => {
           this.selectedClient = res;

            this.editClientDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewClient(client: ClientVo){
        const isPermistted = await this.roleService.isPermitted('Client', 'view');
        if(isPermistted){
           this.clientService.findByIdWithAssociatedList(client).subscribe(res => {
           this.selectedClient = res;

            this.viewClientDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateClient(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedClient = new ClientVo();
            this.createClientDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteClient(client: ClientVo){
       const isPermistted = await this.roleService.isPermitted('Client', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Client) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.clientService.delete(client).subscribe(status=>{
                          if(status > 0){
                          const position = this.clients.indexOf(client);
                          position > -1 ? this.clients.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Client Supprimé',
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


public async duplicateClient(client: ClientVo) {

     this.clientService.findByIdWithAssociatedList(client).subscribe(
	 res => {
	       this.initDuplicateClient(res);
	       this.selectedClient = res;
	       this.selectedClient.id = null;


            this.createClientDialog = true;

});

	}

	initDuplicateClient(res: ClientVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport(); this.exportService.exporterCSV(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport(); this.exportService.exporterExcel(this.criteriaData , this.exportData , this.fileName); }},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport(); this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName); }}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.clients.map(e => {
    return {
                    'Email': e.email ,
                    'Nom': e.nom ,
                    'Prenom': e.prenom ,
     }
      });

      this.criteriaData = [{
            'Email': this.searchClient.email ? this.searchClient.email : environment.emptyForExport ,
            'Nom': this.searchClient.nom ? this.searchClient.nom : environment.emptyForExport ,
            'Prenom': this.searchClient.prenom ? this.searchClient.prenom : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get clients() : Array<ClientVo> {
           return this.clientService.clients;
       }
    set clients(value: Array<ClientVo>) {
        this.clientService.clients = value;
       }

    get clientSelections() : Array<ClientVo> {
           return this.clientService.clientSelections;
       }
    set clientSelections(value: Array<ClientVo>) {
        this.clientService.clientSelections = value;
       }
   
     


    get selectedClient() : ClientVo {
           return this.clientService.selectedClient;
       }
    set selectedClient(value: ClientVo) {
        this.clientService.selectedClient = value;
       }
    
    get createClientDialog() :boolean {
           return this.clientService.createClientDialog;
       }
    set createClientDialog(value: boolean) {
        this.clientService.createClientDialog= value;
       }
    
    get editClientDialog() :boolean {
           return this.clientService.editClientDialog;
       }
    set editClientDialog(value: boolean) {
        this.clientService.editClientDialog= value;
       }
    get viewClientDialog() :boolean {
           return this.clientService.viewClientDialog;
       }
    set viewClientDialog(value: boolean) {
        this.clientService.viewClientDialog = value;
       }
       
     get searchClient() : ClientVo {
        return this.clientService.searchClient;
       }
    set searchClient(value: ClientVo) {
        this.clientService.searchClient = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
