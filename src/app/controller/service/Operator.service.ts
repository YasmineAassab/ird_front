import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from 'src/environments/environment';


import {OperatorVo} from '../model/Operator.model';


@Injectable({
  providedIn: 'root'
})
export class OperatorService {
    private API = '' ;
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/operator/';
        });
    }
     private _operators: Array<OperatorVo> ;
     private _selectedOperator: OperatorVo;
     private _operatorSelections: Array<OperatorVo>;
     private _createOperatorDialog: boolean;
     private _editOperatorDialog: boolean;
     private _viewOperatorDialog: boolean;
     public editOperator$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchOperator: OperatorVo ;

    // methods

    public findAll(){
     return this.http.get<Array<OperatorVo>>(this.API);
    }

    public save(): Observable<OperatorVo> {
         return this.http.post<OperatorVo>(this.API, this.selectedOperator);
    }

    delete(operator: OperatorVo) {
         return this.http.delete<number>(this.API + 'id/' + operator.id);
    }


    public edit(): Observable<OperatorVo> {
        return this.http.put<OperatorVo>(this.API, this.selectedOperator);
    }


     public findByCriteria(operator:OperatorVo): Observable<Array<OperatorVo>>{
           return this.http.post<Array<OperatorVo>>(this.API + 'search', operator);
    }

   public findByIdWithAssociatedList(operator:OperatorVo):Observable<OperatorVo>{
         return this.http.get<OperatorVo>(this.API + 'detail/id/' +operator.id);
    }

    // getters and setters


    get operators(): Array<OperatorVo> {
    if(this._operators == null){
    this._operators = new Array<OperatorVo>();
    }
return this._operators;
       }

    set operators(value: Array<OperatorVo>) {
        this._operators = value;
       }

    get selectedOperator(): OperatorVo {
    if(this._selectedOperator == null){
    this._selectedOperator = new OperatorVo();
    }
           return this._selectedOperator;
       }

    set selectedOperator(value: OperatorVo) {
        this._selectedOperator = value;
       }

    get operatorSelections(): Array<OperatorVo> {
    if(this._operatorSelections == null){
    this._operatorSelections = new Array<OperatorVo>();
    }
        return this._operatorSelections;
       }


    set operatorSelections(value: Array<OperatorVo>) {
        this._operatorSelections = value;
       }

    get createOperatorDialog(): boolean {
        return this._createOperatorDialog;
       }

    set createOperatorDialog(value: boolean) {
        this._createOperatorDialog = value;
       }

    get editOperatorDialog(): boolean {
        return this._editOperatorDialog;
       }

    set editOperatorDialog(value: boolean) {
        this._editOperatorDialog = value;
       }

    get viewOperatorDialog(): boolean {
        return this._viewOperatorDialog;
       }

    set viewOperatorDialog(value: boolean) {
        this._viewOperatorDialog = value;
       }

     get searchOperator(): OperatorVo {
     if(this._searchOperator==null){
    this._searchOperator=new OperatorVo();
    }
        return this._searchOperator;
    }

    set searchOperator(value: OperatorVo) {
        this._searchOperator = value;
       }

}
