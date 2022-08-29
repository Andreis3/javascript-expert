import TerminalController from "./terminalController.js";
import database from './../database.json' assert {type: "json"};
import Person from './person.js';
import { save } from './repository.js';

const DEFAULT_LANGUAGE = 'pt-BR';
const STOP_TERMINAL = ':q';

const terminalController = new TerminalController();
terminalController.initializeTerminal(database, DEFAULT_LANGUAGE);

//2 Avião,Navio,Bicicleta 20000000 2013-04-26 2016-06-23
const mainLoop = async () => {
    try {
        const answer = await terminalController.question();
        if(answer === STOP_TERMINAL) {
            terminalController.closeTerminal();
            console.log('Bye!');
            return;
        }

        const person = Person.generateInstanceFromString(answer);
        terminalController.updateTable(person.formatted(DEFAULT_LANGUAGE));
        await save(person);
        return mainLoop();

    }catch (error) {
        console.error('DEU RUIM', error);
        return mainLoop();
    }
}

await mainLoop();