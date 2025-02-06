import { isIos} from '@wavemaker/app-rn-runtime/core/utils';
import themeVariables from '@wavemaker/app-rn-runtime/styles/theme.variables';
import BASE_THEME from '@wavemaker/app-rn-runtime/styles/theme';
import { clone } from 'lodash-es';
import fontConfig from './font.config';

const themes = {
    "native-mobile": {
        android: {
            style: () => require('./theme/native-mobile/android/style.js').default,
            variables: () => require('./theme/native-mobile/android/variables.js').default,
            getAsset: () => require('./theme/native-mobile/android/asset.resolver.js').default.resolve
        },
        ios: {
            style: () => require('./theme/native-mobile/ios/style.js').default,
            variables: () => require('./theme/native-mobile/ios/variables.js').default,
            getAsset: () => require('./theme/native-mobile/ios/asset.resolver.js').default.resolve
        }
    },
};

let selectedTheme = null;
let selectedThemeName = null;
let getAsset = null;
const appTheme = BASE_THEME.$new('app-theme', {});
const defaultVariables = clone(themeVariables.INSTANCE);
export const setAppTheme = (themeName, variables) => {
    return Promise.resolve().then(() => {
        selectedTheme = (themes[themeName]||{})[isIos() ? 'ios': 'android'];
        if (selectedTheme) {
            selectedThemeName = themeName;
            const styles = selectedTheme.style();
            themeVariables.INSTANCE = Object.assign({},
                defaultVariables, 
                selectedTheme.variables(),
                styles['theme-variables'],
                variables);
            getAsset = selectedTheme.getAsset();
            if (fontConfig.baseFont) {
                themeVariables.baseFont = fontConfig.baseFont;
            }
            appTheme.reset(selectedTheme.style());
            BASE_THEME.reset();
        }
    });
};
export const hasAppTheme = (themeName) => {
    return Promise.resolve()
        .then(() => !!(themes[themeName]||{})[isIos() ? 'ios': 'android']);
};
setAppTheme(Object.keys(themes)[0]);
export const getThemes = () => Object.keys(themes);
export const getSelectedTheme = () => selectedThemeName;
export const resolveThemeAsset = (path) => (getAsset && getAsset(path));
export default appTheme;