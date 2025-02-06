import { AppInfoOperation } from '@wavemaker/app-rn-runtime/variables/device/device/app-info.operation';
import { DeviceInfoOperation } from '@wavemaker/app-rn-runtime/variables/device/device/device-info.operation';

import OperationProvider from '@wavemaker/app-rn-runtime/variables/device/operation.provider';

export const initialize = () => {
  const data = { appVersion: '0.0.1' };

  OperationProvider.set('device.getAppInfo', new AppInfoOperation(data));

  OperationProvider.set('device.getDeviceInfo', new DeviceInfoOperation());
};
