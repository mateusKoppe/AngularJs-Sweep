'use strict';

const appDir = 'app';
const buildDir = 'build';
const temp = '.tmp';
const dist = 'dist';

const indexFile = `index.html`;

const devPort = 3030;
const buildPort = 3000;

/* Sass */
const cssStart = 'app.style.scss';
const cssWatch = '**/*.scss';
const cssName = 'app.css';

/* Js */
const jsFiles = ['**/*.js'];
const jsOrder = ['**/*.module.js','**/*.js'];
const jsName = 'app.js';

/* Html */
const htmlFiles = '**/*.html';

/* Images */
const imagesDir = '**/*.{png,jpg,jpeg}';

/* Library */
const libraryDir = 'bower_components';
const libraryFontsExtensions = ['eot', 'ttf', 'svg', 'woff', 'woff2'];

/* Files */
const persistentFiles = ['**/*.{svg,gif}'];

const gulp = require('gulp');
const async = require('async');
const del = require('del');
const connect = require('gulp-connect');
const $ = require('gulp-load-plugins')({
  camelize: true,
  lazy: true
});

const inFolder = (folder, selection) => {
  if(typeof selection == 'object')
    return selection.map(_getFormatedFileDir);
  else if(typeof selection == 'string')
    return _getFormatedFileDir(selection)
  return false;

  function _getFormatedFileDir(file){
    let prefix = '';
    if(file.charAt(0) === '!') {
      prefix = '!';
      file = file.slice(1);
    }
    console.log(`${prefix}${folder}/${file}`)
    return `${prefix}${folder}/${file}`;
  }
}

/* Server */
gulp.task('dev', ['server:dev', 'watch'])

gulp.task('server:dev', () =>
  connect.server({
    root: ['.', '.tmp'],
    livereload: true,
    port: devPort
  })
)

gulp.task('server', () =>
  connect.server({
    root: buildDir,
    livereload: true,
    port: buildPort
  })
)

/* Watchs */
gulp.task('watch', ['js', 'css'], () => {
  $.watch(inFolder(appDir, jsFiles), () => gulp.start('js'))
  $.watch(inFolder(appDir, cssWatch), () => gulp.start('css'))
  $.watch(inFolder(appDir, htmlFiles), () => gulp.src('').pipe(connect.reload()))
});

/* Basic functions */
gulp.task('js', () =>
  gulp.src(inFolder(appDir, jsFiles))
    .pipe($.sourcemaps.init())
    .pipe($.order(jsOrder))
    .pipe($.concat(jsName))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest(temp))
    .pipe(connect.reload())
)

gulp.task('css', () =>
  gulp.src(inFolder(appDir, cssStart))
    .pipe($.sourcemaps.init())
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.rename(cssName))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest(temp))
    .pipe(connect.reload())
)

/* Production */
gulp.task('build', (cb) => {
  async.series([
    next => { del(buildDir, next()) },
    next => _buildJs().on('end', next),
    next => _buildCss().on('end', next),
    next => _buildHtml().on('end', next),
    next => _buildImages().on('end', next),
		next => _buildSavePersistentFiles().on('end', next),
    next => _buildVendors()
  ], cb)
})

function _buildJs() {
  return gulp.src(inFolder(appDir, jsFiles))
    .pipe($.order(jsOrder))
    .pipe($.ngAnnotate())
    .pipe($.babel({presets: ['@babel/env']}))
    .pipe($.concat(jsName))
    .pipe($.uglify())
    .pipe(gulp.dest(buildDir));
}

function _buildCss(){
  return gulp.src(inFolder(appDir, cssStart))
    .pipe($.sass({outputStyle: 'compressed'}).on('error', $.sass.logError))
    .pipe($.autoprefixer())
    .pipe($.rename(cssName))
    .pipe(gulp.dest(buildDir));
}

function _buildHtml(){
  return gulp.src(inFolder(appDir, htmlFiles))
    .pipe($.htmlmin({collapseWhitespace: true, removeComments: true}))
    .pipe(gulp.dest(`${buildDir}/${appDir}`));
}

function _buildImages(){
  return gulp.src(inFolder(appDir, imagesDir))
    .pipe($.smushit({verbose: true}))
    .pipe(gulp.dest(`${buildDir}/${appDir}`))
}

function _buildSavePersistentFiles() {
  return gulp.src(inFolder(appDir, persistentFiles))
    .pipe(gulp.dest(`${buildDir}/${appDir}`));
}

function _buildVendors(cb) {
  return async.series([
    next => gulp.src(indexFile)
      .pipe(gulp.dest(buildDir))
      .on('end', next),
    next => gulp.src(inFolder(appDir, `${libraryDir}/**`))
      .pipe(gulp.dest(inFolder(buildDir, libraryDir)))
      .on('end', next),
    next => gulp.src(inFolder(buildDir, `${libraryDir}/**/*.css`), {base: buildDir + `${appDir}/${libraryDir}`})
      .pipe($.cssUrlFix())
      .pipe($.replace(new RegExp(`${buildDir}\/${libraryDir}\/`, 'g'), './'))
      .pipe($.sass({outputStyle: 'compressed'}))
      .pipe(gulp.dest(inFolder(buildDir, libraryDir)))
      .on('end', next),
    next => gulp.src(inFolder(buildDir, `${libraryDir}/**/*.{${libraryFontsExtensions.join(',')}}`), {base: inFolder(buildDir, libraryDir)})
      .pipe(gulp.dest(buildDir))
      .on('end', next),
    next => gulp.src(indexFile)
      .pipe($.useref())
      .pipe(gulp.dest(buildDir))
      .on('end', next),
    next => gulp.src(inFolder(buildDir, indexFile))
      .pipe($.htmlmin({collapseWhitespace: true, removeComments: true}))
      .pipe(gulp.dest(buildDir))
      .on('end', next),
    next => del(inFolder(buildDir, libraryDir), next)
  ], cb);
}

gulp.task('default', ['dev']);