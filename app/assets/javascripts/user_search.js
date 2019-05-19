$(function() {

var search_list = $("#user-search-result");

function appendUserSearchHTML(user_name) {
  var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user_name.name}</p>
                <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user_name.id}" data-user-name="${user_name.name}" >追加</div>
              </div>`
  search_list.append(html);
}

function appendErrMsgToHTML() {
  var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">一致するユーザーが見つかりません</p>
              </div>`
  search_list.append(html);
}

  $('#user-search-field').on('keyup', function() {
    var input = $('#user-search-field').val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json',
    })

    .done(function(user_names) {
      $("#user-search-result").empty();
      if (user_names.length !== 0) {
        user_names.forEach(function(user_name){
          appendUserSearchHTML(user_name);
        });
      }
      else {
        appendErrMsgToHTML("一致するユーザーが存在しません");
      };
    })
    .fail(function(){
      alert('ユーザー検索に失敗しました');
    })
  });
});
