$(function () {
  $('#link-register').on('click', function () {
    $('.login-box').hide()
    $('.register-box').show()
  })

  $('#link-login').on('click', function () {
    $('.login-box').show()
    $('.register-box').hide()
  })

  const form = layui.form
  const layer = layui.layer
  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须为6~12位,不能有空格'],
    repwd: function (value) {
      const pwd = $('.register-box [name=password]').val()
      if (pwd !== value) return '两次密码不一致'
    }
  })

  $('#form-reg').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      type: 'post',
      url: '/api/reguser',
      data: {
        username: $('#form-reg [name=username]').val(),
        password: $('#form-reg [name=password]').val()
      },
      success(res) {
        if (res.status !== 0) return layer.msg(res.message)
        layer.msg('注册成功,请登录')
        $('#link-login').click()
      },
    })
  })

  $('#form-login').submit(function (e) {
    e.preventDefault()
    $.ajax({
      type: 'post',
      url: '/api/login',
      data: $(this).serialize(),
      success(res) {
        if (res.status !== 0) return layer.msg('登录失败')
        layer.msg('登录成功')
        location.href = '/index.html'
      }
    })
  })
})