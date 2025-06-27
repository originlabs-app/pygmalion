
import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

interface CourseTypeData {
  name: string;
  count: number;
  color: string;
}

interface CourseTypesChartProps {
  data: CourseTypeData[];
}

const CourseTypesChart: React.FC<CourseTypesChartProps> = ({ data }) => {
  return (
    <div className="h-48">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data.filter(item => item.count > 0)}
            dataKey="count"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={60}
            innerRadius={30}
            label={(entry) => entry.name}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Legend verticalAlign="bottom" height={36} />
          <Tooltip formatter={(value) => [`${value} formations`, 'Nombre']} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CourseTypesChart;
