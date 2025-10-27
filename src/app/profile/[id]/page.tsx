"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TapeStripList } from "@/components/ui/tape-strip";
import { formatCurrency } from "@/lib/utils";
import { Play, MapPin, Award } from "lucide-react";

interface ProfileData {
  id: string;
  name: string;
  email: string;
  image: string | null;
  role: string;
  profile: {
    id: string;
    headline: string;
    bio: string;
    skills: string[];
    genres: string[];
    hourlyRate: number;
    rushRate: number | null;
    minBlockHours: number;
    instantBook: boolean;
    city: string | null;
    country: string | null;
    credits: Array<{
      id: string;
      title: string;
      role: string;
      year: number | null;
      link: string | null;
    }>;
    samples: Array<{
      id: string;
      title: string;
      url: string;
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

export default function ProfilePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const profileId = params.id as string;
  const highlightSlotId = searchParams.get("slot");

  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, [profileId]);

  const fetchProfile = async () => {
    setLoading(true);
    const response = await fetch(`/api/profiles/${profileId}`);
    const data = await response.json();
    setProfile(data);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-ink/60">Loading profile...</div>
      </div>
    );
  }

  if (!profile || !profile.profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif font-bold mb-4">Profile Not Found</h1>
          <Link href="/browse">
            <Button>Back to Browse</Button>
          </Link>
        </div>
      </div>
    );
  }

  const { profile: engineerProfile } = profile;

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b border-tape/30 bg-paper/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-serif font-bold text-ink">
            FlexSession
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/browse" className="text-sm hover:text-accent transition-colors">
              Browse Engineers
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
        {/* Back Button */}
        <Link href="/browse" className="inline-flex items-center text-sm text-ink/60 hover:text-accent transition-colors mb-6">
          ← Back to Browse
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-5xl font-serif font-bold text-ink mb-3">
                {profile.name}
              </h1>
              <p className="text-xl text-ink/70 mb-4">{engineerProfile.headline}</p>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-ink/60">
                {engineerProfile.city && engineerProfile.country && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {engineerProfile.city}, {engineerProfile.country}
                  </div>
                )}
                <div className="flex gap-2">
                  {engineerProfile.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-sm bg-tape/30 text-ink font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bio */}
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-ink/80 leading-relaxed whitespace-pre-wrap">
                  {engineerProfile.bio}
                </p>
              </CardContent>
            </Card>

            {/* Credits */}
            {engineerProfile.credits.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Credits
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {engineerProfile.credits.map((credit) => (
                      <div key={credit.id} className="border-l-2 border-accent/30 pl-4">
                        <div className="font-semibold text-ink">{credit.title}</div>
                        <div className="text-sm text-ink/60">
                          {credit.role}
                          {credit.year && ` • ${credit.year}`}
                        </div>
                        {credit.link && (
                          <a
                            href={credit.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-accent hover:underline"
                          >
                            View Project →
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Audio Samples */}
            {engineerProfile.samples.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Play className="w-5 h-5" />
                    Audio Samples
                  </CardTitle>
                  <CardDescription>
                    Listen to previous work
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {engineerProfile.samples.map((sample) => (
                      <div key={sample.id} className="p-4 rounded-lg bg-tape/10 border border-tape/30">
                        <div className="font-medium text-ink mb-2">{sample.title}</div>
                        <audio controls className="w-full">
                          <source src={sample.url} type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Rates */}
            <Card>
              <CardHeader>
                <CardTitle>Rates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="text-3xl font-serif font-bold text-accent">
                    {formatCurrency(engineerProfile.hourlyRate)}
                  </div>
                  <div className="text-sm text-ink/60">per hour</div>
                </div>
                {engineerProfile.rushRate && (
                  <div className="pt-3 border-t border-tape/30">
                    <div className="text-xl font-serif font-bold text-ink/70">
                      {formatCurrency(engineerProfile.rushRate)}
                    </div>
                    <div className="text-xs text-ink/60">rush rate (&lt;24 hours)</div>
                  </div>
                )}
                <div className="pt-3 border-t border-tape/30 text-sm text-ink/70">
                  Minimum booking: {engineerProfile.minBlockHours}h
                </div>
              </CardContent>
            </Card>

            {/* Genres */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Genres</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {engineerProfile.genres.map((genre) => (
                    <span
                      key={genre}
                      className="text-xs px-2 py-1 rounded-sm bg-accent/10 text-ink border border-accent/20"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Availability */}
            <Card>
              <CardHeader>
                <CardTitle>Availability</CardTitle>
                <CardDescription>
                  {profile.engineerSlots.length} slots available
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TapeStripList
                  slots={profile.engineerSlots}
                  onSlotClick={(slotId) => {
                    // In a real app, this would open a booking modal or navigate to booking page
                    alert(`Booking flow for slot ${slotId} would open here. Full booking UI coming soon!`);
                  }}
                />
                {profile.engineerSlots.length === 0 && (
                  <p className="text-sm text-ink/60 text-center py-4">
                    No upcoming availability. Check back soon!
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
