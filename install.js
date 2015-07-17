var fs   = require('fs');
var walk = require('walk');
var pkg  = require('./package.json');

var walker = walk.walk('./'+pkg.folders.src, { followLinks: false, filters: [] }),
    files  = 0,
    refs   = 0,
    name   = process.argv[2];

if (!name) throw 'Must define namespace for app in format `$ node install.js [NAMESPACE]`';

function parseFile(file) {

    fs.readFile(file, 'utf8', function (err,data) {

        var result;

        if (err) return console.log(err);

        refs += data.match(/__NAMESPACE__/g) ? data.match(/__NAMESPACE__/g).length : 0;
        result = data.replace(/__NAMESPACE__/g, name);

        fs.writeFile(file, result, 'utf8', function (err) {
            if (err) return console.log(err);
        });

    });

}

function removeFile(file) {

    fs.unlink(file, function (err) {

        if (err) return console.log(err);
        console.log('Cleaning: deleted file ' + file + '.');

    });

}

walker.on('file', function(root, stat, next) {

    parseFile(root + '/' + stat.name);
    files++;
    next();

});

walker.on('end', function() {

    console.log('all done -- ' + refs + ' namespace references updated to "' + name + '" in ' + files + ' files');
    removeFile('./install.js');
});
