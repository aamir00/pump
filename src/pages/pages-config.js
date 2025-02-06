import { register } from 'react-native-bundle-splitter';

const components = {
  Login: {
    type: register({ loader: () => import('./Login/Login.component') }),
    name: 'LoginComponent',
  },
  Main: {
    type: register({ loader: () => import('./Main/Main.component') }),
    name: 'MainComponent',
  },
  Shifts: {
    type: register({ loader: () => import('./Shifts/Shifts.component') }),
    name: 'ShiftsComponent',
  },
  addShift: {
    type: register({ loader: () => import('./addShift/addShift.component') }),
    name: 'addShiftComponent',
  },
  workers: {
    type: register({ loader: () => import('./workers/workers.component') }),
    name: 'workersComponent',
  },
};

const configs = [
  { name: 'Login', type: 'PAGE', params: [] },
  { name: 'Main', type: 'PAGE', params: [] },
  { name: 'Shifts', type: 'PAGE', params: [] },
  { name: 'addShift', type: 'PAGE', params: [] },
  { name: 'workers', type: 'PAGE', params: [] },
];

configs.forEach(p => {
  const component = components[p.name];
  p.component = component.type;
  p.componentName = component.name;
});

export default configs;
