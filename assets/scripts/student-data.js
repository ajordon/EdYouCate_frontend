'use strict';

// globalObjects is an object/dictionary, containing keys "user" and "baseUrl"
// "user" contains the user data which our server returns. "baseUrl" is set at document.ready
const globalObjects = require('./global-objects');


const showStudentData = function() {
  // google.charts.setOnLoadCallback(drawChart);
  //
  //   function drawChart() {
  //
  //     let data = new google.visualization.DataTable();
  //     data.addColumn('string', poll.options[0].response);
  //     data.addColumn('number', poll.options[1].response);
  //     data.addRows([
  //                   arr0,
  //                   arr1
  //                 ]);
  //     let options = {
  //       'title': poll.question,
  //       'width':700,
  //       'height':600,
  //       'backgroundColor':'#1D9ABD'
  //     };
  //     // var chart = new google.visualization.PieChart(document.getElementById('piechart'));
  //     chart.draw(data, options);
  //   }
    google.charts.setOnLoadCallback(drawChart);

    console.log("Im in the studentData function!");

    function drawChart() {

      console.log("Im in the drawChart function!");
      let data = new google.visualization.DataTable();
      data.addColumn('Score', 'Grade');
      data.addColumn(globalObjects.data.currStudent.name, 68);
      data.addColumn('Classroom Average', 89);

      let options = {
        'title': 'Student Grade',
        'width':400,
        'height':600,
        'backgroundColor':'#1D9ABD',
      };
      var chart = new google.charts.Bar(document.getElementById('student-grade-barchart'));
      chart.draw(data, google.charts.Bar.convertOptions(options));
    }

};

const showAssignmentData = function() {

};


module.exports = {
  showStudentData,
  showAssignmentData,
};
