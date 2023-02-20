<?php
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1export, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>Job overview by Machine</title>
        <link href="css/simple-datatables@latest/dist/style.css" rel="stylesheet" />
        <link href="css/litepicker/dist/css/litepicker.css" rel="stylesheet" />
        <link href="css/styles.css" rel="stylesheet" />
        <link rel="icon" type="image/x-icon" href="assets/img/favicon.png" />
        <script data-search-pseudo-elements defer src="js/font-awesome/5.15.3/js/all.min.js"></script>
        <script src="js/feather-icons/4.28.0/feather.min.js"></script>
        <link rel="stylesheet" href="css/reorder-columns/dragtable.css">
        <link rel="stylesheet" href="css/reorder-columns/bootstrap-table.min.css">
        <script src="js/jquery/jquery.min.js"></script>
        <script src="js/jquery/jquery-ui.min.js"></script>
        <script src="js/reorder-columns/jquery.dragtable.js"></script>
        <script src="js/reorder-columns/bootstrap-table.min.js"></script>
        <script src="js/reorder-columns/bootstrap-table-reorder-columns.js"></script>
<!--        <script src="js/majorette/pp-export.js"></script>-->
        <script src="js/majorette/pp-export-2.js"></script>
        <script type="text/javascript" src="js/datetimepicker4/moment.min.js"></script>
        <script type="text/javascript" src="js/datetimepicker4/tempusdominus-bootstrap-4.min.js"></script>
        <link rel="stylesheet" href="css/datetimepicker4/tempusdominus-bootstrap-4.min.css" />
<!--        <script type="text/javascript" src="//unpkg.com/xlsx/dist/shim.min.js"></script>-->
<!--        <script type="text/javascript" src="//cdn.jsdelivr.net/npm/xlsx/dist/xlsx.full.min.js"></script>-->
<!--        <script type="text/javascript" src="//unpkg.com/blob.js@1.0.1/Blob.js"></script>-->
<!--        <script type="text/javascript" src="//unpkg.com/file-saver@1.3.3/FileSaver.js"></script>-->
<!--        <script type="text/javascript" src="/js/SheetJS/shim.min.js"></script>-->
<!--        <script type="text/javascript" src="/js/SheetJS/xlsx.full.min.js"></script>-->
<!--        <script type="text/javascript" src="/js/SheetJS/Blob.js"></script>-->
<!--        <script type="text/javascript" src="/js/SheetJS/FileSaver.js"></script>-->

        <script type="text/javascript">
            $(function () {
                $('#datetimepicker7').datetimepicker({
                    format: 'DD-MM-YYYY'
                });
                $('#datetimepicker8').datetimepicker({
                    useCurrent: false,
                    format: 'DD-MM-YYYY'
                });
                $("#datetimepicker7").on("change.datetimepicker", function (e) {
                    $('#datetimepicker8').datetimepicker('minDate', e.date);
                });
                $("#datetimepicker8").on("change.datetimepicker", function (e) {
                    $('#datetimepicker7').datetimepicker('maxDate', e.date);
                });
            });
        </script>
    </head>
    <body class="nav-fixed">
    <?php require 'pp-machine-sidenavAccordion.php'; ?>
        <div id="layoutSidenav">
            <?php require 'pp-layoutSidenav_nav.php'; ?>
            <div id="layoutSidenav_content">
                <main>
                    <header class="page-header page-header-dark pb-5">
                        <div class="container-xl px-4">
                            <div class="page-header-content pt-4">
                            </div>
                        </div>
                    </header>
                    <!-- Main page content-->
                    <div class="container-fluid px-4 mt-n10">
                        <!-- Example DataTable for Dashboard Demo-->
                        <div class="card mb-4 w-25">
                            <div class="card-header bg-dark fw-bold text-white">Select Shif</div>
                            <div class="card-body">
                                <form>
                                    <div class="form-check mb-3">
                                        <input class="form-check-input" type="checkbox" value="" id="dateRangeCheckbox">
                                        <label class="form-check-label" for="dateRangeCheckbox">
                                            Select Range
                                        </label>
                                    </div>
                                    From:
                                    <div class="form-group mb-3">
                                        <div class="input-group date col-2" id="datetimepicker7" data-target-input="nearest">
                                            <input type="text" class="form-control datetimepicker-input" data-target="#datetimepicker7"/>
                                            <div class="input-group-append" data-target="#datetimepicker7" data-toggle="datetimepicker">
                                                <div class="input-group-text"><i class="fa fa-calendar"></i></div>
                                            </div>
                                        </div>
                                    </div>
                                    To:
                                    <div class="form-group mb-3">
                                        <div class="input-group date col-2" id="datetimepicker8" data-target-input="nearest">
                                            <input type="text" class="form-control datetimepicker-input" data-target="#datetimepicker8"/>
                                            <div class="input-group-append" data-target="#datetimepicker8" data-toggle="datetimepicker">
                                                <div class="input-group-text"><i class="fa fa-calendar"></i></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" id="radio_shif_today_3" type="radio" name="radio_shif" value="today_3">
                                        <label class="form-check-label" for="radio_shif_today_3" id="label_shif_today_3">All day (3 Shif)</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" id="radio_shif_morning_3" type="radio" name="radio_shif" value="morning_3">
                                        <label class="form-check-label" for="radio_shif_morning_3" id="label_shif_morning_3">07:00-15:00 (Morning)</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" id="radio_shif_afternoon_3" type="radio" name="radio_shif" value="afternoon_3">
                                        <label class="form-check-label" for="radio_shif_afternoon_3" id="label_shif_afternoon_3">15:00-23:00 (Afternoon)</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" id="radio_shif_night_3" type="radio" name="radio_shif" value="night_3">
                                        <label class="form-check-label" for="radio_shif_night_3" id="label_shif_night_3">23:00-07:00 (Night)</label>
                                    </div>
                                    <br>
                                    <div class="form-check">
                                        <input class="form-check-input" id="radio_shif_today_2" type="radio" name="radio_shif" value="today_2">
                                        <label class="form-check-label" for="radio_shif_today_2" id="label_shif_today_2">All day (2 Shif)</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" id="radio_shif_day_2" type="radio" name="radio_shif" value="day_2">
                                        <label class="form-check-label" for="radio_shif_day_2" id="label_shif_day_2">07:00-19:00 (Day)</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" id="radio_shif_night_2" type="radio" name="radio_shif" value="night_2">
                                        <label class="form-check-label" for="radio_shif_night_2" id="label_shif_night_2">19:00-07:00 (Night)</label>
                                    </div>
                                    <br>
                                </form>
                                <input class="btn btn-primary" type="submit" value="Lists" id="button_list">
                            </div>
                        </div>
                        <div class="card mb-4 w-100" id="card_table_export" hidden>
                            <div class="card-header bg-dark fw-bold text-white">Export Data</div>
                            <div class="card-body" id="div_table_export">
<!--                                <table id="export_me">-->
<!--                                    <tr><td>Hello</td></tr>-->
<!--                                </table>-->
<!--                                <table class="table table-striped table-sm">-->
<!--                                    <tbody>-->
<!--                                    <tr class="fw-bold text-center">-->
<!--                                        <th>Work Center</th>-->
<!--                                        <th>Line</th>-->
<!--                                        <th>Operation</th>-->
<!--                                        <th>Description</th>-->
<!--                                        <th>Machine NO.</th>-->
<!--                                        <th>Set up By</th>-->
<!--                                    </tr>-->
<!--                                    <tr class="fw-bold text-center">-->
<!--                                        <th>ID</th>-->
<!--                                        <th>Item Number</th>-->
<!--                                        <th>Description</th>-->
<!--                                        <th>Qty Order</th>-->
<!--                                        <th></th>-->
<!--                                        <th></th>-->
<!--                                    </tr>-->
<!--                                    </tbody>-->
<!--                                </table>-->
<!--                                <table id="table_export" class="table table-striped table-sm">-->
<!--                                    <thead class="table-dark">-->
<!--                                    --><?php //require 'pp-export-table-head.php'; ?>
<!--                                    </thead>-->
<!--                                    <tbody id="tbody_export">-->
<!--                                    <tr></tr>-->
<!--                                    --><?php //// require 'pp-export-list-task-script.php'; ?>
<!--                                    </tbody>-->
<!--                                </table>-->
<!--                                <form class="text-black" action="pp-export-action.php" method="post" enctype="multipart/form-data">-->
                                    <input class="btn btn-primary" type="submit" value="Export!" name="submit" id="button_export">
                                    <br><br>
<!--                                    --><?php
//
//                                    ini_set('display_errors', 0);
//                                    error_reporting(E_ERROR | E_WARNING | E_PARSE);
//
//                                    if ($_GET['error_code']!=null){
//                                        if ($_GET['error_code'])
//                                            echo "Upload error! Code: " . $_GET['error_code'];
//                                        else
//                                            echo "Upload successfully! Code: " . $_GET['error_code'];
//                                    }
//                                    ?>
<!--                                </form>-->
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
        <script src="js/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js"></script>
        <script src="js/scripts.js"></script>
        <script src="js/Chart.js/2.9.4/Chart.min.js"></script>
        <script src="assets/demo/chart-area-demo.js"></script>
        <script src="assets/demo/chart-bar-demo.js"></script>
        <script src="js/simple-datatables@latest" type="text/javascript"></script>
        <script src="js/datatables/datatables-simple-demo.js"></script>
        <script src="js/litepicker/dist/bundle.js"></script>
        <script src="js/litepicker.js"></script>
    </body>
</html>
