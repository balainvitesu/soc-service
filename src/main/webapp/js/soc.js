function createActivity(activity, userId) {
  $.ajax({
    type: "POST",
    url: "/soc/activity",
    data: JSON.stringify({
      name: activity,
      user: {
        id: userId
      }
    }),
    contentType: "application/json",
    dataType: "json",
    cache: false,
    success: function(data) {
      console.log("Activity created successfully", data);
    },
    error: function(data) {
      console.log("Something went wrong!");
    }
  });
}

function unblockUser(userId) {
  $.ajax({
    type: "GET",
    url: `/soc/users/${userId}/activate`,
    contentType: "application/json",
    dataType: "json",
    cache: false,
    success: function(data) {
      console.log("Activity created successfully", data);
    },
    error: function(data) {
      console.log("Something went wrong!");
    }
  });
}

function getUserStatus(userId) {
  $.ajax({
    type: "GET",
    url: "/soc/users/" + userId,
    contentType: "application/json",
    dataType: "json",
    cache: false,
    success: function(data) {
      console.log("Getting User Status", data);
      if(data.status === 'Blocked'){
        swal({
          title: "Alert - Offense",
          text: "Admin has blocked you",
          type: "error"
        },
        function(isConfirm) {
          if (isConfirm) {
            window.location.replace("login.html");
          }
        });
      }
    },
    error: function(data) {
      console.log("Something went wrong!");
    }
  });
}

function showBlockUserActivityAlert(userId, type) {
  getUserStatus(userId);
  swal({
    title: "Alert - Offense",
    text: "Block user activity",
    type: "error"
  });
  createActivity("Block user activity: " + type, userId);
}

function showAccessDeniedAlert(userId) {
  // getUserStatus(userId);
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
  createActivity("Access Denied", userId);
}

function showWeakPasswordAlert(userId) {
  getUserStatus(userId);
  swal({
    title: "Alert - Offense",
    text: "Weak Password",
    type: "error"
  });
  createActivity("Weak Password", userId);
}

function showStrongPasswordAlert(userId) {
  getUserStatus(userId);
  swal(
    {
      title: "Good Job",
      text: "Strong Password",
      type: "success"
    },
    function(isConfirm) {
      if (isConfirm) {
        let searchParams = new URLSearchParams(window.location.search);
        window.location.replace(
          "home.html?userId=" + searchParams.get("userId")
        );
      }
    }
  );
  createActivity("Strong Password", userId);
}

$(document).ready(function() {
  $(".hacker").click(function() {
    showAccessDeniedAlert($(this).data("value"));
  });

  $(".user").click(function() {
    unblockUser($(this).data("value"));
    window.location.replace("password.html?userId=" + $(this).data("value"));
  });

  $(".wpwd").click(function() {
    let searchParams = new URLSearchParams(window.location.search);
    showWeakPasswordAlert(searchParams.get("userId"));
  });

  $(".spwd").click(function() {
    let searchParams = new URLSearchParams(window.location.search);
    showStrongPasswordAlert(searchParams.get("userId"));
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

  $(".mail-click").click(function() {
    let searchParams = new URLSearchParams(window.location.search);
    showBlockUserActivityAlert(searchParams.get("userId"), "Email Phishing");
  });

  $(".s1").click(function() {
    let searchParams = new URLSearchParams(window.location.search);
    showBlockUserActivityAlert(
      searchParams.get("userId"),
      "Copy confidential file"
    );
  });

  $(".s3").click(function() {
    let searchParams = new URLSearchParams(window.location.search);
    window.location.replace(
      "mail_detail.html?userId=" + searchParams.get("userId")
    );
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
          let searchParams = new URLSearchParams(window.location.search);
          showBlockUserActivityAlert(
            searchParams.get("userId"),
            "Browse the internet"
          );
        } else {
          swal("Cancelled", "Your imaginary file is safe :)", "error");
        }
      }
    );
  });
});
