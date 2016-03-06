/**
 * --------------------------------------------------------------------
 * Copyright 2015 Nikolay Mavrenkov
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * --------------------------------------------------------------------
 *
 * Author:  Nikolay Mavrenkov <koluch@koluch.ru>
 * Created: 03.11.2015 22:56
 */

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    babel = require('gulp-babel'),
    babelPresetEs2015 = require('babel-preset-es2015'),
    envify = require('gulp-envify'),
    packageJson = require('./package.json') || {};


// Read settings from package.json
var settingsGulp = packageJson.gulp || {}
var settingsSrc = settingsGulp.src || {}
var settingsProd = settingsGulp.prod || {}

var SRC_ROOT = settingsSrc.root || '.'
var PROD_ROOT = settingsProd.root || './prod'

gulp.task('default', function() {
    return gulp.src(SRC_ROOT + "/**")
        .pipe(babel({presets:[babelPresetEs2015]}))
        .pipe(uglify())
        .pipe(gulp.dest(PROD_ROOT))

})