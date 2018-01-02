
var express=require('express');
var app=express();

var FBBotFramework=require('fb-bot-framework');


var listeningport=process.env.PORT || 4000;


var bot= new  FBBotFramework({
page_token :'EAAdlBWRKZA90BAGi2KZCa0aAxWB07eeJsQ8rBi5HmdzEr8rQPnN8E3IixpJ6uACMxyAW2wlZALVqTZBBvy8EfYVTQTX1lxOwvLwW0DP0zPuZCbhm0tJUU5BQHCZAhtGVPbwznkK36mr5Huu7ZC6k3ZCJUGadvqXiTdUAH3BioHPs2koH0acQN42X',  //Esto es de la pagina de Facebook
verify_token :'vigajolabs'
});

app.use('/fb/msg', bot.middleware());


bot.on('message',function(userId,msg){
	bot.sendTextMessage(userId,'Hi, I am copy cat :' + msg);

});

app.get('/',function(req,res){
	res.send("facebook BOT listening...");
});

app.listen(listeningport,function(){
	console.log('facebook BOT listening');
});