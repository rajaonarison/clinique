function create(label , types , data){
var myChart = new Chart(label, {
    type: types,
    /*
    Bar
    Line
    Radar
    Pie
    horizontalBar
    scarret
    */
    data: data,
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        tooltips :{
            mode: 'nearest'
        }
    }
})};