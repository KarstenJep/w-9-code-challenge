console.log('client.js sourced');

$( document ).ready( onReady );

let newJoke = {
    whoseJoke: '',
    jokeQuestion: '',
    punchLine: '',
}

// creating click event to trigger adding of new inputs, 
// as well as trigger display of jokes already stored on server
function onReady() {
    console.log('DOM ready');
    $('#addJokeButton').on('click', function (event) {
        console.log('clicked add joke button');
        postJoke();
    })
    getJoke();
}

// postJoke will take new inputs send to server side via POST,
// then clears new inputs
function postJoke() {
    newJoke.whoseJoke = $('#whoseJokeIn').val(),
    newJoke.jokeQuestion = $('#questionIn').val(),
    newJoke.punchLine = $('#punchlineIn').val(),
    console.log('in postJoke', newJoke);

    $.ajax({
        method: 'POST',
        url: '/joke',
        data: newJoke,
    })
        .then(function (response) {
          console.log('added joke');
          getJoke();
        })
        .catch( function (error) {
          console.log('error from server', error);
          alert('sorry, could not get calc. Try again later.');
        })
        $('#whoseJokeIn').val('');
        $('#questionIn').val('');
        $('#punchlineIn').val('');
}

// getJoke requests from server the array of all stored jokes
// then sends to render function
function getJoke() {
    $.ajax({
      method: 'GET',
      url: '/joke'
    })
      .then(function (response) {
          console.log('response from server', response);
          render(response);
      })
      .catch( function (error) {
          console.log('error from server', error);
          alert('sorry, could not get joke. Try again later.');
      })
      console.log('After making server request...');
  }

  // render clears DOM to prevent duplicates
  // then appends all jokes received from server
function render(jokes) {
    console.log('in render', jokes);
    $('#outputDiv').empty()
    for (let joke of jokes) {
        $('#outputDiv').append(`
        <p><b>Whose Joke: </b>${joke.whoseJoke}</p>
        <p><b>Joke Question: </b>${joke.jokeQuestion}</p>
        <p><b>Punch Line: </b>${joke.punchLine}</p>
        `) 
    }
}