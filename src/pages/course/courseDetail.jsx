// import { useState, useEffect, useRef } from "react"

// const COURSE_DATA = {
//   1: {
//     title:      "Variables & Data",
//     subtitle:   "Learn how programs store, manage, and manipulate data using variables and data t...",
//     tag:        "Programming",
//     price:      29,
//     duration:   "5h 10min",
//     instructor: { name:"Mr. Kay Keo",       role:"Senior Programming Instructor", img:"/cherkeomentor.jpg" },
//     heroImg:    "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80",
//     previewImg: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&q=80",
//     features:   ["5 hours video","Downloadable resources","Certificate of completion","Lifetime access"],
//     about:      "Learn how programs store, manage, and manipulate data using variables and data types. A must-have foundation for any programming journey. You will master primitive types, variable declaration, type conversion, and memory basics. Each concept is paired with real mini-projects so you build confidence fast.",
//     curriculum: [
//       { week:"Week 1", title:"Foundations",        lessons:["Introduction & setup","Core concepts part 1","Core concepts part 2"] },
//       { week:"Week 2", title:"Building Skills",    lessons:["Hands-on project","Advanced patterns","Real examples"] },
//       { week:"Week 3", title:"Real-World Practice",lessons:["Mini project walkthrough","Code review session","Best practices"] },
//       { week:"Week 4", title:"Final Project",      lessons:["Full project build","Testing & polish","Showcase & next steps"] },
//     ],
//     reviews: [
//       { name:"Alex K.",   rating:5, text:"One of the best courses I have taken. Practical and well explained." },
//       { name:"Mia Chen",  rating:5, text:"I got a job after completing this course. Highly recommend it!" },
//       { name:"Daniel R.", rating:4, text:"Great content and projects. Would love even more real-world case studies." },
//     ],
//   },
//   2: {
//     title:      "Control Flow Basics",
//     subtitle:   "Master if-else statements, switch cases, and loops to make your programs smart a...",
//     tag:        "Programming",
//     price:      29,
//     duration:   "4h 45min",
//     instructor: { name:"Mr. Kay Keo",       role:"Senior Programming Instructor", img:"/cherkeomentor.jpg" },
//     heroImg:    "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&q=80",
//     previewImg: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&q=80",
//     features:   ["4 hours video","Downloadable resources","Certificate of completion","Lifetime access"],
//     about:      "Master if-else statements, switch cases, and loops to make your programs smart and dynamic. Control flow is the backbone of every program. You will write real decision-making logic, nested conditions, and loop patterns used in production code.",
//     curriculum: [
//       { week:"Week 1", title:"Foundations",        lessons:["Introduction & setup","Core concepts part 1","Core concepts part 2"] },
//       { week:"Week 2", title:"Building Skills",    lessons:["Hands-on project","Advanced patterns","Real examples"] },
//       { week:"Week 3", title:"Real-World Practice",lessons:["Mini project walkthrough","Code review session","Best practices"] },
//       { week:"Week 4", title:"Final Project",      lessons:["Full project build","Testing & polish","Showcase & next steps"] },
//     ],
//     reviews: [
//       { name:"Alex K.",   rating:5, text:"One of the best courses I have taken. Practical and well explained." },
//       { name:"Mia Chen",  rating:5, text:"I got a job after completing this course. Highly recommend it!" },
//       { name:"Daniel R.", rating:4, text:"Great content and projects. Would love even more real-world case studies." },
//     ],
//   },
//   3: {
//     title:      "Functions for Basic",
//     subtitle:   "Learn to write reusable blocks of code called functions — the core building bloc...",
//     tag:        "Programming",
//     price:      29,
//     duration:   "5h 00min",
//     instructor: { name:"Mr. Kay Keo",       role:"Senior Programming Instructor", img:"/cherkeomentor.jpg" },
//     heroImg:    "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&q=80",
//     previewImg: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80",
//     features:   ["5 hours video","Downloadable resources","Certificate of completion","Lifetime access"],
//     about:      "Learn to write reusable blocks of code called functions — the core building block of every program. This course demystifies parameters, return values, scope, and recursion. You will refactor messy code into clean, reusable functions step by step.",
//     curriculum: [
//       { week:"Week 1", title:"Foundations",        lessons:["Introduction & setup","Core concepts part 1","Core concepts part 2"] },
//       { week:"Week 2", title:"Building Skills",    lessons:["Hands-on project","Advanced patterns","Real examples"] },
//       { week:"Week 3", title:"Real-World Practice",lessons:["Mini project walkthrough","Code review session","Best practices"] },
//       { week:"Week 4", title:"Final Project",      lessons:["Full project build","Testing & polish","Showcase & next steps"] },
//     ],
//     reviews: [
//       { name:"Alex K.",   rating:5, text:"One of the best courses I have taken. Practical and well explained." },
//       { name:"Mia Chen",  rating:5, text:"I got a job after completing this course. Highly recommend it!" },
//       { name:"Daniel R.", rating:4, text:"Great content and projects. Would love even more real-world case studies." },
//     ],
//   },
//   4: {
//     title:      "Programming Mindset",
//     subtitle:   "Think like a developer — problem decomposition, debugging strategies, and comput...",
//     tag:        "Programming",
//     price:      29,
//     duration:   "3h 30min",
//     instructor: { name:"Mr. Kay Keo",       role:"Senior Programming Instructor", img:"/cherkeomentor.jpg" },
//     heroImg:    "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&q=80",
//     previewImg: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
//     features:   ["3 hours video","Downloadable resources","Certificate of completion","Lifetime access"],
//     about:      "Think like a developer — problem decomposition, debugging strategies, and computational thinking from day one. Great developers think differently. This course trains you to break problems down, read error messages confidently, and approach any coding challenge systematically.",
//     curriculum: [
//       { week:"Week 1", title:"Foundations",        lessons:["Introduction & setup","Core concepts part 1","Core concepts part 2"] },
//       { week:"Week 2", title:"Building Skills",    lessons:["Hands-on project","Advanced patterns","Real examples"] },
//       { week:"Week 3", title:"Real-World Practice",lessons:["Mini project walkthrough","Code review session","Best practices"] },
//       { week:"Week 4", title:"Final Project",      lessons:["Full project build","Testing & polish","Showcase & next steps"] },
//     ],
//     reviews: [
//       { name:"Alex K.",   rating:5, text:"One of the best courses I have taken. Practical and well explained." },
//       { name:"Mia Chen",  rating:5, text:"I got a job after completing this course. Highly recommend it!" },
//       { name:"Daniel R.", rating:4, text:"Great content and projects. Would love even more real-world case studies." },
//     ],
//   },
//   5: {
//     title:      "Hello World Coding",
//     subtitle:   "Write your very first program and understand exactly what happens when code runs...",
//     tag:        "Programming",
//     price:      29,
//     duration:   "3h 00min",
//     instructor: { name:"Mr. Kay Keo",       role:"Senior Programming Instructor", img:"/cherkeomentor.jpg" },
//     heroImg:    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
//     previewImg: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&q=80",
//     features:   ["3 hours video","Downloadable resources","Certificate of completion","Lifetime access"],
//     about:      "Write your very first program and understand exactly what happens when code runs. Start from absolute zero. Install your tools, write Hello World, understand compilers vs interpreters, and run your first real program.",
//     curriculum: [
//       { week:"Week 1", title:"Foundations",        lessons:["Introduction & setup","Core concepts part 1","Core concepts part 2"] },
//       { week:"Week 2", title:"Building Skills",    lessons:["Hands-on project","Advanced patterns","Real examples"] },
//       { week:"Week 3", title:"Real-World Practice",lessons:["Mini project walkthrough","Code review session","Best practices"] },
//       { week:"Week 4", title:"Final Project",      lessons:["Full project build","Testing & polish","Showcase & next steps"] },
//     ],
//     reviews: [
//       { name:"Alex K.",   rating:5, text:"One of the best courses I have taken. Practical and well explained." },
//       { name:"Mia Chen",  rating:5, text:"I got a job after completing this course. Highly recommend it!" },
//       { name:"Daniel R.", rating:4, text:"Great content and projects. Would love even more real-world case studies." },
//     ],
//   },
//   6: {
//     title:      "Loops Made Easy",
//     subtitle:   "Master for, while, and do-while loops to automate repetitive tasks in your progr...",
//     tag:        "Programming",
//     price:      29,
//     duration:   "4h 00min",
//     instructor: { name:"Mr. Kay Keo",       role:"Senior Programming Instructor", img:"/cherkeomentor.jpg" },
//     heroImg:    "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800&q=80",
//     previewImg: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&q=80",
//     features:   ["4 hours video","Downloadable resources","Certificate of completion","Lifetime access"],
//     about:      "Master for, while, and do-while loops to automate repetitive tasks in your programs. Loops are everywhere in real code. You will build pattern printers, number summators, search algorithms, and data processors using every loop type.",
//     curriculum: [
//       { week:"Week 1", title:"Foundations",        lessons:["Introduction & setup","Core concepts part 1","Core concepts part 2"] },
//       { week:"Week 2", title:"Building Skills",    lessons:["Hands-on project","Advanced patterns","Real examples"] },
//       { week:"Week 3", title:"Real-World Practice",lessons:["Mini project walkthrough","Code review session","Best practices"] },
//       { week:"Week 4", title:"Final Project",      lessons:["Full project build","Testing & polish","Showcase & next steps"] },
//     ],
//     reviews: [
//       { name:"Alex K.",   rating:5, text:"One of the best courses I have taken. Practical and well explained." },
//       { name:"Mia Chen",  rating:5, text:"I got a job after completing this course. Highly recommend it!" },
//       { name:"Daniel R.", rating:4, text:"Great content and projects. Would love even more real-world case studies." },
//     ],
//   },
//   7: {
//     title:      "Lists & Arrays Intro",
//     subtitle:   "Store and manage multiple values efficiently using arrays and lists....",
//     tag:        "Programming",
//     price:      29,
//     duration:   "4h 30min",
//     instructor: { name:"Mr. Kay Keo",       role:"Senior Programming Instructor", img:"/cherkeomentor.jpg" },
//     heroImg:    "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80",
//     previewImg: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
//     features:   ["4 hours video","Downloadable resources","Certificate of completion","Lifetime access"],
//     about:      "Store and manage multiple values efficiently using arrays and lists. Arrays and lists power almost every app. You will learn indexing, slicing, sorting, searching, and how to combine loops with arrays for real data processing.",
//     curriculum: [
//       { week:"Week 1", title:"Foundations",        lessons:["Introduction & setup","Core concepts part 1","Core concepts part 2"] },
//       { week:"Week 2", title:"Building Skills",    lessons:["Hands-on project","Advanced patterns","Real examples"] },
//       { week:"Week 3", title:"Real-World Practice",lessons:["Mini project walkthrough","Code review session","Best practices"] },
//       { week:"Week 4", title:"Final Project",      lessons:["Full project build","Testing & polish","Showcase & next steps"] },
//     ],
//     reviews: [
//       { name:"Alex K.",   rating:5, text:"One of the best courses I have taken. Practical and well explained." },
//       { name:"Mia Chen",  rating:5, text:"I got a job after completing this course. Highly recommend it!" },
//       { name:"Daniel R.", rating:4, text:"Great content and projects. Would love even more real-world case studies." },
//     ],
//   },
//   8: {
//     title:      "Coding From Scratch",
//     subtitle:   "A complete beginner's coding journey — from zero knowledge to writing your first...",
//     tag:        "Programming",
//     price:      29,
//     duration:   "6h 00min",
//     instructor: { name:"Mr. Kay Keo",       role:"Senior Programming Instructor", img:"/cherkeomentor.jpg" },
//     heroImg:    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
//     previewImg: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
//     features:   ["6 hours video","Downloadable resources","Certificate of completion","Lifetime access"],
//     about:      "A complete beginner's coding journey — from zero knowledge to writing your first working programs. No experience needed. This course walks you through every concept in the right order, with hands-on exercises after every lesson.",
//     curriculum: [
//       { week:"Week 1", title:"Foundations",        lessons:["Introduction & setup","Core concepts part 1","Core concepts part 2"] },
//       { week:"Week 2", title:"Building Skills",    lessons:["Hands-on project","Advanced patterns","Real examples"] },
//       { week:"Week 3", title:"Real-World Practice",lessons:["Mini project walkthrough","Code review session","Best practices"] },
//       { week:"Week 4", title:"Final Project",      lessons:["Full project build","Testing & polish","Showcase & next steps"] },
//     ],
//     reviews: [
//       { name:"Alex K.",   rating:5, text:"One of the best courses I have taken. Practical and well explained." },
//       { name:"Mia Chen",  rating:5, text:"I got a job after completing this course. Highly recommend it!" },
//       { name:"Daniel R.", rating:4, text:"Great content and projects. Would love even more real-world case studies." },
//     ],
//   },
//   9: {
//     title:      "JavaScript Essentials",
//     subtitle:   "Learn the language of the web — JavaScript fundamentals every developer needs....",
//     tag:        "Programming",
//     price:      59,
//     duration:   "7h 15min",
//     instructor: { name:"Mr. Kay Keo",       role:"Senior Programming Instructor", img:"/cherkeomentor.jpg" },
//     heroImg:    "https://images.unsplash.com/photo-1537884944318-390069bb8665?w=800&q=80",
//     previewImg: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&q=80",
//     features:   ["7 hours video","Downloadable resources","Certificate of completion","Lifetime access"],
//     about:      "Learn the language of the web — JavaScript fundamentals every developer needs. From variables and functions to DOM manipulation and fetch, you will build real interactive browser apps using modern JavaScript.",
//     curriculum: [
//       { week:"Week 1", title:"Foundations",        lessons:["Introduction & setup","Core concepts part 1","Core concepts part 2"] },
//       { week:"Week 2", title:"Building Skills",    lessons:["Hands-on project","Advanced patterns","Real examples"] },
//       { week:"Week 3", title:"Real-World Practice",lessons:["Mini project walkthrough","Code review session","Best practices"] },
//       { week:"Week 4", title:"Final Project",      lessons:["Full project build","Testing & polish","Showcase & next steps"] },
//     ],
//     reviews: [
//       { name:"Alex K.",   rating:5, text:"One of the best courses I have taken. Practical and well explained." },
//       { name:"Mia Chen",  rating:5, text:"I got a job after completing this course. Highly recommend it!" },
//       { name:"Daniel R.", rating:4, text:"Great content and projects. Would love even more real-world case studies." },
//     ],
//   },
//   10: {
//     title:      "Python for Beginners",
//     subtitle:   "Start coding with the world's most beginner-friendly language — Python....",
//     tag:        "Programming",
//     price:      69,
//     duration:   "8h 00min",
//     instructor: { name:"Mr. Kay Keo",       role:"Senior Programming Instructor", img:"/cherkeomentor.jpg" },
//     heroImg:    "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80",
//     previewImg: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
//     features:   ["8 hours video","Downloadable resources","Certificate of completion","Lifetime access"],
//     about:      "Start coding with the world's most beginner-friendly language — Python. Python's clean syntax lets you focus on logic instead of syntax. You will automate tasks, work with files, and build your first scripts.",
//     curriculum: [
//       { week:"Week 1", title:"Foundations",        lessons:["Introduction & setup","Core concepts part 1","Core concepts part 2"] },
//       { week:"Week 2", title:"Building Skills",    lessons:["Hands-on project","Advanced patterns","Real examples"] },
//       { week:"Week 3", title:"Real-World Practice",lessons:["Mini project walkthrough","Code review session","Best practices"] },
//       { week:"Week 4", title:"Final Project",      lessons:["Full project build","Testing & polish","Showcase & next steps"] },
//     ],
//     reviews: [
//       { name:"Alex K.",   rating:5, text:"One of the best courses I have taken. Practical and well explained." },
//       { name:"Mia Chen",  rating:5, text:"I got a job after completing this course. Highly recommend it!" },
//       { name:"Daniel R.", rating:4, text:"Great content and projects. Would love even more real-world case studies." },
//     ],
//   },
//   11: {
//     title:      "React Fundamentals",
//     subtitle:   "Build modern, fast web apps with the world's most popular frontend library....",
//     tag:        "Development",
//     price:      59,
//     duration:   "9h 00min",
//     instructor: { name:"Miss. Eung Lyzhai",  role:"Senior Development Instructor", img:"/cherzhiamentor.jpg" },
//     heroImg:    "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800&q=80",
//     previewImg: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
//     features:   ["9 hours video","Downloadable resources","Certificate of completion","Lifetime access"],
//     about:      "Build modern, fast web apps with the world's most popular frontend library. Learn components, hooks, state, props, and routing. You will ship a full React app by the end of the course.",
//     curriculum: [
//       { week:"Week 1", title:"Foundations",        lessons:["Introduction & setup","Core concepts part 1","Core concepts part 2"] },
//       { week:"Week 2", title:"Building Skills",    lessons:["Hands-on project","Advanced patterns","Real examples"] },
//       { week:"Week 3", title:"Real-World Practice",lessons:["Mini project walkthrough","Code review session","Best practices"] },
//       { week:"Week 4", title:"Final Project",      lessons:["Full project build","Testing & polish","Showcase & next steps"] },
//     ],
//     reviews: [
//       { name:"Alex K.",   rating:5, text:"One of the best courses I have taken. Practical and well explained." },
//       { name:"Mia Chen",  rating:5, text:"I got a job after completing this course. Highly recommend it!" },
//       { name:"Daniel R.", rating:4, text:"Great content and projects. Would love even more real-world case studies." },
//     ],
//   },
//   12: {
//     title:      "Development Bootcamp",
//     subtitle:   "Go from zero to full-stack developer with HTML, CSS, JavaScript, and Node.js....",
//     tag:        "Development",
//     price:      69,
//     duration:   "12h 00min",
//     instructor: { name:"Miss. Eung Lyzhai",  role:"Senior Development Instructor", img:"/cherzhiamentor.jpg" },
//     heroImg:    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
//     previewImg: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800&q=80",
//     features:   ["12 hours video","Downloadable resources","Certificate of completion","Lifetime access"],
//     about:      "Go from zero to full-stack developer with HTML, CSS, JavaScript, and Node.js. This bootcamp covers everything from HTML basics to deploying a full-stack app. Perfect for career changers and self-taught developers.",
//     curriculum: [
//       { week:"Week 1", title:"Foundations",        lessons:["Introduction & setup","Core concepts part 1","Core concepts part 2"] },
//       { week:"Week 2", title:"Building Skills",    lessons:["Hands-on project","Advanced patterns","Real examples"] },
//       { week:"Week 3", title:"Real-World Practice",lessons:["Mini project walkthrough","Code review session","Best practices"] },
//       { week:"Week 4", title:"Final Project",      lessons:["Full project build","Testing & polish","Showcase & next steps"] },
//     ],
//     reviews: [
//       { name:"Alex K.",   rating:5, text:"One of the best courses I have taken. Practical and well explained." },
//       { name:"Mia Chen",  rating:5, text:"I got a job after completing this course. Highly recommend it!" },
//       { name:"Daniel R.", rating:4, text:"Great content and projects. Would love even more real-world case studies." },
//     ],
//   },
//   13: {
//     title:      "Web Design",
//     subtitle:   "Design and build beautiful, responsive websites that work on every screen....",
//     tag:        "Development",
//     price:      59,
//     duration:   "6h 30min",
//     instructor: { name:"Miss. Eung Lyzhai",  role:"Senior Development Instructor", img:"/cherzhiamentor.jpg" },
//     heroImg:    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
//     previewImg: "https://images.unsplash.com/photo-1537884944318-390069bb8665?w=800&q=80",
//     features:   ["6 hours video","Downloadable resources","Certificate of completion","Lifetime access"],
//     about:      "Design and build beautiful, responsive websites that work on every screen. CSS Grid, Flexbox, responsive typography, and accessibility — you will design pixel-perfect web pages from scratch.",
//     curriculum: [
//       { week:"Week 1", title:"Foundations",        lessons:["Introduction & setup","Core concepts part 1","Core concepts part 2"] },
//       { week:"Week 2", title:"Building Skills",    lessons:["Hands-on project","Advanced patterns","Real examples"] },
//       { week:"Week 3", title:"Real-World Practice",lessons:["Mini project walkthrough","Code review session","Best practices"] },
//       { week:"Week 4", title:"Final Project",      lessons:["Full project build","Testing & polish","Showcase & next steps"] },
//     ],
//     reviews: [
//       { name:"Alex K.",   rating:5, text:"One of the best courses I have taken. Practical and well explained." },
//       { name:"Mia Chen",  rating:5, text:"I got a job after completing this course. Highly recommend it!" },
//       { name:"Daniel R.", rating:4, text:"Great content and projects. Would love even more real-world case studies." },
//     ],
//   },
//   14: {
//     title:      "Tailwind CSS Mastery",
//     subtitle:   "Build stunning UIs fast using the utility-first CSS framework....",
//     tag:        "Development",
//     price:      48,
//     duration:   "5h 45min",
//     instructor: { name:"Miss. Eung Lyzhai",  role:"Senior Development Instructor", img:"/cherzhiamentor.jpg" },
//     heroImg:    "https://images.unsplash.com/photo-1537884944318-390069bb8665?w=800&q=80",
//     previewImg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
//     features:   ["5 hours video","Downloadable resources","Certificate of completion","Lifetime access"],
//     about:      "Build stunning UIs fast using the utility-first CSS framework. Learn every Tailwind utility, customize your design system, and build production-ready component libraries at record speed.",
//     curriculum: [
//       { week:"Week 1", title:"Foundations",        lessons:["Introduction & setup","Core concepts part 1","Core concepts part 2"] },
//       { week:"Week 2", title:"Building Skills",    lessons:["Hands-on project","Advanced patterns","Real examples"] },
//       { week:"Week 3", title:"Real-World Practice",lessons:["Mini project walkthrough","Code review session","Best practices"] },
//       { week:"Week 4", title:"Final Project",      lessons:["Full project build","Testing & polish","Showcase & next steps"] },
//     ],
//     reviews: [
//       { name:"Alex K.",   rating:5, text:"One of the best courses I have taken. Practical and well explained." },
//       { name:"Mia Chen",  rating:5, text:"I got a job after completing this course. Highly recommend it!" },
//       { name:"Daniel R.", rating:4, text:"Great content and projects. Would love even more real-world case studies." },
//     ],
//   },
//   15: {
//     title:      "API & Deployment",
//     subtitle:   "Connect your apps to APIs and ship them live to the internet....",
//     tag:        "Development",
//     price:      69,
//     duration:   "7h 00min",
//     instructor: { name:"Miss. Eung Lyzhai",  role:"Senior Development Instructor", img:"/cherzhiamentor.jpg" },
//     heroImg:    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
//     previewImg: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&q=80",
//     features:   ["7 hours video","Downloadable resources","Certificate of completion","Lifetime access"],
//     about:      "Connect your apps to APIs and ship them live to the internet. REST APIs, fetch, Axios, environment variables, and deploying to Vercel and Railway. Your app will be live and shareable.",
//     curriculum: [
//       { week:"Week 1", title:"Foundations",        lessons:["Introduction & setup","Core concepts part 1","Core concepts part 2"] },
//       { week:"Week 2", title:"Building Skills",    lessons:["Hands-on project","Advanced patterns","Real examples"] },
//       { week:"Week 3", title:"Real-World Practice",lessons:["Mini project walkthrough","Code review session","Best practices"] },
//       { week:"Week 4", title:"Final Project",      lessons:["Full project build","Testing & polish","Showcase & next steps"] },
//     ],
//     reviews: [
//       { name:"Alex K.",   rating:5, text:"One of the best courses I have taken. Practical and well explained." },
//       { name:"Mia Chen",  rating:5, text:"I got a job after completing this course. Highly recommend it!" },
//       { name:"Daniel R.", rating:4, text:"Great content and projects. Would love even more real-world case studies." },
//     ],
//   },
//   16: {
//     title:      "Node.js Backend",
//     subtitle:   "Build fast, scalable server-side applications with Node.js and Express....",
//     tag:        "Development",
//     price:      69,
//     duration:   "8h 30min",
//     instructor: { name:"Miss. Eung Lyzhai",  role:"Senior Development Instructor", img:"/cherzhiamentor.jpg" },
//     heroImg:    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
//     previewImg: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&q=80",
//     features:   ["8 hours video","Downloadable resources","Certificate of completion","Lifetime access"],
//     about:      "Build fast, scalable server-side applications with Node.js and Express. Create REST APIs, handle authentication with JWT, connect to MongoDB, and deploy your backend to the cloud.",
//     curriculum: [
//       { week:"Week 1", title:"Foundations",        lessons:["Introduction & setup","Core concepts part 1","Core concepts part 2"] },
//       { week:"Week 2", title:"Building Skills",    lessons:["Hands-on project","Advanced patterns","Real examples"] },
//       { week:"Week 3", title:"Real-World Practice",lessons:["Mini project walkthrough","Code review session","Best practices"] },
//       { week:"Week 4", title:"Final Project",      lessons:["Full project build","Testing & polish","Showcase & next steps"] },
//     ],
//     reviews: [
//       { name:"Alex K.",   rating:5, text:"One of the best courses I have taken. Practical and well explained." },
//       { name:"Mia Chen",  rating:5, text:"I got a job after completing this course. Highly recommend it!" },
//       { name:"Daniel R.", rating:4, text:"Great content and projects. Would love even more real-world case studies." },
//     ],
//   },
//   17: {
//     title:      "Database Design",
//     subtitle:   "Design efficient, scalable databases using SQL and data modeling best practices....",
//     tag:        "Development",
//     price:      59,
//     duration:   "5h 00min",
//     instructor: { name:"Miss. Eung Lyzhai",  role:"Senior Development Instructor", img:"/cherzhiamentor.jpg" },
//     heroImg:    "https://images.unsplash.com/photo-1489875347316-0d6a5d7f3b0a?w=800&q=80",
//     previewImg: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
//     features:   ["5 hours video","Downloadable resources","Certificate of completion","Lifetime access"],
//     about:      "Design efficient, scalable databases using SQL and data modeling best practices. ER diagrams, normalization, relationships, indexing, and writing complex queries — everything you need to design real databases.",
//     curriculum: [
//       { week:"Week 1", title:"Foundations",        lessons:["Introduction & setup","Core concepts part 1","Core concepts part 2"] },
//       { week:"Week 2", title:"Building Skills",    lessons:["Hands-on project","Advanced patterns","Real examples"] },
//       { week:"Week 3", title:"Real-World Practice",lessons:["Mini project walkthrough","Code review session","Best practices"] },
//       { week:"Week 4", title:"Final Project",      lessons:["Full project build","Testing & polish","Showcase & next steps"] },
//     ],
//     reviews: [
//       { name:"Alex K.",   rating:5, text:"One of the best courses I have taken. Practical and well explained." },
//       { name:"Mia Chen",  rating:5, text:"I got a job after completing this course. Highly recommend it!" },
//       { name:"Daniel R.", rating:4, text:"Great content and projects. Would love even more real-world case studies." },
//     ],
//   },
//   18: {
//     title:      "Git & GitHub Workflow",
//     subtitle:   "Collaborate on code professionally using Git and GitHub....",
//     tag:        "Development",
//     price:      49,
//     duration:   "4h 00min",
//     instructor: { name:"Miss. Eung Lyzhai",  role:"Senior Development Instructor", img:"/cherzhiamentor.jpg" },
//     heroImg:    "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&q=80",
//     previewImg: "https://images.unsplash.com/photo-1489875347316-0d6a5d7f3b0a?w=800&q=80",
//     features:   ["4 hours video","Downloadable resources","Certificate of completion","Lifetime access"],
//     about:      "Collaborate on code professionally using Git and GitHub. Branching, merging, pull requests, rebasing, and resolving conflicts — everything teams use daily in real software projects.",
//     curriculum: [
//       { week:"Week 1", title:"Foundations",        lessons:["Introduction & setup","Core concepts part 1","Core concepts part 2"] },
//       { week:"Week 2", title:"Building Skills",    lessons:["Hands-on project","Advanced patterns","Real examples"] },
//       { week:"Week 3", title:"Real-World Practice",lessons:["Mini project walkthrough","Code review session","Best practices"] },
//       { week:"Week 4", title:"Final Project",      lessons:["Full project build","Testing & polish","Showcase & next steps"] },
//     ],
//     reviews: [
//       { name:"Alex K.",   rating:5, text:"One of the best courses I have taken. Practical and well explained." },
//       { name:"Mia Chen",  rating:5, text:"I got a job after completing this course. Highly recommend it!" },
//       { name:"Daniel R.", rating:4, text:"Great content and projects. Would love even more real-world case studies." },
//     ],
//   },
//   19: {
//     title:      "Docker for Developers",
//     subtitle:   "Containerize your apps for consistent, reliable deployment anywhere....",
//     tag:        "Development",
//     price:      79,
//     duration:   "6h 00min",
//     instructor: { name:"Miss. Eung Lyzhai",  role:"Senior Development Instructor", img:"/cherzhiamentor.jpg" },
//     heroImg:    "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&q=80",
//     previewImg: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
//     features:   ["6 hours video","Downloadable resources","Certificate of completion","Lifetime access"],
//     about:      "Containerize your apps for consistent, reliable deployment anywhere. Dockerfiles, images, containers, volumes, networking, and Docker Compose. Ship apps that run identically in dev and production.",
//     curriculum: [
//       { week:"Week 1", title:"Foundations",        lessons:["Introduction & setup","Core concepts part 1","Core concepts part 2"] },
//       { week:"Week 2", title:"Building Skills",    lessons:["Hands-on project","Advanced patterns","Real examples"] },
//       { week:"Week 3", title:"Real-World Practice",lessons:["Mini project walkthrough","Code review session","Best practices"] },
//       { week:"Week 4", title:"Final Project",      lessons:["Full project build","Testing & polish","Showcase & next steps"] },
//     ],
//     reviews: [
//       { name:"Alex K.",   rating:5, text:"One of the best courses I have taken. Practical and well explained." },
//       { name:"Mia Chen",  rating:5, text:"I got a job after completing this course. Highly recommend it!" },
//       { name:"Daniel R.", rating:4, text:"Great content and projects. Would love even more real-world case studies." },
//     ],
//   },
//   20: {
//     title:      "TypeScript Deep Dive",
//     subtitle:   "Write safer, scalable JavaScript with TypeScript's powerful type system....",
//     tag:        "Development",
//     price:      69,
//     duration:   "7h 30min",
//     instructor: { name:"Miss. Eung Lyzhai",  role:"Senior Development Instructor", img:"/cherzhiamentor.jpg" },
//     heroImg:    "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80",
//     previewImg: "https://images.unsplash.com/photo-1537884944318-390069bb8665?w=800&q=80",
//     features:   ["7 hours video","Downloadable resources","Certificate of completion","Lifetime access"],
//     about:      "Write safer, scalable JavaScript with TypeScript's powerful type system. Types, interfaces, generics, enums, and advanced patterns. You will add TypeScript to both new and existing React and Node projects.",
//     curriculum: [
//       { week:"Week 1", title:"Foundations",        lessons:["Introduction & setup","Core concepts part 1","Core concepts part 2"] },
//       { week:"Week 2", title:"Building Skills",    lessons:["Hands-on project","Advanced patterns","Real examples"] },
//       { week:"Week 3", title:"Real-World Practice",lessons:["Mini project walkthrough","Code review session","Best practices"] },
//       { week:"Week 4", title:"Final Project",      lessons:["Full project build","Testing & polish","Showcase & next steps"] },
//     ],
//     reviews: [
//       { name:"Alex K.",   rating:5, text:"One of the best courses I have taken. Practical and well explained." },
//       { name:"Mia Chen",  rating:5, text:"I got a job after completing this course. Highly recommend it!" },
//       { name:"Daniel R.", rating:4, text:"Great content and projects. Would love even more real-world case studies." },
//     ],
//   },
//   21: {
//     title:      "UX Wireframing",
//     subtitle:   "Design clear user flows and wireframes that communicate ideas before writing any...",
//     tag:        "Design",
//     price:      49,
//     duration:   "5h 30min",
//     instructor: { name:"Miss. Eung Lyzhai",  role:"Senior Design Instructor",      img:"/cherzhiamentor.jpg" },
//     heroImg:    "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80",
//     previewImg: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80",
//     features:   ["5 hours video","Downloadable resources","Certificate of completion","Lifetime access"],
//     about:      "Design clear user flows and wireframes that communicate ideas before writing any code. Low-fidelity sketching, user journey mapping, wireframe tools, and how to validate ideas with stakeholders quickly.",
//     curriculum: [
//       { week:"Week 1", title:"Foundations",        lessons:["Introduction & setup","Core concepts part 1","Core concepts part 2"] },
//       { week:"Week 2", title:"Building Skills",    lessons:["Hands-on project","Advanced patterns","Real examples"] },
//       { week:"Week 3", title:"Real-World Practice",lessons:["Mini project walkthrough","Code review session","Best practices"] },
//       { week:"Week 4", title:"Final Project",      lessons:["Full project build","Testing & polish","Showcase & next steps"] },
//     ],
//     reviews: [
//       { name:"Alex K.",   rating:5, text:"One of the best courses I have taken. Practical and well explained." },
//       { name:"Mia Chen",  rating:5, text:"I got a job after completing this course. Highly recommend it!" },
//       { name:"Daniel R.", rating:4, text:"Great content and projects. Would love even more real-world case studies." },
//     ],
//   },
//   22: {
//     title:      "Figma Essentials",
//     subtitle:   "Master Figma from scratch and design professional UIs with components and auto-l...",
//     tag:        "Design",
//     price:      49,
//     duration:   "6h 00min",
//     instructor: { name:"Miss. Eung Lyzhai",  role:"Senior Design Instructor",      img:"/cherzhiamentor.jpg" },
//     heroImg:    "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80",
//     previewImg: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80",
//     features:   ["6 hours video","Downloadable resources","Certificate of completion","Lifetime access"],
//     about:      "Master Figma from scratch and design professional UIs with components and auto-layout. Frames, components, variants, auto-layout, design tokens, and the complete dev handoff workflow used at top companies.",
//     curriculum: [
//       { week:"Week 1", title:"Foundations",        lessons:["Introduction & setup","Core concepts part 1","Core concepts part 2"] },
//       { week:"Week 2", title:"Building Skills",    lessons:["Hands-on project","Advanced patterns","Real examples"] },
//       { week:"Week 3", title:"Real-World Practice",lessons:["Mini project walkthrough","Code review session","Best practices"] },
//       { week:"Week 4", title:"Final Project",      lessons:["Full project build","Testing & polish","Showcase & next steps"] },
//     ],
//     reviews: [
//       { name:"Alex K.",   rating:5, text:"One of the best courses I have taken. Practical and well explained." },
//       { name:"Mia Chen",  rating:5, text:"I got a job after completing this course. Highly recommend it!" },
//       { name:"Daniel R.", rating:4, text:"Great content and projects. Would love even more real-world case studies." },
//     ],
//   },
//   23: {
//     title:      "UI Design Basics",
//     subtitle:   "A free introduction to UI design — layouts, spacing, typography and color for be...",
//     tag:        "Design",
//     price:      0,
//     duration:   "3h 00min",
//     instructor: { name:"Miss. Eung Lyzhai",  role:"Senior Design Instructor",      img:"/cherzhiamentor.jpg" },
//     heroImg:    "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80",
//     previewImg: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&q=80",
//     features:   ["3 hours video","Downloadable resources","Certificate of completion","Lifetime access"],
//     about:      "A free introduction to UI design — layouts, spacing, typography and color for beginners. Learn the visual fundamentals every designer needs. Free forever, no experience required.",
//     curriculum: [
//       { week:"Week 1", title:"Foundations",        lessons:["Introduction & setup","Core concepts part 1","Core concepts part 2"] },
//       { week:"Week 2", title:"Building Skills",    lessons:["Hands-on project","Advanced patterns","Real examples"] },
//       { week:"Week 3", title:"Real-World Practice",lessons:["Mini project walkthrough","Code review session","Best practices"] },
//       { week:"Week 4", title:"Final Project",      lessons:["Full project build","Testing & polish","Showcase & next steps"] },
//     ],
//     reviews: [
//       { name:"Alex K.",   rating:5, text:"One of the best courses I have taken. Practical and well explained." },
//       { name:"Mia Chen",  rating:5, text:"I got a job after completing this course. Highly recommend it!" },
//       { name:"Daniel R.", rating:4, text:"Great content and projects. Would love even more real-world case studies." },
//     ],
//   },
//   24: {
//     title:      "Color & Branding",
//     subtitle:   "Create powerful brand identities using color theory and visual design systems....",
//     tag:        "Design",
//     price:      49,
//     duration:   "4h 30min",
//     instructor: { name:"Miss. Eung Lyzhai",  role:"Senior Design Instructor",      img:"/cherzhiamentor.jpg" },
//     heroImg:    "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&q=80",
//     previewImg: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
//     features:   ["4 hours video","Downloadable resources","Certificate of completion","Lifetime access"],
//     about:      "Create powerful brand identities using color theory and visual design systems. Color psychology, palette building, brand guidelines, and creating consistent visual identities across digital products.",
//     curriculum: [
//       { week:"Week 1", title:"Foundations",        lessons:["Introduction & setup","Core concepts part 1","Core concepts part 2"] },
//       { week:"Week 2", title:"Building Skills",    lessons:["Hands-on project","Advanced patterns","Real examples"] },
//       { week:"Week 3", title:"Real-World Practice",lessons:["Mini project walkthrough","Code review session","Best practices"] },
//       { week:"Week 4", title:"Final Project",      lessons:["Full project build","Testing & polish","Showcase & next steps"] },
//     ],
//     reviews: [
//       { name:"Alex K.",   rating:5, text:"One of the best courses I have taken. Practical and well explained." },
//       { name:"Mia Chen",  rating:5, text:"I got a job after completing this course. Highly recommend it!" },
//       { name:"Daniel R.", rating:4, text:"Great content and projects. Would love even more real-world case studies." },
//     ],
//   },
//   25: {
//     title:      "Graphic Design Pro",
//     subtitle:   "Master composition, grids, and visual balance for professional graphic design....",
//     tag:        "Design",
//     price:      59,
//     duration:   "7h 00min",
//     instructor: { name:"Miss. Eung Lyzhai",  role:"Senior Design Instructor",      img:"/cherzhiamentor.jpg" },
//     heroImg:    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
//     previewImg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
//     features:   ["7 hours video","Downloadable resources","Certificate of completion","Lifetime access"],
//     about:      "Master composition, grids, and visual balance for professional graphic design. Rule of thirds, golden ratio, grid systems, hierarchy, and creating print-ready and digital assets that look stunning.",
//     curriculum: [
//       { week:"Week 1", title:"Foundations",        lessons:["Introduction & setup","Core concepts part 1","Core concepts part 2"] },
//       { week:"Week 2", title:"Building Skills",    lessons:["Hands-on project","Advanced patterns","Real examples"] },
//       { week:"Week 3", title:"Real-World Practice",lessons:["Mini project walkthrough","Code review session","Best practices"] },
//       { week:"Week 4", title:"Final Project",      lessons:["Full project build","Testing & polish","Showcase & next steps"] },
//     ],
//     reviews: [
//       { name:"Alex K.",   rating:5, text:"One of the best courses I have taken. Practical and well explained." },
//       { name:"Mia Chen",  rating:5, text:"I got a job after completing this course. Highly recommend it!" },
//       { name:"Daniel R.", rating:4, text:"Great content and projects. Would love even more real-world case studies." },
//     ],
//   },
//   26: {
//     title:      "Motion Design",
//     subtitle:   "Bring interfaces to life with purposeful animations and motion principles....",
//     tag:        "Design",
//     price:      69,
//     duration:   "6h 30min",
//     instructor: { name:"Miss. Eung Lyzhai",  role:"Senior Design Instructor",      img:"/cherzhiamentor.jpg" },
//     heroImg:    "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80",
//     previewImg: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
//     features:   ["6 hours video","Downloadable resources","Certificate of completion","Lifetime access"],
//     about:      "Bring interfaces to life with purposeful animations and motion principles. Easing curves, timing, micro-interactions, After Effects basics, and implementing animations in CSS and Framer Motion.",
//     curriculum: [
//       { week:"Week 1", title:"Foundations",        lessons:["Introduction & setup","Core concepts part 1","Core concepts part 2"] },
//       { week:"Week 2", title:"Building Skills",    lessons:["Hands-on project","Advanced patterns","Real examples"] },
//       { week:"Week 3", title:"Real-World Practice",lessons:["Mini project walkthrough","Code review session","Best practices"] },
//       { week:"Week 4", title:"Final Project",      lessons:["Full project build","Testing & polish","Showcase & next steps"] },
//     ],
//     reviews: [
//       { name:"Alex K.",   rating:5, text:"One of the best courses I have taken. Practical and well explained." },
//       { name:"Mia Chen",  rating:5, text:"I got a job after completing this course. Highly recommend it!" },
//       { name:"Daniel R.", rating:4, text:"Great content and projects. Would love even more real-world case studies." },
//     ],
//   },
//   27: {
//     title:      "Design Systems",
//     subtitle:   "Build scalable component libraries and design systems used by product teams....",
//     tag:        "Design",
//     price:      79,
//     duration:   "8h 00min",
//     instructor: { name:"Miss. Eung Lyzhai",  role:"Senior Design Instructor",      img:"/cherzhiamentor.jpg" },
//     heroImg:    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
//     previewImg: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80",
//     features:   ["8 hours video","Downloadable resources","Certificate of completion","Lifetime access"],
//     about:      "Build scalable component libraries and design systems used by product teams. Atomic design, tokens, documentation, versioning, and maintaining a design system that grows with your product.",
//     curriculum: [
//       { week:"Week 1", title:"Foundations",        lessons:["Introduction & setup","Core concepts part 1","Core concepts part 2"] },
//       { week:"Week 2", title:"Building Skills",    lessons:["Hands-on project","Advanced patterns","Real examples"] },
//       { week:"Week 3", title:"Real-World Practice",lessons:["Mini project walkthrough","Code review session","Best practices"] },
//       { week:"Week 4", title:"Final Project",      lessons:["Full project build","Testing & polish","Showcase & next steps"] },
//     ],
//     reviews: [
//       { name:"Alex K.",   rating:5, text:"One of the best courses I have taken. Practical and well explained." },
//       { name:"Mia Chen",  rating:5, text:"I got a job after completing this course. Highly recommend it!" },
//       { name:"Daniel R.", rating:4, text:"Great content and projects. Would love even more real-world case studies." },
//     ],
//   },
//   28: {
//     title:      "Typography Mastery",
//     subtitle:   "Choose and pair fonts like a pro — typography is the voice of design....",
//     tag:        "Design",
//     price:      39,
//     duration:   "3h 30min",
//     instructor: { name:"Miss. Eung Lyzhai",  role:"Senior Design Instructor",      img:"/cherzhiamentor.jpg" },
//     heroImg:    "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
//     previewImg: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80",
//     features:   ["3 hours video","Downloadable resources","Certificate of completion","Lifetime access"],
//     about:      "Choose and pair fonts like a pro — typography is the voice of design. Type anatomy, font pairing, hierarchy, readability, and implementing beautiful typography in web and print projects.",
//     curriculum: [
//       { week:"Week 1", title:"Foundations",        lessons:["Introduction & setup","Core concepts part 1","Core concepts part 2"] },
//       { week:"Week 2", title:"Building Skills",    lessons:["Hands-on project","Advanced patterns","Real examples"] },
//       { week:"Week 3", title:"Real-World Practice",lessons:["Mini project walkthrough","Code review session","Best practices"] },
//       { week:"Week 4", title:"Final Project",      lessons:["Full project build","Testing & polish","Showcase & next steps"] },
//     ],
//     reviews: [
//       { name:"Alex K.",   rating:5, text:"One of the best courses I have taken. Practical and well explained." },
//       { name:"Mia Chen",  rating:5, text:"I got a job after completing this course. Highly recommend it!" },
//       { name:"Daniel R.", rating:4, text:"Great content and projects. Would love even more real-world case studies." },
//     ],
//   },
//   29: {
//     title:      "Data Science Basics",
//     subtitle:   "Explore, clean, and model real datasets using Python and industry-standard libra...",
//     tag:        "Data Science",
//     price:      59,
//     duration:   "8h 00min",
//     instructor: { name:"Mr. Kay Keo",        role:"Data Science Lead",             img:"/cherkeomentor.jpg" },
//     heroImg:    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
//     previewImg: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
//     features:   ["8 hours video","Downloadable resources","Certificate of completion","Lifetime access"],
//     about:      "Explore, clean, and model real datasets using Python and industry-standard libraries. Pandas, NumPy, Matplotlib, and scikit-learn — the four pillars of data science, applied to real datasets from day one.",
//     curriculum: [
//       { week:"Week 1", title:"Foundations",        lessons:["Introduction & setup","Core concepts part 1","Core concepts part 2"] },
//       { week:"Week 2", title:"Building Skills",    lessons:["Hands-on project","Advanced patterns","Real examples"] },
//       { week:"Week 3", title:"Real-World Practice",lessons:["Mini project walkthrough","Code review session","Best practices"] },
//       { week:"Week 4", title:"Final Project",      lessons:["Full project build","Testing & polish","Showcase & next steps"] },
//     ],
//     reviews: [
//       { name:"Alex K.",   rating:5, text:"One of the best courses I have taken. Practical and well explained." },
//       { name:"Mia Chen",  rating:5, text:"I got a job after completing this course. Highly recommend it!" },
//       { name:"Daniel R.", rating:4, text:"Great content and projects. Would love even more real-world case studies." },
//     ],
//   },
//   30: {
//     title:      "Machine Learning Intro",
//     subtitle:   "Build and train your first machine learning models from scratch....",
//     tag:        "Data Science",
//     price:      79,
//     duration:   "9h 30min",
//     instructor: { name:"Mr. Kay Keo",        role:"Data Science Lead",             img:"/cherkeomentor.jpg" },
//     heroImg:    "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&q=80",
//     previewImg: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
//     features:   ["9 hours video","Downloadable resources","Certificate of completion","Lifetime access"],
//     about:      "Build and train your first machine learning models from scratch. Supervised learning, decision trees, SVMs, evaluation metrics, and building an end-to-end ML pipeline.",
//     curriculum: [
//       { week:"Week 1", title:"Foundations",        lessons:["Introduction & setup","Core concepts part 1","Core concepts part 2"] },
//       { week:"Week 2", title:"Building Skills",    lessons:["Hands-on project","Advanced patterns","Real examples"] },
//       { week:"Week 3", title:"Real-World Practice",lessons:["Mini project walkthrough","Code review session","Best practices"] },
//       { week:"Week 4", title:"Final Project",      lessons:["Full project build","Testing & polish","Showcase & next steps"] },
//     ],
//     reviews: [
//       { name:"Alex K.",   rating:5, text:"One of the best courses I have taken. Practical and well explained." },
//       { name:"Mia Chen",  rating:5, text:"I got a job after completing this course. Highly recommend it!" },
//       { name:"Daniel R.", rating:4, text:"Great content and projects. Would love even more real-world case studies." },
//     ],
//   },
//   31: {
//     title:      "Data Visualization",
//     subtitle:   "Turn raw numbers into beautiful, insightful charts and dashboards....",
//     tag:        "Data Science",
//     price:      49,
//     duration:   "5h 00min",
//     instructor: { name:"Mr. Kay Keo",        role:"Data Science Lead",             img:"/cherkeomentor.jpg" },
//     heroImg:    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
//     previewImg: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&q=80",
//     features:   ["5 hours video","Downloadable resources","Certificate of completion","Lifetime access"],
//     about:      "Turn raw numbers into beautiful, insightful charts and dashboards. Matplotlib, Seaborn, Plotly, and dashboard design — make your data tell compelling stories.",
//     curriculum: [
//       { week:"Week 1", title:"Foundations",        lessons:["Introduction & setup","Core concepts part 1","Core concepts part 2"] },
//       { week:"Week 2", title:"Building Skills",    lessons:["Hands-on project","Advanced patterns","Real examples"] },
//       { week:"Week 3", title:"Real-World Practice",lessons:["Mini project walkthrough","Code review session","Best practices"] },
//       { week:"Week 4", title:"Final Project",      lessons:["Full project build","Testing & polish","Showcase & next steps"] },
//     ],
//     reviews: [
//       { name:"Alex K.",   rating:5, text:"One of the best courses I have taken. Practical and well explained." },
//       { name:"Mia Chen",  rating:5, text:"I got a job after completing this course. Highly recommend it!" },
//       { name:"Daniel R.", rating:4, text:"Great content and projects. Would love even more real-world case studies." },
//     ],
//   },
//   32: {
//     title:      "SQL for Analysts",
//     subtitle:   "Query databases and uncover insights with SQL — the analyst's most important ski...",
//     tag:        "Data Science",
//     price:      39,
//     duration:   "4h 30min",
//     instructor: { name:"Mr. Kay Keo",        role:"Data Science Lead",             img:"/cherkeomentor.jpg" },
//     heroImg:    "https://images.unsplash.com/photo-1489875347316-0d6a5d7f3b0a?w=800&q=80",
//     previewImg: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
//     features:   ["4 hours video","Downloadable resources","Certificate of completion","Lifetime access"],
//     about:      "Query databases and uncover insights with SQL — the analyst's most important skill. SELECT, JOIN, GROUP BY, window functions, CTEs, and writing the complex queries that drive business decisions.",
//     curriculum: [
//       { week:"Week 1", title:"Foundations",        lessons:["Introduction & setup","Core concepts part 1","Core concepts part 2"] },
//       { week:"Week 2", title:"Building Skills",    lessons:["Hands-on project","Advanced patterns","Real examples"] },
//       { week:"Week 3", title:"Real-World Practice",lessons:["Mini project walkthrough","Code review session","Best practices"] },
//       { week:"Week 4", title:"Final Project",      lessons:["Full project build","Testing & polish","Showcase & next steps"] },
//     ],
//     reviews: [
//       { name:"Alex K.",   rating:5, text:"One of the best courses I have taken. Practical and well explained." },
//       { name:"Mia Chen",  rating:5, text:"I got a job after completing this course. Highly recommend it!" },
//       { name:"Daniel R.", rating:4, text:"Great content and projects. Would love even more real-world case studies." },
//     ],
//   },
//   33: {
//     title:      "Deep Learning Basics",
//     subtitle:   "Understand neural networks and deep learning from the ground up....",
//     tag:        "Data Science",
//     price:      89,
//     duration:   "10h 00min",
//     instructor: { name:"Mr. Kay Keo",        role:"Data Science Lead",             img:"/cherkeomentor.jpg" },
//     heroImg:    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
//     previewImg: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&q=80",
//     features:   ["10 hours video","Downloadable resources","Certificate of completion","Lifetime access"],
//     about:      "Understand neural networks and deep learning from the ground up. Perceptrons, backpropagation, CNNs, RNNs, and training your first deep learning model with TensorFlow and Keras.",
//     curriculum: [
//       { week:"Week 1", title:"Foundations",        lessons:["Introduction & setup","Core concepts part 1","Core concepts part 2"] },
//       { week:"Week 2", title:"Building Skills",    lessons:["Hands-on project","Advanced patterns","Real examples"] },
//       { week:"Week 3", title:"Real-World Practice",lessons:["Mini project walkthrough","Code review session","Best practices"] },
//       { week:"Week 4", title:"Final Project",      lessons:["Full project build","Testing & polish","Showcase & next steps"] },
//     ],
//     reviews: [
//       { name:"Alex K.",   rating:5, text:"One of the best courses I have taken. Practical and well explained." },
//       { name:"Mia Chen",  rating:5, text:"I got a job after completing this course. Highly recommend it!" },
//       { name:"Daniel R.", rating:4, text:"Great content and projects. Would love even more real-world case studies." },
//     ],
//   },
//   34: {
//     title:      "AI with Python",
//     subtitle:   "Build smart applications using AI frameworks and APIs....",
//     tag:        "Data Science",
//     price:      79,
//     duration:   "8h 30min",
//     instructor: { name:"Mr. Kay Keo",        role:"Data Science Lead",             img:"/cherkeomentor.jpg" },
//     heroImg:    "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80",
//     previewImg: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
//     features:   ["8 hours video","Downloadable resources","Certificate of completion","Lifetime access"],
//     about:      "Build smart applications using AI frameworks and APIs. OpenAI API, LangChain, vector databases, and building AI-powered apps that solve real problems.",
//     curriculum: [
//       { week:"Week 1", title:"Foundations",        lessons:["Introduction & setup","Core concepts part 1","Core concepts part 2"] },
//       { week:"Week 2", title:"Building Skills",    lessons:["Hands-on project","Advanced patterns","Real examples"] },
//       { week:"Week 3", title:"Real-World Practice",lessons:["Mini project walkthrough","Code review session","Best practices"] },
//       { week:"Week 4", title:"Final Project",      lessons:["Full project build","Testing & polish","Showcase & next steps"] },
//     ],
//     reviews: [
//       { name:"Alex K.",   rating:5, text:"One of the best courses I have taken. Practical and well explained." },
//       { name:"Mia Chen",  rating:5, text:"I got a job after completing this course. Highly recommend it!" },
//       { name:"Daniel R.", rating:4, text:"Great content and projects. Would love even more real-world case studies." },
//     ],
//   },
//   35: {
//     title:      "Flutter Mobile",
//     subtitle:   "Build beautiful iOS and Android apps from a single Flutter codebase....",
//     tag:        "Mobile",
//     price:      79,
//     duration:   "9h 00min",
//     instructor: { name:"Mr. Kay Keo",        role:"Mobile Development Expert",     img:"/cherkeomentor.jpg" },
//     heroImg:    "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80",
//     previewImg: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
//     features:   ["9 hours video","Downloadable resources","Certificate of completion","Lifetime access"],
//     about:      "Build beautiful iOS and Android apps from a single Flutter codebase. Dart basics, Flutter widgets, state management, navigation, and publishing to both app stores.",
//     curriculum: [
//       { week:"Week 1", title:"Foundations",        lessons:["Introduction & setup","Core concepts part 1","Core concepts part 2"] },
//       { week:"Week 2", title:"Building Skills",    lessons:["Hands-on project","Advanced patterns","Real examples"] },
//       { week:"Week 3", title:"Real-World Practice",lessons:["Mini project walkthrough","Code review session","Best practices"] },
//       { week:"Week 4", title:"Final Project",      lessons:["Full project build","Testing & polish","Showcase & next steps"] },
//     ],
//     reviews: [
//       { name:"Alex K.",   rating:5, text:"One of the best courses I have taken. Practical and well explained." },
//       { name:"Mia Chen",  rating:5, text:"I got a job after completing this course. Highly recommend it!" },
//       { name:"Daniel R.", rating:4, text:"Great content and projects. Would love even more real-world case studies." },
//     ],
//   },
//   36: {
//     title:      "React Native Apps",
//     subtitle:   "Use your JavaScript knowledge to build native iOS and Android apps....",
//     tag:        "Mobile",
//     price:      79,
//     duration:   "8h 30min",
//     instructor: { name:"Mr. Kay Keo",        role:"Mobile Development Expert",     img:"/cherkeomentor.jpg" },
//     heroImg:    "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
//     previewImg: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80",
//     features:   ["8 hours video","Downloadable resources","Certificate of completion","Lifetime access"],
//     about:      "Use your JavaScript knowledge to build native iOS and Android apps. Components, navigation, camera, location, push notifications, and publishing your first app to the stores.",
//     curriculum: [
//       { week:"Week 1", title:"Foundations",        lessons:["Introduction & setup","Core concepts part 1","Core concepts part 2"] },
//       { week:"Week 2", title:"Building Skills",    lessons:["Hands-on project","Advanced patterns","Real examples"] },
//       { week:"Week 3", title:"Real-World Practice",lessons:["Mini project walkthrough","Code review session","Best practices"] },
//       { week:"Week 4", title:"Final Project",      lessons:["Full project build","Testing & polish","Showcase & next steps"] },
//     ],
//     reviews: [
//       { name:"Alex K.",   rating:5, text:"One of the best courses I have taken. Practical and well explained." },
//       { name:"Mia Chen",  rating:5, text:"I got a job after completing this course. Highly recommend it!" },
//       { name:"Daniel R.", rating:4, text:"Great content and projects. Would love even more real-world case studies." },
//     ],
//   },
//   37: {
//     title:      "Swift for iOS",
//     subtitle:   "Build native Apple apps using Swift and SwiftUI....",
//     tag:        "Mobile",
//     price:      89,
//     duration:   "10h 00min",
//     instructor: { name:"Mr. Kay Keo",        role:"Mobile Development Expert",     img:"/cherkeomentor.jpg" },
//     heroImg:    "https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=800&q=80",
//     previewImg: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=800&q=80",
//     features:   ["10 hours video","Downloadable resources","Certificate of completion","Lifetime access"],
//     about:      "Build native Apple apps using Swift and SwiftUI. Swift syntax, SwiftUI views, Core Data, animations, and publishing to the App Store.",
//     curriculum: [
//       { week:"Week 1", title:"Foundations",        lessons:["Introduction & setup","Core concepts part 1","Core concepts part 2"] },
//       { week:"Week 2", title:"Building Skills",    lessons:["Hands-on project","Advanced patterns","Real examples"] },
//       { week:"Week 3", title:"Real-World Practice",lessons:["Mini project walkthrough","Code review session","Best practices"] },
//       { week:"Week 4", title:"Final Project",      lessons:["Full project build","Testing & polish","Showcase & next steps"] },
//     ],
//     reviews: [
//       { name:"Alex K.",   rating:5, text:"One of the best courses I have taken. Practical and well explained." },
//       { name:"Mia Chen",  rating:5, text:"I got a job after completing this course. Highly recommend it!" },
//       { name:"Daniel R.", rating:4, text:"Great content and projects. Would love even more real-world case studies." },
//     ],
//   },
//   38: {
//     title:      "Kotlin for Android",
//     subtitle:   "Build modern Android apps using Kotlin — Google's official language....",
//     tag:        "Mobile",
//     price:      79,
//     duration:   "9h 00min",
//     instructor: { name:"Mr. Kay Keo",        role:"Mobile Development Expert",     img:"/cherkeomentor.jpg" },
//     heroImg:    "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=800&q=80",
//     previewImg: "https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=800&q=80",
//     features:   ["9 hours video","Downloadable resources","Certificate of completion","Lifetime access"],
//     about:      "Build modern Android apps using Kotlin — Google's official language. Jetpack Compose, ViewModels, Room database, and publishing your app to Google Play.",
//     curriculum: [
//       { week:"Week 1", title:"Foundations",        lessons:["Introduction & setup","Core concepts part 1","Core concepts part 2"] },
//       { week:"Week 2", title:"Building Skills",    lessons:["Hands-on project","Advanced patterns","Real examples"] },
//       { week:"Week 3", title:"Real-World Practice",lessons:["Mini project walkthrough","Code review session","Best practices"] },
//       { week:"Week 4", title:"Final Project",      lessons:["Full project build","Testing & polish","Showcase & next steps"] },
//     ],
//     reviews: [
//       { name:"Alex K.",   rating:5, text:"One of the best courses I have taken. Practical and well explained." },
//       { name:"Mia Chen",  rating:5, text:"I got a job after completing this course. Highly recommend it!" },
//       { name:"Daniel R.", rating:4, text:"Great content and projects. Would love even more real-world case studies." },
//     ],
//   },
//   39: {
//     title:      "Mobile UI Patterns",
//     subtitle:   "Design intuitive mobile interfaces that users love to use....",
//     tag:        "Mobile",
//     price:      49,
//     duration:   "4h 00min",
//     instructor: { name:"Mr. Kay Keo",        role:"Mobile Development Expert",     img:"/cherkeomentor.jpg" },
//     heroImg:    "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
//     previewImg: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80",
//     features:   ["4 hours video","Downloadable resources","Certificate of completion","Lifetime access"],
//     about:      "Design intuitive mobile interfaces that users love to use. Navigation patterns, gestures, touch targets, onboarding flows, and platform-specific design guidelines for iOS and Android.",
//     curriculum: [
//       { week:"Week 1", title:"Foundations",        lessons:["Introduction & setup","Core concepts part 1","Core concepts part 2"] },
//       { week:"Week 2", title:"Building Skills",    lessons:["Hands-on project","Advanced patterns","Real examples"] },
//       { week:"Week 3", title:"Real-World Practice",lessons:["Mini project walkthrough","Code review session","Best practices"] },
//       { week:"Week 4", title:"Final Project",      lessons:["Full project build","Testing & polish","Showcase & next steps"] },
//     ],
//     reviews: [
//       { name:"Alex K.",   rating:5, text:"One of the best courses I have taken. Practical and well explained." },
//       { name:"Mia Chen",  rating:5, text:"I got a job after completing this course. Highly recommend it!" },
//       { name:"Daniel R.", rating:4, text:"Great content and projects. Would love even more real-world case studies." },
//     ],
//   },
//   40: {
//     title:      "App Store Launch",
//     subtitle:   "Publish your app to the Apple App Store and Google Play Store....",
//     tag:        "Mobile",
//     price:      59,
//     duration:   "3h 30min",
//     instructor: { name:"Mr. Kay Keo",        role:"Mobile Development Expert",     img:"/cherkeomentor.jpg" },
//     heroImg:    "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80",
//     previewImg: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
//     features:   ["3 hours video","Downloadable resources","Certificate of completion","Lifetime access"],
//     about:      "Publish your app to the Apple App Store and Google Play Store. App signing, metadata, screenshots, review guidelines, and marketing your app for maximum downloads.",
//     curriculum: [
//       { week:"Week 1", title:"Foundations",        lessons:["Introduction & setup","Core concepts part 1","Core concepts part 2"] },
//       { week:"Week 2", title:"Building Skills",    lessons:["Hands-on project","Advanced patterns","Real examples"] },
//       { week:"Week 3", title:"Real-World Practice",lessons:["Mini project walkthrough","Code review session","Best practices"] },
//       { week:"Week 4", title:"Final Project",      lessons:["Full project build","Testing & polish","Showcase & next steps"] },
//     ],
//     reviews: [
//       { name:"Alex K.",   rating:5, text:"One of the best courses I have taken. Practical and well explained." },
//       { name:"Mia Chen",  rating:5, text:"I got a job after completing this course. Highly recommend it!" },
//       { name:"Daniel R.", rating:4, text:"Great content and projects. Would love even more real-world case studies." },
//     ],
//   },
// }

// const TAG_COLORS = {
//   Design:       { bg:"#e91e8c", text:"#fff" },
//   Programming:  { bg:"#1e1b6e", text:"#fff" },
//   Development:  { bg:"#0ea5e9", text:"#fff" },
//   "Data Science":{ bg:"#f5a623", text:"#fff" },
//   Mobile:       { bg:"#22c55e", text:"#fff" },
// }

// function Stars({ n }) {
//   return (
//     <span style={{ display:"inline-flex", gap:2 }}>
//       {[1,2,3,4,5].map(i => (
//         <svg key={i} width="14" height="14" viewBox="0 0 24 24"
//           fill={i <= n ? "#f5a623" : "#e5e7eb"}>
//           <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
//         </svg>
//       ))}
//     </span>
//   )
// }

// function CheckItem({ text }) {
//   return (
//     <div style={{ display:"flex", alignItems:"flex-start", gap:10, marginBottom:10 }}>
//       <span style={{ width:20, height:20, borderRadius:"50%", background:"#eeedf8", display:"grid", placeItems:"center", flexShrink:0, marginTop:1 }}>
//         <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
//           <path d="M2 6l3 3 5-5" stroke="#1e1b6e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//         </svg>
//       </span>
//       <span style={{ fontSize:14, color:"#374151", lineHeight:1.6 }}>{text}</span>
//     </div>
//   )
// }

// const css = `
//   @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap');
//   *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
//   body { font-family:'Plus Jakarta Sans',sans-serif; background:#f8f8fc; }

//   .cd { min-height:100vh; background:#f8f8fc; font-family:'Plus Jakarta Sans',sans-serif; }
//   .cd-wrap { max-width:1100px; margin:0 auto; padding:0 48px; }

//   /* ── NAV ── */
//   .cd-nav {
//     position:sticky; top:0; z-index:100;
//     background:rgba(255,255,255,.94); backdrop-filter:blur(12px);
//     border-bottom:1px solid #f0f0f0;
//     padding:14px 0;
//   }
//   .cd-nav-inner { max-width:1100px; margin:0 auto; padding:0 48px; display:flex; align-items:center; gap:16px; }
//   .cd-back-btn {
//     display:inline-flex; align-items:center; gap:7px;
//     background:#1e1b6e; color:#fff;
//     font-size:13px; font-weight:700;
//     padding:8px 18px; border-radius:100px; border:none; cursor:pointer;
//     font-family:'Plus Jakarta Sans',sans-serif;
//     transition:transform .2s, box-shadow .2s;
//     box-shadow:0 4px 14px rgba(30,27,110,.3);
//   }
//   .cd-back-btn:hover { transform:translateY(-2px); box-shadow:0 6px 20px rgba(30,27,110,.4); }
//   .cd-breadcrumb { font-size:13px; color:#9ca3af; }
//   .cd-breadcrumb span { color:#1e1b6e; font-weight:700; }

//   /* ── HERO BANNER ── */
//   .cd-hero {
//     background: #1e1b6e;
//     padding: 48px 0 0;
//     position: relative;
//     overflow: hidden;
//   }
//   .cd-hero-orb {
//     position:absolute; border-radius:50%; pointer-events:none;
//     filter:blur(80px);
//   }
//   .cd-hero-inner {
//     max-width:1100px; margin:0 auto; padding:0 48px;
//     display:grid; grid-template-columns:1fr 420px; gap:48px; align-items:end;
//   }
//   .cd-hero-left { padding-bottom:40px; }
//   .cd-hero-tag {
//     display:inline-flex; align-items:center; gap:6px;
//     font-size:11px; font-weight:700; letter-spacing:.1em; text-transform:uppercase;
//     padding:5px 14px; border-radius:100px; margin-bottom:18px; width:fit-content;
//   }
//   .cd-hero-title {
//     font-size:clamp(26px,3.5vw,44px); font-weight:900;
//     color:#fff; line-height:1.1; letter-spacing:-.025em;
//     margin-bottom:16px;
//   }
//   .cd-hero-desc { font-size:15px; color:rgba(255,255,255,.68); line-height:1.75; max-width:480px; margin-bottom:28px; }

//   .cd-hero-meta { display:flex; flex-wrap:wrap; gap:20px; margin-bottom:32px; }
//   .cd-hero-meta-item { display:flex; align-items:center; gap:7px; color:rgba(255,255,255,.75); font-size:13px; font-weight:500; }

//   .cd-hero-instructor { display:flex; align-items:center; gap:12px; padding:14px 18px; background:rgba(255,255,255,.1); border-radius:14px; border:1px solid rgba(255,255,255,.14); width:fit-content; }
//   .cd-hero-av { width:44px; height:44px; border-radius:50%; overflow:hidden; border:2px solid rgba(255,255,255,.3); background:#c7d2fe; flex-shrink:0; }
//   .cd-hero-av img { width:100%; height:100%; object-fit:cover; object-position:top; display:block; }
//   .cd-hero-iname { font-size:14px; font-weight:800; color:#fff; }
//   .cd-hero-irole  { font-size:11.5px; color:rgba(255,255,255,.6); margin-top:2px; }

//   /* hero right — video card overlapping */
//   .cd-hero-right { position:relative; align-self:flex-end; }
//   .cd-video-card {
//     border-radius:20px 20px 0 0; overflow:hidden;
//     box-shadow:0 -12px 48px rgba(0,0,0,.3);
//     position:relative; background:#000;
//   }
//   .cd-video-img { width:100%; height:240px; object-fit:cover; display:block; filter:brightness(.85); }
//   .cd-play-btn {
//     position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);
//     width:56px; height:56px; border-radius:50%;
//     background:rgba(255,255,255,.95); border:none; cursor:pointer;
//     display:grid; place-items:center;
//     box-shadow:0 8px 28px rgba(0,0,0,.3);
//     transition:transform .2s, box-shadow .2s;
//   }
//   .cd-play-btn:hover { transform:translate(-50%,-50%) scale(1.1); box-shadow:0 12px 36px rgba(0,0,0,.4); }

//   /* ── TABS ── */
//   .cd-tabs-bar {
//     position:sticky; top:57px; z-index:90;
//     background:#fff; border-bottom:1px solid #f0f0f0;
//     padding:0;
//   }
//   .cd-tabs-inner { max-width:1100px; margin:0 auto; padding:0 48px; display:flex; gap:0; }
//   .cd-tab {
//     padding:16px 24px; font-size:14px; font-weight:600; color:#9ca3af;
//     border:none; background:none; cursor:pointer; font-family:'Plus Jakarta Sans',sans-serif;
//     border-bottom:3px solid transparent; transition:color .2s, border-color .2s;
//     white-space:nowrap;
//   }
//   .cd-tab:hover { color:#1e1b6e; }
//   .cd-tab.active { color:#1e1b6e; border-bottom-color:#1e1b6e; font-weight:700; }

//   /* ── BODY ── */
//   .cd-body { padding:48px 0 80px; }
//   .cd-body-inner { max-width:1100px; margin:0 auto; padding:0 48px; display:grid; grid-template-columns:1fr 340px; gap:56px; align-items:start; }

//   /* ── MAIN CONTENT ── */
//   .cd-section-title { font-size:20px; font-weight:800; color:#111; margin-bottom:14px; letter-spacing:-.015em; }
//   .cd-about-text { font-size:15px; color:#4b5563; line-height:1.85; margin-bottom:28px; }
//   .cd-preview-img { width:100%; border-radius:16px; overflow:hidden; box-shadow:0 8px 32px rgba(0,0,0,.1); margin-bottom:40px; }
//   .cd-preview-img img { width:100%; height:280px; object-fit:cover; display:block; }

//   /* curriculum */
//   .cd-curriculum { margin-bottom:40px; }
//   .cd-week {
//     border:1px solid #f0f0f0; border-radius:14px; overflow:hidden; margin-bottom:12px;
//     background:#fff; box-shadow:0 2px 8px rgba(0,0,0,.04);
//   }
//   .cd-week-header {
//     display:flex; align-items:center; justify-content:space-between;
//     padding:16px 20px; cursor:pointer; user-select:none;
//     transition:background .2s;
//   }
//   .cd-week-header:hover { background:#fafafa; }
//   .cd-week-label { font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.1em; color:#1e1b6e; margin-bottom:3px; }
//   .cd-week-title { font-size:15px; font-weight:700; color:#111; }
//   .cd-week-chevron { color:#9ca3af; transition:transform .25s; font-size:18px; }
//   .cd-week-chevron.open { transform:rotate(180deg); }
//   .cd-week-lessons { padding:0 20px 16px; border-top:1px solid #f5f5f5; }
//   .cd-lesson { display:flex; align-items:center; gap:10px; padding:10px 0; border-bottom:1px solid #f9fafb; font-size:14px; color:#374151; }
//   .cd-lesson:last-child { border-bottom:none; }
//   .cd-lesson-dot { width:8px; height:8px; border-radius:50%; background:#1e1b6e; opacity:.4; flex-shrink:0; }

//   /* reviews */
//   .cd-reviews { display:flex; flex-direction:column; gap:16px; }
//   .cd-review { background:#fff; border:1px solid #f0f0f0; border-radius:14px; padding:18px 20px; box-shadow:0 2px 8px rgba(0,0,0,.04); }
//   .cd-review-head { display:flex; align-items:center; gap:10px; margin-bottom:10px; }
//   .cd-review-av { width:36px; height:36px; border-radius:50%; background:linear-gradient(135deg,#1e1b6e,#e91e8c); display:grid; place-items:center; font-size:14px; font-weight:800; color:#fff; flex-shrink:0; }
//   .cd-review-name { font-size:14px; font-weight:700; color:#111; }
//   .cd-review-text { font-size:13.5px; color:#6b7280; line-height:1.7; }

//   /* ── SIDEBAR ── */
//   .cd-sidebar { position:sticky; top:120px; }
//   .cd-price-card {
//     background:#fff; border:1px solid #efefef; border-radius:20px;
//     overflow:hidden; box-shadow:0 8px 32px rgba(0,0,0,.08);
//   }
//   .cd-price-header { padding:20px 22px 0; }
//   .cd-price-amount { font-size:32px; font-weight:900; color:#1e1b6e; margin-bottom:14px; }
//   .cd-enroll-btn {
//     width:100%; padding:14px; border-radius:12px; border:none; cursor:pointer;
//     background:#1e1b6e; color:#fff; font-size:15px; font-weight:800;
//     font-family:'Plus Jakarta Sans',sans-serif;
//     transition:transform .2s, box-shadow .2s; margin-bottom:20px;
//     box-shadow:0 4px 16px rgba(30,27,110,.3);
//   }
//   .cd-enroll-btn:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(30,27,110,.4); }
//   .cd-price-features { padding:0 22px 22px; border-top:1px solid #f5f5f5; margin-top:4px; padding-top:18px; }
//   .cd-price-feat { display:flex; align-items:center; gap:9px; margin-bottom:11px; font-size:13.5px; color:#374151; }
//   .cd-price-feat-icon { color:#1e1b6e; font-size:15px; font-weight:800; flex-shrink:0; }

//   .cd-related { margin-top:20px; }
//   .cd-related-title { font-size:14px; font-weight:700; color:#111; margin-bottom:12px; }
//   .cd-related-card {
//     background:#fff; border:1px solid #efefef; border-radius:14px;
//     overflow:hidden; margin-bottom:12px; cursor:pointer;
//     transition:transform .2s, box-shadow .2s; display:flex;
//     box-shadow:0 2px 8px rgba(0,0,0,.04);
//   }
//   .cd-related-card:hover { transform:translateY(-3px); box-shadow:0 8px 24px rgba(30,27,110,.1); }
//   .cd-related-img { width:80px; height:70px; object-fit:cover; flex-shrink:0; }
//   .cd-related-info { padding:10px 12px; }
//   .cd-related-name { font-size:12.5px; font-weight:700; color:#111; margin-bottom:3px; line-height:1.35; }
//   .cd-related-price { font-size:12px; font-weight:800; color:#1e1b6e; }

//   /* ── RESPONSIVE ── */
//   @media(max-width:1024px) {
//     .cd-wrap, .cd-nav-inner, .cd-hero-inner, .cd-tabs-inner, .cd-body-inner { padding-left:32px; padding-right:32px; }
//     .cd-hero-inner { grid-template-columns:1fr 360px; gap:32px; }
//     .cd-body-inner  { grid-template-columns:1fr 300px; gap:40px; }
//   }
//   @media(max-width:768px) {
//     .cd-wrap, .cd-nav-inner, .cd-hero-inner, .cd-tabs-inner, .cd-body-inner { padding-left:20px; padding-right:20px; }
//     .cd-hero-inner { grid-template-columns:1fr; gap:0; }
//     .cd-hero-left { padding-bottom:28px; }
//     .cd-video-card { border-radius:16px; }
//     .cd-video-img { height:200px; }
//     .cd-body-inner { grid-template-columns:1fr; gap:32px; }
//     .cd-sidebar { position:static; }
//     .cd-tabs-bar { top:50px; }
//     .cd-hero-right { margin:0 -20px; }
//     .cd-video-card { border-radius:0; }
//   }
//   @media(max-width:480px) {
//     .cd-wrap, .cd-nav-inner, .cd-hero-inner, .cd-tabs-inner, .cd-body-inner { padding-left:14px; padding-right:14px; }
//     .cd-hero-title { font-size:24px; }
//     .cd-tab { padding:14px 16px; font-size:13px; }
//     .cd-hero-meta { gap:14px; }
//     .cd-hero-right { margin:0 -14px; }
//   }

//   @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
//   .cd-anim { animation:fadeUp .5s ease both; }
// `

// const RELATED = [
//   { title:"Figma Essentials",      price:49, img:"https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=200&q=80" },
//   { title:"Color & Branding",      price:49, img:"https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=200&q=80" },
//   { title:"Motion Design",         price:69, img:"https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=200&q=80" },
// ]

// export default function CourseDetail({ course, onBack }) {
//   const data = (course?.id && COURSE_DATA[course.id]) ? COURSE_DATA[course.id] : COURSE_DATA[1]
//   const tc   = TAG_COLORS[data.tag] || TAG_COLORS.Design
//   const [activeTab, setActiveTab] = useState("about")
//   const [openWeek, setOpenWeek]   = useState(0)

//   const tabRefs = {
//     about:      useRef(null),
//     curriculum: useRef(null),
//     reviews:    useRef(null),
//   }

//   useEffect(() => { window.scrollTo({ top:0, behavior:"smooth" }) }, [])

//   function scrollToTab(key) {
//     setActiveTab(key)
//     tabRefs[key]?.current?.scrollIntoView({ behavior:"smooth", block:"start" })
//   }

//   return (
//     <>
//       <style>{css}</style>
//       <div className="cd">

//         {/* ── NAV ── */}
//         <nav className="cd-nav">
//           <div className="cd-nav-inner">
//             <button className="cd-back-btn" onClick={onBack}>← Back</button>
//             <span className="cd-breadcrumb">Courses / <span>{data.tag}</span> / <span>{data.title}</span></span>
//           </div>
//         </nav>

//         {/* ── HERO BANNER ── */}
//         <section className="cd-hero">
//           <div className="cd-hero-orb" style={{ width:480, height:480, background:"#3f3cae", opacity:.45, top:-200, left:-100 }} />
//           <div className="cd-hero-orb" style={{ width:280, height:280, background:"#e91e8c", opacity:.12, top:"-5%", right:"20%", filter:"blur(70px)" }} />

//           <div className="cd-hero-inner">
//             {/* Left */}
//             <div className="cd-hero-left cd-anim">
//               <span className="cd-hero-tag" style={{ background:tc.bg, color:tc.text }}>{data.tag}</span>
//               <h1 className="cd-hero-title">{data.title}</h1>
//               <p className="cd-hero-desc">{data.subtitle}</p>

//               <div className="cd-hero-meta">
//                 <div className="cd-hero-meta-item">🌐 <span>Online Course</span></div>
//                 <div className="cd-hero-meta-item">⏱ <span>{data.duration}</span></div>
//                 <div className="cd-hero-meta-item">🎓 <span>Certificate</span></div>
//                 <div className="cd-hero-meta-item">👨‍🏫 <span>Mentor Support</span></div>
//               </div>

//               <div className="cd-hero-instructor">
//                 <div className="cd-hero-av"><img src={data.instructor.img} alt={data.instructor.name} /></div>
//                 <div>
//                   <div className="cd-hero-iname">{data.instructor.name}</div>
//                   <div className="cd-hero-irole">{data.instructor.role}</div>
//                 </div>
//               </div>
//             </div>

//             {/* Right — Video preview */}
//             <div className="cd-hero-right">
//               <div className="cd-video-card">
//                 <img className="cd-video-img" src={data.heroImg} alt="Course preview" />
//                 <button className="cd-play-btn" title="Play preview">
//                   <svg width="20" height="20" viewBox="0 0 24 24" fill="#1e1b6e">
//                     <path d="M5 3l14 9-14 9V3z"/>
//                   </svg>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* ── TABS ── */}
//         <div className="cd-tabs-bar">
//           <div className="cd-tabs-inner">
//             {[["about","About the Course"],["curriculum","Course Content"],["reviews","Reviews"]].map(([key,label]) => (
//               <button key={key} className={`cd-tab${activeTab===key?" active":""}`} onClick={() => scrollToTab(key)}>{label}</button>
//             ))}
//           </div>
//         </div>

//         {/* ── BODY ── */}
//         <div className="cd-body">
//           <div className="cd-body-inner">

//             {/* ── MAIN ── */}
//             <main>

//               {/* About */}
//               <div ref={tabRefs.about} style={{ marginBottom:48, scrollMarginTop:120 }}>
//                 <h2 className="cd-section-title">About the Course</h2>
//                 <p className="cd-about-text">{data.about}</p>
//                 <div className="cd-preview-img">
//                   <img src={data.previewImg} alt="Course content" />
//                 </div>
//                 {/* What you'll learn */}
//                 <h2 className="cd-section-title">What You'll Learn</h2>
//                 <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"4px 24px", marginBottom:40 }}>
//                   {data.features.concat(["Real-world portfolio projects","Industry-standard workflows","Mentor feedback on your work","Private community access"]).map((f,i) => (
//                     <CheckItem key={i} text={f} />
//                   ))}
//                 </div>
//               </div>

//               {/* Curriculum */}
//               <div ref={tabRefs.curriculum} style={{ marginBottom:48, scrollMarginTop:120 }}>
//                 <h2 className="cd-section-title">Course Content</h2>
//                 <p style={{ fontSize:13.5, color:"#9ca3af", marginBottom:20 }}>
//                   {data.curriculum.length} weeks · {data.curriculum.reduce((a,w)=>a+w.lessons.length,0)} lessons
//                 </p>
//                 <div className="cd-curriculum">
//                   {data.curriculum.map((week, wi) => (
//                     <div key={wi} className="cd-week">
//                       <div className="cd-week-header" onClick={() => setOpenWeek(openWeek===wi ? -1 : wi)}>
//                         <div>
//                           <div className="cd-week-label">{week.week}</div>
//                           <div className="cd-week-title">{week.title}</div>
//                         </div>
//                         <span className={`cd-week-chevron${openWeek===wi?" open":""}`}>⌄</span>
//                       </div>
//                       {openWeek === wi && (
//                         <div className="cd-week-lessons">
//                           {week.lessons.map((l,li) => (
//                             <div key={li} className="cd-lesson">
//                               <span className="cd-lesson-dot" />
//                               {l}
//                             </div>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Reviews */}
//               <div ref={tabRefs.reviews} style={{ scrollMarginTop:120 }}>
//                 <h2 className="cd-section-title">Student Reviews</h2>
//                 <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:24 }}>
//                   <span style={{ fontSize:48, fontWeight:900, color:"#1e1b6e", lineHeight:1 }}>4.8</span>
//                   <div>
//                     <Stars n={5} />
//                     <p style={{ fontSize:13, color:"#9ca3af", marginTop:4 }}>Based on 1,240 reviews</p>
//                   </div>
//                 </div>
//                 <div className="cd-reviews">
//                   {data.reviews.map((r, ri) => (
//                     <div key={ri} className="cd-review">
//                       <div className="cd-review-head">
//                         <div className="cd-review-av">{r.name[0]}</div>
//                         <div>
//                           <div className="cd-review-name">{r.name}</div>
//                           <Stars n={r.rating} />
//                         </div>
//                       </div>
//                       <p className="cd-review-text">{r.text}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//             </main>

//             {/* ── SIDEBAR ── */}
//             <aside className="cd-sidebar">
//               <div className="cd-price-card">
//                 <div className="cd-price-header">
//                   <div className="cd-price-amount">
//                     {data.price === 0
//                       ? <span style={{ color:"#22c55e" }}>Free</span>
//                       : `$${data.price}`
//                     }
//                   </div>
//                   <button className="cd-enroll-btn">Enroll now</button>
//                 </div>
//                 <div className="cd-price-features">
//                   {["17 hours video","Downloadable resources","Certificate of completion","Lifetime access"].map((f,i) => (
//                     <div key={i} className="cd-price-feat">
//                       <span className="cd-price-feat-icon">✓</span>
//                       <span>{f}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Related courses */}
//               <div className="cd-related">
//                 <div className="cd-related-title">Related Courses</div>
//                 {RELATED.map((r,i) => (
//                   <div key={i} className="cd-related-card">
//                     <img className="cd-related-img" src={r.img} alt={r.title} />
//                     <div className="cd-related-info">
//                       <div className="cd-related-name">{r.title}</div>
//                       <div className="cd-related-price">${r.price}</div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </aside>

//           </div>
//         </div>

//       </div>
//     </>
//   )
// }


import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useGetCoursesQuery, useEnrollCourseMutation } from "../../features/courses/coursesApi"
import { useGetEnrolledCoursesQuery } from "../../features/courses/coursesApi"
import {
  Monitor, Award, Clock, Headphones, Play, Check,
  Lock, ChevronDown, ChevronUp, Tag, User
} from "lucide-react"
import { toast } from "react-toastify"

// ── Tab button ────────────────────────────────────────────────────────────────
const Tab = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`pb-3 text-sm font-semibold border-b-2 transition-all ${
      active
        ? "border-indigo-600 text-indigo-600"
        : "border-transparent text-gray-400 hover:text-gray-600"
    }`}
  >
    {label}
  </button>
)

// ── Check item ────────────────────────────────────────────────────────────────
const CheckItem = ({ text }) => (
  <div className="flex items-center gap-3">
    <div className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0">
      <Check size={11} className="text-white" strokeWidth={3} />
    </div>
    <span className="text-sm text-gray-700">{text}</span>
  </div>
)

// ── Lesson row ────────────────────────────────────────────────────────────────
const LessonRow = ({ lesson, index, isEnrolled, onLockedClick }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden mb-2">
      <button
        onClick={() => isEnrolled ? setOpen(!open) : onLockedClick()}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
            isEnrolled ? "bg-indigo-50 text-indigo-600" : "bg-gray-100 text-gray-400"
          }`}>
            {isEnrolled
              ? <Play size={13} className="fill-indigo-600" />
              : <Lock size={13} />
            }
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-gray-800">
              {index + 1}. {lesson.title}
            </p>
            {lesson.description && (
              <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{lesson.description}</p>
            )}
          </div>
        </div>
        {isEnrolled && (
          open ? <ChevronUp size={15} className="text-gray-400" /> : <ChevronDown size={15} className="text-gray-400" />
        )}
        {!isEnrolled && <Lock size={14} className="text-gray-300" />}
      </button>

      {/* ✅ Video player — only if enrolled and open */}
      {isEnrolled && open && lesson.video_url && (
        <div className="px-5 pb-5">
          <div className="rounded-xl overflow-hidden bg-black aspect-video">
            {lesson.video_url.includes("youtu") ? (
              <iframe
                src={lesson.video_url
                  .replace("youtu.be/", "www.youtube.com/embed/")
                  .replace("watch?v=", "embed/")}
                className="w-full h-full"
                allowFullScreen
                title={lesson.title}
              />
            ) : (
              <video src={lesson.video_url} controls className="w-full h-full" />
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ── Skeleton ──────────────────────────────────────────────────────────────────
const Skeleton = () => (
  <div className="max-w-6xl mx-auto px-6 py-10 animate-pulse">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <div className="lg:col-span-2 space-y-4">
        <div className="h-10 w-3/4 bg-gray-100 rounded-xl" />
        <div className="h-4 w-full bg-gray-100 rounded" />
        <div className="h-4 w-2/3 bg-gray-100 rounded" />
        <div className="h-48 bg-gray-100 rounded-2xl mt-6" />
      </div>
      <div className="h-96 bg-gray-100 rounded-2xl" />
    </div>
  </div>
)

// ── Main ──────────────────────────────────────────────────────────────────────
export default function CourseDetail() {
  const { id }     = useParams()
  const navigate   = useNavigate()
  const { user }   = useSelector((state) => state.auth)
  const [activeTab, setActiveTab] = useState("about")

  // ✅ Fetch from list + find (no single course endpoint)
  const { data: raw, isLoading } = useGetCoursesQuery({ limit: 999, skip: 0 })
  const allCourses = Array.isArray(raw) ? raw : raw?.courses ?? raw?.data ?? []
  const course     = allCourses.find((c) => String(c.id) === String(id))

  // ✅ Check enrollment
  const { data: enrolledRaw = [] } = useGetEnrolledCoursesQuery(undefined, { skip: !user })
  const enrolledList = Array.isArray(enrolledRaw)
    ? enrolledRaw
    : enrolledRaw?.courses ?? enrolledRaw?.data ?? []
  const isEnrolled = enrolledList.some((c) => String(c.id) === String(id))

  // ✅ Enroll mutation
  const [enrollCourse, { isLoading: isEnrolling }] = useEnrollCourseMutation()

  const handleEnroll = async () => {
    if (!user) { navigate("/login"); return }
    try {
      await enrollCourse(Number(id)).unwrap()
      toast.success("Enrolled successfully! You can now watch the lessons.")
    } catch (err) {
      toast.error(err?.data?.detail || "Failed to enroll.")
    }
  }

  const handleLockedClick = () => {
    toast.info("Please enroll to watch this lesson.")
  }

  if (isLoading) return <Skeleton />

  if (!course) return (
    <div className="flex flex-col items-center justify-center py-32 text-gray-400">
      <p className="text-5xl mb-4">📭</p>
      <p className="text-sm font-semibold">Course not found.</p>
    </div>
  )

  const lessons    = course.lessons  ?? []
  const tags       = course.tags     ?? []
  const thumb      = course.thumbnail_url ?? course.thumbnail ?? null
  const price      = course.is_paid === false ? "Free" : `$${course.price ?? 49}`
  const teacher    = course.teacher  ?? course.instructor ?? null
  const category   = course.category?.name ?? course.category ?? "General"

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* ── LEFT COLUMN ── */}
        <div className="lg:col-span-2">

          {/* Title */}
          <h1 className="text-3xl font-black text-gray-900 mb-3 leading-tight">
            {course.title}
          </h1>

          {/* Short description */}
          <p className="text-gray-500 text-sm leading-relaxed mb-5">
            {course.description}
          </p>

          {/* Meta badges */}
          <div className="grid grid-cols-2 gap-y-2 gap-x-6 mb-5">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Monitor size={15} className="text-indigo-400" />
              Online Course
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock size={15} className="text-indigo-400" />
              {course.duration ?? "Self-paced"}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Award size={15} className="text-indigo-400" />
              Certificate
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Headphones size={15} className="text-indigo-400" />
              Mentor Support
            </div>
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {tags.map((t, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-semibold"
                >
                  <Tag size={10} /> {typeof t === "string" ? t : t.name}
                </span>
              ))}
            </div>
          )}

          {/* Teacher */}
          {teacher && (
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-full overflow-hidden bg-indigo-100 flex items-center justify-center flex-shrink-0">
                {teacher.avatar_url ? (
                  <img src={teacher.avatar_url} alt={teacher.name} className="w-full h-full object-cover" />
                ) : (
                  <User size={18} className="text-indigo-400" />
                )}
              </div>
              <div>
                <p className="text-sm font-black text-gray-900">{teacher.name ?? teacher.full_name}</p>
                <p className="text-xs text-gray-400">{teacher.role ?? "Instructor"}</p>
              </div>
            </div>
          )}

          {/* ── Tabs ── */}
          <div className="flex gap-8 border-b border-gray-100 mb-6">
            <Tab label="About the Course" active={activeTab === "about"}   onClick={() => setActiveTab("about")}   />
            <Tab label="Course Content"   active={activeTab === "content"} onClick={() => setActiveTab("content")} />
            <Tab label="Reviews"          active={activeTab === "reviews"} onClick={() => setActiveTab("reviews")} />
          </div>

          {/* ── Tab: About ── */}
          {activeTab === "about" && (
            <div>
              <h3 className="text-base font-black text-gray-900 mb-3">About the Course</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-6">{course.description}</p>

              {/* Thumbnail as hero image */}
              {thumb && (
                <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                  <img src={thumb} alt={course.title} className="w-full object-cover max-h-80" />
                </div>
              )}
            </div>
          )}

          {/* ── Tab: Course Content ── */}
          {activeTab === "content" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-black text-gray-900">
                  {lessons.length} Lesson{lessons.length !== 1 ? "s" : ""}
                </h3>
                {!isEnrolled && (
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Lock size={11} /> Enroll to unlock all lessons
                  </span>
                )}
              </div>

              {lessons.length === 0 ? (
                <p className="text-sm text-gray-400 py-6 text-center">No lessons added yet.</p>
              ) : (
                lessons.map((lesson, i) => (
                  <LessonRow
                    key={lesson.id ?? i}
                    lesson={lesson}
                    index={i}
                    isEnrolled={isEnrolled}
                    onLockedClick={handleLockedClick}
                  />
                ))
              )}
            </div>
          )}

          {/* ── Tab: Reviews ── */}
          {activeTab === "reviews" && (
            <div className="text-center py-12 text-gray-400">
              <p className="text-4xl mb-3">⭐</p>
              <p className="text-sm font-semibold">No reviews yet.</p>
            </div>
          )}
        </div>

        {/* ── RIGHT COLUMN — Sticky card ── */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden">

            {/* Thumbnail with play overlay */}
            <div className="relative w-full aspect-video bg-gray-900 overflow-hidden">
              {thumb ? (
                <img src={thumb} alt={course.title} className="w-full h-full object-cover opacity-90" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-indigo-800 to-indigo-600" />
              )}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-white/90 shadow-xl flex items-center justify-center">
                  <Play size={20} className="text-indigo-600 fill-indigo-600 ml-1" />
                </div>
              </div>
            </div>

            {/* Price + Enroll */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-5">
                <span className="text-2xl font-black" style={{ color: "#22C55E" }}>
                  {price}
                </span>
                {isEnrolled ? (
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-green-50 border border-green-200 text-green-600 text-sm font-bold">
                    <Check size={14} /> Enrolled
                  </span>
                ) : (
                  <button
                    onClick={handleEnroll}
                    disabled={isEnrolling}
                    className="px-6 py-2.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white text-sm font-bold transition-all hover:shadow-lg hover:shadow-indigo-200 disabled:opacity-60"
                  >
                    {isEnrolling ? "Enrolling…" : "Enroll now"}
                  </button>
                )}
              </div>

              {/* Includes */}
              <div className="space-y-3 border-t border-gray-50 pt-5">
                <CheckItem text={`${lessons.length} lesson${lessons.length !== 1 ? "s" : ""}`} />
                <CheckItem text="Downloadable resources" />
                <CheckItem text="Certificate of completion" />
                <CheckItem text="Lifetime access" />
                {category && (
                  <CheckItem text={`Category: ${category}`} />
                )}
              </div>

              {/* Not enrolled warning */}
              {!isEnrolled && (
                <div className="mt-5 flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                  <Lock size={14} className="text-amber-500 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-700 font-medium leading-relaxed">
                    Enroll to unlock all lessons and watch the videos.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}