$(document).on("click", ".mainContentdiv", function() {
  var userId = $("span", this).attr("id");
  swal(
    {
      title: "Confirmation",
      text: "Do you really want to block this User-" + userId + " ?",
      type: "error",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      cancelButtonText: "CANCEL",
      closeOnCancel: true,
      showCloseButton: true
    },
    function(isConfirm) {
      if (isConfirm) {
        console.log("confirm button");
        $.ajax({
          type: "GET",
          url: `/soc/users/${userId}/block`,
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
      } else {
        console.log("click cancel button------");
      }
    }
  );
});

var currentPageNumber = 0;
$(document).ready(function() {
  loadMore(currentPageNumber);
});

function SelectCurrentRow(elem) {
  $(".mainContentdiv").each(function() {
    $(this).removeClass("SelectedRow");
  });
  $(elem).addClass("SelectedRow");
}

scrollPageNumber = 1;
$(window).scroll(function() {
  if ($(window).scrollTop() == $(document).height() - $(window).height()) {
    loadMore(scrollPageNumber);
    scrollPageNumber++;
  }
});

function loadMore(currentPage) {
  $.ajax({
    method: "GET",
    url: "/soc/activities",
    dataType: "json",
    cache: false,
    success: function(data) {
      $.each(data, function(key, val) {
        var html = "";

        var strongpwd = "";
        if (val.name == "Strong Password") {
          stringpwd =
            '</span><div class="innercontent"><span> Selects ' +
            val.name +
            '- <span class="active"> Activity Resumed </span> </span>';
        } else {
          stringpwd =
            '</span><div class="innercontent"><span> Selects ' +
            val.name +
            '- <span class="danger"> Activity Terminated </span> </span>';
        }

        if (val.user.status == "Active") {
          html =
            '<div id="mainContentdiv" class="mainContentdiv" onclick="SelectCurrentRow(this)">' +
            "<span id=" +
            val.user.id +
            ">" +
            "USER" +
            ":" +
            val.user.id +
            '</span><div class="innercontent"><span> Selects <b>' +
            val.user.name +
            '</b>- <span class="active"> Activity Resumed </span> </span>' +
            stringpwd +
            "</div></div>";
        } else if (val.user.status == "Blocked") {
          html =
            '<div id="mainContentdiv" class="mainContentdiv"  onclick="SelectCurrentRow(this);">' +
            "<span id=" +
            val.user.id +
            ">" +
            "USER" +
            ":" +
            val.user.id +
            '</span><div class="innercontent"><span> Selects <b>' +
            val.user.name +
            '</b>- <span class="danger"> Activity Terminated </span> </span></div></div>';
        }
        $("#RightDiv").append(html);
      });
    },
    error: function(data) {
      console.log("Something went wrong!");
    }
  });
}
