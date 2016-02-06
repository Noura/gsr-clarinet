window.onload = function() {
    //var templates = make_underscore_templates($('body'));

    var data = data_and_audio_doer({
        data_url: 'data.json', 
        sound_url: 'clarinet.mp3'
    });

    console.log('data', data);
};
