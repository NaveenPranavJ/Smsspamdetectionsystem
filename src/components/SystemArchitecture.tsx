import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowRight, Database, FileText, Brain, BarChart3, Smartphone } from 'lucide-react';

export function SystemArchitecture() {
  const technologies = [
    { category: 'Programming Language', items: ['Python', 'JavaScript/TypeScript'], icon: '💻' },
    { category: 'Data Processing', items: ['pandas', 'numpy'], icon: '📊' },
    { category: 'NLP Libraries', items: ['NLTK', 'scikit-learn'], icon: '🔤' },
    { category: 'ML Algorithms', items: ['Naive Bayes', 'Logistic Regression', 'SVM', 'Random Forest'], icon: '🤖' },
    { category: 'Visualization', items: ['Recharts', 'matplotlib', 'seaborn'], icon: '📈' },
    { category: 'Frontend', items: ['React', 'Tailwind CSS', 'shadcn/ui'], icon: '🎨' }
  ];

  const pipeline = [
    { title: 'SMS Input', icon: Smartphone, color: 'bg-blue-500' },
    { title: 'Text Preprocessing', icon: FileText, color: 'bg-green-500' },
    { title: 'Feature Extraction', icon: Database, color: 'bg-purple-500' },
    { title: 'ML Classification', icon: Brain, color: 'bg-orange-500' },
    { title: 'Prediction Output', icon: BarChart3, color: 'bg-red-500' }
  ];

  return (
    <div className="space-y-6">
      {/* System Pipeline */}
      <Card>
        <CardHeader>
          <CardTitle>System Architecture Pipeline</CardTitle>
          <CardDescription>End-to-end processing flow for SMS spam detection</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {pipeline.map((step, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="flex flex-col items-center">
                  <div className={`${step.color} p-4 rounded-lg text-white mb-2`}>
                    <step.icon className="w-8 h-8" />
                  </div>
                  <p className="text-sm text-center max-w-[120px]">{step.title}</p>
                </div>
                {idx < pipeline.length - 1 && (
                  <ArrowRight className="w-6 h-6 text-muted-foreground hidden md:block" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Component Descriptions */}
      <Card>
        <CardHeader>
          <CardTitle>Pipeline Components</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="mb-2 flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-blue-600" />
                1. Input Module
              </h4>
              <p className="text-sm text-muted-foreground">
                Accepts new SMS messages through command-line interface or web form for processing.
              </p>
            </div>

            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="mb-2 flex items-center gap-2">
                <FileText className="w-5 h-5 text-green-600" />
                2. Preprocessing Module
              </h4>
              <p className="text-sm text-muted-foreground">
                Cleans and normalizes text by removing punctuation, converting to lowercase, 
                tokenization, stopword removal, and lemmatization.
              </p>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h4 className="mb-2 flex items-center gap-2">
                <Database className="w-5 h-5 text-purple-600" />
                3. Feature Extraction Module
              </h4>
              <p className="text-sm text-muted-foreground">
                Converts processed text into numerical vectors using TF-IDF (Term Frequency-Inverse Document Frequency),
                capturing word importance and frequency.
              </p>
            </div>

            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <h4 className="mb-2 flex items-center gap-2">
                <Brain className="w-5 h-5 text-orange-600" />
                4. Model Training & Prediction Module
              </h4>
              <p className="text-sm text-muted-foreground">
                Trains multiple ML models (Naive Bayes, Logistic Regression, SVM) and uses the best-performing
                model to classify messages as spam or ham.
              </p>
            </div>

            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <h4 className="mb-2 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-red-600" />
                5. Output & Interface Module
              </h4>
              <p className="text-sm text-muted-foreground">
                Displays classification results with confidence scores in a user-friendly format,
                supporting both individual and batch message testing.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Technologies Used */}
      <Card>
        <CardHeader>
          <CardTitle>Technologies & Tools</CardTitle>
          <CardDescription>Complete technology stack used in the project</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {technologies.map((tech, idx) => (
              <div key={idx} className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{tech.icon}</span>
                  <h4>{tech.category}</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tech.items.map((item, i) => (
                    <Badge key={i} variant="secondary">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Model Details */}
      <Card>
        <CardHeader>
          <CardTitle>Machine Learning Models</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 border rounded-lg">
              <h4 className="mb-1">Multinomial Naive Bayes</h4>
              <p className="text-sm text-muted-foreground">
                Probabilistic classifier based on Bayes' theorem. Ideal for text classification with high-dimensional data.
                Assumes feature independence.
              </p>
            </div>
            <div className="p-3 border rounded-lg">
              <h4 className="mb-1">Logistic Regression</h4>
              <p className="text-sm text-muted-foreground">
                Linear model for binary classification. Calculates probability using logistic function.
                Fast and efficient for text data.
              </p>
            </div>
            <div className="p-3 border rounded-lg">
              <h4 className="mb-1">Support Vector Machine (SVM)</h4>
              <p className="text-sm text-muted-foreground">
                Finds optimal hyperplane to separate classes with maximum margin. Effective for high-dimensional spaces.
              </p>
            </div>
            <div className="p-3 border rounded-lg">
              <h4 className="mb-1">Random Forest</h4>
              <p className="text-sm text-muted-foreground">
                Ensemble of decision trees offering robustness and accuracy. Reduces overfitting through averaging.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
