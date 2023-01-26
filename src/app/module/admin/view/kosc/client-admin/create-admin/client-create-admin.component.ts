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
  selector: 'app-client-create-admin',
  templateUrl: './client-create-admin.component.html',
  styleUrls: ['./client-create-admin.component.css']
})
export class ClientCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();





constructor(private datePipe: DatePipe, private clientService: ClientService
 ,       private stringUtilService: StringUtilService
 ,       private roleService: RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
) {

}



ngOnInit(): void {

}




private setValidation(value: boolean){
    }


public save(){
  this.submitted = true;
  this.validateForm();
  if (this.errorMessages.length === 0) {
        this.saveWithShowOption(false);
  } else {
        this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Merci de corrigé les erreurs sur le formulaire'});
  }
}

public saveWithShowOption(showList: boolean){
     this.clientService.save().subscribe(client=>{
      if(client != null){
       this.clients.push({...client});
       this.createClientDialog = false;
       this.submitted = false;
       this.selectedClient = new ClientVo();

    }else{
    this.messageService.add({severity: 'error', summary: 'Erreurs',detail: 'Client existe déjà' });
    }

    } , error =>{
        console.log(error);
    });
}

private validateForm(): void{
this.errorMessages = new Array<string>();

    }









hideCreateDialog(){
    this.createClientDialog  = false;
    this.setValidation(true);
}

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

   get createClientDialog(): boolean {
           return this.clientService.createClientDialog;

       }
    set createClientDialog(value: boolean) {
        this.clientService.createClientDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatCreate;
    }

    get dateFormatColumn(){
            return environment.dateFormatCreate;
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
