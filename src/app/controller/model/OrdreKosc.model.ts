import {TemplateEmailReplanificationVo} from './TemplateEmailReplanification.model';
import {EtatDemandeKoscVo} from './EtatDemandeKosc.model';
import {TemplateEmailPlanificationVo} from './TemplateEmailPlanification.model';
import {TemplateEmailClotureVo} from './TemplateEmailCloture.model';
import {TemplateSuiviVo} from './TemplateSuivi.model';
import {OperatorVo} from './Operator.model';
import {DepartementVo} from './Departement.model';
import {TemplateEmailKoscVo} from './TemplateEmailKosc.model';
import {TemplateEmailReportVo} from './TemplateEmailReport.model';
import {ClientVo} from './Client.model';
import {TechnicienVo} from './Technicien.model';
import {TemplateEmailClientInjoinableVo} from './TemplateEmailClientInjoinable.model';


export class OrdreKoscVo {

    public id: number;
    public numeroDernierAppel: number;

    public reference: string;
    public referenceWorkOrder: string;
    public codeDecharge: string;
    public supplierService: string;
    public dateDebutTraitement: Date;
    public endCustumorName: string;
    public endCustumorSiret: string;
    public endCustumorFirstName: string;
    public endCustumorLastName: string;
    public endCustumorZipcode: string;
    public endCustumorStreetName: string;
    public endCustumorStreetNumber: string;
    public endCustumorCity: string;
    public endCustumorBuilding: string;
    public endCustumorStairs: string;
    public endCustumorFloor: string;
    public endCustumorContactFirstName: string;
    public endCustumorContactLastName: string;
    public endCustumorContactPhone: string;
    public endCustumorContactCellPhone: string;
    public endCustumorContactEmail: string;
    public company: string;
    public referenDossier: string;
    public submissionDate: Date;
    public dateDernierAppel: Date;
    public datePremierAppel: Date;
    public dateDeuxiemeAppel: Date;
    public dateTroisiemeAppel: Date;
    public datePriseRdv: Date;
    public dateRdv: Date;
    public dateAppelReplanification: Date;
    public dateInterventionTechnique: Date;
    public dateOuverture: Date;
    public envoiMailClient: null | boolean;
    public envoiMailKosc: null | boolean;
    public coordonnePboY: string;
    public hauteurPbo: string;
    public typeMaterielPbo: string;
    public typePbo: string;
    public conditionSyndics: string;
    public typeRacordementPboPto: string;
    public autreInfosPboPto: string;
    public codeAccesImmeuble: string;
    public contacteImmeuble: string;
    public pmaAccessible: string;
    public infoObtentionCle: string;
    public localeIpm: string;
    public contactsSyndic: string;
    public racordementLong: null | boolean;
    public oc1: string;
    public nomModulePm1: string;
    public positionModulePm1: string;
    public referenceCableModulePm1: string;
    public referenceTubeModulePm1: string;
    public informationFibreModulePm1: string;
    public referenceCablePbo1: string;
    public informationTubePbo1: string;
    public informationFibrePbo1: string;
    public connecteurPriseNumero1: string;
    public connecteurPriseCouleur1: string;
    public reserve1: string;
    public oc2: string;
    public nomModulePm2: string;
    public positionModulePm2: string;
    public referenceCableModulePm2: string;
    public referenceTubeModulePm2: string;
    public informationFibreModulePm2: string;
    public referenceCablePbo2: string;
    public informationTubePbo2: string;
    public informationFibrePbo2: string;
    public connecteurPriseNumero2: string;
    public connecteurPriseCouleur2: string;
    public reserve2: string;
    public oc3: string;
    public nomModulePm3: string;
    public positionModulePm3: string;
    public referenceCableModulePm3: string;
    public referenceTubeModulePm3: string;
    public informationFibreModulePm3: string;
    public referenceCablePbo3: string;
    public informationTubePbo3: string;
    public informationFibrePbo3: string;
    public connecteurPriseNumero3: string;
    public connecteurPriseCouleur3: string;
    public reserve3: string;
    public oc4: string;
    public nomModulePm4: string;
    public positionModulePm4: string;
    public referenceCableModulePm4: string;
    public referenceTubeModulePm4: string;
    public informationFibreModulePm4: string;
    public referenceCablePbo4: string;
    public informationTubePbo4: string;
    public informationFibrePbo4: string;
    public connecteurPriseNumero4: string;
    public connecteurPriseCouleur4: string;
    public reserve4: string;
    public dateEnvoiCri: Date;
    public pboReel: string;
    public numeroSerieOnt: string;
    public workOrderType: string;
    public product: string;
    public provider: string;
    public providerFileType: string;
    public spliter: string;
    public existingOtp: null | boolean;
    public profile: string;
    public comment: string;
    public providerSlId: string;
    public referencePrestationPrise: string;
    public dateInterventionTechniqueDebut: Date;
    public dateInterventionTechniqueFin: Date;
    public objetClient: string;
    public corpsClient: string;
    public envoyeClient: null | boolean;
    public dateEnvoiClient: Date;
    public objetKosc: string;
    public corpsKosc: string;
    public envoyeKosc: null | boolean;
    public dateEnvoiKosc: Date;
    public objetPlanification: string;
    public corpsPlanification: string;
    public envoyePlanification: null | boolean;
    public dateEnvoiPlanification: Date;
    public objetReplanification: string;
    public corpsReplanification: string;
    public envoyeReplanification: null | boolean;
    public dateEnvoiReplanification: Date;
    public objetReport: string;
    public corpsReport: string;
    public envoyeReport: null | boolean;
    public dateEnvoiReport: Date;
    public commentaireTechnicien: string;
    public commentaireClient: string;
    public commantaireCloture: string;
    public objetCloture: string;
    public corpsCloture: string;
    public envoyeCloture: null | boolean;
    public dateEnvoiCloture: Date;
    public emailCloturePieceJoints: string;
    public objetSuivi: string;
    public corpsSuivi: string;
    public envoyeSuivi: null | boolean;
    public dateEnvoiSuivi: Date;
    public dateDebutTraitementMax: string;
    public dateDebutTraitementMin: string;
    public submissionDateMax: string;
    public submissionDateMin: string;
    public datePremierAppelMax: string;
    public datePremierAppelMin: string;
    public dateDeuxiemeAppelMax: string;
    public dateDeuxiemeAppelMin: string;
    public dateTroisiemeAppelMax: string;
    public dateTroisiemeAppelMin: string;
    public datePriseRdvMax: string;
    public datePriseRdvMin: string;
    public dateRdvMax: string;
    public dateRdvMin: string;
    public dateAppelReplanificationMax: string;
    public dateAppelReplanificationMin: string;
    public dateInterventionTechniqueMax: string;
    public dateInterventionTechniqueMin: string;
    public dateOuvertureMax: string;
    public dateOuvertureMin: string;
    public dateEnvoiCriMax: string;
    public dateEnvoiCriMin: string;
    public dateInterventionTechniqueDebutMax: string;
    public dateInterventionTechniqueDebutMin: string;
    public dateInterventionTechniqueFinMax: string;
    public dateInterventionTechniqueFinMin: string;
    public dateEnvoiClientMax: string;
    public dateEnvoiClientMin: string;
    public dateEnvoiKoscMax: string;
    public dateEnvoiKoscMin: string;
    public dateEnvoiPlanificationMax: string;
    public dateEnvoiPlanificationMin: string;
    public dateEnvoiReplanificationMax: string;
    public dateEnvoiReplanificationMin: string;
    public dateEnvoiReportMax: string;
    public dateEnvoiReportMin: string;
    public dateEnvoiClotureMax: string;
    public dateEnvoiClotureMin: string;
    public dateEnvoiSuiviMax: string;
    public dateEnvoiSuiviMin: string;
    public operatorVo: OperatorVo;
    public departementVo = new DepartementVo();
    public technicienVo: TechnicienVo;
    public clientVo: ClientVo;
    public templateEmailClientInjoinableVo: TemplateEmailClientInjoinableVo;
    public templateEmailKoscVo: TemplateEmailKoscVo;
    public templateEmailPlanificationVo: TemplateEmailPlanificationVo;
    public templateEmailReplanificationVo: TemplateEmailReplanificationVo;
    public templateEmailReportVo: TemplateEmailReportVo;
    public etatDemandeKoscVo: EtatDemandeKoscVo;
    public templateEmailClotureVo: TemplateEmailClotureVo;
    public templateSuiviVo: TemplateSuiviVo;

}
