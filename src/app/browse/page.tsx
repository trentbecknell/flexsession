"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TapeStripList } from "@/components/ui/tape-strip";
import { formatCurrency } from "@/lib/utils";

interface EngineerProfile {
  id: string;
  name: string;
  image: string | null;
  profile: {
    id: string;
    headline: string;
    skills: string[];
    genres: string[];
    hourlyRate: number;
    rushRate: number | null;
    minBlockHours: number;
    instantBook: boolean;
    city: string | null;
    country: string | null;
    credits: Array<{
      title: string;
      role: string;
      year: number | null;
    }>;
  };
  engineerSlots: Array<{
    id: string;
    start: string;
    end: string;
    taskType: string;
    mode: "INSTANT" | "REQUEST";
  }>;
}

export default function BrowsePage() {
  const [profiles, setProfiles] = useState<EngineerProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    skill: "",
    genre: "",
    rateMax: "",
    availability: "",
  });

  useEffect(() => {
    fetchProfiles();
  }, [filters]);

  const fetchProfiles = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filters.skill) params.append("skill", filters.skill);
    if (filters.genre) params.append("genre", filters.genre);
    if (filters.rateMax) params.append("rateMax", filters.rateMax);
    if (filters.availability) params.append("availability", filters.availability);

    const response = await fetch(`/api/profiles?${params.toString()}`);
    const data = await response.json();
    setProfiles(data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b border-tape/30 bg-paper/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-serif font-bold text-ink">
            FlexSession
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/browse" className="text-sm font-medium text-accent">
              Browse Engineers
            </Link>
            <Link href="/how-it-works" className="text-sm hover:text-accent transition-colors">
              How It Works
            </Link>
            <Link href="/auth/signin">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-serif font-bold text-ink mb-4">
            Browse Engineers
          </h1>
          <p className="text-xl text-ink/70 max-w-2xl mx-auto">
            Find the perfect professional for your next session
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-4 justify-center">
          <select
            className="px-4 py-2 rounded-md border border-tape bg-paper text-ink"
            value={filters.skill}
            onChange={(e) => setFilters({ ...filters, skill: e.target.value })}
          >
            <option value="">All Skills</option>
            <option value="Mixing">Mixing</option>
            <option value="Mastering">Mastering</option>
            <option value="Production">Production</option>
            <option value="Vocal Editing">Vocal Editing</option>
            <option value="Sound Design">Sound Design</option>
          </select>

          <select
            className="px-4 py-2 rounded-md border border-tape bg-paper text-ink"
            value={filters.genre}
            onChange={(e) => setFilters({ ...filters, genre: e.target.value })}
          >
            <option value="">All Genres</option>
            <option value="Hip-Hop">Hip-Hop</option>
            <option value="R&B">R&B</option>
            <option value="Pop">Pop</option>
            <option value="Rock">Rock</option>
            <option value="Electronic">Electronic</option>
            <option value="Jazz">Jazz</option>
            <option value="Country">Country</option>
            <option value="Indie">Indie</option>
          </select>

          <select
            className="px-4 py-2 rounded-md border border-tape bg-paper text-ink"
            value={filters.availability}
            onChange={(e) => setFilters({ ...filters, availability: e.target.value })}
          >
            <option value="">All Availability</option>
            <option value="today">Available Today</option>
            <option value="week">This Week</option>
          </select>

          <select
            className="px-4 py-2 rounded-md border border-tape bg-paper text-ink"
            value={filters.rateMax}
            onChange={(e) => setFilters({ ...filters, rateMax: e.target.value })}
          >
            <option value="">Any Rate</option>
            <option value="10000">Under $100/hr</option>
            <option value="15000">Under $150/hr</option>
            <option value="20000">Under $200/hr</option>
          </select>
        </div>

        {/* Results */}
        {loading ? (
          <div className="text-center py-12">
            <div className="text-ink/60">Loading engineers...</div>
          </div>
        ) : profiles.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-ink/60 mb-4">No engineers found matching your filters</div>
            <Button onClick={() => setFilters({ skill: "", genre: "", rateMax: "", availability: "" })}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {profiles.map((profile) => (
              <Card key={profile.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-2xl mb-2">
                        <Link href={`/profile/${profile.id}`} className="hover:text-accent transition-colors">
                          {profile.name}
                        </Link>
                      </CardTitle>
                      <p className="text-sm text-ink/70 mb-3">{profile.profile?.headline}</p>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {profile.profile?.skills.slice(0, 3).map((skill) => (
                          <span
                            key={skill}
                            className="text-xs px-2 py-1 rounded-sm bg-tape/30 text-ink"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      <div className="text-sm text-ink/60">
                        {profile.profile?.city && profile.profile?.country && (
                          <span>{profile.profile.city}, {profile.profile.country}</span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-serif font-bold text-accent">
                        {formatCurrency(profile.profile?.hourlyRate)}
                      </div>
                      <div className="text-xs text-ink/60">per hour</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold mb-2">Upcoming Availability</h4>
                    <TapeStripList
                      slots={profile.engineerSlots}
                      onSlotClick={(slotId) => {
                        window.location.href = `/profile/${profile.id}?slot=${slotId}`;
                      }}
                    />
                  </div>
                  <Link href={`/profile/${profile.id}`}>
                    <Button className="w-full">View Full Profile</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
