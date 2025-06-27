
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface CourseDetailsTabProps {
  objectives: string;
  targetAudience: string;
  requirements: string;
  program: string;
  qualiopiIndicators: string[];
}

const CourseDetailsTab: React.FC<CourseDetailsTabProps> = ({
  objectives,
  targetAudience,
  requirements,
  program,
  qualiopiIndicators
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Learning Objectives</h3>
        <p>{objectives}</p>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Target Audience</h3>
        <p>{targetAudience}</p>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Requirements</h3>
        <p>{requirements}</p>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Program</h3>
        <p>{program}</p>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Quality Indicators</h3>
        <div className="flex flex-wrap gap-2">
          {qualiopiIndicators.map((indicator, idx) => (
            <Badge key={idx} variant="outline" className="bg-muted/50">
              {indicator}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsTab;
