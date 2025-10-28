"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { School, Ticket, Users, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalSchools: 156,
    activeTickets: 42,
    pendingIssues: 18,
    slaRate: 95
  });

  const [recentTickets, setRecentTickets] = useState([
    {
      id: 'TKT-1234',
      title: 'Digital Board Not Working',
      school: 'ABC Government School',
      priority: 'P1',
      status: 'new',
      created_at: '2025-01-15T10:30:00Z'
    },
    {
      id: 'TKT-1235',
      title: 'UPS Battery Issue',
      school: 'XYZ Primary School',
      priority: 'P2',
      status: 'assigned',
      created_at: '2025-01-15T09:15:00Z'
    }
  ]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'P1': return 'bg-red-100 text-red-800';
      case 'P2': return 'bg-orange-100 text-orange-800';
      case 'P3': return 'bg-yellow-100 text-yellow-800';
      case 'P4': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'assigned': return 'bg-yellow-100 text-yellow-800';
      case 'in_progress': return 'bg-orange-100 text-orange-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-neutralCard">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-textPrimary">LMS Admin Dashboard</h1>
              <p className="text-textSecondary">Cano Solutions Management Panel</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button className="bg-primary hover:bg-primary/90">
                + New Ticket
              </Button>
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
                A
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-textSecondary text-sm">Total Schools</p>
                  <p className="text-3xl font-bold text-textPrimary">{stats.totalSchools}</p>
                </div>
                <School className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-textSecondary text-sm">Active Tickets</p>
                  <p className="text-3xl font-bold text-textPrimary">{stats.activeTickets}</p>
                </div>
                <Ticket className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-textSecondary text-sm">Pending Issues</p>
                  <p className="text-3xl font-bold text-textPrimary">{stats.pendingIssues}</p>
                </div>
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-textSecondary text-sm">SLA Rate</p>
                  <p className="text-3xl font-bold text-textPrimary">{stats.slaRate}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-secondary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Tickets */}
        <Card>
          <CardHeader>
            <CardTitle className="text-textPrimary">Recent Complaints</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTickets.map((ticket) => (
                <div key={ticket.id} className="flex items-center justify-between p-4 bg-white rounded-lg border">
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="font-semibold text-textPrimary">{ticket.id}</p>
                      <p className="text-textSecondary text-sm">{ticket.title}</p>
                      <p className="text-textSecondary text-xs">{ticket.school}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getPriorityColor(ticket.priority)}>
                      {ticket.priority}
                    </Badge>
                    <Badge className={getStatusColor(ticket.status)}>
                      {ticket.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Button className="h-16 bg-primary hover:bg-primary/90">
            + Add New School
          </Button>
          <Button className="h-16 bg-secondary hover:bg-secondary/90">
            + Create Ticket
          </Button>
          <Button className="h-16 bg-gray-600 hover:bg-gray-700 text-white">
            View Reports
          </Button>
        </div>
      </div>
    </div>
  );
}