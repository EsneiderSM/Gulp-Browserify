var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./app"
        }
    });

    gulp.watch("app/sass/*.scss", ['sass']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
    gulp.watch("app/js/main.js").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("app/sass/*.scss")
    .pipe(sass({
        outputStyle: 'expanded'
    }))
    .pipe(autoprefixer({
        versions: ['last 2 browsers']
    }))
    .pipe(gulp.dest("app/css"))
    .pipe(browserSync.stream());
});

gulp.task('default', ['browser-sync']);