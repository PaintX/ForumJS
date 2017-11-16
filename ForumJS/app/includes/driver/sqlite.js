var sqlite3 = require('sqlite3');
var debug = require('debug');
var schemas = require('./schemas/schema.json');
var db = undefined;
var table_prefix = "phpbb_";

//-- http://ftp.phpbb-fr.com/cdd/phpbb3/_screens/doc_table/?table=phpbb_acl_options
function _createTable() 
{
    debug("Check and create table");

    for ( let table in schemas)
    {
        let query = "CREATE TABLE IF NOT EXISTS ";
        query += table +" ( ";
        for ( let champ in schemas[table].COLUMNS)
        {
            query += champ ;
            schemas[table].COLUMNS[champ].map((val,idx) => {
                switch ( idx )
                {
                    case ( 0 ):
                    {
                        if ( val.startsWith("UINT") || val.startsWith("TINT") || val.startsWith("BOOL") ||
                        val.startsWith("USINT") || val.startsWith("ULINT") )
                        {
                            query += " INTEGER ";
                        }
                        else
                        {
                            query += " TEXT ";
                        }
                        break;
                    }
                    case ( 1 ):
                    {
                        if ( (val != 'null') && (val != null))
                        {
                        query += " DEFAULT '";
                        query += val + "' ";                            
                        }

                        break
                    }
                }
            });
            query += "," ;
        }

        if ( schemas[table].PRIMARY_KEY != undefined)
        {
            query+= " PRIMARY KEY ( " + schemas[table].PRIMARY_KEY + " )";
            query += "," ;
        }

        query = query.substring(0,query.length-1);
        query += " )";

        db.run(query);
    }
    
}


function init()
{
    db = new sqlite3.Database('dbForumJS.db',_createTable);
}

function set(table , data , fn)
{
    let query = "INSERT INTO '"  +(table_prefix + table) +"' (";

    for ( let champ in data)
    {
        if ( data[champ] != undefined)
        {
            query += " '" + champ + "' ";
            query +=",";            
        }

    }
    query = query.substring(0,query.length-1);
    query += ")";

    query += " VALUES (";

    for ( let champ in data)
    {
        if ( data[champ] != undefined)
        {
            query += " '" + data[champ] + "' ";
            query +=",";
        }
    }
    query = query.substring(0,query.length-1);
    query += ")";

    db.run(query , function()
    {
        if ( fn != undefined )
            fn();
    });
}

function get(table , fn , query_params)
{
    let query = "SELECT * FROM '"  +(table_prefix + table) +"' ";

    if ( query_params != undefined)
        query += query_params;

    db.all(query , function(err, rows) {
        if ( err )
            console.log("db error "+ err);

        console.log(rows);

    });
}

function getModel(table)
{
    let model = Object.assign({} , schemas[(table_prefix + table)].COLUMNS );

    for ( let champ in model)
    {
        model[champ] = undefined;
    }

    return model;
}

module.exports.init = init;
module.exports.getModel = getModel;
module.exports.set = set;
module.exports.get = get;