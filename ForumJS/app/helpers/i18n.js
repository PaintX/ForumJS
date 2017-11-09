
var _defaultParams = 
{
    // setup some locales - other locales default to en silently
    locales:['en', 'de'],

    // where to store json files - defaults to './locales' relative to modules directory
    directory: './mylocales',

    // sets a custom cookie name to parse locale settings from - defaults to NULL
    cookie: 'yourcookiename',

    // setting extension of json files - defaults to '.json' (you might want to set this to '.js' according to webtranslateit)
    extension: '.js',

    // you may alter a site wide default locale
    defaultLocale: 'fr',

    actualLocale : 'en',
};

var i18n = {};

function _configure (params)
{
    if ( params.locales != undefined )
    {
        _defaultParams.locales = [];
         params.locales.map(function(data){ _defaultParams.locales.push(data); });
    }
    if ( params.directory != undefined )
    {
        _defaultParams.directory = params.directory;
    }
    if ( params.cookie != undefined )
    {
        _defaultParams.cookie = params.cookie;
    }
    if ( params.extension != undefined )
    {
        _defaultParams.extension = params.extension;
    }
}

function _init(application)
{
    _defaultParams.locales.map(function(lang,index)
    {
        i18n[lang] = require(_defaultParams.directory + "/" + lang + _defaultParams.extension);
    });

    if ( application == undefined )
    {
        
    }

    application.use(function(req, res, next) 
    {
        var sess = req.session;

        if ( sess[_defaultParams.cookie] == undefined )
        {
            sess[_defaultParams.cookie] = _defaultParams.defaultLocale;
        }

        _defaultParams.actualLocale = sess[_defaultParams.cookie];

        next();
    });
}

function _helper (msg) 
{
    var trad = undefined;
    if ( i18n[_defaultParams.actualLocale][msg] == undefined )
        trad = msg;
    else
        trad = i18n[_defaultParams.actualLocale][msg];

    return trad;
};


function _getLangFor(categorie, str)
{
    let trad = str;
    for (let key in i18n[_defaultParams.actualLocale][categorie]) {
        if (i18n[_defaultParams.actualLocale][categorie][key][str] != undefined) {
            trad = i18n[_defaultParams.actualLocale][categorie][key][str];
        }
    }
    return trad

}
function _getLangForACP(str)
{
    return _getLangFor('acp', str);
}

function _getLangForInstall(str) {
    return _getLangFor('install', str);
}

function _getLocaleName(locale)
{
    return i18n[locale].local_name;
}
module.exports.helper = _helper;
module.exports.configure = _configure;
module.exports.init = _init;
module.exports.getLangForACP = _getLangForACP;
module.exports.getLangForACP = _getLangForACP;
module.exports.getLangForInstall = _getLangForInstall;
module.exports.params = _defaultParams;
module.exports.getLocaleName = _getLocaleName;