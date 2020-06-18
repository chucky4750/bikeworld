module.exports.routes = (app) => {
    app.get('/gutschein', function(req, res){
        res.render("gutschein", {loggedin: req.session.loggedin}); 
      });
    
    }