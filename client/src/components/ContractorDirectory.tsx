import { Search, Star, MapPin, DollarSign, Clock, CheckCircle, Phone, Mail, Globe, Award, Shield, X, Filter } from "lucide-react";
import { useState } from "react";
import { contractors, Contractor } from "@/lib/contractorData";
import { Button } from "@/components/ui/button";

interface ContractorDirectoryProps {
  onClose: () => void;
  onSelectContractor?: (contractor: Contractor) => void;
}

export default function ContractorDirectory({ onClose, onSelectContractor }: ContractorDirectoryProps) {
  const [search, setSearch] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>("all");
  const [selectedTier, setSelectedTier] = useState<string>("all");
  const [selectedAvailability, setSelectedAvailability] = useState<string>("all");
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedContractor, setSelectedContractor] = useState<Contractor | null>(null);

  // Get all unique specializations
  const allSpecializations = Array.from(
    new Set(contractors.flatMap((c) => c.specializations))
  ).sort();

  // Filter contractors
  const filteredContractors = contractors.filter((contractor) => {
    const matchesSearch =
      search === "" ||
      contractor.name.toLowerCase().includes(search.toLowerCase()) ||
      contractor.company.toLowerCase().includes(search.toLowerCase()) ||
      contractor.specializations.some((s) => s.toLowerCase().includes(search.toLowerCase()));

    const matchesSpecialization =
      selectedSpecialization === "all" ||
      contractor.specializations.includes(selectedSpecialization);

    const matchesTier =
      selectedTier === "all" || contractor.pricing.tier === selectedTier;

    const matchesAvailability =
      selectedAvailability === "all" || contractor.availability === selectedAvailability;

    const matchesRating = contractor.rating >= minRating;

    return matchesSearch && matchesSpecialization && matchesTier && matchesAvailability && matchesRating;
  });

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'budget': return 'text-green-400';
      case 'mid-range': return 'text-yellow-400';
      case 'premium': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'bg-green-500';
      case 'limited': return 'bg-yellow-500';
      case 'booked': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#0f1419] border border-white/10 rounded-2xl shadow-2xl w-full max-w-7xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                👷 Contractor Directory
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                {filteredContractors.length} contractors available
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Search and Filters */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, company, or specialization..."
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-teal-500/50"
              />
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <Filter className={`w-5 h-5 ${showFilters ? 'text-teal-400' : 'text-gray-400'}`} />
              </button>
            </div>

            {showFilters && (
              <div className="grid grid-cols-4 gap-3 p-4 bg-white/5 rounded-lg border border-white/10">
                <div>
                  <label className="text-xs text-gray-400 mb-2 block">Specialization</label>
                  <select
                    value={selectedSpecialization}
                    onChange={(e) => setSelectedSpecialization(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-teal-500/50"
                  >
                    <option value="all">All</option>
                    {allSpecializations.map((spec) => (
                      <option key={spec} value={spec}>{spec}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-2 block">Price Tier</label>
                  <select
                    value={selectedTier}
                    onChange={(e) => setSelectedTier(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-teal-500/50"
                  >
                    <option value="all">All</option>
                    <option value="budget">Budget</option>
                    <option value="mid-range">Mid-Range</option>
                    <option value="premium">Premium</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-2 block">Availability</label>
                  <select
                    value={selectedAvailability}
                    onChange={(e) => setSelectedAvailability(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-teal-500/50"
                  >
                    <option value="all">All</option>
                    <option value="available">Available</option>
                    <option value="limited">Limited</option>
                    <option value="booked">Booked</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-2 block">Min Rating</label>
                  <select
                    value={minRating}
                    onChange={(e) => setMinRating(Number(e.target.value))}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-teal-500/50"
                  >
                    <option value={0}>Any</option>
                    <option value={4.5}>4.5+</option>
                    <option value={4.7}>4.7+</option>
                    <option value={4.9}>4.9+</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex">
          {/* Contractor List */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredContractors.map((contractor) => (
                <button
                  key={contractor.id}
                  onClick={() => setSelectedContractor(contractor)}
                  className={`text-left p-4 rounded-xl border transition-all ${
                    selectedContractor?.id === contractor.id
                      ? 'bg-teal-500/20 border-teal-500/50'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-white font-semibold">{contractor.name}</h3>
                        {contractor.verified && (
                          <CheckCircle className="w-4 h-4 text-teal-400" />
                        )}
                      </div>
                      <p className="text-gray-400 text-sm">{contractor.company}</p>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${getAvailabilityColor(contractor.availability)}`} />
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-white text-sm font-medium">{contractor.rating}</span>
                      <span className="text-gray-500 text-xs">({contractor.reviewCount})</span>
                    </div>
                    <span className="text-gray-600">•</span>
                    <span className="text-gray-400 text-xs">{contractor.yearsExperience} years</span>
                    <span className="text-gray-600">•</span>
                    <span className={`text-xs font-medium ${getTierColor(contractor.pricing.tier)}`}>
                      {contractor.pricing.tier}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {contractor.specializations.slice(0, 3).map((spec) => (
                      <span
                        key={spec}
                        className="px-2 py-1 bg-white/10 text-gray-300 text-xs rounded"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{contractor.location.city}, {contractor.location.state}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{contractor.responseTime}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Contractor Details */}
          {selectedContractor && (
            <div className="w-96 border-l border-white/10 overflow-y-auto p-6 bg-white/5">
              <div className="space-y-6">
                {/* Header */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold text-white">{selectedContractor.name}</h3>
                    {selectedContractor.verified && (
                      <CheckCircle className="w-5 h-5 text-teal-400" />
                    )}
                  </div>
                  <p className="text-gray-400">{selectedContractor.company}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      <span className="text-white font-semibold">{selectedContractor.rating}</span>
                      <span className="text-gray-500 text-sm">({selectedContractor.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>

                {/* Specializations */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 mb-2">Specializations</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedContractor.specializations.map((spec) => (
                      <span
                        key={spec}
                        className="px-3 py-1 bg-teal-500/20 text-teal-400 text-sm rounded-lg"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    Certifications
                  </h4>
                  <div className="space-y-1">
                    {selectedContractor.certifications.map((cert) => (
                      <div key={cert} className="text-sm text-gray-300 flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-green-400" />
                        {cert}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Insurance */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Insurance
                  </h4>
                  <div className="space-y-1 text-sm text-gray-300">
                    <div>Liability: {selectedContractor.insurance.amount}</div>
                    <div>Workers' Comp: {selectedContractor.insurance.workers_comp ? 'Yes' : 'No'}</div>
                  </div>
                </div>

                {/* Pricing */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Pricing
                  </h4>
                  <div className="space-y-1 text-sm text-gray-300">
                    {selectedContractor.pricing.hourlyRate && (
                      <div>Hourly Rate: ${selectedContractor.pricing.hourlyRate}/hr</div>
                    )}
                    {selectedContractor.pricing.projectMinimum && (
                      <div>Project Minimum: ${selectedContractor.pricing.projectMinimum.toLocaleString()}</div>
                    )}
                    <div className={`font-medium ${getTierColor(selectedContractor.pricing.tier)}`}>
                      Tier: {selectedContractor.pricing.tier}
                    </div>
                  </div>
                </div>

                {/* Contact */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 mb-2">Contact</h4>
                  <div className="space-y-2">
                    <a
                      href={`tel:${selectedContractor.contact.phone}`}
                      className="flex items-center gap-2 text-sm text-teal-400 hover:text-teal-300"
                    >
                      <Phone className="w-4 h-4" />
                      {selectedContractor.contact.phone}
                    </a>
                    <a
                      href={`mailto:${selectedContractor.contact.email}`}
                      className="flex items-center gap-2 text-sm text-teal-400 hover:text-teal-300"
                    >
                      <Mail className="w-4 h-4" />
                      {selectedContractor.contact.email}
                    </a>
                    {selectedContractor.contact.website && (
                      <a
                        href={`https://${selectedContractor.contact.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-teal-400 hover:text-teal-300"
                      >
                        <Globe className="w-4 h-4" />
                        {selectedContractor.contact.website}
                      </a>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 mb-2">Performance</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Response Time</span>
                      <span className="text-white">{selectedContractor.responseTime}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Completion Rate</span>
                      <span className="text-white">{selectedContractor.completionRate}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Projects Completed</span>
                      <span className="text-white">{selectedContractor.portfolio.projectCount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Service Radius</span>
                      <span className="text-white">{selectedContractor.location.serviceRadius} miles</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2 pt-4">
                  <Button
                    onClick={() => {
                      onSelectContractor?.(selectedContractor);
                      onClose();
                    }}
                    className="w-full bg-teal-500 hover:bg-teal-600 text-white"
                  >
                    Select Contractor
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                  >
                    Request Quote
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

