$(function(){ 
  function buildHTML(message){

    image = (message.image) ? `<img src="${message.image}">` : " ";

     var html =
      `<div class="message" data-message-id=${message.id}>
         <div class="message__upper-info">
           <div class="message__upper-info__talker">
             ${message.user_name}
           </div>
           <div class="message__upper-info__date">
             ${message.date}
           </div>
         </div>
         <div class="message__text">
           <p class="message__text__content">
             ${message.content}
           </p>
           ${image}
         </div>
       </div>`
     return html;	 
 }
 $(".new_message").on('submit', function(e){
 e.preventDefault();
 var formData = new FormData(this);
 var url = $(this).attr('action');
 $.ajax({
   url: url,
   type: "POST",
   data: formData,
   dataType: 'json',
   processData: false,
   contentType: false
 })
  .done(function(data){
    var html = buildHTML(data);
    $('.messages').append(html);
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');   
    $('form')[0].reset();
  })
   .fail(function(){
     alert('error');
   });
   return false;
 });
 function reloadMessages () {
   if (window.location.href.match(/\/groups\/\d+\/messages/)){
     //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
     var last_message_id = $('.message:last').data("message-id");
     console.log(last_message_id);
     var group_id = $(".current-group").data("group-id");
     console.log(group_id);
     $.ajax({
       //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
       url: "api/messages",
       //ルーティングで設定した通りhttpメソッドをgetに指定
       type: 'get',
       dataType: 'json',
       //dataオプションでリクエストに値を含める
       data: {messageid: last_message_id}
     })
     .done(function(messages) {
       //追加するHTMLの入れ物を作る
       var insertHTML = '';
       //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
       messages.forEach(function(message){
      
         //メッセージが入ったHTMLを取得
         insertHTML = buildHTML(message);
         //メッセージを追加
         $('.messages').append(insertHTML).animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
       });
     })
     .fail(function() {
      
       console.log('error');
     });
   }
 };
  //$(function(){});の閉じタグの直上(処理の最後)に以下のように追記
  setInterval(reloadMessages, 5000);
});
