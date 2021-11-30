export interface ScreenSettings {
  showInMenu: boolean;
  category: string;
  categoryOrder: number;
  menuOrder: number;
}

export interface SelectFieldOption {
  text: string;
  value: string;
}

export interface Dependency {
  name: Array<string>;
  typeId: number;
  value: Array<string | number>;
}

export interface Query {
  type: string;
  tablesQuery: Array<string>;
  columns: Array<string>;
  filter: Array<Record<string, unknown>>;
}

export interface Integration {
  executionOrder: string;
  integrationName: string;
  integrationId: string;
  method: string;
  endpoint: string;
  successMessage: string;
  jsonSuccessMessage: string;
  errorMessage: string;
  jsonErrorResponse: string;
  integrationDependency: Array<Dependency>;
  body: Record<string, unknown>;
}

export interface Field {
  name: string;
  label: string;
  type: string;
  required: boolean;
  initialData: string | number;
  options: Array<SelectFieldOption>;
  disabled: boolean;
  placeholder: string;
  mask: string;
  hint: string;
  maxLength: number;
  dependency: Array<Dependency>;
  query: Array<Query>;
  viewOnly: boolean;
  value: string | number;
  integrationSource: string;
  regex: string;
  maxDateToday: boolean;
  default: string | number;
  friendlyName: string;
}

export interface Action {
  type: number;
  text: string;
  friendlyName: string;
  redirectScreenName: string;
  query: Array<Query>;
  integration: Array<Integration>;
}

export interface ContainerSettings {
  renderType: string;
  labelPosition: string;
  fields: Array<Field>;
  actions: Array<Action>;
}

export interface Container {
  name: string;
  typeId: number;
  friendlyName: string;
  description: string;
  dataConnectionId: string;
  settings: ContainerSettings;
}

export interface Section {
  title: string;
  containers: Array<Container>;
}

export interface Screen {
  name: string;
  url: string;
  typeId: string;
  friendlyName: string;
  description: string;
  title: string;
  introText: string;
  settings: ScreenSettings;
  sections: Array<Section>;
}
