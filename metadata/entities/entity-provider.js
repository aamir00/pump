import pump_manJson from './pump_man.json';

const metadata = {
 pump_man: pump_manJson,
};

export const getEntityPropertyMap = (liveSource, entityName) => {
    return metadata[liveSource] &&
    metadata[liveSource][entityName] &&
    metadata[liveSource][entityName].propertiesMap;
}

export const getEntityRelatedTables = (liveSource, entityName) => {
    return metadata[liveSource] &&
    metadata[liveSource][entityName] &&
    metadata[liveSource][entityName].relatedTables;
}