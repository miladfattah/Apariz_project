$(document).ready(function() {
  var apiKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjkxOTgwOWYwNjUwZTVjMjk0MmJjZjZmMjE1ZGFiYmRiZDIzMTE0OWZiZDczYTI1ZjA5MWQxYjc0OGQ3ZWNhMGJiMDBjNTA3Mjc3ZDRkMjRjIn0.eyJhdWQiOiIxMTY2MSIsImp0aSI6IjkxOTgwOWYwNjUwZTVjMjk0MmJjZjZmMjE1ZGFiYmRiZDIzMTE0OWZiZDczYTI1ZjA5MWQxYjc0OGQ3ZWNhMGJiMDBjNTA3Mjc3ZDRkMjRjIiwiaWF0IjoxNjA2NjAyNTk1LCJuYmYiOjE2MDY2MDI1OTUsImV4cCI6MTYwOTEwODE5NSwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.e-AST1kfzzFaWQegGXW1JHsD9y10aPq8b8AIKxrVPZlsAI4hP7_feMXg0KJ7_qDjBF1gojjq85A2I78PZceZXsp55roP32PM6DadEJgHolQ3-flMkrlKrJluWpS2lC2Qhb6z3It3FacK5aWbkfEqynkMr0dCzmTiDjvp0zv4P44uKT4KvSTN6EiS3XE7bUWHDT4lTHvVL6wdGLDtTpUDTBKoWBVcQxUi8N3vubcytnABamZaJUso_2tjEbU-m_LHVheEg-ADYpd8Nb_ahURNFoZ9Bk5QCbM80dwseFViFJ0K5v7UtAVNwNqF9eN4I0YaSDxBEyBjaRmXVdHY-oqADw';
  var app = new Mapp({
    element: "#app",
    presets: {
      latlng: {
        lat: 32,
        lng: 52
      },
      zoom: 6
    },
    locale: "fa",
    apiKey
  });

  app.addVectorLayers();

  var start = {};
  var index = 1;
  var curse = 0;
  var history = [];
  var memeTimeout;
  var keySwitch =  false;
  kickOff();

  $(".app-reset button").on("click", function() {
    $(".app-results-ul").html("");

    if (start.marker) app.map.removeLayer(start.marker);

    $(".app-start").remove();

    index = 1;
    curse = 0;
    history = [];

    $("textarea").val("");

    kickOff();
  });

  $("#app-submit").on("click", function() {
    if ($("textarea").val()) {
      leg("آدرس نهایی بعد از ویرایش: «" + $("textarea").val() + "»");
    } else {
      leg("کدوم آدرس آخه؟! شما به من آدرس را نشان بده...");
    }
  });

  app.map.on("click", function() {
    leg("روی نقشه کلیک شد.");
  });

  function kickOff() {
    leg(
      "در این دمو موقعیت کاربر گرفته میشه، و پس از ثبت محل مورد نظر کاربر آدرس محل مشخص شده پیدا، ویرایش، و ثبت میشه."
    );

    start = {
      latlng: undefined,
      marker: undefined,
      icon: {
        iconUrl: "./app/assets/images/marker-default-blue.svg",
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
      }
    };

    app.map.fitBounds([[35.532, 51.051], [35.835, 51.632]]);

    leg("در حال تلاش برای پیدا کردن موقعیت فعلی کاربر...");

    userLocationFound = false;
    app.getUserLocation({
      before: function() {
        freeze();
      },
      after: function() {
        unfreeze();
      },
      success: function() {
        userLocationFound = true;
        leg("موقعیت کاربر پیدا شد.");

        app.map.panTo({
          lat: app.states.user.latlng.lat,
          lng: app.states.user.latlng.lng
        });

        leg("نقشه به موقعیت کاربر حرکت داده شد.");

        $("#mapp-app").append('<div class="app-start"></div>');

        leg(
          "می‎توانید نقشه را حرکت داده و برای ثبت محل کاربر روی مارکر کلیک کنید."
        );
        leg("منتظر تصمیم شما...");

        $(".app-start").on("click", function() {
          start.latlng = app.map.getCenter();

          start.marker = app.addMarker({
            name: "start",
            latlng: start.latlng,
            icon: start.icon,
            popup: false,
            pan: false,
            draggable: true,
            history: false
          });

          leg("محل کاربر ثبت شد.");

          $(".app-start").remove();

          leg("برای تغییر محل کاربر می‎توانید مارکر را روی نقشه حرکت دهید.");

          doReverse();

          start.marker.on("dragend", function() {
            leg("محل کاربر تغییر کرد.");

            start.latlng = start.marker.getLatLng();

            doReverse();
          });
        });
      },
      error: function() {
        var centerMarker = $('#center-marker').show();
        centerMarker.on('click', function(){
          start.latlng = app.map.getCenter()
          app.map.panTo(start.latlng);
          doReverse();

        });
      },
      pan: false,
      marker: false
    });
  }

  function leg(text) {
    var printed = text;

    if (text === history[history.length - 1]) {
      printed = "برای بار دوم، " + text;

      if (text === history[history.length - 2]) {
        printed =
          curse < 2
        "دوباره " + text;

        if (curse === 2) meme("parviz");

        if (curse < 2 && text === history[history.length - 3]) {
          printed = "دوباره " + text;

          if (text === history[history.length - 4]) {
            printed = "دوباره " + text;

            if (text === history[history.length - 5]) {
              printed = "دوباره " + text;

              if (text === history[history.length - 6]) {
                curse = 1;
                printed = "دوباره " + text;

                if (text === history[history.length - 7]) {
                  printed = "دوباره " + text;

                  if (text === history[history.length - 8]) {
                    printed = "دوباره " + text;

                    if (text === history[history.length - 9]) {
                      printed = "دوباره " + text;

                      if (text === history[history.length - 10]) {
                        printed = "دوباره " + text;

                        return;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    if (
      curse === 1 &&
      history[history.length - 1] !== undefined &&
      text !== history[history.length - 1]
    ) {
      history = [];
      curse = 2;
      index = 1;
      printed = "برگردیم سر نقشه. " + text;

      $(".app-results-ul").html("");
    }

    history.push(text);

    var html =
      '<li class="app-results-li highlighted" id="li-' +
      index +
      '">' +
      '<div class="app-result-content">' +
      index +
      " - " +
      printed +
      "</div>" +
      "</li>";

    $(".app-results-ul").prepend(html);

    var i = index;

    setTimeout(function() {
      $("#li-" + i).removeClass("highlighted");
    }, 2000);

    index += 1;
  }

    $('.map-select.source').on('click', function(){
      $('.map-element').addClass('active')
      keySwitch = true;   
    })


    $('.map-select.destination').on('click', function(){
      $('.map-element').addClass('active')
      keySwitch = false;
    })
 
 
  function doReverse() {
    if (start.latlng) {
      leg("در حال پیدا کردن آدرس...");

      var result = app.findReverseGeocode({
        before: function() {
          freeze();
        },
        after: function(data) {
          unfreeze();

          leg("آدرس پیدا شد.");
          if(keySwitch){
            $('input[name="source_address"]').val(data.address_compact)
          }else{
            $('input[name="destination_address"]').val(data.address_compact)
          }
          leg("می‎توانید آدرس را ویرایش کنید یا محل کاربر را تغییر دهید.");
        },
        state: {
          latlng: start.latlng
        }
      });
    }
  }


  function meme(image) {
    if (memeTimeout) clearTimeout(memeTimeout);

    $(".app-meme").addClass("app-visible");
    $(".app-meme").css({
      backgroundImage: "var(--meme-" + image + ")"
    });

    memeTimeout = setTimeout(function() {
      $(".app-meme").removeClass("app-visible");
    }, 1000);
  }

  function unfreeze() {
    $(".app-overlay").removeClass("app-visible");
    $("textarea").prop("disabled", false);
    $("button").prop("disabled", false);
    $("input").prop("disabled", false);
  }

  function freeze() {
    $(".app-overlay").addClass("app-visible");
    $("textarea").prop("disabled", true);
    $("button").prop("disabled", true);
    $("input").prop("disabled", true);
  }




});

