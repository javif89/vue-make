let fs = require('fs');
let mustache = require('mustache');
let prompt = require('prompt-sync')();
let colors = require('colors');

class Util {
    loadConfig() {
        let localConfig = './vue-make.json';
        let defaultConfig = `${__dirname}/vue-make.json`;

        //Check if local config exists
        if(fs.existsSync(localConfig)) {
            return JSON.parse(fs.readFileSync(localConfig, 'utf-8'));
        }

        //If there is no local config, load the default config
        return JSON.parse(fs.readFileSync(defaultConfig, 'utf-8'));
    }

    camelCaseToKebab(string) {
        return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    }

    getTemplate(template) {
        const templatesPath = `${__dirname}/templates`;
        let path = `${templatesPath}/${template}.mustache`;

        let templateText = fs.readFileSync(path, 'utf-8');
        return templateText;
    }

    config() {
        console.log("Welcome to the configuration wizard for vue-make".magenta.bold);
        console.log("This wizard will ask you just a few questions and then create a vue-make.json file in your project directory.");
        console.log("vue-make will later use this file to determine your configuration");
        console.log("If you leave an option blank, the current value will be used".magenta.bold);
        console.log("You can always edit the file with a text editor instead of going through the wizard");
        console.log("");

        //Load current config, whether default or local, to use as default values for the questions
        let config = this.loadConfig();

        let componentPath = prompt(`Components Path (current: ${config.paths.components}): `, config.paths.components);
        let viewsPath = prompt(`viewsPath Path (current: ${config.paths.views}): `, config.paths.views);
        let servicesPath = prompt(`Services Path (current: ${config.paths.services}): `, config.paths.services);
        let styleType = prompt(`Style type (current: ${config.styleType}): `, config.styleType);

        let finalConfig = {
            "paths": {
                "components": componentPath,
                "views": viewsPath,
                "services": servicesPath
            },
            "styleType": styleType
        };

        console.log("Writing the following configuration:".magenta.bold);
        console.log("");
        console.log(finalConfig);
        console.log("");

        fs.writeFileSync('./vue-make.json', JSON.stringify(finalConfig));

        console.log("Configuration file created successfully".green);
    }

    makeComponent(name) {
        let config = this.loadConfig();
        let path = `${process.cwd()}/${config.paths.components}/${name}.vue`;
        let data = {
            componentName: this.camelCaseToKebab(name),
            styleType: config.styleType
        };
        console.log("Creating Component", `${name}.vue`.green);

        let template = this.getTemplate('component');
        let rendered = mustache.render(template, data);
        fs.writeFileSync(path, rendered);
    }

    makeService(name) {
        let config = this.loadConfig();
        let path = `${process.cwd()}/${config.paths.services}/${name}.js`;
        let data = {
            className: name
        };
        console.log("Creating Service", `${name}.js`.yellow);

        let template = this.getTemplate('service');
        let rendered = mustache.render(template, data);
        fs.writeFileSync(path, rendered);
    }

    makeView(name) {
        let config = this.loadConfig();
        let path = `${process.cwd()}/${config.paths.views}/${name}.vue`;
        let data = {
            componentName: this.camelCaseToKebab(name),
            styleType: config.styleType
        };
        console.log("Creating View", `${name}.vue`.green);

        let template = this.getTemplate('component');
        let rendered = mustache.render(template, data);
        fs.writeFileSync(path, rendered);
    }
}

exports = module.exports = new Util();
