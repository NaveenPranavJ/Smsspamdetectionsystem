import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { AlertCircle, Target, Lightbulb, CheckCircle } from 'lucide-react';

export function ProjectOverview() {
  const objectives = [
    'Design and develop a machine learning model to accurately detect SMS spam messages',
    'Implement comprehensive text preprocessing and feature extraction techniques',
    'Train and compare multiple supervised learning algorithms',
    'Evaluate model performance using standard classification metrics',
    'Create a user-friendly interface for real-time message classification'
  ];

  const features = [
    'Real-time SMS classification with confidence scores',
    'Batch message processing capability',
    'Keyword highlighting for interpretability',
    'Comprehensive performance metrics and visualizations',
    'Sample dataset viewer',
    'Automated text preprocessing pipeline'
  ];

  const advantages = [
    'High accuracy (98.6%) with balanced precision and recall',
    'Fast and lightweight inference for real-time classification',
    'Interpretable results with keyword detection',
    'Modular architecture for easy extension and retraining',
    'Handles imbalanced datasets effectively',
    'User-friendly interface for both technical and non-technical users'
  ];

  return (
    <div className="space-y-6">
      {/* Project Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <div className="space-y-2">
            <CardTitle className="text-2xl">SMS Spam Detection Using Machine Learning</CardTitle>
            <CardDescription className="text-base">
              An intelligent system for automated detection and classification of SMS spam messages
            </CardDescription>
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge>Machine Learning</Badge>
              <Badge>Natural Language Processing</Badge>
              <Badge>Text Classification</Badge>
              <Badge>Python</Badge>
              <Badge>React</Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Problem Statement */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            Problem Statement
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm">
            With the exponential rise in mobile phone usage, spam messages have become a significant nuisance 
            for users worldwide. Spam texts often include unwanted advertisements, fraudulent schemes, phishing 
            attempts, and malicious links that aim to exploit users' trust.
          </p>
          <p className="text-sm">
            Traditional keyword-based spam filters are no longer effective due to evolving spammer strategies 
            such as word obfuscation, slang usage, emojis, and intentional misspellings. There is a growing 
            need for a machine learning-based solution that can learn contextual and linguistic patterns to 
            accurately classify SMS messages.
          </p>
          <div className="p-4 bg-muted rounded-lg mt-4">
            <p className="text-sm italic">
              "Given an SMS text message, the task is to predict whether the message is spam or ham (legitimate) 
              using supervised machine learning techniques."
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Objectives */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-500" />
            Project Objectives
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {objectives.map((objective, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{objective}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Key Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            Key Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Approach & Methodology */}
      <Card>
        <CardHeader>
          <CardTitle>Approach & Methodology</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="mb-2">Supervised Machine Learning Approach</h4>
            <p className="text-sm text-muted-foreground">
              The system employs a supervised learning approach where models are trained on labeled SMS data 
              (messages categorized as spam or ham). The model learns patterns and relationships to classify 
              new, unseen messages effectively.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="p-4 border rounded-lg">
              <h4 className="mb-2 text-sm">Feature Extraction</h4>
              <p className="text-sm text-muted-foreground">
                TF-IDF (Term Frequency-Inverse Document Frequency) vectorization to convert text into 
                numerical representations, capturing word importance and frequency.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="mb-2 text-sm">Model Selection</h4>
              <p className="text-sm text-muted-foreground">
                Multiple algorithms tested including Naive Bayes, Logistic Regression, Random Forest, 
                and SVM, with the best performer selected for deployment.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Advantages */}
      <Card>
        <CardHeader>
          <CardTitle>System Advantages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {advantages.map((advantage, idx) => (
              <div key={idx} className="flex items-start gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{advantage}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Future Enhancements */}
      <Card>
        <CardHeader>
          <CardTitle>Future Enhancements</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="text-sm">• Integration of deep learning models (BERT, Transformers) for improved accuracy</li>
            <li className="text-sm">• Multi-language support for international SMS spam detection</li>
            <li className="text-sm">• Online/incremental learning to adapt to evolving spam patterns</li>
            <li className="text-sm">• Granular spam categorization (phishing, advertisement, malware)</li>
            <li className="text-sm">• Mobile application development for on-device classification</li>
            <li className="text-sm">• API deployment for integration with messaging platforms</li>
          </ul>
        </CardContent>
      </Card>

      {/* Project Info */}
      <Card>
        <CardHeader>
          <CardTitle>Project Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm"><strong>Submitted by:</strong> NAVEEN PRANAV J</p>
              <p className="text-sm"><strong>Institution:</strong> SKP Engineering College</p>
              <p className="text-sm"><strong>Department:</strong> Computer Science (Cyber Security)</p>
              <p className="text-sm"><strong>Date:</strong> October 2025</p>
            </div>
            <div>
              <p className="text-sm"><strong>Dataset:</strong> UCI SMS Spam Collection</p>
              <p className="text-sm"><strong>Total Samples:</strong> 5,572 messages</p>
              <p className="text-sm"><strong>Best Model:</strong> Multinomial Naive Bayes</p>
              <p className="text-sm"><strong>Accuracy:</strong> 98.6%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
