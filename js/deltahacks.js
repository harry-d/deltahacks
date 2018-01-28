$( document ).ready(function() {
    console.log("ready");

    function createCard(data, index){
        var card =
            '<div id="card'
            +index+
            '" class="card col-sm-8 col-sm-offset-2"><div class="col-sm-4"><img src="'
            +data['img']+
            '" class="img-responsive img-rounded"/></div><div class="col-sm-8"><h2>'
            +data['clinic_name']+
            '</h2><p>'
            +data['distance'][0]+ ", "+data['distance'][1]+" away"
            '</p><p>'
            +data['wait_time']+
            '</p></div></div>';

        $("#card-wrapper").html(card);
    }




    $("#header-btn").click(function(){
        var location = $("#location-input").text();


        /*

        nim's map code!

        */

        var data;//object

        //loop to create cards
        for (var i = 0; i < data.length; i++){
            createCard(data[i],i);
        }



        $("#header-cover").css("transform", "translateY(-100%)");

        $("body").css("background", "#eee").delay(1000);

    });

    $("body").css("background", "#eee").delay(2000);

    $("#card1").click(function(){
        $("#info").css("transform", "translateY(0%)");
    });

    $("#close").click(function(){
        $("#info").css("transform", "translateY(100%)");
    });

    $(".card").click(function(){
        var id = $(this).attr('id');
        id = parseInt(id.substring(4));
        $("#info-h2").text(data[id]['location']);
        $("#info-distance").text(data[id]['distance'][0]+ ", "+data[id]['distance'][1]+" away");
        $("#info-wait").text(data[id]['wait_time']);
        $("#info-btn").text("Book earliest available time ("+data[id]['wait_time']+" from now)");
        $("#info-btn-custom").text(data[id]['location']);
    })






});
