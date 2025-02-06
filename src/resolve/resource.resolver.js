import { isString } from 'lodash';
import { isFullPathUrl } from '@wavemaker/app-rn-runtime/core/utils';

const resourceStore = {
  'resources/assets/icon.png': () =>
    require('../../assets/resources/assets/icon.png'),
  'resources/assets/splash.png': () =>
    require('../../assets/resources/assets/splash.png'),
  'resources/i18n/en.json': () =>
    require('../../assets/resources/i18n/en.json'),
  'resources/images/imagelists/default-image.png': () =>
    require('../../assets/resources/images/imagelists/default-image.png'),
  'resources/images/imagelists/loader.gif': () =>
    require('../../assets/resources/images/imagelists/loader.gif'),
  'resources/images/imagelists/spinner-small.gif': () =>
    require('../../assets/resources/images/imagelists/spinner-small.gif'),
  'resources/images/logos/Other/logo.png': () =>
    require('../../assets/resources/images/logos/Other/logo.png'),
  'resources/images/logos/Other/wavemaker_62x62.png': () =>
    require('../../assets/resources/images/logos/Other/wavemaker_62x62.png'),
};

export default {
  resolve: (path, baseUrl) => {
    if (!isString(path)) {
      return path;
    }
    if (baseUrl && !resourceStore[path] && !isFullPathUrl(path)) {
      return baseUrl + (path.startsWith('/') ? '' : '/') + path;
    }
    return (resourceStore[path] && resourceStore[path]()) || path;
  },
};
