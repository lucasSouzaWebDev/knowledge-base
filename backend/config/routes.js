const adminMiddleware = require('./admin')

module.exports = (app) => {
  app.post('/signup', app.api.user.save)
  app.post('/signin', app.api.auth.signin)
  app.post('/validateToken', app.api.auth.validateToken)

  app.route("/users").all(app.config.passport.authenticate()).post(adminMiddleware(app.api.user.save)).get(adminMiddleware(app.api.user.get));

  app.route("/users/:id").all(app.config.passport.authenticate()).put(adminMiddleware(app.api.user.save));

  app
    .route("/categories")
    .all(app.config.passport.authenticate())
    .get(adminMiddleware(app.api.category.get))
    .post(adminMiddleware(app.api.category.save));

  app.route("/categories/tree").all(app.config.passport.authenticate()).get(app.api.category.getTree);

  app
    .route("/categories/:id")
    .all(app.config.passport.authenticate())
    .get(app.api.category.getById)
    .put(adminMiddleware(app.api.category.save))
    .delete(adminMiddleware(app.api.category.remove));

  app.route("/articles").all(app.config.passport.authenticate()).get(adminMiddleware(app.api.article.get)).post(adminMiddleware(app.api.article.save));

  app
    .route("/articles/:id")
    .all(app.config.passport.authenticate())
    .get(app.api.article.getById)
    .put(adminMiddleware(app.api.article.save))
    .delete(adminMiddleware(app.api.article.remove));

  app
    .route("/categories/:id/articles")
    .all(app.config.passport.authenticate())
    .get(app.api.article.getByCategory)
};
