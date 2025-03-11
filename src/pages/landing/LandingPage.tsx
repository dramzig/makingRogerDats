import React, { useState, useRef } from 'react';
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
  X
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
import CookieConsent from 'react-cookie-consent';
import { Helmet } from 'react-helmet-async';
import RogerLogo from '../../components/RogerLogo';

const LandingPage: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    position: '',
    companySize: '',
    phone: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const errors = [];
    if (!formData.name.trim()) errors.push('Name is required');
    if (!formData.email.trim()) errors.push('Email is required');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.push('Invalid email format');
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
      errors.forEach(error => toast.error(error));
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
          message: `New demo request from ${formData.name} at ${formData.company} <br> Email: ${formData.email} <br> Position: ${formData.position} <br> CompanySize: ${formData.companySize} <br> Phone:${formData.phone}`
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
        phone: ''
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
      icon: BarChart2,
      title: 'Automated ML Workflows',
      description: 'Streamline your machine learning pipeline with automated model selection and optimization.'
    },
    {
      icon: Database,
      title: 'Data Preprocessing',
      description: 'Powerful data preprocessing tools to clean and prepare your data for analysis.'
    },
    {
      icon: Zap,
      title: 'Quick Experimentation',
      description: 'Run multiple experiments simultaneously and compare results in real-time.'
    },
    {
      icon: Settings,
      title: 'Model Optimization',
      description: 'Automatically tune hyperparameters and optimize model performance.'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Upload Your Data',
      description: 'Simply upload your dataset and let RogerDats handle the rest.'
    },
    {
      number: '02',
      title: 'Configure Experiments',
      description: 'Choose your target variables and set up your experiment parameters.'
    },
    {
      number: '03',
      title: 'Compare Models',
      description: 'Automatically train and compare multiple models to find the best performer.'
    },
    {
      number: '04',
      title: 'Deploy & Monitor',
      description: 'Deploy your models to production and monitor their performance.'
    }
  ];

  const faqs = [
    {
      question: 'What is RogerDats?',
      answer: 'RogerDats is an automated machine learning platform that helps data scientists and analysts build, train, and deploy machine learning models without writing code.'
    },
    {
      question: 'Do I need coding experience?',
      answer: 'No! RogerDats is designed to be user-friendly and requires no coding experience. Our intuitive interface guides you through the entire process.'
    },
    {
      question: 'What types of models can I build?',
      answer: 'RogerDats supports a wide range of machine learning models including classification, regression, clustering, and time series forecasting.'
    },
    {
      question: 'Can I export my models?',
      answer: 'Yes, you can export your trained models in various formats for deployment in your preferred environment.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Yes, we take data security seriously. All data is encrypted in transit and at rest, and we comply with industry security standards.'
    }
  ];

  return (
    <div className="bg-white">
      <Helmet>
        <title>RogerDats - Automated Machine Learning Platform</title>
        <meta name="description" content="Build, train, and deploy machine learning models without writing code. RogerDats makes AI accessible to everyone." />
        <meta name="keywords" content="machine learning, AI, automation, ML platform, no-code ML, data science" />
        <link rel="canonical" href="https://rogerdats.com" />
      </Helmet>

      <header className="fixed w-full bg-white z-50 border-b border-gray-100">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <RogerLogo className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-2xl font-bold text-gray-900">RogerDats</span>
              </Link>
            </div>
            
            <div className="hidden md:flex md:items-center md:space-x-6">
              <Link to="/login" className="text-base font-medium text-gray-500 hover:text-gray-900">
                Log in
              </Link>
              <a
                href="#book-demo"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white hover:bg-indigo-700"
              >
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
                  Log in
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
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
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
                  Automate Your Machine Learning Workflow
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Build, train, and deploy machine learning models without writing code. RogerDats makes AI accessible to everyone.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <Link
                    to="/login"
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Try Demo
                  </Link>
                  <a href="#book-demo" className="text-sm font-semibold leading-6 text-gray-900">
                    Book a Demo <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
              
              <div className="mt-16 flow-root sm:mt-24">
                <div className="relative rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                  <img
                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80"
                    alt="App screenshot"
                    className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">Benefits</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Everything you need to accelerate your ML projects
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                RogerDats provides all the tools you need to build and deploy machine learning models quickly and efficiently.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
                {benefits.map((benefit) => (
                  <div key={benefit.title} className="flex flex-col">
                    <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                      <benefit.icon className="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
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
              <h2 className="text-base font-semibold leading-7 text-indigo-600">How it works</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Start building in minutes
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Get started with RogerDats in just a few simple steps. No coding required.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
                {steps.map((step) => (
                  <div key={step.title} className="flex flex-col">
                    <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                      <span className="text-2xl font-bold text-indigo-600">{step.number}</span>
                      {step.title}
                    </dt>
                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                      <p className="flex-auto">{step.description}</p>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        <div id="book-demo" className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">Book a Demo</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                See RogerDats in action
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Schedule a personalized demo with our team to learn how RogerDats can help your organization.
              </p>
            </div>
            
            <form ref={formRef} onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl">
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-900">
                    Name
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                    Work email
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">
                    Company
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="text"
                      name="company"
                      id="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="position" className="block text-sm font-semibold leading-6 text-gray-900">
                    Job position
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="text"
                      name="position"
                      id="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="companySize" className="block text-sm font-semibold leading-6 text-gray-900">
                    Company size
                  </label>
                  <div className="mt-2.5">
                    <select
                      name="companySize"
                      id="companySize"
                      value={formData.companySize}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                      <option value="">Select size</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-500">201-500 employees</option>
                      <option value="501+">501+ employees</option>
                    </select>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="phone" className="block text-sm font-semibold leading-6 text-gray-900">
                    Phone number
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
              <h2 className="text-base font-semibold leading-7 text-indigo-600">FAQ</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Frequently asked questions
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Got questions? We've got answers.
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
            <Link to="/login" className="text-gray-400 hover:text-gray-500">
              Try Demo
            </Link>
            <a href="#book-demo" className="text-gray-400 hover:text-gray-500">
              Book a Demo
            </a>
          </div>
          <div className="mt-8 md:order-1 md:mt-0">
            <p className="text-center text-xs leading-5 text-gray-500">
              &copy; 2025 RogerDats. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <CookieConsent
        location="bottom"
        buttonText="Accept"
        cookieName="rogerdats-cookie-consent"
        style={{ background: "#2B373B" }}
        buttonStyle={{ background: "#4F46E5", color: "white", fontSize: "13px" }}
        expires={150}
      >
        This website uses cookies to enhance the user experience.{" "}
        <span style={{ fontSize: "10px" }}>
          By continuing to use this site, you consent to our use of cookies.
        </span>
      </CookieConsent>
    </div>
  );
};

export default LandingPage;