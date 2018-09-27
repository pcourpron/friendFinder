$('#signup').click(function (event) {
    event.preventDefault()

    var name = $('#name').val().trim()
    var email = $('#email').val().trim()
    var password = $('#password').val().trim()
    var verify = $('#verify-password').val().trim()

    var loginObject = {
        name: name,
        email: email,
        password: password
    }


    if (verify !== password) {

        alert('Your password do not match. Please try again')

    }
    else if (password.length < 8) {
        alert('Please put in a longer password (at least 8 characters).')
    }
    else {
        $.post('/api/signup', loginObject, function (req, res) {
            if (res === 'success') {
                localStorage.setItem('auth_key', req);
                localStorage.setItem('username', loginObject.email);
                location = 'survey';
            };

        })

    }


})

$('#login').click(function (event) {
    event.preventDefault()

    var email = $('#emailUp').val().trim()
    var password = $('#passwordUp').val().trim()


    var loginObject = {
        email: email,
        password: password
    }
    $.post('/api/login', loginObject, function (req, res) {
        if (res === 'success') {
            localStorage.setItem('auth_key', req[1]);
            localStorage.setItem('username',req[0]);
            localStorage.setItem('email',loginObject.email);
            window.location.href = "https://www.example.com";   
        };

    })

})