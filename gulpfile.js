var gulp = require('gulp'),
    order = require('gulp-order'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create();

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "./src/"
        }
    });
});

gulp.task('script', function () {
    script();
    return watch('./src/app/**/*.js', function () {
        script();
    });

    function script() {
        gulp.src(['./src/app/**/*.js', '!./src/app/**/*.min.js'])
            .pipe(sourcemaps.init())
            .pipe(order([   
                '**/*.module.js',
                '**/*.js'
            ]))
            .pipe(concat('app.min.js'))
            .pipe(uglify())
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./src/app/dist'));
    }
});

gulp.task('sass', function () {
    return watch('**/scss/*.scss', function () {
        console.log("test");
        gulp.src('**/scss/app.scss')
            .pipe(sourcemaps.init())
            .pipe(sass({
                outputStyle: 'compressed'
            }).on('error', sass.logError))
            .pipe(rename('app.css'))
            .pipe(autoprefixer())
            .pipe(cleanCSS())
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('src/app/dist'));

    })
});

gulp.task('default', ['script', 'sass', 'browser-sync']);
