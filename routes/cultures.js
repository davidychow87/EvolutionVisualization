import sql from 'mssql';


//returns an array of cultureID's given an ExperimentID
export function getCultures(req, res) {
  var statement = 'SELECT CultureID FROM Cultures WHERE WellID IS NOT NULL AND PlateID = ' + req.params.PlateID;
  var request = new sql.Request();
  request.query(statement, function (err, recordset) {
      if (err) console.log(err)
      res.send(recordset);
  });
}
