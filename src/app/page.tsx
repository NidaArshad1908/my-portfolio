/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Github, Linkedin, Mail, ExternalLink, Download, Code, Globe, Server, Database, Smartphone, ArrowRight, Star, Zap, Target, Users, Heart, Shield } from 'lucide-react';
import Image from 'next/image';
import emailjs from '@emailjs/browser';

const PARTICLES = [
  { left: 8, top: 18 },
  { left: 22, top: 72 },
  { left: 41, top: 12 },
  { left: 63, top: 81 },
  { left: 78, top: 28 },
  { left: 91, top: 58 },
];

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [, setScrollY] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    projectDetails: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@(gmail|yahoo|outlook|hotmail)\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim()) {
      setMessage('Please enter your full name');
      return;
    }

    if (!formData.email.trim()) {
      setMessage('Please enter your email address');
      return;
    }

    if (!validateEmail(formData.email)) {
      setMessage('Please enter a valid Gmail or Yahoo email address');
      return;
    }

    if (!formData.projectDetails.trim()) {
      setMessage('Please enter project details');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const templateParams = {
        from_name: formData.fullName,
        from_email: formData.email,
        message: formData.projectDetails,
        to_email: 'nidaarshad113@gmail.com'
      };

      // Make sure your Service ID, Template ID, and Public Key are correct in your EmailJS dashboard
      await emailjs.send(
        'service_2ilmxw6',
        'template_0tujakj',
        templateParams,
        'u1JrTYSavjhFjaSBP'
      );

      setMessage('Message sent successfully! I will get back to you soon.');
      setFormData({ fullName: '', email: '', projectDetails: '' });

      if (formRef.current) formRef.current.reset();
    } catch (error: any) {
      console.error('EmailJS Error Details:', error);
      // Extract specific error message from EmailJS if available
      const errorMsg = error?.text || error?.message || 'Failed to send message. Please check console for details.';
      setMessage(`Error: ${errorMsg}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);

      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop) {
          setActiveSection(section);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleDownload = () => {
    const pdfUrl = '/downloads/Nida_Arshad_CV_Fortex.pdf';
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'Nida_Arshad_CV_Fortex.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleScheduleCall = () => {
    window.open('https://calendly.com/nidaarshad113/30min', '_blank');
  };

  const personalInfo = {
    name: "Nida Arshad Chaudhry",
    title: "Senior Full Stack Software Engineer",
    email: "nidaarshad113@gmail.com",
    phone: "+92-328-4828987",
    location: "Lahore, Pakistan",
    bio: "Full Stack Software Engineer with 3+ years of experience building scalable web and mobile applications using Next.js, NestJS, React.js, and React Native. Delivered 6+ major projects spanning SaaS, e-commerce, and enterprise systems."
  };

  const skills = [
    { name: "React.js / Next.js", level: 95, icon: <Globe className="w-5 h-5" />, color: "from-amber-400 to-yellow-600" },
    { name: "NestJS / Node.js", level: 90, icon: <Server className="w-5 h-5" />, color: "from-emerald-400 to-teal-600" },
    { name: "React Native", level: 85, icon: <Smartphone className="w-5 h-5" />, color: "from-rose-400 to-orange-500" },
    { name: "PostgreSQL / TypeORM", level: 88, icon: <Database className="w-5 h-5" />, color: "from-sky-400 to-indigo-500" },
    { name: "TypeScript / JavaScript", level: 92, icon: <Code className="w-5 h-5" />, color: "from-amber-300 to-orange-500" },
    { name: "Cybersecurity Basics", level: 75, icon: <Shield className="w-5 h-5" />, color: "from-stone-400 to-amber-700" }
  ];

  const projects = [
    {
      id: 1,
      title: "Order Me — Restaurant SaaS",
      description: "Multi-tenant SaaS platform featuring QR ordering, POS, Kitchen Display Systems (KDS), and inventory management.",
      image: "/images/Order-Me.png",
      imageFit: "contain" as const,
      tech: ["NestJS", "Next.js", "PostgreSQL", "Docker", "TypeORM"],
      github: "https://github.com/abdullaharshad099/OrderMe",
      live: "https://order-me-omega.vercel.app/login",
      featured: true,
      stats: { roles: "4 Roles", modules: "20+", apis: "80+" }
    },
    {
      id: 2,
      title: "Live with Quran",
      description: "Cross-platform mobile app for Ruku-based Qur'an learning, successfully launched on App Store and Google Play Store.",
      image: "/images/IshmaalQuran-Logo.jpg", // Ensure this file exists in your public/images folder
      imageFit: "cover" as const, // Changed to cover to fit the image properly
      tech: ["React Native", "NestJS", "PostgreSQL", "Next.js"],
      github: "#",
      live: "https://lwq.nighathashmi.com/login",
      featured: true,
      stats: { platforms: "iOS & Android", features: "Video/Audio", admin: "Next.js" }
    },
    {
      id: 3,
      title: "Hide Design",
      description: "Premium B2B outerwear platform serving as a digital catalogue, client inquiry system, and admin dashboard.",
      image: "/images/HideDeign.png",
      imageFit: "contain" as const,
      tech: ["Next.js 14", "NestJS", "PostgreSQL", "Cloudinary"],
      github: "#",
      live: "https://www.hidesdesign.com",
      featured: false,
      stats: { seo: "JSON-LD", crud: "Full", auth: "JWT" }
    },
    {
      id: 4,
      title: "Ipsum",
      description: "Mobile UI development with a focus on performance and seamless API integration.",
      image: "/images/ipsum-logo.png",
      imageFit: "contain" as const,
      tech: ["React Native CLI", "API Integration"],
      github: "#",
      live: "https://dev.ipsum-live.ipsum.co.uk/login",
      featured: false,
      stats: { type: "Mobile", focus: "UI/UX" }
    },
    {
      id: 5,
      title: "Tailor Application",
      description: "Full-stack application with authentication and CRUD functionality for tailoring businesses.",
      image: "",
      imageFit: "contain" as const,
      tech: ["Next.js", "NestJS", "Authentication"],
      github: "#",
      live: "#",
      featured: false,
      stats: { type: "Web App", backend: "NestJS" }
    },
    {
      id: 6,
      title: "Godwit (Hospital Management)",
      description: "Hospital management system with role-based modules and secure authentication.",
      image: "/images/godwitLogoBottom.png",
      imageFit: "contain" as const,
      tech: ["Next.js", "NestJS", "Role-Based Auth"],
      github: "#",
      live: "#",
      featured: false,
      stats: { type: "Enterprise", modules: "Multi-role" }
    },
  ];

  const experiences = [
    {
      company: "Fortex Solutions",
      position: "Senior Software Engineer",
      period: "April 2023 - Present",
      description: "Leading full-stack and mobile projects spanning SaaS platforms, content platforms, B2B e-commerce, and enterprise systems.",
      achievements: [
        "Delivered 6 major full-stack and mobile projects",
        "Launched a Qur'an learning app on both App Store and Google Play",
        "Architected multi-tenant SaaS (Order Me) serving 4 distinct roles",
        "Managed complete development lifecycle from frontend to database design"
      ]
    }
  ];

  const scrollTo = (elementId: string) => {
    document.getElementById(elementId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const ProjectImage = ({ project, className }: { project: typeof projects[number]; className: string }) => {
    if (!project.image) {
      return (
        <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br from-zinc-900 via-stone-900 to-black ${className}`}>
          <span className="text-4xl font-semibold tracking-[0.2em] text-amber-200/80">
            {project.title.slice(0, 2).toUpperCase()}
          </span>
        </div>
      );
    }

    return (
      <Image
        src={project.image}
        alt={project.title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={`${project.imageFit === 'contain' ? 'object-contain p-8' : 'object-cover'} ${className}`}
      />
    );
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#07080c] text-[#f4efe6]">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        {PARTICLES.map((particle, i) => (
          <div
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full bg-amber-200/40"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${i * 0.5}s`,
              transform: `translate(${mousePosition.x * 0.01 * (i + 1)}px, ${mousePosition.y * 0.01 * (i + 1)}px)`
            }}
          />
        ))}
      </div>

      <div
        className="pointer-events-none fixed z-50 hidden h-8 w-8 mix-blend-screen md:block"
        style={{
          left: mousePosition.x - 16,
          top: mousePosition.y - 16,
          background: 'radial-gradient(circle, rgba(212, 180, 131, 0.45) 0%, transparent 70%)',
          borderRadius: '50%',
          transition: 'all 0.15s ease-out'
        }}
      />

      <nav className="fixed top-0 z-40 w-full border-b border-white/8 bg-[#07080c]/70 backdrop-blur-2xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="text-lg font-semibold tracking-[0.18em] text-amber-200 uppercase">
              NAC
            </div>

            <div className="hidden space-x-1 md:flex">
              {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item.toLowerCase())}
                  className={`rounded-full px-4 py-2 text-sm font-medium tracking-wide transition-all duration-300 ${activeSection === item.toLowerCase()
                    ? 'bg-amber-200 text-stone-900 shadow-[0_0_24px_rgba(212,180,131,0.25)]'
                    : 'text-stone-300 hover:bg-white/5 hover:text-amber-100'
                    }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <button
              className="rounded-full border border-white/10 bg-white/5 p-2 transition-colors hover:bg-white/10 md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="border-t border-white/10 bg-[#07080c]/95 backdrop-blur-xl md:hidden">
            <div className="space-y-1 px-4 py-4">
              {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item.toLowerCase())}
                  className="block w-full rounded-xl px-4 py-3 text-left text-stone-300 transition-colors hover:bg-white/5 hover:text-amber-100"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <section id="home" className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,180,131,0.12),_transparent_55%)]" />
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(212, 180, 131, 0.12) 0%, transparent 42%)`
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-10">
            <div className="relative inline-block">
              {/* Fixed Profile Image Container */}
              <div className="relative mx-auto flex h-36 w-36 items-center justify-center overflow-hidden rounded-full border border-amber-200/30 shadow-[0_0_60px_rgba(212,180,131,0.18)]">
                <Image
                  src="/images/Me.jpg"
                  alt="Nida Arshad"
                  fill
                  sizes="144px"
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>

          <p className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-amber-200/80">
            Portfolio
          </p>
          <div className="space-y-5">
            <h1 className="text-5xl font-semibold leading-tight tracking-tight text-stone-50 md:text-7xl">
              {personalInfo.name}
            </h1>
            <h2 className="text-xl font-light tracking-wide text-amber-100/90 md:text-2xl">
              {personalInfo.title}
            </h2>
            <p className="mx-auto max-w-3xl text-base leading-relaxed text-stone-400 md:text-lg">
              {personalInfo.bio}
            </p>
          </div>

          <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
            <button
              onClick={() => scrollTo('projects')}
              className="group flex items-center justify-center rounded-full bg-amber-200 px-8 py-3.5 font-medium text-stone-900 transition-all duration-300 hover:bg-amber-100 hover:shadow-[0_0_32px_rgba(212,180,131,0.35)]"
            >
              View My Work
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="rounded-full border border-amber-200/30 px-8 py-3.5 font-medium text-amber-100 transition-all duration-300 hover:border-amber-200/60 hover:bg-amber-200/5"
            >
              Let's Connect
            </button>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { number: "6+", label: "Projects Delivered" },
              { number: "3+", label: "Years Experience" },
              { number: "80+", label: "APIs Built" },
              { number: "100%", label: "Client Satisfaction" }
            ].map((stat, index) => (
              <div key={index} className="rounded-2xl border border-white/8 bg-white/[0.03] p-6 backdrop-blur-sm">
                <div className="text-3xl font-semibold text-amber-200">{stat.number}</div>
                <div className="mt-1 text-sm text-stone-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="flex h-10 w-6 justify-center rounded-full border border-amber-200/40">
            <div className="mt-2 h-3 w-1 rounded-full bg-amber-200/80"></div>
          </div>
        </div>
      </section>

      <section id="about" className="relative py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-semibold tracking-tight text-stone-50 md:text-5xl">
              About Me
            </h2>
            <div className="mx-auto h-px w-16 bg-amber-200/70"></div>
          </div>

          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="space-y-8">
              <h3 className="text-3xl font-medium text-stone-100">
                Crafting digital excellence from Pakistan
              </h3>
              <p className="text-lg leading-relaxed text-stone-400">
                Based in {personalInfo.location}, I'm a passionate Full Stack Software Engineer who believes
                in the power of technology to transform ideas into reality. As a Senior Software Engineer at Fortex Solutions,
                I have led and delivered six full-stack and mobile projects spanning SaaS platforms, content platforms,
                B2B e-commerce, and enterprise systems.
              </p>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {[
                  { icon: <Mail className="h-5 w-5" />, label: "Email", value: personalInfo.email },
                  { icon: <Globe className="h-5 w-5" />, label: "Location", value: personalInfo.location },
                  { icon: <Zap className="h-5 w-5" />, label: "Experience", value: "3+ Years" },
                  { icon: <Target className="h-5 w-5" />, label: "Focus", value: "Full Stack & Mobile" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4 rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                    <div className="mt-1 text-amber-200">{item.icon}</div>
                    <div>
                      <div className="font-medium text-stone-100">{item.label}</div>
                      <div className="text-sm text-stone-500">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleDownload}
                  className="flex items-center rounded-full bg-amber-200 px-6 py-3 font-medium text-stone-900 transition-all hover:bg-amber-100"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download CV
                </button>
                <button onClick={() => scrollTo('projects')} className="rounded-full border border-amber-200/30 px-6 py-3 text-amber-100 transition-all hover:bg-amber-200/5">
                  View Portfolio
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                {/* Fixed About Section Image Container */}
                <div className="relative mx-auto flex h-[450px] w-full max-w-sm items-center justify-center overflow-hidden rounded-[2rem] border border-amber-200/20 shadow-[0_0_80px_rgba(212,180,131,0.12)]">
                  <Image
                    src="/images/Me.jpg"
                    alt="Nida Arshad Profile"
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="relative py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-semibold tracking-tight text-stone-50 md:text-5xl">
              Technical Arsenal
            </h2>
            <div className="mx-auto h-px w-16 bg-amber-200/70"></div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill, index) => (
              <div key={index} className="group rounded-3xl border border-white/8 bg-white/[0.03] p-8 transition-all duration-500 hover:border-amber-200/20 hover:bg-white/[0.05]">
                <div className="mb-6 flex items-center">
                  <div className={`mr-4 rounded-2xl bg-gradient-to-r ${skill.color} p-3 text-stone-900`}>
                    {skill.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-stone-100">{skill.name}</h3>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-stone-500">Proficiency</span>
                    <span className="font-semibold text-amber-200">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                    <div
                      className={`h-1.5 rounded-full bg-gradient-to-r ${skill.color}`}
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="relative py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-semibold tracking-tight text-stone-50 md:text-5xl">
              Featured Projects
            </h2>
            <div className="mx-auto h-px w-16 bg-amber-200/70"></div>
          </div>

          <div className="mb-10 grid gap-8 lg:grid-cols-2">
            {projects.filter(p => p.featured).map((project) => (
              <div key={project.id} className="group relative overflow-hidden rounded-3xl border border-white/8 bg-white/[0.03] transition-all duration-500 hover:border-amber-200/20">
                <div className="relative h-64 overflow-hidden bg-black">
                  <ProjectImage project={project} className="transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07080c] via-transparent to-transparent"></div>
                  <div className="absolute right-4 top-4">
                    <span className="rounded-full bg-amber-200 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-900">Featured</span>
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="mb-3 text-2xl font-semibold text-stone-50 transition-colors group-hover:text-amber-200">{project.title}</h3>
                  <p className="mb-6 leading-relaxed text-stone-400">{project.description}</p>

                  <div className="mb-6 flex flex-wrap gap-2">
                    {project.tech.map((tech, index) => (
                      <span key={index} className="rounded-full border border-amber-200/20 bg-amber-200/5 px-3 py-1 text-sm text-amber-100/90">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mb-6 grid grid-cols-3 gap-4">
                    {Object.entries(project.stats).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-lg font-semibold text-amber-200">{value}</div>
                        <div className="text-xs capitalize text-stone-500">{key}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <a href={project.github} className="flex flex-1 items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-3 transition-colors hover:bg-white/10">
                      <Github className="mr-2 h-4 w-4" />
                      Code
                    </a>
                    <a href={project.live} className="flex flex-1 items-center justify-center rounded-full bg-amber-200 px-4 py-3 font-medium text-stone-900 transition-all hover:bg-amber-100">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.filter(p => !p.featured).map((project) => (
              <div key={project.id} className="group relative overflow-hidden rounded-3xl border border-white/8 bg-white/[0.03] transition-all duration-300 hover:border-amber-200/20">
                <div className="relative h-48 overflow-hidden bg-black">
                  <ProjectImage project={project} className="transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07080c] via-transparent to-transparent"></div>
                </div>

                <div className="p-6">
                  <h3 className="mb-2 text-xl font-semibold text-stone-50">{project.title}</h3>
                  <p className="mb-4 text-sm text-stone-400">{project.description}</p>

                  <div className="mb-4 flex flex-wrap gap-1">
                    {project.tech.slice(0, 3).map((tech, index) => (
                      <span key={index} className="rounded-full bg-amber-200/10 px-2 py-1 text-xs text-amber-100/90">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <a href={project.github} className="flex items-center text-sm text-stone-500 transition-colors hover:text-amber-200">
                      <Github className="mr-1 h-4 w-4" />
                      Code
                    </a>
                    <a href={project.live} className="flex items-center text-sm text-stone-500 transition-colors hover:text-amber-200">
                      <ExternalLink className="mr-1 h-4 w-4" />
                      Demo
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="relative py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-semibold tracking-tight text-stone-50 md:text-5xl">
              Career Journey
            </h2>
            <div className="mx-auto h-px w-16 bg-amber-200/70"></div>
          </div>

          <div className="mx-auto max-w-4xl">
            {experiences.map((exp, index) => (
              <div key={index} className="relative mb-12 last:mb-0">
                <div className="flex flex-col items-start gap-8 lg:flex-row">
                  <div className="w-full flex-shrink-0 lg:w-1/3">
                    <div className="rounded-2xl border border-amber-200/20 bg-gradient-to-br from-amber-200 to-yellow-600 p-6 text-stone-900 shadow-[0_0_40px_rgba(212,180,131,0.15)]">
                      <div className="text-lg font-semibold">{exp.period}</div>
                      <div className="text-sm opacity-80">{exp.company}</div>
                    </div>
                  </div>

                  <div className="w-full rounded-3xl border border-white/8 bg-white/[0.03] p-8 lg:w-2/3">
                    <h3 className="mb-3 text-2xl font-semibold text-stone-50">{exp.position}</h3>
                    <p className="mb-6 leading-relaxed text-stone-400">{exp.description}</p>

                    <div className="space-y-2">
                      <h4 className="mb-3 font-medium text-amber-200">Key Achievements</h4>
                      {exp.achievements.map((achievement, i) => (
                        <div key={i} className="flex items-center space-x-3">
                          <Star className="h-4 w-4 flex-shrink-0 text-amber-300" />
                          <span className="text-stone-300">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="relative py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-semibold tracking-tight text-stone-50 md:text-5xl">
              Let's Create Something Amazing
            </h2>
            <div className="mx-auto h-px w-16 bg-amber-200/70"></div>
          </div>

          <div className="grid gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <h3 className="text-3xl font-medium text-stone-100">
                Ready to build the future?
              </h3>
              <p className="text-lg leading-relaxed text-stone-400">
                I'm always excited to work on new projects and collaborate with amazing people.
                Whether you have a project in mind or just want to connect, I'd love to hear from you!
              </p>

              <div className="space-y-4">
                {[
                  { icon: <Mail className="h-6 w-6" />, label: "Email", value: personalInfo.email, href: `mailto:${personalInfo.email}` },
                  { icon: <Github className="h-6 w-6" />, label: "GitHub", value: "github.com/NidaArshad1908", href: "https://github.com/NidaArshad1908" },
                  { icon: <Linkedin className="h-6 w-6" />, label: "LinkedIn", value: "linkedin.com/in/nida-arshad-chaudhry-119071286", href: "https://www.linkedin.com/in/nida-arshad-chaudhry-119071286/" }
                ].map((contact, index) => (
                  <a key={index} href={contact.href} className="group flex items-center space-x-4 rounded-2xl border border-white/8 bg-white/[0.03] p-4 transition-all duration-300 hover:border-amber-200/20">
                    <div className="text-amber-200">{contact.icon}</div>
                    <div>
                      <div className="font-medium text-stone-100">{contact.label}</div>
                      <div className="text-stone-500">{contact.value}</div>
                    </div>
                  </a>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <button onClick={handleDownload} className="flex items-center rounded-full bg-amber-200 px-6 py-3 font-medium text-stone-900 transition-all hover:bg-amber-100">
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </button>
                <button
                  onClick={handleScheduleCall}
                  disabled={isLoading}
                  className="flex items-center rounded-full border border-amber-200/30 px-6 py-3 text-amber-100 transition-all hover:bg-amber-200/5"
                >
                  <Users className="mr-2 h-4 w-4" />
                  {isLoading ? 'Loading...' : 'Schedule Call'}
                </button>
              </div>
            </div>

            <div className="rounded-3xl border border-white/8 bg-white/[0.03] p-8">
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="mb-3 block text-sm font-medium text-stone-300">
                    Full Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-stone-100 placeholder-stone-500 outline-none transition-all duration-300 focus:border-amber-200/40"
                    placeholder="Your Name"
                    required
                  />
                </div>

                <div>
                  <label className="mb-3 block text-sm font-medium text-stone-300">
                    Email Address <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-stone-100 placeholder-stone-500 outline-none transition-all duration-300 focus:border-amber-200/40"
                    placeholder="your.email@gmail.com"
                    required
                  />
                </div>

                <div>
                  <label className="mb-3 block text-sm font-medium text-stone-300">
                    Project Details <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    name="projectDetails"
                    value={formData.projectDetails}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-stone-100 placeholder-stone-500 outline-none transition-all duration-300 focus:border-amber-200/40"
                    placeholder="Tell me about your project ideas, requirements, or just say hello!"
                    required
                  ></textarea>
                </div>

                {message && (
                  <div className={`rounded-xl p-3 text-center ${message.includes('successfully') ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                    }`}>
                    {message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex w-full items-center justify-center rounded-full bg-amber-200 px-6 py-4 font-medium text-stone-900 transition-all duration-300 hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isLoading ? 'Sending...' : 'Send Message'}
                  {!isLoading && <ArrowRight className="ml-2 h-5 w-5" />}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/8 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-6">
              <h3 className="mb-2 text-2xl font-semibold tracking-tight text-amber-100">
                {personalInfo.name}
              </h3>
              <p className="text-stone-500">
                Crafting digital experiences with passion and precision
              </p>
            </div>

            <div className="mb-8 flex justify-center space-x-4">
              {[
                { icon: <Github className="h-5 w-5" />, href: "https://github.com/NidaArshad1908", label: "GitHub" },
                {
                  icon: <Linkedin className="h-5 w-5" />, href: "https://www.linkedin.com/in/nida-arshad-chaudhry-119071286", label: "LinkedIn"
                },
                { icon: <Mail className="h-5 w-5" />, href: `mailto:${personalInfo.email}`, label: "Email" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="rounded-full border border-white/10 bg-white/5 p-3 text-stone-400 transition-all duration-300 hover:border-amber-200/30 hover:text-amber-200"
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <div className="flex items-center justify-center space-x-2 text-sm text-stone-600">
              <span>© 2026 {personalInfo.name}. Designed & Built with</span>
              <Heart className="h-4 w-4 text-rose-400" />
              <span>in Pakistan</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;