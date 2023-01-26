import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from 'src/environments/environment';


import {KoscEmployeeVo} from '../model/KoscEmployee.model';


@Injectable({
  providedIn: 'root'
})
export class KoscEmployeeService {
    private API = '' ;
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/koscEmployee/';
        });
    }
     private _koscEmployees: Array<KoscEmployeeVo> ;
     private _selectedKoscEmployee: KoscEmployeeVo;
     private _koscEmployeeSelections: Array<KoscEmployeeVo>;
     private _createKoscEmployeeDialog: boolean;
     private _editKoscEmployeeDialog: boolean;
     private _viewKoscEmployeeDialog: boolean;
     public editKoscEmployee$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchKoscEmployee: KoscEmployeeVo ;

    // methods

    public findAll(){
     return this.http.get<Array<KoscEmployeeVo>>(this.API);
    }

    public save(): Observable<KoscEmployeeVo> {
         return this.http.post<KoscEmployeeVo>(this.API, this.selectedKoscEmployee);
    }

    delete(koscEmployee: KoscEmployeeVo) {
         return this.http.delete<number>(this.API + 'id/' + koscEmployee.id);
    }


    public edit(): Observable<KoscEmployeeVo> {
        return this.http.put<KoscEmployeeVo>(this.API, this.selectedKoscEmployee);
    }


     public findByCriteria(koscEmployee:KoscEmployeeVo): Observable<Array<KoscEmployeeVo>>{
           return this.http.post<Array<KoscEmployeeVo>>(this.API + 'search', koscEmployee);
    }

   public findByIdWithAssociatedList(koscEmployee:KoscEmployeeVo):Observable<KoscEmployeeVo>{
         return this.http.get<KoscEmployeeVo>(this.API + 'detail/id/' +koscEmployee.id);
    }

    // getters and setters


    get koscEmployees(): Array<KoscEmployeeVo> {
    if(this._koscEmployees == null){
    this._koscEmployees = new Array<KoscEmployeeVo>();
    }
return this._koscEmployees;
       }

    set koscEmployees(value: Array<KoscEmployeeVo>) {
        this._koscEmployees = value;
       }

    get selectedKoscEmployee(): KoscEmployeeVo {
    if(this._selectedKoscEmployee == null){
    this._selectedKoscEmployee = new KoscEmployeeVo();
    }
           return this._selectedKoscEmployee;
       }

    set selectedKoscEmployee(value: KoscEmployeeVo) {
        this._selectedKoscEmployee = value;
       }

    get koscEmployeeSelections(): Array<KoscEmployeeVo> {
    if(this._koscEmployeeSelections == null){
    this._koscEmployeeSelections = new Array<KoscEmployeeVo>();
    }
        return this._koscEmployeeSelections;
       }


    set koscEmployeeSelections(value: Array<KoscEmployeeVo>) {
        this._koscEmployeeSelections = value;
       }

    get createKoscEmployeeDialog(): boolean {
        return this._createKoscEmployeeDialog;
       }

    set createKoscEmployeeDialog(value: boolean) {
        this._createKoscEmployeeDialog = value;
       }

    get editKoscEmployeeDialog(): boolean {
        return this._editKoscEmployeeDialog;
       }

    set editKoscEmployeeDialog(value: boolean) {
        this._editKoscEmployeeDialog = value;
       }

    get viewKoscEmployeeDialog(): boolean {
        return this._viewKoscEmployeeDialog;
       }

    set viewKoscEmployeeDialog(value: boolean) {
        this._viewKoscEmployeeDialog = value;
       }

     get searchKoscEmployee(): KoscEmployeeVo {
     if(this._searchKoscEmployee==null){
    this._searchKoscEmployee=new KoscEmployeeVo();
    }
        return this._searchKoscEmployee;
    }

    set searchKoscEmployee(value: KoscEmployeeVo) {
        this._searchKoscEmployee = value;
       }

}
