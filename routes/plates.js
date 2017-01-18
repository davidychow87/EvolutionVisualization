import sql from 'mssql';


//returns an array of PlateID's given an ExperimentID
export function getPlates(req, res) {
  var statement = 'SELECT PlateID FROM AncestPlatesInExperiments WHERE ExperimentID = ' + req.params.ExpID;
  var request = new sql.Request();
  request.query(statement, function (err, recordset) {
      if (err) console.log(err)
      res.send(recordset);
  });
}
