import $ from 'jquery'

$(() => {
  $('#registerForm').on('submit', e => {
    e.preventDefault()
    const username = $('#username').val()
    const password = $('#password').val()
    const repeatpassword = $('#repeatpassword').val()

    if (password !== repeatpassword) {
      console.log('password mismatch'); throw new Error('password mismatch')
    }

    $.ajax({
      url: '/register',
      method: 'POST',
      body: { username, password },
      success: (body) => {
        console.log(body)
      },
      error: (error) => {
        console.error(error)
        $('#error-message').text(error.responseJSON.message)
      }
    })
  })
})
