import {Component, OnInit, Input} from '@angular/core';
import {RegionService} from 'src/app/controller/service/Region.service';
import {RegionVo} from 'src/app/controller/model/Region.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


@Component({
  selector: 'app-region-edit-chercheur',
  templateUrl: './region-edit-chercheur.component.html',
  styleUrls: ['./region-edit-chercheur.component.css']
})
export class RegionEditChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validRegionLibelle = true;
   _validRegionCode = true;




constructor(private datePipe: DatePipe, private regionService: RegionService
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
    this.validRegionLibelle = value;
    this.validRegionCode = value;
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
     this.regionService.edit().subscribe(region=>{
     const myIndex = this.regions.findIndex(e => e.id === this.selectedRegion.id);
     this.regions[myIndex] = region;
     this.editRegionDialog = false;
     this.submitted = false;
     this.selectedRegion = new RegionVo();



    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateRegionLibelle();
this.validateRegionCode();

    }

private validateRegionLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedRegion.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validRegionLibelle = false;
        } else {
            this.validRegionLibelle = true;
        }
    }
private validateRegionCode(){
        if (this.stringUtilService.isEmpty(this.selectedRegion.code)) {
            this.errorMessages.push('Code non valide');
            this.validRegionCode = false;
        } else {
            this.validRegionCode = true;
        }
    }






//openPopup
// methods

hideEditDialog(){
    this.editRegionDialog  = false;
    this.setValidation(true);
}

// getters and setters

get regions(): Array<RegionVo> {
    return this.regionService.regions;
       }
set regions(value: Array<RegionVo>) {
        this.regionService.regions = value;
       }

 get selectedRegion(): RegionVo {
           return this.regionService.selectedRegion;
       }
    set selectedRegion(value: RegionVo) {
        this.regionService.selectedRegion = value;
       }

   get editRegionDialog(): boolean {
           return this.regionService.editRegionDialog;

       }
    set editRegionDialog(value: boolean) {
        this.regionService.editRegionDialog= value;
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

    get validRegionLibelle(): boolean {
    return this._validRegionLibelle;
    }

    set validRegionLibelle(value: boolean) {
    this._validRegionLibelle = value;
    }
    get validRegionCode(): boolean {
    return this._validRegionCode;
    }

    set validRegionCode(value: boolean) {
    this._validRegionCode = value;
    }

}
