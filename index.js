#!/usr/bin/env node

let program = require('commander');
let util = require('./util');

program.version('1.0.0', '-v');

program.command("component <name>").action(function(name, cmd){util.makeComponent(name)});
program.command("view <name>").action(function(name, cmd){util.makeView(name)});
program.command("service <name>").action(function(name, cmd){util.makeService(name)});
program.command("config").action(function () {util.config();});

program.parse(process.argv);


