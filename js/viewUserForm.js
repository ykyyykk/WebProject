$(document).ready(() => {
  $("#userForm").submit((event) => {
    event.preventDefault();
    const userId = $("#id").val();
    $.ajax({
      url: `users/${userId}`,
      method: "GET",
      success: (data) => {
        $("#userResult").html(
          `<p>ID: ${data.id}</p> <p>Name: ${data.name}</p>`
        );
      },
      error: (xhr) => {
        $("#userResult").html(`<p>${xhr.responseJSON.error}</p>`);
      },
    });
  });
});
