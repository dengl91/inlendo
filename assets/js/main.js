$( document ).ready(function() {

    new AirDatepicker('.earn__datepicker', {
        inline: true
    });

    const form_datepickers = document.querySelectorAll('.form__datepicker');

    form_datepickers.forEach((form_datepicker) => {
        new AirDatepicker(form_datepicker, {
            range: true,
            multipleDatesSeparator: ' - '
        });
    });

    $('[data-control]').on('click', function() {
        let target = $(this).data('control');
        $('.' + target).toggleClass('active');
    });

    $('[data-toggle]').on('click', function() {
        $(this).toggleClass('active');
    });

    $('[data-tab]').on('click', function() {
        $(this).addClass('active').siblings().removeClass('active');
    });
    
    $('[data-nav]').on('click', function() {
        $(this).addClass('active').siblings().removeClass('active');
        let index = $(this).index();
        let target = $(this).data('nav');
        $('.' + target).removeClass('active');
        $('.' + target).eq(index).addClass('active');
    });

    $('[data-unscroll]').on('click', function() {
        $('body').toggleClass('unscroll');
    });

    $('[data-amount]').on('click', function() {
        let value = $(this).data('amount');
        $(this).closest('form').find('input[type=number]').val(value);
    });

    $('[data-read]').on('click', function() {
        let prop = $(this).closest('.form').find('input').prop('readonly');
        $(this).closest('.form').find('input').attr('readonly', !prop).select();
    });

    $('.dash__btn').on('click', function(e) {
        e.preventDefault();
        $(this).closest('.dash__item').toggleClass('active');
    });

    $('.list__rows').on('click', '.list__dropdown', function() {
        $(this).closest('.list__row--haschild').toggleClass('active');
    });

    $('.bignav__item.active').attr('data-current', 1);
    $('.bignav').append('<div class="bignav__bullet"></div>');
    if( $('.bignav__bullet').length ){
        $('.bignav__bullet').css('left', $('.bignav__item.active').offset().left + $('.bignav__item.active').width() / 2 + 12 + 'px');
    }

    $('.bignav__item').on('mouseover', function() {
        let dir = 'prev';
        if( $(this).prev() && $(this).prev().attr('data-current') == 1 ){
            dir = 'next';
        }
        console.log(dir);
        $('.bignav__item').attr('data-current', 0);
        $(this).attr('data-current', 1);
        
        const cX = $(this).offset().left + $(this).width() / 2 + 12;
        if( dir == 'prev' ){
            $('.bignav__bullet').css('left', cX + 'px');
            $('.bignav__bullet').css('width', $(this).width() / 2 + $(this).next().width() / 2 + 24 + 'px');
        } else {
            $('.bignav__bullet').css('width', $(this).width() / 2 + $(this).prev().width() / 2 + 48 + 'px');
        }
        setTimeout(() => {
            $('.bignav__bullet').css('width', '24px');
            if( dir == 'next' ){
                $('.bignav__bullet').css('left', cX + 'px');
            }
        }, 400);
    });

    $('.select__all').on('click', function() {
        if ( $(this).closest('.select__dropdown').find('input:checkbox:not(:checked)').length > 0 ) {
            $(this).addClass('active');
            $(this).closest('.select__dropdown').find('input[type=checkbox]').prop('checked', true);
        } else {
            $(this).removeClass('active');
            $(this).closest('.select__dropdown').find('input[type=checkbox]').prop('checked', false);
        }
    });

    $('.select__btn').on('click', function() {
        $(this).closest('.select__dropdown').toggleClass('active');
        if ( $(this).text() == 'Show more' ) {
            $(this).text('Show less');
        } else {
            $(this).text('Show more');
        }
    });

    $('.select__dropdown label, .select__all').on('click', function() {
        let checked = $(this).closest('.select__dropdown').find('input:checkbox:checked').length;
        $(this).closest('.select__wrap').find('.select__title').text(checked + ' selected');
    });

    $('.filter__item').on('click', function() {
        let compare = 'asc';
        if ( $(this).attr('data-sort') == 'asc' ) {
            compare = 'desc';
            $(this).attr('data-sort', 'desc').siblings().attr('data-sort', '0');
        } else {
            $(this).attr('data-sort', 'asc').siblings().attr('data-sort', '0');
        }
        let index = $(this).index();
        let parse = $(this).data('parse');
        let result = $('.list__row').sort( (a, b) => {
            if ( !parse ) {
                var contentA = parseInt( $(a).find('> div').eq(index).text().replace(/[^0-9]/gi, '') );
                var contentB = parseInt( $(b).find('> div').eq(index).text().replace(/[^0-9]/gi, '') );
            } else {
                var contentA = $(a).find('> div').eq(index).text();
                var contentB = $(b).find('> div').eq(index).text();
            }
            console.log(contentA);
            if ( compare == 'asc' ) {
                return (contentA < contentB) ? -1 : (contentA > contentB) ? 1 : 0;
            } else {
                return (contentA > contentB) ? -1 : (contentA > contentB) ? 1 : 0;
            }
        });

        $('.list__rows').html(result);
    });

    $('.modal').on('mousedown', function(e) {
        if ( e.target !== this ) return;
        $(this).removeClass('active');
    });

    $('.card__slider').slick({
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2.5,
                    arrows: false
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1.5,
                    arrows: false
                }
            }
        ]
    });

    $('.project__gallery').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false
                }
            }
        ]
    });

    $('.roadmap__slider').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    arrows: false
                }
            }
        ]
    });

    $('label[for=file]').each(function() {
        let input    = $(this).find('input[type=file]');
        let fileName = $(this).find('span');

        input.on('change', function(e) {
            e.target.closest('label').classList.add('uploaded');
            let inputFile = e.target.files[0].name;
            fileName.text(inputFile);
        })
    });

    /* Custom select */

    var x, i, j, l, ll, selElmnt, a, b, c;
    /*look for any elements with the class "custom-select":*/
    x = document.getElementsByClassName("select__custom");
    l = x.length;
    for (i = 0; i < l; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    ll = selElmnt.length;
    /*for each element, create a new DIV that will act as the selected item:*/
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    /*for each element, create a new DIV that will contain the option list:*/
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < ll; j++) {
        /*for each option in the original select element,
        create a new DIV that will act as an option item:*/
        c = document.createElement("DIV");
        c.innerHTML = selElmnt.options[j].innerHTML;
        c.addEventListener("click", function(e) {
            /*when an item is clicked, update the original select box,
            and the selected item:*/
            var y, i, k, s, h, sl, yl;
            s = this.parentNode.parentNode.getElementsByTagName("select")[0];
            sl = s.length;
            h = this.parentNode.previousSibling;
            for (i = 0; i < sl; i++) {
            if (s.options[i].innerHTML == this.innerHTML) {
                s.selectedIndex = i;
                h.innerHTML = this.innerHTML;
                y = this.parentNode.getElementsByClassName("same-as-selected");
                yl = y.length;
                for (k = 0; k < yl; k++) {
                y[k].removeAttribute("class");
                }
                this.setAttribute("class", "same-as-selected");
                break;
            }
            }
            h.click();
        });
        b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function(e) {
        /*when the select box is clicked, close any other select boxes,
        and open/close the current select box:*/
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
        });
    }
    function closeAllSelect(elmnt) {
    /*a function that will close all select boxes in the document,
    except the current select box:*/
    var x, y, i, xl, yl, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    xl = x.length;
    yl = y.length;
    for (i = 0; i < yl; i++) {
        if (elmnt == y[i]) {
        arrNo.push(i)
        } else {
        y[i].classList.remove("select-arrow-active");
        }
    }
    for (i = 0; i < xl; i++) {
        if (arrNo.indexOf(i)) {
        x[i].classList.add("select-hide");
        }
    }
    }
    /*if the user clicks anywhere outside the select box,
    then close all select boxes:*/
    document.addEventListener("click", closeAllSelect);

});