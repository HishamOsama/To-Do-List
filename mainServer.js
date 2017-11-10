//Importing Important libraries...
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require("fs");

// Create application/x-www-form-urlencoded parser...
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.static('public'));
app.use(bodyParser.json());

//Important Global Variables...
var user;
var id=0; //This id is used in the first time only .. then it is changing according to the order of the call of the users


//On opening the server .. This function is called to load the User Interface...
app.get('/', function (req, res)
{
	res.sendFile( __dirname + "/" + "userinterface.html" );
})

//These function validates the incoming e-mail, pw & name ^_^..
function validateEmail(email)
{
    // using regular expression.
    if (email.length > 0)
    {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    else
        return false;
}
 
// Password validation function
function validatePassword(pass)
{
    if (pass.length < 5)
        return false;
    else
        return true;
}
 
// Username validation function
function validateUsername(name)
{
    if (name.length > 0)
        return /^[a-zA-Z]*$/.test(name);
    else
        return false;
}

//Registeration Function...
app.post('/register', urlencodedParser, function (req, res) {

  // Prepare output in JSON format
  user =
  {
  	"name":req.body.name,
  	"email":req.body.email,
  	"password":req.body.password

  };
  
  //Validation of the Email...
  testEmail = req.body.email;
  console.log( testEmail);

  fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data)
  {
    //"err" here is for handling any error occuring in opening the file...
    data = JSON.parse( data );
    var flag = 0;
    for (var user in data){
    	if(testEmail == data[user].email)
    	{
    		flag=1;
    		break;
    	}
    }

    //This loop is used to determine the current id of the new user...
    id=0;
    for (var user in data){
    	if(testEmail == data[user].email)
    	{
    		id=id+1;
    	}
    	else
    	{
    		id=id+1;
    	}
    }


    if(flag==0)
    {
    	fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data)
    	{
    		user =
    		{
    			"name":req.body.name,
    			"email":req.body.email,
    			"password":req.body.password
    		};
			if(validateEmail(user.email)) {
				if(validatePassword(user.password)) {
					if(validateUsername(user.name)) {
						data = JSON.parse( data );
						data[id] = user;
						//id=id+1;
						res.sendFile(__dirname + "/data2/" + "test"+id+".html" );
						
						fs.writeFile(__dirname + "/" + "users.json",JSON.stringify(data), function (err) {
							if (err) return console.log(err);
							console.log(JSON.stringify(data));      
					  });
					} else {
						res.sendFile( __dirname + "/" + "login.html" );
					}
				} else {
				res.sendFile( __dirname + "/" + "login.html" );
				}
			}	
			else {
				res.sendFile( __dirname + "/" + "login.html" );
			}
      });

  } else {
    	res.sendFile( __dirname + "/" + "Register.html" );
    }
});
})


      //BackEnd...
      app.post('/array', function(req, res) {
      	var data = req.body;

        console.log ("Server started and collections cleared.");

        //Creating JSON file for each user... 
        var konan = data["id[]"][0];


        //varialble id...
        fs.writeFile(__dirname + "/data/" + "user" + konan + ".json",JSON.stringify(data), function (err) {
        	if (err)
        		return console.log(err);
        });
        res.send('success');
    });



      app.post('/logout', function (req, res) {
      	res.sendFile( __dirname + "/" + "userinterface.html" );
      })

//LOGIN FUNCTION
app.post('/login', urlencodedParser, function (req, res)
{

  // Get the values of the input text named username & password
  email = req.body.email1;
  password = req.body.password1;

  console.log(email);
  // Read JSON file containing the users to verify that the user is already registered and have access
  fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
    // Note that err here is for handling any error occuring in opening the file
    data = JSON.parse( data );
    var important=0;
    var flag = 0;
    id=0;

    //the variable important is used to determine the id of the user
    for (var user in data) {
    	if(email == data[user].email && password==data[user].password){
    		flag = 1;
    		authenticatedUser = user;
    		break;
    	}
    	else
    	{
    		id=id+1;
    		important=important+1;
    		flag = 0;
    	}
    }

    if(flag == 1)
    {
        res.sendFile( __dirname + "/data2/" + "test"+important+".html" );
    }
    else{res.sendFile( __dirname + "/" + "login.html" );}
});
})

//Importing Important Files
app.get('/user1.json', function (req, res)
{
	res.sendFile( __dirname + "/data/" + "user1.json" );
})

app.get('/user2.json', function (req, res)
{
	res.sendFile( __dirname + "/data/" + "user2.json" );
})

app.get('/user3.json', function (req, res)
{
	res.sendFile( __dirname + "/data/" + "user3.json" );
})

app.get('/user4.json', function (req, res)
{
	res.sendFile( __dirname + "/data/" + "user4.json" );
})

app.get('/user5.json', function (req, res)
{
	res.sendFile( __dirname + "/data/" + "user5.json" );
})

app.get('/user6.json', function (req, res)
{
	res.sendFile( __dirname + "/data/" + "user6.json" );
})

app.get('/user7.json', function (req, res)
{
	res.sendFile( __dirname + "/data/" + "user7.json" );
})

app.get('/user8.json', function (req, res)
{
	res.sendFile( __dirname + "/data/" + "user8.json" );
})

app.get('/user9.json', function (req, res)
{
	res.sendFile( __dirname + "/data/" + "user9.json" );
})

app.get('/user10.json', function (req, res)
{
	res.sendFile( __dirname + "/data/" + "user10.json" );
})

app.get('/user11.json', function (req, res)
{
	res.sendFile( __dirname + "/data/" + "user11.json" );
})

app.get('/user12.json', function (req, res)
{
	res.sendFile( __dirname + "/data/" + "user12.json" );
})

app.get('/user13.json', function (req, res)
{
	res.sendFile( __dirname + "/data/" + "user13.json" );
})

app.get('/user14.json', function (req, res)
{
	res.sendFile( __dirname + "/data/" + "user14.json" );
})

app.get('/user15.json', function (req, res)
{
	res.sendFile( __dirname + "/data/" + "user15.json" );
})

app.get('/user16.json', function (req, res)
{
	res.sendFile( __dirname + "/data/" + "user16.json" );
})

app.get('/user17.json', function (req, res)
{
	res.sendFile( __dirname + "/data/" + "user17.json" );
})

app.get('/user18.json', function (req, res)
{
	res.sendFile( __dirname + "/data/" + "user18.json" );
})

app.get('/user19.json', function (req, res)
{
	res.sendFile( __dirname + "/data/" + "user19.json" );
})

app.get('/user20.json', function (req, res)
{
	res.sendFile( __dirname + "/data/" + "user20.json" );
})





var server = app.listen(8081, function () {
	var host = server.address().address
	var port = server.address().port
	console.log("Example app listening at http:// %s : %s", host, port)
})