const TextProcessorFluentAPI = require('./textProcessorFluentApi');

class TextProcessorFacade {
    #textProcessorFluentAPI

    constructor(textProcessor) {
        this.#textProcessorFluentAPI = new TextProcessorFluentAPI(textProcessor);
    }

    getPeopleFromPDF() {
        return this.#textProcessorFluentAPI
            .extractPeopleData()
            .divideTextInColumns()
            .removeEmptyCharacters()
            .mapPerson()
            .build();
    }
}

module.exports = TextProcessorFacade;