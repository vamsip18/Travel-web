document.getElementById("searchInput").addEventListener("keyup", function () {
        let searchValue = this.value.toLowerCase();
        let listings = document.querySelectorAll(".list .col");

        listings.forEach((listing) => {
            let title = listing.querySelector(".card-text").innerText.toLowerCase();

            if (title.includes(searchValue)) {
                listing.style.display = "block";
            } else {
                listing.style.display = "none";
            }
        });
    });
