import React from 'react';

import { ScrollView } from 'react-native-gesture-handler';

import { AssetProvider } from '@wavemaker/app-rn-runtime/core/asset.provider';
import BasePage from '@wavemaker/app-rn-runtime/runtime/base-page.component';
import { useWatcher } from '@wavemaker/app-rn-runtime/runtime/watcher';
import { WmMemo } from '@wavemaker/app-rn-runtime/runtime/memo.component';
import { ThemeProvider } from '@wavemaker/app-rn-runtime/styles/theme';
import WmAppNavbar from '@wavemaker/app-rn-runtime/components/navigation/appnavbar/appnavbar.component';
import WmContent from '@wavemaker/app-rn-runtime/components/page/content/content.component';
import WmDatetime from '@wavemaker/app-rn-runtime/components/input/epoch/datetime/datetime.component';
import WmFormAction from '@wavemaker/app-rn-runtime/components/data/form/form-action/form-action.component';
import WmFormBody from '@wavemaker/app-rn-runtime/components/data/form/form-body/form-body.component';
import WmFormField from '@wavemaker/app-rn-runtime/components/data/form/form-field/form-field.component';
import WmFormFooter from '@wavemaker/app-rn-runtime/components/data/form/form-footer/form-footer.component';
import WmGridcolumn from '@wavemaker/app-rn-runtime/components/container/layoutgrid/gridcolumn/gridcolumn.component';
import WmGridrow from '@wavemaker/app-rn-runtime/components/container/layoutgrid/gridrow/gridrow.component';
import WmLabel from '@wavemaker/app-rn-runtime/components/basic/label/label.component';
import WmLayoutgrid from '@wavemaker/app-rn-runtime/components/container/layoutgrid/layoutgrid.component';
import WmLiveForm from '@wavemaker/app-rn-runtime/components/data/liveform/liveform.component';
import WmPage from '@wavemaker/app-rn-runtime/components/page/page.component';
import WmPageContent from '@wavemaker/app-rn-runtime/components/page/page-content/page-content.component';
import WmSelect from '@wavemaker/app-rn-runtime/components/input/select/select.component';
import WmTabbar from '@wavemaker/app-rn-runtime/components/page/tabbar/tabbar.component';
import { isWebPreviewMode } from '@wavemaker/app-rn-runtime/core/utils';

import { merge, get as _get } from 'lodash';
import ResourceResolver from '../../resolve/resource.resolver';
import addPageScript from './addShift.script';
import styles from './addShift.style';
import getVariables from './addShift.variables';

const FragmentContext = React.createContext();

const PC_Mobile_navbar1 = ({ fragment }) => {
  return (
    <WmAppNavbar
      name="mobile_navbar1"
      title="Add Shift"
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

const PC_Shiftworker = ({ fragment }) => {
  return (
    <WmFormField
      name="shiftWorker"
      displayname="Shift Worker"
      required={true}
      show={true}
      generator="assigned"
      type="string"
      maxchars={255}
      pc-display="true"
      mobile-display="true"
      tablet-display="true"
      widget="select"
      dataset={fragment.Variables.varListWorkers.dataSet}
      datafield="workerName"
      displayfield="workerName"
      formRef="ShiftsLiveForm1"
      primaryKey={false}
      isRelated={false}
      isDataSetBound={true}
      onChange={($event, widget, newVal, oldVal) => {
        fragment.Widgets.ShiftsLiveForm1 &&
          fragment.Widgets.ShiftsLiveForm1.props.onChange &&
          fragment.Widgets.ShiftsLiveForm1.props.onChange(
            $event,
            widget,
            newVal,
            oldVal
          );
      }}
      onValidate={widget => {
        widget.validateFormField.call(widget);
      }}
      formKey="shiftWorker"
      listener={fragment}
      renderFormFields={$formField => (
        <>
          <WmLabel
            caption={$formField.displayname}
            memoize="false"
            required={$formField.required}
            name="shiftWorker_formLabel"
            classname={
              'form-label shiftWorker_formLabel ' +
              fragment.getFormFieldStyles($formField, 'label')
            }
            listener={fragment}></WmLabel>
          <WmSelect
            name="shiftWorker"
            formfieldname="shiftWorker"
            formfield="true"
            memoize="false"
            required={$formField.required}
            regexp={$formField.regexp}
            validationmessage={$formField.validationmessage}
            datavalue={$formField.defaultvalue}
            disabled={$formField.disabled}
            readonly={$formField.readonly}
            dataset={$formField.dataset}
            displayfield={$formField.displayfield}
            datafield={$formField.datafield}
            classname={
              'form-widget-select ' +
              fragment.getFormFieldStyles($formField, 'commonField')
            }
            listener={fragment}></WmSelect>
        </>
      )}></WmFormField>
  );
};

const PC_Shiftstarttime = ({ fragment }) => {
  return (
    <WmFormField
      name="shiftStartTime"
      displayname="Shift Start Time"
      required={true}
      show={true}
      generator="assigned"
      type="datetime"
      pc-display="true"
      mobile-display="true"
      tablet-display="true"
      widget="datetime"
      formRef="ShiftsLiveForm1"
      primaryKey={false}
      isRelated={false}
      onChange={($event, widget, newVal, oldVal) => {
        fragment.Widgets.ShiftsLiveForm1 &&
          fragment.Widgets.ShiftsLiveForm1.props.onChange &&
          fragment.Widgets.ShiftsLiveForm1.props.onChange(
            $event,
            widget,
            newVal,
            oldVal
          );
      }}
      onValidate={widget => {
        widget.validateFormField.call(widget);
      }}
      formKey="shiftStartTime"
      listener={fragment}
      renderFormFields={$formField => (
        <>
          <WmLabel
            caption={$formField.displayname}
            memoize="false"
            required={$formField.required}
            name="shiftStartTime_formLabel"
            classname={
              'form-label shiftStartTime_formLabel ' +
              fragment.getFormFieldStyles($formField, 'label')
            }
            listener={fragment}></WmLabel>
          <WmDatetime
            name="shiftStartTime"
            formfieldname="shiftStartTime"
            formfield="true"
            memoize="false"
            required={$formField.required}
            regexp={$formField.regexp}
            validationmessage={$formField.validationmessage}
            datavalue={$formField.defaultvalue}
            disabled={$formField.disabled}
            readonly={$formField.readonly}
            mindate={$formField.mindate}
            maxdate={$formField.maxdate}
            datepattern={fragment.getDateTimeFormat($formField.datepattern)}
            outputformat={fragment.getDateTimeFormat($formField.outputformat)}
            locale={fragment.appConfig.selectedLocale}
            classname={
              'form-input form-datetime form-shiftStartTime-input ' +
              fragment.getFormFieldStyles($formField, 'commonField')
            }
            listener={fragment}></WmDatetime>
        </>
      )}></WmFormField>
  );
};

const PC_Shiftendtime = ({ fragment }) => {
  return (
    <WmFormField
      name="shiftEndTime"
      displayname="Shift End Time"
      required={true}
      show={true}
      generator="assigned"
      type="datetime"
      pc-display="true"
      mobile-display="true"
      tablet-display="true"
      widget="datetime"
      mindate={
        fragment.Widgets.ShiftsLiveForm1.formWidgets.shiftStartTime.datavalue
      }
      formRef="ShiftsLiveForm1"
      primaryKey={false}
      isRelated={false}
      onChange={($event, widget, newVal, oldVal) => {
        fragment.Widgets.ShiftsLiveForm1 &&
          fragment.Widgets.ShiftsLiveForm1.props.onChange &&
          fragment.Widgets.ShiftsLiveForm1.props.onChange(
            $event,
            widget,
            newVal,
            oldVal
          );
      }}
      onValidate={widget => {
        widget.validateFormField.call(widget);
      }}
      formKey="shiftEndTime"
      listener={fragment}
      renderFormFields={$formField => (
        <>
          <WmLabel
            caption={$formField.displayname}
            memoize="false"
            required={$formField.required}
            name="shiftEndTime_formLabel"
            classname={
              'form-label shiftEndTime_formLabel ' +
              fragment.getFormFieldStyles($formField, 'label')
            }
            listener={fragment}></WmLabel>
          <WmDatetime
            name="shiftEndTime"
            formfieldname="shiftEndTime"
            formfield="true"
            memoize="false"
            required={$formField.required}
            regexp={$formField.regexp}
            validationmessage={$formField.validationmessage}
            datavalue={$formField.defaultvalue}
            disabled={$formField.disabled}
            readonly={$formField.readonly}
            mindate={$formField.mindate}
            maxdate={$formField.maxdate}
            datepattern={fragment.getDateTimeFormat($formField.datepattern)}
            outputformat={fragment.getDateTimeFormat($formField.outputformat)}
            locale={fragment.appConfig.selectedLocale}
            classname={
              'form-input form-datetime form-shiftEndTime-input ' +
              fragment.getFormFieldStyles($formField, 'commonField')
            }
            listener={fragment}></WmDatetime>
        </>
      )}></WmFormField>
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
            <WmLiveForm
              errormessage=""
              title=""
              iconclass=""
              formlayout="inline"
              defaultmode="Edit"
              dataset={fragment.Variables.varCreateShift.dataSet}
              captionalign="left"
              captionposition="top"
              name="ShiftsLiveForm1"
              listener={fragment}
              onChange={($event, widget, newVal, oldVal) => {
                if (
                  fragment.Variables.varCreateShift?.twoWayBinding &&
                  newVal !== oldVal
                ) {
                  fragment.Variables.varCreateShift.dataSet[widget.props.name] =
                    newVal;
                }
              }}
              formSuccess={(formData, success, error) => {
                fragment.Variables.varCreateShift &&
                  fragment.Variables.varCreateShift.listRecords(
                    formData,
                    success,
                    error
                  );
              }}
              relatedData={formField => {
                fragment.Variables.varCreateShift &&
                  fragment.Variables.varCreateShift
                    .execute('getRelatedTableData', {
                      relatedField: formField.state.props.formKey,
                      pagesize: formField.limit,
                      orderBy: formField.orderby
                        ? _.replace(formField.orderby, /:/g, ' ')
                        : '',
                      filterFields: {},
                      filterExpr: formField.filterexpressions
                        ? formField.filterexpressions
                        : {},
                    })
                    .then(response => {
                      primaryKeys = fragment.Variables.varCreateShift.execute(
                        'getRelatedTablePrimaryKeys',
                        formField.state.props.formKey
                      );
                      displayField =
                        primaryKeys.length < 0 ? undefined : primaryKeys[0];
                      formField.updateFormWidgetDataset(response, displayField);
                    });
              }}
              formSubmit={(formData, operationType, success, error) => {
                if (fragment.Variables.varCreateShift) {
                  switch (operationType) {
                    case 'insert':
                      return fragment.Variables.varCreateShift.insertRecord(
                        formData,
                        success,
                        error
                      );
                    case 'update':
                      return fragment.Variables.varCreateShift.updateRecord(
                        formData,
                        success,
                        error
                      );
                    case 'delete':
                      return fragment.Variables.varCreateShift.deleteRecord(
                        formData,
                        success,
                        error
                      );
                    default:
                      return fragment.Variables.varCreateShift.listRecords(
                        formData,
                        success,
                        error
                      );
                  }
                }
              }}>
              <WmFormBody name="wm_form_body_cbfa04gi0c" listener={fragment}>
                <WmLayoutgrid
                  columns="1"
                  name="layoutgrid2"
                  listener={fragment}>
                  <WmGridrow name="gridrow7" listener={fragment}>
                    <WmGridcolumn
                      columnwidth={12}
                      name="gridcolumn9"
                      listener={fragment}>
                      <PC_Shiftworker fragment={fragment} />
                    </WmGridcolumn>
                  </WmGridrow>
                  <WmGridrow name="gridrow8" listener={fragment}>
                    <WmGridcolumn
                      columnwidth={12}
                      name="gridcolumn10"
                      listener={fragment}>
                      <PC_Shiftstarttime fragment={fragment} />
                    </WmGridcolumn>
                  </WmGridrow>
                  <WmGridrow name="gridrow9" listener={fragment}>
                    <WmGridcolumn
                      columnwidth={12}
                      name="gridcolumn11"
                      listener={fragment}>
                      <PC_Shiftendtime fragment={fragment} />
                    </WmGridcolumn>
                  </WmGridrow>
                </WmLayoutgrid>
              </WmFormBody>
              <WmFormFooter
                name="wm_form_footer_9hehghgcgc"
                listener={fragment}>
                <WmFormAction
                  iconclass="wi wi-refresh"
                  action="()=&gt; fragment.Widgets.ShiftsLiveForm1.formreset()"
                  show={true}
                  formKey="ShiftsLiveForm1"
                  name="ShiftsLiveForm1_button_formAction"
                  displayName="Reset"
                  updateMode={true}
                  btnClass="btn-default"
                  classname="form-reset btn-default"
                  listener={fragment}
                  formAction={$event => {
                    fragment.Widgets.ShiftsLiveForm1.formreset();
                  }}></WmFormAction>
                <WmFormAction
                  iconclass="wi wi-save"
                  show={true}
                  formKey="ShiftsLiveForm1"
                  name="ShiftsLiveForm1_submit_formAction"
                  displayName="Save"
                  updateMode={true}
                  action="()=&gt; fragment.Widgets.ShiftsLiveForm1.submit()"
                  btnClass="btn-primary"
                  classname="form-save btn-success"
                  listener={fragment}
                  formAction={$event => {
                    fragment.Widgets.ShiftsLiveForm1.submit();
                  }}></WmFormAction>
              </WmFormFooter>
            </WmLiveForm>
          </WmGridcolumn>
        </WmGridrow>
        <WmGridrow name="gridrow5" listener={fragment}>
          <WmGridcolumn
            columnwidth={12}
            name="gridcolumn7"
            listener={fragment}></WmGridcolumn>
        </WmGridrow>
        <WmGridrow name="gridrow6" listener={fragment}>
          <WmGridcolumn
            columnwidth={12}
            name="gridcolumn8"
            listener={fragment}></WmGridcolumn>
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

export default class addShiftPage extends BasePage {
  components;

  constructor(props) {
    super(props);
    const _this = this.proxy;
    this.name = 'addShift';
    this.theme = props.themeToUse || this.appConfig.theme;
    const styleOverrides = this.theme.getStyle(props.classname);
    this.theme = this.theme.$new('addShift-styles', styles);
    if (styleOverrides) {
      this.theme = this.theme.$new('addShift-styleOverrides', styleOverrides);
    }
  }

  init() {
    const data = getVariables(this.proxy);
    this.fragmentVariables = data.Variables;
    this.fragmentActions = data.Actions;
    this.Variables = Object.assign(this.Variables, data.Variables);
    this.Actions = Object.assign(this.Actions, data.Actions);
    this.startUpVariables = ['varGetWorkers', 'varListWorkers'];
    this.startUpActions = [];
    this.autoUpdateVariables = ['varGetWorkers', 'varListWorkers'];
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
