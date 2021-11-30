import { createStore } from "vuex";
import { config } from "vuex-module-decorators";

import AuthModule from "@/store/modules/AuthModule";
import BodyModule from "@/store/modules/BodyModule";
import BreadcrumbsModule from "@/store/modules/BreadcrumbsModule";
import ConfigModule from "@/store/modules/ConfigModule";

import Route from "@/core/api/types";
import router from "@/router";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { API } from "@/core/api";

import Index from "@/views/Index.vue";
import { state, dynamicGetters, mutations, actions } from "@/store/reusable";

export interface Form {
  field: string | undefined;
  value: string | undefined;
}

export interface State {
  routes: Array<Route>;
  form: Form;
}

export default createStore<State>({
  state: {
    routes: [],
    form: {
      field: "",
      value: "",
    },
  },
  mutations: {
    addRoutes(state, newRoutes: Array<Route>) {
      state.routes = [...state.routes, ...newRoutes];

      state.routes.forEach((route) => {
        router.addRoute({
          ...route,
          redirect: "",
        });
      });
    },
    fillForm(state, value) {
      state.form = { ...state.form, ...value };
    },
  },
  getters: {
    routes: ({ routes }) => routes,
    formData: ({ form }) => form,
  },
  actions: {
    async loadRoutes({ commit }) {
      const routes: Array<Route> = await API.client.get("/routes");

      routes.forEach(({ name, path }) => {
        commit("addRoutes", [
          {
            name,
            path,
            component: Index,
          },
        ]);
      });
    },
    addRoutes({ commit }, routes) {
      commit("addRoutes", routes);
    },
    fillForm({ commit }, value) {
      commit("fillForm", value);
    },

    addFormModule(_, formName) {
      this.registerModule(`module_${formName}`, {
        state,
        getters: dynamicGetters,
        mutations,
        actions,
        namespaced: true,
      });
    },

    // addFormModule(context, formName: string, fields: Array<Field>) {
    //   // @ts-ignore
    //   this.registerModule(`module_${formName}`, {
    //     state,
    //     getters,
    //     mutations,
    //     namespaced: true,
    //   });
    // },
  },
  modules: {
    AuthModule,
    BodyModule,
    BreadcrumbsModule,
    ConfigModule,
  },
});
