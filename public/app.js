const tabs = document.querySelectorAll(".tab-link");
const tabViews = document.querySelectorAll(".tab-view");

tabs.forEach(tab => {
    tab.addEventListener('click', (event) => {
        tabs.forEach(tab => {
            tab.classList.remove("active")
        });

        if (!tab.classList.contains('active')) {
            tab.classList.add('active')
            const f = tab.getAttribute('for');

            tabViews.forEach(view => {
                if (view.id == f) {
                    view.classList.add('active')
                } else {
                    view.classList.remove("active")
                }
            });
        }
    })
})