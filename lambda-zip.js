// Autor: Jonathan Baraldi

// dependencias
var AWS = require('aws-sdk');
var util = require('util');
var AdmZip = require('adm-zip');
var url = require('url');
var async = require('async');

var s3 = new AWS.S3();

/* ========================== */
exports.handler = function(event, context) {
    // Lendo opcoes do evento.
    console.log("Evento:\n", util.inspect(event, {depth: 5}));
    
    var srcBucket = event.Records[0].s3.bucket.name;
    var srcKey    = event.Records[0].s3.object.key;

    async.waterfall([
    
        function download(callback) {
            
            s3.getObject({Bucket:srcBucket, Key:srcKey}, 
                     
                 function(err, data) {
                     var errors = 0;
                     var total = 0;
                     var successful = 0;
                     var active = 0;
                     
                     if (err) {
                         console.log('erro: ' + err);
                     }
                     else {
                        // Recebendo ZIP
                        console.log('Recebendo ZIP=' + srcKey);
                        
                        // Criando o buffer para poder descompactar
                        var buf = new Buffer(data.Body);

                        for (var i=0, len = data.length, pos = 0; i < len; i++) {                         
                            data[i].copy(buf, pos); 
                            pos += data[i].length; 
                        } 

                        console.log("Iniciando extracao");

                        var zip = new AdmZip(buf);
                        var zipEntries = zip.getEntries();

                        // Quantos arquivos estão sendo extraidos
                        console.log(zipEntries.length)

                        var controle = 1;

                        for (var i = 0; i < zipEntries.length; i++) {
                                
                                var arquivo = zip.readAsText(zipEntries[i]);

                                var dstBucket = srcBucket+"-unzip"; // Bucket de destino
                                var dstKey    = zipEntries[i].entryName; // Objeto de destino

                                console.log(dstKey);
                                
                                // Enviando cada arquivo extraído para o bucket de destino
                                s3.putObject({
                                            Bucket: dstBucket,
                                            Key: dstKey,
                                            Body: arquivo
                                        },
                                        function(err, data) {
                                            if (err) {
                                                console.log(err)
                                            } else {
                                                console.log(data);

                                                if (controle == zipEntries.length) {
                                                    // Final do for, chamando callback para finalizar                                                  
                                                    setTimeout(function(){
                                                        callback(null, 'Todos arquivos enviados com sucesso!');    
                                                    },200);
                                                    
                                                }
                                                controle = controle+1; 
                                            }
                                        });

                        }
                        
                    }
            });

        }], function (err, result) {
            
            if (err) {
                console.error("Erro para finalizar!");
                console.error(err);
                context.done();
            } else {
                console.log(result);
                context.done();
            }

    });

}