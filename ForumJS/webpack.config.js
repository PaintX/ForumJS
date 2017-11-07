var webpack = require('webpack'),
    path = require('path');
var fs = require('fs');
    
    
function _GetFilesByExtension (dir , pattern) {
    let results = [];

    var list = fs.readdirSync(dir)
    list.forEach(function (file) {
        file = dir + '/' + file
        var stat = fs.statSync(file)
        if (stat && stat.isDirectory()) results = results.concat(_GetFilesByExtension(file, pattern))
        else
        {
           pattern.map((p)=>{
               if (file.endsWith(p) == true )
                  results.push(file);    
           })

        }
            
    })
    return results
}
    
    let objectList = {};
    let dirList = [];
    let fileList = _GetFilesByExtension(path.join(__dirname, '/app') , ['.js' , '.jsx' , '.hbs']);
    
    fileList.map( (file) => {
       let dir = file.substring(0,file.lastIndexOf('/'));
       objectList[dir] = true;
    });
     
    for ( let key in objectList)
    {
       dirList.push(key);

    }  
    
    dirList.push('node_modules')

module.exports = {
  entry: './app/public/js/app.jsx',
  output: {
    filename: './app/public/min/js/bundle.js'
  },
  devtool: 'source-map',
  
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /styles/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react'],
        retainLines : true,
      }
    },
    { test: /\.hbs/, 
         loader: "handlebars-loader",
      }
    ]
  },
   resolve: {
    extensions: ['.min.js','.js', '.jsx' , '.hbs'],
    modules : dirList,
  },
}