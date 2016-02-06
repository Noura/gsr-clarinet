var load_json_samples = function(json_url, format) {
    return $.getJSON(json_url).then(function(d) {
        var dt = d[1][format.time] - d[0][format.time];
        var values = _.pluck(d, format.value);
        var min = _.min(values);
        var max = _.max(values);
        var normalized = _.map(values, function(val) {
            return (val - min) / (max - min);
        });
        return {
           json: d,
           dt: dt,
           values: values,
           min: min,
           max: max,
           normalized: normalized,
        };
    });
};

var load_audio_buffer = function(audioContext, audio_url) {
    var promise = $.Deferred();
    var request = new XMLHttpRequest();
    request.open('GET', audio_url, true);
    request.responseType = 'arraybuffer';
    request.onload = function() {
        audioContext.decodeAudioData(request.response, function(buf) {
            promise.resolveWith(this, [buf]);
        }, function error() {
            promise.rejectWith(this);
        });
    };
    request.send();
    return promise;
};

var data_and_audio_doer = function(options) {
    var that = {};
    var audioCtx = new AudioContext();
    var source = audioCtx.createBufferSource();
    var gsr = null;

    load_json_samples(options.data_url, {time: 'seconds', value: 'gsr'}).then(function(o) {
        gsr = o;
        console.log('gsr', o);
    });

    load_audio_buffer(audioCtx, options.sound_url).then(function(b) {
        source.buffer = b;
        console.log('buffer', b);
    });

};

