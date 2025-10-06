$(document).ready(function() {
    // Ambil nama dari URL (?untuk=Nama)
    const url = new URL(window.location);
    const untuk = url.searchParams.get("untuk");

    if (untuk) {
        $(".mobile-title").html(untuk);
        $("#nama").val(untuk);
    }

    // Jalankan efek slider (jika ada)
    $(".instagram-effects").slick({
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
    });

    // --- TAMPILKAN DATA DOA SAAT AWAL ---
    loadDataDoa();

    // --- KETIKA TOMBOL KIRIM DIKLIK ---
    $("#submit").click(function(e) {
        e.preventDefault(); // cegah reload

        const nama = $("#nama").val().trim();
        const lokasi = $("#lokasi").val().trim();
        const ucapan = $("#ucapan").val().trim();
        let kehadiran = $("input[name='kehadiran']:checked").val();

        // Validasi sederhana
        if (!nama || !lokasi || !kehadiran || !ucapan) {
            alert("Semua field wajib diisi!");
            return;
        }

        // Kirim data ke insert.php
        $.ajax({
            type: "POST",
            url: "./php/insert.php",
            data: {
                nama: nama,
                lokasi: lokasi,
                kehadiran: kehadiran,
                ucapan: ucapan,
                submit: "insert"
            },
            success: function(data) {
                console.log("Response:", data);
                if (data.trim() === "success") {
                    $("#ucapan").val("");
                    $("input[name='kehadiran']").prop("checked", false);
                    loadDataDoa(); // reload data terbaru
                } else {
                    alert("Gagal mengirim data: " + data);
                }
            },
            error: function(xhr, status, error) {
                console.error("AJAX Error:", error);
                alert("Terjadi kesalahan koneksi!");
            }
        });
    });

    // --- FUNCTION: muat ulang daftar doa ---
    function loadDataDoa() {
        $.ajax({
            type: "GET",
            url: "./php/display.php",
            dataType: "html",
            success: function(response) {
                $(".block-data-doa").html(response);
            },
            error: function() {
                $(".block-data-doa").html("<p>Gagal memuat data.</p>");
            }
        });
    }
});

var x = document.getElementById("background_music");

function playAudio() {
    x.play();
}

function pauseAudio() {
    x.pause();
}

$(".music-control").click(function() {
    var music = $(this).hasClass("off");

    if (music) {
        playAudio();
        $(this).removeClass("off");
        $(".sound-off").hide();
        $(".sound-on").show();
    } else {
        pauseAudio();
        $(this).addClass("off");
        $(".sound-off").show();
        $(".sound-on").hide();
    }
});

$("#pay").click(function() {
    $("#id01").fadeIn("slow");
    gsap.from(".aniModal", {
        scale: 0,
        duration: 1.25,
        opacity: 0,
        ease: "circ.inOut",
    });
});

$("#close-01").click(function() {
    $("#id01").fadeOut("slow");
});

$("#okay").click(function() {
    $("#id02").hide();
});

if (navigator.userAgent.toLowerCase().match(/mobile/i)) {
    $("#desktopmodalpancingan").hide();
}
else {
    $("#desktopmodalpancingan").show();
}
$("#okaypancing").click(function() {
    playAudio();
    $(this).removeClass("off");
    $(".sound-off").hide();
    $(".sound-on").show();
    $("#desktopmodalpancingan").hide();
});

$(".buka-udangan").click(function() {
    $(".main-title").hide();
    $(".main-img").hide();
    $("#pay").show();
    $(".desktop-bar").show();
    $(".separator").css("position", "absolute");
    $(".mobile-separator").css("visibility", "visible");
    $("#id02").show();
    playAudio();
    $(".music-control").show().removeClass("off");
    $(".sound-off").hide();
    $(".sound-on").show();
});

gsap.from(".aniTitle", {
    delay: 0.3,
    scale: 0,
    duration: 1.25,
    opacity: 0,
    ease: "circ.inOut",
});

//WITH Timelines (cleaner, more versatile)
var tl = gsap.timeline({ repeat: -1 });
tl.to(".buka-udangan", { autoAlpha: 1, duration: 1 }),
    tl.to(".buka-udangan", { autoAlpha: 0, duration: 1 }),
    tl.to(".buka-udangan", { autoAlpha: 1, duration: 1 }),
    tl.to(".buka-udangan", { autoAlpha: 0, duration: 1 });

function animateFrom(elem, direction) {
    direction = direction || 1;
    var x = 0,
        y = direction * 100;
    if (elem.classList.contains("gs_reveal_fromLeft")) {
        x = -100;
        y = 0;
    } else if (elem.classList.contains("gs_reveal_fromRight")) {
        x = 100;
        y = 0;
    }
    elem.style.transform = "translate(" + x + "px, " + y + "px)";
    elem.style.opacity = "0";
    gsap.fromTo(
        elem, { x: x, y: y, autoAlpha: 0 }, {
            duration: 2.75,
            x: 0,
            y: 0,
            autoAlpha: 1,
            ease: "expo",
            overwrite: "auto",
        }
    );
}

function hide(elem) {
    gsap.set(elem, { autoAlpha: 0 });
}

async function changeBackground(elemId, activeClass) {
    $(elemId).removeClass("active").addClass(activeClass);
}

  const images = [
    "img/new/image1.jpg",
    "img/new/image2.jpg",
    "img/new/image3.jpg",
    "img/new/image4.jpg"
  ];

  let index = 0;
  const slideImg = document.getElementById("slide-img");

  setInterval(() => {
    // fade out dulu
    slideImg.classList.remove("show");

    setTimeout(() => {
      // setelah hilang → ganti gambar
      index = (index + 1) % images.length;
      slideImg.src = images[index];

      // lalu fade in lagi
      slideImg.classList.add("show");
    }, 1000); // sesuai waktu transition (1s)
  }, 4000); // ganti gambar tiap 4 detik
  
document.addEventListener("DOMContentLoaded", function() {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray(".gs_reveal").forEach(function(elem) {
        hide(elem); // assure that the element is hidden when scrolled into view

        ScrollTrigger.create({
            trigger: elem,
            scroller: "#mobile-scroll",
            onEnter: function() {
                animateFrom(elem);
            },
            onEnterBack: function() {
                animateFrom(elem, -1);
            },
            onLeave: function() {
                hide(elem);
            }, // assure that the element is hidden when scrolled into view
        });
    });

    ScrollTrigger.create({
        trigger: "#date-id",
        scroller: "#mobile-scroll",
        onEnter: function() {
            changeBackground(".icon-date", "active");
        },
        onEnterBack: function() {
            changeBackground(".icon-date", "active");
        },
        onLeave: function() {
            changeBackground(".icon-date", "");
        },
        onLeaveBack: function() {
            changeBackground(".icon-date", "");
        },
    });

    ScrollTrigger.create({
        trigger: "#love-id",
        scroller: "#mobile-scroll",
        onEnter: function() {
            changeBackground(".icon-love", "active");
        },
        onEnterBack: function() {
            changeBackground(".icon-love", "active");
        },
        onLeave: function() {
            changeBackground(".icon-love", "");
        },
        onLeaveBack: function() {
            changeBackground(".icon-love", "");
        },
    });

    ScrollTrigger.create({
        trigger: "#maps-id",
        scroller: "#mobile-scroll",
        onEnter: function() {
            changeBackground(".icon-location", "active");
        },
        onEnterBack: function() {
            changeBackground(".icon-location", "active");
        },
        onLeave: function() {
            changeBackground(".icon-location", "");
        },
        onLeaveBack: function() {
            changeBackground(".icon-location", "");
        },
    });

    ScrollTrigger.create({
        trigger: "#instagram-id",
        scroller: "#mobile-scroll",
        onEnter: function() {
            changeBackground(".icon-insta", "active");
        },
        onEnterBack: function() {
            changeBackground(".icon-insta", "active");
        },
        onLeave: function() {
            changeBackground(".icon-insta", "");
        },
        onLeaveBack: function() {
            changeBackground(".icon-insta", "");
        },
    });

    ScrollTrigger.create({
        trigger: "#doa-id",
        scroller: "#mobile-scroll",
        onEnter: function() {
            changeBackground(".icon-doa", "active");
        },
        onEnterBack: function() {
            changeBackground(".icon-doa", "active");
        },
        onLeave: function() {
            changeBackground(".icon-doa", "");
        },
        onLeaveBack: function() {
            changeBackground(".icon-doa", "");
        },
    });
});

