module.exports = {
    preset: 'jest-expo',
    setupFiles: ['dotenv/config'], 
    transform: {
        '^.+\\.[jt]sx?$': ['babel-jest', { configFile: './babel.config.js' }]
    },
    transformIgnorePatterns: [],
    setupFilesAfterEnv: [
        "<rootDir>/jest.setup.js",
        "@testing-library/jest-native/extend-expect"
    ],
    moduleNameMapper: {
        "^expo-constants$": "<rootDir>/__mocks__/expo-constants.js"
    },
};
