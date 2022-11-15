const forms = document.querySelectorAll(".needs-validation");
Array.prototype.slice.call(forms).forEach(function (form) {
  form.addEventListener(
    "submit",
    function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add("was-validated");
    },
    false
  );
});


document.getElementById("transacciones").innerHTML = `
<tr>
<td>Mark</td>
<td>Otto</td>
<td>@mdo</td>
<td>Otto</td>
<td>@mdo</td>
</tr> 
`;