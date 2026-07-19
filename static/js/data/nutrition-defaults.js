export const defaultNutritionLog = [
  { name:'Desayuno', kcal:450, foods:[
    { name:'Avena 80g + plátano', p:12, c:65, f:6 },
    { name:'Huevos revueltos 3u', p:18, c:2, f:12 }
  ]},
  { name:'Almuerzo', kcal:650, foods:[
    { name:'Arroz integral 150g', p:5, c:55, f:2 },
    { name:'Pechuga de pollo 180g', p:45, c:0, f:4 }
  ]},
  { name:'Colación post-gym', kcal:300, foods:[
    { name:'Batido proteico 30g', p:25, c:8, f:3 },
    { name:'Fruta', p:1, c:25, f:0 }
  ]}
];

export const supplements = [
  { name:'Lion\'s Mane', brand:'Mycosalud', dose:'1ml tinctura', time:'Mañana en ayunas', key:'lm' },
  { name:'Cordyceps', brand:'Mycosalud', dose:'1ml tinctura', time:'Pre-entrenamiento', key:'cord' },
  { name:'Reishi', brand:'Mycosalud', dose:'1ml tinctura', time:'Noche', key:'rei' },
  { name:'Creatina monohidrato', brand:'Foodtech.cl', dose:'5g', time:'Post-entrenamiento', key:'creat' }
];
