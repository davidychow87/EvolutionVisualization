import sql from 'mssql';

export function getExperiments(req, res) {
    var request = new sql.Request();
    request.query('SELECT ExperimentID, UserDefinedID FROM Experiments', function(err, recordset) {
        if(err) console.log(err);
        console.log(recordset);
        console.log(typeof recordset[0].UserDefinedID);
        res.send({ recordset });
    });
}
