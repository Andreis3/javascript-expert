import Util from "./../util.js";

const componentNameAnchor = '$$componentName';

const template = `
export default class $$componentName {
    constructor () {}

    create (date) {
        return Promise.reject('method not implemented!')
    }

    read (query) {
        return Promise.reject('method not implemented!')
    }

    update (id, date) {
        return Promise.reject('method not implemented!')
    }

    delete (id) {
        return Promise.reject('method not implemented!')
    }
}`

export function repositoryTemplate (componentName) {
    const componentNameRepository = Util.upperCaseFirstLetter(componentName);
    return  {
        fileName: `${componentName}Repository`,
        template: template.replaceAll(componentNameAnchor, `${componentNameRepository}Repository`)
    }
}