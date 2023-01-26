import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from 'src/environments/environment';


import {TemplateEmailReplanificationVo} from '../model/TemplateEmailReplanification.model';


@Injectable({
  providedIn: 'root'
})
export class TemplateEmailReplanificationService {
    private API = '' ;
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/templateEmailReplanification/';
        });
    }
     private _templateEmailReplanifications: Array<TemplateEmailReplanificationVo> ;
     private _selectedTemplateEmailReplanification: TemplateEmailReplanificationVo;
     private _templateEmailReplanificationSelections: Array<TemplateEmailReplanificationVo>;
     private _createTemplateEmailReplanificationDialog: boolean;
     private _editTemplateEmailReplanificationDialog: boolean;
     private _viewTemplateEmailReplanificationDialog: boolean;
     public editTemplateEmailReplanification$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchTemplateEmailReplanification: TemplateEmailReplanificationVo ;

    // methods

    public findAll(){
     return this.http.get<Array<TemplateEmailReplanificationVo>>(this.API);
    }

    public save(): Observable<TemplateEmailReplanificationVo> {
         return this.http.post<TemplateEmailReplanificationVo>(this.API, this.selectedTemplateEmailReplanification);
    }

    delete(templateEmailReplanification: TemplateEmailReplanificationVo) {
         return this.http.delete<number>(this.API + 'id/' + templateEmailReplanification.id);
    }


    public edit(): Observable<TemplateEmailReplanificationVo> {
        return this.http.put<TemplateEmailReplanificationVo>(this.API, this.selectedTemplateEmailReplanification);
    }


     public findByCriteria(templateEmailReplanification:TemplateEmailReplanificationVo): Observable<Array<TemplateEmailReplanificationVo>>{
           return this.http.post<Array<TemplateEmailReplanificationVo>>(this.API + 'search', templateEmailReplanification);
    }

   public findByIdWithAssociatedList(templateEmailReplanification:TemplateEmailReplanificationVo):Observable<TemplateEmailReplanificationVo>{
         return this.http.get<TemplateEmailReplanificationVo>(this.API + 'detail/id/' +templateEmailReplanification.id);
    }

    // getters and setters


    get templateEmailReplanifications(): Array<TemplateEmailReplanificationVo> {
    if(this._templateEmailReplanifications == null){
    this._templateEmailReplanifications = new Array<TemplateEmailReplanificationVo>();
    }
return this._templateEmailReplanifications;
       }

    set templateEmailReplanifications(value: Array<TemplateEmailReplanificationVo>) {
        this._templateEmailReplanifications = value;
       }

    get selectedTemplateEmailReplanification(): TemplateEmailReplanificationVo {
    if(this._selectedTemplateEmailReplanification == null){
    this._selectedTemplateEmailReplanification = new TemplateEmailReplanificationVo();
    }
           return this._selectedTemplateEmailReplanification;
       }

    set selectedTemplateEmailReplanification(value: TemplateEmailReplanificationVo) {
        this._selectedTemplateEmailReplanification = value;
       }

    get templateEmailReplanificationSelections(): Array<TemplateEmailReplanificationVo> {
    if(this._templateEmailReplanificationSelections == null){
    this._templateEmailReplanificationSelections = new Array<TemplateEmailReplanificationVo>();
    }
        return this._templateEmailReplanificationSelections;
       }


    set templateEmailReplanificationSelections(value: Array<TemplateEmailReplanificationVo>) {
        this._templateEmailReplanificationSelections = value;
       }

    get createTemplateEmailReplanificationDialog(): boolean {
        return this._createTemplateEmailReplanificationDialog;
       }

    set createTemplateEmailReplanificationDialog(value: boolean) {
        this._createTemplateEmailReplanificationDialog = value;
       }

    get editTemplateEmailReplanificationDialog(): boolean {
        return this._editTemplateEmailReplanificationDialog;
       }

    set editTemplateEmailReplanificationDialog(value: boolean) {
        this._editTemplateEmailReplanificationDialog = value;
       }

    get viewTemplateEmailReplanificationDialog(): boolean {
        return this._viewTemplateEmailReplanificationDialog;
       }

    set viewTemplateEmailReplanificationDialog(value: boolean) {
        this._viewTemplateEmailReplanificationDialog = value;
       }

     get searchTemplateEmailReplanification(): TemplateEmailReplanificationVo {
     if(this._searchTemplateEmailReplanification==null){
    this._searchTemplateEmailReplanification=new TemplateEmailReplanificationVo();
    }
        return this._searchTemplateEmailReplanification;
    }

    set searchTemplateEmailReplanification(value: TemplateEmailReplanificationVo) {
        this._searchTemplateEmailReplanification = value;
       }

}
