function csvToArray(csv, delimiter = ",", omitFirstRow = false) {
    console.log(csv.indexOf('\n'));
    return csv.slice(omitFirstRow ? csv.indexOf('\n')+1 : 0)
              .split("\n")
              .map((element) => element.split(delimiter));
  }
  
//   let csv1 = "a,b\nc,d";
//   let csv2 = "a;b\nc;d";
//   let csv3 = "head1,head2\na,b\nc,d";
  
//   let result1 = csvToArray(csv1);
//   let result2 = csvToArray(csv2);
//   let result3 = csvToArray(csv3);
  
//   console.log(result1);
//   console.log(result2);
//   console.log(result3);

const fs=require('fs')

// var output1 = fs.readFileSync('data_partiel.csv')
var data = fs.readFileSync('data_partiel.csv')
    .toString() // convert Buffer to string
    .split('\n') // split string to lines
    .map(e => e.trim()) // remove white spaces for each line
    .map(e => e.split(';').map(e => e.trim())); // split each line to array
// let result1 = csvToArray(output1);
var data_sortie=[]
data.slice(1).forEach(function (item, index) {
    data_sortie.push({name:item[0],mass:parseFloat(item[1]),orbital_period:parseFloat(item[2])})
  });
console.log(data_sortie)