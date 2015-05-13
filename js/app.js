(function() {
  var app = {
    config: {
      capsLockClass: 'caps-lock'
    },
    init: function() {
      var chars = document.querySelectorAll('main > span'),
        capsLock = document.querySelector('#caps-lock'),
        input = document.querySelector('#input');

      for (var i = 0; i < chars.length; i++) {
        chars[i].addEventListener('click', function(e) {
          var char = this.getAttribute('data-char'),
              text = char ? char : this.textContent;

          input.value = input.value + text;
          input.focus();

          e.preventDefault();
        });
      }

      capsLock.addEventListener('change', this.capsLock);
      input.addEventListener('keydown', this.highlightChar);
      input.addEventListener('keyup', this.removeHighlightChar);

      document.addEventListener('keydown', this.capsLockTrigger);
      document.addEventListener('keyup', this.capsLockTrigger);
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
    },
    capsLockTrigger: function(e) {
      var capsLock = document.querySelector('#caps-lock');

      if (e.keyCode === 16) {
        if (app.capsLock()) {
          capsLock.setAttribute('checked', true);
        }
        else {
          capsLock.removeAttribute('checked');
        }
      }
    },
    highlightChar: function(e) {
      if (e.keyCode < 65 && e.keyCode > 90) {
        return;
      }

      var keyCode = e.keyCode,
          char = String.fromCharCode(keyCode).toLowerCase(),
          keyButton = [].filter.call(document.querySelectorAll('main span'), function(input) {
            return input.textContent === char || input.getAttribute('data-char') === char;
          });

      if (keyButton.length) {
        keyButton[0].classList.add('hover');
      }
    },
    removeHighlightChar: function(e) {
      var keyButtons = document.querySelectorAll('main span');

      for (var i = 0; i < keyButtons.length; i++) {
        keyButtons[i].classList.remove('hover');
      }
    }
  };

  window.addEventListener('DOMContentLoaded', function() {
    app.init();
  });
})();
