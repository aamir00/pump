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
import WmDialog from '@wavemaker/app-rn-runtime/components/dialogs/dialog/dialog.component';
import WmDialogcontent from '@wavemaker/app-rn-runtime/components/dialogs/dialogcontent/dialogcontent.component';
import WmForm from '@wavemaker/app-rn-runtime/components/data/form/form.component';
import WmFormAction from '@wavemaker/app-rn-runtime/components/data/form/form-action/form-action.component';
import WmFormBody from '@wavemaker/app-rn-runtime/components/data/form/form-body/form-body.component';
import WmFormField from '@wavemaker/app-rn-runtime/components/data/form/form-field/form-field.component';
import WmFormFooter from '@wavemaker/app-rn-runtime/components/data/form/form-footer/form-footer.component';
import WmGridcolumn from '@wavemaker/app-rn-runtime/components/container/layoutgrid/gridcolumn/gridcolumn.component';
import WmGridrow from '@wavemaker/app-rn-runtime/components/container/layoutgrid/gridrow/gridrow.component';
import WmIcon from '@wavemaker/app-rn-runtime/components/basic/icon/icon.component';
import WmLabel from '@wavemaker/app-rn-runtime/components/basic/label/label.component';
import WmLayoutgrid from '@wavemaker/app-rn-runtime/components/container/layoutgrid/layoutgrid.component';
import WmLinearlayout from '@wavemaker/app-rn-runtime/components/container/linearlayout/linearlayout.component';
import WmLinearlayoutitem from '@wavemaker/app-rn-runtime/components/container/linearlayout/linearlayoutitem/linearlayoutitem.component';
import WmList from '@wavemaker/app-rn-runtime/components/data/list/list.component';
import WmListTemplate from '@wavemaker/app-rn-runtime/components/data/list/list-template/list-template.component';
import WmPage from '@wavemaker/app-rn-runtime/components/page/page.component';
import WmPageContent from '@wavemaker/app-rn-runtime/components/page/page-content/page-content.component';
import WmTabbar from '@wavemaker/app-rn-runtime/components/page/tabbar/tabbar.component';
import WmText from '@wavemaker/app-rn-runtime/components/input/text/text.component';
import { isWebPreviewMode } from '@wavemaker/app-rn-runtime/core/utils';

import { merge, get as _get } from 'lodash';
import ResourceResolver from '../../resolve/resource.resolver';
import addPageScript from './workers.script';
import styles from './workers.style';
import getVariables from './workers.variables';

const FragmentContext = React.createContext();

const PC_Mobile_navbar1 = ({ fragment }) => {
  return (
    <WmAppNavbar
      name="mobile_navbar1"
      title="Workers"
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

const Workerslist2item = React.memo(({ $item, $index, list, fragment }) => {
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
        name="listtemplate6"
        id={'list_item_' + $index + '_listtemplate6'}
        listener={listener}>
        <WmLinearlayout
          direction="row"
          horizontalalign="left"
          spacing="32"
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
              horizontalalign="left"
              verticalalign="top"
              id={'repeat_item_' + $index + '_linearlayout2'}
              listener={listener}>
              <WmLinearlayoutitem
                name="linearlayoutitem3"
                id={'repeat_item_' + $index + '_linearlayoutitem3'}
                listener={listener}>
                <WmLabel
                  name="Title"
                  caption={$item.workerName}
                  id={'repeat_item_' + $index + '_Title'}
                  styles={{
                    root: { fontWeight: 'bold' },
                    text: { fontWeight: 'bold' },
                  }}
                  classname="h4"
                  listener={listener}></WmLabel>
              </WmLinearlayoutitem>
            </WmLinearlayout>
          </WmLinearlayoutitem>
          <WmLinearlayoutitem
            name="linearlayoutitem5"
            id={'repeat_item_' + $index + '_linearlayoutitem5'}
            marginLeft="32"
            styles={{ root: { marginLeft: 32, width: 25 }, text: {} }}
            listener={listener}>
            <WmIcon
              iconclass="wm-sl-l sl-bin-2 fa-1x"
              iconsize={22}
              name="icon4"
              id={'repeat_item_' + $index + '_icon4'}
              listener={listener}></WmIcon>
          </WmLinearlayoutitem>
        </WmLinearlayout>
      </WmListTemplate>
    </>
  );
});

const PC_Workerslist2 = ({ fragment }) => {
  return (
    <WmList
      listclass="list-group"
      itemclass={(item, index) => 'list-group-item'}
      template="true"
      template-name="Text with Avatar List"
      itemsperrow={{ xs: 1, sm: 1, md: 1, lg: 1 }}
      statehandler="URL"
      name="WorkersList2"
      dataset={fragment.Variables.varListWorkers.dataSet}
      navigation="Pager"
      loadingdata={fragment.Variables.varListWorkers.isExecuting}
      classname="media-list"
      listener={fragment}
      getNextPageData={($event, $list, page) => {
        return new Promise((resolve, reject) => {
          return (
            fragment.Variables.varListWorkers.invoke &&
            fragment.Variables.varListWorkers.invoke(
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
            <Workerslist2item
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
        <WmGridrow name="gridrow3" listener={fragment}>
          <WmGridcolumn
            columnwidth={12}
            name="gridcolumn5"
            listener={fragment}></WmGridcolumn>
        </WmGridrow>
        <WmGridrow name="gridrow4" listener={fragment}>
          <WmGridcolumn columnwidth={12} name="gridcolumn6" listener={fragment}>
            <WmButton
              caption="Add Worker"
              type="button"
              name="button2"
              skeletonwidth={'100%'}
              onTap={() => {
                fragment.Widgets.dialogAddWorker.open();
              }}
              styles={{ root: { width: '100%' }, text: {} }}
              classname="btn-info"
              listener={fragment}></WmButton>
          </WmGridcolumn>
        </WmGridrow>
        <WmGridrow name="gridrow10" listener={fragment}>
          <WmGridcolumn
            columnwidth={12}
            name="gridcolumn8_1"
            styles={{ root: { paddingTop: 10 }, text: {} }}
            listener={fragment}></WmGridcolumn>
        </WmGridrow>
        <WmGridrow name="gridrow9_1" listener={fragment}>
          <WmGridcolumn
            columnwidth={12}
            name="gridcolumn7_1"
            listener={fragment}></WmGridcolumn>
        </WmGridrow>
        <WmGridrow name="gridrow5" listener={fragment}>
          <WmGridcolumn
            columnwidth={12}
            name="gridcolumn7"
            listener={fragment}></WmGridcolumn>
        </WmGridrow>
        <WmGridrow name="gridrow6" listener={fragment}>
          <WmGridcolumn columnwidth={12} name="gridcolumn8" listener={fragment}>
            <PC_Workerslist2 fragment={fragment} />
          </WmGridcolumn>
        </WmGridrow>
        <WmGridrow name="gridrow17_1" listener={fragment}>
          <WmGridcolumn
            columnwidth={12}
            name="gridcolumn23"
            listener={fragment}></WmGridcolumn>
        </WmGridrow>
        <WmGridrow name="gridrow18_1" listener={fragment}>
          <WmGridcolumn
            columnwidth={12}
            name="gridcolumn24"
            listener={fragment}></WmGridcolumn>
        </WmGridrow>
        <WmGridrow name="gridrow19" listener={fragment}>
          <WmGridcolumn
            columnwidth={12}
            name="gridcolumn25"
            listener={fragment}></WmGridcolumn>
        </WmGridrow>
        <WmGridrow name="gridrow20" listener={fragment}>
          <WmGridcolumn
            columnwidth={12}
            name="gridcolumn26"
            listener={fragment}></WmGridcolumn>
        </WmGridrow>
        <WmGridrow name="gridrow21" listener={fragment}>
          <WmGridcolumn
            columnwidth={12}
            name="gridcolumn27"
            listener={fragment}></WmGridcolumn>
        </WmGridrow>
        <WmGridrow name="gridrow22" listener={fragment}>
          <WmGridcolumn
            columnwidth={12}
            name="gridcolumn28"
            listener={fragment}></WmGridcolumn>
        </WmGridrow>
        <WmGridrow name="gridrow23" listener={fragment}>
          <WmGridcolumn
            columnwidth={12}
            name="gridcolumn29"
            listener={fragment}></WmGridcolumn>
        </WmGridrow>
        <WmGridrow name="gridrow24" listener={fragment}>
          <WmGridcolumn
            columnwidth={12}
            name="gridcolumn30"
            listener={fragment}></WmGridcolumn>
        </WmGridrow>
        <WmGridrow name="gridrow25" listener={fragment}>
          <WmGridcolumn
            columnwidth={12}
            name="gridcolumn31"
            listener={fragment}></WmGridcolumn>
        </WmGridrow>
      </WmLayoutgrid>
    </WmPageContent>
  );
};

const PC_Wm_data_json_workername = ({ fragment }) => {
  return (
    <WmFormField
      readonly={false}
      name="wm_data_json_workerName"
      displayname="Worker Name"
      type="string"
      show={true}
      widget="text"
      formRef="createWorkersForm2"
      isRelated="undefined"
      onChange={($event, widget, newVal, oldVal) => {
        fragment.Widgets.createWorkersForm2 &&
          fragment.Widgets.createWorkersForm2.props.onChange &&
          fragment.Widgets.createWorkersForm2.props.onChange(
            $event,
            widget,
            newVal,
            oldVal
          );
      }}
      onValidate={widget => {
        widget.validateFormField.call(widget);
      }}
      formKey="wm_data_json.workerName"
      listener={fragment}
      renderFormFields={$formField => (
        <>
          <WmLabel
            caption={$formField.displayname}
            memoize="false"
            required={$formField.required}
            name="wm_data_json_workerName_formLabel"
            classname={
              'form-label wm_data_json_workerName_formLabel ' +
              fragment.getFormFieldStyles($formField, 'label')
            }
            listener={fragment}></WmLabel>
          <WmText
            name="wm_data_json_workerName"
            formfieldname="wm_data_json_workerName"
            formfield="true"
            memoize="false"
            required={$formField.required}
            regexp={$formField.regexp}
            validationmessage={$formField.validationmessage}
            datavalue={$formField.defaultvalue}
            disabled={$formField.disabled}
            readonly={$formField.readonly}
            updateon={$formField.updateon || 'blur'}
            maxchars={fragment.toNumber($formField.maxchars)}
            showskeleton="undefined"
            classname={
              'form-input form-text form-wm_data_json_workerName-input ' +
              fragment.getFormFieldStyles($formField, 'commonField')
            }
            listener={fragment}></WmText>
        </>
      )}></WmFormField>
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
      <WmDialog
        dialogtype="design-dialog"
        type="page"
        modal={true}
        title="Add Worker"
        iconclass="wi wi-file-text"
        name="dialogAddWorker"
        onClose={() => {
          fragment.Variables.varListWorkers.listRecords();
        }}
        listener={fragment}>
        <WmDialogcontent name="wm_dialogcontent_1egaec5ad0" listener={fragment}>
          <WmLayoutgrid name="layoutgrid2" columns="1" listener={fragment}>
            <WmGridrow name="gridrow9" listener={fragment}>
              <WmGridcolumn
                columnwidth={12}
                name="gridcolumn13"
                listener={fragment}>
                <WmForm
                  errormessage=""
                  captionposition="top"
                  title=""
                  enctype="application/x-www-form-urlencoded"
                  method="post"
                  dataset={fragment.Variables.Pump_manCreateWorkers.dataSet}
                  captionalign="left"
                  name="createWorkersForm2"
                  listener={fragment}
                  onChange={($event, widget, newVal, oldVal) => {
                    if (
                      fragment.Variables.Pump_manCreateWorkers?.twoWayBinding &&
                      newVal !== oldVal
                    ) {
                      fragment.Variables.Pump_manCreateWorkers.dataSet[
                        widget.props.name
                      ] = newVal;
                    }
                  }}
                  formSubmit={(formData, success, error) => {
                    fragment.Variables.Pump_manCreateWorkers &&
                      fragment.Variables.Pump_manCreateWorkers.invoke(
                        formData,
                        success,
                        error
                      );
                  }}>
                  <WmFormBody
                    name="wm_form_body_c93e5e3c4g"
                    listener={fragment}>
                    <WmLayoutgrid
                      columns="1"
                      name="layoutgrid4"
                      listener={fragment}>
                      <WmGridrow
                        name="gridrow16"
                        listener={fragment}></WmGridrow>
                      <WmGridrow
                        name="gridrow17"
                        listener={fragment}></WmGridrow>
                      <WmGridrow name="gridrow18" listener={fragment}>
                        <WmGridcolumn
                          columnwidth={12}
                          name="gridcolumn18"
                          listener={fragment}>
                          <PC_Wm_data_json_workername fragment={fragment} />
                        </WmGridcolumn>
                      </WmGridrow>
                    </WmLayoutgrid>
                  </WmFormBody>
                  <WmFormFooter
                    name="wm_form_footer_8i96727h6a"
                    listener={fragment}>
                    <WmFormAction
                      iconclass="wi wi-refresh"
                      formKey="createWorkersForm2"
                      name="createWorkersForm2_reset_formAction"
                      displayName="Reset"
                      action="()=&gt; fragment.Widgets.createWorkersForm2.formreset()"
                      btnClass="btn-default"
                      classname="form-reset btn-default"
                      listener={fragment}
                      formAction={$event => {
                        fragment.Widgets.createWorkersForm2.formreset();
                      }}></WmFormAction>
                    <WmFormAction
                      iconclass="wi wi-save"
                      formKey="createWorkersForm2"
                      name="createWorkersForm2_submit_formAction"
                      displayName="Save"
                      action="()=&gt; fragment.Widgets.createWorkersForm2.submit()"
                      btnClass="btn-primary"
                      classname="form-save btn-success"
                      listener={fragment}
                      formAction={$event => {
                        fragment.Widgets.createWorkersForm2.submit();
                      }}></WmFormAction>
                  </WmFormFooter>
                </WmForm>
              </WmGridcolumn>
            </WmGridrow>
          </WmLayoutgrid>
        </WmDialogcontent>
      </WmDialog>
    </WmPage>
  );
};

export default class workersPage extends BasePage {
  components;

  constructor(props) {
    super(props);
    const _this = this.proxy;
    this.name = 'workers';
    this.theme = props.themeToUse || this.appConfig.theme;
    const styleOverrides = this.theme.getStyle(props.classname);
    this.theme = this.theme.$new('workers-styles', styles);
    if (styleOverrides) {
      this.theme = this.theme.$new('workers-styleOverrides', styleOverrides);
    }
  }

  init() {
    const data = getVariables(this.proxy);
    this.fragmentVariables = data.Variables;
    this.fragmentActions = data.Actions;
    this.Variables = Object.assign(this.Variables, data.Variables);
    this.Actions = Object.assign(this.Actions, data.Actions);
    this.startUpVariables = ['varListWorkers'];
    this.startUpActions = [];
    this.autoUpdateVariables = ['varListWorkers'];
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
