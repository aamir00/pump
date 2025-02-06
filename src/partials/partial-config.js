import { register } from 'react-native-bundle-splitter';

const components = {
  Common: {
    type: register({ loader: () => import('./Common/Common.component') }),
    name: 'CommonComponent',
  },
  leftnav: {
    type: register({ loader: () => import('./leftnav/leftnav.component') }),
    name: 'leftnavComponent',
  },
};

const configs = [
  { name: 'Common', type: 'PARTIAL', params: [] },
  { name: 'leftnav', type: 'LEFTNAV', params: [] },
];

configs.forEach(p => {
  const component = components[p.name];
  p.component = component.type;
  p.componentName = component.name;
});

export default configs;
