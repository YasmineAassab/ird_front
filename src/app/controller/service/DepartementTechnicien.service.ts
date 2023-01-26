import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from 'src/environments/environment';


import {DepartementTechnicienVo} from '../model/DepartementTechnicien.model';
import {DepartementVo} from '../model/Departement.model';
import {TechnicienVo} from '../model/Technicien.model';


@Injectable({
  providedIn: 'root'
})
export class DepartementTechnicienService {
    private API = '' ;
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/departementTechnicien/';
        });
    }
     private _departementTechniciens: Array<DepartementTechnicienVo> ;
     private _selectedDepartementTechnicien: DepartementTechnicienVo;
     private _departementTechnicienSelections: Array<DepartementTechnicienVo>;
     private _createDepartementTechnicienDialog: boolean;
     private _editDepartementTechnicienDialog: boolean;
     private _viewDepartementTechnicienDialog: boolean;
     public editDepartementTechnicien$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchDepartementTechnicien: DepartementTechnicienVo ;

    // methods

    public findAll(){
     return this.http.get<Array<DepartementTechnicienVo>>(this.API);
    }

    public save(): Observable<DepartementTechnicienVo> {
           return this.http.post<DepartementTechnicienVo>(this.API, {...this.selectedDepartementTechnicien,dateFin: moment(this.selectedDepartementTechnicien.dateFin).format('YYYY-MM-DD')});
    }

    delete(departementTechnicien: DepartementTechnicienVo) {
         return this.http.delete<number>(this.API + 'id/' + departementTechnicien.id);
    }


    public edit(): Observable<DepartementTechnicienVo> {
        return this.http.put<DepartementTechnicienVo>(this.API, this.selectedDepartementTechnicien);
    }


     public findByCriteria(departementTechnicien:DepartementTechnicienVo): Observable<Array<DepartementTechnicienVo>>{
           return this.http.post<Array<DepartementTechnicienVo>>(this.API + 'search', departementTechnicien);
    }

   public findByIdWithAssociatedList(departementTechnicien:DepartementTechnicienVo):Observable<DepartementTechnicienVo>{
         return this.http.get<DepartementTechnicienVo>(this.API + 'detail/id/' +departementTechnicien.id);
    }

    // getters and setters


    get departementTechniciens(): Array<DepartementTechnicienVo> {
    if(this._departementTechniciens == null){
    this._departementTechniciens = new Array<DepartementTechnicienVo>();
    }
return this._departementTechniciens;
       }

    set departementTechniciens(value: Array<DepartementTechnicienVo>) {
        this._departementTechniciens = value;
       }

    get selectedDepartementTechnicien(): DepartementTechnicienVo {
    if(this._selectedDepartementTechnicien == null){
    this._selectedDepartementTechnicien = new DepartementTechnicienVo();
    }
           return this._selectedDepartementTechnicien;
       }

    set selectedDepartementTechnicien(value: DepartementTechnicienVo) {
        this._selectedDepartementTechnicien = value;
       }

    get departementTechnicienSelections(): Array<DepartementTechnicienVo> {
    if(this._departementTechnicienSelections == null){
    this._departementTechnicienSelections = new Array<DepartementTechnicienVo>();
    }
        return this._departementTechnicienSelections;
       }


    set departementTechnicienSelections(value: Array<DepartementTechnicienVo>) {
        this._departementTechnicienSelections = value;
       }

    get createDepartementTechnicienDialog(): boolean {
        return this._createDepartementTechnicienDialog;
       }

    set createDepartementTechnicienDialog(value: boolean) {
        this._createDepartementTechnicienDialog = value;
       }

    get editDepartementTechnicienDialog(): boolean {
        return this._editDepartementTechnicienDialog;
       }

    set editDepartementTechnicienDialog(value: boolean) {
        this._editDepartementTechnicienDialog = value;
       }

    get viewDepartementTechnicienDialog(): boolean {
        return this._viewDepartementTechnicienDialog;
       }

    set viewDepartementTechnicienDialog(value: boolean) {
        this._viewDepartementTechnicienDialog = value;
       }

     get searchDepartementTechnicien(): DepartementTechnicienVo {
     if(this._searchDepartementTechnicien==null){
    this._searchDepartementTechnicien=new DepartementTechnicienVo();
    }
        return this._searchDepartementTechnicien;
    }

    set searchDepartementTechnicien(value: DepartementTechnicienVo) {
        this._searchDepartementTechnicien = value;
       }

}
