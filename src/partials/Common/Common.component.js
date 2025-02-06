import React from 'react';

import { ScrollView } from 'react-native-gesture-handler';

import { AssetProvider } from '@wavemaker/app-rn-runtime/core/asset.provider';
import BasePartial from '@wavemaker/app-rn-runtime/runtime/base-partial.component';
import { useWatcher } from '@wavemaker/app-rn-runtime/runtime/watcher';
import { WmMemo } from '@wavemaker/app-rn-runtime/runtime/memo.component';
import { ThemeProvider } from '@wavemaker/app-rn-runtime/styles/theme';
import WmAlertdialog from '@wavemaker/app-rn-runtime/components/dialogs/alertdialog/alertdialog.component';
import WmConfirmdialog from '@wavemaker/app-rn-runtime/components/dialogs/confirmdialog/confirmdialog.component';
import WmPartial from '@wavemaker/app-rn-runtime/components/page/partial/partial.component';
import { isWebPreviewMode } from '@wavemaker/app-rn-runtime/core/utils';

import { merge, get as _get } from 'lodash';
import ResourceResolver from '../../resolve/resource.resolver';
import addPartialScript from './Common.script';
import styles from './Common.style';
import getVariables from './Common.variables';

const FragmentContext = React.createContext();

const PC_Commonpage = ({ fragment }) => {
  return (
    <WmPartial
      name="CommonPage"
      listener={fragment}
      skeletonanimationresource={fragment.props.skeletonanimationresource}
      skeletonanimationspeed={fragment.props.skeletonanimationspeed}
      showskeleton={
        fragment.App.isSkeletonEnabled() && !fragment.startUpVariablesLoaded
          ? true
          : undefined
      }>
      <WmAlertdialog
        name="CommonAlertDialog"
        controller="NotificationDialogController"
        notificationdialog="alert"
        message={fragment.notification.text}
        title={fragment.notification.title}
        oktext={fragment.notification.okButtonText}
        alerttype={fragment.notification.alerttype}
        onOk={() => {
          fragment.notification.onOk();
        }}
        onClose={() => {
          fragment.notification.onClose();
        }}
        listener={fragment}></WmAlertdialog>
      <WmConfirmdialog
        name="CommonConfirmDialog"
        controller="NotificationDialogController"
        notificationdialog="confirm"
        message={fragment.notification.text}
        title={fragment.notification.title}
        oktext={fragment.notification.okButtonText}
        canceltext={fragment.notification.cancelButtonText}
        onOk={() => {
          fragment.notification.onOk();
        }}
        onCancel={() => {
          fragment.notification.onCancel();
        }}
        listener={fragment}></WmConfirmdialog>
    </WmPartial>
  );
};

export default class CommonPartial extends BasePartial {
  components;

  constructor(props) {
    super(props);
    this.pageParams = this.state.props;
    const _this = this.proxy;
    this.name = 'Common';
    this.theme = props.themeToUse || this.appConfig.theme;
    const styleOverrides = this.theme.getStyle(props.classname);
    this.theme = this.theme.$new('Common-styles', styles);
    if (styleOverrides) {
      this.theme = this.theme.$new('Common-styleOverrides', styleOverrides);
    }
  }

  init() {
    const data = getVariables(this.proxy);
    this.fragmentVariables = data.Variables;
    this.fragmentActions = data.Actions;
    this.Variables = Object.assign(this.Variables, data.Variables);
    this.Actions = Object.assign(this.Actions, data.Actions);
    this.startUpVariables = [];
    this.startUpActions = [];
    this.autoUpdateVariables = [];
    addPartialScript(this.App, this.proxy);
  }

  provideAsset = path => this.handleUrl(path);

  componentDidMount() {
    this.init();
    super.componentDidMount();
    super.onFragmentReady();
  }

  handleUrl(url) {
    return (
      this.App.handleUrl(url) ||
      ResourceResolver.resolve(url, this.resourceBaseUrl) ||
      super.handleUrl(url)
    );
  }

  renderPartial() {
    const fragment = this.proxy;
    return (
      <FragmentContext.Provider value={this.proxy}>
        <AssetProvider value={this.provideAsset}>
          <PC_Commonpage fragment={fragment} />
        </AssetProvider>
      </FragmentContext.Provider>
    );
  }
}
