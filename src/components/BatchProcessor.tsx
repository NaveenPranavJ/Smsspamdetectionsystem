import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Upload, Trash2 } from 'lucide-react';
import { classifyBatch } from '../utils/spamDetectionService';

export function BatchProcessor() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState<Array<{
    message: string;
    label: 'spam' | 'ham';
    confidence: number;
  }>>([]);

  const handleBatchClassify = () => {
    const messages = input.split('\n').filter(msg => msg.trim().length > 0);
    if (messages.length === 0) return;

    const predictions = classifyBatch(messages);
    const resultsWithMessages = messages.map((msg, idx) => ({
      message: msg,
      ...predictions[idx]
    }));

    setResults(resultsWithMessages);
  };

  const handleClear = () => {
    setInput('');
    setResults([]);
  };

  const sampleBatch = [
    "Win a free iPhone! Click here now!",
    "Meeting at 3pm tomorrow",
    "URGENT: Your account will be suspended",
    "Thanks for lunch today",
    "Claim your prize of $1000 immediately"
  ].join('\n');

  const loadSample = () => {
    setInput(sampleBatch);
    setResults([]);
  };

  const spamCount = results.filter(r => r.label === 'spam').length;
  const hamCount = results.filter(r => r.label === 'ham').length;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Batch Message Processing</CardTitle>
          <CardDescription>
            Process multiple SMS messages at once. Enter one message per line.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="batch-input" className="text-sm">
              Messages (one per line)
            </label>
            <Textarea
              id="batch-input"
              placeholder="Enter messages here, one per line..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={8}
              className="resize-none font-mono text-sm"
            />
            <div className="text-sm text-muted-foreground">
              {input.split('\n').filter(line => line.trim()).length} messages
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleBatchClassify} disabled={!input.trim()}>
              <Upload className="w-4 h-4 mr-2" />
              Process Batch
            </Button>
            <Button variant="outline" onClick={loadSample}>
              Load Sample
            </Button>
            <Button variant="outline" onClick={handleClear}>
              <Trash2 className="w-4 h-4 mr-2" />
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Classification Results</CardTitle>
            <CardDescription>
              Processed {results.length} messages: {spamCount} spam, {hamCount} ham
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">#</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead className="w-32">Classification</TableHead>
                    <TableHead className="w-32">Confidence</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((result, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{idx + 1}</TableCell>
                      <TableCell className="max-w-md truncate">{result.message}</TableCell>
                      <TableCell>
                        <Badge variant={result.label === 'spam' ? 'destructive' : 'default'}>
                          {result.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">
                          {(result.confidence * 100).toFixed(1)}%
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
