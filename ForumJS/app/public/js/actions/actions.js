import api from "api";

function forwardTo(location) {
    if (document.location.href.search(location) == -1)
        window.location.hash = location;

}

function getURLPath()
{
    return window.location.hash.substring(2);
}

export { forwardTo, getURLPath};