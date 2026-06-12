import { 
  ExternalLink, 
  Code2, 
  Palette, 
  Database,
  Globe,
  Mail,
  ArrowRight,
  Star,
} from 'lucide-react';
import Image from 'next/image';
import ContactForm from '@/components/ContactForm'; // Adjust path if your components folder is elsewhere

const Github = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// 1. Define the exact shape of your data for TypeScript
interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  status: string;
  image: string;
  link: string;
  github: string;
  highlights: string[];
}

interface Skill {
  category: string;
  icon: React.ReactNode;
  technologies: string[];
}

export default function StackBuildr() {
  // Removed the unused `activeProject` state to clear the ESLint warning

  const projects: Project[] = [
    {
      id: 1,
      title: "A/C & Heating Small Business Website",
      description: "A modern, responsive website for a local A/C & Heating business, showcasing services and driving customer engagement.",
      tech: ["Next.js", "React", "Tailwind CSS", "Node.js"],
      status: "In Development",
      image: "🔄",
      link: "#",
      github: "#",
      highlights: ["Faster rendering", "No clutter UI", "Mobile first design"]
    },
    {
      id: 2,
      title: "StackBuildr Portfolio",
      description: "Modern, responsive portfolio showcasing development projects with seamless user experience.",
      tech: ["Next.js", "Vercel Analytics", "Tailwind CSS"],
      status: "Live",
      image: "🚀",
      link: "/",
      github: "https://github.com/ambxrp/stackbuildr-freelance",
      highlights: ["Server-side rendering", "Optimized performance", "SEO optimized"]
    },
    {
      id: 3,
      title: "Coming Soon",
      description: "New projects in the planning phase. Stay tuned for updates!",
      tech: ["TBD"],
      status: "Planning",
      image: "💡",
      link: "#",
      github: "#",
      highlights: ["Innovation focused", "Exploring new ideas"]
    }
  ];

  const skills: Skill[] = [
    {
      category: "Frontend",
      icon: <Code2 className="w-6 h-6" />,
      technologies: ["React", "Next.js", "JavaScript", "TypeScript", "HTML5", "CSS"]
    },
    {
      category: "Styling",
      icon: <Palette className="w-6 h-6" />,
      technologies: ["Tailwind CSS", "CSS", "Styled Components", "Responsive Design"]
    },
    {
      category: "Backend",
      icon: <Database className="w-6 h-6" />,
      technologies: ["Node.js", "API Routes", "Firebase", "Java/SpringBoot", "Python", "Supabase", "GCP", "AWS", "SQL"]
    },
    {
      category: "Tools & Deployment",
      icon: <Globe className="w-6 h-6" />,
      technologies: ["Git", "GitHub", "Vercel", "VS Code", "npm", "DevOps", "Agile", "CI/CD"]
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-black border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-white">
              Stack<span className="text-purple-400">Buildr</span>
            </div>
            <div className="flex gap-6">
              <a href="#projects" className="text-gray-300 hover:text-white transition-colors">Projects</a>
              <a href="#skills" className="text-gray-300 hover:text-white transition-colors">Skills</a>
              <a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Building the
              <span className="text-purple-400"> future </span>
              one stack at a time
            </h1>
            
            {/* Escaped apostrophes with &apos; */}
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              I am a full stack developer crafting modern web experiences with new and emerging technologies. 
              Currently focused on building innovative apps that solve real world problems and continuing my studies!
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <a 
                href="#projects"
                className="bg-purple-400 hover:bg-purple-500 text-black font-semibold py-3 px-6 rounded-full transition-all duration-200 flex items-center gap-2"
              >
                View My Work <ArrowRight className="w-5 h-5" />
              </a>
              <a 
                href="#contact" // Updated to anchor down to the new form
                className="bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white font-semibold py-3 px-6 rounded-full transition-all duration-200 flex items-center gap-2"
              >
                <Mail className="w-5 h-5" /> Get In Touch
              </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              <a href="https://github.com/ambxrp" className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-6 h-6" />
              </a>
              <a href="https://www.linkedin.com/in/amber-parker-2a3480229/" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gray-800 border border-gray-700 rounded-3xl p-8">
              <div className="text-center mb-6">
                {/* Updated image syntax from previous fix */}
                <div className="w-24 h-24 bg-purple-400 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl overflow-hidden">
                    <Image 
                    src="/amber-photo.png" 
                    alt="Profile Picture" 
                    width={96} 
                    height={96} 
                    className="object-cover object-top w-full h-full"
                   />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Amber Parker</h3>
                <p className="text-purple-400">Full Stack Developer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Projects Section */}
      <section id="projects" className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Current Projects</h2>
          {/* Escaped apostrophes with &apos; */}
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Here&apos;s what I&apos;m currently building and the technologies I&apos;m working with
          </p>
        </div>

        <div className="grid gap-8">
          {/* Typed parameters in .map() */}
          {projects.map((project: Project) => (
            <div 
              key={project.id}
              className="bg-gray-800 border border-gray-700 rounded-3xl p-8 hover:border-purple-400 transition-all duration-300"
            >
              <div className="grid lg:grid-cols-3 gap-8 items-center">
                <div className="lg:col-span-2">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-4xl">{project.image}</span>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                      <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        project.status === 'Live' ? 'bg-green-900 text-green-300' :
                        project.status === 'In Development' ? 'bg-blue-900 text-blue-300' :
                        'bg-gray-700 text-gray-300'
                      }`}>
                        {project.status}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech: string) => (
                      <span 
                        key={tech}
                        className="bg-purple-900 text-purple-300 px-3 py-1 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <ul className="space-y-2 mb-6">
                    {project.highlights.map((highlight: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-300">
                        <Star className="w-4 h-4 text-purple-400" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col gap-4">
                  {project.link !== '#' && (
                    <a 
                      href={project.link}
                      className="bg-purple-400 hover:bg-purple-500 text-black font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="w-5 h-5" />
                      View Project
                    </a>
                  )}
                  {project.github !== '#' && (
                    <a 
                      href={project.github}
                      className="bg-gray-700 hover:bg-gray-600 border border-gray-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <Github className="w-5 h-5" />
                      Source Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Technical Skills</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            The technologies and tools I use to bring ideas to life
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Typed parameters in .map() */}
          {skills.map((skill: Skill) => (
            <div 
              key={skill.category}
              className="bg-gray-800 border border-gray-700 rounded-2xl p-6 hover:border-purple-400 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="text-purple-400">
                  {skill.icon}
                </div>
                <h3 className="text-xl font-semibold text-white">{skill.category}</h3>
              </div>
              
              <div className="space-y-2">
                {skill.technologies.map((tech: string) => (
                  <div 
                    key={tech}
                    className="text-gray-300 py-1 px-3 bg-gray-700 rounded-lg text-sm"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section - Now using the integrated Turnstile Component */}
      <section id="contact" className="max-w-6xl mx-auto px-6 py-20">
        <div className="bg-gray-800 border border-gray-700 rounded-3xl p-12">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white mb-4">Let&apos;s Build Something Amazing</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Have an exciting project in mind? I&apos;m always interested in discussing new opportunities and innovative ideas.
            </p>
          </div>
          
          {/* Injected Contact Form Here */}
          <div className="max-w-md mx-auto">
            <ContactForm />
          </div>
          
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-20 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="text-2xl font-bold text-white mb-4">
            Stack<span className="text-purple-400">Buildr</span>
          </div>
          <p className="text-gray-400">
            © {new Date().getFullYear()} StackBuildr. Building the future, one project at a time.
          </p>
        </div>
      </footer>
    </div>
  );
}