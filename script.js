const API_KEY = "6e24f2e0"; // ini adalah API KEY
const tombolCari = document.querySelector('#tombolCari'); // Ini adalah element tombol cari film
const input = document.querySelector('#input'); // ini adalah input text dari user
const movieList = document.querySelector('#movieList'); //ini adalah list movie


// ini adalah function untuk mencari film
function cariFilm(keyword) {
    $('#movieList').html('');
    console.log('mencari film dengan judul : ' + keyword);
    $.ajax({
        url: "http://www.omdbapi.com",
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': API_KEY,
            's': input.value,
        },
        success: function(res) {
            if (res.Response == "True") {
                let movies = res.Search;
                $.each(movies, function(i, data) {
                    $('#movieList').append(
                        `<div class="col-md-3">
                            <div class="card mb-3">
                                <img src="` + data.Poster + `" class="card-img-top" alt="...">
                                    <div class="card-body">
                                        <h5 class="card-title">` + data.Title + `</h5>
                                        <h6 class="card-subtitle mb-2 text-muted">` + data.Year + `</h6>
                                        <a href="javascript:void(0)" class="card-link tombolDetail" data-toggle="modal" data-target="#detailModal" data-id="` + data.imdbID + `">
                                            See Detail
                                        </a>
                                    </div>
                            </div>
                        </div>`
                    )
                })
                input.value = '';

            } else {
                $('#movieList').html(`
                <div class="col">
                    <h4 class="text-center">
                        ` + res.Error + `
                    </h4>
                </div>
                `);
            }
        }
    })
}

// Ini adalah function mencari detail film
$('#movieList').on('click', '.tombolDetail', function() {
    $.ajax({
        url: "http://omdbapi.com/",
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': API_KEY,
            'i': $(this).data('id'),
        },
        success: function(result) {
            if (result.Response == "True") {

            }
            $('#modal-label').html(result.Title);
            $('.modal-body').html(`
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-5">
                        <img src="` + result.Poster + `" class="img-fluid" alt="Poster"></img>
                    </div>
                    
                    <div class="col-md-7">
                        <ul class="list-group">
                            <li class="list-group-item"> Tahun: ` + result.Year + `</li>
                            <li class="list-group-item"> Rating: ` + result.imdbRating + `</li>
                            <li class="list-group-item"> Durasi: ` + result.Runtime + `</li>
                            <li class="list-group-item"> Sutradara: ` + result.Director + `</li>
                            <li class="list-group-item"> Negara: ` + result.Country + `</li>
                            <li class="list-group-item"> Sutradara: ` + result.Director + `</li>
                            <li class="list-group-item"> Kategori: ` + result.Genre + `</li>
                        </ul>
                    </div>
                </div>
            </div>
            `);
        }
    });
})

// apabila tombol di klik maka akan menjalankan function cariFilm()
tombolCari.addEventListener('click', function() {
    // alert('value = ' + input.value);
    cariFilm(input.value);
})

// apabila ditekan enter maka akan menjalankan function cariFilm()
input.addEventListener('keyup', function(e) {
    if (e.which === 13) {
        // alert('value = ' + input.value);
        cariFilm(input.value);
    }
})