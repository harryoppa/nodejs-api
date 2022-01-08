let mix = require('laravel-mix');

mix.options({
    processCssUrls: false,
    clearConsole: true,
    terser: {
        extractComments: false,
    }
});

mix.alias({
    '@harry': 'resources'
})

mix.js('resources/js/app.js', 'public/js').react();
mix.sass('resources/sass/app.scss', 'public/css');