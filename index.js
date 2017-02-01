import fs from 'fs';
var path = require('path');

var bodyParser = require('body-parser');
var express = require('express');
var app = express();

import { getExperiments } from './routes/experiments';
import { getPlates } from './routes/plates';
import { getCultures } from './routes/cultures';

var sql = require("mssql");
var config = require('./config/local.json');

sql.connect(config).then(function() {
    console.log('Connected to Database...');
}).catch(function(err) {
    console.log(err);
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

var compress = require('compression');
var layouts = require('express-ejs-layouts');

app.set('layout');
app.set('view engine', 'ejs');
app.set('view options', {layout: 'layout'});
app.set('views', path.join(process.cwd(), '/server/views'));

app.use(compress());
app.use(layouts);
app.use('/client', express.static(path.join(process.cwd(), '/client')));

app.use(express.static('client'));

app.disable('x-powered-by');

var env = {
  production: process.env.NODE_ENV === 'production'
};

if (env.production) {
  Object.assign(env, {
    assets: JSON.parse(fs.readFileSync(path.join(process.cwd(), 'assets.json')))
  });
}


app.get('/', function(req, res) {
  res.render('index', {
    env: env
  });
});

function getDescendants(AncCultID, cultArray, _callback) {
    if(cultArray.length < 1) {
        cultArray.push(AncCultID);
    }
    var request = new sql.Request();
    request.input('AncCultID', sql.Int, AncCultID)
      .query('SELECT ChldCultureID FROM Propagation WHERE ParentCultureID = @AncCultID').then(function(recordset) {
          if(recordset.length > 0) {
              cultArray.push(recordset[0].ChldCultureID);
              getDescendants(recordset[0].ChldCultureID, cultArray, _callback);
          } else {
              _callback(cultArray);
          }
      }).catch(function(err) {console.log(err)});
}

function getElementsPromiseAll(cultArray, _callback) {
    var results = [];
    var cultPromises = cultArray.map(queryRecordSetByCultureId);
    Promise.all(cultPromises).then(function(recordsets) {
        for(var i = 0; i < recordsets.length; i++) {
            results.push(recordsets[i][0]);
        }
        _callback(results);
    }).catch(function(err) {console.log(err)});
}

//querys the recordset, but names OD as y and TimeStamp as x
function queryRecordSetByCultureId(cultureId) {
    var request = new sql.Request();
    var statement = "IF((SELECT Status_mature FROM CulturesHistory WHERE CultureID = @CultID AND Iteration = 2) = 'True') " +
                    "SELECT CulturesHistory.CultureID, TimeStamp, OD, Status_mature, FreezerCommitted, GenerationFromTopAncestor, TubeBarCode, LabelNum " +
                    "FROM CulturesHistory LEFT JOIN FrozenStocks  " +
                    "ON CulturesHistory.CultureID = FrozenStocks.CultureID " +
                    "WHERE CulturesHistory.CultureID = @CultID AND Iteration=2 " +
                    "ORDER BY CulturesHistory.CultureID " +

                    "ELSE SELECT CulturesHistory.CultureID, TimeStamp, OD, Status_mature, FreezerCommitted, GenerationFromTopAncestor, TubeBarCode, LabelNum " +
                    "FROM CulturesHistory LEFT JOIN FrozenStocks " +
                    "ON CulturesHistory.CultureID = FrozenStocks.CultureID " +
                    "WHERE CulturesHistory.CultureID = @CultID AND Iteration=1 " +
                    "ORDER BY CulturesHistory.CultureID ";

    return request.input('CultID', sql.Int, cultureId).query(statement)
}


app.get('/ancestorculture/:CultID', function (req, res) {

  // var arr = [53500401, 53600401, 53700401, 53800401, 53900401, 54200401];
  // var arr = multArray(arr, 40);
  console.log(req.params.CultID)
  //console.time('Descendants');
  getDescendants(parseInt(req.params.CultID), [], function(result) {
      getElementsPromiseAll(result, function(result) {
          res.json(result);
          //console.log(result);
        //  console.timeEnd('Descendants');
      });
      //console.log(result);
  });

});



app.get('/experiments', getExperiments);

app.get('/plates/:ExpID', getPlates);

app.get('/cultures/:PlateID', getCultures);

var port = Number(process.env.PORT || 3001);
app.listen(port, function () {
  console.log('server running at localhost:3001, go refresh and see magic');
});

if (env.production === false) {
  var webpack = require('webpack');
  var WebpackDevServer = require('webpack-dev-server');

  var webpackDevConfig = require('./webpack.config.development');

  new WebpackDevServer(webpack(webpackDevConfig), {
    publicPath: '/client/',
    contentBase: './client/',
    inline: true,
    hot: true,
    stats: false,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:3001',
      'Access-Control-Allow-Headers': 'X-Requested-With'
    }
  }).listen(3000, 'localhost', function (err) {
    if (err) {
      console.log(err);
    }

    console.log('webpack dev server listening on localhost:3000');
  });
}
