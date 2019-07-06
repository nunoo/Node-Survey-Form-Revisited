$(document).ready(function () {
    console.log("ready!");
    var socket = io.connect();
    console.log("connected to io!");

    $('#button').click(function (e) {
        console.log("clicked!");
        socket.emit('posting_form', {
            name: $('#name').val(),
            location: $('#location').val(),
            language: $('#language').val(),
            comment: $('#comment').val()
        })
    });

    socket.on("random_number", function (results) {
        $(".results").append("The lucky number emitted by the server is " + results.random_number + ". ");
    });
    
    socket.on("updated_message", function (results) {
        $(".results").append("You emmited the following information to the server: {name: " + results
            .response.name + ", location: " + results.response.location + ", language: " + results
            .response.language + ", comment: " + results.response.comment + "}");
    });
});