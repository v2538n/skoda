var gulp 		 = require('gulp'),
	sass 		 = require('gulp-sass'),
	browserSync  = require('browser-sync'),
	concat 		 = require('gulp-concat'),
	uglify 		 = require('gulp-uglify'),
	cleanCSS 	 = require('gulp-clean-css'),
	rename 		 = require('gulp-rename'),
	del 		 = require('del'),
	imagemin 	 = require('gulp-imagemin'),
	cache 		 = require('gulp-cache'),
	autoprefixer = require('gulp-autoprefixer'),

	gutil 		 = require('gulp-util'),
	ftp 		 = require('vinyl-ftp'),
	notify 		 = require('gulp-notify'),
	rsync 		 = require('gulp-rsync');
	//filesize 	 = require('gulp-filesize');
	
	
	gulp.task('sass', function() {
	return gulp.src('app/sass/**/*.sass')
		.pipe(sass({
			outputStyle: 'expand'
		}).on("error", notify.onError()))
		.pipe(rename({
			suffix: '.min',
			prefix: ''
		}))
		.pipe(autoprefixer(['last 15 versions']))
		// .pipe(cleanCSS()) // Опционально, закомментировать при отладке
		.pipe(gulp.dest('app/css'))
		//.pipe(browserSync.reload({stream: true}))
	});

	gulp.task('browser-sync', function() {
		browserSync({
			server: {
				baseDir: 'app'
			},
			notify: false,
			// tunnel: true,
			// tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
		});
	});
	

// Пользовательские скрипты проекта

gulp.task('common-js', function() {
	return gulp.src([
			'app/js/common.js',
		])
		.pipe(concat('common.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('app/js'))
		.on('error', gutil.log)
});

gulp.task('js-libs', ['common-js'], function() {
	return gulp.src([
			'app/libs/jquery-3.3.1.min.js',
			'app/libs/masked-phone/jquery.maskedinput.js',
			'app/libs/inputmask/inputmask.dependencyLib.js',
			'app/libs/inputmask/inputmask.js',
			'app/libs/inputmask/jquery.inputmask.js',
			'app/libs/animatenumber/jquery.animateNumber.min.js',
			// 'app/libs/magnific-popup/jquery.magnific-popup.min.js',
			'app/libs/libphonenumber/libphonenumber.js',
			'app/libs/vuejs/vue.js',
			// 'app/libs/smooth-scroll/jquery.smooth-scroll.js',
			'app/libs/flickity/flickity.js',
			'app/libs/wowjs/wow.min.js',
			// 'app/libs/viewportchecker/jquery.viewportchecker.min.js',
			// 'app/libs/etimer/etimer.js',
		])
		.pipe(concat('libs.js'))
		.pipe(uglify())
		.pipe(gulp.dest('app/js'))
		.pipe(browserSync.reload({stream: true}))
});


gulp.task('imagemin', function() {
	return gulp.src('app/img/**/*')
		.pipe(cache(imagemin()))
		.pipe(gulp.dest('dist/img'));
});

gulp.task('build', ['dist-clear', 'imagemin', 'sass', 'common-js'], function() {

	var buildFiles = gulp.src([
		'app/*.html',
		'app/.htaccess',
		'app/.php',
	]).pipe(gulp.dest('dist'));

	var buildCss = gulp.src([
		'app/css/main.min.css',
	]).pipe(gulp.dest('dist/css'));

	var buildJs = gulp.src([
		'app/js/scripts.min.js',
		'app/js/common.min.js',
		'app/js/sets.js',
	]).pipe(gulp.dest('dist/js'));

	var buildFonts = gulp.src([
		'app/fonts/**/*',
	]).pipe(gulp.dest('dist/fonts'));

});

gulp.task('deploy', function() {

	var conn = ftp.create({
		host: 'u465817.ftp.masterhost.ru',
		user: 'u465817_start',
		password: 'shrism3t7nglow',
		parallel: 10,
		log: gutil.log
	});

	var globs = [
		'dist/**',
		'dist/.htaccess',
	];
	return gulp.src(globs, {
			buffer: false
		})
		.pipe(conn.dest('/www/2018/05/kia-forsage'));

});

gulp.task('rsync', function() {
	return gulp.src('dist/**')
		.pipe(rsync({
			root: 'dist/',
			hostname: 'username@yousite.com',
			destination: 'yousite/public_html/',
			archive: true,
			silent: false,
			compress: true
		}));
});

gulp.task('dist-clear', function() {
	return del.sync('dist');
});
gulp.task('cache-clear', function() {
	return cache.clearAll();
});

gulp.task('watch', ['sass', 'js-libs', 'browser-sync'], function() {
	gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['js-libs']);
	gulp.watch('app/*.html', browserSync.reload);
});

gulp.task('default', ['watch']);