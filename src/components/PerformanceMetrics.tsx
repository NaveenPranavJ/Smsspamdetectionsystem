import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { modelMetrics } from '../utils/spamDetectionService';

export function PerformanceMetrics() {
  const { accuracy, precision, recall, f1Score, confusionMatrix } = modelMetrics;

  // Data for classification report chart
  const classificationData = [
    {
      metric: 'Precision',
      Ham: precision.ham,
      Spam: precision.spam
    },
    {
      metric: 'Recall',
      Ham: recall.ham,
      Spam: recall.spam
    },
    {
      metric: 'F1-Score',
      Ham: f1Score.ham,
      Spam: f1Score.spam
    }
  ];

  // Confusion matrix visualization data
  const confusionData = [
    { actual: 'Ham', predicted: 'Ham', value: confusionMatrix.trueNegative, label: 'TN' },
    { actual: 'Ham', predicted: 'Spam', value: confusionMatrix.falsePositive, label: 'FP' },
    { actual: 'Spam', predicted: 'Ham', value: confusionMatrix.falseNegative, label: 'FN' },
    { actual: 'Spam', predicted: 'Spam', value: confusionMatrix.truePositive, label: 'TP' }
  ];

  return (
    <div className="space-y-6">
      {/* Overall Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Overall Accuracy</CardDescription>
            <CardTitle className="text-3xl">{(accuracy * 100).toFixed(1)}%</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Samples</CardDescription>
            <CardTitle className="text-3xl">{modelMetrics.totalSamples}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Spam Messages</CardDescription>
            <CardTitle className="text-3xl">{modelMetrics.spamSamples}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Ham Messages</CardDescription>
            <CardTitle className="text-3xl">{modelMetrics.hamSamples}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Classification Report */}
      <Card>
        <CardHeader>
          <CardTitle>Classification Report</CardTitle>
          <CardDescription>Performance metrics for each class</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={classificationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="metric" />
              <YAxis domain={[0, 1]} />
              <Tooltip formatter={(value: number) => `${(value * 100).toFixed(1)}%`} />
              <Legend />
              <Bar dataKey="Ham" fill="#22c55e" />
              <Bar dataKey="Spam" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Confusion Matrix */}
      <Card>
        <CardHeader>
          <CardTitle>Confusion Matrix</CardTitle>
          <CardDescription>Actual vs Predicted classifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Visual Matrix */}
            <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
              <div></div>
              <div className="text-center text-sm p-2">Predicted Ham</div>
              <div className="text-center text-sm p-2">Predicted Spam</div>
              
              <div className="text-sm p-2 flex items-center">Actual Ham</div>
              <div className="bg-green-100 border-2 border-green-500 p-4 rounded-lg text-center">
                <div className="text-xs text-green-700 mb-1">True Negative</div>
                <div className="text-2xl">{confusionMatrix.trueNegative}</div>
              </div>
              <div className="bg-red-100 border-2 border-red-300 p-4 rounded-lg text-center">
                <div className="text-xs text-red-700 mb-1">False Positive</div>
                <div className="text-2xl">{confusionMatrix.falsePositive}</div>
              </div>
              
              <div className="text-sm p-2 flex items-center">Actual Spam</div>
              <div className="bg-red-100 border-2 border-red-300 p-4 rounded-lg text-center">
                <div className="text-xs text-red-700 mb-1">False Negative</div>
                <div className="text-2xl">{confusionMatrix.falseNegative}</div>
              </div>
              <div className="bg-green-100 border-2 border-green-500 p-4 rounded-lg text-center">
                <div className="text-xs text-green-700 mb-1">True Positive</div>
                <div className="text-2xl">{confusionMatrix.truePositive}</div>
              </div>
            </div>

            {/* Metrics Explanation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-green-600">Correctly Classified</Badge>
                </div>
                <p className="text-sm">
                  <strong>True Negative (TN):</strong> Ham messages correctly identified as ham ({confusionMatrix.trueNegative})
                </p>
                <p className="text-sm mt-2">
                  <strong>True Positive (TP):</strong> Spam messages correctly identified as spam ({confusionMatrix.truePositive})
                </p>
              </div>
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="destructive">Misclassified</Badge>
                </div>
                <p className="text-sm">
                  <strong>False Positive (FP):</strong> Ham messages incorrectly labeled as spam ({confusionMatrix.falsePositive})
                </p>
                <p className="text-sm mt-2">
                  <strong>False Negative (FN):</strong> Spam messages incorrectly labeled as ham ({confusionMatrix.falseNegative})
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Metrics Table */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Class</th>
                  <th className="text-right p-3">Precision</th>
                  <th className="text-right p-3">Recall</th>
                  <th className="text-right p-3">F1-Score</th>
                  <th className="text-right p-3">Support</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3">Ham</td>
                  <td className="text-right p-3">{precision.ham.toFixed(2)}</td>
                  <td className="text-right p-3">{recall.ham.toFixed(2)}</td>
                  <td className="text-right p-3">{f1Score.ham.toFixed(2)}</td>
                  <td className="text-right p-3">{modelMetrics.hamSamples}</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">Spam</td>
                  <td className="text-right p-3">{precision.spam.toFixed(2)}</td>
                  <td className="text-right p-3">{recall.spam.toFixed(2)}</td>
                  <td className="text-right p-3">{f1Score.spam.toFixed(2)}</td>
                  <td className="text-right p-3">{modelMetrics.spamSamples}</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="p-3">Accuracy</td>
                  <td className="text-right p-3" colSpan={3}>{accuracy.toFixed(3)}</td>
                  <td className="text-right p-3">{modelMetrics.totalSamples}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
