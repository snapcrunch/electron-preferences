'use strict';

const Handlebars = require('handlebars');
const glob = require('glob');
const path = require('path');
const srcFolder = path.resolve(__dirname, '../assets/svg');

const tpl = Handlebars.compile(`
    {{#each icons}}
        [[{{{this}}}|alt=icon]]
    {{/each}}
`);

const icons = glob.sync('*.svg', {
    'cwd': srcFolder
})
    .map((icon) => {
        return `assets/svg/${icon}`;
    });

const rendered = tpl({
    'icons': icons
});

console.log(rendered);
