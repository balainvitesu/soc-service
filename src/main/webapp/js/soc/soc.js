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
      if (data.status === "Blocked") {
        swal(
          {
            title: "Alert",
            text: "Admin has blocked you",
            type: "error"
          },
          function(isConfirm) {
            if (isConfirm) {
              window.location.replace("login.html");
            }
          }
        );
      }
    },
    error: function(data) {
      console.log("Something went wrong!");
    }
  });
}

function showBlockUserActivityAlert(userId, type, message) {
  getUserStatus(userId);
  swal({
    title: "Alert",
    text: message,
    type: "error"
  });
  createActivity("Block user activity: " + type, userId);
}

function showAccessDeniedAlert(userId) {
  swal({
    title: "Alert - Access Denied",
    text: "You are not allowed to use this application, choose other user",
    type: "error"
  });
  createActivity("Access Denied", userId);
}

function showWeakPasswordAlert(userId) {
  getUserStatus(userId);
  swal({
    title: "Alert - Weak Password",
    text: "Your strength of the password is weak, choose a stronger password",
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
      type: "success",
      confirmButtonText: "Continue"
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

  $(".mail-click").click(function() {
    alertUserActivity(
      "Email Phishing",
      "Email Phishing?",
      "Clicking on untrusted link is not allowed !!!",
      "Yes, Continue it!",
      "No, Cancel please!",
      "You will be blocked by Admin",
      "You are safe now:)"
    );
  });

  $(".s1").click(function() {
    alertUserActivity(
      "Copy confidential file",
      "Copying confidential file?",
      "Copying secret information is not allowed !!!",
      "Yes, Continue it!",
      "No, Cancel please!",
      "You will be blocked by Admin",
      "You are safe now:)"
    );
  });

  $(".s3").click(function() {
    let searchParams = new URLSearchParams(window.location.search);
    window.location.replace(
      "mail_detail.html?userId=" + searchParams.get("userId")
    );
  });

  $(".s2").click(function() {
    alertUserActivity(
      "Browse from Internet",
      "Download application from the Internet?",
      "Downloading files are not allowed from internet !!!",
      "Yes, Download it!",
      "No, cancel please!",
      "You will be blocked by Admin",
      "You are safe now:)"
    );
  });

  function alertUserActivity(
    type,
    title,
    message,
    confirmButtonText,
    cancelButtonText,
    okMessage,
    cancelMessage
  ) {
    swal(
      {
        title: title,
        text: message,
        type: "info",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText,
        closeOnConfirm: false,
        closeOnCancel: false
      },
      function(isConfirm) {
        if (isConfirm) {
          let searchParams = new URLSearchParams(window.location.search);
          showBlockUserActivityAlert(
            searchParams.get("userId"),
            type,
            okMessage
          );
        } else {
          swal("Good Job", cancelMessage, "success");
        }
      }
    );
  }
});
