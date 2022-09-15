import fsPromises from 'fs/promises';
import fs from 'fs';

import templates from './templates/index.js';
import Util from './util.js';

const defaultDependencies = (layer, componentName) => {
    const dependencies = {
        service: [
            // ProductRepository
            `${componentName}Repository`
        ],
        factory: [
            `${componentName}Repository`,
            `${componentName}Service`
        ],
        repository: []
    };

    return dependencies[layer]
        // Pode ser que venha: Product
        // Quero que retorne: product
        .map(Util.lowerCaseFirstLetter);
};

async function executeWrites(pendingFilesToWrite) {
    return Promise.all(pendingFilesToWrite.map(
        ({ fileNameFolder, txtFile }) => fsPromises.writeFile(fileNameFolder, txtFile)
    ));
}

export async function createFiles({ mainPath, defaultMainFolder, layers, componentName }){
    const keys = Object.keys(templates);
    const pendingFilesToWrite = [];

    for (const layer of layers) {
        /*
            keys = ['service', 'factory', 'repository']
            layer = ['inexistent']
        */
        const chosenTemplate = keys.find(key => key.includes(layer));
        if (!chosenTemplate) {
            return { error: 'the chosen layer doesnt have a template' };
        }

        const template = templates[chosenTemplate];
        // só o exemplo debaixo /Users/Document/jsexpert/codegen/src/factory
        const targetFolder = `${mainPath}/${defaultMainFolder}/${layer}`;
        const dependencies = defaultDependencies(layer, componentName);
        const { fileName, template: txtFile } = template(componentName, ...dependencies);

        // só o exemplo debaixo /Users/Document/jsexpert/codegen/src/factory/heroesFactory.js
        const fileNameFolder = `${targetFolder}/${Util.lowerCaseFirstLetter(fileName)}.js`;
        pendingFilesToWrite.push({ fileNameFolder, txtFile });
    }

    await executeWrites(pendingFilesToWrite);

    return { success: true };
}