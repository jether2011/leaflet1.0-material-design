$( document ).ready(function(){   
    var dialogButton = document.querySelector('.login');

    var closeChartButton = $('.close-login').on('click', function(){
        dialog.close();
    });
    
    var dialog = document.querySelector('#dialog-login');
    if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }

    dialogButton.addEventListener('click', function() {
       dialog.showModal();
       initChart();
    });   
});
