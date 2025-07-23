import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { Member } from '../types';
import { Save, X, Plus, Minus, ArrowRight, ArrowLeft } from 'lucide-react';

const AddMember: React.FC = () => {
  const navigate = useNavigate();
  const { addMember } = useData();
  const [activeTab, setActiveTab] = useState('basic');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<Omit<Member, 'id'>>({
    basicInfo: {
      memberNumber: '',
      memberName: '',
      fatherName: '',
      address: '',
      mobile: '',
      dob: '',
      aadhar: '',
      pan: '',
      gender: 'Male',
      category: 'General',
      occupation: '',
    },
    surveys: [{ surveyNumber: '', acreage: '' }],
    loanDetails: {
      loanAmount: '',
      ajlLoan: '',
      loanType: '',
      purpose: '',
      repaymentPeriod: '',
      interestRate: '',
      loanDate: '',
      loanTenure: '',
    },
    bankDetails: {
      accountNumber: '',
      bankName: '',
      branchName: '',
      ifscCode: '',
      micrCode: '',
    },
    documents: {
      aadharCard: '',
      panCard: '',
      landDocs: '',
      signature: '',
      otherDocs: '',
    },
    timestamp: new Date().toISOString(),
  });

  const handleInputChange = (section: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value,
      },
    }));
  };

  const addSurvey = () => {
    setFormData(prev => ({
      ...prev,
      surveys: [...prev.surveys, { surveyNumber: '', acreage: '' }],
    }));
  };

  const removeSurvey = (index: number) => {
    if (formData.surveys.length > 1) {
      setFormData(prev => ({
        ...prev,
        surveys: prev.surveys.filter((_, i) => i !== index),
      }));
    }
  };

  const updateSurvey = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      surveys: prev.surveys.map((survey, i) => 
        i === index ? { ...survey, [field]: value } : survey
      ),
    }));
  };

  const validateCurrentTab = () => {
    if (activeTab === 'basic') {
      const { memberNumber, memberName, fatherName, address, aadhar } = formData.basicInfo;
      return memberNumber && memberName && fatherName && address && aadhar;
    }
    return true;
  };

  const nextTab = () => {
    if (!validateCurrentTab()) {
      alert('Please fill all required fields');
      return;
    }
    
    if (activeTab === 'basic') {
      setActiveTab('documents');
    }
  };

  const prevTab = () => {
    if (activeTab === 'documents') {
      setActiveTab('basic');
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate required fields
    if (!formData.basicInfo.memberNumber || !formData.basicInfo.memberName || 
        !formData.basicInfo.fatherName || !formData.basicInfo.aadhar) {
      alert('Please fill all required fields');
      setIsSubmitting(false);
      return;
    }

    try {
      addMember(formData);
      alert('Member added successfully!');
      navigate('/members');
    } catch (error) {
      console.error('Error adding member:', error);
      alert('Failed to add member. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const tabs = [
    { id: 'basic', label: 'Basic Information' },
    { id: 'loans', label: 'Loan Details' },
    { id: 'documents', label: 'Documents' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Add New Member</h1>
        <button
          onClick={() => navigate('/members')}
          className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Basic Information Tab */}
          {activeTab === 'basic' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Member Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.basicInfo.memberNumber}
                    onChange={(e) => handleInputChange('basicInfo', 'memberNumber', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Member Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.basicInfo.memberName}
                    onChange={(e) => handleInputChange('basicInfo', 'memberName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Father's Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.basicInfo.fatherName}
                    onChange={(e) => handleInputChange('basicInfo', 'fatherName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    value={formData.basicInfo.mobile}
                    onChange={(e) => handleInputChange('basicInfo', 'mobile', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Aadhar Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.basicInfo.aadhar}
                    onChange={(e) => handleInputChange('basicInfo', 'aadhar', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    maxLength={12}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={formData.basicInfo.dob}
                    onChange={(e) => handleInputChange('basicInfo', 'dob', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.basicInfo.address}
                  onChange={(e) => handleInputChange('basicInfo', 'address', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Survey Information */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-800">Survey Information</h3>
                  <button
                    type="button"
                    onClick={addSurvey}
                    className="flex items-center text-green-600 hover:text-green-700 transition-colors duration-200"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Survey
                  </button>
                </div>

                {formData.surveys.map((survey, index) => (
                  <div key={index} className="flex items-center space-x-4 mb-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Survey Number"
                        value={survey.surveyNumber}
                        onChange={(e) => updateSurvey(index, 'surveyNumber', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        type="number"
                        step="0.01"
                        placeholder="Acreage"
                        value={survey.acreage}
                        onChange={(e) => updateSurvey(index, 'acreage', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    {formData.surveys.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSurvey(index)}
                        className="text-red-600 hover:text-red-700 transition-colors duration-200"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Loan Details Tab */}
          {activeTab === 'loans' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interest Rate (%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.loanDetails.interestRate}
                  onChange={(e) => handleInputChange('loanDetails', 'interestRate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === 'documents' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Aadhar Card Number
                </label>
                <input
                  type="text"
                  value={formData.documents?.aadharCard || ''}
                  onChange={(e) => handleInputChange('documents', 'aadharCard', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  maxLength={12}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  PAN Card Number
                </label>
                <input
                  type="text"
                  value={formData.documents?.panCard || ''}
                  onChange={(e) => handleInputChange('documents', 'panCard', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  maxLength={10}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Land Document Number
                </label>
                <input
                  type="text"
                  value={formData.documents?.landDocs || ''}
                  onChange={(e) => handleInputChange('documents', 'landDocs', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Signature Date
                </label>
                <input
                  type="date"
                  value={formData.documents?.signature || ''}
                  onChange={(e) => handleInputChange('documents', 'signature', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
            {activeTab === 'basic' && (
              <div></div>
            )}
            {activeTab === 'documents' && (
              <button
                type="button"
                onClick={prevTab}
                className="flex items-center px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </button>
            )}
            
            <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => navigate('/members')}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
              
              {activeTab === 'basic' && (
                <button
                  type="button"
                  onClick={nextTab}
                  className="flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Next
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              )}
              
              {activeTab === 'documents' && (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="relative flex items-center px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-lg overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 opacity-0 hover:opacity-20 transition-opacity duration-200"></div>
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      <span className="font-semibold">Saving Member...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5 mr-2" />
                      <span className="font-semibold">Save Member</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMember;