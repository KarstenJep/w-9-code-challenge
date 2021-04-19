console.log('client.js sourced');

$( document ).ready( onReady );

let newJoke = {
    whoseJoke: '',
    jokeQuestion: '',
    punchLine: '',
}

function onReady() {
    console.log('DOM ready');
    $('#addJokeButton').on('click', function (event) {
        console.log('clicked add joke button');
        postJoke();
    })
    getJoke();
}

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
}

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

function render(jokes) {
    console.log('in render', jokes);
    $('#outputDiv').empty()
    for (let joke of jokes) {
        $('#outputDiv').append(`
        <p>Whose Joke: ${joke.whoseJoke}</p>
        <p>Joke Question: ${joke.jokeQuestion}</p>
        <p>Punch Line: ${joke.punchLine}</p>
        `) 
    }
}