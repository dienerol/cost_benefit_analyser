$(function () {
  $('[data-toggle="tooltip"]').tooltip()
});

$(document).ready(function() {
    
    $("#addRowColumn").click(function() {
        
        var id = $(".tableRow").last().attr("id");
        var split = id.split("_");
        var rowNumber = split[1];
        var actualRow = +rowNumber + 1;
        var colId = $("#row_0 td").last().attr("id");
        var split = colId.split("_");
        var colCount = +split[1];
        
        var insertRow = 
            '<tr id="row_' + actualRow + '" class="tableRow">' + 
                '<td class="col col_0" id="col_0_row_' + actualRow + '">' + 
                    '<div class="input-group col-lg-12">' +
                        '<input class="form-control" type="text" />' +
                    '</div>' +
                '</td>' +
                '<td class="col col_1" id="col_1_row_' + actualRow + '">' +
                    '<div class="input-group col-lg-6">' +
                        '<select class="form-control evaluation">' +
                        '</select>' +
                    '</div>' +
                '</td>';
        
        for (var i = 2; i < colCount; i++) {
            insertRow += 
                '<td class="col col_' + i + '" id="col_' + i + '_row_' + actualRow + '">' + 
                    '<div class="input-group col-lg-6">' +
                        '<select class="form-control score">' +
                        '</select>' +
                    '</div>' +
                '</td>';
        }
        
        insertRow += '</tr>';
        
        $("tr#addRowRow").before(insertRow);
        addEvaluationOptions();
        addScoreOptions();
    });
});


$(document).ready(function() {
    
    $(document).on("click", "#addCompetitor", function() {
        
        $(".tableRow").each(function() {
            
            // process head row
            if ($(this).attr("id") === "row_0") {
                
                var selector = "#" + $(this).attr("id") + " td";
                var col = $(selector).last();
                var id = $(col).attr("id");
                var split = id.split("_");
                var colNumber = +split[1] + 1;
                var rowNumber = +split[3];
                var addCompetitorDiv = $("#addCompetitorDiv");
                $(col).after(
                    '<td class="col col_' + colNumber + '" id="col_' + colNumber + '_row_' + rowNumber + '">' + 
                    $(addCompetitorDiv).parent("div").parent().html() +
                    '</td>'
                );
                addCompetitorDiv.remove();
                col.html(
                    '<div class="input-group col-lg-6">' +
                        '<input class="form-control competitor" id="competitor_' + colNumber + '" type="text" />' +
                    '</div>'
                );
            }
            
            // process all other rows
            if ($(this).attr("id") !== "row_0") {
                
                var selector = "#" + $(this).attr("id") + " .col";
                var col =  $(selector).last();
                var column = $(col).attr("id");
                var split = column.split("_");
                var colNumber = +split[1] + 1;
                var rowNumber = +split[3];

                $(col).after(
                    '<td class="col col_' + colNumber + '" id="col_' + colNumber + '_row_' + rowNumber + '">' + 
                        '<div class="input-group col-lg-6">' +
                            '<select class="form-control score">' +
                            '</select>' +
                        '</div>' +
                    '</td>'
                );
                addScoreOptions();
            }
        });
        
        // process result row
        var lastColumn = $("tr#resultRow td").last().attr("id");
        var split = lastColumn.split("_");
        var colNumber = +split[1] + 1;

        $("tr#resultRow td").last().after(
            '<td id="col_' + colNumber + '_resultRow" class="col col_' + colNumber + '">' + 
            '</td>'
        );
    });
});


$(document).ready(function() {
    
    $(document).on("click", "#submitMinMaxEvaluation", function() {
        addEvaluationOptions();
    });
});

$(document).ready(function() {
    
    $(document).on("click", "#submitMinMaxScore", function() {
        addScoreOptions();
    });
});

function addScoreOptions()
{
    var minValue = +$("#minScoreValue").val();
    var maxValue = +$("#maxScoreValue").val();
    var html = "";

    for (var i = +minValue; i <= maxValue; i++) {
        html += '<option>' + i + '</option>';
    }

    $(".score").html(html);
}

function addEvaluationOptions()
{
    var minValue = +$("#minEvaluationValue").val();
    var maxValue = +$("#maxEvaluationValue").val();
    var html = "";

    for (var i = +minValue; i <= maxValue; i++) {
        html += '<option>' + i + '</option>';
    }

    $(".evaluation").html(html);
}

$(document).ready(function() {
    
    $(document).on("click", "#calculateTotal", function() {
        
        $("tr#resultRow td").each(function() {
            var id = $(this).attr("id");
            var split = id.split("_");
            var colNumber = +split[1] + 1;
            
            if (1 < colNumber) {
                
                var sum = +0;

                $(".col_" + colNumber + " div select").each(function() {
                    
                    var score = +$(this).val();
                    var id = $(this).closest("td").attr("id");
                    var split = id.split("_");
                    var row = split[3];
                    var evaluation = +$("#col_1_row_" + row + " div select").val();
                    sum += score * evaluation;
                });

                $("#col_" + colNumber + "_resultRow").html(
                    '<h3>' + sum + '</h3>'
                );
            }
        });
    });
});