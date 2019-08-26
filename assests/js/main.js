
'use strict'

function run() {
    let str="";
    let flag = 2;
    let pass="e5044c899e1bc16ad60dc61d21bfb038";
    const md5 = require('md5');
    $('textarea').keyup(function (event) {
        addCode($(this).val(),event.which);
        $(this).val('');
        console.log(str);
        $('#pen').css({
            fontSize : "0px"
        })
        event.stopPropagation();
    });

    $('textarea').keydown(function (event) {
        if(event.which === 9) event.preventDefault();
        $('#pen').css({
            fontSize : "25px"
        })
        event.stopPropagation();
    })

    function addCode(ch,asch) {
        if(asch === 9) str = str + String.fromCharCode(9);
        else if(asch === 8){
        str = str.slice(0,str.length - 1);
        }
        else if(asch === 46){
            str = str.slice(1);
        }
        else {
            str = str + ch;
        }   
    }



// view the whole code on click of button view code for 3 sec only


$('#viewCode').click(function(event){
    if(flag > 0) showCode();
    else {
        message(`<h3>SORRY ONLY 1 SCREEN TIME IS ALLOWED</h3>
          <span><i class="fa fa-frown-o" aria-hidden="true"></i></span>`);
    }
    event.stopPropagation();
})

function showCode() {
    flag--;
    $('textarea').css({
        color : "black"
    }).val(str);
    //  countdown timer ..
    setTimeout(function(){
        $('textarea').css({
            color : "white"
        }).val('');
        console.log('3 sec timer started');
    },3000);
}
    $('#submit').click(function(event) {

        $('#editor').remove();
        message('<h3>YOUR CODE IS SUBMITTED SUCCESSFULLY  <span id="judge"><i class="fa fa-lock" aria-hidden="true"></i></span></h3>');
        //$('#container').append('<div id = "message"> <h3>YOUR CODE IS SUBMITTED SUCCESSFULLY  <span id="judge"><i class="fa fa-lock" aria-hidden="true"></i></span></h3> </div>');
        
        $('#judge').click(function(event) {
          verification();
            // $('#container').append(`<div id="Solution">
            // <h1 id="code">Solution</h1>
            // <textarea></textarea>
            // </div>`);
            // event.stopPropagation();
            // $('textarea').css({
            // color : "black"
            // }).val(str);
        });
        event.stopPropagation();
    });

    function message(msg) {
        $('#message').css({
            minHeight: '0px',
            boxShadow: '0 0 3px rgba(0,0,0,0.3)'
        }).append(`${msg}`);
    }

    function verification(){
      $('#container').append(`<div>
          <label for="input">Enter PassWord </label>
          <input type="password"> </input>
          <button id="pass"> Submit</button>
        </div>`
      );
      $('#pass').click(function(event){
        let data = $('input').val();
        $('input').val('');
        let digest = md5(data);
        if(digest === pass) show();
        else{
        message(`<h3>INCORRECT PASSWORD TRY AGAIN</h3>
        <span><i class="fa fa-frown-o" aria-hidden="true"></i></span>`);
        }
        event.stopPropagation();
      });
    }
    function show() {
      console.log(str);
      $('#container').append(`<div id="Solution">
      <h1 id="code">Solution</h1>
      <p> ${str} </p>
      </div>`)
    }
}
run();
