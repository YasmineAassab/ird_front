import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from 'src/environments/environment';


import {TemplateEmailClientInjoinableVo} from '../model/TemplateEmailClientInjoinable.model';


@Injectable({
  providedIn: 'root'
})
export class TemplateEmailClientInjoinableService {
    private API = '' ;
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/templateEmailClientInjoinable/';
        });
    }
     private _templateEmailClientInjoinables: Array<TemplateEmailClientInjoinableVo> ;
     private _selectedTemplateEmailClientInjoinable: TemplateEmailClientInjoinableVo;
     private _templateEmailClientInjoinableSelections: Array<TemplateEmailClientInjoinableVo>;
     private _createTemplateEmailClientInjoinableDialog: boolean;
     private _editTemplateEmailClientInjoinableDialog: boolean;
     private _viewTemplateEmailClientInjoinableDialog: boolean;
     public editTemplateEmailClientInjoinable$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchTemplateEmailClientInjoinable: TemplateEmailClientInjoinableVo ;

    // methods

    public findAll(){
     return this.http.get<Array<TemplateEmailClientInjoinableVo>>(this.API);
    }

    public save(): Observable<TemplateEmailClientInjoinableVo> {
         return this.http.post<TemplateEmailClientInjoinableVo>(this.API, this.selectedTemplateEmailClientInjoinable);
    }

    delete(templateEmailClientInjoinable: TemplateEmailClientInjoinableVo) {
         return this.http.delete<number>(this.API + 'id/' + templateEmailClientInjoinable.id);
    }


    public edit(): Observable<TemplateEmailClientInjoinableVo> {
        return this.http.put<TemplateEmailClientInjoinableVo>(this.API, this.selectedTemplateEmailClientInjoinable);
    }


     public findByCriteria(templateEmailClientInjoinable:TemplateEmailClientInjoinableVo): Observable<Array<TemplateEmailClientInjoinableVo>>{
           return this.http.post<Array<TemplateEmailClientInjoinableVo>>(this.API + 'search', templateEmailClientInjoinable);
    }

   public findByIdWithAssociatedList(templateEmailClientInjoinable:TemplateEmailClientInjoinableVo):Observable<TemplateEmailClientInjoinableVo>{
         return this.http.get<TemplateEmailClientInjoinableVo>(this.API + 'detail/id/' +templateEmailClientInjoinable.id);
    }

    // getters and setters


    get templateEmailClientInjoinables(): Array<TemplateEmailClientInjoinableVo> {
    if(this._templateEmailClientInjoinables == null){
    this._templateEmailClientInjoinables = new Array<TemplateEmailClientInjoinableVo>();
    }
return this._templateEmailClientInjoinables;
       }

    set templateEmailClientInjoinables(value: Array<TemplateEmailClientInjoinableVo>) {
        this._templateEmailClientInjoinables = value;
       }

    get selectedTemplateEmailClientInjoinable(): TemplateEmailClientInjoinableVo {
    if(this._selectedTemplateEmailClientInjoinable == null){
    this._selectedTemplateEmailClientInjoinable = new TemplateEmailClientInjoinableVo();
    }
           return this._selectedTemplateEmailClientInjoinable;
       }

    set selectedTemplateEmailClientInjoinable(value: TemplateEmailClientInjoinableVo) {
        this._selectedTemplateEmailClientInjoinable = value;
       }

    get templateEmailClientInjoinableSelections(): Array<TemplateEmailClientInjoinableVo> {
    if(this._templateEmailClientInjoinableSelections == null){
    this._templateEmailClientInjoinableSelections = new Array<TemplateEmailClientInjoinableVo>();
    }
        return this._templateEmailClientInjoinableSelections;
       }


    set templateEmailClientInjoinableSelections(value: Array<TemplateEmailClientInjoinableVo>) {
        this._templateEmailClientInjoinableSelections = value;
       }

    get createTemplateEmailClientInjoinableDialog(): boolean {
        return this._createTemplateEmailClientInjoinableDialog;
       }

    set createTemplateEmailClientInjoinableDialog(value: boolean) {
        this._createTemplateEmailClientInjoinableDialog = value;
       }

    get editTemplateEmailClientInjoinableDialog(): boolean {
        return this._editTemplateEmailClientInjoinableDialog;
       }

    set editTemplateEmailClientInjoinableDialog(value: boolean) {
        this._editTemplateEmailClientInjoinableDialog = value;
       }

    get viewTemplateEmailClientInjoinableDialog(): boolean {
        return this._viewTemplateEmailClientInjoinableDialog;
       }

    set viewTemplateEmailClientInjoinableDialog(value: boolean) {
        this._viewTemplateEmailClientInjoinableDialog = value;
       }

     get searchTemplateEmailClientInjoinable(): TemplateEmailClientInjoinableVo {
     if(this._searchTemplateEmailClientInjoinable==null){
    this._searchTemplateEmailClientInjoinable=new TemplateEmailClientInjoinableVo();
    }
        return this._searchTemplateEmailClientInjoinable;
    }

    set searchTemplateEmailClientInjoinable(value: TemplateEmailClientInjoinableVo) {
        this._searchTemplateEmailClientInjoinable = value;
       }

}
