
//global vars

var menu_window;

//evnts

var attachedEvents = function(){

  $('#btnMenu').off('click').on('click', function() {

    //renderDefault in pop up window
    'var windowProfile = 'width=800,height=600,left =300,top =100';'

    //open window
    menu_window = window.open('menu-window.html','menuWin','toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0,' + windowProfile);

  });

}

//renders

var renderHome = function() {

    var tplToCompile = $('#tpl_home').html();

    var compiled = _.template(tplToCompile, {
        data: 'menu'
    });

    $('#view').html(compiled);

    attachedEvents();
}


renderHome();
