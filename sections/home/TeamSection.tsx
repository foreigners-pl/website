'use client';

import Image from 'next/image';
import Container from '@/components/layout/Container';
import { FadeIn } from '@/components/ui/animated';

const team = [
  {
    name: 'Marcel',
    role: 'Head of Legal Operations',
    photo: '/team/marcel.png',
    bg: 'bg-blue-100',
    objectPosition: 'object-top',
    zoom: true,
  },
  {
    name: 'Sarvan',
    role: 'Head of Marketing & Internal Operations',
    photo: '/team/sarvan.png',
    bg: 'bg-pink-100',
    objectPosition: 'object-top',
    zoom: true,
  },
  {
    name: 'Bismark',
    role: 'Head of Customer Success & Finance',
    photo: '/team/bismark.png',
    bg: 'bg-red-100',
    objectPosition: 'object-top',
    zoom: true,
  },
  {
    name: 'Damjan',
    role: 'Head of Technology & Staffing',
    photo: '/team/damjan.png',
    bg: 'bg-green-100',
    objectPosition: 'object-center',
  },
];

export default function TeamSection() {
  return (
    <>
      <section id="about-us">
        <Container className="pt-16">
        <FadeIn direction="up">
          <div className="text-left mb-6">
            <h3 className="font-display text-2xl md:text-3xl font-semibold text-gray-900">
              The <span className="text-primary italic">leadership</span> behind your case
            </h3>
          </div>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-10">
          {team.map((member, i) => (
            <FadeIn key={member.name} direction="up" delay={i * 0.1}>
              <div className="flex flex-col">
                {/* Photo card */}
                <div className={`relative rounded-lg overflow-hidden aspect-[3/4] ${member.bg}`}>
                  <div className={`absolute inset-0 ${member.zoom ? 'scale-[1.2]' : ''} ${member.name === 'Marcel' ? 'origin-[50%_25%]' : member.zoom ? 'origin-top' : ''}`}>
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      className={`object-cover ${member.objectPosition}`}
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                </div>
                {/* Info */}
                <div className="mt-3 px-1">
                  <p className="font-display text-base font-semibold text-gray-900">{member.name}</p>
                  <p className="text-xs font-semibold text-primary uppercase tracking-widest mt-0.5">{member.role}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn direction="up" delay={0.2}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-16">
            <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm">
              <p className="font-display text-[42px] leading-none text-gray-900 mb-2">15+</p>
              <div className="w-8 h-px bg-primary/30 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Team members</p>
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm">
              <p className="font-display text-[42px] leading-none text-gray-900 mb-2">30+</p>
              <div className="w-8 h-px bg-primary/30 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Services</p>
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm">
              <p className="font-display text-[42px] leading-none text-gray-900 mb-2">3,000+</p>
              <div className="w-8 h-px bg-primary/30 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Foreigners trusted us</p>
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm">
              <p className="font-display text-[42px] leading-none text-gray-900 mb-2">100%</p>
              <div className="w-8 h-px bg-primary/30 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Dedication</p>
            </div>
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={0.3}>
          <div className="max-w-3xl mx-auto text-center pb-16">
            <p className="text-body-large text-gray-600 leading-relaxed">
              FOREIGNERS.pl started with a simple frustration: navigating Polish immigration as a foreigner 
              feels impossible when you do not speak the language or know the system. We lived that. 
              But we also knew the most important thing — you need a local expert in your corner. 
              That is why we partnered with seasoned Polish legal professionals and government-process specialists 
              who understand every regulation, every office, and every workaround. Today, our team combines 
              first-hand foreigner experience with deep Polish expertise to handle your case the right way.
            </p>
          </div>
        </FadeIn>
        </Container>
      </section>
    </>
  );
}
