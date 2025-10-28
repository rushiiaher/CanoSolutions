"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export default function ComplaintForm() {
  const [formData, setFormData] = useState({
    school_name: '',
    contact_person: '',
    contact_email: '',
    contact_phone: '',
    issue_category: '',
    priority: 'P3',
    title: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setMessage(`Complaint submitted successfully! Ticket Number: ${data.ticket_number}`);
        setFormData({
          school_name: '',
          contact_person: '',
          contact_email: '',
          contact_phone: '',
          issue_category: '',
          priority: 'P3',
          title: '',
          description: ''
        });
      } else {
        setMessage('Failed to submit complaint. Please try again.');
      }
    } catch (error) {
      setMessage('Error submitting complaint. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-textPrimary">
          Submit LMS Complaint
        </CardTitle>
        <p className="text-textSecondary">
          Report issues with your Learning Management System
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* School Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-textPrimary">School Information</h3>
            
            <div>
              <Label htmlFor="school_name">School Name *</Label>
              <Input
                id="school_name"
                value={formData.school_name}
                onChange={(e) => handleChange('school_name', e.target.value)}
                placeholder="Enter school name"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contact_person">Contact Person *</Label>
                <Input
                  id="contact_person"
                  value={formData.contact_person}
                  onChange={(e) => handleChange('contact_person', e.target.value)}
                  placeholder="Principal/IT Head name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="contact_phone">Phone Number *</Label>
                <Input
                  id="contact_phone"
                  value={formData.contact_phone}
                  onChange={(e) => handleChange('contact_phone', e.target.value)}
                  placeholder="+91 XXXXXXXXXX"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="contact_email">Email Address *</Label>
              <Input
                id="contact_email"
                type="email"
                value={formData.contact_email}
                onChange={(e) => handleChange('contact_email', e.target.value)}
                placeholder="school@example.com"
                required
              />
            </div>
          </div>

          {/* Issue Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-textPrimary">Issue Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="issue_category">Issue Category *</Label>
                <Select value={formData.issue_category} onValueChange={(value) => handleChange('issue_category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hardware">Hardware Issue</SelectItem>
                    <SelectItem value="software">Software Problem</SelectItem>
                    <SelectItem value="network">Network/Connectivity</SelectItem>
                    <SelectItem value="training">Training Required</SelectItem>
                    <SelectItem value="maintenance">Maintenance Request</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="priority">Priority Level</Label>
                <Select value={formData.priority} onValueChange={(value) => handleChange('priority', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="P1">P1 - Critical (System Down)</SelectItem>
                    <SelectItem value="P2">P2 - High (Major Impact)</SelectItem>
                    <SelectItem value="P3">P3 - Medium (Minor Impact)</SelectItem>
                    <SelectItem value="P4">P4 - Low (Enhancement)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="title">Issue Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Brief description of the issue"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Detailed Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Please provide detailed information about the issue, steps to reproduce, error messages, etc."
                rows={5}
                required
              />
            </div>
          </div>

          {message && (
            <div className={`p-4 rounded-lg ${message.includes('successfully') ? 'bg-secondary/10 text-secondary' : 'bg-red-100 text-red-800'}`}>
              {message}
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Complaint'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}