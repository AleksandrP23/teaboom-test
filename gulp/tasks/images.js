export const images = () => {
  return app.gulp.src([`${app.paths.srcImgFolder}/**/*.{jpg,jpeg,png,svg}`], { encoding: false })
    .pipe(app.gulp.dest(app.paths.buildImgFolder));
};
