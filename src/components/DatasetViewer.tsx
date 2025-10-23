import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { sampleDataset } from '../utils/spamDetectionService';

export function DatasetViewer() {
  const [filter, setFilter] = useState<'all' | 'spam' | 'ham'>('all');

  const filteredData = sampleDataset.filter(item => {
    if (filter === 'all') return true;
    return item.label === filter;
  });

  const spamCount = sampleDataset.filter(d => d.label === 'spam').length;
  const hamCount = sampleDataset.filter(d => d.label === 'ham').length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Messages</CardDescription>
            <CardTitle className="text-3xl">{sampleDataset.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Spam Messages</CardDescription>
            <CardTitle className="text-3xl text-red-600">{spamCount}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Ham Messages</CardDescription>
            <CardTitle className="text-3xl text-green-600">{hamCount}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sample Dataset</CardTitle>
          <CardDescription>
            UCI SMS Spam Collection Dataset - Sample Messages
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={filter} onValueChange={(v) => setFilter(v as any)} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All ({sampleDataset.length})</TabsTrigger>
              <TabsTrigger value="spam">Spam ({spamCount})</TabsTrigger>
              <TabsTrigger value="ham">Ham ({hamCount})</TabsTrigger>
            </TabsList>
            <TabsContent value={filter} className="mt-4">
              <div className="space-y-3">
                {filteredData.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-lg border hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm flex-1">{item.message}</p>
                      <Badge variant={item.label === 'spam' ? 'destructive' : 'default'}>
                        {item.label}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Dataset Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="mb-2">Source</h4>
            <p className="text-sm text-muted-foreground">
              UCI Machine Learning Repository - SMS Spam Collection Dataset
            </p>
          </div>
          <div>
            <h4 className="mb-2">Description</h4>
            <p className="text-sm text-muted-foreground">
              The dataset contains approximately 5,572 labeled SMS messages collected from various sources
              including online forums and user submissions. Each message is classified as either "spam" 
              (unsolicited promotional content) or "ham" (legitimate messages).
            </p>
          </div>
          <div>
            <h4 className="mb-2">Class Distribution</h4>
            <div className="flex gap-4 mt-2">
              <div className="flex-1">
                <div className="h-2 bg-red-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-red-600" 
                    style={{ width: `${(spamCount / sampleDataset.length) * 100}%` }}
                  />
                </div>
                <p className="text-sm mt-1">Spam: {((spamCount / sampleDataset.length) * 100).toFixed(1)}%</p>
              </div>
              <div className="flex-1">
                <div className="h-2 bg-green-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-600" 
                    style={{ width: `${(hamCount / sampleDataset.length) * 100}%` }}
                  />
                </div>
                <p className="text-sm mt-1">Ham: {((hamCount / sampleDataset.length) * 100).toFixed(1)}%</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
