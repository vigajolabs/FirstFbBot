
var express=require('express');
var app=express();

var FBBotFramework=require('fb-bot-framework');


var listeningport=process.env.PORT || 4000;



var currencyobtained=false;
var countryobtained=false;
var dollarvalue=0.0;
var country='';



var bot= new  FBBotFramework({


	
page_token :'EAAdlBWRKZA90BAD1YZAAFQ3RzZCDV07ZB9jHQhRjlypcyAUK9sKVZAHoImCsuL2fYFFvObP8Iva5rbuZCXSxXU5idpP0u6awmKfgaEmrgAsZA3eaMQpCNQSxrYPscntUAO6l1xMpGyh4h1eNJu2sO2TKvZACQjmuAIlFFLrpiq17zbH6CYbue0ne',  //Esto es de la pagina de Facebook
verify_token :'vigajolabs'
});


CurrencyConvertor = function(userId, msg){

  var orgtext = msg;

  if(!isNumeric(orgtext)){
  var message = orgtext.toLowerCase();
  }
  else {
    message = orgtext;
  }
  //var frmuser = session.message.user.name;


  if(message === 'hi' || message === 'hello' || message === 'hey'){
    bot.sendTextMessage(userId,'Hello.I am your curency convertor BOT.');
  }
  else if(message === 'canada' || message === 'india' || message === 'euro'){
    countryobtained = true;
    country=message;
  }
  else if(isNumeric(message)){
  dollarvalue=message;
  currencyobtained=true;
  }

  if(currencyobtained &&  !countryobtained){
    bot.sendTextMessage(userId,'Please enter the country to convert');
  }
  if(!currencyobtained && countryobtained){
    bot.sendTextMessage(userId,'Please enter the currency in USD ' + dollarvalue + ' ' + message);
  }
  if(!currencyobtained && !countryobtained){
    bot.sendTextMessage(userId,'Please enter currency in USD to convert');
  }

  if (currencyobtained && countryobtained) {

    countryobtained=false;
    currencyobtained=false;

  var convertedvalue=0.0;

    switch(country){
      case 'canada':
        convertedvalue = dollarvalue * 1.25;
        bot.sendTextMessage(userId,' You requested to convert to Canandian currency and the value is ' + convertedvalue);
        break;
      case 'india':
          convertedvalue = dollarvalue * 64.67;
          bot.sendTextMessage(userId,' You requested to convert to Indian currency and the value is ' + convertedvalue);
          break;
      case 'euro':
              convertedvalue = dollarvalue * 0.85;
              bot.sendTextMessage(userId,' You requested to convert to Euro and the value is ' + convertedvalue);
              break;

        }

        bot.sendQuickReplies(userId, ' Please rate my service', quickreply);

  }

};

app.use('/fb/msg', bot.middleware());


bot.on('message',function(userId,msg){
	
	CurrencyConvertor(userId,msg);

});

function isNumber(n){
	return lisNan(parseFloat(n)) && isFinite(n);
}

app.get('/',function(req,res){
	res.send("facebook BOT listening...");
});

app.listen(listeningport,function(){
	console.log('facebook BOT listening');
});