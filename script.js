
const QT1 = 3;
const QT2 = 2;
var quiz = {
    tab1: table1(),
    tab2: table2(),
    tabAll: table1().concat(table2()),
    lastQ: 0,
    endQuizText: "Du hast alle Fragen beantwortet, Danke und viel erfolge",
    q: [],

    btnStart: function () {
        var btnStart = document.createElement('button');
        var div = document.createElement('div');

        btnStart.setAttribute("type", "button");
        btnStart.setAttribute("id", "btnStart");
        btnStart.innerHTML = 'start';
        document.querySelectorAll('#start')[0].appendChild(btnStart);

        div.id = 'quizDiv';
        document.querySelectorAll('#container')[0].appendChild(div);
        quiz.lastQ = 0;
        quiz.setQ();
    },
    btnNext: function () {
        var btnNext = document.createElement('button');
        btnNext.setAttribute("type", "button");
        btnNext.setAttribute("id", "btnNext");
        btnNext.innerHTML = 'Next';
        btnNext.style.display = 'none';
        document.querySelectorAll('#container')[0].appendChild(btnNext);
    },
    setQ: function () {
        quiz.btnNext();
        var btnStart = document.querySelectorAll('#btnStart')[0];
        var btnNextEl = document.getElementById('btnNext');

        btnStart.onclick = function () {
            quiz.setQ();
            document.querySelectorAll('#quizDiv')[0].innerHTML = '';
            for (var i = 0; i < ( QT1 + QT2 ); i++) {
                quiz.quizDiv(quiz.q[i], quiz.tabAll);
                if ( i == 0) {
                    document.querySelectorAll('.lastQ')[0].innerHTML = quiz.lastQ + 1 + '/';
                    var el = document.querySelectorAll('.quizText')[0];
                    el.style.display = 'inline-block';
                    quiz.lastQ = i;
                    document.getElementById('btnStart').style.display = 'none';
                    document.getElementById('btnNext').style.display = 'inline-block';
                }
            }
        }
        btnNextEl.onclick = function() {
            var el = document.querySelectorAll('.quizText');
            el[quiz.lastQ].style.display = 'none';
            quiz.lastQ = quiz.lastQ + 1;
            document.querySelectorAll('.lastQ')[0].innerHTML = quiz.lastQ + 1 + '/';
            el[quiz.lastQ].style.display = 'inline-block';
            if (quiz.lastQ == 4 ){
                document.getElementById('btnNext').style.display = 'none';
                quiz.endQuiz();
            }
        };

        for (var i = 0; i < (QT1 + QT2); i++) {
            if ( i < QT1 ) {
                quiz.q.push(this.randomQ( 1, quiz.tab1.length));
            } else {
                quiz.q.push(this.randomQ( quiz.tab1.length, quiz.tab2.length));
            }
        }
        this.shuffleArray( quiz.q);
    },

    randomQ: function (start, end)  {
        var result = Math.floor(Math.random() * end+1) + start;
        if ( this.q.length ) {
            for (var i = 0; i <= this.q.length; i++) {
                if (result == this.q[i]) {
                    return this.randomQ(start, end);
                }
            }
        }
        return result;
    },
    shuffleArray: function (inputArray){ // melange notre tableau
        inputArray.sort(()=> Math.random() - 0.5);
    },
    quizDiv: function (index, table) {
        var el = document.createElement('div');
        el.innerHTML = 'Q'+ index + ': ' +table[index];
        el.id = 'q' + index;
        el.classList.add('quizText');
        el.style.fontSize = '2em';
        el.style.display = 'none';
        document.querySelectorAll('#quizDiv')[0].appendChild(el);
    },
    endQuiz: function() {
        var el = document.createElement( "div" );
        el.innerHTML = "Du hast alle Fragen beantwortet, Danke und viel erfolge";
        el.classList.add('endText');
        el.style.fontSize = '2em';
        document.querySelectorAll('#quizDiv')[0].appendChild( el );
        quiz.btnNew();
        quiz.restartQ();
    },
    btnNew: function () {
        var btnNewEl = document.createElement('button');
        btnNewEl.setAttribute("type", "button");
        btnNewEl.setAttribute("id", "btnNew");
        btnNewEl.innerHTML = 'ReStart';
        document.querySelectorAll('#start')[0].appendChild(btnNewEl);
    },
    restartQ: function () {
        var el = document.querySelectorAll('#btnNew')[0];
        el.onclick = function() {
            document.querySelectorAll('.lastQ')[0].innerHTML = '';
            document.querySelectorAll('#container')[0].innerHTML = '';
            document.querySelectorAll('#start')[0].innerHTML = '';
            quiz.btnStart();
        }
    }
};
quiz.btnStart();



/*
100 Fragen ( Themenbereich)
block 1-65
block 66-100

start Prüfung:
Es wird eine Frage nach der anderen (klick "nächste Frage") ausgegeben

Fragen aus block 1 und 2 Fragen aus block 2 (per Zufall)
keine doppelten fragen

---------
1. Fragen ins HTML od. Array/Objekt (2.Blöcke?)
2. Button Click (EventListener)
3. Bereich für Ausgabe (od. ein/ausblenden)
4. Zufallsgenerator
    4.1 3x 1-65 danach 2x 66-100
    4.2 doppelten weg und neu ermitteln
    4.3 durchmischen, shuffle... (google kennt Lösungen)
5. keine doppelten!!! merken welche man schon hat
6. nach der 5ten is Schluss..

*/