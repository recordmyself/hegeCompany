import $ from 'jquery'
export function upLoadImage() {
  $(function () {
    bindAvatar();
  });
  function bindAvatar() {
    if (window.URL.createObjectURL) {
      bindAvatar3();
    } else if (window.FileReader) {
      bindAvatar2();
    } else {
      bindAvatar1();
    }
  };
  /*Ajax上传至后台并返回图片的url,用于注册*/
  function bindAvatar1() {
    $("#avatarSlect")
      .change(function () {
        var csrf = $("input[name='csrfmiddlewaretoken']").val();
        var formData = new FormData();
        formData.append("csrfmiddlewaretoken", csrf);
        formData.append('avatar', $("#avatarSlect")[0].files[0]);/*获取上传的图片对象*/
        $.ajax({
          url: '/upload_avatar/',
          type: 'POST',
          data: formData,
          contentType: false,
          processData: false,
          success: function (args) {
            console.log(args);/*服务器端的图片地址*/
            $("#avatarPreview").attr('src', '/' + args);/*预览图片*/
            $("#avatar").val('/' + args);/*将服务端的图片url赋值给form表单的隐藏input标签*/
          }
        })
      })
  };
  /*window.FileReader本地预览，用于上传多张图片*/
  function bindAvatar2() {
    $("#avatarSlect")
      .change(function () {
        var obj = $("#avatarSlect")[0].files[0];
        var fr = new FileReader();
        fr.onload = function () {
          $("#avatarPreview").attr('src', this.result);
          console.log(this.result);
          $("#avatar").val(this.result);
        };
        fr.readAsDataURL(obj);
      })
  };
  /*window.URL.createObjectURL本地预览*/
  function bindAvatar3() {
    console.log(3);
    $("#avatarSlect").change(function () {
      var obj = $("#avatarSlect")[0].files[0];
      var wuc = window.URL.createObjectURL(obj);
      $("#avatarPreview").attr('src', wuc);
      $("#avatar").val(wuc);
    })
  }
}
