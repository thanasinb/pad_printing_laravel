<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>@yield('title')</title>

        <!-- Import app.js -->
        <script src="./js/app.js" defer></script>
        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
        <!-- Bootstrap 5 -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        <!-- Styles -->
        <style>
            .text-border {
                text-shadow: 0 0 1px black, 0 0 3px black, 0 0 5px black;
            }
            .text-border-center {
                text-shadow: 0 0 1px black, 0 0 3px black, 0 0 5px black;
                text-align: center;
            }
            .nav-link {
                font-size:18px;
                margin-right: 10px;
            }
        </style>
        <!-- Clock -->
        <script> 
        setInterval(function() {
            const clock = document.getElementById('clock');
            const now = new Date();
            clock.innerHTML =now.toLocaleDateString()+' เวลา : '+now.toLocaleTimeString();
            }, 1000);
        </script>

    </head>
    
    <body id='bd1' class="antialiased" style="background-color: rgb(230, 230, 230)">

        <!-- Part Navbar  -->
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">
                <img src="{{asset('/media/uclogo.png')}}" alt="Image" width="150" height="45">
            </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
            <a class="nav-link" aria-current="page" href="/">Main</a>
            <a class="nav-link" href="{{url('/humanTimeline')}}">Employee</a>
            <a class="nav-link" href="{{url('/machineTimeline')}}">Machine</a>
            <a class="nav-link" href="{{url('/productTimeline')}}">Product</a>
            <a class="nav-link" href="{{url('/import')}}">Import</a>
            <a class="nav-link" href="{{url('/export')}}">Export</a>
            </div>
        </div>
        </div>
        </nav>
        <!-- End Part Navbar  -->
        

        <div class="container rounded  mx-auto"
            style="background-color: #ff8f8f;
                    margin-top:20px;
                    padding-top:15px;">
                    <div class="row">
                        <div class="col-9"><p style="color: rgb(255, 255, 255); font-size: 36px;"><span class="text-border">@yield('topic')</span></p></div>
                        <div class="col-3"><p style="color: rgb(255, 255, 255); font-size: 24px;"><span id="clock" class="text-border-center"></span></p></div>
                    </div>
        </div>
        
        <div class="container rounded p-5 mx-auto" 
            style="background-color: #bbbbbb;
                    margin-top:10px;
                    height:100%;
                    width:100%;
                    ">

            @yield('contents') <!-- Part Contents -->
            
        </div>
        


        <!-- Part Footer  -->
        <footer class="bg-light py-3 mt-5">
            <div class="container">
                <div class="row">
                <div class="col-md-3">
                <h5 class="font-weight-bold text-uppercase mb-3">Company</h5>
                <ul class="list-unstyled">
                    <li><a href="#">About</a></li>
                    <li><a href="#">Contact</a></li>
                    <li><a href="#">Careers</a></li>
                </ul>
                </div>
                <div class="col-md-3">
                <h5 class="font-weight-bold text-uppercase mb-3">Resources</h5>
                <ul class="list-unstyled">
                    <li><a href="#">Support</a></li>
                    <li><a href="#">Help Center</a></li>
                    <li><a href="#">Privacy Policy</a></li>
                </ul>
                </div>
                <div class="col-md-3">
                <h5 class="font-weight-bold text-uppercase mb-3">Legal</h5>
                <ul class="list-unstyled">
                    <li><a href="#">Terms of Service</a></li>
                    <li><a href="#">Privacy Policy</a></li>
                    <li><a href="#">Cookie Policy</a></li>
                </ul>
                </div>
                <div class="col-md-3">
                <h5 class="font-weight-bold text-uppercase mb-3">Social</h5>
                <ul class="list-unstyled">
                    <li><a href="#"><i class="fab fa-twitter"></i> Twitter</a></li>
                    <li><a href="#"><i class="fab fa-facebook"></i> Facebook</a></li>
                    <li><a href="#"><i class="fab fa-instagram"></i> Instagram</a></li>
                </ul>
                </div>
            </div>
            </div>
        </footer>
    </body>
</html>