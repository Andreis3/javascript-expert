import RickAndMortyUSA from "../integrations/rickAndMortyUSA.js";

export default class RickAndMortyBRLAdapter {
    static async getCharacters() {
        return await RickAndMortyUSA.getCharactersFromXML();

    }
}