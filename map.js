ymaps.ready(function(){
    // Создание карты.
    // var myMap = new ymaps.Map("map", {
    //     // Координаты центра карты.
    //     // Порядок по умолчнию: «широта, долгота».
    //     // Чтобы не определять координаты центра карты вручную,
    //     // воспользуйтесь инструментом Определение координат.
    //     center: [55.79242842087626,37.583253929583734],
    //     // Уровень масштабирования. Допустимые значения:
    //     // от 0 (весь мир) до 19.
    //     zoom: 17,
    //     controls: ['routeButtonControl','typeSelector', 'zoomControl', 'trafficControl', 'fullscreenControl']
    //
    // });

    ymaps.ready(['AnimatedLine']).then(init);

    function init(ymaps) {
        // Создаем карту.
        var myMap = new ymaps.Map("map", {
            center: [55.79242842087626,37.583253929583734],
            zoom: 17

        }, {
            searchControlProvider: 'yandex#search'
        });
        myMap.behaviors.disable('scrollZoom');
        // Создаем ломаные линии.
        var firstAnimatedLine = new ymaps.AnimatedLine([
            [55.79341234282752,37.58440221828106],
            [55.793344910544405,37.58428792117689],
            [55.792744434450235,37.58442635815707],
            [55.79256007762369,37.58345539849368],
            [55.79191436461359,37.58365872793193],
            [55.791908320012006,37.583428057956645],
            [55.79181765087514,37.58343610458369]

        ], {}, {
            // Задаем цвет.
            strokeColor: "#ED3606",
            // Задаем ширину линии.
            strokeWidth: 5,
            strokeStyle: {
                style: 'dot',
                offset: 10
            },
            // Задаем длительность анимации.
            animationTime: 4000
        });
        var secondAnimatedLine = new ymaps.AnimatedLine([
            [55.761223661714205, 37.57854299428123],
            [55.76129474190374, 37.57836060406823],
            [55.76149285834102, 37.57855640532632],
            [55.76173267134118, 37.57864573959325],
            [55.761782872763874, 37.578559582240004],
            [55.7622647306412, 37.57857741008619],
            [55.76247342821094, 37.57840038429122],
            [55.762818964832924, 37.57765342764373],
            [55.76292179998886, 37.57748713068481],
            [55.762890042102114, 37.577167947812036],
            [55.76292179998886, 37.576878269238435],
            [55.763076052212064, 37.57669587902541],
            [55.76309672830313, 37.57723949881904]
        ], {}, {
            strokeColor: "#1E98FF",
            strokeWidth: 5,
            animationTime: 4000
        });
        // Добавляем линии на карту.
        myMap.geoObjects.add(firstAnimatedLine);
        myMap.geoObjects.add(secondAnimatedLine);
        // Создаем метки.
        var firstPoint = new ymaps.Placemark([55.79341234282752,37.58440221828106], {}, {
            preset: 'islands#redRapidTransitCircleIcon'
        });
        var secondPoint = new ymaps.Placemark([55.76127880650197, 37.57839413202077], {}, {
            preset: 'islands#blueMoneyCircleIcon'
        });
        var thirdPoint = new ymaps.Placemark([55.79167889302968,37.58309299704284], {}, {
                iconLayout: 'default#image',
                // Своё изображение иконки метки.
                iconImageHref: 'img/point.png',
                // Размеры метки.
                iconImageSize: [30, 42],
                // Смещение левого верхнего угла иконки относительно
                // её "ножки" (точки привязки).
                iconImageOffset: [-5, -38]
        },
            {
                // Опции.
                // Необходимо указать данный тип макета.
                iconLayout: 'default#image',
                // Своё изображение иконки метки.
                iconImageHref: 'img/point.png',
                // Размеры метки.
                iconImageSize: [30, 42],
                // Смещение левого верхнего угла иконки относительно
                // её "ножки" (точки привязки).
                iconImageOffset: [-5, -38]
            });
        // Функция анимации пути.
        function playAnimation() {
            // Убираем вторую линию.
            //secondAnimatedLine.reset();
            // Добавляем первую метку на карту.
            myMap.geoObjects.add(firstPoint);
            // Анимируем первую линию.
            firstAnimatedLine.animate()
                // После окончания анимации первой линии добавляем вторую метку на карту и анимируем вторую линию.
                .then(function() {
                    myMap.geoObjects.add(secondPoint);
                    //return secondAnimatedLine.animate();
                })
                // После окончания анимации второй линии добавляем третью метку на карту.
                .then(function() {
                    myMap.geoObjects.add(thirdPoint);
                    // Добавляем паузу после анимации.
                    return ymaps.vow.delay(null, 2000);
                })
                // После паузы перезапускаем анимацию.
                .then(function() {
                    // Удаляем метки с карты.
                    myMap.geoObjects.remove(firstPoint);
                    myMap.geoObjects.remove(secondPoint);
                    myMap.geoObjects.remove(thirdPoint);
                    // Убираем вторую линию.
                    //secondAnimatedLine.reset();
                    // Перезапускаем анимацию.
                    playAnimation();
                });
        }
        // Запускаем анимацию пути.
        playAnimation();
    }






    //myMap.behaviors.disable('scrollZoom');

    //var control = myMap.controls.get('routeButtonControl');

    // Откроем панель для построения маршрутов.
   //a control.state.set('expanded', false);



    var myPlacemark = new ymaps.Placemark([55.79167889302968,37.58309299704284], {
        // Хинт показывается при наведении мышкой на иконку метки.
        iconCaption: 'Еда для тебя',

        balloonContentHeader: 'Еда для тебя',
        // Балун откроется при клике по метке.
        balloonContent: 'Еда для тебя </br><i class="fa fa-map-marker-alt"></i> Москва, ул. Нижняя Масловка, 5'+
            '</br><i class="fa fa-phone"></i> +7 977 744-14-45'
    },

        {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: 'img/point.png',
            // Размеры метки.
            iconImageSize: [30, 42],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-5, -38]
        });

// После того как метка была создана, ее
// можно добавить на карту.
    //myMap.geoObjects.add(myPlacemark);

});


ymaps.modules.define('AnimatedLine', [
    'util.defineClass',
    'Polyline',
    'vow'
], function(provide, defineClass, Polyline, vow) {
    /**
     * @fileOverview Анимированная линия.
     */
    /**
     * Создает экземпляр анимированной линии.
     * @class AnimatedLine. Представляет собой геообъект с геометрией geometry.LineString.
     * @param {Boolean} [options.animationTime = 4000] Длительность анимации.
     **/
    function AnimatedLine(geometry, properties, options) {
        AnimatedLine.superclass.constructor.call(this, geometry, properties, options);
        this._loopTime = 50;
        this._animationTime = this.options.get('animationTime', 4000);
        // Вычислим длину переданной линии.
        var distance = 0;
        var previousElem = geometry[0];
        this.geometry.getCoordinates().forEach(function(elem) {
            distance += getDistance(elem, previousElem);
            previousElem = elem;
        });
        // Вычислим минимальный интервал отрисовки.
        this._animationInterval = distance / this._animationTime * this._loopTime;
        // Создадим массив с более частым расположением промежуточных точек.
        this._smoothCoords = generateSmoothCoords(geometry, this._animationInterval);
    }
    defineClass(AnimatedLine, Polyline, {
        // Анимировать линию.
        start: function() {
            var value = 0;
            var coords = this._smoothCoords;
            var line = this;
            var loopTime = this._loopTime;
            // Будем добавлять по одной точке каждые 50 мс.
            function loop(value, currentTime, previousTime) {
                if (value < coords.length) {
                    if (!currentTime || (currentTime - previousTime) > loopTime) {
                        line.geometry.set(value, coords[value]);
                        value++;
                        previousTime = currentTime;
                    }
                    requestAnimationFrame(function(time) {
                        loop(value, time, previousTime || time)
                    });
                } else {
                    // Бросаем событие окончания отрисовки линии.
                    line.events.fire('animationfinished');
                }
            }

            loop(value);
        },
        // Убрать отрисованную линию.
        reset: function() {
            this.geometry.setCoordinates([]);
        },
        // Запустить полный цикл анимации.
        animate: function() {
            this.reset();
            this.start();
            var deferred = vow.defer();
            this.events.once('animationfinished', function() {
                deferred.resolve();
            });
            return deferred.promise();
        }

    });
    // Функция генерации частых координат по заданной линии.
    function generateSmoothCoords(coords, interval) {
        var smoothCoords = [];
        smoothCoords.push(coords[0]);
        for (var i = 1; i < coords.length; i++) {
            var difference = [coords[i][0] - coords[i - 1][0], coords[i][1] - coords[i - 1][1]];
            var maxAmount = Math.max(Math.abs(difference[0] / interval), Math.abs(difference[1] / interval));
            var minDifference = [difference[0] / maxAmount, difference[1] / maxAmount];
            var lastCoord = coords[i - 1];
            while (maxAmount > 1) {
                lastCoord = [lastCoord[0] + minDifference[0], lastCoord[1] + minDifference[1]];
                smoothCoords.push(lastCoord);
                maxAmount--;
            }
            smoothCoords.push(coords[i])
        }
        return smoothCoords;
    }
    // Функция нахождения расстояния между двумя точками на плоскости.
    function getDistance(point1, point2) {
        return Math.sqrt(
            Math.pow((point2[0] - point1[0]), 2) +
            Math.pow((point2[1] - point1[1]), 2)
        );
    }
    provide(AnimatedLine);
});