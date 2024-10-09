import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from './components/ui/card';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { AlertCircle, Search } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './components/ui/alert';

interface Results {
  [key: string]: string; // Type pour les résultats, ajustez selon votre structure de données
}

const Dashboard: React.FC = () => {
  const [query, setQuery] = useState('');
  const [dataset, setDataset] = useState('both');
  const [results, setResults] = useState<Results | null>(null); // Typage ici
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleQuery = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8000/api/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: query,
          dataset,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch results');
      }

      const data = await response.json();
      setResults(data.results);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred'); // Gestion des erreurs inconnues
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-6">
        <CardHeader>
          <h1 className="text-2xl font-bold">Survey Analysis Dashboard</h1>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input
              placeholder="Enter your query..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-grow"
            />
            <Select value={dataset} onValueChange={setDataset}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select dataset" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="both">Both Datasets</SelectItem>
                <SelectItem value="sustainability">Sustainability</SelectItem>
                <SelectItem value="christmas">Christmas</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              onClick={handleQuery}
              disabled={loading || !query}
              className="w-24"
            >
              {loading ? (
                <div className="animate-spin">↻</div>
              ) : (
                <Search className="w-4 h-4" />
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {results && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(results).map(([dataset, result]) => (
            <Card key={dataset}>
              <CardHeader>
                <h2 className="text-xl font-semibold capitalize">{dataset} Survey Results</h2>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap">{result}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
