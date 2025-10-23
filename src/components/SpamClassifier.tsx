import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { ShieldAlert, ShieldCheck, Sparkles } from 'lucide-react';
import { classifyMessage } from '../utils/spamDetectionService';

export function SpamClassifier() {
  const [message, setMessage] = useState('');
  const [result, setResult] = useState<{
    label: 'spam' | 'ham';
    confidence: number;
    keywords: string[];
  } | null>(null);

  const handleClassify = () => {
    if (!message.trim()) return;
    const prediction = classifyMessage(message);
    setResult(prediction);
  };

  const handleClear = () => {
    setMessage('');
    setResult(null);
  };

  const exampleMessages = [
    "Congratulations! You've won a free ticket. Reply YES to claim.",
    "Hey, are you coming to the meeting tomorrow?",
    "URGENT!! Your account has been blocked. Call 12345 now.",
    "Please pick up groceries on way home."
  ];

  const loadExample = (example: string) => {
    setMessage(example);
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>SMS Spam Classifier</CardTitle>
          <CardDescription>
            Enter an SMS message below to classify it as spam or legitimate (ham)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="sms-input" className="text-sm">
              SMS Message
            </label>
            <Textarea
              id="sms-input"
              placeholder="Enter your SMS message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="resize-none"
            />
            <div className="text-sm text-muted-foreground">
              {message.length} characters
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleClassify} disabled={!message.trim()}>
              <Sparkles className="w-4 h-4 mr-2" />
              Classify Message
            </Button>
            <Button variant="outline" onClick={handleClear}>
              Clear
            </Button>
          </div>

          {result && (
            <Alert className={result.label === 'spam' ? 'border-red-500 bg-red-50' : 'border-green-500 bg-green-50'}>
              <div className="flex items-start gap-3">
                {result.label === 'spam' ? (
                  <ShieldAlert className="w-5 h-5 text-red-600 mt-0.5" />
                ) : (
                  <ShieldCheck className="w-5 h-5 text-green-600 mt-0.5" />
                )}
                <div className="flex-1 space-y-2">
                  <AlertDescription>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={result.label === 'spam' ? 'text-red-900' : 'text-green-900'}>
                        Classification: <strong>{result.label.toUpperCase()}</strong>
                      </span>
                      <Badge variant={result.label === 'spam' ? 'destructive' : 'default'}>
                        {(result.confidence * 100).toFixed(1)}% confidence
                      </Badge>
                    </div>
                    {result.keywords.length > 0 && (
                      <div className="mt-3">
                        <div className="text-sm mb-1">Key indicators detected:</div>
                        <div className="flex flex-wrap gap-1">
                          {result.keywords.map((keyword, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </AlertDescription>
                </div>
              </div>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Try Example Messages</CardTitle>
          <CardDescription>Click on any example to test the classifier</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            {exampleMessages.map((example, idx) => (
              <button
                key={idx}
                onClick={() => loadExample(example)}
                className="text-left p-3 rounded-lg border hover:bg-accent transition-colors"
              >
                <p className="text-sm">{example}</p>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
