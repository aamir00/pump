import { ModelVariable } from '@wavemaker/app-rn-runtime/variables/model-variable';
import { ServiceVariable } from '@wavemaker/app-rn-runtime/variables/service-variable';
import { LiveVariable } from '@wavemaker/app-rn-runtime/variables/live-variable';
import { NavigationAction } from '@wavemaker/app-rn-runtime/actions/navigation-action';
import { TimerAction } from '@wavemaker/app-rn-runtime/actions/timer-action';
import { NotificationAction } from '@wavemaker/app-rn-runtime/actions/notification-action';
import { DeviceVariable } from '@wavemaker/app-rn-runtime/variables/device-variable';
import { LoginAction } from '@wavemaker/app-rn-runtime/actions/login-action';
import { LogoutAction } from '@wavemaker/app-rn-runtime/actions/logout-action';
import {
  getEntityPropertyMap,
  getEntityRelatedTables,
} from '../metadata/entities/entity-provider';
import WmPartialContainer from '@wavemaker/app-rn-runtime/components/page/partial-container/partial-container.component';
import React from 'react';

export default App => {
  return {
    Variables: {
      appInfo: new DeviceVariable({
        name: 'appInfo',
        _context: App,
        operation: 'getAppInfo',
        service: 'device',
        paramProvider: () => ({}),
      }),
      deviceInfo: new DeviceVariable({
        name: 'deviceInfo',
        _context: App,
        operation: 'getDeviceInfo',
        service: 'device',
        paramProvider: () => ({}),
      }),
      loggedInUser: new ModelVariable({
        name: 'loggedInUser',
        _context: App,
        paramProvider: () => App.appConfig.loggedInUser,
      }),
      supportedLocale: new ModelVariable({
        name: 'supportedLocale',
        _context: App,
        paramProvider: () => ({ en: 'English' }),
      }),
    },
    Actions: {
      appNotification: new NotificationAction({
        name: 'appNotification',
        _context: App,
        operation: 'toast',
        paramProvider: () => ({
          class: 'Error',
          toasterPosition: 'bottom right',
        }),
        onOk: (variable, data, options) => {},
        toasterService: () => App.appConfig.currentPage.toaster,
        onClose: (variable, data, options) => {},
      }),
      goToPage_addShift: new NavigationAction({
        name: 'goToPage_addShift',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'addShift',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_Main: new NavigationAction({
        name: 'goToPage_Main',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'Main',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_Shifts: new NavigationAction({
        name: 'goToPage_Shifts',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'Shifts',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_workers: new NavigationAction({
        name: 'goToPage_workers',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'workers',
        }),
        appConfig: App.appConfig,
      }),
      loginAction: new LoginAction({
        name: 'loginAction',
        _context: App,
        paramProvider: () => ({}),
        baseURL: App.appConfig.url,
        securityService: () => App.appConfig.SecurityService,
        useDefaultSuccessHandler: true,
      }),
      logoutAction: new LogoutAction({
        name: 'logoutAction',
        _context: App,
        paramProvider: () => ({}),
        baseURL: App.appConfig.url,
        redirectTo: 'Login',
        useDefaultSuccessHandler: true,
        securityService: () => App.appConfig.SecurityService,
      }),
    },
  };
};
