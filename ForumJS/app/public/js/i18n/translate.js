/*
* Created on Tue Jan 16 2017
*
* Copyright (c) 2017 Yann GARRAS - Y3S SAS
*/
import React from 'react';

import en from 'en';
import fr from 'fr';
//import config from 'vendor/Config/config.js';

var config = {};

config.config = {};
config.config.locale = "fr";
/**
 * Check if every translation is here
 */
function checkObject(object, object1) {
    if (object1 == undefined) {
        console.error("Missing translation ");
        console.error(object);
        return;
    }

    for (var key in object) {
        if (object.hasOwnProperty(key)) {
            if (object[key] instanceof Object)
                checkObject(object[key], object1[key]);
            else if (object1[key] == undefined) {
                console.error("Missing translation " + key);
                console.error(object);
            }
        }
    }
}
let isLocal = document
    .location
    .href
    .search("localhost") != -1;
if (isLocal)
    checkObject(fr, en);

var languages = {
    en,
    fr
};

function get(key) {
    return languages[config.config.locale][key];
}

function translate(key) {
    return Component => {
        class TranslationComponent extends React.Component {
            render() {
                //-- ARRT
                //-- si la langue selectionner ne comporte pas de traduction, alors on passe directement en anglais
                if (languages[config.config.locale] == undefined || languages[config.config.locale] == null) {
                    config.config.locale = "en";
                }

                if (typeof (key) === 'string') {
                    var strings = languages[config.config.locale][key];
                    return <Component {...this.props} {...this.state} i18n={strings} />;
                }
                else if (Array.isArray(key) == true) {
                    var strings = [];
                    for (var $i in key) {
                        strings[key[$i]] = languages[config.config.locale][key[$i]];
                    }
                    return <Component {...this.props} {...this.state} i18n={strings} />;
                }
                else {
                    console.error("***** translate : key incompatible Type !!! *****");
                }
            }
        }

        return TranslationComponent;
    };
}

export { translate, get };