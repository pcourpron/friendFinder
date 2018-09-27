if (localStorage.getItem('username') === ''){
    location = '/'
}
else if (localStorage.getItem('email')===''){
    location = '/'

}
$('#submit').click(function(event){
    event.preventDefault()

    var validation 
        // checks to see if all of the sections have been filled out
    function validateForm() {
        validation = true
        $("input").each(function() {
          if ($(this).val() === "") {
            validation = false;
          }
        });

        $("select").each(function() {
          if ($(this).val() === "") {
            validation = false;
          }
        });

      }

      validateForm()
      

    // now the fun stuff

      if (validation){
        var surveyAnswers = {
            name: localStorage.getItem('email'),
            username: localStorage.getItem('username'),
            photo: $("#photo").val(),
            scores: [
              $("#question1").val(),
              $("#question2").val(),
              $("#question3").val(),
              $("#question4").val(),
              $("#question5").val(),
              $("#question6").val(),
              $("#question7").val(),
              $("#question8").val(),
              $("#question9").val(),
              $("#question10").val()
            ]
          }

        $.post('/api/friends', surveyAnswers,function(req,res){
            $('#match-name').text(req[0])
            $('#match-img').attr('src',req[1])
        })
          ;
      }
      

    

    
})