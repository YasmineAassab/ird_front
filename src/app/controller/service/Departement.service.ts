import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from 'src/environments/environment';


import {DepartementVo} from '../model/Departement.model';
import {RegionVo} from '../model/Region.model';


@Injectable({
  providedIn: 'root'
})
export class DepartementService {
    private API = '' ;
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/departement/';
        });
    }
     private _departements: Array<DepartementVo> ;
     private _selectedDepartement: DepartementVo;
     private _departementSelections: Array<DepartementVo>;
     private _createDepartementDialog: boolean;
     private _editDepartementDialog: boolean;
     private _viewDepartementDialog: boolean;
     public editDepartement$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchDepartement: DepartementVo ;

    // methods

    public findAll(){
     return this.http.get<Array<DepartementVo>>(this.API);
    }

    public save(): Observable<DepartementVo> {
         return this.http.post<DepartementVo>(this.API, this.selectedDepartement);
    }

    delete(departement: DepartementVo) {
         return this.http.delete<number>(this.API + 'id/' + departement.id);
    }


    public edit(): Observable<DepartementVo> {
        return this.http.put<DepartementVo>(this.API, this.selectedDepartement);
    }


     public findByCriteria(departement:DepartementVo): Observable<Array<DepartementVo>>{
           return this.http.post<Array<DepartementVo>>(this.API + 'search', departement);
    }

   public findByIdWithAssociatedList(departement:DepartementVo):Observable<DepartementVo>{
         return this.http.get<DepartementVo>(this.API + 'detail/id/' +departement.id);
    }

    // getters and setters


    get departements(): Array<DepartementVo> {
    if(this._departements == null){
    this._departements = new Array<DepartementVo>();
    }
return this._departements;
       }

    set departements(value: Array<DepartementVo>) {
        this._departements = value;
       }

    get selectedDepartement(): DepartementVo {
    if(this._selectedDepartement == null){
    this._selectedDepartement = new DepartementVo();
    }
           return this._selectedDepartement;
       }

    set selectedDepartement(value: DepartementVo) {
        this._selectedDepartement = value;
       }

    get departementSelections(): Array<DepartementVo> {
    if(this._departementSelections == null){
    this._departementSelections = new Array<DepartementVo>();
    }
        return this._departementSelections;
       }


    set departementSelections(value: Array<DepartementVo>) {
        this._departementSelections = value;
       }

    get createDepartementDialog(): boolean {
        return this._createDepartementDialog;
       }

    set createDepartementDialog(value: boolean) {
        this._createDepartementDialog = value;
       }

    get editDepartementDialog(): boolean {
        return this._editDepartementDialog;
       }

    set editDepartementDialog(value: boolean) {
        this._editDepartementDialog = value;
       }

    get viewDepartementDialog(): boolean {
        return this._viewDepartementDialog;
       }

    set viewDepartementDialog(value: boolean) {
        this._viewDepartementDialog = value;
       }

     get searchDepartement(): DepartementVo {
     if(this._searchDepartement==null){
    this._searchDepartement=new DepartementVo();
    }
        return this._searchDepartement;
    }

    set searchDepartement(value: DepartementVo) {
        this._searchDepartement = value;
       }

}
