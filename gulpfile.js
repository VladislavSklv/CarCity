const {src, dest, series} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const csso = require('gulp-csso');
const include = require('gulp-file-include');
const htmlmin = require('gulp-htmlmin');
const del = require('del');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const { watch } = require('browser-sync');
const sync = require('browser-sync').create();

function html(){
    return src('src/**.html')
        .pipe(include({
            prefix: '@@'
        }))
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(dest('dist'))
}

function scss() {
    return src('src/sass/**.scss')
        .pipe(sass({
            implementation: require('node-sass')
          }))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions']
        }))
        .pipe(csso())
        .pipe(concat('css/style.css'))
        .pipe(dest('dist'))
}

function js(){
    return src('src/js/**.js')
        .pipe(dest('dist/js'))
}

function fonts(){
    return src('src/fonts/**')
        .pipe(dest('dist/fonts'))
}

function clear(){
    return del('dist');
}

function serve(){
    sync.init({
        server: 'dist'
    });

    sync.watch('src/**.html', series(html)).on('change', sync.reload);
    sync.watch('src/sass/**.scss', series(scss)).on('change', sync.reload);
    sync.watch('src/js/**.js', series(js)).on('change', sync.reload);
}

function image(){
    return src('src/img/**')
        .pipe(imagemin())
        .pipe(dest('dist/img/'))
}

exports.html = html;
exports.scss = scss;
exports.serve = series(clear, scss, html, js, fonts, image, serve);
exports.build = series(clear, scss, html, js, fonts, image);
exports.clear = clear;