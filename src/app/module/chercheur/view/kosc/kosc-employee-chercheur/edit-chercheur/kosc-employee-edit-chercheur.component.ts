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
  selector: 'app-kosc-employee-edit-chercheur',
  templateUrl: './kosc-employee-edit-chercheur.component.html',
  styleUrls: ['./kosc-employee-edit-chercheur.component.css']
})
export class KoscEmployeeEditChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();





constructor(private datePipe: DatePipe, private koscEmployeeService: KoscEmployeeService
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
     this.koscEmployeeService.edit().subscribe(koscEmployee=>{
     const myIndex = this.koscEmployees.findIndex(e => e.id === this.selectedKoscEmployee.id);
     this.koscEmployees[myIndex] = koscEmployee;
     this.editKoscEmployeeDialog = false;
     this.submitted = false;
     this.selectedKoscEmployee = new KoscEmployeeVo();



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
    this.editKoscEmployeeDialog  = false;
    this.setValidation(true);
}

// getters and setters

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

   get editKoscEmployeeDialog(): boolean {
           return this.koscEmployeeService.editKoscEmployeeDialog;

       }
    set editKoscEmployeeDialog(value: boolean) {
        this.koscEmployeeService.editKoscEmployeeDialog= value;
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
