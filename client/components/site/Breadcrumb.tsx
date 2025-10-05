import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumb() {
  const location = useLocation();
  
  const getBreadcrumbItems = (): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const items: BreadcrumbItem[] = [{ label: "Home", href: "/" }];
    
    // Build breadcrumb items based on path
    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // Convert segment to readable label
      let label = segment.charAt(0).toUpperCase() + segment.slice(1);
      
      // Add specific labels for known routes
      if (segment === 'pricing') {
        label = 'Pricing';
      } else if (segment === 'tools') {
        label = 'Tools';
      }
      
      // If it's the last segment, don't add href (current page)
      const isLast = index === pathSegments.length - 1;
      items.push({
        label,
        href: isLast ? undefined : currentPath
      });
    });
    
    // Handle hash fragments for tools page
    if (location.pathname === '/tools' && location.hash) {
      const toolId = location.hash.substring(1);
      const toolLabels: Record<string, string> = {
        translator: 'Document Translator',
        summarizer: 'Document Summarizer', 
        video: 'Video Summarizer',
        research: 'Research Assistant',
        graph: 'Knowledge Graph',
        citation: 'Citation Helper'
      };
      
      if (toolLabels[toolId]) {
        items.push({
          label: toolLabels[toolId]
        });
      }
    }
    
    return items;
  };

  const breadcrumbItems = getBreadcrumbItems();
  
  // Don't show breadcrumb on home page
  if (location.pathname === '/') {
    return null;
  }

  return (
    <nav className="border-b bg-gray-50/50">
      <div className="container py-3">
        <ol className="flex items-center space-x-2 text-sm text-gray-600">
          {breadcrumbItems.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="mx-2 h-4 w-4 text-gray-400" />
              )}
              {index === 0 && (
                <Home className="mr-2 h-4 w-4" />
              )}
              {item.href ? (
                <Link
                  to={item.href}
                  className="hover:text-indigo-600 transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-900 font-medium">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}