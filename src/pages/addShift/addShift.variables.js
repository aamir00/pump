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
      varCreateShift: new LiveVariable({
        name: 'varCreateShift',
        _context: Page,
        operation: 'insert',
        maxResults: '20',
        paramProvider: () => ({}),
        onSuccess: (variable, data, options) => {
          Page.Actions.goToPage_Shifts.invoke();
        },
        inFlightBehavior: 'executeLast',
        type: 'Shifts',
        liveSource: 'pump_man',
        baseUrl: Page.baseUrl,
        orderBy: 'createdAt desc',
        propertiesMap: getEntityPropertyMap('pump_man', 'Shifts'),
        relatedTables: getEntityRelatedTables('pump_man', 'Shifts'),
        category: 'wm.LiveVariable',
        tableName: 'shifts',
        tableType: 'TABLE',
      }),
      varGetWorkers: new ServiceVariable({
        name: 'varGetWorkers',
        _context: Page,
        serviceType: 'DataService',
        operation: 'getWorkers',
        service: 'pump_man',
        maxResults: '20',
        operationId: 'WorkersController_getWorkers',
        operationType: 'get',
        controller: 'Workers',
        paramProvider: () => ({}),
        baseUrl: Page.baseUrl + '/services',
        getServiceInfo: () =>
          Page.serviceDefinitions['WorkersController_getWorkers']
            ?.wmServiceOperationInfo,
        inFlightBehavior: 'executeLast',
      }),
      varListWorkers: new LiveVariable({
        name: 'varListWorkers',
        _context: Page,
        operation: 'read',
        maxResults: '100',
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
