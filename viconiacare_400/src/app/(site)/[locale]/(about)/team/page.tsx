'use client'

import { useEffect, useRef } from 'react'
import { Heart, Award, Link } from 'lucide-react'

const team = [
  {
    name: 'Sandra Meier',
    role: 'Pflegedienstleitung',
    qualification: 'Examinierte Pflegefachkraft, PDL-Zertifikat',
    bio: '15 Jahre Erfahrung in der ambulanten Pflege. Leidenschaft für qualitative, menschliche Pflege.',
    expertise: ['Pflegemanagement', 'Qualitätssicherung', 'Teamführung'],
    initial: 'SM',
    colorFrom: 'from-teal-600',
    colorTo: 'to-teal-800',
  },
  {
    name: 'Thomas Becker',
    role: 'Pflegefachkraft',
    qualification: 'Examinierter Altenpfleger',
    bio: 'Spezialist für Behandlungspflege und Wundversorgung. Zertifiziert in Palliativpflege.',
    expertise: ['Behandlungspflege', 'Wundversorgung', 'Palliativpflege'],
    initial: 'TB',
    colorFrom: 'from-yellow-500',
    colorTo: 'to-yellow-700',
  },
  {
    name: 'Ana Kovačević',
    role: 'Pflegefachkraft',
    qualification: 'Examinierte Krankenpflegerin',
    bio: 'Erfahren in der Demenzbegleitung und aktivierenden Pflege älterer Menschen.',
    expertise: ['Demenzpflege', 'Aktivierung', 'Grundpflege'],
    initial: 'AK',
    colorFrom: 'from-teal-500',
    colorTo: 'to-yellow-600',
  },
  {
    name: 'Klaus Hartmann',
    role: 'Pflegeassistent',
    qualification: 'Pflegehelferkurs, Aufbauqualifikation',
    bio: 'Herzlicher Begleiter im Alltag. Schwerpunkt Hauswirtschaft und soziale Betreuung.',
    expertise: ['Hauswirtschaft', 'Alltagsbegleitung', 'Einkaufshilfe'],
    initial: 'KH',
    colorFrom: 'from-yellow-600',
    colorTo: 'to-teal-600',
  },
]

export default function TeamSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const initGSAP = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      gsap.from(sectionRef.current?.querySelectorAll('.team-card') ?? [], {
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      })
    }
    initGSAP()
  }, [])

  return (
    <section id="team" ref={sectionRef} className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 border border-teal-200 rounded-full text-teal-700 text-sm font-medium mb-4">
            <Heart className="w-4 h-4 fill-teal-500 text-teal-500" />
            Unser Team
          </div>
          <h2 className="section-heading mb-4">
            Menschen,{' '}
            <span className="text-gradient">denen Sie vertrauen können</span>
          </h2>
          <p className="section-subheading">
            Unser erfahrenes Team aus examinierten Pflegefachkräften steht täglich für Sie ein –
            mit Herz, Kompetenz und persönlichem Engagement.
          </p>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member) => (
            <div
              key={member.name}
              className="team-card group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-1"
            >
              {/* Avatar / Image area */}
              <div className={`h-36 bg-linear-to-br ${member.colorFrom} ${member.colorTo} flex items-center justify-center relative overflow-hidden`}>
                <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center text-white text-2xl font-bold border-2 border-white/30">
                  {member.initial}
                </div>
                {/* Award badge */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                  <Award className="w-4 h-4 text-white" />
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-bold text-gray-900 text-lg">{member.name}</h3>
                <p className="text-teal-600 font-medium text-sm mb-1">{member.role}</p>
                <p className="text-xs text-gray-500 mb-3">{member.qualification}</p>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{member.bio}</p>

                {/* Expertise tags */}
                <div className="flex flex-wrap gap-1.5">
                  {member.expertise.map((skill) => (
                    <span key={skill} className="text-xs px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Careers CTA */}
        <div className="mt-16 text-center bg-linear-to-r from-teal-700 to-teal-900 rounded-3xl p-12 text-white">
          <h3 className="text-2xl font-bold mb-3">Werden Sie Teil des ViconiaCare-Teams</h3>
          <p className="text-teal-100 mb-6 max-w-xl mx-auto">
            Wir suchen engagierte Pflegefachkräfte, die mit Leidenschaft und Professionalität
            einen Unterschied im Leben unserer Patienten machen wollen.
          </p>
          <Link href="/karriere" className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold rounded-xl transition-colors">
            Offene Stellen ansehen
          </Link>
        </div>
      </div>
    </section>
  )
}
