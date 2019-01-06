# vue-make

A tool to quickly make templates for components and services in your vue application. Similar to Laravel's artisan.

## Installation

`npm install vue-make -g`

## Usage

#### **Always use in the root directory of your project**

Making a Component:

`vue-make component MyComponent`

Making a View:

`vue-make view MyView`

Making a Service:

`vue-make service MyService`

## Default Configuration

By default, vue-make uses the structure of vue applications created with vue-cli:

- components: src/components
- views: src/views
- services (if used): src/services

However you can configure your own paths:

Using the command line tool:

`vue-make config`

Or make a file called `vue-make.json` in your root directory and follow the structure below:

```json
{
  "paths": {
    "components": "src/components",
    "views": "src/views",
    "services": "src/services"
  },
  "styleType": "scss"
}
```

## Templates

These are the templates used to make components, views and services.

**Components, Views**

MyComponent.vue
```html
<template>

</template>

<script>
    export default {
        name: 'my-component',
        props: {

        },
        data: function() {
            return {

            }
        },
        methods: {

        }
    }
</script>

<style lang="scss">

</style>
```

**Services**

MyService.js
```javascript
/**
* Description
*/
export default class MyService {
    functionName() {

    }
}

```

## Contributing

If you feel like this tool is useful and feel like contributing, feel free to make a pull request.

You can also open an issue if you have any suggestions/bugs.

