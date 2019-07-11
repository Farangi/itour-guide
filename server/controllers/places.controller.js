var express = require('express');
var router = express.Router();
var placeService = require('services/place.service');

// routes
router.get('/', getAll);
router.get('/placesByKeyword', getPlacesByKeyword);
router.get('/place', getPlace);
router.post('/registerGuide', registerGuide);

module.exports = router;

function getAll(req, res) {
	placeService.getAll(req.query.longitude,req.query.latitude)
        .then(function (places) {
            res.send(places);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getPlacesByKeyword(req, res) {
	placeService.getPlacesByKeyword(req.query.longitude,req.query.latitude,req.query.keyword)
    .then(function (places) {
        res.send(places);
    })
    .catch(function (err) {
        res.status(400).send(err);
    });
}

function registerGuide(req, res) {
    placeService.addGuideToPlace(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getPlace(req, res) {
	placeService.getPlace(req.query.placeId)
        .then(function (place) {
            res.send(place);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}