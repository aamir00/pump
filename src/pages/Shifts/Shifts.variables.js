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
      varShiftDetails: new LiveVariable({
        name: 'varShiftDetails',
        _context: Page,
        operation: 'read',
        maxResults: '20',
        paramProvider: () => ({}),
        inFlightBehavior: 'executeLast',
        type: 'Shifts',
        autoUpdate: true,
        liveSource: 'pump_man',
        baseUrl: Page.baseUrl,
        orderBy: 'createdAt desc',
        propertiesMap: getEntityPropertyMap('pump_man', 'Shifts'),
        relatedTables: getEntityRelatedTables('pump_man', 'Shifts'),
        category: 'wm.LiveVariable',
        tableName: 'shifts',
        tableType: 'TABLE',
      }),
    },
    Actions: {},
  };
};
