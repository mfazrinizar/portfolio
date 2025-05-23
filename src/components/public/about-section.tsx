import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Linkedin, MapPin, Award, Briefcase, ArrowRight } from 'lucide-react';
import { skills, experiences, iconMap } from '@/lib/constants';

export default function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            About Me
          </h2>
          <p className="mt-3 text-lg text-muted-foreground md:text-xl">
            Get to know the person behind the engineering.
          </p>
        </div>
        <div className="grid gap-12 md:grid-cols-3">
          <div className="md:col-span-1">
            <Card className="overflow-hidden shadow-xl">
              <CardContent className="p-0">
                <Image
                  src="/images/profile.png"
                  alt="M. Fazri Nizar - Profile Picture"
                  width={400}
                  height={600}
                  className="w-full object-cover"
                  data-ai-hint="professional portrait"
                />
              </CardContent>
            </Card>
            <div className="mt-6 space-y-3 text-sm text-muted-foreground">
              <p className="flex items-center"><MapPin size={16} className="mr-2 text-primary" /> Based in South Sumatera, Indonesia</p>
              <p className="flex items-center"><Mail size={16} className="mr-2 text-primary" /> <a href="mailto:mfazrinizar@gmail.com" className="hover:text-primary">mfazrinizar@gmail.com</a></p>
              <p className="flex items-center"><Linkedin size={16} className="mr-2 text-primary" /> <a href="#" className="hover:text-primary">https://linkedin.com/in/mfazrinizar</a></p>
            </div>
            <Button className="mt-6 w-full" size="lg" asChild>
              <Link href="https://www.linkedin.com/in/mfazrinizar/details/projects/" target="_blank">
                 View My Complete Projects <ArrowRight size={18} className="mr-2" /> 
              </Link>
            </Button>
          </div>
          <div className="md:col-span-2 space-y-10">
            <section>
              <h3 className="mb-4 text-3xl font-semibold text-foreground">
                Hello, I&apos;m <span className="text-primary">M. Fazri Nizar</span>
              </h3>
              <div className="prose prose-lg max-w-none dark:prose-invert text-foreground/90 space-y-4">
                <p>
                  I am a dedicated and results-oriented <span className="font-semibold text-primary">Software Engineer</span> with <span className="font-semibold">3+ years</span> of professional experience and a passionate <span className="font-semibold text-primary">Research Enthusiast</span>. My passion lies in engineering solutions in form of systems that solve real-world problems.
                </p>
                <p>
                  I thrive in collaborative environments and am always eager to learn new technologies and methodologies to enhance my skill set. When I&apos;m not coding, I enjoy exploring new research topics, collaborating on innovative projects, and keeping up with the latest trends in the tech world.
                </p>
              </div>
            </section>
            <section>
              <h3 className="mb-6 text-2xl font-semibold text-foreground flex items-center"><Award size={24} className="mr-3 text-primary" />My Skills</h3>
              <div className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
                {skills.map((skill) => {
                  const Icon = iconMap[skill.icon as keyof typeof iconMap];
                  return (
                    <div key={skill.name} className="flex items-center space-x-3 rounded-md bg-background p-3 shadow">
                      <span className="text-primary"><Icon size={20} /></span>
                      <span className="text-sm font-medium text-foreground/90">{skill.name}</span>
                    </div>
                  );
                })}
              </div>
            </section>
            <section>
              <h3 className="mb-6 text-2xl font-semibold text-foreground flex items-center"><Briefcase size={24} className="mr-3 text-primary" />Experience</h3>
              <div className="space-y-8 relative border-l-2 border-primary/30 pl-6">
                {experiences.map((exp, index) => {
                  const ExpIcon = iconMap[exp.icon as keyof typeof iconMap];
                  return (
                    <div key={index} className="relative">
                      <div className="absolute -left-[33px] top-1 h-4 w-4 rounded-full bg-primary ring-4 ring-background flex items-center justify-center">
                        <ExpIcon size={16} className="text-background" />
                      </div>
                      <h4 className="text-xl font-semibold text-foreground">{exp.role}</h4>
                      <p className="text-md font-medium text-primary">{exp.company}</p>
                      <p className="text-sm text-muted-foreground mb-2">{exp.duration}</p>
                      <p className="text-foreground/90">{exp.description}</p>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}