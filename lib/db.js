
var mmm = require("multi-master-merge");
var level = require("level"); // LevelUP + LevelDOWN
var path = require("path");
var mkdirp = require("mkdirp");
var sublevel = require("level-sublevel");
var multistream = require("parallel-multistream");

["torrents", "files"].forEach(function(name) {
	var dbPath = path.join(module.parent.dbPath, name+".db");
	mkdirp.sync(dbPath);
	module.exports[name] = mmm(level(dbPath), { encoding: "json" });
});

module.exports.getSyncStream = function() {
	return multistream([ module.exports.torrents.sync(), module.exports.files.sync() ]);
};