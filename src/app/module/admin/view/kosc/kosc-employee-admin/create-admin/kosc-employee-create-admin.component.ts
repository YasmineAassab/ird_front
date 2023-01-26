import {Component, OnInit, Input} from '@angular/core';
import {KoscEmployeeService} from 'src/app/controller/service/KoscEmployee.service';
import {KoscEmployeeVo} from 'src/app/controller/model/KoscEmployee.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


@Component({
  selector: 'app-kosc-employee-create-admin',
  templateUrl: './kosc-employee-create-admin.component.html',
  styleUrls: ['./kosc-employee-create-admin.component.css']
})
export class KoscEmployeeCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();





constructor(private datePipe: DatePipe, private koscEmployeeService: KoscEmployeeService
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
     this.koscEmployeeService.save().subscribe(koscEmployee=>{
      if(koscEmployee != null){
       this.koscEmployees.push({...koscEmployee});
       this.createKoscEmployeeDialog = false;
       this.submitted = false;
       this.selectedKoscEmployee = new KoscEmployeeVo();

    }else{
    this.messageService.add({severity: 'error', summary: 'Erreurs',detail: 'Kosc employee existe déjà' });
    }

    } , error =>{
        console.log(error);
    });
}

private validateForm(): void{
this.errorMessages = new Array<string>();

    }













hideCreateDialog(){
    this.createKoscEmployeeDialog  = false;
    this.setValidation(true);
}

get koscEmployees(): Array<KoscEmployeeVo> {
    return this.koscEmployeeService.koscEmployees;
       }
set koscEmployees(value: Array<KoscEmployeeVo>) {
        this.koscEmployeeService.koscEmployees = value;
       }

 get selectedKoscEmployee(): KoscEmployeeVo {
           return this.koscEmployeeService.selectedKoscEmployee;
       }
    set selectedKoscEmployee(value: KoscEmployeeVo) {
        this.koscEmployeeService.selectedKoscEmployee = value;
       }

   get createKoscEmployeeDialog(): boolean {
           return this.koscEmployeeService.createKoscEmployeeDialog;

       }
    set createKoscEmployeeDialog(value: boolean) {
        this.koscEmployeeService.createKoscEmployeeDialog= value;
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
