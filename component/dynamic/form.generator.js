import {generate} from './component-generator';
import {forEach, isArray} from "lodash";

// Generate the form field with given field definition. Add a grid column wrapper around the form field.
const setMarkupForFormField = (field, columnWidth) =>  {
    let propsTmpl = '';
    forEach(field, (value, key) => {
        propsTmpl = `${propsTmpl} ${key}="${value}"`;
    });
    return `<wm-gridcolumn columnwidth="${columnWidth}"><wm-form-field ${propsTmpl}></wm-form-field></wm-gridcolumn>`;
};

// Function to generate and compile the form fields from the metadata
const generateFormFields = (metadata, formName) => {
    let noOfColumns = 1;
    const columnWidth = 12 / noOfColumns;
    let fieldTemplate = '';
    let colCount = 0;
    let fields = metadata;

    if (!isArray(fields)) {
        return;
    }

    while (fields[colCount]) {
        let colTmpl = '';
        if (fields[colCount]) {
            colTmpl += setMarkupForFormField(fields[colCount], columnWidth);
        }
        colCount++;
        fieldTemplate += `<wm-gridrow>${colTmpl}</wm-gridrow>`;
    }
    fieldTemplate = `<wm-layoutgrid type="dynamic" dynamicForm = "${formName}">${fieldTemplate}</wm-layoutgrid>`;

    return fieldTemplate;
}


export const dynamicForm = (metadata, formName, fragment) => {
    // convert metadata into wavemaker markup
    const wmMarkup = generateFormFields(metadata, formName);

   // using component generator transform wavemaker markup into react elements
    return generate(wmMarkup, fragment);
}
