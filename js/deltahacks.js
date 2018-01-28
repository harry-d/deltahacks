$( document ).ready(function() {
    console.log("ready");

    function createCard(data, index){
        console.log(index);
        var card =
        '<div id="card'
        +index+
        '" class="card col-sm-8 col-sm-offset-2"><div class="col-sm-4"><img src="'
        +'http://www.momgoesgreen.com/wp-content//hospital-building.jpg'+
        '" class="img-responsive img-rounded"/></div><div class="col-sm-8"><h2>'
        +data.clinic_name+
        '</h2><p style="margin:5px;">'
        +data.dist[0]+ ", "+data.dist[1]+" away"+
        '</p><p>'
        +data.wait_time+
        ' minute wait time</p></div></div>';

        $("#card-wrapper").append(card);
    }




    $("#header-btn").click(function(){
        var location = document.getElementById("location-input").value;

        if(location == "") location = "Toronto";

        lib['nim-wijetunga'].patient['@dev']({location:location, numResults:3}, (err, result) => {
            if(!err){
                data = JSON.parse(JSON.stringify(result, null, 2));
                var index = 1;
                for(var i in data){
                    console.log(data[i]);
                    createCard(data[i],index);
                    index++;
                }
            }
        });

        $("#header-cover").css("transform", "translateY(-100%)");

        $("body").css("background", "#eee").delay(1000);

    });

    $("body").css("background", "#eee").delay(2000);


    $("#close").click(function(){
        $("#info").css("transform", "translateY(100%)");
    });

    $(function(){
        $('body').on({ click : function(){
                var id = 0;
                $("#info-h2").text(data[id].clinic_name);
                $("#info-distance").text(data[id].dist[0]+ ", "+data[id].dist[1]+" away");
                $("#info-wait").text(data[id].wait_time +" minutes from now");
                $("#book-btn").text("Book earliest available time ("+data[id].wait_time+" minutes from now)");
                $("#info").css("transform", "translateY(0%)");
                lastBtn = id;
            }   
        },'#card1');
        console.log("ues");
    });

    $(function(){
        $('body').on({ click : function(){
                var id = 1;
                $("#info-h2").text(data[id].clinic_name);
                $("#info-distance").text(data[id].dist[0]+ ", "+data[id].dist[1]+" away");
                $("#info-wait").text(data[id].wait_time +" minutes from now");
                $("#book-btn").text("Book earliest available time ("+data[id].wait_time+" minutes from now)");
                $("#info").css("transform", "translateY(0%)");
                lastBtn = id;
            }   
        },'#card2');
        console.log("ues");
    });

    $(function(){
        $('body').on({ click : function(){
                var id = 2;
                $("#info-h2").text(data[id].clinic_name);
                $("#info-distance").text(data[id].dist[0]+ ", "+data[id].dist[1]+" away");
                $("#info-wait").text(data[id].wait_time +" minutes from now");
                $("#book-btn").text("Book earliest available time ("+data[id].wait_time+" minutes from now)");
                $("#info").css("transform", "translateY(0%)");
                lastBtn = id;
            }   
        },'#card3');
        console.log("ues");
    });


 
    $("#book-btn").click(function(){

        $("#book-btn").text("Booked!").delay(1800);
        data[lastBtn].wait_time += 5;
    });





});
