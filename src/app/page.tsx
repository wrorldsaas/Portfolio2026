'use client'

import { useState, useEffect, Suspense, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
  Mail,
  Phone,
  MapPin,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ChevronDown,
  ExternalLink,
  Instagram,
  Linkedin,
  Sparkles,
  Box,
  TrendingUp,
  Target,
  Eye,
  Award,
  Zap,
  Users,
  ArrowRight,
  Send
} from 'lucide-react'

// Dynamically import Three.js components to avoid SSR issues
const ThreeBackground = dynamic(() => import('@/components/portfolio/ThreeBackground'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-black" />
})

const ModelViewer = dynamic(() => import('@/components/portfolio/ModelViewer'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[300px] flex items-center justify-center bg-black/50 rounded-lg">
      <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin" />
    </div>
  )
})

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 }
}

// Services data
const services = [
  {
    icon: Box,
    title: '3D Product Visualization',
    description: 'CGI renderings that showcase products to an elite standard, ready for retail. High-quality photorealistic renders that elevate brand perception and drive conversions.',
    features: ['Photorealistic Rendering', 'Product Animation', 'Interactive 3D Models', 'AR/VR Ready Assets']
  },
  {
    icon: TrendingUp,
    title: 'Performance Editing',
    description: 'Advertisements optimized for retention and CTR. Data-driven video editing that maximizes engagement and delivers measurable results for your campaigns.',
    features: ['A/B Testing Variants', 'Platform Optimization', 'Retention Analytics', 'Hook Optimization']
  },
  {
    icon: Target,
    title: 'Strategic Management',
    description: 'Instagram analytics, landing page optimization, and cross-channel marketing strategies. Comprehensive digital marketing solutions that amplify your brand presence.',
    features: ['Social Media Strategy', 'Content Calendar', 'Performance Analytics', 'Growth Optimization']
  }
]

// Projects data
const projects = [
  {
    id: 1,
    title: 'Luxury Watch Campaign',
    category: '3D Visualization',
    description: 'High-end photorealistic renders for premium watch brand campaign.',
    modelType: 'torus' as const,
    metrics: { views: '2.5M', ctr: '4.2%', conversion: '+180%' }
  },
  {
    id: 2,
    title: 'Tech Product Launch',
    category: 'Performance Editing',
    description: 'Multi-platform video campaign with optimized retention strategies.',
    modelType: 'cube' as const,
    metrics: { views: '1.8M', ctr: '5.1%', conversion: '+220%' }
  },
  {
    id: 3,
    title: 'E-commerce Brand Identity',
    category: 'Strategic Management',
    description: 'Complete digital transformation with cross-channel marketing.',
    modelType: 'complex' as const,
    metrics: { views: '890K', ctr: '6.8%', conversion: '+340%' }
  },
  {
    id: 4,
    title: 'Automotive Showcase',
    category: '3D Visualization',
    description: 'Cinematic product visualization for automotive industry.',
    modelType: 'sphere' as const,
    metrics: { views: '3.2M', ctr: '3.9%', conversion: '+150%' }
  }
]

// Stats data
const stats = [
  { value: '50+', label: 'Projects Delivered', icon: Award },
  { value: '98%', label: 'Client Satisfaction', icon: Users },
  { value: '5M+', label: 'Views Generated', icon: Eye },
  { value: '3x', label: 'Avg. ROI Increase', icon: Zap }
]

export default function Portfolio() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [activeProject, setActiveProject] = useState(0)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setSubmitSuccess(true)
    setFormData({ name: '', email: '', message: '' })
    setTimeout(() => setSubmitSuccess(false), 5000)
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-gold/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center">
                <span className="text-black font-bold text-sm sm:text-lg">GR</span>
              </div>
              <span className="text-lg sm:text-xl font-semibold text-gradient-gold">Guilherme Rafael</span>
            </motion.div>

            <div className="hidden md:flex items-center gap-8">
              {['Services', 'Work', 'Video', 'Contact'].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-muted-foreground hover:text-gold transition-colors relative group"
                  whileHover={{ y: -2 }}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                className="bg-gradient-to-r from-gold to-gold-light text-black font-semibold hover:shadow-lg hover:shadow-gold/30 transition-all duration-300"
              >
                <a href="#contact">
                  Hire Me
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <ThreeBackground />
        
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-6"
          >
            <Badge className="bg-gold/10 text-gold border-gold/20 px-4 py-2 text-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              3D Visualization & Digital Marketing Expert
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          >
            <span className="text-white">Crafting </span>
            <span className="text-gradient-gold">Visual</span>
            <br />
            <span className="text-gradient-gold">Experiences</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10"
          >
            Transforming brands through stunning 3D visualizations, 
            performance-driven video editing, and strategic digital marketing.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-gold to-gold-light text-black font-semibold px-8 py-6 text-lg glow-gold hover:shadow-xl hover:shadow-gold/40 transition-all duration-300"
              asChild
            >
              <a href="#work">
                View My Work
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-gold/50 text-gold hover:bg-gold/10 px-8 py-6 text-lg"
              asChild
            >
              <a href="#contact">
                <Mail className="mr-2 w-5 h-5" />
                Get In Touch
              </a>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                className="text-center p-4 rounded-xl bg-black/40 backdrop-blur-sm border border-gold/10"
              >
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-gold" />
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gradient-gold">{stat.value}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center text-gold/60"
          >
            <span className="text-xs mb-2">Scroll to explore</span>
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 sm:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="text-white">What I </span>
              <span className="text-gradient-gold">Do</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Specialized services tailored to elevate your brand and drive measurable results
            </motion.p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                variants={{ ...scaleIn, transition: { delay: index * 0.1 } }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className="h-full bg-card/50 backdrop-blur-sm border-gold/10 hover:border-gold/30 transition-all duration-500 card-hover overflow-hidden">
                  <CardHeader>
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center mb-4"
                    >
                      <service.icon className="w-7 h-7 text-gold" />
                    </motion.div>
                    <CardTitle className="text-xl text-white group-hover:text-gold transition-colors">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-gold mr-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="section-divider" />

      {/* Video Section */}
      <section id="video" className="py-20 sm:py-32 relative">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="text-white">Featured </span>
              <span className="text-gradient-gold">Showreel</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A showcase of my best work in 3D visualization and video production
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative max-w-5xl mx-auto"
          >
            <div className="video-container glow-gold-intense aspect-video rounded-2xl overflow-hidden bg-black/50">
              {/* Video placeholder - Replace src with your MP4 file */}
              <video
                className="w-full h-full object-cover"
                autoPlay={isVideoPlaying}
                muted={isMuted}
                loop
                playsInline
                poster="/api/placeholder/1920/1080"
              >
                {/* Add your MP4 source here */}
                <source src="/your-ad-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Video controls overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="bg-black/50 hover:bg-black/70 text-white"
                    onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                  >
                    {isVideoPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="bg-black/50 hover:bg-black/70 text-white"
                    onClick={() => setIsMuted(!isMuted)}
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </Button>
                </div>
                <Badge className="bg-gold/20 text-gold border-gold/30">
                  Performance Edit
                </Badge>
              </div>

              {/* Placeholder overlay when no video */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gold/5 to-transparent pointer-events-none">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <Play className="w-10 h-10 text-gold ml-1" />
                  </div>
                  <p className="text-gold/60 text-sm">Insert your MP4 video here</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="section-divider" />

      {/* Work Section */}
      <section id="work" className="py-20 sm:py-32 relative">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="text-white">Selected </span>
              <span className="text-gradient-gold">Projects</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Interactive 3D showcases featuring my recent work
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Project List */}
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-4"
            >
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={{ ...fadeInUp, transition: { delay: index * 0.1 } }}
                  onClick={() => setActiveProject(index)}
                  className={`cursor-pointer p-6 rounded-xl border transition-all duration-300 ${
                    activeProject === index
                      ? 'bg-gold/10 border-gold/30 glow-gold'
                      : 'bg-card/30 border-gold/10 hover:border-gold/20'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className={`text-lg font-semibold mb-1 ${
                        activeProject === index ? 'text-gold' : 'text-white'
                      }`}>
                        {project.title}
                      </h3>
                      <Badge variant="outline" className="border-gold/20 text-gold/80">
                        {project.category}
                      </Badge>
                    </div>
                    <ExternalLink className={`w-5 h-5 ${
                      activeProject === index ? 'text-gold' : 'text-muted-foreground'
                    }`} />
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="flex items-center gap-1 text-gold">
                      <Eye className="w-3 h-3" /> {project.metrics.views}
                    </span>
                    <span className="flex items-center gap-1 text-gold">
                      <TrendingUp className="w-3 h-3" /> {project.metrics.ctr} CTR
                    </span>
                    <span className="flex items-center gap-1 text-gold">
                      <Zap className="w-3 h-3" /> {project.metrics.conversion}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* 3D Model Viewer */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-[500px] lg:h-auto rounded-2xl border border-gold/20 bg-card/30 overflow-hidden"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject}
                  initial={{ opacity: 0, rotateY: -90 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  exit={{ opacity: 0, rotateY: 90 }}
                  transition={{ duration: 0.5 }}
                  className="h-full"
                >
                  <ModelViewer modelType={projects[activeProject].modelType} />
                </motion.div>
              </AnimatePresence>
              
              {/* Project Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-xl font-semibold text-gold mb-1">
                  {projects[activeProject].title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {projects[activeProject].description}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="section-divider" />

      {/* Contact Section */}
      <section id="contact" className="py-20 sm:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="text-white">Let's </span>
              <span className="text-gradient-gold">Connect</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Ready to elevate your brand? Let's discuss your project
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-card/50 backdrop-blur-sm border-gold/20">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Send a Message</CardTitle>
                  <CardDescription>
                    Fill out the form and I'll get back to you within 24 hours
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">Name</label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your name"
                        className="bg-background border-gold/20 focus:border-gold"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">Email</label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        className="bg-background border-gold/20 focus:border-gold"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">Message</label>
                      <Textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell me about your project..."
                        rows={4}
                        className="bg-background border-gold/20 focus:border-gold resize-none"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-gold to-gold-light text-black font-semibold py-6 hover:shadow-lg hover:shadow-gold/30 transition-all duration-300"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                          Sending...
                        </div>
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 w-4 h-4" />
                        </>
                      )}
                    </Button>
                    
                    <AnimatePresence>
                      {submitSuccess && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm text-center"
                        >
                          Message sent successfully! I'll get back to you soon.
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-semibold text-white mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <motion.a
                    href="mailto:guilhermerafaelmeister2019@gmail.com"
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-card/30 border border-gold/10 hover:border-gold/30 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                      <Mail className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="text-white group-hover:text-gold transition-colors">
                        guilhermerafaelmeister2019@gmail.com
                      </p>
                    </div>
                  </motion.a>

                  <motion.a
                    href="tel:+5561992141310"
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-card/30 border border-gold/10 hover:border-gold/30 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                      <Phone className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="text-white group-hover:text-gold transition-colors">
                        +55 61 992141310
                      </p>
                    </div>
                  </motion.a>

                  <div className="flex items-center gap-4 p-4 rounded-xl bg-card/30 border border-gold/10">
                    <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="text-white">Brazil</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Follow Me</h3>
                <div className="flex gap-4">
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-xl bg-card/50 border border-gold/10 flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold/30 transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-xl bg-card/50 border border-gold/10 flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold/30 transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </motion.a>
                </div>
              </div>

              {/* Quick Action */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-gold/10 to-transparent border border-gold/20"
              >
                <h4 className="text-lg font-semibold text-gold mb-2">Ready to start a project?</h4>
                <p className="text-muted-foreground text-sm mb-4">
                  Let's create something amazing together. I'm always open to discussing new projects and opportunities.
                </p>
                <Button
                  className="bg-gradient-to-r from-gold to-gold-light text-black font-semibold hover:shadow-lg hover:shadow-gold/30"
                  asChild
                >
                  <a href="mailto:guilhermerafaelmeister2019@gmail.com">
                    <Mail className="mr-2 w-4 h-4" />
                    Email Me Directly
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gold/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center">
                <span className="text-black font-bold text-sm">GR</span>
              </div>
              <span className="text-muted-foreground">
                © {new Date().getFullYear()} Guilherme Rafael de Souza. All rights reserved.
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#services" className="hover:text-gold transition-colors">Services</a>
              <a href="#work" className="hover:text-gold transition-colors">Work</a>
              <a href="#contact" className="hover:text-gold transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
