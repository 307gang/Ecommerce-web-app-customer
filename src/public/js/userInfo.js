// SDK initialization

var imagekit = new ImageKit({
  publicKey: "public_wV3TfSe2gkpglZFYMDNp6r6sGDw=",
  urlEndpoint: "https://ik.imagekit.io/khoildm",
  authenticationEndpoint: window.location.origin + "/auth",
});

// URL generation
var imageURL = imagekit.url({
  path: "/default-image.jpg",
  transformation: [
    {
      height: "300",
      width: "400",
    },
  ],
});

// Upload function internally uses the ImageKit.io javascript SDK
function upload(data) {
  imagekit.upload(
    {
      file: data,
      fileName: data.name,
      tags: ["tag1"],
    },
    function (err, result) {
      if (err) {
        console.log(err);
        img = $("#mainImgSelect").attr("src");
        $("#file").val(img);
        alert("upload failed");
        return null;
      } else {
        console.log(arguments);
        console.log(
          imagekit.url({
            src: result.url,
            transformation: [{ height: 300, width: 400 }],
          })
        );
        img = imagekit.url({
          src: result.url,
          transformation: [{ height: 300, width: 400 }],
        });
        $("#file").val(img);
        alert("upload success full");
      }
    }
  );
}

var img = $("#mainImgSelect").attr("src");

$(document).ready(() => {
  $("#upload-btn").on("click", function () {
    $("#get-file").click();
  });

  $("#delete-btn").on("click", function () {
    $("#mainImgSelect").attr("src", "/asset/img/avatar.png");
    img = "/asset/img/avatar.png";
    $("#file").val(img);
    $("#get-file").val(null);
  });

  $("#get-file").on("change", function () {
    console.log("change");
    var file = this.files[0];
    upload(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const result = e.target.result;
        console.log(result);
        $("#mainImgSelect").attr("src", result);
      };

      reader.readAsDataURL(file);
    }
  });
});
