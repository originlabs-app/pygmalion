
import React from 'react';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

interface ComplianceChartProps {
  data: {
    name: string;
    compliant: number;
    expiring: number;
    expired: number;
  }[];
}

const ComplianceChart: React.FC<ComplianceChartProps> = ({ data }) => {
  // Configuration for the chart colors
  const config = {
    compliant: { color: '#10b981' }, // green
    expiring: { color: '#f59e0b' },  // amber
    expired: { color: '#ef4444' },   // red
  };

  return (
    <ChartContainer className="h-[300px]" config={config}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          stackOffset="expand"
          barSize={30}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} />
          <Tooltip 
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <ChartTooltipContent
                    className="border-border bg-background p-2"
                    payload={payload}
                    formatter={(value: number) => `${(value * 100).toFixed(0)}%`}
                  />
                );
              }
              return null;
            }} 
          />
          <Bar dataKey="compliant" stackId="a" fill="var(--color-compliant)" name="Certifications valides" />
          <Bar dataKey="expiring" stackId="a" fill="var(--color-expiring)" name="Certifications expirantes" />
          <Bar dataKey="expired" stackId="a" fill="var(--color-expired)" name="Certifications expirées" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default ComplianceChart;
