import React from 'react';

import { ScrollView } from 'react-native-gesture-handler';

import { AssetProvider } from '@wavemaker/app-rn-runtime/core/asset.provider';
import BasePartial from '@wavemaker/app-rn-runtime/runtime/base-partial.component';
import { useWatcher } from '@wavemaker/app-rn-runtime/runtime/watcher';
import { WmMemo } from '@wavemaker/app-rn-runtime/runtime/memo.component';
import { ThemeProvider } from '@wavemaker/app-rn-runtime/styles/theme';
import WmAnchor from '@wavemaker/app-rn-runtime/components/basic/anchor/anchor.component';
import WmNavItem from '@wavemaker/app-rn-runtime/components/navigation/navitem/navitem.component';
import WmNavbar from '@wavemaker/app-rn-runtime/components/navigation/navbar/navbar.component';
import WmPartial from '@wavemaker/app-rn-runtime/components/page/partial/partial.component';
import { isWebPreviewMode } from '@wavemaker/app-rn-runtime/core/utils';

import { merge, get as _get } from 'lodash';
import ResourceResolver from '../../resolve/resource.resolver';
import addPartialScript from './leftnav.script';
import styles from './leftnav.style';
import getVariables from './leftnav.variables';

const FragmentContext = React.createContext();

const PC_Leftnav = ({ fragment }) => {
  return (
    <WmPartial
      name="leftnav"
      type="left-panel"
      listener={fragment}
      skeletonanimationresource={fragment.props.skeletonanimationresource}
      skeletonanimationspeed={fragment.props.skeletonanimationspeed}
      showskeleton={
        fragment.App.isSkeletonEnabled() && !fragment.startUpVariablesLoaded
          ? true
          : undefined
      }>
      <WmNavbar
        getDisplayExpression={label =>
          label && (fragment.appLocale[label.trim()] || label)
        }
        type="pills"
        layout="stacked"
        name="nav1"
        classname="stackedNav "
        listener={fragment}>
        <WmNavItem
          getDisplayExpression={label =>
            label && (fragment.appLocale[label.trim()] || label)
          }
          name="nav_item1"
          defaultview="true"
          listener={fragment}>
          <WmAnchor
            caption="New Post"
            iconclass="wi wi-plus"
            name="anchor1"
            classname="navAnchorItem "
            listener={fragment}></WmAnchor>
        </WmNavItem>
        <WmNavItem
          getDisplayExpression={label =>
            label && (fragment.appLocale[label.trim()] || label)
          }
          name="nav_item2"
          defaultview="true"
          listener={fragment}>
          <WmAnchor
            caption="Bookmark"
            iconclass="wi wi-bookmark"
            name="anchor2"
            classname="navAnchorItem "
            listener={fragment}></WmAnchor>
        </WmNavItem>
        <WmNavItem
          getDisplayExpression={label =>
            label && (fragment.appLocale[label.trim()] || label)
          }
          name="nav_item3"
          defaultview="true"
          listener={fragment}>
          <WmAnchor
            caption="Official Twitter"
            iconclass="wi wi-bookmark"
            name="anchor3"
            classname="navAnchorItem "
            listener={fragment}></WmAnchor>
        </WmNavItem>
      </WmNavbar>
      <WmNavbar
        getDisplayExpression={label =>
          label && (fragment.appLocale[label.trim()] || label)
        }
        type="pills"
        layout="stacked"
        name="nav2"
        classname="stackedNav "
        listener={fragment}>
        <WmNavItem
          getDisplayExpression={label =>
            label && (fragment.appLocale[label.trim()] || label)
          }
          name="nav_item4"
          defaultview="true"
          listener={fragment}>
          <WmAnchor
            caption="Settings"
            name="anchor4"
            badgevalue="4"
            classname="navAnchorItem "
            listener={fragment}></WmAnchor>
        </WmNavItem>
        <WmNavItem
          getDisplayExpression={label =>
            label && (fragment.appLocale[label.trim()] || label)
          }
          name="nav_item5"
          defaultview="true"
          listener={fragment}>
          <WmAnchor
            caption="Help"
            name="anchor5"
            classname="navAnchorItem "
            listener={fragment}></WmAnchor>
        </WmNavItem>
        <WmNavItem
          getDisplayExpression={label =>
            label && (fragment.appLocale[label.trim()] || label)
          }
          name="nav_item6"
          defaultview="true"
          listener={fragment}>
          <WmAnchor
            caption="Send Feedback"
            name="anchor6"
            classname="navAnchorItem "
            listener={fragment}></WmAnchor>
        </WmNavItem>
      </WmNavbar>
    </WmPartial>
  );
};

export default class leftnavPartial extends BasePartial {
  components;

  constructor(props) {
    super(props);
    this.pageParams = this.state.props;
    const _this = this.proxy;
    this.name = 'leftnav';
    this.theme = props.themeToUse || this.appConfig.theme;
    const styleOverrides = this.theme.getStyle(props.classname);
    this.theme = this.theme.$new('leftnav-styles', styles);
    if (styleOverrides) {
      this.theme = this.theme.$new('leftnav-styleOverrides', styleOverrides);
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
          <PC_Leftnav fragment={fragment} />
        </AssetProvider>
      </FragmentContext.Provider>
    );
  }
}
