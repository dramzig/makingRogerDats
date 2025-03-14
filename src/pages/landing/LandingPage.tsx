import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  CheckCircle2,
  BarChart2,
  Database,
  Zap,
  Settings,
  Users,
  ArrowRight,
  ChevronDown,
  Menu,
  X,
  CreditCard,
  Shield,
  Clock,
  Building2,
  LineChart,
  BadgeCheck,
  Lock,
  Scale,
  PhoneCall,
  BrainCircuit
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
import CookieConsent from 'react-cookie-consent';
import { Helmet } from 'react-helmet-async';
import RogerLogo from '../../components/RogerLogo';
import Typed from 'typed.js';

const LandingPage: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const typedRef = useRef<HTMLSpanElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    position: '',
    companySize: '',
    phone: '',
  });

  useEffect(() => {
    if (typedRef.current) {
      const typed = new Typed(typedRef.current, {
        strings: [
          'No-code AutoML for <br>^1000 Analysts^1000\n',
          'No-code AutoML for <br>^1000 Project Managers^1000\n',
          'No-code AutoML for <br>^1000 Data Scientists^1000\n',
          'No-code AutoML for <br>^1000 Everyone^1000\n'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 1000,
        loop: true,
        showCursor: true,
        cursorChar: '|'
      });

      return () => {
        typed.destroy();
      };
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = [];
    if (!formData.name.trim()) errors.push('Name is required');
    if (!formData.email.trim()) errors.push('Email is required');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errors.push('Invalid email format');
    if (!formData.company.trim()) errors.push('Company is required');
    if (!formData.position.trim()) errors.push('Job position is required');
    if (!formData.companySize) errors.push('Company size is required');
    if (!formData.phone.trim()) errors.push('Phone number is required');
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error));
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.send(
        'service_9sq80yc',
        'template_hrygzou',
        {
          to_email: 'donaldo.amaya@gmail.com',
          from_name: formData.name,
          from_email: formData.email,
          company: formData.company,
          position: formData.position,
          company_size: formData.companySize,
          phone: formData.phone,
          message: `New demo request from ${formData.name} at ${formData.company} <br> Email: ${formData.email} <br> Position: ${formData.position} <br> CompanySize: ${formData.companySize} <br> Phone:${formData.phone}`,
        },
        'E81mgF3YPU0IiSkZN'
      );

      toast.success('Thank you for your interest! We will contact you shortly.');

      setFormData({
        name: '',
        email: '',
        company: '',
        position: '',
        companySize: '',
        phone: '',
      });

      if (formRef.current) {
        formRef.current.reset();
      }
    } catch (error) {
      toast.error('Failed to submit form. Please try again later.');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: LineChart,
      title: 'Credit Scoring Models',
      description: 'Build and deploy sophisticated credit risk models to assess creditworthiness accurately.',
    },
    {
      icon: Shield,
      title: 'Fraud Detection',
      description: 'Real-time fraud detection systems powered by advanced machine learning algorithms.',
    },
    {
      icon: Scale,
      title: 'Risk Management',
      description: 'Comprehensive risk assessment and management solutions for financial institutions.',
    },
    {
      icon: PhoneCall,
      title: 'Collections Optimization',
      description: 'Smart collection strategies with ML-powered best time to call predictions.',
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Import Data',
      description: 'Upload the training dataset',
    },
    {
      number: '02',
      title: 'Select target',
      description: 'Choose the variable you want to predict',
    },
    {
      number: '03',
      title: 'Model type',
      description: 'Select the model type: Regression or Classification',
    },
    {
      number: '04',
      title: 'Evaluate',
      description: 'Compare the performance of different models',
    },
    {
      number: '05',
      title: 'Deploy',
      description: 'Deploy your model to start making predictions',
    },
  ];

  const pricingPlans = [
    {
      name: 'Free Trial',
      price: 0,
      duration: '14 days',
      features: [
        'Up to 50,000 predictions/month',
        '1 concurrent models',
        'Wizard prediction only',
        'Community support',
        'Basic reporting'
      ],
      cta: 'Try Demo',
      popular: false
    },
    {
      name: 'Starter',
      price: '500',
      duration: 'per month',
      features: [
        'Up to 200,000 predictions/month',
        '5 concurrent models',
        'Wizard prediction',
        'Basic model parameters',
        'Email support',
        'Custom reporting',
        'Model versioning'
      ],
      cta: 'Talk to Sales',
      popular: false
    },
    {
      name: 'Professional',
      price: '1,500',
      duration: 'per month',
      features: [
        'Up to 1M predictions/month',
        '15 concurrent models',
        'Wizard prediction',
        'Advance model parameters',
        'Priority support',
        'Model monitoring',
        'Team collaboration'
      ],
      cta: 'Talk to Sales',
      popular: true
    },
    {
      name: 'Enterprise',
      price: '3,000',
      duration: 'per month',
      features: [
        'Up to 10M predictions/month',
        '50 concurrent models',
        'Wizard prediction',
        'Advance model parameters',
        'Priority support',
        'Model monitoring',
        'Team collaboration',
        'On-premise deployment',
        'SLA guarantee'
      ],
      cta: 'Talk to Sales',
      popular: false
    }
  ];

  const faqs = [
    {
      question: 'How does Roger Data ensure data security?',
      answer: 'We implement bank-grade security measures including end-to-end encryption, SOC 2 compliance, and regular security audits to protect your sensitive financial data.',
    },
    {
      question: 'Can we customize models for our specific needs?',
      answer: 'Yes! Our platform allows for extensive customization of ML models to match your specific risk assessment criteria and business rules.',
    },
    {
      question: 'Do you support regulatory compliance?',
      answer: 'Our platform is built with financial regulations in mind, supporting BASEL requirements, model validation, and comprehensive audit trails.',
    },
    {
      question: 'How quickly can we deploy new models?',
      answer: 'Most standard models can be deployed within hours. Custom models typically take 1-2 hours for development and validation.',
    },
    {
      question: 'What kind of support do you provide?',
      answer: 'We offer comprehensive support including technical assistance, model optimization, and regulatory compliance guidance.',
    },
  ];

  return (
    <div className="bg-white relative">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="absolute -inset-[10px] bg-gradient-to-r from-indigo-500/50 via-purple-500/50 to-pink-500/50 blur-3xl opacity-70 animate-gradient"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-violet-500/50 to-orange-500/50 rounded-full blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-gradient-to-bl from-blue-500/50 to-emerald-500/50 rounded-full blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-pink-500/50 to-yellow-500/50 rounded-full blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
      <Helmet>
        <title>Roger Data - AutoML Platform for Banking</title>
        <meta
          name="description"
          content="Enterprise-grade AutoML platform for banks and financial institutions. Build and deploy credit scoring, risk management, and fraud detection models without writing code."
        />
        <meta
          name="keywords"
          content="AutoML platform, financial ML, credit scoring, risk management, fraud detection, banking AI, machine learning platform, no-code ML"
        />
        <link rel="canonical" href="https://rogerdata.app" />
      </Helmet>

      <header className="fixed w-full bg-white z-50 border-b border-gray-100">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <RogerLogo className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-2xl font-bold text-gray-900">Roger Data</span>
              </Link>
            </div>

            <div className="hidden md:flex md:items-center md:space-x-6">
              <Link to="/login" className="text-base font-medium text-gray-500 hover:text-gray-900">
                Try Demo
              </Link>
              <a href="#book-demo" className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white hover:bg-indigo-700">
                Book demo
              </a>
            </div>

            <div className="flex md:hidden">
              <button
                type="button"
                className="text-gray-400 hover:text-gray-500"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                <Link
                  to="/login"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                >
                  Try Demo
                </Link>
                <a
                  href="#book-demo"
                  className="block rounded-md bg-indigo-600 px-3 py-2 text-base font-medium text-white hover:bg-indigo-700"
                >
                  Book demo
                </a>
              </div>
            </div>
          )}
        </nav>
      </header>

      <main>
        <div className="relative pt-16">
          <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-orange-400 to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>

          <div className="py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  <span ref={typedRef}></span>
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Enterprise-grade AutoML platform designed for banking. 
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600 font-semibold">
                  Deploy in 5 simple steps! 
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <Link
                    to="/login"
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Try Demo
                  </Link>
                  <a
                    href="#book-demo"
                    className="text-sm font-semibold leading-6 text-orange-600 hover:text-orange-500"
                  >
                    Book Demo <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>

              <div className="mt-16 flow-root sm:mt-24">
                <div className="-m-2 rounded-xl gray-900/5 ring-1 ring-inset ring-gray-900/10  lg:rounded-2xl">
                  <div className="rounded-md shadow-2xl ring-1 ring-gray-900/10">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-md bg-gradient-to-tr"></div>
                      <img
                        src="rogerdata_wizard.png"
                        alt="Roger Data platform interface showing ML models for financial analysis"
                        className="w-full rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-orange-600">
                Financial ML Solutions
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Comprehensive ML Solutions for Financial Services
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                From credit scoring to fraud detection, our platform provides all the tools you need to implement advanced ML solutions.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
                {benefits.map((benefit) => (
                  <div key={benefit.title} className="flex flex-col">
                    <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                      <benefit.icon
                        className="h-5 w-5 flex-none text-orange-600"
                        aria-hidden="true"
                      />
                      {benefit.title}
                    </dt>
                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                      <p className="flex-auto">{benefit.description}</p>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-orange-600">
                How it works
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Deploy Financial ML Models in Minutes
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Our platform streamlines the process of building and deploying ML models for financial applications.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-5">
                {steps.map((step) => (
                  <div key={step.title} className="relative flex flex-col items-center text-center">
                    <dt className="flex flex-col items-center gap-y-2 text-base font-semibold leading-7 text-gray-900">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-2xl font-bold text-orange-600">
                        {step.number}
                      </span>
                      {step.title}
                    </dt>
                    <dd className="mt-2 flex flex-auto flex-col text-sm leading-6 text-gray-600">
                      <p className="flex-auto">{step.description}</p>
                    </dd>
                    {step.number !== '05' && (
                      <div className="absolute left-full top-12 hidden h-[2px] w-16 -translate-y-1/2 bg-orange-200 lg:block"></div>
                    )}
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-orange-600">Pricing</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Choose the Right Plan for You
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Flexible pricing options designed to scale with your ML needs
              </p>
            </div>

            <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-4">
              {pricingPlans.map((plan) => (
                <div
                  key={plan.name}
                  className={`flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10 ${
                    plan.popular ? 'ring-2 ring-indigo-600' : ''
                  }`}
                >
                  <div>
                    {plan.popular && (
                      <div className="mb-4">
                        <span className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-600">
                          <CheckCircle2 className="h-4 w-4" />
                          Most Popular
                        </span>
                      </div>
                    )}
                    <div className="flex items-center justify-between gap-x-4">
                      <h3 className="text-lg font-semibold leading-8 text-gray-900">
                        {plan.name}
                      </h3>
                    </div>
                    <p className="mt-6 flex items-baseline gap-x-1">
                      {plan.price === 0 ? (
                        <>
                          <span className="text-4xl font-bold tracking-tight text-gray-900">
                            Free
                          </span>
                          <span className="text-sm font-semibold leading-6 text-gray-600">
                            /{plan.duration}
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="text-4xl font-bold tracking-tight text-gray-900">
                            ${plan.price}
                          </span>
                          <span className="text-sm font-semibold leading-6 text-gray-600">
                            /{plan.duration}
                          </span>
                        </>
                      )}
                    </p>
                    <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex gap-x-3">
                          <CheckCircle2 className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <a
                    href={plan.price === 0 ? '/login' : '#book-demo'}
                    className={`mt-8 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                      plan.popular
                        ? 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-indigo-600'
                        : 'bg-white text-orange-600 ring-1 ring-inset ring-orange-200 hover:ring-orange-300'
                    }`}
                  >
                    {plan.cta}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div id="book-demo" className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-orange-600">
                Book a Demo
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                See Roger in Action
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Schedule a personalized demo to learn how Roger Data can transform your data to opportunities.
              </p>
            </div>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="mx-auto mt-16 max-w-xl"
            >
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Name
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Work email
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="company"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Company
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="text"
                      name="company"
                      id="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="position"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Job position
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="text"
                      name="position"
                      id="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="companySize"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Company size
                  </label>
                  <div className="mt-2.5">
                    <select
                      name="companySize"
                      id="companySize"
                      value={formData.companySize}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                    >
                      <option value="">Select size</option>
                      <option value="1-100">1-100 employees</option>
                      <option value="101-500">101-500 employees</option>
                      <option value="501-1000">501-1,000 employees</option>
                      <option value="1001-5000">1,001-5,000 employees</option>
                      <option value="5001+">5,001+ employees</option>
                    </select>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Phone number
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-10">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Book your demo'}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="bg-gray-50 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-orange-600">
                FAQ
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Frequently asked questions
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Common questions about Roger Data
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl">
              <dl className="space-y-8">
                {faqs.map((faq) => (
                  <div key={faq.question} className="pt-6">
                    <dt className="text-lg font-semibold leading-7 text-gray-900">
                      {faq.question}
                    </dt>
                    <dd className="mt-2 text-base leading-7 text-gray-600">
                      {faq.answer}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <Link to="/login" className="text-gray-400 hover:text-orange-500">
              Try Demo
            </Link>
            <a href="#book-demo" className="text-gray-400 hover:text-orange-500">
              Book a Demo
            </a>
          </div>
          <div className="mt-8 md:order-1 md:mt-0">
            <p className="text-center text-xs leading-5 text-gray-500">
              &copy; 2025 Roger Data. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <CookieConsent
        location="bottom"
        buttonText="Accept"
        cookieName="rogerdats-cookie-consent"
        style={{ background: '#2B373B' }}
        buttonStyle={{
          background: '#4F46E5',
          color: 'white',
          fontSize: '13px',
        }}
        expires={150}
      >
        This website uses cookies to enhance the user experience.{' '}
        <span style={{ fontSize: '10px' }}>
          By continuing to use this site, you consent to our use of cookies.
        </span>
      </CookieConsent>
    </div>
  );
};

export default LandingPage