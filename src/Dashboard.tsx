import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { Users, CreditCard, TrendingUp, UserPlus, FileText, Scale, DollarSign, Calendar, Clock, Tractor, Building, LineChart as ChartLine, Shield } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { getStats } = useData();
  const [currentTime, setCurrentTime] = useState(new Date());
  const stats = getStats();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const mainModules = [
    { 
      title: 'Member Portal', 
      icon: Users, 
      path: '/members', 
      description: 'Manage all member accounts and services',
      color: 'bg-blue-500'
    },
    { 
      title: 'KCC Loans', 
      icon: CreditCard, 
      path: '/kcc', 
      description: 'Kissan Credit Card applications',
      color: 'bg-green-500'
    },
    { 
      title: 'AJL Loans', 
      icon: DollarSign, 
      path: '#', 
      description: 'Agricultural term loans',
      color: 'bg-purple-500'
    },
    { 
      title: 'Scale of Finance', 
      icon: Scale, 
      path: '/scale-of-finance', 
      description: 'Crop-wise financial planning',
      color: 'bg-orange-500'
    },
    { 
      title: 'MT', 
      icon: Tractor, 
      path: '#', 
      description: 'Marketing and transportation',
      color: 'bg-indigo-500'
    },
    { 
      title: 'Working Capital', 
      icon: ChartLine, 
      path: '#', 
      description: 'Current account management',
      color: 'bg-pink-500'
    },
  ];

  const quickActions = [
    { title: 'Add New Member', icon: UserPlus, path: '/add-member', color: 'bg-gradient-to-r from-blue-500 to-blue-600' },
    { title: 'Update Member', icon: Users, path: '/members', color: 'bg-gradient-to-r from-green-500 to-green-600' },
    { title: 'UC Processing', icon: FileText, path: '#', color: 'bg-gradient-to-r from-purple-500 to-purple-600' },
    { title: 'Resolution', icon: FileText, path: '#', color: 'bg-gradient-to-r from-indigo-500 to-indigo-600' },
    { title: 'Bank Statement', icon: Building, path: '#', color: 'bg-gradient-to-r from-blue-600 to-blue-700' },
    { title: 'Member List', icon: Users, path: '/members', color: 'bg-gradient-to-r from-green-600 to-green-700' },
    { title: 'Cropwise Loans', icon: Scale, path: '/scale-of-finance', color: 'bg-gradient-to-r from-orange-500 to-orange-600' },
    { title: 'Village Update', icon: Building, path: '#', color: 'bg-gradient-to-r from-teal-500 to-teal-600' },
  ];

  const statisticsCards = [
    {
      title: 'Total Members',
      value: stats.totalMembers,
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Active Loans',
      value: formatCurrency(stats.totalLoanAmount),
      icon: DollarSign,
      color: 'bg-green-500',
      change: '+8%',
      changeType: 'positive'
    },
    {
      title: 'KCC Applications',
      value: stats.kccApplications,
      icon: CreditCard,
      color: 'bg-purple-500',
      change: '-5%',
      changeType: 'negative'
    },
    {
      title: 'SAM Beneficiaries',
      value: 326,
      icon: TrendingUp,
      color: 'bg-orange-500',
      change: '+15%',
      changeType: 'positive'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">PACS Dashboard</h1>
            <p className="text-gray-600 mt-1">Primary Agricultural Credit Society - Member Financial Management System</p>
          </div>
          <div className="text-right">
            <div className="flex items-center text-green-600 font-semibold">
              <Clock className="w-5 h-5 mr-2" />
              {currentTime.toLocaleTimeString('en-IN', { 
                hour12: true, 
                hour: '2-digit', 
                minute: '2-digit',
                second: '2-digit'
              })}
            </div>
            <div className="flex items-center text-gray-500 text-sm mt-1">
              <Calendar className="w-4 h-4 mr-1" />
              {currentTime.toLocaleDateString('en-IN', { 
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statisticsCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <span className={`text-sm font-medium flex items-center ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <TrendingUp className={`w-4 h-4 mr-1 ${stat.changeType === 'negative' ? 'rotate-180' : ''}`} />
                    {stat.change}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Modules */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-green-600" />
          Main Modules
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mainModules.map((module, index) => (
            <Link
              key={index}
              to={module.path}
              className="group bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg hover:border-green-300 transition-all duration-200"
            >
              <div className="flex items-center justify-center mb-4">
                <div className={`${module.color} p-4 rounded-lg group-hover:scale-110 transition-transform duration-200`}>
                  <module.icon className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 text-center mb-2">{module.title}</h3>
              <p className="text-gray-600 text-center text-sm">{module.description}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-green-600" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.path}
              className={`${action.color} text-white p-6 rounded-lg transition-all duration-200 hover:transform hover:scale-105 hover:shadow-lg text-center`}
            >
              <div className="flex items-center justify-center mb-3">
                <action.icon className="w-8 h-8" />
              </div>
              <h3 className="font-semibold">{action.title}</h3>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center p-4 bg-green-50 rounded-lg">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-white" />
            </div>
            <div className="ml-4">
              <p className="font-medium text-gray-800">New member registration</p>
              <p className="text-sm text-gray-500">2 minutes ago</p>
            </div>
          </div>
          
          <div className="flex items-center p-4 bg-blue-50 rounded-lg">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <div className="ml-4">
              <p className="font-medium text-gray-800">KCC application submitted</p>
              <p className="text-sm text-gray-500">15 minutes ago</p>
            </div>
          </div>
          
          <div className="flex items-center p-4 bg-purple-50 rounded-lg">
            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
              <Scale className="w-5 h-5 text-white" />
            </div>
            <div className="ml-4">
              <p className="font-medium text-gray-800">Scale of finance updated</p>
              <p className="text-sm text-gray-500">1 hour ago</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-6 border-t border-gray-200">
        <div className="text-green-600 font-semibold text-lg mb-2">
          <Clock className="w-5 h-5 inline mr-2" />
          {currentTime.toLocaleString('en-IN', {
            timeZone: 'Asia/Kolkata',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
        <div className="text-gray-600">Primary Agricultural Credit Society - Member Financial Management System</div>
        <div className="text-gray-500 text-sm mt-2 flex items-center justify-center">
          <Shield className="w-4 h-4 mr-1" />
          Secure Session | v2.4.1
        </div>
      </div>
    </div>
  );
};

export default Dashboard;