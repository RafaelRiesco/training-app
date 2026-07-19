export const testsData = {
  lun: [
    {
      num:'1', name:'Peso muerto convencional — 5RM', sub:'Barra olímpica · Zona de pesos libres · ~35 min',
      badge:'Lunes', note:'Sin referencia previa → empieza el intento 5RM con 60 kg.',
      series:[
        ['Calentamiento','Barra sola — 20 kg','8','2 min'],
        ['Aproximación 1','~40% estimado','5','2 min'],
        ['Aproximación 2','~60% estimado','3','3 min'],
        ['Aproximación 3','~75% estimado','2','3 min'],
        ['Aproximación 4','~85% estimado','1','4 min'],
        ['🎯 Intento 5RM','~95–100% estimado','5','—']
      ],
      cues:[{g:true,t:'Espalda neutra en todo momento'},{g:true,t:'Barra pegada al cuerpo'},{g:true,t:'Caderas y hombros suben juntos'},{g:false,t:'No redondear la espalda baja'},{g:false,t:'No subir caderas antes que hombros'}]
    },
    {
      num:'2', name:'Sentadilla goblet — 5RM', sub:'Mancuerna o kettlebell · ~20 min',
      badge:'Lunes', note:'90/90 hip stretch 60 seg/lado antes de empezar.',
      series:[
        ['Calentamiento','10 kg','10','90 seg'],
        ['Aproximación 1','16–20 kg','6','2 min'],
        ['Aproximación 2','24–28 kg','3','2 min'],
        ['🎯 Intento 5RM','+4–6 kg más','5','—']
      ],
      cues:[{g:true,t:'Muslos paralelos o por debajo'},{g:true,t:'Talones en contacto con el suelo'},{g:true,t:'Rodillas traccionan hacia afuera'},{g:false,t:'No cuenta si es sentadilla parcial'}]
    },
    {
      num:'3', name:'Hip thrust — 5RM', sub:'Barra + banco · ~20 min',
      badge:'Lunes', note:'Sin referencia → intento 5RM con 70–80 kg. El hip thrust permite cargas mayores al peso muerto.',
      series:[
        ['Calentamiento','Peso corporal','15','60 seg'],
        ['Aproximación 1','20–30 kg','10','90 seg'],
        ['Aproximación 2','40–50 kg','6','2 min'],
        ['Aproximación 3','60–70 kg','3','2 min'],
        ['🎯 Intento 5RM','+10–15 kg más','5','—']
      ],
      cues:[{g:true,t:'Espalda apoyada a nivel de omóplatos'},{g:true,t:'Pausa 1 seg arriba con glúteos apretados'},{g:true,t:'Rodillas a 90° en la posición alta'},{g:false,t:'No arquear la lumbar para ganar altura'}]
    },
    {
      num:'4', name:'Single leg RDL — referencia de control motor', sub:'Mancuerna contralateral · ~15 min · No es 5RM',
      badge:'Lunes', note:'Medimos el peso con el que puedes hacer 8 reps limpias/lado con cadera cuadrada. No fuerza máxima.',
      series:[
        ['Calentamiento','Sin peso','8/lado','60 seg'],
        ['Aproximación 1','6–8 kg','8/lado','90 seg'],
        ['Aproximación 2','10–12 kg','8/lado','90 seg'],
        ['🎯 Referencia','Máximo con técnica perfecta × 8','8/lado','—']
      ],
      cues:[{g:true,t:'Mancuerna en mano opuesta al pie de apoyo'},{g:true,t:'Cadera cuadrada durante todo el movimiento'},{g:true,t:'Punto fijo en el suelo para el equilibrio'},{g:false,t:'No rotar la cadera hacia afuera'}]
    }
  ],
  mie: [
    {
      num:'1', name:'Dominadas — confirmación de baseline', sub:'Barra de dominadas · Agarre prono · Ya conocido: 10–11 reps',
      badge:'Miércoles', note:'Tu baseline ya está establecido. Solo confirmar el número con técnica estricta.',
      series:[
        ['Calentamiento','Shoulder CARs + jalón ligero','—','3 min'],
        ['🎯 Test máx','Peso corporal — técnica estricta','Máx','—']
      ],
      cues:[{g:true,t:'Extensión completa de codos abajo'},{g:true,t:'Mentón sobre la barra arriba'},{g:true,t:'Bajada controlada — sin caer'},{g:false,t:'Sin kipping ni impulso de piernas'}]
    },
    {
      num:'2', name:'Press overhead de pie — 5RM', sub:'Barra + rack · Siempre de pie · ~25 min',
      badge:'Miércoles', note:'Sin referencia → empieza el intento 5RM con 30–35 kg.',
      series:[
        ['Calentamiento','Barra sola — 20 kg','10','2 min'],
        ['Aproximación 1','25–27 kg','5','2 min'],
        ['Aproximación 2','30–32 kg','3','3 min'],
        ['Aproximación 3','35–37 kg','2','3 min'],
        ['🎯 Intento 5RM','+4–5 kg más','5','—']
      ],
      cues:[{g:true,t:'Siempre de pie — nunca sentado'},{g:true,t:'Core activo durante todo el movimiento'},{g:false,t:'No arquear la lumbar al empujar'},{g:false,t:'No usar impulso de piernas'}]
    },
    {
      num:'3', name:'Remo con mancuerna — 8RM', sub:'Banco plano + mancuerna · ~15 min',
      badge:'Miércoles', note:'Testeamos 8RM (no 5RM) porque así se trabaja en el programa — series de 10.',
      series:[
        ['Calentamiento','10–12 kg','12/lado','60 seg'],
        ['Aproximación 1','16–18 kg','10/lado','90 seg'],
        ['Aproximación 2','20–22 kg','8/lado','90 seg'],
        ['🎯 Intento 8RM','+2–4 kg más','8/lado','—']
      ],
      cues:[{g:true,t:'Espalda paralela al suelo'},{g:true,t:'Tira el codo hacia la cadera'},{g:true,t:'Pausa 1 seg arriba en cada rep'},{g:false,t:'No rotar el tronco para ganar rango'}]
    },
    {
      num:'4', name:'Push-ups — máximo de reps', sub:'Sin implementos · Suelo · ~10 min',
      badge:'Miércoles', note:'5 min de pausa después del remo. Para cuando falla la técnica — no cuando duela.',
      series:[
        ['🎯 Test máx','Peso corporal — técnica estricta','Máx','—']
      ],
      cues:[{g:true,t:'Cuerpo recto de talones a nuca'},{g:true,t:'Pecho toca o roza el suelo'},{g:true,t:'Codos a 45° — no 90°'},{g:false,t:'No dejar caer la cadera'}]
    }
  ],
  vie: [
    {
      num:'1', name:'Medidas corporales — 7 puntos', sub:'Cinta métrica · En ayunas antes del test · ~10 min',
      badge:'Viernes en ayunas', note:'Misma hora siempre. Antes de desayunar. Después de ir al baño. Sin ropa que comprima.',
      series:[
        ['Punto 1','Cuello','Más estrecho bajo la nuez','—'],
        ['Punto 2','Hombros','Más ancho con brazos relajados','—'],
        ['Punto 3','Pecho','A la altura de los pezones','—'],
        ['Punto 4','Cintura','2–3 cm sobre el ombligo, sin meter el abdomen','—'],
        ['Punto 5','Abdomen','A la altura del ombligo, relajado','—'],
        ['Punto 6','Cadera','Punto más ancho de glúteos','—'],
        ['Punto 7','Muslo','10 cm arriba de la rótula, pierna dominante','—']
      ],
      cues:[{g:true,t:'Misma cinta métrica siempre'},{g:true,t:'Marca el punto exacto la primera vez'},{g:true,t:'Cintura ÷ cadera → meta menor a 0.90'},{g:true,t:'Cintura ÷ altura → meta menor a 0.50'}]
    },
    {
      num:'2', name:'Test Cooper — remadora 12 minutos', sub:'Remadora Concept2 · Máxima distancia posible · ~25 min totales',
      badge:'Viernes', note:'Configura la remadora en modo tiempo: 12:00 min. RPE 7 los primeros 4 min → RPE 9 los últimos 4 min.',
      series:[
        ['Calentamiento','5 min remo suave','—','—'],
        ['🎯 Test','12 min — máxima distancia','—','—'],
        ['Vuelta calma','5 min suave hasta FC bajo 120','—','—']
      ],
      cues:[{g:true,t:'Ritmo constante — no sprint inicial'},{g:true,t:'Anotar distancia total en metros al terminar'},{g:false,t:'No salir demasiado fuerte en el primer minuto'}]
    },
    {
      num:'3', name:'Plancha frontal — tiempo máximo', sub:'Sin implementos · Suelo · Después del Cooper',
      badge:'Viernes', note:'10 min de descanso después del Cooper. Posición en codos. Para cuando la cadera suba o baje.',
      series:[
        ['🎯 Test máx','Posición en codos','Máx segundos','—']
      ],
      cues:[{g:true,t:'Cuerpo en línea recta desde talones'},{g:true,t:'Para cuando la cadera sube o baja'},{g:false,t:'No elevar los glúteos para aguantar más'}]
    }
  ]
};
