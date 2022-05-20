new AirDatepicker('.earn__datepicker', {
    inline: true
})

$( document ).ready(function() {

    $('[data-control]').on('click', function() {
        let target = $(this).data('control');
        $('.' + target).toggleClass('active');
    });

    $('[data-toggle]').on('click', function() {
        $(this).toggleClass('active');
    });
    
    $('[data-nav]').on('click', function() {
        $(this).addClass('active').siblings().removeClass('active');
        let index = $(this).index();
        let target = $(this).data('nav');
        $('.' + target).removeClass('active');
        $('.' + target).eq(index).addClass('active');
    });

    $('[data-amount]').on('click', function() {
        let value = $(this).data('amount');
        $(this).closest('form').find('input[type=number]').val(value);
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

});