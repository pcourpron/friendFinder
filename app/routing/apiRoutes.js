var bcrypt = require('bcrypt')
var mysql = require('mysql')


module.exports = function (app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------

    app.post("/api/signup", function (req, response1) {
        var user = req.body;

        var auth_key
        bcrypt.hash('test', 1, function (err, hash) {
            auth_key = hash
        });

        bcrypt.hash(req.body.password, 10, function (err, hash) {
            var port = 3306;

            var connection = mysql.createConnection({
                host: "jsk3f4rbvp8ayd7w.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",

                // Your port; if not 3306
                port: port,

                // Your username
                user: "unvgofwi87t1yfna",

                // Your password
                password: "i9ew72vpz9oobivr",
                database: "agl6fqpkbkii3c61"

            });

            connection.connect(function (err) {
                if (err) throw err;
            });

            connection.query(`INSERT INTO users SET ?`, { name: user.name, email: user.email, password: hash, auth_key: auth_key }, function (err, res) {
                if (err) throw err;
                else {
                    response1.send([auth_key, user.name])
                        ;
                };
            });

            connection.end();
        });

    });


    app.post("/api/login", function (req, response1) {
        var user = req.body
        var port = 3306;
        var connection = mysql.createConnection({
            host: "jsk3f4rbvp8ayd7w.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",

            // Your port; if not 3306
            port: port,

            // Your username
            user: "unvgofwi87t1yfna",

            // Your password
            password: "i9ew72vpz9oobivr",
            database: "agl6fqpkbkii3c61"

        });

        connection.connect(function (err) {
            if (err) throw err;
        });

        connection.query(`SELECT * FROM users WHERE ?`, { email: user.email }, function (err, response) {
            bcrypt.compare(user.password, response[0].password, function (err, res) {
                if (res == true) {
                   
                    response1.send([response[0].name, response[0].auth_key])

                }
            })
        })

        connection.end()
    });


    app.post("/api/friends", function (req, response1) {
        var user = req.body
        var username
        var pic_url
        
        var port = 3306;
        var connection = mysql.createConnection({
            host: "jsk3f4rbvp8ayd7w.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",

            // Your port; if not 3306
            port: port,

            // Your username
            user: "unvgofwi87t1yfna",

            // Your password
            password: "i9ew72vpz9oobivr",
            database: "agl6fqpkbkii3c61"

        });

        connection.connect(function (err) {
            if (err) throw err;
        });
        
        connection.query(`SELECT * FROM survey`, function (err, response) {
            
           
            var bestTotal = 1001;
            
            response.forEach(answer => {
                var total = 0;
                var i = 0;
               
    
                for (var key in answer) {
    
                    if (key !== 'username'  && key !== 'pic_url') {
                        total += Math.abs(parseInt(answer[key]) - parseInt(user.scores[i]));
                        i++;
                    };
                    
                };
                
                
                if (bestTotal > total) {
                    bestTotal = total;
                    username = answer['username'];
                    pic_url = answer.pic_url;
                };

            });
            
       
            response1.send([username,pic_url]);
            connection.end();
        });

       
    });

    app.get('/api/friends',function(req,response){
        var port = 3306;
        var connection = mysql.createConnection({
            host: "jsk3f4rbvp8ayd7w.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",

            // Your port; if not 3306
            port: port,

            // Your username
            user: "unvgofwi87t1yfna",

            // Your password
            password: "i9ew72vpz9oobivr",
            database: "agl6fqpkbkii3c61"

        });

        connection.connect(function (err) {
            if (err) throw err;
        });

        connection.query('SELECT * from survey',function(err,res){
            response.send(res)
        })

    })


}
