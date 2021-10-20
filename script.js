
const QT1 = 3;
const QT2 = 2;
var quiz = {
    tab1: table1(),
    tab2: table2(),
    q: [],
    setQ: function () {
        for (var i = 0; i < (QT1 + QT2); i++) {
            if ( i < QT1 ) {
                quiz.q.push(quiz.zufall( 1, quiz.tab1.length));
            } else {
                quiz.q.push(quiz.zufall( quiz.tab1.length, quiz.tab2.length));
            }
        }
        quiz.shuffleArray( quiz.q);
    },
    zufall: function (start, end)  {
        var result = Math.floor(Math.random() * end+1) + start;
        if ( this.q.length ) {
            for (var i = 0; i <= this.q.length; i++) {
                if (result == this.q[i]) {
                    return this.zufall(start, end);
                }
            }
        }
        return result;
    },
    shuffleArray: function (inputArray){
        inputArray.sort(()=> Math.random() - 0.5);
    },
    btn: document.querySelectorAll('button')
};


quiz.btn[0].onclick = function () {
    quiz.setQ();
    console.log(quiz.q);
}



/*
100 Fragen ( Themenbereich)
block 1-65
block 66-100

start Prüfung:
Es wird eine frage nach der anderen (klick "nächste Frage") ausgegeben

Fragen aus block 1 und 2 Fragen aus block 2 (per Zufall)
Keine doppelten fragen

---------
1. Fragen ins HTML od. Array/Objekt (2.Blöcke?)
2. Button Click (EventListener)
3. Bereich für Ausgabe (od. ein/ausblenden)
4. Zufallsgenerator
    4.1 3x 1-65 danach 2x 66-100
    4.2 doppelten weg und neu ermitteln
    4.3 durchmischen, shuffle... (google kennt Lösungen)
5. keine dopplten!!! merken welche man schon hat
6. nach der 5ten is Schluss..

*/