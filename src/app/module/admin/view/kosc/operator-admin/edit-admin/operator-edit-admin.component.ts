import {Component, OnInit, Input} from '@angular/core';
import {OperatorService} from 'src/app/controller/service/Operator.service';
import {OperatorVo} from 'src/app/controller/model/Operator.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


@Component({
  selector: 'app-operator-edit-admin',
  templateUrl: './operator-edit-admin.component.html',
  styleUrls: ['./operator-edit-admin.component.css']
})
export class OperatorEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validOperatorReference = true;
   _validOperatorLibelle = true;




constructor(private datePipe: DatePipe, private operatorService: OperatorService
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
    this.validOperatorReference = value;
    this.validOperatorLibelle = value;
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
     this.operatorService.edit().subscribe(operator=>{
     const myIndex = this.operators.findIndex(e => e.id === this.selectedOperator.id);
     this.operators[myIndex] = operator;
     this.editOperatorDialog = false;
     this.submitted = false;
     this.selectedOperator = new OperatorVo();



    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateOperatorReference();
this.validateOperatorLibelle();

    }

private validateOperatorReference(){
        if (this.stringUtilService.isEmpty(this.selectedOperator.reference)) {
            this.errorMessages.push('Reference non valide');
            this.validOperatorReference = false;
        } else {
            this.validOperatorReference = true;
        }
    }
private validateOperatorLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedOperator.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validOperatorLibelle = false;
        } else {
            this.validOperatorLibelle = true;
        }
    }






//openPopup
// methods

hideEditDialog(){
    this.editOperatorDialog  = false;
    this.setValidation(true);
}

// getters and setters

get operators(): Array<OperatorVo> {
    return this.operatorService.operators;
       }
set operators(value: Array<OperatorVo>) {
        this.operatorService.operators = value;
       }

 get selectedOperator(): OperatorVo {
           return this.operatorService.selectedOperator;
       }
    set selectedOperator(value: OperatorVo) {
        this.operatorService.selectedOperator = value;
       }

   get editOperatorDialog(): boolean {
           return this.operatorService.editOperatorDialog;

       }
    set editOperatorDialog(value: boolean) {
        this.operatorService.editOperatorDialog= value;
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

    get validOperatorReference(): boolean {
    return this._validOperatorReference;
    }

    set validOperatorReference(value: boolean) {
    this._validOperatorReference = value;
    }
    get validOperatorLibelle(): boolean {
    return this._validOperatorLibelle;
    }

    set validOperatorLibelle(value: boolean) {
    this._validOperatorLibelle = value;
    }

}
