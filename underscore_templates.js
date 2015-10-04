// write all your templates in your HTML and then this function will find them and put them in an object for you. put your template in HTML in a script tag. the data-name attribute on the script tag will be the key in the object by which you can call that template. the script has to have type="underscore/template"
var make_underscore_templates = function($el) {
    var tems = {};
    _.each($el.find('script[type="underscore/template"]'), function(t) {
        tems[$(t).data('name')] = _.template(t.innerHTML);
    });
    return tems;
};
