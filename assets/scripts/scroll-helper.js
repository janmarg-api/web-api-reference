const endpointList = document.getElementById("endpoint-list");

if (endpointList) {
  for (const childElement of endpointList.children) {
    childElement.addEventListener("click", function (event) {
      let boundingRect = document
        .getElementById(childElement.dataset.ref)
        .getBoundingClientRect();

      console.log(boundingRect);

      window.scroll(
        window.scrollX + boundingRect.left,
        window.scrollY + boundingRect.top - 100,
      );
    });
  }
}
