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
    that.audioCtx = new AudioContext();
    that.audio_source = that.audioCtx.createBufferSource();
    that.gsr = null;

    load_json_samples(options.data_url, {time: 'seconds', value: 'gsr'}).then(function(o) {
        that.gsr = o;
        console.log('gsr', o);
    });

    load_audio_buffer(that.audioCtx, options.sound_url).then(function(b) {
        that.audio_source.buffer = b;
        console.log('buffer', b);
    });

    return that; 
};

var barstack = function(selector, data) {
    var viz = d3.select(selector);
    var bars = viz.selectAll('div').data(data).enter().append('div');

    function update(data) {
        bars.data(data)
            .style("width", "100%")
            .style("height", function(d) { 
                return d.h + "px"; })
            .style("background", function(d, i) { 
                var gray = (i % 2) ? 10 : 100;
                return "rgb(" + gray + "," + gray + "," + gray +")"; });
    }
    update(data);

    return {
        update: update,
    }
};
