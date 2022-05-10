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
});