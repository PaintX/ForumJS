var sqlite3 = require('sqlite3');
var debug = require('debug');
var schemas = require('./schemas/schema.json');
var db = undefined;


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

function getModel(table)
{
    let model = {};
    for ( let champ in schemas)
    {
        console.log(champ);
        if ( champ == "phpbb_" + table)
        {
            model = Object.assign({} , schemas[champ].COLUMNS );
        }
    }

    for ( let champ in model)
    {
        model[champ] = undefined;
    }

    return model;
}

module.exports.init = init;
module.exports.getModel = getModel;