// https://streamlabs.com/dashboard#/settings/api-settings API Settings -> API Tokens -> Your Socket API Token
const socketToken = 'MY_SOCKET_API_TOKEN';

// https://streamlabs.com/dashboard#/settings/api-settings API Settings -> API Tokens -> Your API Access Token
const token = "MY_API_TOKEN";

// Use any of the filenames that Streamlabels would normally create
const labelName = 'session_top_donator';

//Connect to socket
const streamlabs = io(`https://sockets.streamlabs.com?token=${socketToken}`, {transports: ['websocket']});

//Perform Action on event
streamlabs.on("connect", () => {
    console.log("Connected to socket");
});

streamlabs.on("disconnect", () => {
    console.log("Disconnected from socket");
});

streamlabs.on("reconnect", () => {
    console.log("Reconnected to socket");
    refreshReconnect()
});

streamlabs.on('event', (eventData) => {
if (eventData.type == 'streamlabels') {
    var json = eventData.message["data"];
    console.log(json);
    // Check if there is already an element with class
    this[labelName] = json[`${labelName}`];
    text = this[labelName];
    if (text != null) {
        // If Element have this class, modify the child element
        if (document.querySelector("." + labelName) != null) {
            console.log("Class already exist");
            editLabel(text, labelName);
        }
        else {
            // We create the label
            console.log("Creating label");
            createLabel(text, labelName);
        } 
    }
}
else {
    console.log("Event without streamlabels type");  
    // console.log(eventData.type)
    // console.log(eventData.message["data"])
}
});

function init() {
    fetch(`https://streamlabs.com/api/v5/stream-labels/files?token=${token}`)
        .then(response=>response.json())
        .then(data=> {
            json = data['data'];
            this[labelName] = json[`${labelName}`];
            if (this[labelName] != null) {
                text = this[labelName];
                createLabel(text, labelName);
            }
        })
        .catch(function (error) {
            console.log("Error fetching data:", error);
            // Restart
            setTimeout(init, 5000);
        });
}

function refreshReconnect() {
    fetch(`https://streamlabs.com/api/v5/stream-labels/files?token=${token}`)
        .then(response=>response.json())
        .then(data=> {
            json = data['data'];
            this[labelName] = json[`${labelName}`];
            if (this[labelName] != null) {
                text = this[labelName];
                editLabel(text, labelName);
            }
        })
        .catch(function (error) {
            console.log("Error fetching data:", error);
            // Restart
            setTimeout(refreshReconnect, 5000);
        });
}

function createLabel(text, labelName){
    // Create li element with labelName as class
    let liItem = document.createElement("li");
    liItem.classList.add(labelName);
    // Create div container for text from StreamLabels
    let textContainer = document.createElement("div");
    textContainer.classList.add("textContainer")
    textContainer.innerHTML = `${text}`;
    liItem.appendChild(textContainer);
    document.querySelector('ul').append(liItem);
}

function editLabel(text, labelName) {
    let textContainer = document.querySelector("." + labelName + " .textContainer")
    if (textContainer.innerHTML != `${text}`) {
        textContainer.innerHTML = `${text}`;
    }
}

init();
