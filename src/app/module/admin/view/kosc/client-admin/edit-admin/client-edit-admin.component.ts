import {Component, OnInit, Input} from '@angular/core';
import {ClientService} from 'src/app/controller/service/Client.service';
import {ClientVo} from 'src/app/controller/model/Client.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


@Component({
  selector: 'app-client-edit-admin',
  templateUrl: './client-edit-admin.component.html',
  styleUrls: ['./client-edit-admin.component.css']
})
export class ClientEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();





constructor(private datePipe: DatePipe, private clientService: ClientService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
) {

}


// methods
ngOnInit(): void {

}




private setValidation(value : boolean){
    }


public edit(){
  this.submitted = true;
  this.validateForm();
  if (this.errorMessages.length === 0) {
        this.editWithShowOption(false);
  } else {
        this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Merci de corrigé les erreurs sur le formulaire'});
  }
}

public editWithShowOption(showList: boolean){
     this.clientService.edit().subscribe(client=>{
     const myIndex = this.clients.findIndex(e => e.id === this.selectedClient.id);
     this.clients[myIndex] = client;
     this.editClientDialog = false;
     this.submitted = false;
     this.selectedClient = new ClientVo();



    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }








//openPopup
// methods

hideEditDialog(){
    this.editClientDialog  = false;
    this.setValidation(true);
}

// getters and setters

get clients(): Array<ClientVo> {
    return this.clientService.clients;
       }
set clients(value: Array<ClientVo>) {
        this.clientService.clients = value;
       }

 get selectedClient(): ClientVo {
           return this.clientService.selectedClient;
       }
    set selectedClient(value: ClientVo) {
        this.clientService.selectedClient = value;
       }

   get editClientDialog(): boolean {
           return this.clientService.editClientDialog;

       }
    set editClientDialog(value: boolean) {
        this.clientService.editClientDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatEdit;
     }

     get submitted(): boolean {
        return this._submitted;
    }

    set submitted(value: boolean) {
        this._submitted = value;
    }




    get errorMessages(): string[] {
    return this._errorMessages;
    }

    set errorMessages(value: string[]) {
    this._errorMessages = value;
    }


}
