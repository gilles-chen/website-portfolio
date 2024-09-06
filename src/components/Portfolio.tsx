"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import React, { Suspense, useRef, useState } from "react";
import Image from "next/image";
import { Canvas, useFrame } from "@react-three/fiber";
import { Mesh, MeshStandardMaterial, BoxGeometry } from "three"; // Import types and classes from three.js

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

  // Subtle color differences for each face
  const materials: MeshStandardMaterial[] = [
    new MeshStandardMaterial({ color: "#b2d8d8" }), // Light cyan
    new MeshStandardMaterial({ color: "#a1c4c4" }), // Subtle green-blue
    new MeshStandardMaterial({ color: "#b3e0e0" }), // Light teal
    new MeshStandardMaterial({ color: "#c9e2e2" }), // Very light blue
    new MeshStandardMaterial({ color: "#d0f2f2" }), // Very pale teal
    new MeshStandardMaterial({ color: "#d9ffff" }), // Subtle pale blue
  ];

  return (
    <mesh
      ref={meshRef}
      position={[0, 0, 0]}
      scale={clicked ? 1.5 : 1} // Scale up when clicked
      onClick={() => setClicked(!clicked)} // Toggle scale when clicked
      onPointerOver={() => setHovered(true)} // Change color on hover
      onPointerOut={() => setHovered(false)} // Reset color on hover out
      material={materials} // Apply the array of subtle materials
    >
      <boxGeometry args={[4, 4, 4]} />
    </mesh>
  );
}

export default function Portfolio() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="bg-background/80 backdrop-blur-sm fixed top-0 left-0 w-full z-50 border-b border-muted/20 px-4 md:px-6 h-14 flex items-center justify-between">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <MountainIcon className="h-6 w-6" />
          <span className="font-medium">John Doe</span>
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
          <div className="container grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-6">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Welcome to my portfolio
                </h1>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Explore my skills, experience, and published works as a
                  software developer.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Get Started
                </Link>
                <Link
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Contact Me
                </Link>
              </div>
            </div>
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
                  I am a passionate software developer with a strong background
                  in web development, mobile development, and cloud
                  technologies. I have a deep understanding of various
                  programming languages, frameworks, and best practices, and I
                  am always eager to learn and grow.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-background p-4 rounded-lg shadow-sm">
                    <h3 className="text-xl font-bold">Education</h3>
                    <p className="text-muted-foreground">
                      Bachelor&#39;s Degree in Computer Science
                    </p>
                  </div>
                  <div className="bg-background p-4 rounded-lg shadow-sm">
                    <h3 className="text-xl font-bold">Skills</h3>
                    <p className="text-muted-foreground">
                      JavaScript, React, Node.js, TypeScript, AWS, Docker
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  My Journey
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  I have been on an exciting journey in the world of software
                  development, constantly learning and growing. From my early
                  days as a student to my current role as a senior developer, I
                  have had the opportunity to work on a wide range of projects
                  and collaborate with talented teams.
                </p>
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-background p-4 rounded-lg shadow-sm">
                    <h3 className="text-xl font-bold">Education Timeline</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-primary" />
                        <div>
                          <p className="text-sm font-medium">
                            Bachelor&#39;s Degree
                          </p>
                          <p className="text-muted-foreground text-sm">
                            2015 - 2019
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-primary" />
                        <div>
                          <p className="text-sm font-medium">
                            Master&#39;s Degree
                          </p>
                          <p className="text-muted-foreground text-sm">
                            2019 - 2021
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
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                I have had the opportunity to work with a variety of companies
                and teams, each with its own unique challenges and
                opportunities. Here are some of the roles I have held:
              </p>
            </div>
            <div className="grid gap-6 mt-8">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Image
                      src="/placeholder.svg"
                      width={48}
                      height={48}
                      alt="Company Logo"
                      className="rounded-md"
                      style={{ aspectRatio: "48/48", objectFit: "cover" }}
                    />
                    <div>
                      <h3 className="text-xl font-bold">
                        Senior Software Engineer
                      </h3>
                      <p className="text-muted-foreground">
                        Acme Inc. | 2021 - Present
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    As a Senior Software Engineer at Acme Inc., I was
                    responsible for leading the development of a complex web
                    application that served millions of users. I worked closely
                    with the product team to design and implement new features,
                    optimize performance, and ensure the application was secure
                    and scalable.
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="bg-background p-4 rounded-lg shadow-sm">
                      <h4 className="text-lg font-bold">Technologies</h4>
                      <p className="text-muted-foreground">
                        React, Node.js, TypeScript, AWS, Docker
                      </p>
                    </div>
                    <div className="bg-background p-4 rounded-lg shadow-sm">
                      <h4 className="text-lg font-bold">Achievements</h4>
                      <p className="text-muted-foreground">
                        Implemented a new authentication system that increased
                        user security by 30%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Image
                      src="/placeholder.svg"
                      width={48}
                      height={48}
                      alt="Company Logo"
                      className="rounded-md"
                      style={{ aspectRatio: "48/48", objectFit: "cover" }}
                    />
                    <div>
                      <h3 className="text-xl font-bold">Software Engineer</h3>
                      <p className="text-muted-foreground">
                        Globex Inc. | 2019 - 2021
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    As a Software Engineer at Globex Inc., I was responsible for
                    developing and maintaining a mobile application that
                    provided users with real-time data and analytics. I worked
                    closely with the design team to create a user-friendly
                    interface and implemented new features based on user
                    feedback.
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="bg-background p-4 rounded-lg shadow-sm">
                      <h4 className="text-lg font-bold">Technologies</h4>
                      <p className="text-muted-foreground">
                        React Native, TypeScript, Firebase, AWS
                      </p>
                    </div>
                    <div className="bg-background p-4 rounded-lg shadow-sm">
                      <h4 className="text-lg font-bold">Achievements</h4>
                      <p className="text-muted-foreground">
                        Increased user engagement by 25% through the
                        implementation of a new feature
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
                Publications
              </h2>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                In addition to my work as a software developer, I have also had
                the opportunity to share my knowledge and insights through
                various publications.
              </p>
            </div>
            <div className="grid gap-6 mt-8">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Image
                      src="/placeholder.svg"
                      width={100}
                      height={150}
                      alt="Book Cover"
                      className="rounded-md"
                      style={{ aspectRatio: "100/150", objectFit: "cover" }}
                    />
                    <div>
                      <h3 className="text-xl font-bold">Mastering React</h3>
                      <p className="text-muted-foreground">Published in 2022</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    In this book, I provide a comprehensive guide to building
                    complex web applications using React. I cover topics such as
                    state management, performance optimization, and testing, and
                    provide real-world examples and best practices.
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="bg-background p-4 rounded-lg shadow-sm">
                      <h4 className="text-lg font-bold">Publisher</h4>
                      <p className="text-muted-foreground">Packt Publishing</p>
                    </div>
                    <div className="bg-background p-4 rounded-lg shadow-sm">
                      <h4 className="text-lg font-bold">Available on</h4>
                      <p className="text-muted-foreground">
                        Amazon, Barnes & Noble, Google Books
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Image
                      src="/placeholder.svg"
                      width={100}
                      height={150}
                      alt="Book Cover"
                      className="rounded-md"
                      style={{ aspectRatio: "100/150", objectFit: "cover" }}
                    />
                    <div>
                      <h3 className="text-xl font-bold">
                        Serverless Architecture with AWS
                      </h3>
                      <p className="text-muted-foreground">Published in 2021</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    In this book, I explore the benefits and best practices of
                    building serverless applications using AWS services such as
                    Lambda, API Gateway, and DynamoDB. I provide step-by-step
                    guidance on how to design, implement, and deploy serverless
                    solutions.
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="bg-background p-4 rounded-lg shadow-sm">
                      <h4 className="text-lg font-bold">Publisher</h4>
                      <p className="text-muted-foreground">Apress</p>
                    </div>
                    <div className="bg-background p-4 rounded-lg shadow-sm">
                      <h4 className="text-" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function MenuIcon(props) {
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

function MountainIcon(props) {
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
