// A2Z F15
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F15
// HERE'S MY COMMENT FOR MY PUSH, yo
// This sheet
// | ----------------|
// | label  | number |
// | ----------------|
// | apple  | 9      |
// | ----------------|
// | pear   | 4      |
// | ----------------|
// | orange | 3      |
// | ----------------|

// Turns into:

// [ { label: apple, number: 9 }, { label: pear, number: 4 }, { label: orange, number: 3 } ]

function setup() {
  // This is the URL for my google sheet
  // The sheet is generated from this form: http://goo.gl/forms/0X67GZJTZJ
  // The sheet must set to File --> Published for the Web
  var url = 'https://docs.google.com/spreadsheets/d/1hFS6zEkE_nrIVhsf4ESZi8UzQ_2cD4gNZGski1YGyPg/pubhtml';

  // Tabletop expects some settings
  var settings = {
    key: url, // The url of the published google sheet
    callback: gotData, // A callback for when the data comes in
    simpleSheet: true // This makes things simpler for just a single worksheet of rows
  }

  // Make the request
  Tabletop.init(settings);

  // The data comes back as an array of objects
  // Each object contains all the data for one row of the sheet
  // See comment above

  var titles = [];
  function gotData(data) {
    for (var i = 0; i< data.length; i++) {
      var title = data[i].title.split("");
      if (title[3] === ' ') {
        title.splice(2,0,'0');
      }
      var joinedTitle = title.join();
      var cleanTitle = joinedTitle.replace(/\,/g,'');
      titles.push(cleanTitle);
    }

    var sortedTitles = titles.sort();
    print(sortedTitles);
    var sortedObjArr = [];
    
    // for (var i = 0; i < data.length; i++) {
    //   if ()
    // }
    
    
    

    // get list of all videos
    // get all category divs
    // loop through all divs, assign videos with matching categories
    var allDivs = selectAll('.category');
    var div = document.getElementById('CSS');

    for (var j = 0; j < allDivs.length; j++) {
      // for each div, loop thorugh all videos, only add ones that match the category
      var header = allDivs[j].elt.children[0].innerHTML;  // NOTE: Must get element out of div

      for (var i = 0; i < data.length; i++) {
        if (header.toLowerCase() === data[i].category.toLowerCase()) {
          
          console.log("raw embed data " + data[i].embed);
          var embed = createDiv(data[i].embed);
          embed.style('width','360px');
          embed.style('height','202px');
          
          allDivs[j].child(embed);
        }
      }
    }

    // create divs within parent div - one for each video

    // Make an HTML list

    // var list = createElement('ol');
    // list.parent('data');
    // for (var i = 0; i < data.length; i++) {
    //   var item = createElement('li', data[i].title + ': ' + data[i].descr + ", url:  " + data[i].url + ", embed link: " + data[i].embed);
    //   item.parent(list);
    // }
  }
}