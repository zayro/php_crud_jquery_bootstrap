function getdata() {

    $.ajax({
            url: 'backend/consultar.php',
            method: "GET",
            dataType: 'json'
        })
        .done(function(response) {

            console.log(response);

            $('#table').bootstrapTable({
                columns: [{
                    field: 'id',
                    title: 'Item ID'
                }, {
                    field: 'nombre',
                    title: 'Item nombre'
                }, {
                    field: 'identificacion',
                    title: 'Item identificacion'
                }],
                data: response
            });

        }).fail(function() {
            alert("error");
        });


}


function refresh() {
    $('#table').bootstrapTable('refresh');
}

function guardar() {
    $.ajax({
            url: 'backend/guardar.php',
            method: "POST",
            data: $("#addform").serialize(), // serializes the form's elements.
        })
        .done(function(response) {

            console.log(response);
            refresh();

        }).fail(function() {
            alert("error");
        });
}

function actualizar() {
    $.ajax({
            url: 'backend/actualizar.php',
            method: "POST",
            data: $("#updateform").serialize(), // serializes the form's elements.
        })
        .done(function(response) {

            console.log(response);
            refresh();

        }).fail(function() {
            alert("error");
        });
}

function eliminar() {
    $.ajax({
            url: 'backend/eliminar.php',
            method: "POST",
            data: { id: getSelectedRow().id },
        })
        .done(function(response) {
            console.log(response);
            refresh();

        }).fail(function() {
            alert("error");
        });
}

var $table = $('#table');

$(function() {
    $table.on('click-row.bs.table', function(e, row, $element) {
        $('.success').removeClass('success');
        $($element).addClass('success');
    });

});

function getSelectedRow() {
    var index = $table.find('tr.success').data('index');
    return $table.bootstrapTable('getData')[index];
}

function getupdate() {
    $("#id").val(getSelectedRow().id);
    $("#nombre").val(getSelectedRow().nombre);
    $("#identificacion").val(getSelectedRow().identificacion);
}