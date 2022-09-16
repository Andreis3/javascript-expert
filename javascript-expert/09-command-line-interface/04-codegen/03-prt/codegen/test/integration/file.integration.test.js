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

describe('#Integrations - Layers - Folder Structure', () => {
    const config = {
        defaultMainFolder: 'src',
        mainPath: '',
        // colocamos um sort porque o SO retorna em ordem alfabética
        layers: ['service', 'factory', 'repository'].sort(),
    };

    // como não obtivemos o caminho relativo, estamos pensando que o comando
    // vai rodar do package.json que está na raiz, por isso, iniciamos pegando da
    // pasta test
    const packageJSON = 'package.json'
    const packageJSONLocation = join('./test/integration/mocks', packageJSON)

    beforeAll(async () => {
        config.mainPath = await fsPromises.mkdtemp(join(tmpdir(), 'skeleton-'));
    });

    beforeEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });

    afterAll(async () => {
        await fsPromises.rm(config.mainPath, { recursive: true });
    });

    test.todo('should not create folders fi it exists');
});