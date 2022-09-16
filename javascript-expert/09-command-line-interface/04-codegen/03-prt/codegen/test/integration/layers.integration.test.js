import {
    expect,
    describe,
    test,
    jest,
    beforeEach,
    beforeAll,
    afterAll,
} from '@jest/globals';

import { tmpdir } from 'os';
import fsPromises from "fs/promises";
import { join } from 'path';
import { createLayersIfNotExists } from "../../src/createLayers.js";

async function getFolders({ mainPath, defaultMainFolder }) {
   return await fsPromises.readdir(join(mainPath, defaultMainFolder));
}

describe('#Integrations - Files - Folder Structure', () => {
    const config = {
        defaultMainFolder: 'src',
        mainPath: '',
        // colocamos um sort porque o SO retorna em ordem alfabética
        layers: ['service', 'factory', 'repository'].sort(),
        componentName: 'hero',
    };

    beforeAll(async () => {
        config.mainPath = await fsPromises.mkdtemp(join(tmpdir(), 'layers-'));
    });

    beforeEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });

    afterAll(async () => {
        await fsPromises.rm(config.mainPath, { recursive: true });
    });

    test('should not create folders fi it exists', async () => {
        const beforeRun = await fsPromises.readdir(config.mainPath);

        // run

        await createLayersIfNotExists(config);

        const afterRun = await getFolders(config);

        expect(beforeRun).not.toStrictEqual(afterRun);
        expect(afterRun).toEqual(config.layers);
    });

    test('should create folders fi it doesnt exists', async () => {
        const beforeRun  =await getFolders(config);
        await createLayersIfNotExists(config);

        const afterRun = await getFolders(config);
        expect(beforeRun).toEqual(afterRun);
    });

});