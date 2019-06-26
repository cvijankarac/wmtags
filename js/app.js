// Create an array with dummy data
var dataList = [
    [0, "Arsenal FC", "Football Club", false, false, null],
    [1, "Liverpool FC", "", true, false, null],
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
    [20, "Manchester United FC", "Football Club", true, true, null],
    [21, "Manchester United FC", "Football Club", true, true, null],
    [22, "Arsenal FC", "Football Club", false, false, null],
    [23, "Liverpool FC", "Football Club", true, false, null],
    [24, "Manchester United FC", "Football Club", true, true, null],
    [25, "Manchester United FC", "Football Club", true, true, null],
    [26, "Manchester United FC", "Football Club", true, true, null],
    [27, "Arsenal FC", "Football Club", false, false, null],
    [28, "Liverpool FC", "Football Club", true, false, null],
    [29, "Manchester United FC", "Football Club", true, true, null],
    [30, "Manchester United FC", "Football Club", true, true, null],
    [31, "Manchester United FC", "Football Club", true, true, null],
    [32, "Arsenal FC", "Football Club", false, false, null],
    [33, "Liverpool FC", "Football Club", true, false, null],
    [34, "Manchester United FC", "Football Club", true, true, null],
    [35, "Manchester United FC", "Football Club", true, true, null],
    [36, "Manchester United FC", "Football Club", true, true, null],
    [37, "Arsenal FC", "Football Club", false, false, null],
    [38, "Liverpool FC", "Football Club", true, false, null],
    [39, "Manchester United FC", "Football Club", true, true, null]
]

// init DataTable and add remove/edit links
$(document).ready(function(){
    
    var settings = {
        info: false,
        stateSave: true,
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
                    data ? data = '<span class"icon-check">ima</span>' : data = ''
                    return data
                }
            },
            {
                render: function (data) {
                    data ? data = '<span class"icon-check">ima</span>' : data = ''
                    return data
                }
            },
            {className: "action", "orderable": false, defaultContent: '<a class="edit" href="javascript:void(0);">edit</a><a href="javascript:void(0);" class="delete">remove</a>'}
        ],
        pagingType: 'full_numbers',
        language: {
            paginate: {
                first:    '«',
                previous: '‹',
                next:     '›',
                last:     '»'
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
        var input = $('<input type="text" />').appendTo($(column.footer()).empty());
        $('input', this.footer()).on('keyup change', function() {
            if (column.search() !== this.value) {
                column.search(this.value).draw();
            }
        });
    });

    // Remove single row action
    $('#datatable').on( 'click', 'a.delete', function() {
        table.row($(this).parents('tr')).remove().draw();
    });

    // Update single row action
    $('#datatable').on( 'click', 'a.edit', function() {
        
        arrItem = dataList[table.row($(this).parents('tr')).data()[0]]

        $(".modal-update .form-control").each(function() {

            var dataType = $(this).attr("data-type");
            var dataId = $(this).attr("data-id");

            dataType == "checkbox" ? $(this).prop("checked", arrItem[dataId]) : $(this).prop("value", arrItem[dataId])
        });
        
        $('.modal-update').modal('show');

        $('.modal-update').on('keyup change', '.form-control', function(){
            var dataId = $(this).attr("data-id");
            var dataType = $(this).attr("data-type");

            dataType == "checkbox" ? arrItem[dataId] = this.checked : arrItem[dataId] = this.value
        });
    });

    // Updaate row and load a new data to the table
    $('.modal-update .modal-footer').on( 'click', '.save', function() {
        $('#datatable').dataTable().fnClearTable();
        $('#datatable').dataTable().fnAddData(dataList);
        $('.modal-update').modal('hide');
    });

    $('#root').on( 'click', '.add', function() {
        $('.modal-add').modal('show');

        $('.modal-add').on('keyup change', '.form-control', function(){
            addToList = [
                dataList.length,
                $('.modal-add #tag-name').val(),
                $('.modal-add #tag-type').val(),
                $('.modal-add #my-feed').is(":checked") ? true : false,
                $('.modal-add #my-favourites').is(":checked") ? true : false,
                null
            ]
        });
    });
    $('.modal-add .modal-footer').on( 'click', '.save-add', function() {
        table.row.add(addToList).draw();
        table.page('last').draw(false);
        dataList.push(addToList);
        $('.modal-add').modal('hide');
    });
});