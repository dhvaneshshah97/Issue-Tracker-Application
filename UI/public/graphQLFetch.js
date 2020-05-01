'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = async function graphQLFetch(query) {
    var variables = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    try {
        var response = await fetch(window.ENV.UI_API_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: query, variables: variables })
        });
        var body = await response.text();
        var result = JSON.parse(body);

        if (result.errors) {
            var error = result.errors[0];
            if (error.extensions.code === 'BAD_USER_INPUT') {
                var details = error.extensions.exception.errors.join('\n ');
                alert(error.message + ':\n ' + details);
            } else {
                alert(error.extensions.code + ': ' + error.message);
            }
        }
        return result.data;
    } catch (e) {
        alert('Error in sending data to server: ' + e.message);
        return null;
    }
};