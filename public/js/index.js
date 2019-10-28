contextDialog = {}

$(document).ready(function() {
    callNode();
    $("#myForm").submit(function(event) {
        event.preventDefault();
        var userInput = $("#user-input").val();
        if (userInput) {
            userText();
            callNode(userInput);
        }
    });
});

function callNode(userInput) {
    $.ajax({
        url: "/watson/message",
        type: "POST",
        data: {
            input: userInput,
            id: contextDialog
        }
    }).done(function(res) {
        const watsonObjResp = res;
        if (res.output.text[0]) {
            watsonText(res);
        }
    });
}

function watsonText(res) {
    $('.messages').append('<div class="message loading new"><figure class="avatar"><img src="./img/watson_logo-2.png" /></figure><span></span></div>');
    setTimeout(function() {
        $('.message.loading').remove();
        if (res.output.text.length > 1) {
            for (var i = 0; i < res.output.text.length; i++) {
                $('.messages').append(`<div class="message new"><figure class="avatar">
                <img src="./img/watson_logo-2.png" /></figure>${res.output.text[i]}</div>`);
                $("#id").val(res.context.conversation_id);
                updateScroll();
            }
        } else {
            $('.messages').append(`<div class="message new"><figure class="avatar">
                <img src="./img/watson_logo-2.png" /></figure>${res.output.text[0]}</div>`);
            $("#id").val(res.context.conversation_id);
            updateScroll();
        }
    }, 1000);
    contextDialog = res.context.conversation_id
}

function userText() {
    var text = $('#user-input').val();
    $('.messages').append(`<div class="message message-personal">${text}</div>`);
    $('#user-input').val("");
    updateScroll();
}

function updateScroll() {
    var element = document.querySelector('.messages');
    element.scrollTop = element.scrollHeight;
}