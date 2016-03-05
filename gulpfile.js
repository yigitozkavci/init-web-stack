var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var autoprefix = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var minify = require('gulp-minify');
var coffee = require('gulp-coffee');

function errorAlert(error){
    notify.onError({title: "SCSS Error", message: "Check your terminal", sound: "Sosumi"})(error); //Error Notification
    console.log(error.toString());//Prints Error to Console
    this.emit("end"); //End function
};
gulp.task('brew', function() {
  return gulp.src('resources/coffee/*.coffee')
    .pipe(coffee())
    .pipe(gulp.dest('assets/js'));
});
gulp.task('sass', function() {
  return gulp.src('resources/sass/*.scss')
    .pipe(plumber({errorHandler: errorAlert}))
    .pipe(sass())
    .pipe(autoprefix())
    .pipe(gulp.dest('assets/css'));
});
gulp.task('onerror', function () {
  handleSassError();
});
gulp.task('default', ['brew', 'sass'])
gulp.task('watch', function() {
  gulp.watch('resources/coffee/*.coffee', ['brew']);
  gulp.watch('resources/sass/*.scss', ['sass']);
});
