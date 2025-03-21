import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations object
const translations = {
  en: {
    // Navigation
    'nav.tryDemo': 'Try Demo',
    'nav.bookDemo': 'Book demo',
    
    // Hero section
    'hero.analysts': 'No-code AutoML for Analysts',
    'hero.projectManagers': 'No-code AutoML for Project Managers',
    'hero.dataScientists': 'No-code AutoML for Data Scientists',
    'hero.everyone': 'No-code AutoML for Everyone',
    'hero.subtitle': 'Enterprise-grade AutoML platform designed for banking.',
    'hero.steps': 'Deploy in 5 simple steps!',
    'hero.cta.demo': 'Try Demo',
    'hero.cta.book': 'Book Demo',
    
    // Benefits section
    'benefits.title': 'Financial ML Solutions',
    'benefits.heading': 'Comprehensive ML Solutions for Financial Services',
    'benefits.description': 'From credit scoring to fraud detection, our platform provides all the tools you need to implement advanced ML solutions.',
    
    // Benefits items
    'benefits.creditScoring.title': 'Credit Scoring Models',
    'benefits.creditScoring.description': 'Build and deploy sophisticated credit risk models to assess creditworthiness accurately.',
    'benefits.fraudDetection.title': 'Fraud Detection',
    'benefits.fraudDetection.description': 'Real-time fraud detection systems powered by advanced machine learning algorithms.',
    'benefits.riskManagement.title': 'Risk Management',
    'benefits.riskManagement.description': 'Comprehensive risk assessment and management solutions for financial institutions.',
    'benefits.collections.title': 'Collections Optimization',
    'benefits.collections.description': 'Smart collection strategies with ML-powered best time to call predictions.',
    
    // Steps
    'steps.import.title': 'Import Data',
    'steps.import.description': 'Upload the training dataset',
    'steps.target.title': 'Select target',
    'steps.target.description': 'Choose the variable you want to predict',
    'steps.modelType.title': 'Model type',
    'steps.modelType.description': 'Select the model type: Regression or Classification',
    'steps.evaluate.title': 'Evaluate',
    'steps.evaluate.description': 'Compare the performance of different models',
    'steps.deploy.title': 'Deploy',
    'steps.deploy.description': 'Deploy your model to start making predictions',
    
    // How it works section
    'howItWorks.title': 'How it works',
    'howItWorks.heading': 'Deploy ML Models in Minutes',
    'howItWorks.description': 'Our platform streamlines the process of building and deploying Machine Learning models',
    
    // Pricing section
    'pricing.title': 'Pricing',
    'pricing.heading': 'Choose the Right Plan for You',
    'pricing.description': 'Flexible pricing options designed to scale with your ML needs',
    
    // Pricing plans
    'pricing.freeTrial.name': 'Free Trial',
    'pricing.freeTrial.duration': '14 days',
    'pricing.starter.name': 'Starter',
    'pricing.starter.duration': 'per month',
    'pricing.professional.name': 'Professional',
    'pricing.professional.duration': 'per month',
    'pricing.enterprise.name': 'Enterprise',
    'pricing.enterprise.duration': 'per month',
    'pricing.mostPopular': 'Most Popular',
    'pricing.features.predictions': 'Up to {count} predictions/month',
    'pricing.features.concurrentModels': '{count} concurrent models',
    'pricing.features.wizardPrediction': 'Wizard prediction only',
    'pricing.features.wizardPredictionFull': 'Wizard prediction',
    'pricing.features.communitySupport': 'Community support',
    'pricing.features.basicReporting': 'Basic reporting',
    'pricing.features.basicParameters': 'Basic model parameters',
    'pricing.features.emailSupport': 'Email support',
    'pricing.features.customReporting': 'Custom reporting',
    'pricing.features.modelVersioning': 'Model versioning',
    'pricing.features.advancedParameters': 'Advance model parameters',
    'pricing.features.prioritySupport': 'Priority support',
    'pricing.features.modelMonitoring': 'Model monitoring',
    'pricing.features.teamCollaboration': 'Team collaboration',
    'pricing.features.user': 'User',
    'pricing.features.users': 'Users',
    'pricing.features.onPremise': 'Private deployment',
    'pricing.features.sla': 'SLA guarantee',
    'pricing.cta.tryDemo': 'Try Demo',
    'pricing.cta.talkToSales': 'Talk to Sales',
    
    // FAQ section
    'faq.title': 'FAQ',
    'faq.heading': 'Frequently asked questions',
    'faq.description': 'Common questions about Roger Data',
    'faq.security.question': 'How does Roger Data ensure data security?',
    'faq.security.answer': 'We implement bank-grade security measures including end-to-end encryption, SOC 2 compliance, and regular security audits to protect your sensitive data.',
    'faq.customization.question': 'Can we customize models for our specific needs?',
    'faq.customization.answer': 'Yes! Our platform allows for extensive customization of ML models to match your specific risk assessment criteria and business rules.',
    'faq.compliance.question': 'Do you support regulatory compliance?',
    'faq.compliance.answer': 'Our platform is built with financial regulations in mind, supporting BASEL requirements, model validation, and comprehensive audit trails.',
    'faq.deployment.question': 'How quickly can we deploy new models?',
    'faq.deployment.answer': 'Most standard models can be deployed within hours. Custom models typically take 1-2 hours for development and validation.',
    'faq.support.question': 'What kind of support do you provide?',
    'faq.support.answer': 'We offer comprehensive support including technical assistance, model optimization, and regulatory compliance guidance.',
    // Demo form
    'demo.title': 'Book a Demo',
    'demo.heading': 'See Roger in Action',
    'demo.description': 'Schedule a personalized demo to learn how Roger Data can transform your data to opportunities.',
    'demo.form.name': 'Name',
    'demo.form.email': 'Work email',
    'demo.form.company': 'Company',
    'demo.form.position': 'Job position',
    'demo.form.companySize': 'Company size',
    'demo.form.phone': 'Phone number',
    'demo.form.submit': 'Book your demo',
    'demo.form.submitting': 'Submitting...',
    
    // Footer
    'footer.copyright': '© 2025 Roger Data. All rights reserved.',
    
    // Cookie consent
    'cookie.message': 'This website uses cookies to enhance the user experience.',
    'cookie.consent': 'By continuing to use this site, you consent to our use of cookies.',
    'cookie.accept': 'Accept'
  },
  es: {
    // Navigation
    'nav.tryDemo': 'Probar Demo',
    'nav.bookDemo': 'Reservar demo',
    
    // Hero section
    'hero.analysts': 'AutoML sin código para Analistas',
    'hero.projectManagers': 'AutoML sin código para Gerentes de Proyecto',
    'hero.dataScientists': 'AutoML sin código para Científicos de Datos',
    'hero.everyone': 'AutoML sin código para Todos',
    'hero.subtitle': 'Plataforma AutoML de nivel empresarial diseñada para la banca.',
    'hero.steps': '¡Implementa en 5 simples pasos!',
    'hero.cta.demo': 'Probar Demo',
    'hero.cta.book': 'Reservar Demo',
    
    // Benefits section
    'benefits.title': 'Soluciones ML Financieras',
    'benefits.heading': 'Soluciones ML Integrales para Servicios Financieros',
    'benefits.description': 'Desde calificación crediticia hasta detección de fraude, nuestra plataforma proporciona todas las herramientas necesarias para implementar soluciones ML avanzadas.',
    
    // Benefits items
    'benefits.creditScoring.title': 'Modelos de Puntuación Crediticia',
    'benefits.creditScoring.description': 'Construye e implementa modelos sofisticados de riesgo crediticio para evaluar la solvencia con precisión.',
    'benefits.fraudDetection.title': 'Detección de Fraude',
    'benefits.fraudDetection.description': 'Sistemas de detección de fraude en tiempo real impulsados por algoritmos avanzados de machine learning.',
    'benefits.riskManagement.title': 'Gestión de Riesgos',
    'benefits.riskManagement.description': 'Soluciones integrales de evaluación y gestión de riesgos para instituciones financieras.',
    'benefits.collections.title': 'Optimización de Cobranzas',
    'benefits.collections.description': 'Estrategias inteligentes de cobranza con predicciones del mejor momento para llamar basadas en ML.',
    
    // Steps
    'steps.import.title': 'Importar Datos',
    'steps.import.description': 'Sube el conjunto de datos de entrenamiento',
    'steps.target.title': 'Seleccionar objetivo',
    'steps.target.description': 'Elige la variable que quieres predecir',
    'steps.modelType.title': 'Tipo de modelo',
    'steps.modelType.description': 'Selecciona el tipo de modelo: Regresión o Clasificación',
    'steps.evaluate.title': 'Evaluar',
    'steps.evaluate.description': 'Compara el rendimiento de diferentes modelos',
    'steps.deploy.title': 'Implementar',
    'steps.deploy.description': 'Implementa tu modelo para comenzar a hacer predicciones',
    
    // How it works section
    'howItWorks.title': 'Cómo funciona',
    'howItWorks.heading': 'Implementa Modelos ML en Minutos',
    'howItWorks.description': 'Nuestra plataforma simplifica el proceso de construcción e implementación de modelos de Machine Learning',
    
    // Pricing section
    'pricing.title': 'Precios',
    'pricing.heading': 'Elige el Plan Adecuado para Ti',
    'pricing.description': 'Opciones de precios flexibles diseñadas para escalar con tus necesidades de ML',
    
    // Pricing plans
    'pricing.freeTrial.name': 'Prueba Gratuita',
    'pricing.freeTrial.duration': '14 días',
    'pricing.starter.name': 'Inicial',
    'pricing.starter.duration': 'por mes',
    'pricing.professional.name': 'Profesional',
    'pricing.professional.duration': 'por mes',
    'pricing.enterprise.name': 'Empresarial',
    'pricing.enterprise.duration': 'por mes',
    'pricing.mostPopular': 'Más Popular',
    'pricing.features.predictions': 'Hasta {count} predicciones/mes',
    'pricing.features.concurrentModels': '{count} modelos concurrentes',
    'pricing.features.wizardPrediction': 'Solo predicción asistida',
    'pricing.features.wizardPredictionFull': 'Predicción asistida',
    'pricing.features.communitySupport': 'Soporte comunitario',
    'pricing.features.basicReporting': 'Informes básicos',
    'pricing.features.basicParameters': 'Parámetros básicos de modelo',
    'pricing.features.emailSupport': 'Soporte por email',
    'pricing.features.customReporting': 'Informes personalizados',
    'pricing.features.modelVersioning': 'Versionado de modelos',
    'pricing.features.advancedParameters': 'Parámetros avanzados de modelo',
    'pricing.features.prioritySupport': 'Soporte prioritario',
    'pricing.features.modelMonitoring': 'Monitoreo de modelos',
    'pricing.features.teamCollaboration': 'Colaboración en equipo',
    'pricing.features.user': 'Usuario',
    'pricing.features.users': 'Usuarios',
    'pricing.features.onPremise': 'Implementación privada',
    'pricing.features.sla': 'Garantía de SLA',
    'pricing.cta.tryDemo': 'Probar Demo',
    'pricing.cta.talkToSales': 'Hablar con Ventas',
    
    // FAQ section
    'faq.title': 'Preguntas Frecuentes',
    'faq.heading': 'Preguntas frecuentes',
    'faq.description': 'Preguntas comunes sobre Roger Data',
    'faq.security.question': '¿Cómo garantiza Roger Data la seguridad de los datos?',
    'faq.security.answer': 'Implementamos medidas de seguridad de nivel bancario, incluyendo encriptación de extremo a extremo, cumplimiento SOC 2 y auditorías regulares de seguridad para proteger sus datos sensibles.',
    'faq.customization.question': '¿Podemos personalizar los modelos para nuestras necesidades específicas?',
    'faq.customization.answer': '¡Sí! Nuestra plataforma permite una amplia personalización de modelos ML para adaptarse a sus criterios específicos de evaluación de riesgos y reglas de negocio.',
    'faq.compliance.question': '¿Soportan el cumplimiento regulatorio?',
    'faq.compliance.answer': 'Nuestra plataforma está construida teniendo en cuenta las regulaciones financieras, soportando requisitos BASEL, validación de modelos y pistas de auditoría completas.',
    'faq.deployment.question': '¿Qué tan rápido podemos implementar nuevos modelos?',
    'faq.deployment.answer': 'La mayoría de los modelos estándar pueden implementarse en horas. Los modelos personalizados típicamente toman 1-2 horas para desarrollo y validación.',
    'faq.support.question': '¿Qué tipo de soporte proporcionan?',
    'faq.support.answer': 'Ofrecemos soporte integral que incluye asistencia técnica, optimización de modelos y orientación en cumplimiento regulatorio.',
    // Demo form
    'demo.title': 'Reservar una Demo',
    'demo.heading': 'Ve Roger en Acción',
    'demo.description': 'Programa una demo personalizada para aprender cómo Roger Data puede transformar tus datos en oportunidades.',
    'demo.form.name': 'Nombre',
    'demo.form.email': 'Correo de trabajo',
    'demo.form.company': 'Empresa',
    'demo.form.position': 'Cargo',
    'demo.form.companySize': 'Tamaño de la empresa',
    'demo.form.phone': 'Número de teléfono',
    'demo.form.submit': 'Reservar tu demo',
    'demo.form.submitting': 'Enviando...',
    
    // Footer
    'footer.copyright': '© 2025 Roger Data. Todos los derechos reservados.',
    
    // Cookie consent
    'cookie.message': 'Este sitio web utiliza cookies para mejorar la experiencia del usuario.',
    'cookie.consent': 'Al continuar usando este sitio, aceptas el uso de cookies.',
    'cookie.accept': 'Aceptar'
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    return 'en'; // Always default to English
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};