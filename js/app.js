// Create an array with dummy data
var dataList = [
    [0, "Arsenal FC", "Football Club", false, false, null],
    [1, "Liverpool FC", "", "", false, null],
    [2, "Manchester United FC", "Football Club", true, true, null],
    [3, "Manchester United FC", "Football Club", true, true, null],
    [4, "Manchester United FC", "Football Club", true, true, null],
    [5, "Arsenal FC", "Football Club", false, false, null],
    [6, "Liverpool FC", "Football Club", true, false, null],
    [7, "Manchester United FC", "Football Club", true, true, null],
    [8, "Manchester United FC", "Football Club", true, true, null],
    [9, "Manchester United FC", "Football Club", true, true, null],
    [10, "Arsenal FC", "Football Club", false, false, null],
    [11, "Liverpool FC", "Football Club", true, false, null],
    [12, "Manchester United FC", "Football Club", true, true, null],
    [13, "Manchester United FC", "Football Club", true, true, null],
    [14, "Manchester United FC", "Football Club", true, true, null],
    [15, "Arsenal FC", "Football Club", false, false, null],
    [16, "Liverpool FC", "Football Club", true, false, null],
    [17, "Manchester United FC", "Football Club", true, true, null],
    [18, "Manchester United FC", "Football Club", true, true, null],
    [19, "Manchester United FC", "Football Club", true, true, null],
    [20, "Manchester United FC", "Football Club", true, true, null]
]

// init DataTable and add remove/edit links
$(document).ready(function(){
    
    var settings = {
        info: false,
        data: dataList,
        columns: [ 
            null,
            { 
                render: function (data) {
                    return '<a class="edit" href="javascript:void(0)">'+data+'</a>';
                }
            },
            null,
            null,
            null,
            {className: "action", "orderable": false, defaultContent: '<a class="edit" href="javascript:void(0);">edit</a><a href="javascript:void(0);" class="delete">remove</a>'}
        ]
    }

    var table = $('#datatable').DataTable(settings);

});