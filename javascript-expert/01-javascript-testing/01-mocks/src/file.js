const { readFile } = require('fs/promises');
const { error } = require("./constants");
const User = require("./users");

const DEFAULT_OPTIONS = {
    maxLines: 3,
    fields: ['id','name','profession','age']
};

class File {
    static async csvToJson(filePath){
        const content = await File.getFileContent(filePath);
        const validation = File.isValid(content);
        if (!validation.valid) throw new Error(validation.error);

        const users = File.parserCSVToJSON(content);
        return users;
    }

    static async  getFileContent(filePath){
        return (await readFile(filePath)).toString('utf8');
    }

    static isValid(csvString, options = DEFAULT_OPTIONS) {
        const [header, ...fileWithOutHeaders] = csvString.split('\n');
        const isHeadersValid = header === options.fields.join(',');

        if (!isHeadersValid) {
            return {
                error: error.FILE_FIELDS_ERROR_MESSAGE,
                valid: false
            }
        }

        const isContentLengthAccepted = (
            fileWithOutHeaders.length > 0 &&
            fileWithOutHeaders.length <= options.maxLines
        )
        if (!isContentLengthAccepted) {
            return {
                error: error.FILE_LENGTH_ERROR_MESSAGE,
                valid: false
            }
        }

        return { valid: true }
    }

    static parserCSVToJSON(csvString){
        const lines = csvString.split('\n');
        //remove a primeiro item e joga para variarvel
        const firstLine = lines.shift();
        const header = firstLine.split(',');
        const users = lines.map(line => {
            const columns = line.split(',');
            let user = {};
            for (const index in columns) {
                user[header[index]] = columns[index];
            }
            return new User(user);
        });
        return users;
    }
}

module.exports = File;
