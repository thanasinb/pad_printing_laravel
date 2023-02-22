$(document).ready(function(){
    $("#datetimepicker8").children().prop('disabled', function(i, v) { return !v; });

    $('#dateRangeCheckbox').click(function () {
        $("#datetimepicker8").children().prop('disabled', function(i, v) { return !v; });
        $("#radio_shif_morning").prop('disabled', function(i, v) { return !v; });
        $("#radio_shif_afternoon").prop('disabled', function(i, v) { return !v; });
        $("#radio_shif_night").prop('disabled', function(i, v) { return !v; });
        // alert($('#datetimepicker7 input').val());
    });
    
    $('#button_export').click(function (){
    });

    $('input[name="radio_shif"]').click(function (){
        $('#button_list').prop('disabled', false);
    });

    $('#button_list').click(function (){
        var shif_start, shif_end;
        var date_from = $('#datetimepicker7 input').val().split('-');
        var date_to   = $('#datetimepicker8 input').val().split('-');
        var shif = $('input[name="radio_shif"]:checked').val();
        var shif_number, time_start, time_close;

        if ($('#dateRangeCheckbox').is(":checked")) {
            shif_start = date_from[2] + '-' + date_from[1] + '-' + date_from[0];
            shif_end   = date_to[2]   + '-' + date_to[1]   + '-' + date_to[0];
            time_start = '07:00:00';
            time_close = '07:00:00';
            shif_number = 2;
        }else {
            if (shif == 'morning_3'){
                shif_start = date_from[2] + '-' + date_from[1] + '-' + date_from[0];
                shif_end   = date_from[2] + '-' + date_from[1] + '-' + date_from[0];
                time_start = '07:00:00';
                time_close = '15:00:00';
                shif_number = 3;
            }else if (shif == 'afternoon_3'){
                shif_start = date_from[2] + '-' + date_from[1] + '-' + date_from[0];
                shif_end   = date_from[2] + '-' + date_from[1] + '-' + date_from[0];
                time_start = '15:00:00';
                time_close = '23:00:00';
                shif_number = 3;
            }else if (shif == 'night_3'){
                var tomorrow = new Date();
                tomorrow.setFullYear(parseInt(date_from[2]), parseInt(date_from[1])-1, parseInt(date_from[0]));
                tomorrow.setDate(tomorrow.getDate()+1);
                shif_start = date_from[2] + '-' + date_from[1] + '-' + date_from[0];
                shif_end   = tomorrow.getFullYear() + '-' + ('0' + (tomorrow.getMonth()+1)).slice(-2) + '-' + ('0' + tomorrow.getDate()).slice(-2);
                time_start = '23:00:00';
                time_close = '07:00:00';
                shif_number = 3;
            }else if (shif == 'today_3'){
                var tomorrow = new Date();
                tomorrow.setFullYear(parseInt(date_from[2]), parseInt(date_from[1])-1, parseInt(date_from[0]));
                tomorrow.setDate(tomorrow.getDate()+1);
                shif_start = date_from[2] + '-' + date_from[1] + '-' + date_from[0];
                shif_end   = tomorrow.getFullYear() + '-' + ('0' + (tomorrow.getMonth()+1)).slice(-2) + '-' + ('0' + tomorrow.getDate()).slice(-2);
                time_start = '07:00:00';
                time_close = '07:00:00';
                shif_number = 3;
            }else if (shif == 'day_2'){
                shif_start = date_from[2] + '-' + date_from[1] + '-' + date_from[0];
                shif_end   = date_from[2] + '-' + date_from[1] + '-' + date_from[0];
                time_start = '07:00:00';
                time_close = '19:00:00';
                // var time_ot_close    = '15:45:00';
                // var time_ot_close    = '19:00:00';
                shif_number = 2;
            }else if (shif == 'night_2'){
                var tomorrow = new Date();
                tomorrow.setFullYear(parseInt(date_from[2]), parseInt(date_from[1])-1, parseInt(date_from[0]));
                tomorrow.setDate(tomorrow.getDate()+1);
                shif_start = date_from[2] + '-' + date_from[1] + '-' + date_from[0];
                shif_end   = tomorrow.getFullYear() + '-' + ('0' + (tomorrow.getMonth()+1)).slice(-2) + '-' + ('0' + tomorrow.getDate()).slice(-2);
                time_start = '19:00:00';
                time_close = '07:00:00';
                // var time_ot_start    = '19:00:00';
                // var time_ot_close    = '23:00:00';
                shif_number = 2;
            }else if (shif == 'today_2'){
                var tomorrow = new Date();
                tomorrow.setFullYear(parseInt(date_from[2]), parseInt(date_from[1])-1, parseInt(date_from[0]));
                tomorrow.setDate(tomorrow.getDate()+1);
                shif_start = date_from[2] + '-' + date_from[1] + '-' + date_from[0];
                shif_end   = tomorrow.getFullYear() + '-' + ('0' + (tomorrow.getMonth()+1)).slice(-2) + '-' + ('0' + tomorrow.getDate()).slice(-2);
                time_start = '07:00:00';
                time_close = '07:00:00';
                // var time_ot_start    = '15:45:00';
                // var time_ot_close    = '23:00:00';
                shif_number = 2;
            }
        }

        //var url="https://192.168.40.21/majorette_pp/";
         var url="https://bunnam.com/projects/dalila/";


        if (shif_number==3){
            window.open(url + "pp-export-action-3.php?shif_start=" + shif_start + "&shif_end=" + shif_end + "&shif_number=" + shif_number, "_self");
        }else if(shif_number==2){
            window.open(url + "pp-export-action-2-new.php?" +
                "shif=" + shif +
                "&shif_start=" + shif_start +
                "&time_start=" + time_start +
                "&shif_end=" + shif_end +
                "&time_close=" + time_close +
                // "&time_ot_start=" + time_ot_start +
                // "&time_ot_close=" + time_ot_close +
                "&shif_number=" + shif_number,
                "_self");
        }

    });
});