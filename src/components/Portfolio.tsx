"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import React, { Suspense, useRef, useState } from "react";
import Image from "next/image";
import { Canvas, useFrame } from "@react-three/fiber";
import { Mesh, MeshStandardMaterial } from "three"; // Import types and classes from three.js
import Typewriter from "typewriter-effect";

function RotatingCube() {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Rotate the cube on each frame
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  // Subtle color differences for each face when not hovered
  const defaultMaterials: MeshStandardMaterial[] = [
    new MeshStandardMaterial({ color: "#b2d8d8" }), // Light cyan
    new MeshStandardMaterial({ color: "#a1c4c4" }), // Subtle green-blue
    new MeshStandardMaterial({ color: "#b3e0e0" }), // Light teal
    new MeshStandardMaterial({ color: "#c9e2e2" }), // Very light blue
    new MeshStandardMaterial({ color: "#d0f2f2" }), // Very pale teal
    new MeshStandardMaterial({ color: "#d9ffff" }), // Subtle pale blue
  ];

  // Colors for when the cube is hovered
  const hoverMaterials: MeshStandardMaterial[] = [
    new MeshStandardMaterial({ color: "#ffcccc" }), // Subtle red
    new MeshStandardMaterial({ color: "#ff9999" }), // Light red
    new MeshStandardMaterial({ color: "#ff6666" }), // Soft pink
    new MeshStandardMaterial({ color: "#ff3333" }), // Coral
    new MeshStandardMaterial({ color: "#ff0000" }), // Red
    new MeshStandardMaterial({ color: "#cc0000" }), // Darker red
  ];

  return (
    <mesh
      ref={meshRef}
      position={[0, 0, 0]}
      scale={clicked ? 1.5 : 1} // Scale up when clicked
      onClick={() => setClicked(!clicked)} // Toggle scale when clicked
      onPointerOver={() => setHovered(true)} // Change color on hover
      onPointerOut={() => setHovered(false)} // Reset color on hover out
      material={hovered ? hoverMaterials : defaultMaterials} // Apply hover materials if hovered
    >
      <boxGeometry args={[4, 4, 4]} />
    </mesh>
  );
}

export default function Portfolio() {
  // State to manage showing the iframe for the first project
  const [showIframe, setShowIframe] = useState(false);

  // Function to toggle the iframe visibility
  const handleReadMoreClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault(); // Prevents the default anchor tag behavior
    setShowIframe(!showIframe); // Toggles the iframe state
  };

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="bg-background/80 backdrop-blur-sm fixed top-0 left-0 w-full z-50 border-b border-muted/20 px-4 md:px-6 h-14 flex items-center justify-between">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <MountainIcon className="h-6 w-6" />
          <span className="font-medium">Gilles Chen</span>
        </Link>
        <nav className="hidden md:flex items-center gap-4">
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            About
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Experience
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Publications
          </Link>
          <Link
            href="#"
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
      <main className="flex-1">
        <section
          id="hero"
          className="w-full py-12 md:py-24 lg:py-32 bg-[#F5F3EE]"
        >
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
                </p>
              </div>
              {/* <div className="flex flex-col gap-2">
                <Link
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Contact Me
                </Link>
              </div> */}
            </div>

            {/* Right side: Cube section */}
            <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px]">
              <div className="flex justify-center items-center h-full">
                <Canvas
                  style={{ width: "100%", height: "100%" }}
                  camera={{ position: [0, 0, 10] }} // Adjust the camera for better view
                >
                  {/* Lighting */}
                  <ambientLight intensity={0.5} />
                  <spotLight
                    position={[10, 10, 10]}
                    angle={0.15}
                    penumbra={0.5} // Soften light edges, no shadow
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
        <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  About Me
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Coming soon
                </p>
                <div className="grid grid-cols gap-4">
                  <div className="bg-background p-4 rounded-lg shadow-sm">
                    <h3 className="text-xl font-bold">Skills</h3>
                    <p className="text-muted-foreground">
                      Python, Extract Transform Load (ETL), Prompt Engineering,
                      JavaScript, React, WordPress, Elementor, PHP, SQL, ...
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Education
                </h2>

                <div className="bg-background p-6 rounded-lg shadow-lg">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-lg font-semibold">
                          Master&#39;s Degree in Information and Computer
                          Sciences
                        </p>
                        <p className="text-muted-foreground text-sm">
                          University of Luxembourg
                        </p>
                        <p className="text-muted-foreground text-sm">
                          Grade: 16.6/20
                        </p>
                        <p className="text-muted-foreground text-sm">
                          2022 - 2024
                        </p>
                        {/* Profile Section as a Badge */}
                        <p className="text-sm font-semibold text-white bg-primary rounded-full px-3 py-1 inline-block mt-2">
                          Specialized in Machine Learning and Artificial
                          Intelligence
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <div className="bg-background p-6 rounded-lg shadow-lg">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="text-lg font-semibold">
                            Bachelor&#39;s Degree in Computer Science
                          </p>
                          <p className="text-muted-foreground text-sm">
                            Grade: 16.9/20
                          </p>
                          <p className="text-muted-foreground text-sm">
                            2019 - 2022
                          </p>
                          <p className="text-muted-foreground text-sm">
                            University of Luxembourg
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="experience" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Work Experience
              </h2>
            </div>
            <div className="grid gap-6 mt-8">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Image
                      src="/Post_Luxembourg_logo.png"
                      width={48}
                      height={48}
                      alt="Company Logo"
                      className="rounded-md"
                      style={{ aspectRatio: "48/48", objectFit: "cover" }}
                    />
                    <div>
                      <h3 className="text-xl font-bold">
                        Software Engineer Internship
                      </h3>
                      <p className="text-muted-foreground">
                        POST Luxembourg | 2022
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    As a Software Engineer at POST for an Internship during my
                    final Bachelor Semester, I was responsible for developing an
                    application to track the daily changes in the network
                    components stock. This involved many moving parts, as it was
                    important to integrate this application within the
                    sophisticated system at POST. This involved the parsing of
                    stock information exports, displaying the current and past
                    stock and implementing an alarming system based on dynamic
                    thresholds that can be overriden by the user.
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="bg-background p-4 rounded-lg shadow-sm">
                      <h4 className="text-lg font-bold">Technologies</h4>
                      <p className="text-muted-foreground">
                        PostgreSQL, influxdb, LIT Web Components, FastAPI,
                        Extract-Transform-Load (ETL), Python , TiG Stack
                        (Telegraf, influxdb, Grafana), Icinga
                      </p>
                    </div>
                    <div className="bg-background p-4 rounded-lg shadow-sm">
                      <h4 className="text-lg font-bold">Achievements</h4>
                      <p className="text-muted-foreground">
                        An application that effectively displays the past and
                        current status of the stock and updates daily, including
                        an alarming system with dynamic thresholds that can be
                        changed by the user.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Image
                      src="/Uni-Logo-1.png"
                      width={48}
                      height={48}
                      alt="Company Logo"
                      className="rounded-md"
                      style={{ aspectRatio: "48/48", objectFit: "cover" }}
                    />
                    <div>
                      <h3 className="text-xl font-bold">Peer Tutor</h3>
                      <p className="text-muted-foreground">
                        University of Luxembourg | 2020 - 2021
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    As a Peer Tutor at the University of Luxembourg for 1st and
                    2nd Semester Students, I held weekly 90-minute tutoring
                    sessions, where participating students were free to ask any
                    questions they had related to their studies. If there were
                    no questions, the tutoring sessions would focus on the
                    subjects that the students needed help in the most, which
                    was Java Programming for Semester 1 Students and Algorithms
                    for Semester 2 Students. Exercises and Explanations were
                    prepared prior to every tutoring session.
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="bg-background p-4 rounded-lg shadow-sm">
                      <h4 className="text-lg font-bold">Topics Handled</h4>
                      <p className="text-muted-foreground">
                        Java Programming, Algorithms
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section
          id="publications"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted"
        >
          <div className="container px-4 md:px-6">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Academic Projects and Research
              </h2>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                This section showcases a collection of scientific documents,
                research papers, and academic projects I developed during my
                time at university. Though unpublished, these works reflect my
                commitment to exploring various topics in Computer Science,
                demonstrating the skills and knowledge I gained throughout my
                academic journey.
              </p>
            </div>

            {/* Adjusting the grid layout for two columns */}
            <div className="grid gap-6 mt-8 grid-cols-1 md:grid-cols-2">
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <div className="flex items-center gap-4">
                    <div className="text-blue-600">
                      {/* Add an icon here, e.g., <DocumentIcon className="w-8 h-8" /> */}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-1">
                        A Comprehensive Framework for AI-Driven Multiple-Choice
                        Question Generation
                      </h3>
                      <p className="text-sm text-red-500 font-medium">
                        Master&apos;s Thesis
                      </p>
                      <p className="text-sm text-blue-500 font-medium">2024</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
              <p className="text-gray-600 leading-relaxed max-w-prose">
                This project introduces an automated framework that generates high-quality multiple-choice
                questions (MCQs) using the large language model GPT-4o, focusing on minimizing common writing
                flaws. The framework is designed to create MCQs aligned with the first three cognitive levels of
                Bloom&apos;s Taxonomy: Remembering, Understanding, and Applying.
              </p>

              {/* Conditionally render the iframe based on the showIframe state */}
              {showIframe && (
                <div className="mt-4">
                  <iframe
                    src="/Masters_Thesis.pdf" // Replace with your actual PDF path
                    width="100%"
                    height="600px"
                    style={{ border: 'none' }}
                  >
                    Your browser doesn&apos;t support embedded PDFs. You can{' '}
                    <a href="/Masters_Thesis.pdf">download the PDF</a> instead.
                  </iframe>
                </div>
              )}

              {/* "Read more" link to toggle the iframe */}
              <a
                href="#"
                onClick={handleReadMoreClick} // Toggle iframe visibility
                className="text-blue-600 hover:underline mt-4 inline-block"
              >
                {showIframe ? 'Hide Document' : 'View Document'}
              </a>
            </CardContent>
          </Card>

              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <div className="flex items-center gap-4">
                    <div className="text-blue-600">
                      {/* Add an icon here, e.g., <DocumentIcon className="w-8 h-8" /> */}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-1">
                        Improving the Network Components Stock Management at
                        POST
                      </h3>
                      <p className="text-sm text-red-500 font-medium">
                        Bachelor&apos;s Thesis
                      </p>
                      <p className="text-sm text-blue-500 font-medium">2022</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-gray-600 leading-relaxed max-w-prose">
                    This project focuses on developing a solution to streamline
                    the manual processes involved in managing network component
                    stock for large companies. The current workflow requires
                    significant manual intervention, which is time-consuming and
                    inefficient. The new application aims to automate much of
                    the stock management process, simplifying the workflow for
                    current and future users. The project includes a detailed
                    analysis of the current system, an exploration of the
                    technologies used, and a modeling of the application&apos;s
                    use cases and workflows. Thorough testing and the
                    implementation of GitLab pipelines ensured the final
                    product&apos;s code quality and reliability, offering a
                    modern solution to a legacy problem.
                  </p>
                </CardContent>
              </Card>

              {/* Add more <Card> components as needed */}
            </div>
          </div>
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
      viewBox="0 0 24 24"
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
      viewBox="0 0 24 24"
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
