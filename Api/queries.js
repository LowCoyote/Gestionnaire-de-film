let promise = require('bluebird');

let options = {
    // Initialization Options
    promiseLib: promise
};

const pgp = require('pg-promise')(options);
let db = pgp('postgresql://localhost:5432/dawin-project');

module.exports = {
    getAllMovie: getAllMovie,
    getSingleMovie: getSingleMovie,
    createMovie: createMovie,
    updateMovie: updateMovie,
    updateDirector: updateDirector,
    removeMovie: removeMovie
};

function getAllMovie(req, res, next) {
    db.any('select * from movies, director where movies.director_id = director.id')
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved all movies'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function getSingleMovie(req, res, next) {
    let movieID = parseInt(req.params.id);
    db.one('select * from movies where id = $1', movieID)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved one movie'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function createMovie(req, res, next) {
    const {title, release, language, genre, poster, director_id, lastname, firstname, birthday, nationality} = req.body;
    db.none('insert into director(id, lastname, firstname, birthday, nationality) values(${director_id} ,${lastname}, ${firstname}, ${birthday}, ${nationality})'
        , req.body)
        .then(function () {
        db.none('insert into movies(title, release, language, genre, poster, director_id) values(${title}, ${release}, ${language}, ${genre}, ${poster}, ${director_id})',
            req.body)
            .then(function () {
                res.status(200)
                    .json({
                        status: 'success',
                        message: 'Inserted one movie'
                    });
            })
    }).catch(function (err) {
        return next(err);
    });
}

function updateDirector(req, res, next) {
    const {director_id, lastname, firstname, birthday, nationality} = req.body;
    db.none('update director set lastname = ${lastname}, firstname = ${firstname}, birthday = ${birthday}, nationality = ${nationality} where id = ${director_id}'
        , req.body)
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Updated one director'
                });
        }).catch(function (err){
            return next(err)
        });
}

function updateMovie(req, res, next) {
    const {title, release, language, genre, poster, director_id} = req.body;
    db.none('update movies set title = ${title}, release = ${release}, language = ${language}, genre = ${genre}, poster = ${poster} where director_id = ${director_id}',
        req.body)
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Updated one movie'
                });
        }).catch(function (err){
        return next(err)
    });
}

function removeMovie(req, res, next) {
    let movieID = parseInt(req.params.id);
    db.result('delete from movies where director_id = $1', movieID)
        .then(function () {
            db.result('delete from director where id = $1', movieID)
                .then(function (result) {
                    res.status(200)
                        .json({
                            status: 'success',
                            message: `Removed ${result.rowCount} movie`
                        });
                })
        })
        .catch(function (err) {
            return next(err);
        });
}
