contextDialog = {}

$(document).ready(function() {
    callNode();
    $("#myForm").submit(function(event) {
        event.preventDefault();
        var userInput = $("#user-input").val();
        if (userInput) {
            userText(userInput);
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
        if (res.output.generic.length > 0) {
            res.output.generic.forEach(item => {
                if (item.response_type === "text") {
                    $('.messages').append(`<div class="message new"><figure class="avatar">
                    <img src="./img/watson_logo-2.png" /></figure>${item.text}</div>`);
                    $("#id").val(res.context.conversation_id);
                    updateScroll();
                }
                if (item.response_type === "option") {
                    var optionHtml = "<div class='content-option message new'>";
                    item.options.forEach((option) => {
                        var valor = option.value.input.text;
                        optionHtml += `<a href="#" onclick="userOption('${valor}');" class="itens-option message new">${option.label}</a>`;
                    });
                    optionHtml += "</div>";
                    $('.messages').append(optionHtml);
                    $("#id").val(res.context.conversation_id);
                    updateScroll();
                }
            });
        }
    }, 1000);
    contextDialog = res.context.conversation_id
}

function userText(text) {
    $('.messages').append(`<div class="message message-personal">${text}</div>`);
    $('#user-input').val("");
    updateScroll();
}

function updateScroll() {
    var element = document.querySelector('.messages');
    element.scrollTop = element.scrollHeight;
}

function userOption(text) {
    userText(text);
    callNode(text);
}