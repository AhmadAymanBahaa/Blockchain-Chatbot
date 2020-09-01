var botui = new BotUI('BlockChain-Bot');

console.log("BlockChain-Bot initiated")

botui.message.add({
  delay: 500,
  loading: true,
  content: 'Hello! It is your Financial Personal Assistant. How can I help you?'
});

userTextInput();

function userTextInput(){
    botui.action.text({ // show 'text' action
        action: {
          placeholder: 'Please Enter your request'
        }
    }).then(function (input){
        var response = getResponse(input['value']);
        userTextInput();
    });
}


function addBotTextAndSpeak(response){
    botui.message.add({
        content: '' + response
     });
    TTS(''+response)
}
function addUserInput(userInput){
    botui.message.add({
        human: true,
        content: userInput
     });
}

function getResponse(userInput){
    var botReply = '';
    return jQuery.getJSON($SCRIPT_ROOT + '/chat', {msg: userInput},
       function(response)
       {
            botReply = response['reply'];
            addBotTextAndSpeak(botReply)
      });
}

function setReply(response){
    window.botResponse = response
    alert(window.botResponse)
}

//What this would do is simply create an iframe element and set content as its src url.
 //So anything that can be shown in an iframe can be embedded in a BotUI message.



//Speech Recognition
lang = 'en-US'
try {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = lang;
    recognition.interimResults = false;

    document.querySelector('button').addEventListener('click', (e) => {
    console.log("Getting Audio in : "+window.lang)
    recognition.start();
    });
    recognition.addEventListener('result', (e) => {
    let last = e.results.length - 1;
    let userInput = e.results[last][0].transcript;
    console.log('Confidence: ' + e.results[0][0].confidence);
    $('#recButton').removeClass("Rec");
    $('#recButton').addClass("notRec");
    addUserInput(userInput);
    addBotTextAndSpeak(getResponse(userInput));
    });
}
catch(err){
    console.log("Speech Recognition could not Start. Please check that the running browser is Chrome")
}

// Recording Button Effect
$('#recButton').addClass("notRec");

$('#recButton').click(function(){
	if($('#recButton').hasClass('notRec')){
		$('#recButton').removeClass("notRec");
		$('#recButton').addClass("Rec");
	    console.log('Started Recording')
	}
	else{
		$('#recButton').removeClass("Rec");
		$('#recButton').addClass("notRec");
		try{
		    recognition.stop()
	    }
	    catch(err){console.log("Speech Recognition not properly functioning. Please check that the running browser is Chrome")}
	}
});



//TTS
function TTS(text) {
//           function(response)
           {
               console.log("language in script is "+lang)
               if ( lang == 'en-US' )
               {
                  window.lang = 'en-US'
                  responsiveVoice.speak(text, 'UK English Male')
               }
               else if (lang == 'ar')
               {
                  responsiveVoice.speak(text,'Arabic Male')
               }
            }
}
