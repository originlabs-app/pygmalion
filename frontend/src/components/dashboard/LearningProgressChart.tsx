
import React from 'react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Enrollment } from '@/types';
import { useCourses } from '@/contexts/CourseContext';

interface LearningProgressChartProps {
  enrollments: Enrollment[];
}

const LearningProgressChart: React.FC<LearningProgressChartProps> = ({ enrollments }) => {
  const { getCourse } = useCourses();

  // Generate progress data based on enrollment status
  // In a real application, this would come from the enrollment progress API
  const progressData = enrollments.map(enrollment => {
    const course = getCourse(enrollment.courseId);
    // Use enrollment status to determine default progress
    let progress = 0;
    switch (enrollment.status) {
      case 'completed':
        progress = 100;
        break;
      case 'approved':
        progress = 50; // Valeur par défaut pour les cours en cours
        break;
      case 'pending':
        progress = 0;
        break;
      default:
        progress = 25;
    }
    
    return {
      name: course?.title?.substring(0, 20) || 'Formation',
      total: 100,
      progress: progress,
      courseId: enrollment.courseId
    };
  });

  // Configuration for chart colors
  const chartConfig = {
    total: {
      label: 'Total',
      theme: {
        light: '#f3f4f6',
        dark: '#2d3748',
      },
    },
    progress: {
      label: 'Progression',
      theme: {
        light: '#8b5cf6',
        dark: '#9b87f5',
      },
    },
  };

  return (
    <div className="w-full">
      {progressData.length > 0 ? (
        <ChartContainer config={chartConfig} className="aspect-[5/2]">
          <BarChart data={progressData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" domain={[0, 100]} />
            <YAxis 
              dataKey="name" 
              type="category" 
              width={150}
              tick={{ fontSize: 12 }}
            />
            <ChartTooltip
              content={<ChartTooltipContent />}
            />
            <Bar dataKey="total" fill="var(--color-total)" radius={[0, 4, 4, 0]} barSize={20} />
            <Bar dataKey="progress" fill="var(--color-progress)" radius={[0, 4, 4, 0]} barSize={20} />
            <Legend />
          </BarChart>
        </ChartContainer>
      ) : (
        <div className="flex justify-center items-center h-40 bg-muted/20 rounded-md">
          <p className="text-muted-foreground">Aucune formation active en cours</p>
        </div>
      )}
    </div>
  );
};

export default LearningProgressChart;
