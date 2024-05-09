// Framework'ü oluşturun
var Lib = function(selector) {
    var self = this;

    function getElements(selector) {
        if (selector instanceof HTMLElement) {
            return [selector];
        } else if (typeof selector === 'string') {
            return Array.from(document.querySelectorAll(selector));
        } else {
            return [];
        }
    }

    self.elements = getElements(selector);

    self.addClass = function(className) {
        self.elements.forEach(function(el) {
            el.classList.add(className);
        });
        return self;
    };

    self.removeClass = function(className) {
        self.elements.forEach(function(el) {
            el.classList.remove(className);
        });
        return self;
    };

    self.toggleClass = function(className) {
        self.elements.forEach(function(el) {
            el.classList.toggle(className);
        });
        return self;
    };

    self.css = function(property, value) {
        self.elements.forEach(function(el) {
            if (typeof property === 'object') {
                Object.assign(el.style, property);
            } else {
                el.style[property] = value;
            }
        });
        return self;
    };

    self.listen = function(eventName, callback) {
        self.elements.forEach(function(el) {
            el.addEventListener(eventName, callback);
        });
        return self;
    };

    self.FormValidation = function(options) {
        var form = self.elements[0]; // İlk seçilen formu al
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Formun otomatik gönderimini engelle
            var isValid = true; // Geçerlilik durumunu izle
            options.fields.forEach(function(field) {
                var input = form.querySelector(field.selector); // Alanı seç
                if (!input.checkValidity()) {
                    // Alan geçerli değilse, hata mesajını göster
                    var errorMessage = field.errorMessage || input.validationMessage;
                    console.error(errorMessage); // Hata mesajını konsola yaz
                    // Hata mesajını kullanıcıya göstermek için uygun bir yöntem kullan
                    isValid = false; // Form geçersiz
                } else if (input.value.trim() === '') {
                    // Alan boşsa, uyarı göster
                    alert(field.emptyMessage || 'Lütfen tüm alanları doldurun.');
                    isValid = false;
                     // Form geçersiz
                }
                if (!isValid) {
                    event.preventDefault(); 
                }
            });
            if (isValid) {
                // Eğer form geçerliyse, submit işlemini gerçekleştir
                form.submit();
                alert("Form İşleminiz Tamamlanmıştır...")
                console.log("Form İşleminiz Tamamlanmıştır...")
            }
            else{
                alert("Maalesef Tamamlanamamıştır...")
            }
        });
        return self;
    };

    self.toggleMenu = function(menuSelector, toggleSelector) {
        var menu = document.querySelector(menuSelector);
        var toggleButton = document.querySelector(toggleSelector);

        if (!menu || !toggleButton) return;

        toggleButton.addEventListener('click', function() {
            menu.parentElement.classList.toggle('active'); 
        });

        return self;
    };
    

    return self;
};

var es = function(selector) {
    return new Lib(selector);
};



// 1- DARK LIGHT MODE MAKING
// BURDA "es" bir class veya id seçici için kullanılır
// "listener" ise belirli bir olay turunu (click,mouseover) için dinleyıcı gorevi görür


es("#buton").listen("click", function() {
    
    var body = es("body");
    if (body.elements[0].style.backgroundColor === "black") {
        body.css("backgroundColor", "white");
    } else {
        body.css("backgroundColor", "black");
    }
});


es("#mod").listen("click", function() {
    
    var body = es("body");
    var paragraf=es("p")
    var baslik=es("h1")
    var seoul=es("#seoul")
    var label=es("label")
    if (body.elements[0].style.backgroundColor === "black") {
        body.css("backgroundColor", "white");
        paragraf.css("color","black")
        baslik.css("color","black")
        seoul.css("color","black")
        seoul.css("color","black")
        label.css("color","black")
    } 
    
    else {
        body.css("backgroundColor", "black");
        paragraf.css("color","white")
        baslik.css("color","white")
        seoul.css("color","black")
        label.css("color","white")
    }
});



es('#form').FormValidation({
    fields: [
        { selector: '#name', errorMessage: 'Lütfen adınızı girin.' },
        { selector: '#email', errorMessage: 'Lütfen geçerli bir e-posta adresi girin.' },
        { selector: '#message', errorMessage: 'Lütfen bir mesaj girin.' }
    ]
});


es('.hamburger-menu').toggleMenu('.hamburger-menu .menu', '.hamburger-menu .menu-toggle');
es('#menu-2').toggleMenu('#menu-2 .menu', '#menu-2 .menu-toggle');
es('#menu-3').toggleMenu('#menu-3 .menu', '#menu-3 .menu-toggle');