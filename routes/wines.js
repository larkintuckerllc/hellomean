var mongo = require('mongodb');
var Server = mongo.Server,
Db = mongo.Db,
BSON = mongo.BSONPure;
var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('winedb', server);
db.open(function(err, db){
});

exports.findAll = function(req, res) {
	db.collection('wines', function(err, collection) {
		if (!err) {
			collection.find().toArray(function(err, items) {
				if (!err) { 
					res.send(items);
				} else {
					res.statusCode = 500;
					res.send('error in accessing query');
				}
			});
		} else {
			res.statusCode = 500;
			res.send('error in accessing collection');
		}
	});
};
 
exports.findById = function(req, res) {
	var _id = req.params._id;
	try {
		var objectID = new BSON.ObjectID(_id);
		db.collection('wines', function(err, collection) {
			if (!err) {
				collection.findOne({_id: objectID}, function(err, item) {
					if (!err) {
						if (item) {
							res.send(item);
						} else {
							res.statusCode = 404;
							res.send('');
						}
					} else {
						res.statusCode = 500;
						res.send('error in accessing query');
					}
				});
			} else {
				res.statusCode = 500;
				res.send('error in accessing collection');
			}
		});
	}
	catch(err) {
		res.statusCode = 400;
		res.send('');
	}
};

exports.delete = function(req, res) {
	var _id = req.params._id;
	try {
		var objectID = new BSON.ObjectID(_id);
		db.collection('wines', function(err, collection) {
			if (!err) {
				collection.remove({_id: objectID}, {safe: true}, function(err, result) {
					if (!err) {
						if (result == 1) {
							res.send({_id: _id});
						} else {
							res.statusCode = 404;
							res.send('');
						}
					} else {
						res.statusCode = 500;
						res.send('error in removing object');
					}
				});
			} else {
				res.statusCode = 500;
				res.send('error in accessing collection');
			}
		});
	} 
	catch(err) {
		res.statusCode = 400;
		res.send('');
	}
}

 
exports.add = function(req, res) {

	// BodyParser already validates valid JSON when content-type is JSON; returns 400 on failure.
 
	if (req.is('application/json')) {
		var wine = {name: req.body.name};

		// TODO Additional json validation needed.

		db.collection('wines', function(err, collection) {
			if (!err) {
				collection.insert(wine, function(err, result) {
					if (!err) {
						res.send(result[0]);
					} else {
						res.statusCode = 500;
						res.send('error in inserting object');
					}
				});
			} else {
				res.statusCode = 500;
				res.send('error in accessing collection');
			}
		});
	} else {
		res.statusCode = 400;
		res.send('');
	}
}
 
exports.update = function(req, res) {
	var _id = req.params._id;
	try {
		var objectID = new BSON.ObjectID(_id);

		// BodyParser already validates valid JSON when content-type is JSON; returns 400 on failure.

		if (req.is('application/json')) {
			var wine = {name: req.body.name};

			// TODO Additional json validation needed.

			db.collection('wines', function(err, collection) {
				if (!err) {
					collection.update({_id: objectID}, wine, {safe: true}, function(err, result) {
						if (!err) {
							if (result == 1) {
								wine._id = _id;
								res.send(wine);
							} else {
								res.statusCode = 404;
								res.send('');
							}
						} else {
							res.statusCode = 500;
							res.send('error in updating object');
						}
					});
				} else {
					res.statusCode = 500;
					res.send('error in accessing collection');
				}
			});
		} else {
			res.statusCode = 400;
			res.send('');
		}
	} 
	catch(err) {
		res.statusCode = 400;
		res.send('');
	}
}
