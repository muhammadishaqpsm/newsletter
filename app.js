const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});
app.post("/", function(req, res){
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;

  const data = {
      members:[
        {
          email_address:email,
          status:"subscribed",
          merge_fields:{
            FNAME:firstName,
            LNAME:lastName,
            }
        }
      ]
    };
  const jsonData = JSON.stringify(data);
  const url = "https://us1.api.mailchimp.com/3.0/lists/6a04f0623a";
  const options = {
                    method:"POST",
                    auth:"Ishaq:be95992a18b31269d0b76c36c3bd0439-us1",
                  }
  const request = https.request(url, options, function(response){
    console.log(response.statusCode)
                      if (response.statusCode === 200){
                          res.sendFile(__dirname + "/success.html");
                        }
                        else{
                          res.sendFile(__dirname + "/failure.html");
                        }

                        response.on('data', function(data){
                          console.log(JSON.parse(data));
                      });
                  });
            request.write(jsonData);
            request.end();
      });

          app.post("/failure", function(req, res){
            res.redirect("/");
          });


app.listen(process.env.PORT || 3000, function(){
  console.log("you are running at port 3000");
});





// be95992a18b31269d0b76c36c3bd0439-us1
// 6a04f0623a
