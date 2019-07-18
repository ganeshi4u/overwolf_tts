var TTSPlugin = new OverwolfPlugin("overwolf-plugin-tts", true);
TTSPlugin.initialize(function(status) {
    if (status == false) {
        $('#plugin-indicator').append('<span class="badge badge-pill badge-danger">plugin</span>');
        return;
    }

    $('#plugin-indicator').append('<span class="badge badge-pill badge-success">plugin</span>');
});

$(window).on("load", function(){
    $('#narrator_toggle').bootstrapToggle({
        on: 'ON',
        off: 'OFF',
        onstyle: 'success',
        offstyle: 'danger'
    });
    $('body').on('change', '#narrator_toggle', function(){
        if ($(this).prop('checked')) {
            $('#hidden_narrator_toggle').val('on');
        } else {
            $('#hidden_narrator_toggle').val('off');
        }
    });

    TTSPlugin.get().getNarratorVoices(function(status, data) {
        if (status) {
            var len = data.length;
            for (var i=0; i < len; i++) {
                $("select#narrator_voice").append( $("<option>")
                .val(data[i])
                .html(data[i])
                ); 
            }
        }
    });

    TTSPlugin.get().getOutputDevices(function(status, deviceNames, deviceIds) {
        if (status) {
            var len = deviceNames.length;
            for (var i=0; i < len; i++) {
                $("select#output_device").append( $("<option>")
                .val(deviceIds[i])
                .html(deviceNames[i])
                ); 
            }
        }
    });

    var mySpeechRateSlider = $("#speech_rate_slider").slider();
    mySpeechRateSlider.on("slide", function(slideEvt) {
        $("#SpeechRateSliderVal").text(slideEvt.value);
    });

    var myVolumeSlider = $("#narrator_volume_slider").slider();
    myVolumeSlider.on("slide", function(slideEvt) {
        $("#VolumeSliderVal").text(slideEvt.value);
    });

    TTSPlugin.get().getNarratorSettings(function(settings) {
        $('#narrator_toggle').bootstrapToggle(settings[0]);
        $('#narrator_voice').val(settings[1]);
        $('#output_device').val(settings[2]);
        mySpeechRateSlider.slider('setValue', settings[3]);
        $("#SpeechRateSliderVal").text(settings[3]);
        myVolumeSlider.slider('setValue', settings[4]);
        $("#VolumeSliderVal").text(settings[4]);
    });

    $('body').on('click', '#apply', function(){
        var settings = $('#narrator_settings').serialize();
        TTSPlugin.get().updateNarratorSettings(settings, function(status) {
            if (status) {
                alert('Settings applied!');
            } else {
                alert('Something wrong! Failed to apply settings!')
            }
        });
    });
});

function dragResize(edge){
    overwolf.windows.getCurrentWindow(function(result){
        if (result.status=="success"){
            overwolf.windows.dragResize(result.window.id, edge);
        }
    });
};

function dragMove(){
    overwolf.windows.getCurrentWindow(function(result){
        if (result.status=="success" && result.window.state !== "Maximized"){
            overwolf.windows.dragMove(result.window.id);
        }
    });
};

function closeWindow(){
    overwolf.windows.getCurrentWindow(function(result){
        if (result.status=="success"){
            overwolf.windows.close(result.window.id);
        }
    });
};

function minimize(){
    overwolf.windows.getCurrentWindow(function(result){
        if (result.status=="success"){
            overwolf.windows.minimize(result.window.id);
        }
    });
};

function toggleMaximize(){
    let element = document.querySelector('.maximize-restore-selector'),
    root = document.documentElement;

    overwolf.windows.getCurrentWindow(function(result){
        if (result.status !== "success") {
            return;
        }

        if (element.checked) {
            overwolf.windows.restore(result.window.id);
            root.classList.remove('maximized');
        } else {
            overwolf.windows.maximize(result.window.id);
            root.classList.add('maximized');
        }
    });
};

function showHelp() {
    
};