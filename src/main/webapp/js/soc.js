function createActivity(activity, userId) {
  $.ajax({
    type: "POST",
    url: "http://localhost:8080/soc/activity",
    data: JSON.stringify({
      name: activity,
      user: {
        id: userId
      }
    }),
    contentType: "application/json",
    dataType: "application/json",
    cache: false,
    success: function(data) {
      console.log("Activity created successfully", data);
    },
    error: function(data) {
      console.log("Something went wrong!");
    }
  });
}

function showBlockUserActivityAlert() {
  swal({
    title: "Alert - Offense",
    text: "Block user activity",
    type: "error"
  });
  createActivity("Block user activity", 1);
}

function showAccessDeniedAlert() {
  swal(
    {
      title: "Alert - Offense",
      text: "Access Denied",
      type: "error"
    },
    function(isConfirm) {
      if (isConfirm) {
        // window.location.replace("login.html")
      }
    }
  );
}

function showWeakPasswordAlert() {
  swal({
    title: "Alert - Offense",
    text: "Weak Password",
    type: "error"
  });
}

function showStrongPasswordAlert() {
  swal(
    {
      title: "Good Job",
      text: "Strong Password",
      type: "success"
    },
    function(isConfirm) {
      if (isConfirm) {
        window.location.replace("home.html");
      }
    }
  );
}

$(document).ready(function() {
  $(".hacker").click(function() {
    showAccessDeniedAlert();
  });

  $(".user").click(function() {
    window.location.replace("password.html");
  });

  $(".wpwd").click(function() {
    showWeakPasswordAlert();
  });

  $(".spwd").click(function() {
    showStrongPasswordAlert();
  });

  $("select.username").change(function() {
    if (
      $(this)
        .children("option:selected")
        .val() === "Hacker"
    ) {
      showAccessDeniedAlert();
    }
  });

  $("select.password").change(function() {
    if (
      $(this)
        .children("option:selected")
        .val() === "12345qatar"
    ) {
      showWeakPasswordAlert();
    } else if (
      $(this)
        .children("option:selected")
        .val() === "Q@t745743hb"
    ) {
      showStrongPasswordAlert();
    }
  });

  $(".demo1").click(function() {
    swal({
      title: "Welcome in Alerts",
      text:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    });
  });

  $(".s1").click(function() {
    showBlockUserActivityAlert();
  });

  $(".demo3").click(function() {
    swal(
      {
        title: "Are you sure?",
        text: "You will not be able to recover this imaginary file!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
      },
      function() {
        swal("Deleted!", "Your imaginary file has been deleted.", "success");
      }
    );
  });

  $(".s2").click(function() {
    swal(
      {
        title: "Download application from the Internet?",
        text: "",
        type: "info",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, Download it!",
        cancelButtonText: "No, cancel plx!",
        closeOnConfirm: false,
        closeOnCancel: false
      },
      function(isConfirm) {
        if (isConfirm) {
          showBlockUserActivityAlert();
        } else {
          swal("Cancelled", "Your imaginary file is safe :)", "error");
        }
      }
    );
  });
});
