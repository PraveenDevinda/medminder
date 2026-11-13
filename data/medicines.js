export const categories = [
    'All', 'Pain & Fever', 'Allergy', 'Stomach', 'Cold & Cough', 'Vitamins',
];

const img = (text) =>
  `https://placehold.co/600x400/png?text=${encodeURIComponent(text)}`;
export const medicines = [
  {
    id: '1',
    name: 'Paracetamol',
    category: 'Pain & Fever',
    usedFor: 'Relief of mild pain, headache, toothache and fever.',
    precautions:
      'Do not take with other products that also contain paracetamol. ' +
      'Ask a doctor first if you have liver problems.',
    image: img('Paracetamol'),
  },

   {
    id: '2',
    name: 'Ibuprofen',
    category: 'Pain & Fever',
    usedFor: 'Relief of pain, inflammation and fever, such as muscle or period pain.',
    precautions:
      'Best taken with food. Avoid with stomach ulcers or kidney problems. ' +
      'Ask a doctor first if you are pregnant or have asthma.',
    image: img('Ibuprofen'),
  },

  {
    id: '3',
    name: 'Cetirizine',
    category: 'Allergy',
    usedFor: 'Relief of hay fever, sneezing, itchy eyes and skin hives.',
     precautions: 'May cause drowsiness. Be careful when driving and avoid alcohol.',
    image: img('Cetirizine'),
  },

  {
    id: '4',
    name: 'Loratadine',
    category: 'Allergy',
    usedFor: 'Relief of sneezing, runny nose and itchy skin caused by allergies.',
    precautions:
      'Usually less drowsy, but it can still affect some people. ' +
      'Ask a pharmacist before giving it to children.',
    image: img('Loratadine'),
  },

  {
    id: '5',
    name: 'Oral Rehydration Salts',
    category: 'Stomach',
    usedFor: 'Replaces water and salts lost during diarrhoea, vomiting or heat.',
    precautions:
      'Mix only with clean, safe water exactly as the packet says. ' +
      'See a doctor if symptoms last more than a day or two.',
    image: img('ORS'),
  },

   {
    id: '6',
    name: 'Antacid (Calcium Carbonate)',
    category: 'Stomach',
    usedFor: 'Quick relief from heartburn and acid indigestion.',
    precautions:
      'Not for long-term use without advice. ' +
      'It can change how other medicines are absorbed.',
    image: img('Antacid'),
  },

   {
    id: '7',
    name: 'Loperamide',
    category: 'Stomach',
    usedFor: 'Short-term relief of diarrhoea.',
    precautions:
      'Do not use if there is blood in the stool or a high fever. ' +
      'Not suitable for young children without medical advice.',
    image: img('Loperamide'),
  },

  {
    id: '8',
    name: 'Dextromethorphan Cough Syrup',
    category: 'Cold & Cough',
    usedFor: 'Eases dry, irritating coughs.',
    precautions:
      'Some antidepressants should not be combined with it. ' +
      'Ask a pharmacist about age limits.',
    image: img('Cough Syrup'),
  },

  {
    id: '9',
    name: 'Saline Nasal Spray',
    category: 'Cold & Cough',
    usedFor: 'Clears a blocked nose caused by a cold or dust.',
    precautions: 'Gentle for most people. Keep the nozzle clean and do not share it.',
    image: img('Saline Spray'),
  },

  {
    id: '10',
    name: 'Vitamin C',
    category: 'Vitamins',
    usedFor: 'Dietary supplement that supports the immune system and skin health.',
    precautions: 'Very high amounts can upset the stomach. Food is usually enough.',
    image: img('Vitamin C'),
  },

];