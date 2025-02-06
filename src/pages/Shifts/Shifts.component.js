import React from 'react';

import { ScrollView } from 'react-native-gesture-handler';

import { AssetProvider } from '@wavemaker/app-rn-runtime/core/asset.provider';
import BasePage from '@wavemaker/app-rn-runtime/runtime/base-page.component';
import { useWatcher } from '@wavemaker/app-rn-runtime/runtime/watcher';
import { WmMemo } from '@wavemaker/app-rn-runtime/runtime/memo.component';
import { ThemeProvider } from '@wavemaker/app-rn-runtime/styles/theme';
import WmAppNavbar from '@wavemaker/app-rn-runtime/components/navigation/appnavbar/appnavbar.component';
import WmButton from '@wavemaker/app-rn-runtime/components/basic/button/button.component';
import WmContent from '@wavemaker/app-rn-runtime/components/page/content/content.component';
import WmGridcolumn from '@wavemaker/app-rn-runtime/components/container/layoutgrid/gridcolumn/gridcolumn.component';
import WmGridrow from '@wavemaker/app-rn-runtime/components/container/layoutgrid/gridrow/gridrow.component';
import WmLabel from '@wavemaker/app-rn-runtime/components/basic/label/label.component';
import WmLayoutgrid from '@wavemaker/app-rn-runtime/components/container/layoutgrid/layoutgrid.component';
import WmLinearlayout from '@wavemaker/app-rn-runtime/components/container/linearlayout/linearlayout.component';
import WmLinearlayoutitem from '@wavemaker/app-rn-runtime/components/container/linearlayout/linearlayoutitem/linearlayoutitem.component';
import WmList from '@wavemaker/app-rn-runtime/components/data/list/list.component';
import WmListTemplate from '@wavemaker/app-rn-runtime/components/data/list/list-template/list-template.component';
import WmPage from '@wavemaker/app-rn-runtime/components/page/page.component';
import WmPageContent from '@wavemaker/app-rn-runtime/components/page/page-content/page-content.component';
import WmTabbar from '@wavemaker/app-rn-runtime/components/page/tabbar/tabbar.component';
import { isWebPreviewMode } from '@wavemaker/app-rn-runtime/core/utils';

import { merge, get as _get } from 'lodash';
import ResourceResolver from '../../resolve/resource.resolver';
import addPageScript from './Shifts.script';
import styles from './Shifts.style';
import getVariables from './Shifts.variables';

const FragmentContext = React.createContext();

const PC_Mobile_navbar1 = ({ fragment }) => {
  return (
    <WmAppNavbar
      name="mobile_navbar1"
      backbutton={false}
      title="Shifts"
      show={true}
      onBackbtnclick={() => {
        fragment.goBack();
      }}
      onDrawerbuttonpress={() => {
        fragment.toggleDrawer();
      }}
      listener={fragment}
      showDrawerButton={fragment.hasDrawer}></WmAppNavbar>
  );
};

const Shiftslist1item = React.memo(({ $item, $index, list, fragment }) => {
  const item = $item;
  const [currentItemWidgets] = React.useState({});
  list.itemWidgets = list.itemWidgets || [];
  list.itemWidgets[$index] = currentItemWidgets;
  const [listener] = React.useState({
    onComponentInit: c => {
      currentItemWidgets[c.name] = c;
      fragment.onComponentInit(c);
    },
    onComponentDestroy: c => {
      fragment.onComponentDestroy(c);
      delete currentItemWidgets[c.name];
    },
  });
  const { watch } = useWatcher(fragment.watcher);
  return (
    <>
      <WmListTemplate
        layout="inline"
        name="listtemplate1"
        id={'list_item_' + $index + '_listtemplate1'}
        listener={listener}>
        <WmLinearlayout
          direction="row"
          horizontalalign="left"
          spacing="12"
          verticalalign="center"
          name="linearlayout1"
          id={'repeat_item_' + $index + '_linearlayout1'}
          styles={{
            root: {
              paddingTop: 12,
              paddingRight: 12,
              paddingBottom: 12,
              paddingLeft: 12,
            },
            text: {},
          }}
          listener={listener}>
          <WmLinearlayoutitem
            flexgrow={1}
            name="linearlayoutitem2"
            id={'repeat_item_' + $index + '_linearlayoutitem2'}
            listener={listener}>
            <WmLinearlayout
              direction="row"
              name="linearlayout2"
              id={'repeat_item_' + $index + '_linearlayout2'}
              listener={listener}>
              <WmLinearlayoutitem
                name="linearlayoutitem3"
                id={'repeat_item_' + $index + '_linearlayoutitem3'}
                listener={listener}>
                <WmLabel
                  name="Title"
                  caption={$item.shiftWorker}
                  id={'repeat_item_' + $index + '_Title'}
                  styles={{
                    root: { fontWeight: 'bold' },
                    text: { fontWeight: 'bold' },
                  }}
                  classname="h4"
                  listener={listener}></WmLabel>
              </WmLinearlayoutitem>
              <WmLinearlayoutitem
                name="linearlayoutitem4"
                id={'repeat_item_' + $index + '_linearlayoutitem4'}
                marginLeft="12"
                styles={{ root: { marginLeft: 12 }, text: {} }}
                listener={listener}>
                <WmLabel
                  name="SubTitle"
                  caption={$item.shiftStartTime}
                  id={'repeat_item_' + $index + '_SubTitle'}
                  classname="h5"
                  listener={listener}></WmLabel>
              </WmLinearlayoutitem>
            </WmLinearlayout>
          </WmLinearlayoutitem>
        </WmLinearlayout>
      </WmListTemplate>
    </>
  );
});

const PC_Shiftslist1 = ({ fragment }) => {
  return (
    <WmList
      listclass="list-group"
      itemclass={(item, index) => 'list-group-item'}
      template="true"
      template-name="Text with Avatar List"
      itemsperrow={{ xs: 1, sm: 1, md: 1, lg: 1 }}
      statehandler="URL"
      name="ShiftsList1"
      dataset={fragment.Variables.varShiftDetails.dataSet}
      navigation="Pager"
      loadingdata={fragment.Variables.varShiftDetails.isExecuting}
      classname="media-list"
      listener={fragment}
      getNextPageData={($event, $list, page) => {
        return new Promise((resolve, reject) => {
          return (
            fragment.Variables.varShiftDetails.invoke &&
            fragment.Variables.varShiftDetails.invoke(
              {
                page: page,
              },
              response => {
                resolve(response);
              },
              reject
            )
          );
        });
      }}
      renderItem={($item, $index, list) => {
        return (
          <>
            <Shiftslist1item
              $item={$item}
              $index={$index}
              list={list}
              fragment={fragment}
            />
          </>
        );
      }}></WmList>
  );
};

const PC_Page_content1 = ({ fragment }) => {
  return (
    <WmPageContent
      columnwidth={12}
      name="page_content1"
      listener={fragment}
      showskeleton={
        fragment.App.isSkeletonEnabled() && !fragment.startUpVariablesLoaded
      }>
      <WmLayoutgrid name="layoutgrid1" columns="1" listener={fragment}>
        <WmGridrow name="gridrow1_1" listener={fragment}>
          <WmGridcolumn
            columnwidth={12}
            name="gridcolumn1_1"
            listener={fragment}></WmGridcolumn>
        </WmGridrow>
        <WmGridrow name="gridrow2_1" listener={fragment}>
          <WmGridcolumn
            columnwidth={12}
            name="gridcolumn2_1"
            listener={fragment}>
            <WmButton
              caption="Add Shift"
              type="button"
              name="button1"
              styles={{ root: { width: '100%' }, text: {} }}
              classname="btn-danger"
              listener={fragment}></WmButton>
          </WmGridcolumn>
        </WmGridrow>
        <WmGridrow name="gridrow3" listener={fragment}>
          <WmGridcolumn
            columnwidth={12}
            name="gridcolumn3_1"
            listener={fragment}></WmGridcolumn>
        </WmGridrow>
        <WmGridrow name="gridrow4" listener={fragment}>
          <WmGridcolumn
            columnwidth={12}
            name="gridcolumn4_1"
            listener={fragment}>
            <PC_Shiftslist1 fragment={fragment} />
          </WmGridcolumn>
        </WmGridrow>
      </WmLayoutgrid>
    </WmPageContent>
  );
};

const PC_Page1 = ({ fragment }) => {
  return (
    <WmPage name="page1" listener={fragment}>
      <PC_Mobile_navbar1 fragment={fragment} />
      <WmContent name="content1" listener={fragment}>
        <PC_Page_content1 fragment={fragment} />
      </WmContent>
      <WmTabbar
        name="mobile_tabbar1"
        listener={fragment}
        getDisplayExpression={label =>
          label && (fragment.appLocale[label.trim()] || label)
        }
        isActive={item =>
          fragment.appConfig.currentPage?.isActiveTabbarItem({
            label: item.label,
            link: item.link,
            links: [
              ...(item.childnavigation
                ? item.childnavigation.map(i => i.link)
                : []),
              item.link,
            ],
          })
        }
        activePage={fragment.appConfig.currentPage.pageName}></WmTabbar>
    </WmPage>
  );
};

export default class ShiftsPage extends BasePage {
  components;

  constructor(props) {
    super(props);
    const _this = this.proxy;
    this.name = 'Shifts';
    this.theme = props.themeToUse || this.appConfig.theme;
    const styleOverrides = this.theme.getStyle(props.classname);
    this.theme = this.theme.$new('Shifts-styles', styles);
    if (styleOverrides) {
      this.theme = this.theme.$new('Shifts-styleOverrides', styleOverrides);
    }
  }

  init() {
    const data = getVariables(this.proxy);
    this.fragmentVariables = data.Variables;
    this.fragmentActions = data.Actions;
    this.Variables = Object.assign(this.Variables, data.Variables);
    this.Actions = Object.assign(this.Actions, data.Actions);
    this.startUpVariables = ['varShiftDetails'];
    this.startUpActions = [];
    this.autoUpdateVariables = ['varShiftDetails'];
    addPageScript(this.App, this.proxy);
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

  renderPage() {
    const fragment = this.proxy;
    return (
      <FragmentContext.Provider value={this.proxy}>
        <AssetProvider value={this.provideAsset}>
          <PC_Page1 fragment={fragment} />
        </AssetProvider>
      </FragmentContext.Provider>
    );
  }
}
