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
} from '../../../metadata/entities/entity-provider';
import WmPartialContainer from '@wavemaker/app-rn-runtime/components/page/partial-container/partial-container.component';
import React from 'react';

export default Page => {
  return {
    Variables: {
      Pump_manCreateWorkers: new ServiceVariable({
        name: 'Pump_manCreateWorkers',
        _context: Page,
        serviceType: 'DataService',
        operation: 'createWorkers',
        service: 'pump_man',
        maxResults: '20',
        operationId: 'WorkersController_createWorkers',
        operationType: 'post',
        controller: 'Workers',
        paramProvider: () => ({}),
        baseUrl: Page.baseUrl + '/services',
        getServiceInfo: () =>
          Page.serviceDefinitions['WorkersController_createWorkers']
            ?.wmServiceOperationInfo,
        onSuccess: (variable, data, options) => {
          Page.Widgets.dialogAddWorker.close();
        },
        inFlightBehavior: 'executeLast',
      }),
      varListWorkers: new LiveVariable({
        name: 'varListWorkers',
        _context: Page,
        operation: 'read',
        maxResults: '20',
        paramProvider: () => ({}),
        inFlightBehavior: 'executeLast',
        type: 'Workers',
        autoUpdate: true,
        liveSource: 'pump_man',
        baseUrl: Page.baseUrl,
        orderBy: 'workerName asc',
        propertiesMap: getEntityPropertyMap('pump_man', 'Workers'),
        relatedTables: getEntityRelatedTables('pump_man', 'Workers'),
        category: 'wm.LiveVariable',
        tableName: 'workers',
        tableType: 'TABLE',
      }),
    },
    Actions: {},
  };
};
