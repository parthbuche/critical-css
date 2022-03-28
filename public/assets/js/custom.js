$(document).ready(function () {
  var $loading = $('#loading').css('display', 'none');

  $(document).ajaxStart(function () {
    $loading.css('display', 'block');
  });

  $(document).ajaxComplete(function () {
    $loading.css('display', 'none');
  });

  $('#critical').submit(function () {
    var $critical_url = $('#exampleInput').val(),
      $criticalCss = $('#critical-css'),
      $submitButton = $('#critical-gen');

    $submitButton.attr('disabled', true);
    $.ajax({
      type: 'POST',
      data: { critical: $critical_url },
      dataType: 'JSON',
      url: '/critical',
      success: function (response) {
        // console.log("Successfully generated critical css");
        $criticalCss.empty();
        $criticalCss.append("<div class='alert alert-success'>Critical css generated successfully</div>");
        $criticalCss.append("<textarea rows='32' cols='80'>" + response + '</textarea>');
        $submitButton.attr('disabled', false);
      },
      error: function (response) {
        console.log(response);
        $criticalCss.empty();
        $criticalCss.append("<div class='alert alert-danger'>Something went wrong !</div>").fadeOut(2000);
        $submitButton.attr('disabled', false);
      },
    });

    return false;
  });
});
