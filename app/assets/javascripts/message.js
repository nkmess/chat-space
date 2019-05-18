$(document).on('turbolinks:load', function(){
  function buildHTML(message){
    var body = message.body ? `${ message.body }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="message" data-id="${message.id}">
                  <div class="info">
                    <p class="info__user-name">
                      ${message.user_name}
                    </p>
                    <p class="info__date">
                      ${message.date}
                    </p>
                  </div>
                  <div class="body">
                    <div>
                    ${body}
                    </div>
                    ${img}
                  </div>
                </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var message = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: message,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('#message_body').val('');
      var position = $('.messages').get(0).scrollHeight;
      $('.messages').animate({scrollTop: position});
    })
    .fail(function(data){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
    .always(function(data){
      $('.form__submit').prop('disabled', false);
    })
  })
});
