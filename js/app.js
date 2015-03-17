(function() {
  var app = {
    config: {
      capsLockClass: 'caps-lock'
    },
    init: function() {
      var chars = document.querySelectorAll('main > span'),
        capsLock = document.querySelector('#caps-lock');

      for (var i = 0; i < chars.length; i++) {
        chars[i].addEventListener('click', function(e) {
          var key = navigator.userAgent.indexOf('Mac OS X') != -1 ? '⌘' : 'Ctrl';

          window.prompt('Press ' + key + '+c and hit Enter ⏎', this.innerText);

          e.preventDefault();
        });
      }

      capsLock.addEventListener('change', this.capsLock);

      document.addEventListener('keyup', function(e) {
        if (e.keyCode === 16) {
          if (app.capsLock()) {
            capsLock.setAttribute('checked', true);
          }
          else {
            capsLock.removeAttribute('checked');
          }
        }
      });
    },
    capsLock: function() {
      if (!document.body.classList.contains(app.config.capsLockClass)) {
        document.body.classList.add(app.config.capsLockClass);

        return true;
      }
      else {
        document.body.classList.remove(app.config.capsLockClass);

        return false;
      }
    }
  };

  window.addEventListener('DOMContentLoaded', function() {
    app.init();
  });
})();
