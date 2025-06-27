
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ComplianceChart from './ComplianceChart';

interface ComplianceStatsProps {
  chartData: {
    name: string;
    compliant: number;
    expiring: number;
    expired: number;
  }[];
}

const ComplianceStats: React.FC<ComplianceStatsProps> = ({ chartData }) => {
  // Calculate overall compliance percentage
  const overallCompliance = chartData.reduce(
    (acc, curr) => {
      return {
        total: acc.total + 1,
        compliant: acc.compliant + curr.compliant
      };
    }, 
    { total: 0, compliant: 0 }
  );

  const compliancePercentage = Math.round(
    (overallCompliance.compliant / chartData.length) * 100
  );

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Conformité par catégorie</span>
          <span className="text-lg font-normal text-muted-foreground">
            Taux global: <span className="text-primary font-medium">{compliancePercentage}%</span>
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ComplianceChart data={chartData} />
      </CardContent>
    </Card>
  );
};

export default ComplianceStats;
