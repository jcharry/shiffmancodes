var videos;


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

  // Make toggle button
  var p5button = createButton('p5');
  var proc = createButton('Processing');
  var noc = createButton('Nature of Code');
  
  // add buttons to page title and float them right
  var pageTitle = select('#pageTitle');
  pageTitle.child(p5button);
  pageTitle.child(proc);
  pageTitle.child(noc);


  p5button.mousePressed(toggleVisibleVideos);
  proc.mousePressed(toggleVisibleVideos);
  noc.mousePressed(toggleVisibleVideos);

  function toggleVisibleVideos() {
    var p5Div = document.getElementById('p5section');
    var procDiv = document.getElementyById('processing');
    var nocDiv = document.getElementById('natureofcode')
    
    switch (this.html()) {
      case 'p5':
        console.log(this.html());
        p5Div.style.display = 'inline';
        break;
      case 'Processing':
        console.log(this.html());
        p5Div.style.display = 'none';
        break;
      case 'Nature of Code':
        p5Div.style.display = 'none';
        p5Div.hide();
        break;
    }
  }


  function compare(a, b) {//sort the cleaned up titles
    if (a.cleanTitle > b.cleanTitle) {
      return 1;
    } else if (b.cleanTitle > a.cleanTitle) {
      return -1;
    } else {
      return 0;
    }
  }



  function gotData(data) {
    videos = data;
    for (var i = 0; i < data.length; i++) {
      var title = data[i].title.split("");
      if (title[3] === ' ') {
        title.splice(2, 0, '0');
      }
      var joinedTitle = title.join();
      data[i].cleanTitle = joinedTitle.replace(/\,/g, '');
    }

    data.sort(compare);
    var sortedObjArr = [];

    // get list of all videos
    // get all category divs
    // loop through all divs, assign videos with matching categories
    var allDivs = selectAll('.category');

    for (var j = 0; j < allDivs.length; j++) {
      // for each div, loop thorugh all videos, only add ones that match the category
      var header = allDivs[j].elt.children[0].innerHTML; // NOTE: Must get element out of div

      for (var i = 0; i < data.length; i++) {
        if (header.toLowerCase() === data[i].category.toLowerCase()) {

          //console.log("raw embed data " + data[i].embed);
          var d = createDiv('');
          allDivs[j].child(d);

          var embed = createDiv(data[i].embed);
          embed.style('width', '360px');
          embed.style('height', '202px');

          // allDivs[j].child(embed);
          d.child(embed);
          // console.log(data[i].descr);

          //trucate paragraph
          var len = 100;
          var trunc = data[i].descr;
          var description = createP(trunc);
          d.child(description);

          if (trunc.length > len) {
            /* Truncate the content of the P, then go back to the end of the
                previous word to ensure that we don't truncate in the middle of
                a word */
            trunc = trunc.substring(0, len);
            trunc = trunc.replace(/\w+$/, '');

            description.html(trunc + '...');
          }

          d.style('display', 'inline-block');
        }
      }
    }

    //console.log("hi, testing github")

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