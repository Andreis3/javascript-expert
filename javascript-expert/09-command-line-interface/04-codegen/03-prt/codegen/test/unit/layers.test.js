import {
    expect,
    describe,
    test,
    jest,
    beforeEach,
} from '@jest/globals';
import fsPromises from 'fs/promises';
import fs from 'fs';

import {createLayersIfNotExists} from "../../src/createLayers.js";

describe('#Layers - Folder Structure', () => {
    const defaultLayers = ['service', 'factory', 'repository']

    beforeEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });

    test('should create folders fi it doesnt exists', async () => {
        jest.spyOn(fsPromises, fsPromises.mkdir.name).mockResolvedValue();
        jest.spyOn(fs, fs.existsSync.name).mockReturnValue(false);

        await createLayersIfNotExists({ mainPath: '', layers: defaultLayers });

        expect(fsPromises.mkdir).toHaveBeenCalledTimes(defaultLayers.length);
        expect(fs.existsSync).toHaveBeenCalledTimes(defaultLayers.length);
    });

    test('should not create folders fi it exists', async () => {
        jest.spyOn(fsPromises, fsPromises.mkdir.name).mockResolvedValue();
        jest.spyOn(fs, fs.existsSync.name).mockReturnValue(true);

        await createLayersIfNotExists({ mainPath: '', layers: defaultLayers });

        expect(fsPromises.mkdir).not.toHaveBeenCalled();
        expect(fs.existsSync).toHaveBeenCalledTimes(defaultLayers.length);
    });
});