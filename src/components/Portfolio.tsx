"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import ContactSection from "./ContactSection";
import React, { Suspense, useRef, useState } from "react";
import Image from "next/image";
import { Canvas, useFrame } from "@react-three/fiber";
import { Mesh, MeshStandardMaterial } from "three";
import Typewriter from "typewriter-effect";
import data from "./data.json"; // Import the JSON data

const { aboutMe, workExperience, projects } = data;

function RotatingCube() {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  const defaultMaterials: MeshStandardMaterial[] = [
    new MeshStandardMaterial({ color: "#b2d8d8" }),
    new MeshStandardMaterial({ color: "#a1c4c4" }),
    new MeshStandardMaterial({ color: "#b3e0e0" }),
    new MeshStandardMaterial({ color: "#c9e2e2" }),
    new MeshStandardMaterial({ color: "#d0f2f2" }),
    new MeshStandardMaterial({ color: "#d9ffff" }),
  ];

  const hoverMaterials: MeshStandardMaterial[] = [
    new MeshStandardMaterial({ color: "#ffcccc" }),
    new MeshStandardMaterial({ color: "#ff9999" }),
    new MeshStandardMaterial({ color: "#ff6666" }),
    new MeshStandardMaterial({ color: "#ff3333" }),
    new MeshStandardMaterial({ color: "#ff0000" }),
    new MeshStandardMaterial({ color: "#cc0000" }),
  ];

  return (
    <mesh
      ref={meshRef}
      position={[0, 0, 0]}
      scale={clicked ? 1.5 : 1}
      onClick={() => setClicked(!clicked)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      material={hovered ? hoverMaterials : defaultMaterials}
    >
      <boxGeometry args={[4, 4, 4]} />
    </mesh>
  );
}

export default function Portfolio() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-sm fixed top-0 left-0 w-full z-50 border-b border-muted/20 px-4 md:px-6 h-14 flex items-center justify-between">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <MountainIcon className="h-6 w-6" />
          <span className="font-medium">Gilles Chen</span>
        </Link>
        <nav className="hidden md:flex items-center gap-4">
          <Link
            href="#about"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            About
          </Link>
          <Link
            href="#experience"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Work Experience
          </Link>
          <Link
            href="#projects"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Projects and Research
          </Link>
          <Link
            href="#contact"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Contact
          </Link>
        </nav>
        <Button variant="outline" size="sm" className="md:hidden">
          <MenuIcon className="h-5 w-5" />
        </Button>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section id="hero" className="w-full py-12 md:py-24 lg:py-32 bg-[#F5F3EE]">
          <div className="container grid grid-cols-1 md:grid-cols-[70%_30%] gap-8 px-4 md:px-6">
            {/* Left side: About me section */}
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Hello, I am{" "}
                  <span className="inline-block">
                    <Typewriter
                      options={{
                        strings: ["Gilles Chen"],
                        autoStart: true,
                        loop: true,
                        delay: 75,
                        cursor: "_",
                      }}
                    />
                  </span>
                </h1>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Explore my skills, experience, and academic work.
                  <br />
                  (The cube does not do much.)
                </p>
              </div>
            </div>

            {/* Right side: Cube section */}
            <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px]">
              <div className="flex justify-center items-center h-full">
                <Canvas
                  style={{ width: "100%", height: "100%" }}
                  camera={{ position: [0, 0, 10] }}
                >
                  {/* Lighting */}
                  <ambientLight intensity={0.5} />
                  <spotLight
                    position={[10, 10, 10]}
                    angle={0.15}
                    penumbra={0.5}
                  />

                  {/* 3D Rotating Cube */}
                  <Suspense fallback={<div>Loading...</div>}>
                    <RotatingCube />
                  </Suspense>
                </Canvas>
              </div>
            </div>
          </div>
        </section>

        {/* About Me Section */}
        <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  {aboutMe.title}
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {aboutMe.description}
                </p>
                <div className="grid gap-4">
                  <div className="bg-background p-4 rounded-lg shadow-sm">
                    <h3 className="text-xl font-bold">Skills</h3>
                    <p className="text-muted-foreground">
                      {aboutMe.skills.join(", ")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Education
                </h2>

                {aboutMe.education.map((edu, index) => (
                  <div key={index} className="bg-background p-6 rounded-lg shadow-lg">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="text-lg font-semibold">{edu.degree}</p>
                          <p className="text-muted-foreground text-sm">
                            {edu.university}
                          </p>
                          <p className="text-muted-foreground text-sm">
                            Grade: {edu.grade}
                          </p>
                          <p className="text-muted-foreground text-sm">{edu.year}</p>
                          {edu.specialization && (
                            <p className="text-sm font-semibold text-white bg-primary rounded-full px-3 py-1 inline-block mt-2">
                              {edu.specialization}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Work Experience Section */}
        <section id="experience" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Work Experience
              </h2>
            </div>
            <div className="grid gap-6 mt-8">
              {workExperience.map((job, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <Image
                        src={job.logo}
                        width={48}
                        height={48}
                        alt={`${job.company} Logo`}
                        className="rounded-md"
                        style={{ aspectRatio: "48/48", objectFit: "cover" }}
                      />
                      <div>
                        <h3 className="text-xl font-bold">{job.title}</h3>
                        <p className="text-muted-foreground">
                          {job.company} | {job.year}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{job.description}</p>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      {job.technologies && (
                        <div className="bg-background p-4 rounded-lg shadow-sm">
                          <h4 className="text-lg font-bold">Technologies</h4>
                          <p className="text-muted-foreground">
                            {job.technologies.join(", ")}
                          </p>
                        </div>
                      )}
                      {job.achievements && (
                        <div className="bg-background p-4 rounded-lg shadow-sm">
                          <h4 className="text-lg font-bold">Achievements</h4>
                          <p className="text-muted-foreground">{job.achievements}</p>
                        </div>
                      )}
                      {job.topics && (
                        <div className="bg-background p-4 rounded-lg shadow-sm">
                          <h4 className="text-lg font-bold">Topics Handled</h4>
                          <p className="text-muted-foreground">
                            {job.topics.join(", ")}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Academic Projects and Research
              </h2>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                This section showcases a collection of scientific documents, research papers, and academic projects I developed during my time at university. Though unpublished, these works reflect my commitment to exploring various topics in Computer Science, demonstrating the skills and knowledge I gained throughout my academic journey.
              </p>
            </div>

            <div className="grid gap-6 mt-8 grid-cols-1 md:grid-cols-2">
              {projects.map((project, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <div className="flex items-center gap-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-1">
                          {project.title}
                        </h3>
                        <p className="text-sm text-red-500 font-medium">
                          {project.type}
                        </p>
                        <p className="text-sm text-blue-500 font-medium">
                          {project.year}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-gray-600 leading-relaxed max-w-prose">
                      {project.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact">
          <ContactSection />
        </section>
      </main>
    </div>
  );
}

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function MountainIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
