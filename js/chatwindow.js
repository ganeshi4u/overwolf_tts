function dragMove(){
    overwolf.windows.getCurrentWindow(function(result){
        if (result.status=="success" && result.window.state !== "Maximized"){
        overwolf.windows.dragMove(result.window.id);
        }
    });
};

var TTSPlugin = new OverwolfPlugin("overwolf-plugin-tts", true);
TTSPlugin.initialize(function(status) {
    if (status == false) {
        $('#plugin-indicator').append('<span class="badge badge-pill badge-danger">plugin</span>');
        return;
    }

    $('#plugin-indicator').append('<span class="badge badge-pill badge-success">plugin</span>');
});

function send_msg(msg) {
    if (event.key === 'Enter') {
        if (msg.value === '.settings') {
            overwolf.windows.obtainDeclaredWindow("settings", function(result){
                if (result.status == "success"){
                    overwolf.windows.restore(result.window.id, function(result){
                        console.log(result);
                    });
                }
            });
        } else {
            TTSPlugin.get().convertText(msg.value, function(status) {
                if (status) {
                    document.querySelector('#chat_msg').innerText = msg.value;
                } else {
                    $('#plugin-indicator').append('<span class="badge badge-pill badge-success">narrator off</span>');
                }
            });
        }
    }
};

/*async function send_msg(msg) {
    if(event.key === 'Enter') {
        // audio device setup
        //const devices = await navigator.mediaDevices.enumerateDevices();
        //const audioDevices = devices.filter(devices => devices.kind == 'audiooutput');
        //const audio = document.createElement('audio');
        //await audio.setSinkId(audioDevices[0].deviceId);
        //console.log('Audio is being played on ' + audio.sinkId);

        var tts = new SpeechSynthesisUtterance();
        var tts_voices = window.speechSynthesis.getVoices();
        tts.voice = tts_voices[10];
        tts.voiceURI = 'native';
        tts.volume = 1;
        tts.rate = 1;
        tts.pitch = 2;
        tts.text = msg.value;
        tts.lang = 'en-IN';

        msg.onend = function(e) {
            console.log('Finished in ' + event.elapsedTime + ' seconds.');
        };
          
        speechSynthesis.speak(tts);
    }
}*/
