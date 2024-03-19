module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/$1",
        "^@context/(.*)$": "<rootDir>/src/context/$1",
        "^@shared/(.*)$": "<rootDir>/src/context/shared/$1",

    },
    testMatch: ["<rootDir>/tests/**/**/**/*.+(test.ts)"],
    openHandlesTimeout: 0,
}