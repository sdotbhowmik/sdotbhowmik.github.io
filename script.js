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

    // toggle dropdown on mobile
    $('.navbar .menu li.dropdown > a').click(function(e){
        if($(window).width() <= 947){
            e.preventDefault();
            $(this).parent().toggleClass("active");
        }
    });

    // close dropdown when clicking on a submenu link
    $('.navbar .menu li.dropdown .dropdown-content a').click(function(){
        if($(window).width() <= 947){
            $('.navbar .menu li.dropdown').removeClass("active");
        }
    });

    // typing text animation script
    var typed = new Typed(".typing-2", {
        strings: ["Web Automation", "Mobile Automation", "API Testing", "Database Testing","Performance Testing", "CI/CD/DEV-OPS", "Web Development"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    // owl carousel script - initialize each project category carousel
    $('.projects .carousel').each(function(){
        var $carousel = $(this);
        $carousel.owlCarousel({
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

        // Handle previous/next button clicks for this carousel only
        $carousel.closest('.carousel-container').find('.carousel-btn-prev').click(function(){
            $carousel.trigger('prev.owl.carousel');
        });
        $carousel.closest('.carousel-container').find('.carousel-btn-next').click(function(){
            $carousel.trigger('next.owl.carousel');
        });
    });

    // project category tabs
    const projectTabs = document.querySelectorAll('[data-project-target]');
    projectTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = document.querySelector(tab.dataset.projectTarget);
            document.querySelectorAll('[data-project-content]').forEach(content => {
                content.classList.remove('projects__active');
            });
            target.classList.add('projects__active');
            projectTabs.forEach(t => t.classList.remove('projects__active'));
            tab.classList.add('projects__active');
            // refresh carousels inside the newly shown tab (hidden carousels mis-measure width)
            $(target).find('.carousel').trigger('refresh.owl.carousel');
        });
    });

    // service category tabs (Testing / Development)
    const servTabs = document.querySelectorAll('[data-serv-target]');
    servTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = document.querySelector(tab.dataset.servTarget);
            document.querySelectorAll('.serv-group').forEach(group => {
                group.classList.remove('serv-group--active');
            });
            target.classList.add('serv-group--active');
            servTabs.forEach(t => {
                t.classList.remove('serv-tab--active');
                t.setAttribute('aria-selected', 'false');
            });
            tab.classList.add('serv-tab--active');
            tab.setAttribute('aria-selected', 'true');
        });
    });

    // achievements carousel - 2 cards per view on desktop, 1 on mobile
    $('.achievements .carousel').each(function(){
        var $carousel = $(this);
        $carousel.owlCarousel({
            margin: 20,
            loop: false,
            autoplay: false,
            nav: false,
            responsive: {
                0:{
                    items: 1,
                    nav: false
                },
                900:{
                    items: 2,
                    nav: false
                }
            }
        });

        // Handle previous/next button clicks for this carousel only
        $carousel.closest('.carousel-container').find('.carousel-btn-prev').click(function(){
            $carousel.trigger('prev.owl.carousel');
        });
        $carousel.closest('.carousel-container').find('.carousel-btn-next').click(function(){
            $carousel.trigger('next.owl.carousel');
        });
    });

    // achievement category tabs
    const achievementTabs = document.querySelectorAll('[data-achv-target]');
    achievementTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = document.querySelector(tab.dataset.achvTarget);
            document.querySelectorAll('[data-achv-content]').forEach(content => {
                content.classList.remove('achievements__active');
            });
            target.classList.add('achievements__active');
            achievementTabs.forEach(t => t.classList.remove('achievements__active'));
            tab.classList.add('achievements__active');
            // refresh carousels inside the newly shown tab (hidden carousels mis-measure width)
            $(target).find('.carousel').trigger('refresh.owl.carousel');
        });
    });

    // Achievements: open details modal when 'View Details' clicked
    $(document).on('click', '.achv-view-btn', function(e){
        e.preventDefault();
        var $card = $(this).closest('.achv-card');
        var title = $card.find('.achv-header h3').text().trim();
        var img = $card.data('img') || $card.find('img').attr('src') || '';
        var contribution = $card.data('contribution') || '';
        var bodyHtml = '';
        if(img) bodyHtml += '<div class="achv-img-wrap"><a href="'+img+'" target="_blank" rel="noopener" title="Open full size"><img src="'+img+'" alt="certificate" class="achv-modal-img"/></a></div>';
        bodyHtml += '<div class="achv-modal-contribution"><p>'+contribution+'</p></div>';
        $('#achvModal .modal-title').text(title);
        $('#achvModal .modal-body').html(bodyHtml);
        $('#achvModal').fadeIn(180);
    });

    // Horizontal scroller disabled - achievements now use grid layout
    // (Previous carousel code removed)

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

    // Achievement modal close handlers
    $(document).on('click', '#achvModal .modal-close', function(){
        $('#achvModal').fadeOut(120);
    });
    $(document).on('click', '#achvModal', function(e){ if(e.target === this) $('#achvModal').fadeOut(120); });
    
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