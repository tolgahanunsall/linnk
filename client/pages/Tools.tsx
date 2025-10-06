import { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { FileText, Globe, Video, Search, Network, Quote, Upload, Download, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const tools = [
  {
    id: "translator",
    title: "Document Translator",
    description: "Translate documents while preserving formatting and context",
    icon: Globe,
    features: ["50+ languages", "Preserves formatting", "Context-aware translation", "Batch processing"],
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: "summarizer", 
    title: "Document Summarizer",
    description: "Extract key insights and create concise summaries from long documents",
    icon: FileText,
    features: ["Key points extraction", "Customizable length", "Multiple formats", "Citation tracking"],
    color: "from-green-500 to-emerald-500"
  },
  {
    id: "video",
    title: "Video Summarizer", 
    description: "Generate summaries and transcripts from video content",
    icon: Video,
    features: ["Auto transcription", "Key moments", "Chapter breakdown", "Multiple languages"],
    color: "from-purple-500 to-violet-500"
  },
  {
    id: "research",
    title: "Research Assistant",
    description: "Accelerate research with AI-powered literature review and analysis",
    icon: Search,
    features: ["Literature review", "Citation analysis", "Research gaps", "Trend identification"],
    color: "from-orange-500 to-red-500"
  },
  {
    id: "graph",
    title: "Knowledge Graph",
    description: "Visualize connections and relationships in your documents",
    icon: Network,
    features: ["Interactive graphs", "Concept mapping", "Relationship analysis", "Export options"],
    color: "from-indigo-500 to-purple-500"
  },
  {
    id: "citation",
    title: "Citation Helper",
    description: "Generate accurate citations and manage references effortlessly",
    icon: Quote,
    features: ["Multiple formats", "Auto-detection", "Bibliography creation", "Style guides"],
    color: "from-pink-500 to-rose-500"
  }
];

export default function Tools() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Handle anchor navigation
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }, 100);
      }
    }
  }, [location]);

  const handleTryTool = (toolId: string) => {
    // Navigate to home page with upload section focused
    navigate('/#upload-section');
    
    // Show a toast message
    toast.info(`Upload a document to try ${tools.find(t => t.id === toolId)?.title || 'this tool'}`);
    
    // Scroll to upload section after navigation
    setTimeout(() => {
      const uploadSection = document.getElementById('upload-section');
      if (uploadSection) {
        uploadSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100);
  };

  const handleLearnMore = (toolId: string) => {
    toast.info(`Learn more about ${tools.find(t => t.id === toolId)?.title || 'this tool'} - Feature coming soon!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="container py-20">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700">
            AI Tools
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Powerful AI Tools for Every Need
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Transform your workflow with our comprehensive suite of AI-powered tools designed for professionals, researchers, and content creators.
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="container pb-20">
        <div className="grid gap-8 md:gap-12">
          {tools.map((tool, index) => (
            <div
              key={tool.id}
              id={tool.id}
              className="scroll-mt-20"
            >
              <Card className="overflow-hidden border-0 shadow-lg">
                <div className={`h-2 bg-gradient-to-r ${tool.color}`} />
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r ${tool.color} text-white`}>
                      <tool.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-2xl">{tool.title}</CardTitle>
                      <CardDescription className="mt-2 text-base">
                        {tool.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Key Features</h4>
                      <ul className="space-y-2">
                        {tool.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                            <div className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-col gap-3">
                      <Button 
                        className="w-full" 
                        size="lg"
                        onClick={() => handleTryTool(tool.id)}
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Try {tool.title}
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => handleLearnMore(tool.id)}
                      >
                        <Zap className="mr-2 h-4 w-4" />
                        Learn More
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center text-white">
            <h3 className="text-3xl font-bold tracking-tight">
              Ready to Boost Your Productivity?
            </h3>
            <p className="mt-3 text-indigo-100">
              Start using our AI tools today and experience the difference in your workflow.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg" variant="secondary">
                <Download className="mr-2 h-4 w-4" />
                Get Started Free
              </Button>
              <Button asChild size="lg" variant="ghost" className="text-white hover:text-indigo-100">
                <Link to="/pricing">View Pricing →</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
