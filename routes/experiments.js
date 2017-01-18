import sql from 'mssql';

export function getExperiments(req, res) {
    var statement = 'SELECT Experiments.ExperimentID, UserDefinedID ' +
                    'FROM Experiments LEFT JOIN AncestPlatesInExperiments ' +
                    'ON Experiments.ExperimentID = AncestPlatesInExperiments.ExperimentID ' +
                    'WHERE PlateID IS NOT NULL ';
    var request = new sql.Request();
    request.query(statement, function(err, recordset) {
        if(err) console.log(err);
        console.log(recordset);
        // console.log(typeof recordset[0].UserDefinedID);
        res.send({ recordset });
    });
}
