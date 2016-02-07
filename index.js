window.onload = function() {
    var data = data_and_audio_doer({
        data_url: 'data.json', 
        sound_url: 'clarinet.mp3'
    });

    var vals = [{h:1}, {h:2}, {h:3}, {h:4}];
    var graph = barstack('#fft-viz-container', vals);

    setTimeout(function() {
        vals[0].h = 500;
        graph.update(vals);
    }, 5000);

};
