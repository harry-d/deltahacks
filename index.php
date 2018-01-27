<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- <meta name="description" content=""> -->
    <meta name="author" content="Harry Dong">

    <title>DeltaHacks IV</title>

    <!-- <link rel="icon" type="image/png" href="img/logo-blue-square.png"> -->
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link href="css/animate.css" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Catamaran:200,400" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="css/inputs.css" />

    <script src="js/jquery.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/easing.js"></script>
    <script src="js/wow.min.js"></script>
    <script defer src="js/fontawesome-5/bundles/everything.min.js"></script>

</head>

<body id="page-top" data-spy="scroll" data-target=".navbar-fixed-top">



    <!-- Footer -->
    <footer>
        <div class="container">
            <p class="pull-left">Copyright &copy; Harry's DeltaHacks Project <?php echo date("Y") ?></p><a href="mailto:harold.dong@gmail.com?Subject=Contact%20Harry" class="pull-right">sample@email.com</a>
        </div>
    </footer>

    <script src="js/classie.js"></script>
    <script>

    (function() {
        // trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
        if (!String.prototype.trim) {
            (function() {
                // Make sure we trim BOM and NBSP
                var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
                String.prototype.trim = function() {
                    return this.replace(rtrim, '');
                };
            })();
        }

        [].slice.call( document.querySelectorAll( 'input.input__field' ) ).forEach( function( inputEl ) {
            // in case the input is already filled..
            if( inputEl.value.trim() !== '' ) {
                classie.add( inputEl.parentNode, 'input--filled' );
            }

            // events:
            inputEl.addEventListener( 'focus', onInputFocus );
            inputEl.addEventListener( 'blur', onInputBlur );
        } );

        function onInputFocus( ev ) {
            classie.add( ev.target.parentNode, 'input--filled' );
        }

        function onInputBlur( ev ) {
            if( ev.target.value.trim() === '' ) {
                classie.remove( ev.target.parentNode, 'input--filled' );
            }
        }
    })();

</script>


</body>

</html>
