/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail, ExternalLink, Download, Code, Palette, Globe, Server, Database, Smartphone, ArrowRight, Star, Zap, Target, Users, Heart } from 'lucide-react';
import Image from 'next/image';
import emailjs from 'emailjs-com';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [, setScrollY] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

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

      await emailjs.send(
        'service_2ilmxw6',
        'template_0tujakj',
        templateParams,
        'u1JrTYSavjhFjaSBP'
      );

      setMessage('Message sent successfully! I will get back to you soon.');
      setFormData({ fullName: '', email: '', projectDetails: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      setMessage('Failed to send message. Please try again.');
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
    const pdfUrl = '/downloads/Resume-Nida-Arshad.pdf';

    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'Resume-Nida-Arshad.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleScheduleCall = () => {
    setIsLoading(true);
    window.open('https://calendly.com/nidaarshad113/30min', '_blank');
    setIsLoading(false);
  };

  const personalInfo = {
    name: "Nida Arshad Ch",
    title: "Creative Full Stack Developer",
    email: "nidaarshad113@gmail.com",
    phone: "+92-XXX-XXXXXXX",
    location: "Lahore, Pakistan",
    bio: "I craft digital experiences that blend creativity with cutting-edge technology. Passionate about building the future, one line of code at a time."
  };

  const skills = [
    { name: "JavaScript/TypeScript", level: 95, icon: <Code className="w-5 h-5" />, color: "from-yellow-400 to-orange-500" },
    { name: "React/Next.js", level: 92, icon: <Globe className="w-5 h-5" />, color: "from-blue-400 to-cyan-500" },
    { name: "Node.js/Express", level: 88, icon: <Server className="w-5 h-5" />, color: "from-green-400 to-emerald-500" },
    { name: "MongoDB/PostgreSQL", level: 85, icon: <Database className="w-5 h-5" />, color: "from-purple-400 to-pink-500" },
    { name: "UI/UX Design", level: 82, icon: <Palette className="w-5 h-5" />, color: "from-pink-400 to-rose-500" },
    { name: "React Native", level: 78, icon: <Smartphone className="w-5 h-5" />, color: "from-indigo-400 to-purple-500" }
  ];

  const projects = [
    {
      id: 1,
      title: "Ipsum Live Asset Handler",
      description: "Next-gen shopping platform with AI recommendations and real-time analytics",
      image: "/images/ipsum-logo.png",
      tech: ["React Native", "Flutter", "Java", "PostgreSQL"],
      github: "#",
      live: "#",
      featured: true,
      stats: { users: "10K+", performance: "98%", growth: "+240%" }
    },
    {
      id: 2,
      title: "GodWit",
      description: "Real-time collaboration platform with advanced project management",
      image: "/images/godwitLogoBottom.png",
      tech: ["Next.JS", "GraphQL", "Node.js", "MongoDB", "SQL"],
      github: "#",
      live: "#",
      featured: true,
      stats: { users: "5K+", performance: "99%", growth: "+180%" }
    },
  ];

  const experiences = [
    {
      company: "TechVision Labs",
      position: "Lead Full Stack Developer",
      period: "2025 - Present",
      description: "Leading a team of 8 developers, architecting scalable solutions for enterprise clients",
      achievements: ["Increased team productivity by 40%", "Built 3 major platforms", "Mentored 12+ developers"],
      color: "from-blue-500 to-purple-600"
    },
    {
      company: "Innovation Studios",
      position: "Senior Frontend Developer",
      period: "2024 - 2025",
      description: "Specialized in creating immersive user experiences and complex interactive applications",
      achievements: ["Led UI/UX transformation", "Reduced load times by 60%", "Implemented PWA features"],
      color: "from-green-500 to-blue-500"
    },
    {
      company: "StartUp Hub",
      position: "Full Stack Developer",
      period: "2023 - 2024",
      description: "Built MVP products and scaled them to thousands of users",
      achievements: ["Launched successful products", "Gained 50K+ users", "Implemented CI/CD"],
      color: "from-purple-500 to-pink-500"
    }
  ];

  const scrollTo = (elementId: string) => {
    document.getElementById(elementId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const FloatingElements = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.5}s`,
            transform: `translate(${mousePosition.x * 0.01 * (i + 1)}px, ${mousePosition.y * 0.01 * (i + 1)}px)`
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-x-hidden">
      <FloatingElements />

      <div
        className="fixed w-6 h-6 pointer-events-none z-50 mix-blend-difference"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, transparent 70%)',
          borderRadius: '50%',
          transition: 'all 0.1s ease-out'
        }}
      />

      <nav className="fixed top-0 w-full bg-white/10 backdrop-blur-xl border-b border-white/10 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {personalInfo.name}
            </div>

            <div className="hidden md:flex space-x-1">
              {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item.toLowerCase())}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 ${activeSection === item.toLowerCase()
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <button
              className="md:hidden p-2 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-black/50 backdrop-blur-xl border-t border-white/10">
            <div className="px-4 py-4 space-y-2">
              {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item.toLowerCase())}
                  className="block w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 animate-pulse"></div>
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`
            }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="relative inline-block">
              <div className="w-40 h-40 mx-auto bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-5xl font-bold animate-pulse shadow-2xl shadow-blue-500/25">
                {personalInfo.name.split(' ').map(name => name[0]).join('')}
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-xl opacity-30 animate-pulse"></div>
            </div>
          </div>

          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent leading-tight">
              {personalInfo.name}
            </h1>
            <h2 className="text-2xl md:text-3xl text-blue-300 font-light">
              {personalInfo.title}
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {personalInfo.bio}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12">
            <button
              onClick={() => scrollTo('projects')}
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-medium hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 flex items-center justify-center"
            >
              View My Work
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="px-8 py-4 border border-blue-500/50 rounded-xl font-medium hover:bg-blue-500/10 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
            >
              Let's Connect
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {[
              { number: "10+", label: "Projects Completed" },
              { number: "3+", label: "Years Experience" },
              { number: "100K+", label: "Lines of Code" },
              { number: "98%", label: "Client Satisfaction" }
            ].map((stat, index) => (
              <div key={index} className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="text-3xl font-bold text-blue-400">{stat.number}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-blue-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-blue-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h3 className="text-3xl font-bold text-white mb-6">
                Crafting Digital Excellence from Pakistan 🇵🇰
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Based in the vibrant city of {personalInfo.location}, I'm a passionate developer who believes
                in the power of technology to transform ideas into reality. With over 3 years of experience,
                I've worked with startups to enterprises, creating solutions that matter.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { icon: <Mail className="w-5 h-5" />, label: "Email", value: personalInfo.email },
                  { icon: <Globe className="w-5 h-5" />, label: "Location", value: personalInfo.location },
                  { icon: <Zap className="w-5 h-5" />, label: "Experience", value: "3+ Years" },
                  { icon: <Target className="w-5 h-5" />, label: "Focus", value: "Full Stack" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                    <div className="text-blue-400 mt-1">{item.icon}</div>
                    <div>
                      <div className="font-semibold text-white">{item.label}</div>
                      <div className="text-gray-400 text-sm">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleDownload}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:shadow-xl transition-all duration-300 flex items-center text-white"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download CV
                </button>
                <button className="px-6 py-3 border border-blue-500/50 rounded-xl hover:bg-blue-500/10 transition-all duration-300">
                  View Portfolio
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <div className="w-80 h-80 mx-auto bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center text-white text-8xl font-bold shadow-2xl">
                  {personalInfo.name.split(' ').map(name => name[0]).join('')}
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur-3xl opacity-30 scale-110"></div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
              Technical Arsenal
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <div key={index} className="group p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                <div className="flex items-center mb-6">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${skill.color} mr-4 group-hover:scale-110 transition-transform`}>
                    {skill.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">{skill.name}</h3>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Proficiency</span>
                    <span className="text-blue-400 font-bold">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-3 rounded-full bg-gradient-to-r ${skill.color} transition-all duration-1000 ease-out`}
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {projects.filter(p => p.featured).map((project) => (
              <div key={project.id} className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-blue-500 text-xs font-bold rounded-full">FEATURED</span>
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{project.title}</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-300 text-sm rounded-lg backdrop-blur-sm">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {Object.entries(project.stats).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-lg font-bold text-blue-400">{value}</div>
                        <div className="text-xs text-gray-500 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <a href={project.github} className="flex-1 flex items-center justify-center px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors group">
                      <Github className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                      Code
                    </a>
                    <a href={project.live} className="flex-1 flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-xl rounded-xl transition-all">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.filter(p => !p.featured).map((project) => (
              <div key={project.id} className="group relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-400 mb-4 text-sm">{project.description}</p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.tech.slice(0, 3).map((tech, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <a href={project.github} className="flex items-center text-gray-400 hover:text-blue-400 transition-colors text-sm">
                      <Github className="w-4 h-4 mr-1" />
                      Code
                    </a>
                    <a href={project.live} className="flex items-center text-gray-400 hover:text-blue-400 transition-colors text-sm">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Demo
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
              Career Journey
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            {experiences.map((exp, index) => (
              <div key={index} className="relative mb-12 last:mb-0">
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                  <div className="lg:w-1/3 flex-shrink-0">
                    <div className={`p-6 rounded-2xl bg-gradient-to-r ${exp.color} shadow-xl`}>
                      <div className="text-white font-bold text-lg">{exp.period}</div>
                      <div className="text-white/90 text-sm">{exp.company}</div>
                    </div>
                  </div>

                  <div className="lg:w-2/3 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 hover:bg-white/10 transition-all duration-300">
                    <h3 className="text-2xl font-bold text-white mb-3">{exp.position}</h3>
                    <p className="text-gray-300 mb-6 leading-relaxed">{exp.description}</p>

                    <div className="space-y-2">
                      <h4 className="text-blue-400 font-semibold mb-3">Key Achievements:</h4>
                      {exp.achievements.map((achievement, i) => (
                        <div key={i} className="flex items-center space-x-3">
                          <Star className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                          <span className="text-gray-300">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {index < experiences.length - 1 && (
                  <div className="hidden lg:block absolute left-[16.66%] top-32 w-px h-16 bg-gradient-to-b from-blue-500 to-purple-600"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
              Let's Create Something Amazing
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <h3 className="text-3xl font-bold text-white mb-6">
                Ready to Build the Future?
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                I'm always excited to work on new projects and collaborate with amazing people.
                Whether you have a project in mind or just want to connect, I'd love to hear from you!
              </p>

              <div className="space-y-6">
                {[
                  { icon: <Mail className="w-6 h-6" />, label: "Email", value: personalInfo.email, href: `mailto:${personalInfo.email}` },
                  { icon: <Github className="w-6 h-6" />, label: "GitHub", value: "github.com/NidaArshad1908", href: "https://github.com/NidaArshad1908" },
                  { icon: <Linkedin className="w-6 h-6" />, label: "LinkedIn", value: "linkedin.com/in/nida-arshad-119071286", href: "https://www.linkedin.com/in/nida-arshad-119071286/" }
                ].map((contact, index) => (
                  <a key={index} href={contact.href} className="group flex items-center space-x-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                    <div className="text-blue-400 group-hover:scale-110 transition-transform">{contact.icon}</div>
                    <div>
                      <div className="font-semibold text-white">{contact.label}</div>
                      <div className="text-gray-400">{contact.value}</div>
                    </div>
                  </a>
                ))}
              </div>

              <div className="flex space-x-4">
                <button onClick={handleDownload} className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:shadow-xl transition-all duration-300 flex items-center">
                  <Download className="w-4 h-4 mr-2" />
                  Download Resume
                </button>
                <button
                  onClick={handleScheduleCall}
                  disabled={isLoading}
                  className="px-6 py-3 border border-blue-500/50 rounded-xl hover:bg-blue-500/10 transition-all duration-300 flex items-center"
                >
                  <Users className="w-4 h-4 mr-2" />
                  {isLoading ? 'Loading...' : 'Schedule Call'}
                </button>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 hover:bg-white/10 transition-all duration-300">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 bg-white/5 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300"
                    placeholder="Your Name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 bg-white/5 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300"
                    placeholder="your.email@gmail.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Project Details <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="projectDetails"
                    value={formData.projectDetails}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-4 py-4 bg-white/5 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300 resize-none"
                    placeholder="Tell me about your project ideas, requirements, or just say hello!"
                    required
                  ></textarea>
                </div>

                {message && (
                  <div className={`p-3 rounded-lg text-center ${message.includes('successfully') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                    {message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-medium hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Sending...' : 'Send Message'}
                  {!isLoading && <ArrowRight className="ml-2 w-5 h-5" />}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 bg-black/20 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
                {personalInfo.name}
              </h3>
              <p className="text-gray-400">
                Crafting digital experiences with passion and precision
              </p>
            </div>

            <div className="flex justify-center space-x-6 mb-8">
              {[
                { icon: <Github className="w-6 h-6" />, href: "https://github.com/NidaArshad1908", label: "GitHub" },
                { icon: <Linkedin className="w-6 h-6" />, href: "https://www.linkedin.com/in/nida-arshad-119071286/", label: "LinkedIn" },
                { icon: <Mail className="w-6 h-6" />, href: `mailto:${personalInfo.email}`, label: "Email" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-110 text-gray-400 hover:text-blue-400"
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <div className="text-gray-500 text-sm flex items-center justify-center space-x-2">
              <span>© 2025 {personalInfo.name}. Designed & Built with</span>
              <Heart className="w-4 h-4 text-red-400 animate-pulse" />
              <span>in Pakistan 🇵🇰</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;