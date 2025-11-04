import { FileText, DollarSign, Download, Send, Plus, X, Check, Clock, AlertCircle, Eye } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Invoice {
  id: string;
  invoiceNumber: string;
  client: string;
  project: string;
  issueDate: Date;
  dueDate: Date;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  paymentDate?: Date;
  notes?: string;
}

interface InvoiceItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface InvoicingSystemProps {
  onClose: () => void;
}

export default function InvoicingSystem({ onClose }: InvoicingSystemProps) {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const invoices: Invoice[] = [
    {
      id: 'inv1',
      invoiceNumber: 'INV-2025-001',
      client: 'Acme Corporation',
      project: 'Office Renovation',
      issueDate: new Date(2025, 10, 1),
      dueDate: new Date(2025, 10, 31),
      items: [
        { description: 'General Construction Services', quantity: 120, rate: 85, amount: 10200 },
        { description: 'Material Supply', quantity: 1, rate: 3500, amount: 3500 },
        { description: 'Project Management', quantity: 40, rate: 120, amount: 4800 },
      ],
      subtotal: 18500,
      tax: 1665,
      total: 20165,
      status: 'sent',
      notes: 'Payment due within 30 days',
    },
    {
      id: 'inv2',
      invoiceNumber: 'INV-2025-002',
      client: 'Smith Residence',
      project: 'Kitchen Remodel',
      issueDate: new Date(2025, 9, 15),
      dueDate: new Date(2025, 10, 15),
      items: [
        { description: 'Cabinetry Installation', quantity: 1, rate: 8500, amount: 8500 },
        { description: 'Countertop Fabrication', quantity: 45, rate: 65, amount: 2925 },
        { description: 'Plumbing Work', quantity: 16, rate: 95, amount: 1520 },
      ],
      subtotal: 12945,
      tax: 1165.05,
      total: 14110.05,
      status: 'paid',
      paymentDate: new Date(2025, 10, 10),
    },
    {
      id: 'inv3',
      invoiceNumber: 'INV-2025-003',
      client: 'Tech Startup Inc',
      project: 'Office Build-Out',
      issueDate: new Date(2025, 9, 1),
      dueDate: new Date(2025, 9, 31),
      items: [
        { description: 'Electrical Installation', quantity: 80, rate: 95, amount: 7600 },
        { description: 'HVAC System', quantity: 1, rate: 12000, amount: 12000 },
      ],
      subtotal: 19600,
      tax: 1764,
      total: 21364,
      status: 'overdue',
    },
    {
      id: 'inv4',
      invoiceNumber: 'INV-2025-004',
      client: 'Downtown Retail',
      project: 'Storefront Renovation',
      issueDate: new Date(2025, 10, 5),
      dueDate: new Date(2025, 11, 5),
      items: [
        { description: 'Design Services', quantity: 20, rate: 150, amount: 3000 },
        { description: 'Permit Processing', quantity: 1, rate: 800, amount: 800 },
      ],
      subtotal: 3800,
      tax: 342,
      total: 4142,
      status: 'draft',
    },
  ];

  const filteredInvoices = invoices.filter(inv =>
    filterStatus === 'all' || inv.status === filterStatus
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      case 'sent': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'paid': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'overdue': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'cancelled': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft': return <FileText className="w-4 h-4" />;
      case 'sent': return <Send className="w-4 h-4" />;
      case 'paid': return <Check className="w-4 h-4" />;
      case 'overdue': return <AlertCircle className="w-4 h-4" />;
      case 'cancelled': return <X className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const totalRevenue = invoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.total, 0);
  const pendingRevenue = invoices.filter(inv => inv.status === 'sent').reduce((sum, inv) => sum + inv.total, 0);
  const overdueAmount = invoices.filter(inv => inv.status === 'overdue').reduce((sum, inv) => sum + inv.total, 0);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#0f1419] border border-white/10 rounded-2xl shadow-2xl w-full max-w-7xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                💰 Invoicing & Payments
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                {invoices.length} total invoices
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30">
              <div className="text-green-400 text-sm mb-1 flex items-center gap-2">
                <Check className="w-4 h-4" />
                Total Revenue
              </div>
              <div className="text-2xl font-bold text-green-400">${totalRevenue.toLocaleString()}</div>
            </div>
            <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
              <div className="text-blue-400 text-sm mb-1 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Pending
              </div>
              <div className="text-2xl font-bold text-blue-400">${pendingRevenue.toLocaleString()}</div>
            </div>
            <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/30">
              <div className="text-red-400 text-sm mb-1 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Overdue
              </div>
              <div className="text-2xl font-bold text-red-400">${overdueAmount.toLocaleString()}</div>
            </div>
            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="text-gray-400 text-sm mb-1">Total Invoices</div>
              <div className="text-2xl font-bold text-white">{invoices.length}</div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {[
                { value: 'all', label: 'All' },
                { value: 'draft', label: 'Draft' },
                { value: 'sent', label: 'Sent' },
                { value: 'paid', label: 'Paid' },
                { value: 'overdue', label: 'Overdue' },
              ].map(filter => (
                <button
                  key={filter.value}
                  onClick={() => setFilterStatus(filter.value)}
                  className={`px-4 py-2 rounded-lg text-sm transition-all ${
                    filterStatus === filter.value
                      ? 'bg-teal-500 text-white'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
            <Button className="bg-teal-500 hover:bg-teal-600 text-white">
              <Plus className="w-4 h-4 mr-2" />
              New Invoice
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex">
          {/* Invoice List */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-3">
              {filteredInvoices.map(invoice => (
                <button
                  key={invoice.id}
                  onClick={() => setSelectedInvoice(invoice)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    selectedInvoice?.id === invoice.id
                      ? 'bg-teal-500/20 border-teal-500/50'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-white font-semibold">{invoice.invoiceNumber}</div>
                      <div className="text-gray-400 text-sm">{invoice.client}</div>
                      <div className="text-gray-500 text-xs">{invoice.project}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-bold text-lg">${invoice.total.toLocaleString()}</div>
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium border ${getStatusColor(invoice.status)}`}>
                        {getStatusIcon(invoice.status)}
                        {invoice.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>Issued: {invoice.issueDate.toLocaleDateString()}</span>
                    <span>•</span>
                    <span>Due: {invoice.dueDate.toLocaleDateString()}</span>
                    {invoice.paymentDate && (
                      <>
                        <span>•</span>
                        <span className="text-green-400">Paid: {invoice.paymentDate.toLocaleDateString()}</span>
                      </>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Invoice Details */}
          {selectedInvoice && (
            <div className="w-96 border-l border-white/10 overflow-y-auto p-6 bg-white/5">
              <div className="space-y-6">
                {/* Header */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{selectedInvoice.invoiceNumber}</h3>
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-sm font-medium border ${getStatusColor(selectedInvoice.status)}`}>
                    {getStatusIcon(selectedInvoice.status)}
                    {selectedInvoice.status}
                  </span>
                </div>

                {/* Client Info */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 mb-2">Bill To</h4>
                  <div className="text-white font-medium">{selectedInvoice.client}</div>
                  <div className="text-gray-400 text-sm">{selectedInvoice.project}</div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 mb-1">Issue Date</h4>
                    <div className="text-white">{selectedInvoice.issueDate.toLocaleDateString()}</div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 mb-1">Due Date</h4>
                    <div className="text-white">{selectedInvoice.dueDate.toLocaleDateString()}</div>
                  </div>
                </div>

                {/* Line Items */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 mb-3">Line Items</h4>
                  <div className="space-y-3">
                    {selectedInvoice.items.map((item, idx) => (
                      <div key={idx} className="p-3 bg-white/5 rounded-lg">
                        <div className="text-white font-medium mb-1">{item.description}</div>
                        <div className="flex justify-between text-sm text-gray-400">
                          <span>{item.quantity} × ${item.rate.toFixed(2)}</span>
                          <span className="text-white font-medium">${item.amount.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Totals */}
                <div className="pt-4 border-t border-white/10">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-gray-400">
                      <span>Subtotal</span>
                      <span>${selectedInvoice.subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Tax (9%)</span>
                      <span>${selectedInvoice.tax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-white pt-2 border-t border-white/10">
                      <span>Total</span>
                      <span>${selectedInvoice.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                {selectedInvoice.notes && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 mb-2">Notes</h4>
                    <p className="text-gray-300 text-sm">{selectedInvoice.notes}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="space-y-2 pt-4">
                  <Button className="w-full bg-teal-500 hover:bg-teal-600 text-white">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview Invoice
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                  {selectedInvoice.status === 'draft' && (
                    <Button variant="outline" className="w-full">
                      <Send className="w-4 h-4 mr-2" />
                      Send to Client
                    </Button>
                  )}
                  {selectedInvoice.status === 'sent' && (
                    <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                      <Check className="w-4 h-4 mr-2" />
                      Mark as Paid
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

