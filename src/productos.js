document.addEventListener("DOMContentLoaded", () => {
    showStockProducts();
})

let getJSONData = function (url) {
    let result = {}
    return fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error(response.statusText);
        }
      })
      .then(function (response) {
        result.status = "ok";
        result.data = response;
        return result;
      })
      .catch(function (error) {
        result.status = "error";
        result.data = error;
        return result;
      });
  };

  
function showStockProducts() {
        getJSONData(host_url).then(function (resultObj) {
          if (resultObj.status === "ok") {
            let product_detailed = resultObj.data;
            console.trace(product_detailed)
 
          }
        });
      }
