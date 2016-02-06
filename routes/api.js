/**
 * Created by chen on 16/2/1.
 */
var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/listDir/:path?', function(req, res) {

    var fileList = [];

    var path = '/var/';
 //  console.log(req.params.path);
    if(req.params.path)
    path =  path + req.params.path  + '/';
  //  console.log(path);
    fs.readdir(path, function(err, files){
        if(err){
            console.log('list directory error ' + err);
            return;
        }


        var fileCount = files.length;
        files.forEach(function(file){
            fs.stat(path + file, function(err, stat){
                if(err){
                    console.log('fs stat err ' + err);
                    return;
                }


                var temp = {};
                temp.name = file;

                if(stat.isDirectory()){
                    //console.log(path + file + '   ->dir');
                    temp.isDir = 'true';
                }else{
                   // console.log(path + file + '   ->file');
                    temp.isDir = 'false';
                }


                fileList.push(temp);
                fileCount--;
                if(fileCount == 0) {
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(fileList));

                }
            });

        });


    });


});

module.exports = router;
