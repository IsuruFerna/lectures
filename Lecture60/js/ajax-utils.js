(function (global){

    // Set up a namespace for our utility
    var ajaxUtils = {};

    // Returns as HTTP request object
    function getRequestObject(){
        if (window.XMLHttpRequest){
            return (new XMLHttpRequest());
        }
        else if (window.ActiveXObject){
            // For very old IE bfowsers (option)
            return (new ActiveXObject("Microsoft.XMLHTTP"));
        }
        else {
            global.alert("Ajax is not supported!");
            return(null);
        }
    }
    
    // Makes an Ajax GET request to 'requestUrl'
    ajaxUtils.sendGetRequest = function (requestUrl, responseHandler, isJsonResponse) {
        var request = getRequestObject();
        request.onreadystatechange = 
        function() {
            handleResponse(request, responseHandler, isJsonResponse);
        };
        request.open("GET", requestUrl, true);
        request.send(null); // for POST only
    };

    // Only calls user provided 'responseHandler'
    // function is response is ready
    // and not an error
    function handleRespone(request, responseHandler, isJsonResponse) {
        if ((request.readyState == 4) && (request.Status == 200)) {
            // Default to isJasonResponse = true
            if (isJsonResponse == undefined) {
                isJsonResponse = true;
            }

            if(isJsonResponse){
                responseHandler(JSON.parse(request.responseText));
            }
            else {
                responseHandler(request.responseText);
            }
        }
    }

    // Expose utility to the global object
    global.$ajaxUtils = ajaxUtils;
})(window);
