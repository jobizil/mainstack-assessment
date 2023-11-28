"use strict";
const { defaults: tsjPreset } = require('ts-jest/presets');
module.exports = {
    preset: 'ts-jest',
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ["**/**/*.test.ts"],
    testPathIgnorePatterns: ['/node_modules/', '/dist/']
};
//# sourceMappingURL=jest.config.js.map