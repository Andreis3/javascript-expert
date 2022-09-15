export default{
    clearMocks: true,
    coverageDirectory: "coverage",
    coverageProvider: "v8",
    coverageReporters: [
    "json",
    "text",
    "lcov",
    "clover"
    ],
    // força um covegare para todos os arquivos
    collectCoverageFrom: [
        "src/**/*.js",
        "!src/index.js",
    ],
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100
        }
    },
    maxWorkers: "50%",
    testEnvironment: "node",
    watchPathIgnorePatterns: [
        "node_modules",
        "coverage"
    ],
    transformIgnorePatterns: [
        "node_modules"
    ]
}
