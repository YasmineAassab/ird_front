import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from 'src/environments/environment';


import {RaisonArretTravailVo} from '../model/RaisonArretTravail.model';


@Injectable({
  providedIn: 'root'
})
export class RaisonArretTravailService {
    private API = '' ;
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/raisonArretTravail/';
        });
    }
     private _raisonArretTravails: Array<RaisonArretTravailVo> ;
     private _selectedRaisonArretTravail: RaisonArretTravailVo;
     private _raisonArretTravailSelections: Array<RaisonArretTravailVo>;
     private _createRaisonArretTravailDialog: boolean;
     private _editRaisonArretTravailDialog: boolean;
     private _viewRaisonArretTravailDialog: boolean;
     public editRaisonArretTravail$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchRaisonArretTravail: RaisonArretTravailVo ;

    // methods

    public findAll(){
     return this.http.get<Array<RaisonArretTravailVo>>(this.API);
    }

    public save(): Observable<RaisonArretTravailVo> {
         return this.http.post<RaisonArretTravailVo>(this.API, this.selectedRaisonArretTravail);
    }

    delete(raisonArretTravail: RaisonArretTravailVo) {
         return this.http.delete<number>(this.API + 'id/' + raisonArretTravail.id);
    }


    public edit(): Observable<RaisonArretTravailVo> {
        return this.http.put<RaisonArretTravailVo>(this.API, this.selectedRaisonArretTravail);
    }


     public findByCriteria(raisonArretTravail:RaisonArretTravailVo): Observable<Array<RaisonArretTravailVo>>{
           return this.http.post<Array<RaisonArretTravailVo>>(this.API + 'search', raisonArretTravail);
    }

   public findByIdWithAssociatedList(raisonArretTravail:RaisonArretTravailVo):Observable<RaisonArretTravailVo>{
         return this.http.get<RaisonArretTravailVo>(this.API + 'detail/id/' +raisonArretTravail.id);
    }

    // getters and setters


    get raisonArretTravails(): Array<RaisonArretTravailVo> {
    if(this._raisonArretTravails == null){
    this._raisonArretTravails = new Array<RaisonArretTravailVo>();
    }
return this._raisonArretTravails;
       }

    set raisonArretTravails(value: Array<RaisonArretTravailVo>) {
        this._raisonArretTravails = value;
       }

    get selectedRaisonArretTravail(): RaisonArretTravailVo {
    if(this._selectedRaisonArretTravail == null){
    this._selectedRaisonArretTravail = new RaisonArretTravailVo();
    }
           return this._selectedRaisonArretTravail;
       }

    set selectedRaisonArretTravail(value: RaisonArretTravailVo) {
        this._selectedRaisonArretTravail = value;
       }

    get raisonArretTravailSelections(): Array<RaisonArretTravailVo> {
    if(this._raisonArretTravailSelections == null){
    this._raisonArretTravailSelections = new Array<RaisonArretTravailVo>();
    }
        return this._raisonArretTravailSelections;
       }


    set raisonArretTravailSelections(value: Array<RaisonArretTravailVo>) {
        this._raisonArretTravailSelections = value;
       }

    get createRaisonArretTravailDialog(): boolean {
        return this._createRaisonArretTravailDialog;
       }

    set createRaisonArretTravailDialog(value: boolean) {
        this._createRaisonArretTravailDialog = value;
       }

    get editRaisonArretTravailDialog(): boolean {
        return this._editRaisonArretTravailDialog;
       }

    set editRaisonArretTravailDialog(value: boolean) {
        this._editRaisonArretTravailDialog = value;
       }

    get viewRaisonArretTravailDialog(): boolean {
        return this._viewRaisonArretTravailDialog;
       }

    set viewRaisonArretTravailDialog(value: boolean) {
        this._viewRaisonArretTravailDialog = value;
       }

     get searchRaisonArretTravail(): RaisonArretTravailVo {
     if(this._searchRaisonArretTravail==null){
    this._searchRaisonArretTravail=new RaisonArretTravailVo();
    }
        return this._searchRaisonArretTravail;
    }

    set searchRaisonArretTravail(value: RaisonArretTravailVo) {
        this._searchRaisonArretTravail = value;
       }

}
