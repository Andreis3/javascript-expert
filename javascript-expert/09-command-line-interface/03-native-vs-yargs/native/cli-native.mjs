const [ nodePath, filePath, ...commandLineArgs ] = process.argv;

function ParserArgument(commands) {
  const cmd = new Map();
  const commandPrefix = '--';

    for (const key of commands) {
        const index = parseInt(key);
        const command = commands[key];
        if (!command.includes(commandPrefix)) continue;

        cmd.set(command.replace(commandPrefix, ''),
            commands[index + 1]
        );
    }

    return Object.fromEntries(cmd);
}