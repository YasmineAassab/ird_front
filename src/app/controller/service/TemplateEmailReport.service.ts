import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from 'src/environments/environment';


import {TemplateEmailReportVo} from '../model/TemplateEmailReport.model';


@Injectable({
  providedIn: 'root'
})
export class TemplateEmailReportService {
    private API = '' ;
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/templateEmailReport/';
        });
    }
     private _templateEmailReports: Array<TemplateEmailReportVo> ;
     private _selectedTemplateEmailReport: TemplateEmailReportVo;
     private _templateEmailReportSelections: Array<TemplateEmailReportVo>;
     private _createTemplateEmailReportDialog: boolean;
     private _editTemplateEmailReportDialog: boolean;
     private _viewTemplateEmailReportDialog: boolean;
     public editTemplateEmailReport$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchTemplateEmailReport: TemplateEmailReportVo ;

    // methods

    public findAll(){
     return this.http.get<Array<TemplateEmailReportVo>>(this.API);
    }

    public save(): Observable<TemplateEmailReportVo> {
         return this.http.post<TemplateEmailReportVo>(this.API, this.selectedTemplateEmailReport);
    }

    delete(templateEmailReport: TemplateEmailReportVo) {
         return this.http.delete<number>(this.API + 'id/' + templateEmailReport.id);
    }


    public edit(): Observable<TemplateEmailReportVo> {
        return this.http.put<TemplateEmailReportVo>(this.API, this.selectedTemplateEmailReport);
    }


     public findByCriteria(templateEmailReport:TemplateEmailReportVo): Observable<Array<TemplateEmailReportVo>>{
           return this.http.post<Array<TemplateEmailReportVo>>(this.API + 'search', templateEmailReport);
    }

   public findByIdWithAssociatedList(templateEmailReport:TemplateEmailReportVo):Observable<TemplateEmailReportVo>{
         return this.http.get<TemplateEmailReportVo>(this.API + 'detail/id/' +templateEmailReport.id);
    }

    // getters and setters


    get templateEmailReports(): Array<TemplateEmailReportVo> {
    if(this._templateEmailReports == null){
    this._templateEmailReports = new Array<TemplateEmailReportVo>();
    }
return this._templateEmailReports;
       }

    set templateEmailReports(value: Array<TemplateEmailReportVo>) {
        this._templateEmailReports = value;
       }

    get selectedTemplateEmailReport(): TemplateEmailReportVo {
    if(this._selectedTemplateEmailReport == null){
    this._selectedTemplateEmailReport = new TemplateEmailReportVo();
    }
           return this._selectedTemplateEmailReport;
       }

    set selectedTemplateEmailReport(value: TemplateEmailReportVo) {
        this._selectedTemplateEmailReport = value;
       }

    get templateEmailReportSelections(): Array<TemplateEmailReportVo> {
    if(this._templateEmailReportSelections == null){
    this._templateEmailReportSelections = new Array<TemplateEmailReportVo>();
    }
        return this._templateEmailReportSelections;
       }


    set templateEmailReportSelections(value: Array<TemplateEmailReportVo>) {
        this._templateEmailReportSelections = value;
       }

    get createTemplateEmailReportDialog(): boolean {
        return this._createTemplateEmailReportDialog;
       }

    set createTemplateEmailReportDialog(value: boolean) {
        this._createTemplateEmailReportDialog = value;
       }

    get editTemplateEmailReportDialog(): boolean {
        return this._editTemplateEmailReportDialog;
       }

    set editTemplateEmailReportDialog(value: boolean) {
        this._editTemplateEmailReportDialog = value;
       }

    get viewTemplateEmailReportDialog(): boolean {
        return this._viewTemplateEmailReportDialog;
       }

    set viewTemplateEmailReportDialog(value: boolean) {
        this._viewTemplateEmailReportDialog = value;
       }

     get searchTemplateEmailReport(): TemplateEmailReportVo {
     if(this._searchTemplateEmailReport==null){
    this._searchTemplateEmailReport=new TemplateEmailReportVo();
    }
        return this._searchTemplateEmailReport;
    }

    set searchTemplateEmailReport(value: TemplateEmailReportVo) {
        this._searchTemplateEmailReport = value;
       }

}
