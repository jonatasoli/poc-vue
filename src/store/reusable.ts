import { Field } from "vee-validate";
import { API } from "@/core/api";

export interface Field {
  name: string;
  initialValue: string;
  value: string;
  type: string;
}

export interface FillFieldPayload {
  fieldName: string;
  value: string;
}

interface Action {
  id: number;
  url: string;
}

interface FormState {
  name: string;
  isValid: boolean;
  action: Array<Action>;
  fields: Array<Field>;
}

export const state = (): FormState => {
  return {
    name: "",
    isValid: false,
    action: [],
    fields: [],
  };
};

export const dynamicGetters = {
  formDefinition: (state: FormState) => {
    return state;
  },
  fieldDefinition: (state: FormState) => (fieldName: string) => {
    return state.fields.find((field) => field.name === fieldName);
  },
  formFields: ({ fields }: FormState) => {
    return fields;
  },
};

export const mutations = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  loadFormFields(state: FormState, fields: Array<Field>) {
    state.fields = fields;
  },

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  fillField(state: FormState, { fieldName, value }: FillFieldPayload) {
    state.fields = state.fields.map((field): Field => {
      return field.name === fieldName ? { ...field, value } : field;
    });
  },
};

export const actions = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  loadFormFields(context, payload: Array<Field>) {
    context.commit("loadFormFields", payload);
  },

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  fillField(context, payload: FillFieldPayload) {
    context.commit("fillField", payload);
  },

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async sendFormData({ state }, { id, url }: Action) {
    const { fields } = state;

    const data = { actionId: id, screenId: id, data: {} };
    fields.forEach((field: Field) => {
      data.data[field.name] = field.value;
    });

    console.log(url);
    const response = await API.client.post(url, data);
    console.log(response);
  },
};
