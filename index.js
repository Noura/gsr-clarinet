window.onload = function() {
    var templates = make_underscore_templates($('body'));
    var app = soundvis({
        templates: templates,
        $container: $('#soundvis'), 
        data_url: 'data.json', 
        sound_url: 'clarinet.mp3'
    });
    app.run();
};
/*
    //
    // SETUP //////////////////
    //

    // this is the parameter which we will change based on GSR readings
    // filters can look and this and decide how to interpret it to mess with the audio
    var filter_param = 0;
    var gsr = null;

    var sample_period = 100; // sample period in milliseconds of GSR data

    // changing the filter parameter based on the GSR readings
    // and draw a visualization
    var i = 0;
    function change_filter_param() {
        if (i >= gsr.length) {
            return;
        }
        filter_param = gsr[i];
        i += 1;
        $('body').append($(
            '<div style="position:absolute; top:'+i*1+'px; left:0; width:'+gsr[i]*$(window).width()*0.9+'px; height:1px; background:black;"></div>'));
        if ( i > $(window).scrollTop() + $(window).height()) {
            $(window).scrollTop($(window).scrollTop() + 1);
        }
        setTimeout(change_filter_param, sample_period);
    };

    var context = new AudioContext();

    // making the buffer an audio node
    var source = context.createBufferSource();

    // our custom audio filter
    var filter = context.createScriptProcessor(4096, 2, 2);
    filter.onaudioprocess = function(e) {
        for (var channel = 0; channel < e.outputBuffer.numberOfChannels; channel++) {
            var input = e.inputBuffer.getChannelData(channel);
            var output = e.outputBuffer.getChannelData(channel);
            for (var sample = 0; sample < e.inputBuffer.length; sample++) {
                output[sample] = input[sample];
            }
        }
    };

    //
    // LOAD PRERECORDED GSR DATA //////////////////
    //
    var data = null;
    $.getJSON('data.json', function(d) {
        data = d;
        // processing the GSR data
        gsr = _.pluck(data, 'gsr');
        // distort the min and max to exaggerate variation
        // var min = _.min(gsr) + 0.3;
        // var max = _.max(gsr) - 0.1;
        var min = _.min(gsr);
        var max = _.max(gsr);
        // normalize
        gsr = _.map(gsr, function(g) {
            return Math.max(0, Math.min(1, Math.abs((g - min) / (max - min))));
        });

        //
        // THEN LOAD SONG //////////////////
        //
        var request = new XMLHttpRequest();
        request.open('GET', 'clarinet.mp3', true);
        request.responseType = 'arraybuffer';
        request.onload = function() {
            //
            // THEN DECODE AUDIO //////////////////
            //
            context.decodeAudioData(request.response, function(buf) {
                //
                // THEN GET THINGS MOVING //////////////////
                //
                source.buffer = buf;
                source.playbackRate.value = 5.0;

                // hooking up the audio stuff
                source.connect(filter);
                filter.connect(context.destination);

                // starting the audio
                source.start(0);

                change_filter_param();

            }, function error() {
                console.log('error with request for song');   
            }); // end of decoding audio
        };
        request.send(); // end of loading song
    }); // end of loading GSR data
*/
