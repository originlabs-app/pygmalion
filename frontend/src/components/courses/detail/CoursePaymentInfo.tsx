import React from 'react';
import { CreditCard, Users, Calendar, RefreshCw, Percent } from 'lucide-react';
import { Course } from '@/types';
import { Badge } from '@/components/ui/badge';

interface CoursePaymentInfoProps {
  course: Course;
}

const CoursePaymentInfo: React.FC<CoursePaymentInfoProps> = ({ course }) => {
  const hasPaymentInfo = course.payment_options?.length > 0 || 
                        course.early_bird_discount || 
                        course.group_discount ||
                        course.refund_policy;

  if (!hasPaymentInfo) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Informations de paiement</h3>
      
      <div className="space-y-4">
        {/* Options de paiement */}
        {course.payment_options && course.payment_options.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <CreditCard className="h-5 w-5 text-green-600" />
              <h4 className="font-medium text-gray-900">Moyens de paiement acceptés</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {course.payment_options.map((option, idx) => (
                <Badge key={idx} variant="outline" className="bg-white">
                  {option}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Early bird discount */}
        {course.early_bird_discount && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-yellow-600" />
              <p className="font-medium text-gray-900">
                Réduction early bird : -{course.early_bird_discount}%
              </p>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Pour toute inscription anticipée
            </p>
          </div>
        )}

        {/* Group discount */}
        {course.group_discount && Object.keys(course.group_discount).length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Users className="h-5 w-5 text-blue-600" />
              <h4 className="font-medium text-gray-900">Réductions de groupe</h4>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(course.group_discount).map(([key, value]) => (
                <div key={key} className="bg-white rounded-lg p-3 text-center border border-gray-200">
                  <p className="text-sm text-gray-600">{key.replace(/_/g, '-')}</p>
                  <p className="font-semibold text-green-600">-{value}%</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Refund policy */}
        {course.refund_policy && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <RefreshCw className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Politique de remboursement</h4>
                <p className="text-sm text-gray-700">{course.refund_policy}</p>
              </div>
            </div>
          </div>
        )}

        {/* Eligibilités */}
        <div className="flex gap-4 pt-2">
          {course.cpf_eligible && (
            <Badge className="bg-purple-100 text-purple-700">
              <Percent className="h-3 w-3 mr-1" />
              Éligible CPF
            </Badge>
          )}
          {course.opco_eligible && (
            <Badge className="bg-indigo-100 text-indigo-700">
              <Percent className="h-3 w-3 mr-1" />
              Financement OPCO
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursePaymentInfo;