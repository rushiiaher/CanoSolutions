import ComplaintForm from '@/components/ComplaintForm';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, Mail, Clock, CheckCircle } from 'lucide-react';

export default function LMSSupportPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-secondary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-textPrimary mb-6">
              LMS Support & <span className="text-primary">Complaint System</span>
            </h1>
            <p className="text-xl text-textSecondary mb-8">
              Get quick resolution for your Learning Management System issues. Our dedicated support team is here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Support Info */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card>
              <CardContent className="p-6 text-center">
                <Phone className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-textPrimary mb-2">24/7 Support</h3>
                <p className="text-textSecondary mb-3">Call us anytime for urgent issues</p>
                <p className="text-primary font-semibold">+91 98765 43210</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Mail className="w-12 h-12 text-secondary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-textPrimary mb-2">Email Support</h3>
                <p className="text-textSecondary mb-3">Send detailed queries via email</p>
                <p className="text-secondary font-semibold">lms-support@canosolutions.com</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-textPrimary mb-2">Quick Response</h3>
                <p className="text-textSecondary mb-3">Average response time</p>
                <p className="text-orange-500 font-semibold">Less than 4 Hours</p>
              </CardContent>
            </Card>
          </div>

          {/* Complaint Form */}
          <ComplaintForm />
        </div>
      </section>
    </div>
  );
}