
const resourceStore = {
    'theme/assets/fonts/Roboto/Roboto-Black.ttf' : () => require('./assets/fonts/Roboto/Roboto-Black.ttf'),
    'theme/assets/fonts/Roboto/Roboto-BlackItalic.ttf' : () => require('./assets/fonts/Roboto/Roboto-BlackItalic.ttf'),
    'theme/assets/fonts/Roboto/Roboto-Bold.ttf' : () => require('./assets/fonts/Roboto/Roboto-Bold.ttf'),
    'theme/assets/fonts/Roboto/Roboto-BoldItalic.ttf' : () => require('./assets/fonts/Roboto/Roboto-BoldItalic.ttf'),
    'theme/assets/fonts/Roboto/Roboto-Italic.ttf' : () => require('./assets/fonts/Roboto/Roboto-Italic.ttf'),
    'theme/assets/fonts/Roboto/Roboto-Light.ttf' : () => require('./assets/fonts/Roboto/Roboto-Light.ttf'),
    'theme/assets/fonts/Roboto/Roboto-LightItalic.ttf' : () => require('./assets/fonts/Roboto/Roboto-LightItalic.ttf'),
    'theme/assets/fonts/Roboto/Roboto-Medium.ttf' : () => require('./assets/fonts/Roboto/Roboto-Medium.ttf'),
    'theme/assets/fonts/Roboto/Roboto-MediumItalic.ttf' : () => require('./assets/fonts/Roboto/Roboto-MediumItalic.ttf'),
    'theme/assets/fonts/Roboto/Roboto-Regular.ttf' : () => require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
    'theme/assets/fonts/Roboto/Roboto-Thin.ttf' : () => require('./assets/fonts/Roboto/Roboto-Thin.ttf'),
    'theme/assets/fonts/Roboto/Roboto-ThinItalic.ttf' : () => require('./assets/fonts/Roboto/Roboto-ThinItalic.ttf'),
    'theme/assets/fonts/font.config.js' : () => require('./assets/fonts/font.config.js'),
};

export default {
  resolve: (path) => (resourceStore[path] && resourceStore[path]())
};
