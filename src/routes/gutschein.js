module.exports.routes = (app) => {
    app.get('/gutschein', function(req, res){
        res.render("gutschein"); // Set disposition and send it.
      });
    
    }