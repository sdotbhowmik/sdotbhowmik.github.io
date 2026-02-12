$(document).ready(function(){
    $(window).scroll(function(){
        // sticky navbar on scroll script
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        }else{
            $('.navbar').removeClass("sticky");
        }
        
        // scroll-up button show/hide script
        if(this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        }else{
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // slide-up script
    $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0});
        // removing smooth scroll on slide-up button click
        $('html').css("scrollBehavior", "auto");
    });

    $('.navbar .menu li a').click(function(){
        // applying again smooth scroll on menu items click
        $('html').css("scrollBehavior", "smooth");
    });

    // toggle menu/navbar script
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // typing text animation script
    var typed = new Typed(".typing", {
        strings: ["Web Automation", "Mobile Automation", "API Verification","Performance Testing", "Database Testing"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    var typed = new Typed(".typing-2", {
        strings: ["Web Automation", "Mobile Automation", "API Testing", "Database Testing","Performance Testing", "CI/CD/DEV-OPS"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    // owl carousel script
    var carousel = $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsive: {
            0:{
                items: 1,
                nav: false
            },
            600:{
                items: 1,
                nav: false
            },
            1000:{
                items: 1,
                nav: false
            }
        }
    });

    // Handle previous button click
    $('.carousel-btn-prev').click(function(){
        carousel.trigger('prev.owl.carousel');
    });

    // Handle next button click
    $('.carousel-btn-next').click(function(){
        carousel.trigger('next.owl.carousel');
    });
    // Services: open modal with details when 'View More' clicked
    $('.btn-view-more').on('click', function(e){
        e.preventDefault();
        var $card = $(this).closest('.card');
        var title = $card.find('.text').first().text().trim();
        var content = $card.find('.service-details').html() || '<p>No details available.</p>';
        $('#serviceModal .modal-title').text(title);
        $('#serviceModal .modal-body').html(content);
        $('#serviceModal').fadeIn(180);
    });

    // Close modal
    $(document).on('click', '#serviceModal .modal-close', function(){
        $('#serviceModal').fadeOut(120);
    });
    // close when clicking outside content
    $(document).on('click', '#serviceModal', function(e){
        if(e.target === this) $('#serviceModal').fadeOut(120);
    });
    
});

/*== Accordion skills ==*/
const skillsContent = document.getElementsByClassName('skills__content'),
    skillsHeader = document.querySelectorAll('.skills__header')
function toggleSkills(){
    let itemClass = this.parentNode.className
    for(i = 0; i < skillsContent.length; i++){
        skillsContent[i].className = 'skills__content skills__close'
    }
    if(itemClass === 'skills__content skills__close'){
        this.parentNode.className = 'skills__content skills__open'
    }
}

skillsHeader.forEach((el) =>{
    el.addEventListener('click', toggleSkills)
})

/*== Qualification tabs==*/
const tabs = document.querySelectorAll('[data-target]'),
tabContents = document.querySelectorAll('[data-content]');

tabs.forEach(tab =>{
    tab.addEventListener('click', () =>{
        const target = document.querySelector(tab.dataset.target);
        tabContents.forEach(tabContent =>{
            tabContent.classList.remove('qualification__active');
        })
        target.classList.add('qualification__active');
        tabs.forEach(tabss =>{
            tabss.classList.remove('qualification__active');
        })
        tab.classList.add('qualification__active');

    })
})