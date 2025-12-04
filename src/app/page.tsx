"use client"

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  BookOpen, 
  Users, 
  Star, 
  Clock, 
  DollarSign, 
  CheckCircle, 
  ArrowRight, 
  Play,
  Pause,
  GraduationCap,
  Target,
  Award,
  Heart,
  Zap,
  Shield,
  Globe,
  MessageSquare,
  Video,
  Calendar,
  TrendingUp,
  Sparkles,
  MapPin,
  Brain,
  Smartphone,
  Monitor,
  BookMarked,
  Trophy,
  Lightbulb,
  Mic,
  Languages,
  Bot,
  School,
  UserCheck,
  Clock4,
  Phone,
  Mail,
  MessageCircle
} from 'lucide-react'

import { useAuthPopup } from '@/hooks/useAuthPopup';
import { useAuth } from '@/contexts/AuthContext';

// Custom Video Component with Controls
function VideoWithControls({ src, className = "" }: { src: string; className?: string }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="relative group">
      <video
        ref={videoRef}
        autoPlay
        loop
        playsInline
        className={className}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Video Controls Overlay */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="bg-black/50 backdrop-blur-sm rounded-full p-3 flex items-center space-x-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={togglePlay}
            className="text-white hover:text-white hover:bg-white/20"
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={toggleMute}
            className="text-white hover:text-white hover:bg-white/20"
          >
            {isMuted ? <Mic className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const { openPopup } = useAuthPopup();
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  // Redirect authenticated users to their appropriate dashboard
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'STUDENT') {
        router.push('/student/dashboard');
      } else if (user.role === 'TUTOR') {
        router.push('/tutor/dashboard');
      } else {
        router.push('/dashboard'); // fallback
      }
    }
  }, [isAuthenticated, user, router]);

  // Show loading or return null while redirecting
  if (isAuthenticated && user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Redirecting to your dashboard...</p>
        </div>
      </div>
    );
  }
  
  const delhiLocations = [
    { name: "Lajpat Nagar", students: 150, tutors: 25, rating: 4.8 },
    { name: "Rohini", students: 120, tutors: 20, rating: 4.7 },
    { name: "Dwarka", students: 180, tutors: 30, rating: 4.9 },
    { name: "Saket", students: 90, tutors: 15, rating: 4.6 },
    { name: "Pitampura", students: 110, tutors: 18, rating: 4.5 },
    { name: "Janakpuri", students: 95, tutors: 16, rating: 4.7 }
  ]

  const courseCategories = [
    { name: "Kindergarten", icon: <School className="h-6 w-6" />, color: "bg-pink-500", courses: 12 },
    { name: "Primary (1-5)", icon: <BookOpen className="h-6 w-6" />, color: "bg-blue-500", courses: 25 },
    { name: "Middle (6-8)", icon: <GraduationCap className="h-6 w-6" />, color: "bg-green-500", courses: 30 },
    { name: "Secondary (9-10)", icon: <Target className="h-6 w-6" />, color: "bg-purple-500", courses: 35 },
    { name: "Senior Secondary", icon: <Trophy className="h-6 w-6" />, color: "bg-orange-500", courses: 40 },
    { name: "Competitive Exams", icon: <Award className="h-6 w-6" />, color: "bg-red-500", courses: 20 }
  ]

  const features = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "AI-Powered Learning",
      description: "Personalized learning paths with AI recommendations and smart assessments"
    },
    {
      icon: <Monitor className="h-8 w-8" />,
      title: "Online & Offline",
      description: "Flexible learning modes - attend classes online or meet tutors in Delhi"
    },
    {
      icon: <Mic className="h-8 w-8" />,
      title: "Voice Support",
      description: "Multilingual voice support in Indian languages for better understanding"
    },
    {
      icon: <Bot className="h-8 w-8" />,
      title: "AI Teaching Assistant",
      description: "24/7 AI chatbot for instant doubt resolution and course guidance"
    }
  ]

  const stats = [
    { number: "50,000+", label: "Students Enrolled" },
    { number: "2,000+", label: "Expert Tutors" },
    { number: "100+", label: "Delhi Locations" },
    { number: "95%", label: "Success Rate" }
  ]

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Class 10 Student",
      avatar: "/avatars/priya.jpg",
      content: "The AI-powered learning helped me understand complex topics easily. My grades improved from 65% to 92%!",
      rating: 5,
      subject: "Mathematics & Science",
      location: "Lajpat Nagar"
    },
    {
      name: "Rahul Kumar",
      role: "JEE Aspirant",
      avatar: "/avatars/rahul.jpg",
      content: "The competitive exam preparation with AI assistance is amazing. Cleared my doubts instantly!",
      rating: 5,
      subject: "Physics & Chemistry",
      location: "Dwarka"
    },
    {
      name: "Mrs. Mehta",
      role: "Parent",
      avatar: "/avatars/mehta.jpg",
      content: "My daughter's confidence has improved tremendously. The offline sessions in Saket are very convenient.",
      rating: 5,
      subject: "English & Hindi",
      location: "Saket"
    }
  ]

  return (
      <div className="min-h-screen bg-background">
        
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
          <div className="relative px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Content Side */}
                <div className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start mb-6">
                    <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
                      <Sparkles className="h-4 w-4 mr-2" />
                      #1 AI-Powered Learning Platform
                    </Badge>
                  </div>
                  
                  <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-5xl xl:text-6xl">
                    Smart Teaching. Smarter Students
                    <br />
                    <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Fueling Futures with AI</span>
                  </h1>
                  
                  <p className="mt-6 text-lg leading-8 text-muted-foreground lg:max-w-lg">
                    Experience personalized learning with AI assistance. Choose from online classes or offline sessions 
                    across Delhi. Expert tutors, smart recommendations, and voice support in Indian languages.
                  </p>
                  
                  <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                    <Button size="lg" className="px-8 py-3 text-lg" onClick={() => openPopup('register', 'STUDENT')}>
                      <UserCheck className="mr-2 h-5 w-5" />
                      Register as Student
                    </Button>
                    <Button variant="outline" size="lg" className="px-8 py-3 text-lg" onClick={() => openPopup('register', 'TUTOR')}>
                      <GraduationCap className="mr-2 h-5 w-5" />
                      Register as Tutor
                    </Button>
                    <Button variant="outline" size="lg" className="px-8 py-3 text-lg" asChild>
                      <Link href="/courses">
                        <BookOpen className="mr-2 h-5 w-5" />
                        Explore Courses
                      </Link>
                    </Button>
                  </div>

                  {/* Stats */}
                  <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                    {stats.map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="text-3xl font-bold text-foreground">{stat.number}</div>
                        <div className="text-sm text-muted-foreground">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                                {/* Video Side */}
                <div className="relative -mt-8">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <VideoWithControls 
                      src="/video/hero-video.mp4"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Floating elements around video */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Brain className="w-8 h-8 text-primary" />
                  </div>
                  <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-secondary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 px-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Why Choose Our Platform?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Advanced AI technology meets traditional learning excellence
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/50">
                  <CardHeader>
                    <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Course Categories Section */}
        <section className="py-24 px-6 sm:px-6 lg:px-8 bg-muted/30">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Courses for Every Level
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                From Kindergarten to Competitive Exams - We've got you covered
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {courseCategories.map((category, index) => (
                <Link key={index} href="/courses" className="block">
                  <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-0 bg-gradient-to-br from-card to-card/50">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                          {category.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{category.name}</h3>
                          <p className="text-sm text-muted-foreground">{category.courses} courses available</p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Delhi Offline Locations Section */}
        <section className="py-24 px-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Offline Meet Locations in Delhi
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Convenient locations across Delhi for in-person learning sessions
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {delhiLocations.map((location, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/50">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                          <MapPin className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{location.name}</h3>
                          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>{location.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="font-semibold text-foreground">{location.students}</div>
                        <div className="text-muted-foreground">Students</div>
                      </div>
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="font-semibold text-foreground">{location.tutors}</div>
                        <div className="text-muted-foreground">Tutors</div>
                      </div>
                    </div>
                    
                    <Button className="w-full mt-4" size="sm" asChild>
                      <Link href="/offline-meet">
                        <Calendar className="mr-2 h-4 w-4" />
                        Book Session
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
                </div>
        </section>

        {/* AI Chatbot Section */}
        <section className="py-24 px-6 sm:px-6 lg:px-8 bg-muted/30">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">
                  Meet ब्रह्मांड Ai - Your Learning Assistant
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Get instant answers to your questions, personalized course recommendations, and 24/7 learning support. 
                  Our AI assistant supports multiple Indian languages and voice interactions.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Instant doubt resolution</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Personalized course recommendations</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Voice support in Indian languages</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>24/7 learning assistance</span>
                </div>
                </div>
                
                <Button className="mt-8" size="lg" asChild>
                  <Link href="/ai-teaching">
                    <Bot className="mr-2 h-5 w-5" />
                    Start Chatting with AI
                  </Link>
                </Button>
              </div>
              
              <div className="relative">
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-8 border-0 shadow-lg">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">ब्रह्मांड Ai</h3>
                      <p className="text-sm text-muted-foreground">Online • Learning Assistant</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-background rounded-lg p-4">
                      <p className="text-sm">Hello! I'm here to help you with your studies. What would you like to learn today?</p>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Mic className="mr-2 h-4 w-4" />
                        Voice
                      </Button>
                      <Button size="sm" variant="outline">
                        <Languages className="mr-2 h-4 w-4" />
                        हिंदी
                      </Button>
                      <Button size="sm" variant="outline">
                        <BookOpen className="mr-2 h-4 w-4" />
                        Courses
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 px-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                What Our Students Say
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Real stories from students across Delhi
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="border-0 bg-gradient-to-br from-card to-card/50 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-6 italic">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                        <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="secondary">
                            {testimonial.subject}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {testimonial.location}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl p-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">
                Ready to Start Your Learning Journey?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of students who are already learning smart with AI. 
                Choose your preferred mode - online or offline sessions in Delhi.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="px-8 py-3 text-lg" onClick={() => openPopup('register', 'STUDENT')}>
                  <UserCheck className="mr-2 h-5 w-5" />
                  Register as Student
                </Button>
                <Button variant="outline" size="lg" className="px-8 py-3 text-lg" onClick={() => openPopup('register', 'TUTOR')}>
                  <GraduationCap className="mr-2 h-5 w-5" />
                  Become a Tutor
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Section with Video */}
        <footer className="bg-muted/30 py-16 px-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Footer Content */}
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start mb-6">
                  <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Join Our Community
                  </Badge>
                </div>
                
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">
                  Experience the Future of Learning
                </h2>
                
                <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                  Watch how our AI-powered platform transforms education. See real students 
                  learning with personalized assistance and smart recommendations.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button size="lg" className="px-8 py-3 text-lg" onClick={() => openPopup('register', 'STUDENT')}>
                    <UserCheck className="mr-2 h-5 w-5" />
                    Start Learning Today
                  </Button>
                  <Button variant="outline" size="lg" className="px-8 py-3 text-lg" asChild>
                    <Link href="/contact">
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Contact Us
                    </Link>
                  </Button>
                </div>

                {/* Footer Stats */}
                <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">24/7</div>
                    <div className="text-sm text-muted-foreground">AI Support</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">100+</div>
                    <div className="text-sm text-muted-foreground">Delhi Locations</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">95%</div>
                    <div className="text-sm text-muted-foreground">Success Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">50K+</div>
                    <div className="text-sm text-muted-foreground">Students</div>
                  </div>
                </div>
              </div>

              {/* Footer Videos */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Footer Video */}
                <div className="relative">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <VideoWithControls 
                      src="/video/footer-video.mp4"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Floating elements around first footer video */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Brain className="w-8 h-8 text-primary" />
                  </div>
                  <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-secondary" />
                  </div>
                </div>

                {/* Second Footer Video */}
                <div className="relative">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <VideoWithControls 
                      src="/video/footer-video2.mp4"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Floating elements around second footer video */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Brain className="w-8 h-8 text-primary" />
                  </div>
                  <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-secondary" />
                  </div>
                </div>
              </div>
            </div>

            {/* Brainstorm Bubbles Section */}
            <div className="relative mt-20 pt-12 pb-16 overflow-hidden">
              {/* Animated Background Elements - Bubbles Theme */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Floating bubbles with different sizes */}
                <div className="absolute top-10 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '0s' }} />
                <div className="absolute top-40 right-20 w-40 h-40 bg-primary/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
                <div className="absolute bottom-20 left-1/4 w-36 h-36 bg-primary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
                <div className="absolute top-1/3 right-1/3 w-28 h-28 bg-primary/15 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }} />
                <div className="absolute bottom-1/3 left-1/3 w-24 h-24 bg-primary/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '3s' }} />
                
                {/* Rotating gradient circles */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary/10 via-primary/15 to-primary/10 rounded-full blur-3xl animate-rotate-slow opacity-50" />
                
                {/* Grid pattern overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-30" />
              </div>

              {/* Content */}
              <div className="relative z-10">
                {/* Header */}
                <div className="text-center mb-16 animate-slide-up">
                  <div className="relative inline-block mb-10">
                    {/* Large Card-Style Badge Container */}
                    <div className="relative group">
                      {/* Animated background glow layers */}
                      <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-3xl blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-700 animate-pulse-glow" />
                      <div className="absolute -inset-2 bg-gradient-to-r from-primary/15 via-transparent to-primary/15 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-700" />
                      
                      {/* Main Badge Card */}
                      <div className="relative bg-gradient-to-br from-card via-card/95 to-card/90 backdrop-blur-md rounded-2xl px-10 py-6 md:px-16 md:py-8 shadow-2xl border border-primary/20 group-hover:border-primary/40 transition-all duration-500 transform group-hover:scale-[1.02] group-hover:shadow-primary/20">
                        {/* Shimmer effect on hover */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -translate-x-full group-hover:translate-x-full" style={{ transition: 'transform 1.5s ease-in-out, opacity 0.5s ease-in-out' }} />
                        
                        {/* Content */}
                        <div className="relative flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
                          {/* Large Animated Brain Icon */}
                          <div className="relative">
                            {/* Glow rings */}
                            <div className="absolute inset-0 bg-primary/30 rounded-full blur-2xl animate-pulse scale-150" />
                            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse scale-125" style={{ animationDelay: '0.3s' }} />
                            
                            {/* Icon container */}
                            <div className="relative w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center border border-primary/30 group-hover:border-primary/50 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-3">
                              <Brain className="h-9 w-9 md:h-11 md:w-11 text-primary animate-float relative z-10" style={{ animationDelay: '0s' }} />
                            </div>
                            
                            {/* Floating particles around icon */}
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary/60 rounded-full animate-float blur-sm" style={{ animationDelay: '0s' }} />
                            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-primary/50 rounded-full animate-float blur-sm" style={{ animationDelay: '0.5s' }} />
                          </div>
                          
                          {/* Text Section */}
                          <div className="flex flex-col items-center md:items-start">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-primary via-primary/90 to-primary bg-clip-text text-transparent mb-2 group-hover:scale-105 transition-transform duration-300">
                              Brainstorm Bubbles
                            </h2>
                            <div className="flex items-center gap-2">
                              <div className="h-1 w-12 bg-gradient-to-r from-primary to-primary/50 rounded-full" />
                              <Sparkles className="h-5 w-5 text-primary animate-glow" style={{ animationDelay: '0s' }} />
                              <Sparkles className="h-5 w-5 text-primary animate-glow" style={{ animationDelay: '0.3s' }} />
                              <Sparkles className="h-5 w-5 text-primary animate-glow" style={{ animationDelay: '0.6s' }} />
                              <div className="h-1 w-12 bg-gradient-to-l from-primary to-primary/50 rounded-full" />
                            </div>
                          </div>
                        </div>
                        
                        {/* Decorative corner elements */}
                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-primary/10 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                      
                      {/* Large floating bubbles around badge */}
                      <div className="absolute -top-6 -left-6 w-6 h-6 bg-primary/40 rounded-full blur-md animate-float" style={{ animationDelay: '0s' }} />
                      <div className="absolute -bottom-6 -right-6 w-8 h-8 bg-primary/35 rounded-full blur-md animate-float" style={{ animationDelay: '0.5s' }} />
                      <div className="absolute top-1/2 -right-8 w-5 h-5 bg-primary/30 rounded-full blur-md animate-float" style={{ animationDelay: '1s' }} />
                      <div className="absolute top-1/2 -left-8 w-5 h-5 bg-primary/30 rounded-full blur-md animate-float" style={{ animationDelay: '1.5s' }} />
                      <div className="absolute -top-4 right-1/4 w-4 h-4 bg-primary/25 rounded-full blur-sm animate-float" style={{ animationDelay: '0.8s' }} />
                      <div className="absolute -bottom-4 left-1/4 w-4 h-4 bg-primary/25 rounded-full blur-sm animate-float" style={{ animationDelay: '1.2s' }} />
                    </div>
                  </div>
                  <h3 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                    <span className="inline-block animate-pulse">Explore Brainstorm Bubbles</span>
                  </h3>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Dive into creative thinking and comprehensive learning with our interactive brainstorm bubble resources
                  </p>
                  
                  {/* Decorative bubbles */}
                  <div className="flex justify-center gap-3 mt-6">
                    <div className="w-3 h-3 rounded-full bg-primary/40 animate-float" style={{ animationDelay: '0s' }} />
                    <div className="w-4 h-4 rounded-full bg-primary/50 animate-float" style={{ animationDelay: '0.3s' }} />
                    <div className="w-3 h-3 rounded-full bg-primary/40 animate-float" style={{ animationDelay: '0.6s' }} />
                    <div className="w-5 h-5 rounded-full bg-primary/30 animate-float" style={{ animationDelay: '0.9s' }} />
                    <div className="w-3 h-3 rounded-full bg-primary/40 animate-float" style={{ animationDelay: '1.2s' }} />
                  </div>
                </div>
                
                {/* PDF Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto px-4">
                  {/* Brainstorm Bubbles Geography */}
                  <Link 
                    href="/footer/geography.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-background border-2 border-primary/30 hover:border-primary/60 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-2 animate-slide-up"
                    style={{ animationDelay: '0.1s' }}
                  >
                    {/* Animated background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    
                    {/* Glowing bubble */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/30 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 opacity-0 group-hover:opacity-100 animate-float" />
                    
                    <div className="relative p-8">
                      {/* Icon container with animation */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="relative">
                          <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 animate-pulse-glow" />
                          <div className="relative p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-6">
                            <Brain className="h-8 w-8 text-primary group-hover:animate-bounce" />
                          </div>
                        </div>
                        <div className="relative">
                          <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-500" />
                          <div className="relative p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-all duration-500 transform group-hover:scale-125 group-hover:rotate-12">
                            <BookOpen className="h-6 w-6 text-primary group-hover:animate-bounce" />
                          </div>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <h4 className="font-bold text-2xl mb-3 group-hover:text-primary transition-colors duration-300">
                        Geography
                      </h4>
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        Explore geographical concepts through creative brainstorming and interactive learning techniques
                      </p>
                      
                      {/* Read button */}
                      <div className="flex items-center justify-between p-4 rounded-xl bg-primary/5 group-hover:bg-primary/10 transition-all duration-300">
                        <span className="text-sm font-semibold text-primary group-hover:scale-105 transition-transform inline-block">
                          Read PDF
                        </span>
                        <div className="flex items-center gap-2">
                          <ArrowRight className="h-5 w-5 text-primary group-hover:translate-x-2 transition-transform duration-300" />
                          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Corner accent bubble */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </Link>

                  {/* Brainstorm Bubbles Polity */}
                  <Link 
                    href="/footer/indianpolity.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-background border-2 border-primary/30 hover:border-primary/60 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-2 animate-slide-up"
                    style={{ animationDelay: '0.2s' }}
                  >
                    {/* Animated background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    
                    {/* Glowing bubble */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/30 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 opacity-0 group-hover:opacity-100 animate-float" style={{ animationDelay: '1s' }} />
                    
                    <div className="relative p-8">
                      {/* Icon container with animation */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="relative">
                          <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 animate-pulse-glow" />
                          <div className="relative p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-6">
                            <Brain className="h-8 w-8 text-primary group-hover:animate-bounce" />
                          </div>
                        </div>
                        <div className="relative">
                          <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-500" />
                          <div className="relative p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-all duration-500 transform group-hover:scale-125 group-hover:rotate-12">
                            <BookOpen className="h-6 w-6 text-primary group-hover:animate-bounce" />
                          </div>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <h4 className="font-bold text-2xl mb-3 group-hover:text-primary transition-colors duration-300">
                        Polity
                      </h4>
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        Master Indian political system, constitution, and governance through innovative brainstorming methods
                      </p>
                      
                      {/* Read button */}
                      <div className="flex items-center justify-between p-4 rounded-xl bg-primary/5 group-hover:bg-primary/10 transition-all duration-300">
                        <span className="text-sm font-semibold text-primary group-hover:scale-105 transition-transform inline-block">
                          Read PDF
                        </span>
                        <div className="flex items-center gap-2">
                          <ArrowRight className="h-5 w-5 text-primary group-hover:translate-x-2 transition-transform duration-300" />
                          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Corner accent bubble */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Footer Links */}
            <div className="mt-16 pt-8 border-t border-border">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                  <h3 className="font-semibold mb-4">Platform</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><Link href="/courses" className="hover:text-foreground transition-colors">Courses</Link></li>
                    <li><Link href="/tutors" className="hover:text-foreground transition-colors">Find Tutors</Link></li>
                    <li><Link href="/subjects" className="hover:text-foreground transition-colors">Subjects</Link></li>
                    <li><Link href="/ai-teaching" className="hover:text-foreground transition-colors">AI Assistant</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Support</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
                    <li><Link href="/help" className="hover:text-foreground transition-colors">Help Center</Link></li>
                    <li><Link href="/faq" className="hover:text-foreground transition-colors">FAQ</Link></li>
                    <li><Link href="/feedback" className="hover:text-foreground transition-colors">Feedback</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Company</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><Link href="/about" className="hover:text-foreground transition-colors">About Us</Link></li>
                    <li><Link href="/careers" className="hover:text-foreground transition-colors">Careers</Link></li>
                    <li><Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link></li>
                    <li><Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Connect</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link></li>
                    <li><Link href="/newsletter" className="hover:text-foreground transition-colors">Newsletter</Link></li>
                    <li><Link href="/social" className="hover:text-foreground transition-colors">Social Media</Link></li>
                    <li><Link href="/partners" className="hover:text-foreground transition-colors">Partners</Link></li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
                <p>&copy; 2024 Tutor Buddy. All rights reserved. | Powered by AI for better learning.</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
  )
} 