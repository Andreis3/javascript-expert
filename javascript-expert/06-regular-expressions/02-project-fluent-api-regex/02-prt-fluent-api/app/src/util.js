const safeRegex = require('safe-regex');

class Util extends Error {
  constructor(expressionRegex) {
    super(`This ${expressionRegex} is unsafe dude.`);
    this.name = 'InvalidRegexError';
  }
}

const evaluateRegex = (expressionRegex) => {
    const isSafe = safeRegex(expressionRegex);
    if (isSafe) {
        return expressionRegex;
    }

    throw new Util(expressionRegex);
}

module.exports = { InvalidRegexError: Util, evaluateRegex };