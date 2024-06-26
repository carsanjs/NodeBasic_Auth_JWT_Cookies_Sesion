import $ from 'jquery'

$(() => {
  $('#LoginForm').on('submit', e => {
    e.preventDefault()
    const username = $('#username').val()
    const password = $('#password').val()
    console.log('username ->', username + ' password ->', password)
    $.ajax({
      url: '/login',
      method: 'POST',
      body: {
        username,
        password
      }
    }).done(body => {
      if (body.status === '200') {
        window.location.href = '/protected'
        console.log(body)
      }
    }).fail(error => {
      $('#error').text(error.message)
      console.error(error)
    })
  })
})
