const { components } = require('./registry-component');
const { motions } = require('./registry-motion');
const { motionExamples } = require('./registry-eg-motion');
const { chartExamples } = require('./registry-eg-chart');
const { componentExamples } = require('./registry-eg-component');
const { hooks } = require('./registry-hook');

const registry = [
    ...components,
    ...componentExamples,
    ...motions,
    ...motionExamples,
    ...chartExamples,
    ...hooks,
];

module.exports = { registry }; 