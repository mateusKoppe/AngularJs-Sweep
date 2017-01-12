/* Directórios */
var javascripts = ['app/**/*.js', '!app/components'];


var gulp = require('gulp'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer');


gulp.task('script', function(){
    return watch(javascripts, function(){
        gulp.src(javascripts)
        .pipe(sourcemaps.init())
        .pipe(concat('script.concat.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('script.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist'));
    });
});

gulp.task('sass', function(){
    return watch('**/scss/*.scss', function(){
        gulp.src('**/scss/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename('app.css'))
        .pipe(autoprefixer())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('src/app/dist'));
        
    })
});

gulp.task('default', ['script', 'sass']);