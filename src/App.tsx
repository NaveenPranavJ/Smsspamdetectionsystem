import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Card } from './components/ui/card';
import { MessageSquare, BarChart3, Database, Settings, Info, Upload } from 'lucide-react';
import { SpamClassifier } from './components/SpamClassifier';
import { BatchProcessor } from './components/BatchProcessor';
import { PerformanceMetrics } from './components/PerformanceMetrics';
import { DatasetViewer } from './components/DatasetViewer';
import { SystemArchitecture } from './components/SystemArchitecture';
import { ProjectOverview } from './components/ProjectOverview';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl">SMS Spam Detection System</h1>
              <p className="text-sm text-muted-foreground">Machine Learning-Based Text Classification</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <Card className="p-1">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
              <TabsTrigger value="overview" className="gap-2">
                <Info className="w-4 h-4" />
                <span className="hidden sm:inline">Overview</span>
              </TabsTrigger>
              <TabsTrigger value="classifier" className="gap-2">
                <MessageSquare className="w-4 h-4" />
                <span className="hidden sm:inline">Classifier</span>
              </TabsTrigger>
              <TabsTrigger value="batch" className="gap-2">
                <Upload className="w-4 h-4" />
                <span className="hidden sm:inline">Batch</span>
              </TabsTrigger>
              <TabsTrigger value="metrics" className="gap-2">
                <BarChart3 className="w-4 h-4" />
                <span className="hidden sm:inline">Metrics</span>
              </TabsTrigger>
              <TabsTrigger value="dataset" className="gap-2">
                <Database className="w-4 h-4" />
                <span className="hidden sm:inline">Dataset</span>
              </TabsTrigger>
              <TabsTrigger value="architecture" className="gap-2">
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">Architecture</span>
              </TabsTrigger>
            </TabsList>
          </Card>

          <TabsContent value="overview" className="space-y-4">
            <ProjectOverview />
          </TabsContent>

          <TabsContent value="classifier" className="space-y-4">
            <SpamClassifier />
          </TabsContent>

          <TabsContent value="batch" className="space-y-4">
            <BatchProcessor />
          </TabsContent>

          <TabsContent value="metrics" className="space-y-4">
            <PerformanceMetrics />
          </TabsContent>

          <TabsContent value="dataset" className="space-y-4">
            <DatasetViewer />
          </TabsContent>

          <TabsContent value="architecture" className="space-y-4">
            <SystemArchitecture />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-muted-foreground">
            <div>
              <h3 className="mb-2">Project Details</h3>
              <p>SMS Spam Detection Using ML</p>
              <p>SKP Engineering College</p>
              <p>October 2025</p>
            </div>
            <div>
              <h3 className="mb-2">Technology Stack</h3>
              <p>Machine Learning: Naive Bayes, SVM</p>
              <p>NLP: TF-IDF, scikit-learn</p>
              <p>Frontend: React, Tailwind CSS</p>
            </div>
            <div>
              <h3 className="mb-2">Performance</h3>
              <p>Accuracy: 98.6%</p>
              <p>Precision (Spam): 95%</p>
              <p>Recall (Spam): 97%</p>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t text-center text-sm text-muted-foreground">
            <p>© 2025 SMS Spam Detection System - Built with React & Machine Learning</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
