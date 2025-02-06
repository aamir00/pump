import WmText from "@wavemaker/app-rn-runtime/components/input/text/text.component";
import WmTextarea from '@wavemaker/app-rn-runtime/components/input/textarea/textarea.component';
import WmNumber from "@wavemaker/app-rn-runtime/components/input/number/number.component";
import WmCurrency from '@wavemaker/app-rn-runtime/components/input/currency/currency.component';
import WmSelect from '@wavemaker/app-rn-runtime/components/input/select/select.component';
import WmSearch from '@wavemaker/app-rn-runtime/components/basic/search/search.component';
import WmChips from '@wavemaker/app-rn-runtime/components/input/chips/chips.component';
import WmCheckbox from '@wavemaker/app-rn-runtime/components/input/checkbox/checkbox.component';
import WmCheckboxset from '@wavemaker/app-rn-runtime/components/input/checkboxset/checkboxset.component';
import WmToggle from '@wavemaker/app-rn-runtime/components/input/toggle/toggle.component';
import WmSwitch from '@wavemaker/app-rn-runtime/components/input/switch/switch.component';
import WmRadioset from '@wavemaker/app-rn-runtime/components/input/radioset/radioset.component';
import WmDate from '@wavemaker/app-rn-runtime/components/input/epoch/date/date.component';
import WmDatetime from '@wavemaker/app-rn-runtime/components/input/epoch/datetime/datetime.component';
import WmTime from '@wavemaker/app-rn-runtime/components/input/epoch/time/time.component';
import WmSlider from '@wavemaker/app-rn-runtime/components/input/slider/slider.component';
import WmRating from '@wavemaker/app-rn-runtime/components/input/rating/rating.component';
import WmLayoutgrid from '@wavemaker/app-rn-runtime/components/container/layoutgrid/layoutgrid.component';
import WmGridrow from '@wavemaker/app-rn-runtime/components/container/layoutgrid/gridrow/gridrow.component';
import WmGridcolumn from '@wavemaker/app-rn-runtime/components/container/layoutgrid/gridcolumn/gridcolumn.component';
import registerTransformers from '@wavemaker/rn-codegen/src/transpile/components/transform-register';
import WmFormField from '@wavemaker/app-rn-runtime/components/data/form/form-field/form-field.component';
import WmLabel from '@wavemaker/app-rn-runtime/components/basic/label/label.component';

import {transpileMarkup}  from '@wavemaker/rn-codegen/src/transpile/transpile';
import {transform} from '@babel/standalone';
import React from "react";

// this is to avoid tree shaking
export const components = {WmText};

registerTransformers();

export const generate = (wavemakerMarkup, fragment) => {
    // transpile wavemaker markup into react markup
    const transpiledComponents = transpileMarkup(wavemakerMarkup, false, false);
    try {
        // use babel library convert it into React.creatElement
        const transformedCode = transform(transpiledComponents.markup, {
            presets: ['react']
        }).code;

        const importedComponents = {
            'WmText': WmText,
            'WmTextarea': WmTextarea,
            'WmNumber': WmNumber,
            'WmCurrency': WmCurrency,
            'WmSelect': WmSelect,
            'WmSearch': WmSearch,
            'WmChips': WmChips,
            'WmCheckbox': WmCheckbox,
            'WmCheckboxset': WmCheckboxset,
            'WmToggle': WmToggle,
            'WmSwitch': WmSwitch,
            'WmRadioset': WmRadioset,
            'WmDate': WmDate,
            'WmDatetime': WmDatetime,
            'WmTime': WmTime,
            'WmSlider': WmSlider,
            'WmRating': WmRating,
            'WmLayoutgrid': WmLayoutgrid,
            'WmGridrow': WmGridrow,
            'WmGridcolumn': WmGridcolumn,
            'WmFormField': WmFormField,
            'WmLabel': WmLabel
        }

        // Evaluate the transformed code synchronously
        const dynamicComponentFunction = new Function(['React, fragment', ...Object.keys(importedComponents)].join(', '), `return ${transformedCode}`);
        const dynamicComponent = dynamicComponentFunction(React, fragment, ...Object.values(importedComponents));
        return dynamicComponent;
    } catch (error) {
        console.error('Error generating component:', error);
        return null;
    }

}