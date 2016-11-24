'use strict';

function showEventPanel(event){
  event.preventDefault();

  var height= $(document).height();
  var navheight= $('#navbar').height();
  var setHeightTo= height - navheight;

  $('#page-wrapper').toggleClass('show');

  if($('#page-wrapper').hasClass('show')){
    /* set height */
    $('#events').height(setHeightTo);
    $('#page-wrapper').height(setHeightTo);

    // start animation
    $('#events').show().animate({
      width: 240,
    },{
      duration: 200,
      easing:  'easeOutCubic' ,
      complete: function() {
        $('#events .content').fadeIn();
      }
    });
    $('#page-wrapper').width($('#page-wrapper').width()-240);
  }else{
    $('#events .content').hide();
    $('#events').hide();
    $('#events').height(0);
    $('#events').width(0);
    $('#page-wrapper').width($('#page-wrapper').width()+240);
    resetNavbarLinkMenu();
  }
}

/*** manage the click on the navbar menu item and set it to selected state ***/
function setNavbarLinkStatus(event){
  event.preventDefault();
  var me=  this;
  $.each($('#navbar .nav-menuitem'),function(){
    if(me === this){
      if($(this).attr('data-item-selection') === 'true'){
        $(this).toggleClass('selected');
      }
    }else if($(this).hasClass('selected')){
      $(this).removeClass('selected');
    }
  });
}


/*** this function open the actions-menu when the navbar button was clicked ***/
function showActionsMenu(event){
  var targetId= $(this).attr('data-panel');
  $('#'+targetId).addClass('show-in');
  $(this).parent().addClass('open');
}

/*** close the action menu box when the button close was clicked ***/
function closePanel(event){
  var targetId= $(this).attr('data-panel');
  $('#'+targetId).removeClass('show-in');
  $('#'+targetId).parent().removeClass('open');
}


/* this function manage the click out of the action-menu box */
function hideAllActionsMenu(event){
  console.log('hide all action menu');
  var isActionMenu = $(event.target).parent().is('a') && $(event.target).parent().attr('data-toggle') == 'actions-menu';

  if(!isActionMenu && !$(event.target).closest('.actions-menu').length){
    resetNavbarLinkMenu();
  }
}

function resetNavbarLinkMenu(){
  console.log('reset menunav');
  $('.show-in').removeClass('show-in');
  $('.show-in').parent().removeClass('open');
  $('.navbar-top-links li.open').removeClass('open');
  $('.navbar-top-links .selected').removeClass('selected');
}


$(document).ready(function(){

  $('.selectpicker').selectpicker();

  /*** dynamic holder event ***/
  $('.nav .notif, #events .btn-close').off('click');
  $('.nav .notif, #events .btn-close').on('click',showEventPanel);

  /*** manage the event on click out panel menu ***/
  $('html').off('click');
  $('html').on('click',hideAllActionsMenu);


  /*** navbar link events ***/
  $('#navbar .nav-menuitem').off('click');
  $('#navbar .nav-menuitem').on('click',setNavbarLinkStatus);

  /*** manager the panel menu ***/
  $('a[data-toggle="actions-menu"]').off('click');
  $('a[data-toggle="actions-menu"]').on('click',showActionsMenu);

  /*** hide the panel menu ***/
  $('#navbar .panel .actions .btn-close').off('click');
  $('#navbar .panel .actions .btn-close').on('click',closePanel);

  $( ".spinner" ).spinner({min:0});

  //$('.layout-scrollbar').scrollbar({showArrows:true});

  $('.scrollbar-inner').scrollbar({});


});
