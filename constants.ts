import { Gland, Hormone, FlashcardData, LexiconEntry, AppTranslations, Language, PathologyInfo, QuizQuestion } from './types';

export const ALL_GLANDS: Gland[] = [
  // Positions révisées pour une image de fond unique, inspirées de l'exemple avec pastilles.
  { id: 'hypothalamus', name: 'Hypothalamus', description: 'Contrôle l\'hypophyse et régule de nombreuses fonctions corporelles (température, faim, soif, sommeil).', position: { top: '10%', left: '50%' }, color: 'bg-red-500', hormone_ids: ['gnrh', 'trh', 'crh', 'dopamine', 'somatostatin', 'vasopressin_hypo'], emoji: '🧠', genderSpecificity: 'both' },
  { id: 'pituitary', name: 'Hypophyse', description: 'Glande maîtresse, régule de nombreuses autres glandes endocrines.', position: { top: '13%', left: '48%' }, color: 'bg-blue-500', hormone_ids: ['gh', 'tsh', 'acth', 'lh', 'fsh', 'prolactin', 'msh', 'endorphins', 'adh', 'oxytocin'], emoji: '👑', genderSpecificity: 'both' },
  { id: 'pineal', name: 'Glande Pinéale (Épiphyse)', description: 'Produit la mélatonine, qui régule les cycles de sommeil.', position: { top: '12%', left: '53%' }, color: 'bg-purple-500', hormone_ids: ['melatonin'], emoji: '🌙', genderSpecificity: 'both' },
  { id: 'thyroid', name: 'Thyroïde', description: 'Produit des hormones qui régulent le métabolisme énergétique.', position: { top: '22%', left: '50%' }, color: 'bg-orange-500', hormone_ids: ['t4', 't3', 'calcitonin'], emoji: '🦋', genderSpecificity: 'both' },
  { id: 'parathyroid', name: 'Parathyroïdes', description: 'Régulent les niveaux de calcium et de phosphore.', position: { top: '23%', left: '54%' }, color: 'bg-yellow-500', hormone_ids: ['pth'], emoji: '💠', genderSpecificity: 'both' }, // Positionné très près de la thyroïde
  { id: 'thymus', name: 'Thymus', description: 'Joue un rôle crucial dans le développement du système immunitaire.', position: { top: '30%', left: '50%' }, color: 'bg-green-500', hormone_ids: ['thymosin', 'thymopoietin'], emoji: '🛡️', genderSpecificity: 'both' },
  { id: 'adrenals', name: 'Glandes Surrénales', description: 'Gèrent le stress, régulent la pression artérielle et le métabolisme.', position: { top: '45%', left: '50%' }, color: 'bg-indigo-500', hormone_ids: ['cortisol', 'aldosterone', 'dhea', 'adrenaline', 'noradrenaline'], emoji: '⚡', genderSpecificity: 'both' },
  { id: 'pancreas', name: 'Pancréas (îlots de Langerhans)', description: 'Régule la glycémie avec l\'insuline et le glucagon.', position: { top: '51%', left: '50%' }, color: 'bg-pink-500', hormone_ids: ['insulin', 'glucagon', 'somatostatin_pancreas', 'pancreatic_polypeptide'], emoji: '🍯', genderSpecificity: 'both' },
  { id: 'ovaries', name: 'Ovaires (Femme)', description: 'Produisent les hormones sexuelles féminines et les ovules.', position: { top: '63%', left: '50%' }, color: 'bg-rose-500', hormone_ids: ['estrogen', 'progesterone', 'inhibin_f', 'relaxin_f'], emoji: '♀️', genderSpecificity: 'female' },
  { id: 'testes', name: 'Testicules (Homme)', description: 'Produisent les hormones sexuelles masculines et les spermatozoïdes.', position: { top: '70%', left: '50%' }, color: 'bg-sky-500', hormone_ids: ['testosterone', 'inhibin_m', 'amh'], emoji: '♂️', genderSpecificity: 'male' },
];

const insulinPathologies: PathologyInfo[] = [
  { name: 'Diabète de type 1', description: 'Maladie auto-immune où le pancréas ne produit plus d\'insuline.', symptoms: ['Soif excessive', 'Mictions fréquentes', 'Faim constante', 'Perte de poids', 'Fatigue'], causes_details: 'Destruction auto-immune des cellules bêta du pancréas.', care_info: 'Injections d\'insuline quotidiennes, surveillance de la glycémie, régime alimentaire adapté.', prevention_info: 'Pas de prévention connue actuellement, recherche en cours.' },
  { name: 'Diabète de type 2', description: 'Le corps devient résistant à l\'insuline ou n\'en produit pas assez.', symptoms: ['Fatigue', 'Vision floue', 'Cicatrisation lente', 'Infections fréquentes', 'Soif et mictions fréquentes (moins marquées qu\'en type 1)'], causes_details: 'Facteurs génétiques, surpoids/obésité, sédentarité, alimentation déséquilibrée.', care_info: 'Changements de style de vie (alimentation, exercice), médicaments oraux, parfois insuline.', prevention_info: 'Maintenir un poids santé, alimentation équilibrée, activité physique régulière.' },
  { name: 'Insulinome', description: 'Tumeur (généralement bénigne) des cellules bêta du pancréas produisant un excès d\'insuline.', symptoms: ['Hypoglycémie (faiblesse, sueurs, palpitations, confusion, voire coma)'], causes_details: 'Croissance tumorale des cellules productrices d\'insuline.', care_info: 'Chirurgie pour enlever la tumeur, médicaments pour contrôler la glycémie en attendant.', prevention_info: 'Non prévisible/évitable.'}
];

const cortisolPathologies: PathologyInfo[] = [
  { name: 'Syndrome de Cushing', description: 'Exposition prolongée à des niveaux élevés de cortisol.', symptoms: ['Prise de poids (visage lunaire, bosse de bison)', 'Vergetures pourpres', 'Faiblesse musculaire', 'Hypertension', 'Hyperglycémie'], causes_details: 'Prise de corticoïdes, tumeur de l\'hypophyse (maladie de Cushing), tumeur surrénalienne.', care_info: 'Réduction des corticoïdes, chirurgie, radiothérapie, médicaments anti-cortisoliques.', prevention_info: 'Utilisation judicieuse des corticoïdes. Pas de prévention pour les causes tumorales.' },
  { name: 'Maladie d\'Addison (Insuffisance surrénalienne primaire)', description: 'Les glandes surrénales ne produisent pas assez de cortisol et souvent d\'aldostérone.', symptoms: ['Fatigue extrême', 'Perte de poids', 'Hypotension', 'Hyperpigmentation de la peau', 'Douleurs abdominales', 'Envie de sel'], causes_details: 'Maladie auto-immune (la plus fréquente), infections (tuberculose), hémorragie surrénalienne.', care_info: 'Traitement hormonal substitutif à vie (hydrocortisone, fludrocortisone).', prevention_info: 'Pas de prévention spécifique pour les causes auto-immunes.'}
];

const thyroxinePathologies: PathologyInfo[] = [
    { name: 'Hypothyroïdie', description: 'Production insuffisante d\'hormones thyroïdiennes.', symptoms: ['Fatigue, frilosité', 'Prise de poids', 'Peau sèche, perte de cheveux', 'Constipation', 'Ralentissement intellectuel', 'Goitre'], causes_details: 'Thyroïdite de Hashimoto (auto-immune), carence en iode, traitement de l\'hyperthyroïdie, certains médicaments.', care_info: 'Hormonothérapie substitutive (L-thyroxine).', prevention_info: 'Apport suffisant en iode (sel iodé).'},
    { name: 'Hyperthyroïdie', description: 'Production excessive d\'hormones thyroïdiennes.', symptoms: ['Perte de poids malgré appétit augmenté', 'Palpitations, nervosité', 'Tremblements', 'Intolérance à la chaleur, sueurs', 'Goitre', 'Exophtalmie (Maladie de Basedow)'], causes_details: 'Maladie de Basedow (auto-immune), nodules thyroïdiens toxiques, thyroïdite.', care_info: 'Antithyroïdiens de synthèse, iode radioactif, chirurgie.', prevention_info: 'Pas de prévention spécifique pour la maladie de Basedow.'}
];


export const ALL_HORMONES: Hormone[] = [
  { id: 'insulin', nom: 'Insuline', emoji: '🍯', glande_id: 'pancreas', glande_nom: 'Pancréas', type: 'Peptide', fonction: 'Diminue la glycémie en favorisant l\'absorption du glucose par les cellules et son stockage.', organes_cibles: ['Foie', 'Muscles', 'Tissu adipeux'], pathologies_details: insulinPathologies, valeurs_normales: 'Glycémie à jeun : 70-99 mg/dL (pour normoglycémie)', rythme_circadien: 'Pics après les repas', interactions_hormonales: ['Glucagon (antagoniste)', 'Cortisol (antagoniste)', 'Adrénaline (antagoniste)'], age_variations: 'La sensibilité peut diminuer avec l\'âge (résistance à l\'insuline).', grossesse_impact: 'Résistance physiologique à l\'insuline possible, risque de diabète gestationnel.' },
  { id: 'glucagon', nom: 'Glucagon', emoji: '🔥', glande_id: 'pancreas', glande_nom: 'Pancréas', type: 'Peptide', fonction: 'Augmente la glycémie en stimulant la libération de glucose par le foie (glycogénolyse, néoglucogenèse).', organes_cibles: ['Foie'], pathologies_details: [{name: 'Glucagonome', description: 'Tumeur rare produisant un excès de glucagon.', symptoms:['Dermatose spécifique (érythème nécrolytique migrateur)', 'Perte de poids', 'Diabète léger'], care_info:'Chirurgie, somatostatine.'}], valeurs_normales: '50-100 pg/mL' },
  { id: 't4', nom: 'Thyroxine (T4)', emoji: '🦋', glande_id: 'thyroid', glande_nom: 'Thyroïde', type: 'Amine (iodée)', fonction: 'Prohormone convertie en T3 (plus active). Régule le métabolisme basal, la croissance et le développement.', organes_cibles: ['Majorité des cellules du corps'], pathologies_details: thyroxinePathologies, valeurs_normales: 'T4 totale: 4.5-11.2 mcg/dL; TSH (indicateur): 0.4-4.0 mIU/L' },
  { id: 't3', nom: 'Triiodothyronine (T3)', emoji: '🦋⚡', glande_id: 'thyroid', glande_nom: 'Thyroïde', type: 'Amine (iodée)', fonction: 'Forme la plus active des hormones thyroïdiennes. Régule le métabolisme, la température corporelle, le rythme cardiaque.', organes_cibles: ['Majorité des cellules du corps'], pathologies_details: thyroxinePathologies, valeurs_normales: 'T3 totale: 80-200 ng/dL'},
  { id: 'gh', nom: 'Hormone de Croissance (GH/Somatotropine)', emoji: '📈', glande_id: 'pituitary', glande_nom: 'Hypophyse (antérieure)', type: 'Peptide', fonction: 'Stimule la croissance (surtout os et cartilages via IGF-1), la reproduction cellulaire et la régénération. Effets métaboliques.', organes_cibles: ['Foie (pour production IGF-1)', 'Os', 'Muscles', 'Tissu adipeux'], pathologies_details: [ { name: 'Nanisme hypophysaire (Déficit en GH chez l\'enfant)', description: 'Retard de croissance sévère.', symptoms:['Petite taille', 'Visage poupin'], care_info:'Traitement par GH recombinante.'}, {name: 'Gigantisme (Excès de GH avant puberté)', description:'Croissance excessive.'}, {name:'Acromégalie (Excès de GH après puberté)', description:'Élargissement des extrémités, modifications faciales.', symptoms:['Mains et pieds élargis', 'Prognathisme', 'Sueurs'], care_info:'Chirurgie, radiothérapie, médicaments.'}], valeurs_normales: 'Variable, < 5 ng/mL (adultes), pics nocturnes' },
  { id: 'cortisol', nom: 'Cortisol (Hydrocortisone)', emoji: '⏳', glande_id: 'adrenals', glande_nom: 'Glandes Surrénales (cortex)', type: 'Stéroïde (glucocorticoïde)', fonction: 'Hormone du stress. Augmente la glycémie, module la réponse immunitaire (anti-inflammatoire à forte dose), régule le métabolisme des graisses, protéines, glucides.', organes_cibles: ['Majorité des cellules'], pathologies_details: cortisolPathologies, valeurs_normales: 'Matin (8h): 5-25 µg/dL, Soir (16h): 3-16 µg/dL, Minuit: <5 µg/dL', rythme_circadien: 'Pic le matin (vers 8h), baisse progressive durant la journée.' },
  { id: 'adrenaline', nom: 'Adrénaline (Épinéphrine)', emoji: '⚡💨', glande_id: 'adrenals', glande_nom: 'Glandes Surrénales (médulla)', type: 'Amine (catécholamine)', fonction: 'Réponse "combat ou fuite". Augmente le rythme cardiaque, la pression artérielle, la glycémie. Dilate les bronches.', organes_cibles: ['Coeur', 'Vaisseaux sanguins', 'Poumons', 'Foie', 'Muscles'], pathologies_details: [{name:'Phéochromocytome', description:'Tumeur de la médullosurrénale sécrétant des catécholamines.', symptoms:['Hypertension paroxystique', 'Céphalées', 'Sueurs', 'Palpitations'], care_info:'Chirurgie, médicaments pour contrôler la tension.'}], },
  { id: 'melatonin', nom: 'Mélatonine', emoji: '🌙', glande_id: 'pineal', glande_nom: 'Glande Pinéale', type: 'Amine (indoleamine)', fonction: 'Régule les cycles veille-sommeil (rythme circadien) et a des effets antioxydants.', organes_cibles: ['Cerveau (noyaux suprachiasmatiques)'], pathologies_details: [{name:'Troubles du rythme circadien', description:'Insomnie, décalage horaire.', symptoms:['Difficulté à s\'endormir ou à rester éveillé'], care_info:'Mélatonine exogène, luminothérapie, hygiène de sommeil.'}], rythme_circadien: 'Production augmentée dans l\'obscurité, inhibée par la lumière.' },
  { id: 'testosterone', nom: 'Testostérone', emoji: '♂️💪', glande_id: 'testes', glande_nom: 'Testicules (et surrénales en faible quantité, ovaires chez la femme)', type: 'Stéroïde (androgène)', fonction: 'Développement des caractères sexuels masculins, libido, masse musculaire, densité osseuse, spermatogenèse.', organes_cibles: ['Organes reproducteurs masculins', 'Muscles', 'Os', 'Cerveau', 'Peau'], pathologies_details: [{name:'Hypogonadisme masculin', description:'Production insuffisante de testostérone.', symptoms:['Baisse de libido', 'Fatigue', 'Perte de masse musculaire', 'Infertilité'], care_info:'Traitement hormonal substitutif.'}], },
  { id: 'estrogen', nom: 'Œstrogènes (principalement Estradiol, E2)', emoji: '♀️🌸', glande_id: 'ovaries', glande_nom: 'Ovaires (et surrénales, tissu adipeux)', type: 'Stéroïde', fonction: 'Développement des caractères sexuels féminins, cycle menstruel, grossesse, santé osseuse.', organes_cibles: ['Organes reproducteurs féminins', 'Os', 'Cerveau', 'Seins', 'Peau'], pathologies_details: [{name:'Syndrome des ovaires polykystiques (SOPK)', description:'Déséquilibre hormonal fréquent.', symptoms:['Cycles irréguliers', 'Hyperandrogénie (acné, hirsutisme)', 'Kystes ovariens'], care_info:'Contraception hormonale, anti-androgènes, metformine, style de vie.'}, {name:'Ménopause', description:'Arrêt de la fonction ovarienne.', symptoms:['Bouffées de chaleur', 'Sécheresse vaginale', 'Troubles de l\'humeur', 'Ostéoporose'], care_info:'Traitement hormonal substitutif (discuté), gestion des symptômes.'}], },
  { id: 'pth', nom: 'Hormone Parathyroïdienne (PTH, Parathormone)', emoji: '🦴💰', glande_id: 'parathyroid', glande_nom: 'Parathyroïdes', type: 'Peptide', fonction: 'Augmente le taux de calcium sanguin (calcémie) en stimulant sa libération par les os, sa réabsorption par les reins et son absorption intestinale (via vitamine D activée). Diminue la phosphatémie.', organes_cibles: ['Os', 'Reins', 'Intestin (indirectement)'], pathologies_details: [{name:'Hyperparathyroïdie', description:'Production excessive de PTH.', symptoms:['Hypercalcémie (fatigue, douleurs osseuses, calculs rénaux, troubles digestifs)'], care_info:'Chirurgie, médicaments.'}, {name:'Hypoparathyroïdie', description:'Production insuffisante de PTH.', symptoms:['Hypocalcémie (tétanie, crampes, paresthésies)'], care_info:'Calcium, vitamine D.'}], },
  { id: 'adh', nom: 'Hormone Antidiurétique (ADH / Vasopressine)', emoji: '💧🚽', glande_id: 'pituitary', glande_nom: 'Hypophyse (postérieure, synthétisée dans l\'hypothalamus)', type: 'Peptide', fonction: 'Régule l\'équilibre hydrique en augmentant la réabsorption d\'eau par les reins (réduit la production d\'urine). Vasoconstricteur à forte dose.', organes_cibles: ['Reins (tubes collecteurs)'], pathologies_details: [{name:'Diabète insipide central', description:'Déficit en ADH.', symptoms:['Polyurie (urines abondantes et diluées)', 'Polydipsie (soif intense)'], care_info:'Desmopressine (analogue de l\'ADH).'}, {name:'Syndrome de sécrétion inappropriée d\'ADH (SIADH)', description:'Excès d\'ADH.', symptoms:['Hyponatrémie de dilution (rétention d\'eau)', 'Faiblesse', 'Confusion'], care_info:'Restriction hydrique, antagonistes de l\'ADH.'}], },
  { id: 'oxytocin', nom: 'Ocytocine', emoji: '❤️🤱', glande_id: 'pituitary', glande_nom: 'Hypophyse (postérieure, synthétisée dans l\'hypothalamus)', type: 'Peptide', fonction: 'Stimule les contractions utérines pendant l\'accouchement, l\'éjection du lait maternel. Rôle dans les liens sociaux, l\'attachement, la confiance ("hormone de l\'amour").', organes_cibles: ['Utérus', 'Glandes mammaires', 'Cerveau'], pathologies_details: [{name:'Travail dystocique (accouchement difficile)', description:'Peut être lié à une réponse insuffisante à l\'ocytocine ou un manque.', care_info:'Ocytocine synthétique pour induire ou renforcer le travail.'}], },
];

export const ALL_FLASHCARDS: FlashcardData[] = [
  // Débutant
  { id: 'fc1', glandName: 'Pancréas', emoji: '🍯', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Pancreas_layout.svg/200px-Pancreas_layout.svg.png', versoContent: 'Le Pancréas produit l\'Insuline (baisse la glycémie) et le Glucagon (augmente la glycémie). Essentiel pour la régulation du sucre sanguin.', category: 'Glande Majeure', difficulty: 'débutant' },
  { id: 'fc2', glandName: 'Thyroïde', emoji: '🦋', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Thyroid_gland_Illustration.png/200px-Thyroid_gland_Illustration.png', versoContent: 'La Thyroïde produit la Thyroxine (T4) et la Triiodothyronine (T3) qui régulent le métabolisme général, et la Calcitonine (régulation calcium).', category: 'Glande Majeure', difficulty: 'débutant' },
  { id: 'fc3', glandName: 'Glandes Surrénales', emoji: '⚡', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Adrenal_gland_%28PSF%29.png/200px-Adrenal_gland_%28PSF%29.png', versoContent: 'Les Surrénales (cortex et médulla) produisent le Cortisol (stress), l\'Aldostérone (tension), et l\'Adrénaline (urgence).', category: 'Glande Majeure', difficulty: 'débutant' },
  { id: 'fc4', glandName: 'Hypophyse', emoji: '👑', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Pituitary_gland_normal_MRI.jpg/200px-Pituitary_gland_normal_MRI.jpg', versoContent: 'L\'Hypophyse, ou glande pituitaire, est la "glande maîtresse". Produit GH (croissance), TSH (thyroïde), ACTH (surrénales), LH/FSH (gonades), Prolactine.', category: 'Glande Majeure', difficulty: 'débutant' },
  { id: 'fc5', glandName: 'Glande Pinéale', emoji: '🌙', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Pineal_gland.png/200px-Pineal_gland.png', versoContent: 'La Glande Pinéale (épiphyse) produit la Mélatonine, qui régule les cycles de sommeil et d\'éveil (rythme circadien).', category: 'Glande Cérébrale', difficulty: 'débutant' },
  { id: 'fc6', glandName: 'Ovaires', emoji: '♀️', rectoQuestion: 'Chez la femme', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Ovary_system.svg/200px-Ovary_system.svg.png', versoContent: 'Les Ovaires produisent les Œstrogènes et la Progestérone, hormones clés pour le cycle menstruel, la grossesse et les caractères sexuels féminins.', category: 'Gonades', difficulty: 'débutant' },
  { id: 'fc7', glandName: 'Testicules', emoji: '♂️', rectoQuestion: 'Chez l\'homme', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Testis_human_anatomy.svg/200px-Testis_human_anatomy.svg.png', versoContent: 'Les Testicules produisent la Testostérone, hormone principale pour les caractères sexuels masculins, la libido et la masse musculaire.', category: 'Gonades', difficulty: 'débutant' },
  // Intermédiaire
  { id: 'fc8', glandName: 'Hypothalamus', emoji: '🧠', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Hypothalamus_animation.gif/200px-Hypothalamus_animation.gif', versoContent: 'L\'Hypothalamus contrôle l\'hypophyse via des hormones de libération (GnRH, TRH, CRH) et d\'inhibition. Régule faim, soif, température.', category: 'Glande Cérébrale', difficulty: 'intermédiaire' },
  { id: 'fc9', glandName: 'Parathyroïdes', emoji: '💠', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Parathyroid_glands_illustration.png/200px-Parathyroid_glands_illustration.png', versoContent: 'Les Parathyroïdes (typiquement 4) produisent la Parathormone (PTH) qui augmente le taux de calcium dans le sang.', category: 'Régulation Calcium', difficulty: 'intermédiaire' },
  { id: 'fc10', rectoQuestion: 'Quelle hormone est principalement responsable de la réponse "combat ou fuite" ?', glandName: 'Glandes Surrénales (Médulla)', emoji: '⚡💨', versoContent: 'L\'Adrénaline (Épinéphrine), produite par la médulla des glandes surrénales. Elle augmente rythme cardiaque, pression artérielle et mobilise l\'énergie.', category: 'Fonction Hormonale', difficulty: 'intermédiaire' },
  { id: 'fc11', rectoQuestion: 'Quel est le rôle principal de l\'Insuline ?', glandName: 'Pancréas', emoji: '🍯', versoContent: 'L\'Insuline, produite par les cellules bêta du pancréas, permet au glucose d\'entrer dans les cellules, diminuant ainsi la glycémie. Elle favorise aussi le stockage du glucose.', category: 'Fonction Hormonale', difficulty: 'intermédiaire' },
  { id: 'fc12', rectoQuestion: 'Nommez deux hormones produites par l\'hypophyse antérieure (adénohypophyse).', glandName: 'Hypophyse', emoji: '👑', versoContent: 'Exemples : GH (Hormone de Croissance), TSH (Thyréostimuline), ACTH (Corticotrophine), LH (Hormone Lutéinisante), FSH (Hormone Folliculo-stimulante), Prolactine.', category: 'Hormones Hypophysaires', difficulty: 'intermédiaire' },
  { id: 'fc13', rectoQuestion: 'Quelle est la principale fonction de la Mélatonine ?', glandName: 'Glande Pinéale', emoji: '🌙', versoContent: 'La Mélatonine, produite par la glande pinéale, est l\'hormone principale de régulation du rythme circadien (cycle veille-sommeil). Sa production est stimulée par l\'obscurité.', category: 'Rythme Biologique', difficulty: 'intermédiaire' },
  { id: 'fc14', glandName: 'Thymus', emoji: '🛡️', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Thymus_diagram.svg/200px-Thymus_diagram.svg.png', versoContent: 'Le Thymus est crucial pour la maturation des lymphocytes T (cellules immunitaires). Il produit des hormones comme la thymosine. Plus actif chez l\'enfant.', category: 'Système Immunitaire', difficulty: 'intermédiaire' },
  // Avancé
  { id: 'fc15', rectoQuestion: 'Expliquez le concept de feedback négatif avec l\'axe hypothalamo-hypophyso-thyroïdien.', glandName: 'Système Thyroïdien', emoji: '🔄🦋', versoContent: 'L\'hypothalamus sécrète TRH -> hypophyse sécrète TSH -> thyroïde sécrète T3/T4. T3/T4 en excès inhibent la sécrétion de TRH et TSH, maintenant l\'homéostasie.', category: 'Régulation Hormonale', difficulty: 'avancé' },
  { id: 'fc16', rectoQuestion: 'Quelle est la différence principale entre le diabète de type 1 et type 2 ?', glandName: 'Pancréas (Pathologie)', emoji: '❗🍯', versoContent: 'Type 1 : carence absolue en insuline (destruction auto-immune des cellules bêta). Type 2 : insulinorésistance et/ou déficit relatif en insuline.', category: 'Pathologies Endocrines', difficulty: 'avancé' },
  { id: 'fc17', rectoQuestion: 'Quel est l\'effet de l\'ADH (Vasopressine) sur les reins et comment cela affecte l\'équilibre hydrique ?', glandName: 'Hypophyse Postérieure', emoji: '💧🚽', versoContent: 'L\'ADH augmente la perméabilité à l\'eau des tubes collecteurs rénaux, favorisant la réabsorption d\'eau et la concentration des urines. Un déficit cause le diabète insipide.', category: 'Régulation Hydrique', difficulty: 'avancé' },
  { id: 'fc18', rectoQuestion: 'Décrivez le rôle du cortisol dans la réponse au stress chronique.', glandName: 'Glandes Surrénales (Cortex)', emoji: '⏳⚡', versoContent: 'Le cortisol aide à mobiliser l\'énergie (néoglucogenèse, lipolyse), module l\'inflammation, mais une exposition chronique peut entraîner des effets délétères (immunosuppression, troubles métaboliques).', category: 'Stress & Hormones', difficulty: 'avancé' },
  { id: 'fc19', rectoQuestion: 'Qu\'est-ce que le syndrome de Cushing et quelles en sont les causes courantes ?', glandName: 'Glandes Surrénales (Pathologie)', emoji: '❗⏳', versoContent: 'Le syndrome de Cushing est dû à un excès chronique de cortisol. Causes : prise de glucocorticoïdes (iatrogène), adénome hypophysaire sécrétant de l\'ACTH (Maladie de Cushing), tumeur surrénalienne.', category: 'Pathologies Endocrines', difficulty: 'avancé' },
  { id: 'fc20', rectoQuestion: 'Comment la PTH, la Calcitonine et la Vitamine D interagissent-elles pour réguler la calcémie ?', glandName: 'Métabolisme Calcique', emoji: '🦴🔄', versoContent: 'PTH augmente la calcémie (résorption osseuse, réabsorption rénale Ca2+, active Vit D). Vit D augmente absorption intestinale Ca2+. Calcitonine (rôle mineur chez l\'adulte) baisse la calcémie en inhibant résorption osseuse.', category: 'Régulation Minérale', difficulty: 'avancé' },
];


export const ALL_LEXICON_ENTRIES: LexiconEntry[] = [
  { id: 'lex1', term: 'Endocrinologie', definition: 'Spécialité médicale étudiant les hormones, leurs effets et les maladies des glandes endocrines.', emoji: '🔬' },
  { id: 'lex2', term: 'Hormone', definition: 'Substance chimique produite par une glande endocrine, transportée par le sang pour agir sur des organes cibles.', emoji: '🧬' },
  { id: 'lex3', term: 'Glande endocrine', definition: 'Organe qui sécrète des hormones directement dans la circulation sanguine.', emoji: '🏭' },
  { id: 'lex4', term: 'Feedback négatif', definition: 'Mécanisme de régulation où le produit final d\'une voie métabolique inhibe une enzyme en amont, limitant sa propre production.', emoji: '🔄➖' },
  { id: 'lex5', term: 'Hypoglycémie', definition: 'Taux de sucre (glucose) dans le sang anormalement bas.', emoji: '📉🍬' },
  { id: 'lex6', term: 'Hyperthyroïdie', definition: 'Production excessive d\'hormones par la glande thyroïde, accélérant le métabolisme.', emoji: '🦋💨' },
  { id: 'lex7', term: 'Goitre', definition: 'Augmentation de volume de la glande thyroïde.', emoji: '脖'},
  { id: 'lex8', term: 'Homéostasie', definition: 'Capacité d\'un système à maintenir l\'équilibre de son milieu intérieur, quelles que soient les contraintes externes.', emoji: '⚖️'},
];

// Sample Quiz Questions
export const ALL_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    questionText: 'Quelle glande est souvent appelée la "glande maîtresse" du système endocrinien ?',
    options: [
      { text: 'Thyroïde', isCorrect: false },
      { text: 'Hypophyse', isCorrect: true },
      { text: 'Pancréas', isCorrect: false },
      { text: 'Glandes Surrénales', isCorrect: false },
    ],
    explanation: 'L\'hypophyse (ou glande pituitaire) est appelée la "glande maîtresse" car elle contrôle l\'activité de nombreuses autres glandes endocrines.',
    difficulty: 'débutant',
    category: 'Glandes'
  },
  {
    id: 'q2',
    questionText: 'L\'insuline est produite par quelle glande ?',
    options: [
      { text: 'Glandes Surrénales', isCorrect: false },
      { text: 'Thyroïde', isCorrect: false },
      { text: 'Pancréas (cellules bêta)', isCorrect: true },
      { text: 'Hypophyse', isCorrect: false },
    ],
    explanation: 'L\'insuline est une hormone produite par les cellules bêta des îlots de Langerhans dans le pancréas. Elle régule la glycémie.',
    difficulty: 'débutant',
    category: 'Hormones'
  },
  {
    id: 'q3',
    questionText: 'Un excès de cortisol peut mener à quel syndrome ?',
    options: [
      { text: 'Maladie d\'Addison', isCorrect: false },
      { text: 'Syndrome de Cushing', isCorrect: true },
      { text: 'Diabète insipide', isCorrect: false },
      { text: 'Hyperthyroïdie', isCorrect: false },
    ],
    explanation: 'Le syndrome de Cushing est caractérisé par une exposition prolongée à des niveaux élevés de cortisol.',
    difficulty: 'intermédiaire',
    category: 'Pathologies'
  },
  {
    id: 'q4',
    questionText: 'Quelle hormone est principalement responsable de la régulation du cycle veille-sommeil ?',
    options: [
      { text: 'Cortisol', isCorrect: false },
      { text: 'Adrénaline', isCorrect: false },
      { text: 'Mélatonine', isCorrect: true },
      { text: 'Testostérone', isCorrect: false },
    ],
    explanation: 'La mélatonine, produite par la glande pinéale, joue un rôle clé dans la régulation du rythme circadien (cycle veille-sommeil).',
    difficulty: 'intermédiaire',
    category: 'Hormones'
  },
    {
    id: 'q5',
    questionText: 'Laquelle de ces hormones est produite par la thyroïde ?',
    options: [
      { text: 'Ocytocine', isCorrect: false },
      { text: 'Thyroxine (T4)', isCorrect: true },
      { text: 'Aldostérone', isCorrect: false },
      { text: 'Glucagon', isCorrect: false },
    ],
    explanation: 'La thyroxine (T4) est l\'une des principales hormones produites par la glande thyroïde, essentielle pour réguler le métabolisme.',
    difficulty: 'débutant',
    category: 'Hormones'
  }
];


export const TRANSLATIONS: Record<Language, AppTranslations> = {
  fr: {
    navInteractiveBody: 'Corps Interactif',
    navHormones: 'Hormones',
    navFlashcards: 'Flashcards',
    navLexicon: 'Lexique',
    navQuiz: 'Quiz',
    navDarkMode: 'Mode Sombre',
    navLightMode: 'Mode Clair',
    selectGlandPrompt: 'Cliquez sur une glande pour en savoir plus.',
    glandDetailsTitle: 'Détails de la Glande',
    hormonesProduced: 'Hormones Produites :',
    hormoneInfoTitle: 'Information sur l\'Hormone',
    gland: 'Glande',
    type: 'Type',
    targetOrgans: 'Organes Cibles',
    mainFunction: 'Fonction Principale',
    associatedPathologies: 'Pathologies Associées (Résumé)',
    pathologyName: 'Nom',
    pathologyDescription: 'Description',
    symptoms: 'Symptômes',
    causes: 'Causes',
    careAndTreatment: 'Soins et Traitements',
    prevention: 'Prévention',
    pathologiesSectionTitle: 'Problèmes et Maladies Associés (Détails)',
    normalValues: 'Valeurs Normales (indicatif)',
    flashcardsTitle: 'Flashcards Endocriniennes',
    flipCard: 'Retourner',
    nextCard: 'Suivante',
    prevCard: 'Précédente',
    lexiconTitle: 'Lexique Endocrinien',
    searchTerm: 'Rechercher un terme...',
    noResults: 'Aucun résultat trouvé.',
    close: 'Fermer',
    quizTitle: 'Quiz Endocrinien',
    submitAnswer: 'Valider',
    nextQuestion: 'Question Suivante',
    correctAnswer: 'Bonne réponse !',
    wrongAnswer: 'Mauvaise réponse.',
    yourScore: 'Votre score : ',
    playAgain: 'Rejouer',
    quizCompleted: 'Quiz Terminé !',
    finalScore: 'Score Final : ',
    viewExplanation: 'Voir l\'explication',
  },
  en: {
    navInteractiveBody: 'Interactive Body',
    navHormones: 'Hormones',
    navFlashcards: 'Flashcards',
    navLexicon: 'Lexicon',
    navQuiz: 'Quiz',
    navDarkMode: 'Dark Mode',
    navLightMode: 'Light Mode',
    selectGlandPrompt: 'Click on a gland to learn more.',
    glandDetailsTitle: 'Gland Details',
    hormonesProduced: 'Hormones Produced:',
    hormoneInfoTitle: 'Hormone Information',
    gland: 'Gland',
    type: 'Type',
    targetOrgans: 'Target Organs',
    mainFunction: 'Main Function',
    associatedPathologies: 'Associated Pathologies (Summary)',
    pathologyName: 'Name',
    pathologyDescription: 'Description',
    symptoms: 'Symptoms',
    causes: 'Causes',
    careAndTreatment: 'Care and Treatment',
    prevention: 'Prevention',
    pathologiesSectionTitle: 'Associated Problems and Diseases (Details)',
    normalValues: 'Normal Values (indicative)',
    flashcardsTitle: 'Endocrine Flashcards',
    flipCard: 'Flip',
    nextCard: 'Next',
    prevCard: 'Previous',
    lexiconTitle: 'Endocrine Lexicon',
    searchTerm: 'Search term...',
    noResults: 'No results found.',
    close: 'Close',
    quizTitle: 'Endocrine Quiz',
    submitAnswer: 'Submit',
    nextQuestion: 'Next Question',
    correctAnswer: 'Correct answer!',
    wrongAnswer: 'Wrong answer.',
    yourScore: 'Your score: ',
    playAgain: 'Play Again',
    quizCompleted: 'Quiz Completed!',
    finalScore: 'Final Score: ',
    viewExplanation: 'View Explanation',
  }
};