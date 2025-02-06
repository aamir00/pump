import { LogBox } from 'react-native';
import injector from '@wavemaker/app-rn-runtime/core/injector';
import Logger from '@wavemaker/app-rn-runtime/core/logger';
import StorageService from '@wavemaker/app-rn-runtime/core/storage.service';
import WM from '@wavemaker/app-rn-runtime/runtime/platform.api';
import AppI18nService from '@wavemaker/app-rn-runtime/runtime/services/app-i18n.service';
import appTheme from './app.theme';
import PageConfig from './src/pages/pages-config';
import PartialConfig from './src/partials/partial-config';
import SecurityService from '@wavemaker/app-rn-runtime/runtime/services/app-security.service';
import axios from 'axios';
import ResourceResolver from './src/resolve/resource.resolver';
import * as config from './wm_rn_config.json';

export const appConfig = {
  url:
    config.serverPath !== 'http://NOSERVERREQUIRED.com'
      ? config.serverPath
      : null,
  theme: appTheme,
  preferences: config.preferences,
  splash: { animationSrc: config.splash.animationSrc, src: config.splash.src },
  spinner: { loader: config.loader, json: {} },
  refresh: () => {},
  SecurityService: SecurityService,
  appLocale: {},
  diagnostics: {
    appStartTime: Date.now(),
    appReadyTime: Date.now(),
    pageStartTime: -1,
    pageReadyTime: -1,
  },
  revertLayoutToExpo50: config.revertLayoutToExpo50,
};

injector.set('APP_CONFIG', appConfig);
injector.I18nService.set(AppI18nService);

LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
global.wm = WM;
LogBox.ignoreAllLogs();
axios.defaults.withCredentials = true;
StorageService.target = config.id;

if (config.initScript) {
  const initScript = ResourceResolver.resolve(config.initScript, appConfig.url);
  initScript.default && initScript.default();
}

const bootstrap = () => {
  Logger.init();
  injector.set('AppConfig', appConfig);
  appConfig.appId = config.id;
  appConfig.pages = PageConfig;
  appConfig.partials = PartialConfig;
  appConfig.spinner.json = ResourceResolver.resolve(
    'resources/files/' + config.loader + '.json',
    appConfig.url
  );
  appConfig.refresh();
};
export default bootstrap;
