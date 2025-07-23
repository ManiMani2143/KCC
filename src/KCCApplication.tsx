import React, { useState, useEffect } from 'react';
import { useData } from '../contexts/DataContext';
import { KCCApplication as KCCApplicationType, Member } from '../types';
import { Save, FileText, ArrowLeft, ArrowRight, X, Search } from 'lucide-react';

const KCCApplication: React.FC = () => {
  const { addKCCApplication, members } = useData();
  const [activeTab, setActiveTab] = useState('member-details');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [memberSearchError, setMemberSearchError] = useState('');

  const [formData, setFormData] = useState<Omit<KCCApplicationType, 'id'>>({
    memberDetails: {
      memberNumber: '',
      name: '',
      fatherName: '',
      address: '',
      village: '',
      pinCode: '',
      phone: '',
      email: '',
    },
    suretyDetails: {
      suretyNumber: '',
      suretyName: '',
      suretyFather: '',
      suretyPhone: '',
    },
    landDetails: {
      crop: '',
      acre: '',
      pattaNumber: '',
      surveyNumber: '',
    },
    loanDetails: {
      sanction: '',
      maxCash: '',
      payment: '',
      shareNeeded: '',
    },
    documents: {
      voterId: '',
      aadhaar: '',
      pan: '',
      rationCard: '',
      sbNo: '',
      dob: '',
    },
    timestamp: new Date().toISOString(),
  });

  const tabs = [
    { id: 'member-details', label: 'Member Details' },
    { id: 'surety-details', label: 'Surety Details' },
    { id: 'land-details', label: 'Land Details' },
    { id: 'loan-details', label: 'Loan Details' },
    { id: 'documents', label: 'Documents' },
  ];

  // Handle member number search
  const handleMemberSearch = () => {
    const memberNumber = formData.memberDetails.memberNumber.trim();
    if (!memberNumber) {
      setMemberSearchError('Please enter a member number');
      return;
    }

    setIsSearching(true);
    setMemberSearchError('');

    // Simulate API call or search in local data
    setTimeout(() => {
      const foundMember = members.find(m => m.memberNumber === memberNumber);
      
      if (foundMember) {
        setFormData(prev => ({
          ...prev,
          memberDetails: {
            memberNumber: foundMember.memberNumber,
            name: foundMember.name,
            fatherName: foundMember.fatherName,
            address: foundMember.address,
            village: foundMember.village,
            pinCode: foundMember.pinCode,
            phone: foundMember.phone,
            email: foundMember.email || '',
          },
          documents: {
            ...prev.documents,
            voterId: foundMember.voterId || '',
            aadhaar: foundMember.aadhaar || '',
            pan: foundMember.pan || '',
            rationCard: foundMember.rationCard || '',
            sbNo: foundMember.sbNo || '',
            dob: foundMember.dob || '',
          }
        }));
      } else {
        setMemberSearchError('Member not found');
      }
      setIsSearching(false);
    }, 500);
  };

  // Auto-search when member number is entered and field loses focus
  const handleMemberNumberBlur = () => {
    if (formData.memberDetails.memberNumber && !formData.memberDetails.name) {
      handleMemberSearch();
    }
  };

  const handleInputChange = (section: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value,
      },
    }));
  };

  const validateCurrentTab = () => {
    const currentTabData = formData[activeTab.replace('-', '') as keyof typeof formData] as any;
    const requiredFields = ['member-details'];
    
    if (requiredFields.includes(activeTab)) {
      const { memberNumber, name, fatherName, address, village, pinCode, phone } = formData.memberDetails;
      return memberNumber && name && fatherName && address && village && pinCode && phone;
    }
    return true;
  };

  const nextTab = () => {
    if (!validateCurrentTab()) {
      alert('Please fill all required fields');
      return;
    }
    
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1].id);
    }
  };

  const prevTab = () => {
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1].id);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateCurrentTab()) {
      alert('Please fill all required fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      addKCCApplication(formData);
      alert('KCC Application submitted successfully!');
      
      // Reset form
      setFormData({
        memberDetails: {
          memberNumber: '',
          name: '',
          fatherName: '',
          address: '',
          village: '',
          pinCode: '',
          phone: '',
          email: '',
        },
        suretyDetails: {
          suretyNumber: '',
          suretyName: '',
          suretyFather: '',
          suretyPhone: '',
        },
        landDetails: {
          crop: '',
          acre: '',
          pattaNumber: '',
          surveyNumber: '',
        },
        loanDetails: {
          sanction: '',
          maxCash: '',
          payment: '',
          shareNeeded: '',
        },
        documents: {
          voterId: '',
          aadhaar: '',
          pan: '',
          rationCard: '',
          sbNo: '',
          dob: '',
        },
        timestamp: new Date().toISOString(),
      });
      
      setActiveTab('member-details');
    } catch (error) {
      console.error('Error submitting KCC application:', error);
      alert('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const generatePDF = () => {
    // This would integrate with jsPDF or similar library
    alert('PDF generation feature will be implemented');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">KCC Loan Application</h1>
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
          {/* Member Details Tab */}
          {activeTab === 'member-details' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Member Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Member Number <span className="text-red-500">*</span>
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      value={formData.memberDetails.memberNumber}
                      onChange={(e) => handleInputChange('memberDetails', 'memberNumber', e.target.value)}
                      onBlur={handleMemberNumberBlur}
                      className="w-full px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                    <button
                      type="button"
                      onClick={handleMemberSearch}
                      disabled={isSearching || !formData.memberDetails.memberNumber}
                      className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSearching ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mx-2"></div>
                      ) : (
                        <Search className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {memberSearchError && (
                    <p className="mt-1 text-sm text-red-600">{memberSearchError}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.memberDetails.name}
                    onChange={(e) => handleInputChange('memberDetails', 'name', e.target.value)}
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
                    value={formData.memberDetails.fatherName}
                    onChange={(e) => handleInputChange('memberDetails', 'fatherName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.memberDetails.address}
                    onChange={(e) => handleInputChange('memberDetails', 'address', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Village <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.memberDetails.village}
                    onChange={(e) => handleInputChange('memberDetails', 'village', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    PIN Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.memberDetails.pinCode}
                    onChange={(e) => handleInputChange('memberDetails', 'pinCode', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.memberDetails.phone}
                    onChange={(e) => handleInputChange('memberDetails', 'phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.memberDetails.email || ''}
                    onChange={(e) => handleInputChange('memberDetails', 'email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Rest of your tabs remain the same */}
          {/* Surety Details Tab */}
          {activeTab === 'surety-details' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Surety Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Surety Number
                  </label>
                  <input
                    type="text"
                    value={formData.suretyDetails.suretyNumber || ''}
                    onChange={(e) => handleInputChange('suretyDetails', 'suretyNumber', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Surety Name
                  </label>
                  <input
                    type="text"
                    value={formData.suretyDetails.suretyName || ''}
                    onChange={(e) => handleInputChange('suretyDetails', 'suretyName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Surety Father's Name
                  </label>
                  <input
                    type="text"
                    value={formData.suretyDetails.suretyFather || ''}
                    onChange={(e) => handleInputChange('suretyDetails', 'suretyFather', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Surety Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.suretyDetails.suretyPhone || ''}
                    onChange={(e) => handleInputChange('suretyDetails', 'suretyPhone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Land Details Tab */}
          {activeTab === 'land-details' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Land Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Crop Name
                  </label>
                  <select
                    value={formData.landDetails.crop || ''}
                    onChange={(e) => handleInputChange('landDetails', 'crop', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select Crop</option>
                    <option value="Groundnut">Groundnut</option>
                    <option value="Onion">Onion</option>
                    <option value="Rice">Rice</option>
                    <option value="Maize">Maize</option>
                    <option value="Cotton">Cotton</option>
                    <option value="Wheat">Wheat</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Acre
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.landDetails.acre || ''}
                    onChange={(e) => handleInputChange('landDetails', 'acre', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Patta Number
                  </label>
                  <input
                    type="text"
                    value={formData.landDetails.pattaNumber || ''}
                    onChange={(e) => handleInputChange('landDetails', 'pattaNumber', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Survey Number
                  </label>
                  <input
                    type="text"
                    value={formData.landDetails.surveyNumber || ''}
                    onChange={(e) => handleInputChange('landDetails', 'surveyNumber', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Loan Details Tab */}
          {activeTab === 'loan-details' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Loan Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sanction Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.loanDetails.sanction || ''}
                    onChange={(e) => handleInputChange('loanDetails', 'sanction', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Cash (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.loanDetails.maxCash || ''}
                    onChange={(e) => handleInputChange('loanDetails', 'maxCash', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Payment (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.loanDetails.payment || ''}
                    onChange={(e) => handleInputChange('loanDetails', 'payment', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Share Needed (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.loanDetails.shareNeeded || ''}
                    onChange={(e) => handleInputChange('loanDetails', 'shareNeeded', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === 'documents' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Document Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Voter ID
                  </label>
                  <input
                    type="text"
                    value={formData.documents.voterId || ''}
                    onChange={(e) => handleInputChange('documents', 'voterId', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Aadhaar No
                  </label>
                  <input
                    type="text"
                    value={formData.documents.aadhaar || ''}
                    onChange={(e) => handleInputChange('documents', 'aadhaar', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    PAN
                  </label>
                  <input
                    type="text"
                    value={formData.documents.pan || ''}
                    onChange={(e) => handleInputChange('documents', 'pan', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ration Card
                  </label>
                  <input
                    type="text"
                    value={formData.documents.rationCard || ''}
                    onChange={(e) => handleInputChange('documents', 'rationCard', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    EDCCB SB No
                  </label>
                  <input
                    type="text"
                    value={formData.documents.sbNo || ''}
                    onChange={(e) => handleInputChange('documents', 'sbNo', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={formData.documents.dob || ''}
                    onChange={(e) => handleInputChange('documents', 'dob', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={prevTab}
              disabled={activeTab === 'member-details'}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </button>

            <div className="flex space-x-4">
              {activeTab === 'documents' ? (
                <>
                  <button
                    type="button"
                    onClick={generatePDF}
                    className="flex items-center px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Generate PDF
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Application
                      </>
                    )}
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={nextTab}
                  className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default KCCApplication;