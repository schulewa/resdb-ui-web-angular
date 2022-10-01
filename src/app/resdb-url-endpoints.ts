export class ResdbUrlEndpoints {

  public static get API_URL(): string { return '/resdb/api'; }
  public static get CONFIG_URL(): string { return this.API_URL + '/config'; }
  public static get REFDATA_URL(): string { return this.API_URL + '/refdata'; }
  public static get RESEARCH_URL(): string { return  this.API_URL + '/research'; }

  public static get LOGIN_URL(): string { return this.API_URL + '/auth/login'; }

  public static get API_LOAD_USER_PRIVILEDGES(): string { return this.API_URL + '/userpriviledges'; }

  public static get LOCALSTORAGE_LOGGEDINUSER(): string { return 'loggedInUser'; }
  public static get LOCALSTORAGE_USERPRIVILEDGES(): string { return 'userPriviledges'; }

  // configuration

  public static get USER_URL(): string { return this.CONFIG_URL + '/users'; }
  public static get USER_GROUP_URL(): string { return this.CONFIG_URL + '/usergroups'; }

  // reference data

  public static get ADDRESS_TYPE_URL(): string { return this.REFDATA_URL + '/addresstypes'; }
  public static get ARTEFACT_GROUP_URL(): string { return this.REFDATA_URL + '/artefactgroups'; }
  public static get ARTEFACT_TYPE_URL(): string { return this.REFDATA_URL + '/artefacttypes'; }
  public static get CALENDAR_TYPE_URL(): string { return this.REFDATA_URL + '/calendartypes'; }
  public static get COUNTRY_URL(): string { return this.REFDATA_URL + '/countries'; }
  public static get DEITY_TYPE_URL(): string { return this.REFDATA_URL + '/deitytypes'; }
  public static get ENTITY_TYPE_URL(): string { return this.REFDATA_URL + '/entitytypes'; }
  public static get EVENT_TYPE_GROUP_URL(): string { return this.REFDATA_URL + '/eventtypegroups'; }
  public static get HIERARCHY_TYPE_URL(): string { return this.REFDATA_URL + '/hierarchytypes'; }
  public static get IMAGE_TYPE_URL(): string { return this.REFDATA_URL + '/imagetypes'; }
  public static get LANGUAGE_URL(): string { return this.REFDATA_URL + '/languages'; }
  public static get LANGUAGE_GROUP_URL(): string { return this.REFDATA_URL + '/languagegroups'; }
  public static get MEASURE_TYPE_URL(): string { return this.REFDATA_URL + '/measuretypes'; }
  public static get PERSON_URL(): string { return this.REFDATA_URL + '/persons'; }
  public static get PERSON_TYPE_URL(): string { return this.REFDATA_URL + '/persontypes'; }
    public static get PLACE_URL(): string { return this.REFDATA_URL + '/places'; }
  public static get PUBLICATION_TYPE_URL(): string { return this.REFDATA_URL + '/publicationtypes'; }
  public static get RACE_TYPE_URL(): string { return this.REFDATA_URL + '/racetypes'; }
  public static get REFERENCE_TYPE_URL(): string { return this.REFDATA_URL + '/referencetypes'; }
  public static get REGION_URL(): string { return this.REFDATA_URL + '/regions'; }
  public static get ROLE_URL(): string { return this.REFDATA_URL + '/roles'; }
  public static get TALE_TYPE_URL(): string { return this.REFDATA_URL + '/taletypes'; }
  public static get TITLE_URL(): string { return this.RESEARCH_URL + '/titles'; }
  public static get TECHNOLOGY_TYPE_GROUP_URL(): string { return this.REFDATA_URL + '/technologytypegroups'; }

}
