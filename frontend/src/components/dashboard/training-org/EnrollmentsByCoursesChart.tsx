
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface EnrollmentData {
  name: string;
  inscriptions: number;
}

interface EnrollmentsByCoursesChartProps {
  data: EnrollmentData[];
}

const EnrollmentsByCoursesChart: React.FC<EnrollmentsByCoursesChartProps> = ({ data }) => {
  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 10, left: 0, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="name" 
            angle={-45} 
            textAnchor="end"
            height={70}
            tick={{ fontSize: 12 }}
          />
          <YAxis />
          <Tooltip formatter={(value) => [`${value} inscriptions`, 'Inscriptions']} />
          <Bar dataKey="inscriptions" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EnrollmentsByCoursesChart;
