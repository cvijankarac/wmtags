// Create an array with dummy data
var dataList = [
    [0, "Arsenal FC", "Football Club", false, false, null],
    [1, "Liverpool FC", "", true, false, null],
    [2, "Manchester United FC", "Football Club", true, true, null],
    [3, "Anadolu Efes SK", "Basketball Club", true, true, null],
    [4, "KK Crvena zvezda", "Basketball Club", true, true, null],
    [5, "Arsenal FC", "Football Club", false, false, null],
    [6, "KK Partizan NIS", "Basketball Club", true, false, null],
    [7, "Manchester City FC", "Football Club", true, true, null],
    [8, "Chelsea FC", "Football Club", true, true, null],
    [9, "Everton", "Football Club", true, true, null],
    [10, "Leicester City", "Football Club", false, false, null],
    [11, "Crystal Palace", "Football Club", true, false, null],
    [12, "Newcastle United", "Football Club", true, true, null],
    [13, "Tottenham Hotspur", "Football Club", true, true, null],
    [14, "Boston Celtics", "Basketball Club", true, true, null],
    [15, "Brooklyn Nets", "Basketball Club", false, false, null],
    [16, "New York Knicks", "Basketball Club", true, false, null],
    [17, "Philadelphia 76ers", "Basketball Club", true, true, null],
    [18, "Toronto Raptors", "Basketball Club", true, true, null],
    [19, "Chicago Bulls", "Basketball Club", true, true, null],
    [20, "Cleveland Cavaliers", "Basketball Club", true, true, null],
    [21, "Detroit Pistons", "Basketball Club", true, true, null],
    [22, "Indiana Pacers", "Basketball Club", false, false, null],
    [23, "Milwaukee Bucks", "Basketball Club", true, false, null],
    [24, "Atlanta Hawks", "Basketball Club", true, true, null],
    [25, "Charlotte Hornets", "Basketball Club", true, true, null],
    [26, "Miami Heat", "Basketball Club", true, true, null],
    [27, "Orlando Magic", "Basketball Club", false, false, null],
    [28, "Washington Wizards", "Basketball Club", true, false, null],
    [29, "Dallas Mavericks", "Basketball Club", true, true, null],
    [30, "Houston Rockets", "Basketball Club", true, true, null],
    [31, "Memphis Grizzlies", "Basketball Club", true, true, null],
    [32, "New Orleans Pelicans", "Basketball Club", false, false, null],
    [33, "San Antonio Spurs", "Basketball Club", true, false, null],
    [34, "Denver Nuggets", "Basketball Club", true, true, null],
    [35, "Minnesota Timberwolves", "Basketball Club", true, true, null],
    [36, "Oklahoma City Thunder", "Basketball Club", true, true, null],
    [37, "Portland Trail Blazers", "Basketball Club", false, false, null],
    [38, "Utah Jazz", "Basketball Club", true, false, null],
    [39, "Golden State Warriors", "Basketball Club", true, true, null],
    [39, "Los Angeles Clippers", "Basketball Club", true, true, null],
    [39, "Los Angeles Lakers", "Basketball Club", true, true, null],
    [39, "Phoenix Suns", "Basketball Club", true, true, null],
    [39, "Sacramento Kings", "Basketball Club", true, true, null],
    [39, "Alaves", "Football Club", true, true, null],
    [39, "Barcelona", "Football Club", true, true, null],
    [39, "Atletico Madrid", "Football Club", true, true, null],
    [39, "Real Madrid", "Football Club", true, true, null],
    [39, "Valencia", "Football Club", true, true, null]

]

// init DataTable and add remove/edit links
$(document).ready(function(){
    
    var settings = {
        info: false,
        //stateSave: true,
        data: dataList,
        columns: [ 
            null,
            { 
                render: function (data) {
                    return '<a class="edit" href="javascript:void(0)">'+data+'</a>';
                }
            },
            null,
            {
                render: function (data) {
                    data ? data = '<span class="icon-checkmark"><span style="display: none;">'+data+'</span></span>' : data = '<span style="display: none;">'+data+'</span>'
                    return data
                }
            },
            {
                render: function (data) {
                    data ? data = '<span class="icon-checkmark"><span style="display: none;">'+data+'</span></span>' : data = '<span style="display: none;">'+data+'</span>'
                    return data
                }
            },
            {className: "action", "orderable": false, defaultContent: '<a class="edit icon-pencil" href="javascript:void(0);"></a><a href="javascript:void(0);" class="delete icon-cross"></a>'}
        ],
        pagingType: 'full_numbers',
        language: {
            paginate: {
                first:    '',
                previous: '',
                next:     '',
                last:     ''
            }
        }
    }

    var table = $('#datatable').DataTable(settings);

    // Add fillers to rows
    table.columns([3, 4]).every(function() {
        var column = this;
        var select = $('<select><option value="">All</option></select>')
            .appendTo($(column.footer()))
            .on('change', function() {
                var val = $.fn.dataTable.util.escapeRegex(
                    $(this).val()
                );
                column.search(val ? '^'+val+'$' : '', true, false).draw();
            });
        column.data().unique().sort().each(function(d) {
            var slectLabel;
            d ? slectLabel = "Yes" : slectLabel = "No"
            if(d !== ""){
                select.append('<option value="'+d+'">'+slectLabel+'</option>')
            }
        });
    });

    // Add search to rows
    table.columns([0, 1, 2]).every(function() {
        var column = this;
        var input = $('<div class="input-box"><input type="text" /></div>').appendTo($(column.footer()).empty());
        $('input', this.footer()).on('keyup change', function() {
            if (column.search() !== this.value) {
                column.search(this.value).draw();
            }
        });
    });

    $("#datatable tfoot tr").prependTo("#datatable thead");

    // Remove single row action
    $('#datatable').on( 'click', 'a.delete', function() {
        table.row($(this).parents('tr')).remove().draw();
    });

    // Update single row action
    $('#datatable').on( 'click', 'a.edit', function() {
        
        arrItem = dataList[table.row($(this).parents('tr')).data()[0]]

        $(".modal-update .value-control").each(function() {
            var dataType = $(this).attr("data-type");
            var dataId = $(this).attr("data-id");
            dataType == "checkbox" ? $(this).prop("checked", arrItem[dataId]) : $(this).prop("value", arrItem[dataId])
        });
        
        $('.modal-update').modal('show');

        $('.modal-update').on('keyup change', '.value-control', function(){
            var dataId = $(this).attr("data-id");
            var dataType = $(this).attr("data-type");

            dataType == "checkbox" ? arrItem[dataId] = this.checked : arrItem[dataId] = this.value
        });
    });


    // Updaate row and load a new data to the table
    $('.modal-update').on( 'click', '.save', function() {
        if(arrItem[1] != '') {
            $('#datatable').dataTable().fnClearTable();
            $('#datatable').dataTable().fnAddData(dataList);
            $('.modal-update').modal('hide');
        }
    });

    $('#root').on( 'click', '.add', function() {
        $('.modal-add').modal('show');

        $('.modal-add').on('keyup change', '.value-control', function(){
            addToList = [
                dataList.length,
                $('.modal-add #tag-name-add').val(),
                $('.modal-add #tag-type-add').val(),
                $('.modal-add #my-feed-add').is(":checked") ? true : false,
                $('.modal-add #my-favourites-add').is(":checked") ? true : false,
                null
            ]
        });
    });
    $('.modal-add').on( 'click', '.save-add', function() {
        if(addToList[1] != '') {
            table.row.add(addToList).draw();
            table.page('last').draw(false);
            dataList.push(addToList);
            $('.modal-add').modal('hide');
        }
    });
});