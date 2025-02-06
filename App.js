import 'react-native-gesture-handler';

import * as POLLYFILL from './polyfills';
import React, { useState, useCallback, useEffect } from 'react';
import 'setimmediate';

import {
  Alert,
  View,
  ImageBackground,
  PanResponder,
  Linking,
  LogBox,
} from 'react-native';
import axios from 'axios';
import moment from 'moment';
import * as _ from 'lodash';
import * as Font from 'expo-font';
import { createIconSet } from '@expo/vector-icons';
import * as Localization from 'expo-localization';
import BaseApp from '@wavemaker/app-rn-runtime/runtime/App';
import { WmMemo } from '@wavemaker/app-rn-runtime/runtime/memo.component';

import { isWebPreviewMode } from '@wavemaker/app-rn-runtime/core/utils';
import NetworkService from '@wavemaker/app-rn-runtime/core/network.service';
import StorageService from '@wavemaker/app-rn-runtime/core/storage.service';
import { ThemeEvent } from '@wavemaker/app-rn-runtime/styles/theme';
import BASE_THEME from '@wavemaker/app-rn-runtime/styles/theme';
import themeVariables from '@wavemaker/app-rn-runtime/styles/theme.variables';
import SecurityService from '@wavemaker/app-rn-runtime/runtime/services/app-security.service';
import AppI18nService from '@wavemaker/app-rn-runtime/runtime/services/app-i18n.service';
import WM from '@wavemaker/app-rn-runtime/runtime/platform.api';

import {
  getThemes,
  getSelectedTheme,
  hasAppTheme,
  setAppTheme,
  resolveThemeAsset,
} from './app.theme';
import styles from './app.style';
import fontConfig from './font.config';
import { resetTheme } from './revert-to-1.0.styles';
import LocaleResolver from './src/resolve/locale.resolver';
import ResourceResolver from './src/resolve/resource.resolver';
import WM_CUSTOM_FORMATTERS from './src/extensions/formatters';
import getAppVariables from './src/app.variables';
import bootstrap, { appConfig } from './bootstrap';
import CommonPartial from './src/partials/Common/Common.component';
import { initialize as initializeDeviceOperations } from './src/device-operation-loader';
import Lottie from 'lottie-react-native';
import RNRestart from 'react-native-restart';
import * as SplashScreen from 'expo-splash-screen';
import { UIPreferencesProvider } from '@wavemaker/app-rn-runtime/core/ui-preferences.context';

let _reloadApp = null;

class App extends BaseApp {
  constructor(props) {
    super(props);
    this.reload = () => {
      _reloadApp();
    };
    WM.App = this;
    this.timerId = false;
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponderCapture: () => {
        this.resetInactivityTimeout();
      },
    });
    this.userIdleTimeout = 60 * 60 * 1000;
    this.uiPreferences = { enableRipple: appConfig.preferences.enableRipple };
  }

  getSecurityInfo() {
    const defaultSecurityConfig = require('./metadata/app/security-config.json');
    SecurityService.defaultSecurityConfig = defaultSecurityConfig;
    return SecurityService.getLoggedInUserDetails(this.appConfig.url);
  }

  getServiceDefinitions() {
    return Promise.resolve(
      require('./metadata/app/service-definitions.json')
    ).then(data => {
      this.serviceDefinitions = data?.serviceDefs || {};
      Object.keys(this.serviceDefinitions).forEach(key => {
        var sv = this.serviceDefinitions[key]['wmServiceOperationInfo'];
        if (sv) {
          sv.proxySettings.mobile = sv.proxySettings.web;
        }
      });
      return this.serviceDefinitions;
    });
  }

  triggerStartupVariables() {
    return this.startUpVariables.map(
      s => this.Variables[s] && this.Variables[s].invoke()
    );
  }

  loadWmProperties() {
    return Promise.resolve(require('./src/wmProperties').default).then(
      appProperties => {
        this.appConfig.appProperties = appProperties;
        this.appConfig.landingPage = appProperties.homePage;
      }
    );
  }

  loadFonts() {
    fontConfig.fonts.map(
      f => (f.path = ResourceResolver.resolve(f.path, this.baseUrl))
    );
    const fonts = [
      ...themeVariables.INSTANCE.fontConfig?.fonts,
      ...fontConfig.fonts,
    ];
    themeVariables.INSTANCE.fontConfig?.fonts
      .filter(f => f.csspath)
      .map(f => {
        const iconStyle = f.csspath?.default;
        Object.keys(iconStyle).forEach(s =>
          this.appConfig.theme.addStyle(s, null, iconStyle[s])
        );
      });
    fontConfig.fonts
      .filter(f => f.csspath)
      .map(f => {
        f.csspath = f.csspath.replace('.css', '.js');
        const iconStyle = ResourceResolver.resolve(
          f.csspath,
          this.baseUrl
        )?.default;
        Object.keys(iconStyle).forEach(s =>
          this.appConfig.theme.addStyle(s, null, iconStyle[s])
        );
      });
    return Promise.all(
      fonts.map(fc => {
        const params = {};
        params[fc.name] = fc.path;
        return Font.loadAsync(params).catch(() => {
          console.error(`Not able to load Font ${fc}. `);
        });
      })
    );
  }

  set activeTheme(themeName) {
    this.setTheme(themeName);
  }

  get activeTheme() {
    return getSelectedTheme();
  }

  setTheme(name, variables) {
    StorageService.setItem('activeTheme', name);
    setAppTheme(name, variables).then(() => this.refresh());
  }

  setThemeVariables(variables) {
    this.setTheme(this.activeTheme, variables);
  }

  resetThemeVariables() {
    this.setTheme(this.activeTheme);
  }

  getTheme() {
    return StorageService.getItem('activeTheme').then(name => {
      return hasAppTheme(name).then(flag =>
        flag ? name : this.appConfig.appProperties.activeTheme
      );
    });
  }

  loadTheme() {
    return this.getTheme()
      .then(theme => setAppTheme(theme))
      .then(theme => {
        if (
          appConfig.preferences?.appStyle &&
          appConfig.preferences?.appStyle === '1.0'
        ) {
          // reset theme
          resetTheme(this.appConfig.theme);
        }
        return theme;
      });
  }

  get appLocale() {
    return this.appConfig.appLocale.messages;
  }

  get themes() {
    return getThemes();
  }

  bootstrap() {
    const data = getAppVariables(this);
    this.appConfig.theme = this.appConfig.theme.$new('app-styles', styles);
    this.cleanup.push(
      this.appConfig.theme.subscribe(ThemeEvent.CHANGE, () => {
        this.refresh();
      })
    );
    this.Variables = data.Variables;
    this.Actions = data.Actions;
    this.startUpVariables = [
      'appInfo',
      'deviceInfo',
      'loggedInUser',
      'supportedLocale',
    ];
    this.startUpActions = [];
    this.autoUpdateVariables = [];
    this.appConfig.SecurityService.loggedInUser = this.Variables.loggedInUser;
    Object.keys(WM_CUSTOM_FORMATTERS).forEach(k => {
      this.formatters.set(`custom.${k}`, WM_CUSTOM_FORMATTERS[k]);
    });
    attachScript(this);
    return bootstrap();
  }

  handleLocaleUrl(url) {
    return LocaleResolver.resolve(url);
  }

  handleUrl(url) {
    return resolveThemeAsset(url);
  }

  getDefaultLocale() {
    const appProperties = this.appConfig.appProperties;
    return Promise.resolve()
      .then(() => {
        if (appProperties.preferBrowserLang === 'true') {
          return Localization.getLocalizationAsync().then(
            localizationData => localizationData.locale
          );
        }
      })
      .then(
        userPreferredLocale =>
          userPreferredLocale || appProperties.defaultLanguage
      )
      .then(defaultLocale => {
        return appProperties.supportedLanguages[defaultLocale]
          ? defaultLocale
          : 'en';
      });
  }

  changeLocale(newLocale) {
    return Promise.resolve()
      .then(() => newLocale || AppI18nService.getSelectedLocale())
      .then(newLocale => newLocale || this.getDefaultLocale())
      .then(newLocale => {
        const needsRestart = AppI18nService.setSelectedLocale(newLocale);
        if (needsRestart) {
          RNRestart && RNRestart.Restart();
        }
        this.appConfig.selectedLocale = newLocale;
        return this.handleLocaleUrl(`i18n/${newLocale}.json`);
      })
      .then(data => {
        this.appConfig.appLocale = data;
        this.appConfig.currentPage &&
          this.appConfig.currentPage.resetAppLocale();
        this.appConfig.refresh();
      });
  }

  componentDidMount() {
    this.appConfig.getServiceDefinitions =
      this.getServiceDefinitions.bind(this);
    Promise.all([
      NetworkService.start(this.appConfig),
      this.getSecurityInfo().then(() => {
        console.log('Security info loaded');
      }),
      this.loadWmProperties()
        .then(() => this.loadTheme())
        .then(() => {
          console.log('Theme loaded');
        })
        .then(() => AppI18nService.init())
        .then(() => this.changeLocale())
        .then(() => {
          console.log('Locale files loaded');
        })
        .then(() => this.loadFonts())
        .then(() => {
          console.log('Font files loaded');
        })
        .then(() => initializeDeviceOperations())
        .then(() => {
          console.log('Loaded device operations loaded');
        })
        .then(() => this.bootstrap()),
    ])
      .then(() => super.componentDidMount())
      .catch(error => {
        console.error(error);
      })
      .then(() => this.props.onStart())
      .then(() => {
        this.appConfig.diagnostics.appReadyTime = Date.now();
        this.notify('appReady');
      });
    this.resetInactivityTimeout();
  }

  getCommonPartial() {
    return (
      <WmMemo
        watcher={this.watcher}
        render={watch => {
          return (
            <CommonPartial
              parentWatcher={this.watcher}
              listener={{
                onComponentInit: w => (this.commonPartial = w),
              }}></CommonPartial>
          );
        }}
      />
    );
  }

  onUserIdle() {
    // callback for user idle timeout
  }

  resetInactivityTimeout() {
    clearTimeout(this.timerId);
    this.timerId = setTimeout(() => {
      this.onUserIdle && this.onUserIdle();
    }, this.userIdleTimeout);
  }

  render() {
    return (
      <UIPreferencesProvider value={this.uiPreferences}>
        <View
          dir={
            AppI18nService.isRTLLocale(this.appConfig.selectedLocale)
              ? 'rtl'
              : null
          }
          style={{
            flex: 1,
            backgroundColor: themeVariables.INSTANCE.pageContentBgColor,
          }}
          {...this.panResponder.panHandlers}>
          {this.isStarted ? super.renderApp(this.getCommonPartial()) : null}
        </View>
      </UIPreferencesProvider>
    );
  }
}

const attachScript = App => {
  //auto refresh functions
  const setTimeout = App.lib.setTimeout;
  const setInterval = App.lib.setInterval;

  /*
   * Use App.getDependency for Dependency Injection
   * eg: var DialogService = App.getDependency('DialogService');
   */

  /* perform any action on the variables within this block(on-page-load) */
  App.onAppVariablesReady = function () {
    /*
     * variables can be accessed through 'App.Variables' property here
     * e.g. App.Variables.staticVariable1.getData()
     */
  };

  /* perform any action on session timeout here, e.g clearing some data, etc */
  App.onSessionTimeout = function () {
    /*
     * NOTE:
     * On re-login after session timeout:
     * if the same user logs in(through login dialog), app will retain its state
     * if a different user logs in, app will be reloaded and user is redirected to respective landing page configured in Security.
     */
  };

  /*
   * This application level callback function will be invoked after the invocation of PAGE level onPageReady function.
   * Use this function to write common logic across the pages in the application.
   * activePageName : name of the page
   * activePageScope: scope of the page
   * $activePageEl  : page jQuery element
   */
  App.onPageReady = function (
    activePageName,
    activePageScope,
    $activePageEl
  ) {};

  /*
   * This application level callback function will be invoked after a Variable receives an error from the target service.
   * Use this function to write common error handling logic across the application.
   * errorMsg:    The error message returned by the target service. This message will be displayed through appNotification variable
   *              You can change this though App.Variables.appNotification.setMessage(YOUR_CUSTOM_MESSAGE)
   * xhrObj:      The xhrObject used to make the service call
   *              This object contains useful information like statusCode, url, request/response body.
   */
  App.onServiceError = function (errorMsg, xhrObj) {};
};

export default props => {
  props = props || {};
  const [visible, setVisible] = useState(true);
  const [isAppStarted, setIsAppStarted] = useState(false);
  _reloadApp = useCallback(() => {
    setVisible(false);
    setTimeout(() => {
      setVisible(true);
    }, 100);
  }, [visible]);
  return visible ? (
    <>
      <App {...props} onStart={() => setIsAppStarted(true)} />
    </>
  ) : (
    <></>
  );
};
